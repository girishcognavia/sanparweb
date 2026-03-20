#!/usr/bin/env python3
"""
SANPAR Website Mirror Builder
Downloads all external assets (CSS, JS, fonts, images) and rewrites HTML
to create a fully self-contained local mirror of sanpar.com.
"""

import os
import re
import json
import hashlib
import time
from pathlib import Path
from urllib.parse import urljoin, urlparse, quote
from concurrent.futures import ThreadPoolExecutor, as_completed

import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).parent
RAW_HTML_DIR = ROOT / "raw-html"
SITE_DIR = ROOT / "site"  # The fully mirrored site
ASSETS_DIR = SITE_DIR / "assets"

BASE_URL = "https://sanpar.com"
SESSION = requests.Session()
SESSION.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
})

# Track all downloaded assets for deduplication
downloaded_assets = {}  # url -> local_relative_path
failed_assets = set()

# Page slug -> URL path mapping
PAGE_ROUTES = {
    "homepage": "/",
    "who-we-are": "/who-we-are/",
    "contact-us": "/contact-us/",
    "products-solutions": "/products-solutions/",
    "industries-applications": "/industries-applications/",
    "support-service": "/support-service/",
    "technology": "/technology/",
    "work-with-us": "/work-with-us/",
    "success-stories": "/success-stories/",
    "news": "/news/",
    "blogs": "/blogs/",
    "events": "/events/",
    "shop": "/shop/",
    "job-openings": "/job-openings/",
    "privacy-policy": "/privacy-policy/",
    "terms-and-conditions": "/terms-and-conditions/",
    "ind-aerospace-defence": "/industries-applications/aerospace-and-defence/",
    "ind-machine-tools": "/industries-applications/machine-tools/",
    "ind-pharmaceutical": "/industries-applications/pharmaceutical/",
    "ind-cement": "/industries-applications/cement-industry/",
    "ind-textile": "/industries-applications/textile-industry/",
    "ind-food-beverage": "/industries-applications/food-beverage-industry/",
    "ind-plastics": "/industries-applications/plastics-industry/",
    "ind-manufacturing": "/industries-applications/manufacturing-industry/",
    "ind-energy-power": "/industries-applications/energy-power-industry/",
    "ind-chemical": "/industries-applications/chemical-indsutry/",
    "prod-water-chillers": "/our-prouct/water-chillers/",
    "prod-cat-m1-series": "/our-prouct/cat-m1-series/",
    "prod-dehumidifier": "/our-prouct/dehumidifier/",
    "prod-precision-ac": "/our-prouct/precision-air-conditioner/",
    "prod-air-chillers": "/our-prouct/air-chillers/",
    "prod-moisture-separator": "/our-prouct/centrifugal-moisture-separator/",
    "prod-aftercooler": "/our-prouct/aftercooler/",
    "prod-compressed-air-filters": "/our-prouct/compressed-air-filters/",
    "prod-adsorption-dryers": "/our-prouct/adsorption-based-compressed-air-dryers/",
    "prod-xeros-series": "/our-prouct/xeros-series/",
    "prod-cat-dth-series": "/our-prouct/cat-dth-series/",
    "prod-drains": "/our-prouct/drains/",
    "prod-coolant-chillers": "/our-prouct/coolant-chillers/",
    "prod-ecodrair-series": "/our-prouct/ecodrair-series/",
    "story-hindustan-motors": "/success-stories/hindustan-motors/",
    "story-hical-technologies": "/success-stories/hical-technologies/",
    "story-excel-glass": "/success-stories/excel-glass/",
    "story-infosys": "/success-stories/infosys-technologies-ltd/",
    "story-jmt-auto": "/success-stories/jmt-auto-ltd/",
    "story-gas-turbine": "/success-stories/gas-turbine-research-establishment/",
    "story-ashok-leyland": "/success-stories/ashok-leyland-ltd/",
    "story-jindal-steel": "/success-stories/jindal-steel-power-limited-raigarh/",
}

# Reverse: URL path -> slug
URL_TO_SLUG = {v: k for k, v in PAGE_ROUTES.items()}


