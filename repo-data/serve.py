#!/usr/bin/env python3
"""
SANPAR Website Local Mirror Server
Serves the fully cloned website at http://localhost:3456
Routes match the original sanpar.com URL structure exactly.
"""

import json
import mimetypes
import os
from http.server import HTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).parent
SITE_DIR = ROOT / "site"
PAGES_DIR = SITE_DIR / "pages"
ASSETS_DIR = SITE_DIR / "assets"

PORT = 3456

# Load route mapping
PAGE_ROUTES = {
    "/": "homepage",
    "/who-we-are/": "who-we-are",
    "/contact-us/": "contact-us",
    "/products-solutions/": "products-solutions",
    "/industries-applications/": "industries-applications",
    "/support-service/": "support-service",
    "/technology/": "technology",
    "/work-with-us/": "work-with-us",
    "/success-stories/": "success-stories",
    "/news/": "news",
    "/blogs/": "blogs",
    "/events/": "events",
    "/shop/": "shop",
    "/job-openings/": "job-openings",
    "/privacy-policy/": "privacy-policy",
    "/terms-and-conditions/": "terms-and-conditions",
    "/industries-applications/aerospace-and-defence/": "ind-aerospace-defence",
    "/industries-applications/machine-tools/": "ind-machine-tools",
    "/industries-applications/pharmaceutical/": "ind-pharmaceutical",
    "/industries-applications/cement-industry/": "ind-cement",
    "/industries-applications/textile-industry/": "ind-textile",
    "/industries-applications/food-beverage-industry/": "ind-food-beverage",
    "/industries-applications/plastics-industry/": "ind-plastics",
    "/industries-applications/manufacturing-industry/": "ind-manufacturing",
    "/industries-applications/energy-power-industry/": "ind-energy-power",
    "/industries-applications/chemical-indsutry/": "ind-chemical",
    "/our-prouct/water-chillers/": "prod-water-chillers",
    "/our-prouct/cat-m1-series/": "prod-cat-m1-series",
    "/our-prouct/dehumidifier/": "prod-dehumidifier",
    "/our-prouct/precision-air-conditioner/": "prod-precision-ac",
    "/our-prouct/air-chillers/": "prod-air-chillers",
    "/our-prouct/centrifugal-moisture-separator/": "prod-moisture-separator",
    "/our-prouct/aftercooler/": "prod-aftercooler",
    "/our-prouct/compressed-air-filters/": "prod-compressed-air-filters",
    "/our-prouct/adsorption-based-compressed-air-dryers/": "prod-adsorption-dryers",
    "/our-prouct/xeros-series/": "prod-xeros-series",
    "/our-prouct/cat-dth-series/": "prod-cat-dth-series",
    "/our-prouct/drains/": "prod-drains",
    "/our-prouct/coolant-chillers/": "prod-coolant-chillers",
    "/our-prouct/ecodrair-series/": "prod-ecodrair-series",
    "/success-stories/hindustan-motors/": "story-hindustan-motors",
    "/success-stories/hical-technologies/": "story-hical-technologies",
    "/success-stories/excel-glass/": "story-excel-glass",
    "/success-stories/infosys-technologies-ltd/": "story-infosys",
    "/success-stories/jmt-auto-ltd/": "story-jmt-auto",
    "/success-stories/gas-turbine-research-establishment/": "story-gas-turbine",
    "/success-stories/ashok-leyland-ltd/": "story-ashok-leyland",
    "/success-stories/jindal-steel-power-limited-raigarh/": "story-jindal-steel",
}

# Ensure correct MIME types
mimetypes.add_type("font/woff2", ".woff2")
mimetypes.add_type("font/woff", ".woff")
mimetypes.add_type("font/ttf", ".ttf")
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("image/svg+xml", ".svg")


class MirrorHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        path = unquote(self.path).split("?")[0]  # Remove query params

        # 1. Check if it's a page route
        # Normalize: ensure trailing slash for directory-like paths
        normalized = path
        if not normalized.endswith("/") and "." not in normalized.split("/")[-1]:
            normalized += "/"

        slug = PAGE_ROUTES.get(normalized) or PAGE_ROUTES.get(path)
        if slug:
            page_file = PAGES_DIR / f"{slug}.html"
            if page_file.exists():
                self.serve_file(page_file, "text/html; charset=utf-8")
                return

        # 2. Check if it's a static asset under /assets/
        if path.startswith("/assets/"):
            asset_path = SITE_DIR / path.lstrip("/").replace("/", os.sep)
            if asset_path.exists() and asset_path.is_file():
                content_type = mimetypes.guess_type(str(asset_path))[0] or "application/octet-stream"
                self.serve_file(asset_path, content_type)
                return

        # 3. Check wp-content paths (images, uploads) - serve from assets
        if path.startswith("/wp-content/"):
            asset_path = SITE_DIR / "assets" / path.lstrip("/").replace("/", os.sep)
            if asset_path.exists() and asset_path.is_file():
                content_type = mimetypes.guess_type(str(asset_path))[0] or "application/octet-stream"
                self.serve_file(asset_path, content_type)
                return

        # 4. Try serving directly from site dir
        direct_path = SITE_DIR / path.lstrip("/").replace("/", os.sep)
        if direct_path.exists() and direct_path.is_file():
            content_type = mimetypes.guess_type(str(direct_path))[0] or "application/octet-stream"
            self.serve_file(direct_path, content_type)
            return

        # 5. 404 Not Found
        self.send_error_page(404, path)

    def serve_file(self, filepath, content_type):
        try:
            with open(filepath, "rb") as f:
                data = f.read()
            self.send_response(200)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "public, max-age=3600")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(data)
        except Exception as e:
            self.send_error_page(500, str(e))

    def send_error_page(self, code, detail=""):
        body = f"""<!DOCTYPE html>
<html><head><title>{code}</title>
<style>
body {{ font-family: Inter, sans-serif; display: flex; justify-content: center;
       align-items: center; min-height: 100vh; background: #f5f5f7; color: #1e293b; }}
.box {{ text-align: center; padding: 40px; background: white; border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08); }}
h1 {{ color: #060097; font-size: 48px; margin-bottom: 8px; }}
p {{ color: #666; }}
a {{ color: #060097; text-decoration: none; }}
</style></head>
<body><div class="box">
<h1>{code}</h1>
<p>{'Page not found' if code == 404 else 'Server error'}: {detail}</p>
<p><a href="/">Back to Home</a></p>
</div></body></html>"""
        self.send_response(code)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()
        self.wfile.write(body.encode("utf-8"))

    def log_message(self, format, *args):
        # Only log errors, not every request
        status = args[1] if len(args) > 1 else ""
        if str(status).startswith("4") or str(status).startswith("5"):
            print(f"  [{status}] {args[0]}")


def main():
    print("=" * 56)
    print()
    print("   SANPAR Website - Local Mirror")
    print(f"   http://localhost:{PORT}")
    print()
    print("=" * 56)
    print(f"   Pages:  {len(PAGE_ROUTES)} routes")
    print(f"   Assets: {len(list(ASSETS_DIR.rglob('*')))} files")
    print()
    print("   Press Ctrl+C to stop")
    print("=" * 56)

    server = HTTPServer(("", PORT), MirrorHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        server.server_close()


if __name__ == "__main__":
    main()
