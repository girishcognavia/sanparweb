# SANPAR CMS Backend — Server Setup

One-time setup on the Lightsail server. Run as `ubuntu` user with sudo.

## 1. Install Node.js (LTS)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v   # should print v20.x.x
```

## 2. Install the API service

```bash
# Create install dir
sudo mkdir -p /opt/sanpar-cms

# Copy the API code (assumes you've cloned the repo to /home/ubuntu/sanpar-repo)
sudo cp /home/ubuntu/sanpar-repo/server/api.js /opt/sanpar-cms/
sudo cp /home/ubuntu/sanpar-repo/server/sanpar-cms.service /etc/systemd/system/

# Ensure the data and image directories exist with correct ownership
sudo mkdir -p /var/www/html/data /var/www/html/data/backups /var/www/html/images/products-cms
sudo chown -R www-data:www-data /var/www/html/data /var/www/html/images/products-cms

# Seed the data file from the deploy (if not present)
if [ ! -f /var/www/html/data/products.json ]; then
  sudo cp /home/ubuntu/sanpar-repo/site-build/data/products.json /var/www/html/data/
  sudo chown www-data:www-data /var/www/html/data/products.json
fi

# Create the log file
sudo touch /var/log/sanpar-cms.log
sudo chown www-data:www-data /var/log/sanpar-cms.log

# Enable and start the service
sudo systemctl daemon-reload
sudo systemctl enable sanpar-cms
sudo systemctl start sanpar-cms
sudo systemctl status sanpar-cms --no-pager
```

You should see `active (running)`.

## 3. Update nginx — reverse-proxy `/admin/api/*` to the Node service

Edit the active nginx config (typically `/etc/nginx/sites-enabled/default` or the
sanpar-specific one). Inside the `server { ... }` block for sanpar.com, add:

```nginx
# Reverse-proxy CMS API requests to the local Node.js service.
# Strips the /admin/api prefix so /admin/api/save becomes /save on the backend.
location /admin/api/ {
    auth_basic "SANPAR Admin";
    auth_basic_user_file /etc/nginx/.htpasswd;

    proxy_pass http://127.0.0.1:3001/;
    proxy_http_version 1.1;
    proxy_set_header Host              $host;
    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    client_max_body_size 60M;   # match Node's MAX_BODY (50M payload + overhead)
    proxy_read_timeout 60s;
}
```

Make sure the existing `location /admin { ... }` block still requires the same
auth (so visiting `/admin/index.html` also asks for credentials).

Then test and reload:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## 4. Verify

```bash
# Local — should return {"ok":true,...}
curl http://127.0.0.1:3001/healthz

# Through nginx — must include admin credentials. Should return same JSON.
curl -u admin:YOURPASSWORD https://sanpar.com/admin/api/healthz

# Read current products through the API
curl -u admin:YOURPASSWORD https://sanpar.com/admin/api/products | head -c 200
```

## 5. Logs

```bash
sudo tail -f /var/log/sanpar-cms.log
sudo journalctl -u sanpar-cms -f
```

## 6. Rollback a bad save

Each save creates a timestamped backup in `/var/www/html/data/backups/`.
Last 30 are kept. To roll back:

```bash
ls -lt /var/www/html/data/backups/ | head
sudo cp /var/www/html/data/backups/products-2026-05-12T...json /var/www/html/data/products.json
sudo chown www-data:www-data /var/www/html/data/products.json
```

No restart needed — nginx serves the file fresh on the next request.

## Notes

- The Node service only binds to `127.0.0.1` — never exposed to the public.
- Authentication is enforced by nginx (Basic Auth) BEFORE requests reach the API.
- The API rejects any non-localhost requests as a defence-in-depth.
- Image uploads from admin are saved to `/var/www/html/images/products-cms/`
  (a separate directory from `/var/www/html/images/products/` which is managed
  by the git deploy). The two directories never collide.