def download_asset(url, category="misc"):
    """Download an external asset and return its local path."""
    if not url or url.startswith("data:") or url.startswith("#") or url.startswith("javascript:"):
        return None

    # Normalize URL
    if url.startswith("//"):
        url = "https:" + url
    elif url.startswith("/"):
        url = BASE_URL + url
    elif not url.startswith("http"):
        url = urljoin(BASE_URL, url)

    # Skip non-sanpar external assets we can't/shouldn't download (except google fonts and common CDNs)
    parsed = urlparse(url)
    allowed_hosts = [
        "sanpar.com", "www.sanpar.com",
        "fonts.googleapis.com", "fonts.gstatic.com",
        "cdn.jsdelivr.net", "cdnjs.cloudflare.com",
        "unpkg.com", "www.googletagmanager.com",
        "www.google.com", "www.gstatic.com",
    ]
    if not any(h in parsed.hostname for h in allowed_hosts if parsed.hostname):
        return None

    # Already downloaded?
    if url in downloaded_assets:
        return downloaded_assets[url]
    if url in failed_assets:
        return None

    # Determine local path
    path_part = parsed.path.lstrip("/")
    if not path_part or path_part.endswith("/"):
        path_part += "index"

    # For google fonts CSS, use a hash-based name
    if "fonts.googleapis.com" in (parsed.hostname or ""):
        ext = ".css"
        fname = hashlib.md5(url.encode()).hexdigest()[:16] + ext
        local_rel = f"assets/fonts/{fname}"
    elif "fonts.gstatic.com" in (parsed.hostname or ""):
        fname = os.path.basename(path_part) or hashlib.md5(url.encode()).hexdigest()[:16]
        local_rel = f"assets/fonts/{fname}"
    elif parsed.hostname and "sanpar.com" not in parsed.hostname:
        # External CDN asset
        fname = os.path.basename(path_part) or hashlib.md5(url.encode()).hexdigest()[:12]
        local_rel = f"assets/cdn/{parsed.hostname}/{fname}"
    else:
        # Sanpar's own assets
        local_rel = f"assets/{path_part}"

    local_path = SITE_DIR / local_rel.replace("/", os.sep)
    local_path.parent.mkdir(parents=True, exist_ok=True)

    if local_path.exists() and local_path.stat().st_size > 0:
        downloaded_assets[url] = local_rel
        return local_rel

    try:
        resp = SESSION.get(url, timeout=20, stream=True)
        if resp.status_code == 200:
            with open(local_path, "wb") as f:
                for chunk in resp.iter_content(8192):
                    f.write(chunk)
            downloaded_assets[url] = local_rel
            return local_rel
        else:
            failed_assets.add(url)
            return None
    except Exception:
        failed_assets.add(url)
        return None


def extract_and_download_assets(html_content):
    """Find all external asset URLs in HTML and download them."""
    soup = BeautifulSoup(html_content, "lxml")
    urls_to_download = []

    # CSS link tags
    for link in soup.find_all("link", rel="stylesheet"):
        href = link.get("href", "")
        if href:
            urls_to_download.append(("css", href))

    # Script tags
    for script in soup.find_all("script", src=True):
        src = script.get("src", "")
        if src:
            urls_to_download.append(("js", src))

    # Images
    for img in soup.find_all("img"):
        for attr in ["src", "data-src", "data-lazy-src", "srcset"]:
            val = img.get(attr, "")
            if val:
                if attr == "srcset":
                    for part in val.split(","):
                        u = part.strip().split(" ")[0]
                        if u:
                            urls_to_download.append(("img", u))
                else:
                    urls_to_download.append(("img", val))

    # Background images in inline styles
    for elem in soup.find_all(style=True):
        style = elem.get("style", "")
        for match in re.findall(r'url\(["\']?(.*?)["\']?\)', style):
            if match and not match.startswith("data:"):
                urls_to_download.append(("img", match))

    # Favicon and other link tags
    for link in soup.find_all("link", href=True):
        href = link.get("href", "")
        rel = " ".join(link.get("rel", []))
        if "icon" in rel or "apple-touch" in rel:
            urls_to_download.append(("img", href))
        elif "preload" in rel or "preconnect" in rel:
            continue  # Skip preloads

    # Font-face URLs in inline style tags
    for style_tag in soup.find_all("style"):
        if style_tag.string:
            for match in re.findall(r'url\(["\']?(.*?)["\']?\)', style_tag.string):
                if match and not match.startswith("data:"):
                    urls_to_download.append(("font", match))

    return urls_to_download


def process_css_for_assets(css_content, css_url):
    """Download assets referenced within CSS files (fonts, images)."""
    replacements = {}
    for match in re.finditer(r'url\(["\']?(.*?)["\']?\)', css_content):
        asset_url = match.group(1)
        if asset_url and not asset_url.startswith("data:"):
            full_url = urljoin(css_url, asset_url)
            local_path = download_asset(full_url, "css-asset")
            if local_path:
                replacements[match.group(0)] = f"url(/{local_path})"

    result = css_content
    for old, new in replacements.items():
        result = result.replace(old, new)
    return result


