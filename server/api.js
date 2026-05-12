/**
 * SANPAR CMS Backend API
 *
 * Vanilla Node.js (no external dependencies) — runs as systemd service on port 3001.
 * nginx reverse-proxies /admin/api/* to localhost:3001.
 *
 * Endpoints:
 *   GET  /healthz          → 200 OK (for monitoring)
 *   GET  /products         → current products.json
 *   POST /save             → write new products.json (with images embedded as base64)
 *
 * Safety:
 *   - Atomic writes (temp file + rename) so the live file is never half-written
 *   - Timestamped backups on every save (keeps last 30, ~1 month of edits)
 *   - JSON schema validation before any disk write
 *   - Image MIME-type and size validation
 *   - Filename sanitisation (no path traversal)
 *   - Returns the saved data so admin can re-render with fresh state
 */
'use strict';

const http = require('http');
const fs   = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

// --- Configuration ---
const PORT       = 3001;
const WEB_ROOT   = '/var/www/html';
const DATA_FILE  = path.join(WEB_ROOT, 'data', 'products.json');
const BACKUP_DIR = path.join(WEB_ROOT, 'data', 'backups');
// Admin-uploaded images go HERE — a separate directory so they never collide
// with hardcoded product images managed by git.
const IMAGE_DIR  = path.join(WEB_ROOT, 'images', 'products-cms');
const MAX_BODY   = 50 * 1024 * 1024;   // 50 MB total request payload
const MAX_IMAGE  = 5  * 1024 * 1024;   // 5 MB per image
const MAX_BACKUPS = 30;

const ALLOWED_IMAGE_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const EXT_FROM_MIME = {
  'image/jpeg': '.jpg',
  'image/png':  '.png',
  'image/webp': '.webp',
  'image/gif':  '.gif',
};

// --- Helpers ---
function log(...args) {
  console.log(new Date().toISOString(), ...args);
}

function send(res, status, body, extra = {}) {
  const headers = { 'Content-Type': 'application/json', ...extra };
  res.writeHead(status, headers);
  res.end(typeof body === 'string' ? body : JSON.stringify(body));
}

function sendError(res, status, message) {
  log(`[ERROR ${status}]`, message);
  send(res, status, { error: message });
}

async function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', chunk => {
      size += chunk.length;
      if (size > MAX_BODY) {
        reject(new Error(`Request body exceeds ${MAX_BODY} bytes`));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

// Strip anything that could cause path traversal.
function safeFilename(name) {
  // Keep alphanumerics, dashes, underscores, dots. Strip the rest.
  const cleaned = String(name).replace(/[^a-zA-Z0-9._-]/g, '');
  // Disallow leading dots, double dots, empty
  if (!cleaned || cleaned.startsWith('.') || cleaned.includes('..')) {
    return null;
  }
  return cleaned;
}

// Validate the JSON structure to reject bad data
function validateData(data) {
  if (!data || typeof data !== 'object')          return 'Data must be an object';
  if (!Array.isArray(data.products))              return 'data.products must be an array';
  if (data.products.length > 500)                 return 'Too many products (max 500)';
  for (const [i, p] of data.products.entries()) {
    if (!p || typeof p !== 'object')              return `products[${i}] is not an object`;
    if (typeof p.id !== 'string' || !p.id)        return `products[${i}].id is required`;
    if (typeof p.name !== 'string' || !p.name)    return `products[${i}].name is required`;
    if (typeof p.category !== 'string')           return `products[${i}].category must be a string`;
    if (typeof p.description !== 'string')        return `products[${i}].description must be a string`;
    if (p.image !== undefined && typeof p.image !== 'string') return `products[${i}].image must be a string`;
    if (p.features !== undefined && !Array.isArray(p.features)) return `products[${i}].features must be an array`;
    if (p.active !== undefined && typeof p.active !== 'boolean') return `products[${i}].active must be a boolean`;
  }
  // Check for duplicate IDs
  const ids = data.products.map(p => p.id);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length > 0) return `Duplicate product IDs: ${[...new Set(dupes)].join(', ')}`;
  return null;
}

async function ensureDirs() {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.mkdir(BACKUP_DIR, { recursive: true });
  await fs.mkdir(IMAGE_DIR,  { recursive: true });
}

// Save an image from base64 data URL. Returns the public web path.
async function saveImageFromDataUrl(dataUrl, slug) {
  if (typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) {
    throw new Error('Image must be a data URL');
  }
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) throw new Error('Invalid data URL format');
  const mime = match[1].toLowerCase();
  if (!ALLOWED_IMAGE_MIME.includes(mime)) {
    throw new Error(`Image type ${mime} not allowed`);
  }
  const buf = Buffer.from(match[2], 'base64');
  if (buf.length > MAX_IMAGE) {
    throw new Error(`Image exceeds ${MAX_IMAGE} bytes`);
  }
  const ext = EXT_FROM_MIME[mime];
  const safeSlug = safeFilename(slug || 'product') || 'product';
  const ts  = Date.now();
  const rnd = crypto.randomBytes(3).toString('hex');
  const filename = `${safeSlug}-${ts}-${rnd}${ext}`;
  const filepath = path.join(IMAGE_DIR, filename);
  await fs.writeFile(filepath, buf, { mode: 0o644 });
  return `images/products-cms/${filename}`;
}

