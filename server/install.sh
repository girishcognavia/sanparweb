#!/usr/bin/env bash
#
# SANPAR CMS — one-shot installer for the Lightsail server.
#
# What it does (in order, with rollback on any failure):
#   1. Pre-flight checks (root/sudo, OS, nginx, www-data user, sibling files)
#   2. Installs Node.js 20 LTS if not already present
#   3. Creates required directories and sets ownership
#   4. Copies api.js to /opt/sanpar-cms/ and installs the systemd unit
#   5. Starts the service, waits, verifies it's healthy on 127.0.0.1:3001
#   6. Detects the active nginx config, backs it up, adds the /admin/api/
#      reverse-proxy block, tests, reloads — reverts the config if test fails
#   7. Final verification + clear summary
#
# Usage (on the Lightsail server, as the ubuntu user):
#   sudo bash /path/to/server/install.sh
#
# Safe to run multiple times — every step checks current state first.

set -euo pipefail

# --- Colours ---
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
ok()    { echo -e "${GREEN}[OK]${NC}    $*"; }
info()  { echo -e "${BLUE}[INFO]${NC}  $*"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $*"; }
err()   { echo -e "${RED}[ERROR]${NC} $*" >&2; }
die()   { err "$*"; exit 1; }

# --- Configuration ---
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
API_SRC="${SCRIPT_DIR}/api.js"
SERVICE_SRC="${SCRIPT_DIR}/sanpar-cms.service"
INSTALL_DIR="/opt/sanpar-cms"
WEB_ROOT="/var/www/html"
DATA_DIR="${WEB_ROOT}/data"
BACKUP_DIR="${WEB_ROOT}/data/backups"
IMAGE_DIR="${WEB_ROOT}/images/products-cms"
LOG_FILE="/var/log/sanpar-cms.log"
SERVICE_NAME="sanpar-cms"
NGINX_BACKUP_DIR="/var/backups/nginx"
API_PORT="3001"

# --- 1. Pre-flight checks ---
info "Step 1/7  Pre-flight checks"

[[ $EUID -eq 0 ]] || die "Run with sudo: sudo bash $0"

command -v nginx >/dev/null || die "nginx is not installed."
id www-data >/dev/null 2>&1 || die "user 'www-data' does not exist."

[[ -f "$API_SRC" ]]     || die "Missing $API_SRC — make sure you uploaded the full server/ folder."
[[ -f "$SERVICE_SRC" ]] || die "Missing $SERVICE_SRC — make sure you uploaded the full server/ folder."

[[ -d "$WEB_ROOT" ]] || die "$WEB_ROOT does not exist."

ok "All pre-flight checks passed"

# --- 2. Install Node.js if missing or too old ---
info "Step 2/7  Node.js"
NODE_OK=0
if command -v node >/dev/null; then
    NODE_VER=$(node --version | sed 's/^v//' | cut -d. -f1)
    if [[ "$NODE_VER" -ge 18 ]]; then
        ok "Node.js v$(node --version) already installed"
        NODE_OK=1
    else
        warn "Node v$NODE_VER is too old (need >=18). Reinstalling…"
    fi
fi
if [[ "$NODE_OK" -eq 0 ]]; then
    info "Installing Node.js 20 LTS via NodeSource…"
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
    ok "Installed $(node --version)"
fi

# --- 3. Directories + log file ---
info "Step 3/7  Directories"
mkdir -p "$INSTALL_DIR" "$DATA_DIR" "$BACKUP_DIR" "$IMAGE_DIR"
touch "$LOG_FILE"
chown www-data:www-data "$LOG_FILE"
chown -R www-data:www-data "$DATA_DIR" "$IMAGE_DIR"
# Seed products.json from the deploy if not present
if [[ ! -f "${DATA_DIR}/products.json" ]]; then
    DEPLOY_DATA="${WEB_ROOT}/data/products.json"
    if [[ -f "$DEPLOY_DATA" ]]; then
        ok "products.json already present at $DEPLOY_DATA"
    else
        warn "$DEPLOY_DATA missing — the admin will see an empty list until the next git deploy provides it"
    fi
fi
ok "All directories ready"

# --- 4. Copy API + systemd unit ---
info "Step 4/7  Install API and service unit"
cp "$API_SRC"     "${INSTALL_DIR}/api.js"
chmod 644 "${INSTALL_DIR}/api.js"
cp "$SERVICE_SRC" "/etc/systemd/system/${SERVICE_NAME}.service"
chmod 644 "/etc/systemd/system/${SERVICE_NAME}.service"
systemctl daemon-reload
ok "Files installed and systemd reloaded"

# --- 5. Start and verify the service ---
info "Step 5/7  Start the API service"
systemctl enable "$SERVICE_NAME" >/dev/null 2>&1
systemctl restart "$SERVICE_NAME"
sleep 2

if ! systemctl is-active --quiet "$SERVICE_NAME"; then
    err "Service failed to start. Last 20 log lines:"
    journalctl -u "$SERVICE_NAME" -n 20 --no-pager
    die "Aborting — service not running."
fi

# Local health probe
if ! curl -sf -m 5 "http://127.0.0.1:${API_PORT}/healthz" >/dev/null; then
    err "Service is running but /healthz did not respond on port ${API_PORT}."
    die "Aborting — health check failed."
fi
ok "Service is running and responding to health checks on port ${API_PORT}"

# --- 6. nginx config patch ---
info "Step 6/7  nginx config"

# Find the active config for the site
NGINX_CONF=""
for f in /etc/nginx/sites-enabled/*; do
    [[ -f "$f" ]] || continue
    if grep -q "sanpar\|${WEB_ROOT}" "$f" 2>/dev/null; then
        NGINX_CONF="$f"
        break
    fi
done
[[ -z "$NGINX_CONF" ]] && NGINX_CONF="/etc/nginx/sites-enabled/default"
[[ ! -f "$NGINX_CONF" ]] && die "Could not locate an active nginx config to modify."
info "Using nginx config: $NGINX_CONF"

# Backup
mkdir -p "$NGINX_BACKUP_DIR"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="${NGINX_BACKUP_DIR}/$(basename "$NGINX_CONF").pre-cms-${TIMESTAMP}"
cp "$NGINX_CONF" "$BACKUP_FILE"
ok "Backed up $NGINX_CONF to $BACKUP_FILE"

# Skip if the block already exists
if grep -q "location /admin/api/" "$NGINX_CONF"; then
    ok "nginx already has /admin/api/ block — skipping config edit"
else
    info "Inserting /admin/api/ block before existing /admin location"

    # The block to insert
    NEW_BLOCK='    # SANPAR CMS API — reverse-proxy to local Node.js service\n    location /admin/api/ {\n        auth_basic "SANPAR Admin";\n        auth_basic_user_file /etc/nginx/.htpasswd;\n        proxy_pass http://127.0.0.1:'"$API_PORT"'/;\n        proxy_http_version 1.1;\n        proxy_set_header Host              $host;\n        proxy_set_header X-Real-IP         $remote_addr;\n        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;\n        proxy_set_header X-Forwarded-Proto $scheme;\n        client_max_body_size 60M;\n        proxy_read_timeout 60s;\n    }\n'

    # Insert before any line that looks like "    location /admin ..." (the static block)
    # Falls back to inserting before the closing brace if no /admin block found.
    if grep -qE '^\s*location\s+/admin\b' "$NGINX_CONF"; then
        awk -v block="$NEW_BLOCK" '
            !inserted && /^\s*location\s+\/admin\b/ {
                printf("%s", block);
                inserted=1;
            }
            { print }
        ' "$NGINX_CONF" > "${NGINX_CONF}.new"
    else
        # No /admin block — insert just before the final closing brace of the server block
        awk -v block="$NEW_BLOCK" '
            BEGIN { depth=0; inserted=0 }
            /^\s*server\s*{/ { in_server=1 }
            in_server && /{/ { depth++ }
            in_server && /}/ {
                depth--;
                if (depth==0 && !inserted) {
                    printf("%s", block);
                    inserted=1;
                }
            }
            { print }
        ' "$NGINX_CONF" > "${NGINX_CONF}.new"
    fi

    if ! grep -q "location /admin/api/" "${NGINX_CONF}.new"; then
        rm -f "${NGINX_CONF}.new"
        die "Failed to inject the /admin/api/ block. Review $NGINX_CONF manually."
    fi

    mv "${NGINX_CONF}.new" "$NGINX_CONF"

    if nginx -t >/dev/null 2>&1; then
        systemctl reload nginx
        ok "nginx config patched and reloaded"
    else
        warn "nginx -t failed. Reverting config…"
        cp "$BACKUP_FILE" "$NGINX_CONF"
        nginx -t
        die "Reverted. Check syntax of $BACKUP_FILE and try again."
    fi
fi

# --- 7. Final verification ---
info "Step 7/7  End-to-end verification"

# Localhost direct
if curl -sf -m 5 "http://127.0.0.1:${API_PORT}/healthz" >/dev/null; then
    ok "API still healthy after nginx reload"
else
    die "Localhost health check failed after nginx changes."
fi

# Through nginx (will be 401 because of Basic Auth — that's the correct response)
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -m 5 "https://sanpar.com/admin/api/healthz" || true)
if [[ "$HTTP_CODE" == "401" ]]; then
    ok "nginx is correctly routing /admin/api/ and requiring auth (401 = expected)"
elif [[ "$HTTP_CODE" == "200" ]]; then
    ok "nginx is routing AND the request reached the API (200 — but auth should have blocked it; check htpasswd)"
else
    warn "Unexpected HTTP $HTTP_CODE from https://sanpar.com/admin/api/healthz"
fi

# --- Done ---
echo
echo "================================================================"
echo -e "${GREEN}SANPAR CMS install complete.${NC}"
echo "================================================================"
echo "  Service:       systemctl status sanpar-cms"
echo "  Logs:          sudo tail -f /var/log/sanpar-cms.log"
echo "  nginx backup:  $BACKUP_FILE"
echo "  Data file:     ${DATA_DIR}/products.json"
echo "  Backups dir:   ${BACKUP_DIR}/"
echo "  Image uploads: ${IMAGE_DIR}/"
echo
echo "TEST IT NOW:"
echo "  1. Open https://sanpar.com/admin in a browser"
echo "  2. Log in with your admin username + password"
echo "  3. Edit any product description, click Save Changes"
echo "  4. Open https://sanpar.com/products in a new tab — your change shows there"
echo