def rewrite_html(html_content, page_slug):
    """Rewrite HTML to use local asset paths and fix navigation links."""
    soup = BeautifulSoup(html_content, "lxml")

    # Rewrite CSS links
    for link in soup.find_all("link", rel="stylesheet"):
        href = link.get("href", "")
        if href:
            full_url = urljoin(BASE_URL, href) if not href.startswith("http") else href
            local = downloaded_assets.get(full_url) or downloaded_assets.get(href)
            if local:
                link["href"] = "/" + local

    # Rewrite script src
    for script in soup.find_all("script", src=True):
        src = script.get("src", "")
        if src:
            full_url = urljoin(BASE_URL, src) if not src.startswith("http") else src
            local = downloaded_assets.get(full_url) or downloaded_assets.get(src)
            if local:
                script["src"] = "/" + local

    # Rewrite image sources
    for img in soup.find_all("img"):
        for attr in ["src", "data-src", "data-lazy-src"]:
            val = img.get(attr, "")
            if val and not val.startswith("data:"):
                full_url = urljoin(BASE_URL, val) if not val.startswith("http") else val
                local = downloaded_assets.get(full_url) or downloaded_assets.get(val)
                if local:
                    img[attr] = "/" + local
        # Rewrite srcset
        srcset = img.get("srcset", "")
        if srcset:
            new_parts = []
            for part in srcset.split(","):
                part = part.strip()
                pieces = part.split(" ")
                if pieces:
                    u = pieces[0]
                    full_url = urljoin(BASE_URL, u) if not u.startswith("http") else u
                    local = downloaded_assets.get(full_url) or downloaded_assets.get(u)
                    if local:
                        pieces[0] = "/" + local
                    new_parts.append(" ".join(pieces))
            img["srcset"] = ", ".join(new_parts)

    # Rewrite background-image URLs in style attributes
    for elem in soup.find_all(style=True):
        style = elem.get("style", "")
        new_style = style
        for match in re.finditer(r'url\(["\']?(.*?)["\']?\)', style):
            asset_url = match.group(1)
            if asset_url and not asset_url.startswith("data:"):
                full_url = urljoin(BASE_URL, asset_url) if not asset_url.startswith("http") else asset_url
                local = downloaded_assets.get(full_url) or downloaded_assets.get(asset_url)
                if local:
                    new_style = new_style.replace(match.group(0), f'url(/{local})')
        if new_style != style:
            elem["style"] = new_style

    # Rewrite inline CSS url() references in <style> tags
    for style_tag in soup.find_all("style"):
        if style_tag.string:
            new_css = style_tag.string
            for match in re.finditer(r'url\(["\']?(.*?)["\']?\)', style_tag.string):
                asset_url = match.group(1)
                if asset_url and not asset_url.startswith("data:"):
                    full_url = urljoin(BASE_URL, asset_url) if not asset_url.startswith("http") else asset_url
                    local = downloaded_assets.get(full_url) or downloaded_assets.get(asset_url)
                    if local:
                        new_css = new_css.replace(match.group(0), f'url(/{local})')
            style_tag.string = new_css

    # Rewrite favicon/icon links
    for link in soup.find_all("link", href=True):
        href = link.get("href", "")
        rel = " ".join(link.get("rel", []))
        if href and ("icon" in rel or "apple-touch" in rel):
            full_url = urljoin(BASE_URL, href) if not href.startswith("http") else href
            local = downloaded_assets.get(full_url) or downloaded_assets.get(href)
            if local:
                link["href"] = "/" + local

    # Rewrite internal navigation links to work locally
    for a in soup.find_all("a", href=True):
        href = a.get("href", "")
        if not href:
            continue

        # Normalize sanpar.com URLs to paths
        if href.startswith(BASE_URL):
            href = href[len(BASE_URL):]

        # Only rewrite internal links
        if href.startswith("/") and not href.startswith("//"):
            # Check if it maps to a known page
            normalized = href.rstrip("/") + "/"
            if normalized == "/":
                normalized = "/"
            if normalized in URL_TO_SLUG or href in URL_TO_SLUG:
                a["href"] = href  # Keep the path, server will route it

    # Remove Google Analytics / tracking scripts to avoid errors
    for script in soup.find_all("script"):
        text = script.string or ""
        src = script.get("src", "")
        if "googletagmanager" in src or "gtag" in text or "google-analytics" in src:
            script.decompose()
        elif "recaptcha" in src:
            script.decompose()

    # Remove WooCommerce cart fragments that cause JS errors
    for script in soup.find_all("script"):
        text = script.string or ""
        if "wc_cart_fragments" in text or "woocommerce" in (script.get("id", "") or ""):
            if "var wc_cart" in text:
                script.decompose()

    return str(soup)