// Process each product: if `image` is a data URL, persist it and replace with web path
async function persistImages(products) {
  for (const p of products) {
    if (typeof p.image === 'string' && p.image.startsWith('data:')) {
      p.image = await saveImageFromDataUrl(p.image, p.id);
    }
  }
}

async function backupCurrent() {
  try {
    const current = await fs.readFile(DATA_FILE, 'utf8');
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(BACKUP_DIR, `products-${ts}.json`);
    await fs.writeFile(backupFile, current, { mode: 0o644 });
    // Trim old backups
    const all = (await fs.readdir(BACKUP_DIR))
      .filter(f => f.startsWith('products-') && f.endsWith('.json'))
      .sort()
      .reverse();
    for (const f of all.slice(MAX_BACKUPS)) {
      await fs.unlink(path.join(BACKUP_DIR, f)).catch(() => {});
    }
    return backupFile;
  } catch (err) {
    if (err.code === 'ENOENT') return null; // First save — nothing to back up
    throw err;
  }
}

async function atomicWrite(filepath, contents) {
  const tmp = `${filepath}.tmp.${process.pid}.${Date.now()}`;
  await fs.writeFile(tmp, contents, { mode: 0o644 });
  await fs.rename(tmp, filepath);
}

// --- Request handlers ---
async function handleHealth(req, res) {
  send(res, 200, { ok: true, time: new Date().toISOString() });
}

async function handleGetProducts(req, res) {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    send(res, 200, data, { 'Cache-Control': 'no-store' });
  } catch (err) {
    if (err.code === 'ENOENT') {
      // No file yet — return empty structure
      send(res, 200, { lastUpdated: null, products: [] }, { 'Cache-Control': 'no-store' });
    } else {
      sendError(res, 500, 'Failed to read products file');
    }
  }
}

async function handleSave(req, res) {
  try {
    await ensureDirs();
    const raw = await readBody(req);
    let payload;
    try {
      payload = JSON.parse(raw.toString('utf8'));
    } catch {
      return sendError(res, 400, 'Body is not valid JSON');
    }
    const validationError = validateData(payload);
    if (validationError) return sendError(res, 400, `Validation: ${validationError}`);

    // Persist any embedded data-URL images and replace with paths
    try {
      await persistImages(payload.products);
    } catch (err) {
      return sendError(res, 400, `Image: ${err.message}`);
    }

    // Stamp lastUpdated server-side
    payload.lastUpdated = new Date().toISOString();

    // Backup current file before write
    const backup = await backupCurrent();
    if (backup) log('Backed up to', backup);

    // Atomic write
    await atomicWrite(DATA_FILE, JSON.stringify(payload, null, 2));
    log(`Saved ${payload.products.length} products`);

    send(res, 200, { ok: true, lastUpdated: payload.lastUpdated, productCount: payload.products.length });
  } catch (err) {
    log('SAVE failed:', err);
    sendError(res, 500, 'Save failed: ' + err.message);
  }
}

// --- Routing ---
function notFound(res) {
  sendError(res, 404, 'Not found');
}

const server = http.createServer(async (req, res) => {
  // Only accept requests from nginx on localhost. nginx handles the public auth + TLS.
  const remote = req.socket.remoteAddress || '';
  if (!remote.includes('127.0.0.1') && !remote.includes('::1') && !remote.includes('::ffff:127.0.0.1')) {
    return sendError(res, 403, 'Forbidden');
  }

  // nginx proxies /admin/api/<path> as /<path>
  const url = req.url.replace(/\?.*$/, '');
  try {
    if (req.method === 'GET' && (url === '/healthz' || url === '/admin/api/healthz')) {
      return handleHealth(req, res);
    }
    if (req.method === 'GET' && (url === '/products' || url === '/admin/api/products')) {
      return handleGetProducts(req, res);
    }
    if (req.method === 'POST' && (url === '/save' || url === '/admin/api/save')) {
      return handleSave(req, res);
    }
    notFound(res);
  } catch (err) {
    log('Unhandled error:', err);
    sendError(res, 500, 'Internal server error');
  }
});

server.listen(PORT, '127.0.0.1', () => {
  log(`SANPAR CMS API listening on 127.0.0.1:${PORT}`);
  log('Endpoints: GET /healthz | GET /products | POST /save');
});

process.on('SIGTERM', () => {
  log('SIGTERM received, shutting down');
  server.close(() => process.exit(0));
});
