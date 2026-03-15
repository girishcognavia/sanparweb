#!/usr/bin/env python3
"""
SANPAR Clone Viewer - Local server to browse all cloned data.
Run: python server.py
Open: http://localhost:8080
"""

import json
import os
import http.server
import socketserver
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).parent
PORT = 3456


def load_json(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)


def get_image_files():
    images = {}
    for subdir in sorted((ROOT / "images").iterdir()):
        if subdir.is_dir():
            files = sorted([f for f in subdir.rglob("*") if f.is_file()])
            if files:
                images[subdir.name] = files
    return images


def get_screenshots():
    return sorted((ROOT / "screenshots").glob("*.png"))


def get_html_files():
    return sorted((ROOT / "raw-html").glob("*.html"))


def get_json_files():
    return sorted((ROOT / "data").rglob("*.json"))


def build_index_html():
    site_config = load_json(ROOT / "data" / "site-config.json")
    navigation = load_json(ROOT / "data" / "navigation.json")
    all_content = load_json(ROOT / "all-content.json")
    images = get_image_files()
    screenshots = get_screenshots()
    html_files = get_html_files()
    json_files = get_json_files()

    total_images = sum(len(v) for v in images.values())
    colors = site_config["design_system"]["colors"]

    # Build screenshots grid
    ss_cards = ""
    for ss in screenshots:
        name = ss.stem
        title = name.replace("-", " ").replace("ind ", "Industry: ").replace("prod ", "Product: ").replace("story ", "Story: ").title()
        ss_cards += f"""
        <div class="card screenshot-card" onclick="openModal('/screenshots/{ss.name}', '{title}')">
            <img src="/screenshots/{ss.name}" alt="{title}" loading="lazy">
            <div class="card-label">{title}</div>
        </div>"""

    # Build images grid by category
    img_sections = ""
    for category, files in images.items():
        img_cards = ""
        for f in files:
            rel = f.relative_to(ROOT / "images")
            img_cards += f"""
            <div class="card img-card" onclick="openModal('/images/{str(rel).replace(chr(92), '/')}', '{f.name}')">
                <img src="/images/{str(rel).replace(chr(92), '/')}" alt="{f.name}" loading="lazy">
                <div class="card-label">{f.name}<br><small>{f.stat().st_size:,} bytes</small></div>
            </div>"""
        img_sections += f"""
        <div class="image-category">
            <h3>{category.replace('-', ' ').title()} ({len(files)} files)</h3>
            <div class="grid img-grid">{img_cards}</div>
        </div>"""

    # Build pages data table
    pages_rows = ""
    for key in sorted(all_content.keys()):
        c = all_content[key]
        title = c.get("title", key).replace(" - Sanpar", "")
        h = len(c.get("headings", []))
        p = len(c.get("paragraphs", []))
        i = len(c.get("images", []))
        s = len(c.get("sections", []))
        b = len(c.get("breadcrumbs", []))
        lp = sum(1 for img in c.get("images", []) if img.get("local_path"))
        has_ss = "yes" if (ROOT / "screenshots" / f"{key}.png").exists() else "no"
        has_html = "yes" if (ROOT / "raw-html" / f"{key}.html").exists() else "no"
        pages_rows += f"""
        <tr>
            <td><a href="/raw-html/{key}.html" target="_blank">{key}</a></td>
            <td>{title[:40]}</td>
            <td>{h}</td><td>{p}</td><td>{i}</td><td>{s}</td><td>{b}</td><td>{lp}</td>
            <td class="status-{has_ss}">{has_ss}</td>
            <td class="status-{has_html}">{has_html}</td>
        </tr>"""

    # Build JSON files list
    json_rows = ""
    for jf in json_files:
        rel = jf.relative_to(ROOT / "data")
        size = jf.stat().st_size
        json_rows += f"""
        <tr>
            <td><a href="/data/{str(rel).replace(chr(92), '/')}" target="_blank">{str(rel).replace(chr(92), '/')}</a></td>
            <td>{size:,} bytes</td>
        </tr>"""

    # Navigation structure
    nav_items = ""
    for item in navigation.get("main_navigation", []):
        children_html = ""
        if item.get("children"):
            for child in item["children"]:
                if isinstance(child, dict) and child.get("children"):
                    sub = ", ".join(c.get("label", "") for c in child["children"])
                    children_html += f"<li><strong>{child.get('label', '')}</strong>: {sub}</li>"
                elif isinstance(child, dict):
                    children_html += f"<li><a href='{child.get('url', '#')}'>{child.get('label', '')}</a></li>"
            children_html = f"<ul>{children_html}</ul>"
        nav_items += f"<li><strong>{item['label']}</strong> &rarr; <code>{item.get('url', '/')}</code>{children_html}</li>"

    # Design system colors
    color_swatches = ""
    for name, hex_val in colors.items():
        text_color = "#fff" if hex_val in ["#060097", "#c10fff", "#1e293b", "#3a3a3a"] else "#333"
        color_swatches += f"""
        <div class="color-swatch" style="background:{hex_val};color:{text_color}">
            <strong>{name.replace('_', ' ').title()}</strong><br>{hex_val}
        </div>"""

    # Product categories
    products_html = ""
    product_cats = {}
    for item in navigation.get("main_navigation", []):
        if item.get("label") == "Products" and item.get("children"):
            for cat in item["children"]:
                if isinstance(cat, dict) and cat.get("children"):
                    cat_name = cat.get("label", "")
                    prods = []
                    for p in cat["children"]:
                        prods.append(f"<li><strong>{p.get('label', '')}</strong> - {p.get('description', '')}</li>")
                    products_html += f"<h4>{cat_name}</h4><ul>{''.join(prods)}</ul>"

    # Contact info
    contact = site_config.get("contact", {})
    addr = contact.get("address", {})

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SANPAR Clone Viewer</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700&display=swap" rel="stylesheet">
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{ font-family: 'Inter', sans-serif; background: #f5f5f7; color: #1e293b; }}

        .header {{
            background: linear-gradient(135deg, {colors['primary']}, {colors['secondary']});
            color: white; padding: 40px 20px; text-align: center;
        }}
        .header h1 {{ font-family: 'Plus Jakarta Sans', sans-serif; font-size: 36px; margin-bottom: 8px; }}
        .header p {{ opacity: 0.9; font-size: 16px; }}

        .stats-bar {{
            display: flex; justify-content: center; gap: 40px; padding: 20px;
            background: white; border-bottom: 3px solid {colors['accent']};
            flex-wrap: wrap;
        }}
        .stat {{ text-align: center; }}
        .stat .num {{ font-size: 28px; font-weight: 700; color: {colors['primary']}; }}
        .stat .label {{ font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px; }}

        .container {{ max-width: 1400px; margin: 0 auto; padding: 20px; }}

        .tabs {{
            display: flex; gap: 4px; background: white; padding: 8px;
            border-radius: 12px; margin: 20px 0; overflow-x: auto;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }}
        .tab {{
            padding: 10px 20px; border-radius: 8px; cursor: pointer;
            font-weight: 500; font-size: 14px; white-space: nowrap;
            transition: all 0.2s; border: none; background: transparent;
        }}
        .tab:hover {{ background: #f0f0f0; }}
        .tab.active {{ background: {colors['primary']}; color: white; }}

        .panel {{ display: none; background: white; border-radius: 12px; padding: 30px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }}
        .panel.active {{ display: block; }}
        .panel h2 {{ font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; margin-bottom: 20px; color: {colors['primary']}; }}
        .panel h3 {{ margin: 20px 0 10px; color: #333; }}
        .panel h4 {{ margin: 15px 0 8px; color: {colors['primary']}; }}

        .grid {{ display: grid; gap: 16px; }}
        .ss-grid {{ grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }}
        .img-grid {{ grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }}

        .card {{
            border-radius: 8px; overflow: hidden; cursor: pointer;
            border: 1px solid #eee; transition: transform 0.2s, box-shadow 0.2s;
            background: #fafafa;
        }}
        .card:hover {{ transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }}
        .card img {{ width: 100%; height: auto; display: block; }}
        .screenshot-card img {{ height: 180px; object-fit: cover; object-position: top; }}
        .img-card img {{ height: 120px; object-fit: contain; background: #f9f9f9; padding: 8px; }}
        .card-label {{ padding: 8px 12px; font-size: 12px; font-weight: 500; background: white; }}
        .card-label small {{ color: #999; }}

        table {{ width: 100%; border-collapse: collapse; font-size: 13px; }}
        th {{ background: {colors['primary']}; color: white; padding: 10px 12px; text-align: left; position: sticky; top: 0; }}
        td {{ padding: 8px 12px; border-bottom: 1px solid #eee; }}
        tr:hover {{ background: #f8f8ff; }}
        td a {{ color: {colors['primary']}; text-decoration: none; }}
        td a:hover {{ text-decoration: underline; }}
        .status-yes {{ color: #16a34a; font-weight: 600; }}
        .status-no {{ color: #dc2626; font-weight: 600; }}

        .color-swatches {{ display: flex; flex-wrap: wrap; gap: 12px; }}
        .color-swatch {{
            width: 150px; height: 90px; border-radius: 8px; padding: 12px;
            font-size: 12px; display: flex; flex-direction: column; justify-content: flex-end;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }}

        .nav-tree {{ padding: 0; }}
        .nav-tree > li {{ margin-bottom: 8px; list-style: none; }}
        .nav-tree ul {{ padding-left: 20px; margin-top: 4px; }}
        .nav-tree li {{ margin: 4px 0; font-size: 14px; }}
        .nav-tree code {{ background: #f0f0f0; padding: 2px 6px; border-radius: 4px; font-size: 12px; }}

        .info-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }}
        .info-box {{ background: #f9f6fe; border-radius: 8px; padding: 20px; border-left: 4px solid {colors['primary']}; }}
        .info-box h4 {{ margin-bottom: 8px; color: {colors['primary']}; }}
        .info-box p, .info-box li {{ font-size: 14px; line-height: 1.6; }}

        .image-category {{ margin-bottom: 30px; }}

        .modal-overlay {{
            display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85); z-index: 1000; justify-content: center; align-items: center;
            cursor: pointer;
        }}
        .modal-overlay.active {{ display: flex; }}
        .modal-overlay img {{ max-width: 95%; max-height: 90vh; border-radius: 4px; }}
        .modal-title {{ position: fixed; top: 20px; left: 50%; transform: translateX(-50%); color: white; font-size: 16px; font-weight: 600; z-index: 1001; }}
        .modal-close {{ position: fixed; top: 20px; right: 30px; color: white; font-size: 32px; cursor: pointer; z-index: 1001; }}

        .table-scroll {{ max-height: 600px; overflow-y: auto; border-radius: 8px; border: 1px solid #eee; }}
    </style>
</head>
<body>
    <div class="header">
        <h1>SANPAR Website Clone Viewer</h1>
        <p>Complete data extraction from sanpar.com - All pages, images, and content</p>
    </div>

    <div class="stats-bar">
        <div class="stat"><div class="num">{len(all_content)}</div><div class="label">Pages Scraped</div></div>
        <div class="stat"><div class="num">{len(screenshots)}</div><div class="label">Screenshots</div></div>
        <div class="stat"><div class="num">{total_images}</div><div class="label">Images</div></div>
        <div class="stat"><div class="num">{len(html_files)}</div><div class="label">HTML Files</div></div>
        <div class="stat"><div class="num">{len(json_files)}</div><div class="label">JSON Data</div></div>
        <div class="stat"><div class="num">{sum(f.stat().st_size for f in ROOT.rglob('*') if f.is_file()) // 1024 // 1024} MB</div><div class="label">Total Size</div></div>
    </div>

    <div class="container">
        <div class="tabs">
            <button class="tab active" onclick="showTab('overview')">Overview</button>
            <button class="tab" onclick="showTab('screenshots')">Screenshots ({len(screenshots)})</button>
            <button class="tab" onclick="showTab('images')">Images ({total_images})</button>
            <button class="tab" onclick="showTab('pages')">Pages Data ({len(all_content)})</button>
            <button class="tab" onclick="showTab('json')">JSON Files ({len(json_files)})</button>
            <button class="tab" onclick="showTab('design')">Design System</button>
            <button class="tab" onclick="showTab('navigation')">Navigation</button>
            <button class="tab" onclick="showTab('products')">Products</button>
            <button class="tab" onclick="showTab('contact')">Contact</button>
        </div>

        <!-- OVERVIEW -->
        <div id="overview" class="panel active">
            <h2>Clone Overview</h2>
            <div class="info-grid">
                <div class="info-box">
                    <h4>Company</h4>
                    <p><strong>{site_config['company']['name']}</strong></p>
                    <p>{site_config['company']['tagline']}</p>
                    <p>{site_config['company']['description'][:150]}...</p>
                </div>
                <div class="info-box">
                    <h4>Statistics</h4>
                    <p>Years: {site_config['statistics']['years_of_excellence']}</p>
                    <p>Employees: {site_config['statistics']['employees']}</p>
                    <p>Products: {site_config['statistics']['products']}</p>
                    <p>Customers: {site_config['statistics']['customers']}</p>
                </div>
                <div class="info-box">
                    <h4>Platform</h4>
                    <p>CMS: {site_config['platform']['cms']}</p>
                    <p>Theme: {site_config['platform']['theme']}</p>
                    <p>Builder: {site_config['platform']['page_builder']}</p>
                    <p>eCommerce: {site_config['platform']['ecommerce']}</p>
                </div>
                <div class="info-box">
                    <h4>Content Extracted</h4>
                    <p>Headings: {sum(len(c.get('headings', [])) for c in all_content.values())}</p>
                    <p>Paragraphs: {sum(len(c.get('paragraphs', [])) for c in all_content.values())}</p>
                    <p>Sections: {sum(len(c.get('sections', [])) for c in all_content.values())}</p>
                    <p>Links: {sum(len(c.get('links', [])) for c in all_content.values())}</p>
                </div>
            </div>
        </div>

        <!-- SCREENSHOTS -->
        <div id="screenshots" class="panel">
            <h2>Full-Page Screenshots ({len(screenshots)})</h2>
            <p style="margin-bottom:20px;color:#666">Click any screenshot to view full size</p>
            <div class="grid ss-grid">{ss_cards}</div>
        </div>

        <!-- IMAGES -->
        <div id="images" class="panel">
            <h2>Downloaded Images ({total_images})</h2>
            <p style="margin-bottom:20px;color:#666">Click any image to view full size</p>
            {img_sections}
        </div>

        <!-- PAGES DATA -->
        <div id="pages" class="panel">
            <h2>Pages Data ({len(all_content)} pages)</h2>
            <p style="margin-bottom:15px;color:#666">H=Headings, P=Paragraphs, I=Images, S=Sections, B=Breadcrumbs, LP=Local Paths</p>
            <div class="table-scroll">
                <table>
                    <tr><th>Page Key</th><th>Title</th><th>H</th><th>P</th><th>I</th><th>S</th><th>B</th><th>LP</th><th>SS</th><th>HTML</th></tr>
                    {pages_rows}
                </table>
            </div>
        </div>

        <!-- JSON FILES -->
        <div id="json" class="panel">
            <h2>JSON Data Files ({len(json_files)})</h2>
            <div class="table-scroll">
                <table>
                    <tr><th>File Path</th><th>Size</th></tr>
                    {json_rows}
                </table>
            </div>
        </div>

        <!-- DESIGN SYSTEM -->
        <div id="design" class="panel">
            <h2>Design System</h2>
            <h3>Color Palette</h3>
            <div class="color-swatches">{color_swatches}</div>
            <h3 style="margin-top:30px">Typography</h3>
            <div class="info-grid">
                <div class="info-box">
                    <h4>Headings Font</h4>
                    <p style="font-family:'Plus Jakarta Sans',sans-serif;font-size:24px;font-weight:600">Plus Jakarta Sans</p>
                    <p>H1: 64px / 600 | H2: 48px / 600 | H3: 24px / 600</p>
                </div>
                <div class="info-box">
                    <h4>Body Font</h4>
                    <p style="font-family:'Inter',sans-serif;font-size:16px">Inter - Body text at 16px / 400</p>
                    <p>Small: 14px / 400</p>
                </div>
                <div class="info-box">
                    <h4>Buttons</h4>
                    <p>Border-radius: 50px (pill shape)</p>
                    <p>Padding: 12px 32px</p>
                    <p style="margin-top:8px">
                        <span style="background:{colors['primary']};color:white;padding:8px 24px;border-radius:50px;font-size:13px">Primary Button</span>
                        <span style="border:2px solid {colors['primary']};color:{colors['primary']};padding:6px 22px;border-radius:50px;font-size:13px;margin-left:8px">Secondary</span>
                    </p>
                </div>
                <div class="info-box">
                    <h4>Layout</h4>
                    <p>Container: max-width 1200px</p>
                    <p>Section padding: 80px 0</p>
                    <p>Mobile: 544px | Tablet: 921px</p>
                </div>
            </div>
        </div>

        <!-- NAVIGATION -->
        <div id="navigation" class="panel">
            <h2>Site Navigation Structure</h2>
            <ul class="nav-tree">{nav_items}</ul>
        </div>

        <!-- PRODUCTS -->
        <div id="products" class="panel">
            <h2>Products & Categories</h2>
            {products_html}
        </div>

        <!-- CONTACT -->
        <div id="contact" class="panel">
            <h2>Contact Information</h2>
            <div class="info-grid">
                <div class="info-box">
                    <h4>Phone & Email</h4>
                    <p>Phone: {contact.get('phone', '')}</p>
                    <p>Fax: {contact.get('fax', '')}</p>
                    <p>Email: {contact.get('email', '')}</p>
                </div>
                <div class="info-box">
                    <h4>Address</h4>
                    <p>{addr.get('company', '')}</p>
                    <p>{addr.get('line1', '')}</p>
                    <p>{addr.get('line2', '')}</p>
                    <p>{addr.get('line3', '')}</p>
                    <p>{addr.get('city', '')} - {addr.get('pincode', '')}</p>
                    <p>{addr.get('state', '')}, {addr.get('country', '')}</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal for image viewing -->
    <div class="modal-overlay" id="modal" onclick="closeModal()">
        <span class="modal-close">&times;</span>
        <div class="modal-title" id="modal-title"></div>
        <img id="modal-img" src="" alt="">
    </div>

    <script>
        function showTab(id) {{
            document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.getElementById(id).classList.add('active');
            event.target.classList.add('active');
        }}

        function openModal(src, title) {{
            document.getElementById('modal').classList.add('active');
            document.getElementById('modal-img').src = src;
            document.getElementById('modal-title').textContent = title;
        }}

        function closeModal() {{
            document.getElementById('modal').classList.remove('active');
        }}

        document.addEventListener('keydown', e => {{ if (e.key === 'Escape') closeModal(); }});
    </script>
</body>
</html>"""
    return html


class CloneHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        path = unquote(self.path)
        if path == "/" or path == "/index.html":
            html = build_index_html()
            self.send_response(200)
            self.send_header("Content-type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(html.encode("utf-8"))))
            self.end_headers()
            self.wfile.write(html.encode("utf-8"))
        else:
            super().do_GET()

    def log_message(self, format, *args):
        pass  # Suppress request logs


if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), CloneHandler) as httpd:
        print(f"=" * 50)
        print(f"  SANPAR Clone Viewer")
        print(f"  http://localhost:{PORT}")
        print(f"=" * 50)
        print(f"  Press Ctrl+C to stop")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