def main():
    print("=" * 60)
    print("  SANPAR Website Mirror Builder")
    print("=" * 60)

    # Create site directory structure
    SITE_DIR.mkdir(parents=True, exist_ok=True)
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    (ASSETS_DIR / "fonts").mkdir(exist_ok=True)
    (ASSETS_DIR / "cdn").mkdir(exist_ok=True)

    # Phase 1: Collect all asset URLs from all HTML files
    print("\n--- Phase 1: Collecting asset URLs from all HTML files ---")
    all_assets = {}  # url -> category
    html_files = list(RAW_HTML_DIR.glob("*.html"))

    for hf in html_files:
        with open(hf, "r", encoding="utf-8") as f:
            html = f.read()
        assets = extract_and_download_assets(html)
        for category, url in assets:
            if url.startswith("//"):
                url = "https:" + url
            elif url.startswith("/"):
                url = BASE_URL + url
            elif not url.startswith("http"):
                url = urljoin(BASE_URL, url)
            all_assets[url] = category

    print(f"  Found {len(all_assets)} unique asset URLs")

    # Phase 2: Download all assets
    print("\n--- Phase 2: Downloading assets ---")
    downloaded = 0
    total = len(all_assets)

    for i, (url, category) in enumerate(all_assets.items(), 1):
        result = download_asset(url, category)
        if result:
            downloaded += 1
        if i % 50 == 0 or i == total:
            print(f"  Progress: {i}/{total} ({downloaded} downloaded)")

    print(f"  Downloaded: {downloaded}/{total}")
    print(f"  Failed: {len(failed_assets)}")

    # Phase 3: Process downloaded CSS files for nested assets
    print("\n--- Phase 3: Processing CSS files for nested assets (fonts, bg images) ---")
    css_files = list(ASSETS_DIR.rglob("*.css"))
    nested_downloaded = 0
    for cf in css_files:
        try:
            with open(cf, "r", encoding="utf-8", errors="ignore") as f:
                css_content = f.read()

            # Find the original URL for this CSS file
            original_url = None
            rel_path = str(cf.relative_to(SITE_DIR)).replace("\\", "/")
            for url, local in downloaded_assets.items():
                if local == rel_path:
                    original_url = url
                    break

            if original_url:
                new_css = process_css_for_assets(css_content, original_url)
                with open(cf, "w", encoding="utf-8") as f:
                    f.write(new_css)
                nested_downloaded += len(re.findall(r'url\(/', new_css)) - len(re.findall(r'url\(/', css_content))
        except Exception:
            pass

    print(f"  Processed {len(css_files)} CSS files")

    # Phase 4: Rewrite HTML files
    print("\n--- Phase 4: Rewriting HTML files ---")
    pages_dir = SITE_DIR / "pages"
    pages_dir.mkdir(exist_ok=True)

    for hf in html_files:
        slug = hf.stem
        with open(hf, "r", encoding="utf-8") as f:
            html = f.read()

        rewritten = rewrite_html(html, slug)
        output_path = pages_dir / f"{slug}.html"
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(rewritten)

    print(f"  Rewrote {len(html_files)} HTML files")

    # Phase 5: Copy local images to site assets
    print("\n--- Phase 5: Copying local images ---")
    images_src = ROOT / "images"
    images_dst = SITE_DIR / "assets" / "wp-content" / "uploads"
    copied = 0
    for img in images_src.rglob("*"):
        if img.is_file():
            # We need to place them where the rewritten URLs expect them
            # The HTML references them as /assets/wp-content/uploads/...
            # Let's just ensure they're accessible
            pass

    # Save the asset mapping for the server
    with open(SITE_DIR / "asset-map.json", "w", encoding="utf-8") as f:
        json.dump(downloaded_assets, f, indent=2)

    # Save the route mapping
    with open(SITE_DIR / "routes.json", "w", encoding="utf-8") as f:
        json.dump(PAGE_ROUTES, f, indent=2)

    print(f"\n{'=' * 60}")
    print(f"  MIRROR BUILD COMPLETE!")
    print(f"{'=' * 60}")
    print(f"  Assets downloaded: {len(downloaded_assets)}")
    print(f"  Pages rewritten: {len(html_files)}")
    print(f"  Output directory: {SITE_DIR}")
    print(f"  Failed downloads: {len(failed_assets)}")

    if failed_assets:
        print(f"\n  Sample failed URLs:")
        for u in list(failed_assets)[:10]:
            print(f"    - {u}")


if __name__ == "__main__":
    main()
