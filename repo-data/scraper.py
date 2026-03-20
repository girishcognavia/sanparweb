#!/usr/bin/env python3
"""
SANPAR Website Scraper
Comprehensive scraper to clone all data, images, and content from sanpar.com
"""

import os
import sys
import json
import time
import re
import hashlib
from urllib.parse import urljoin, urlparse
from pathlib import Path

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Installing required packages...")
    os.system(f"{sys.executable} -m pip install requests beautifulsoup4 lxml")
    import requests
    from bs4 import BeautifulSoup

# Configuration
BASE_URL = "https://sanpar.com"
OUTPUT_DIR = Path(__file__).parent
DATA_DIR = OUTPUT_DIR / "data"
IMAGES_DIR = OUTPUT_DIR / "images"
RAW_HTML_DIR = OUTPUT_DIR / "raw-html"
SCREENSHOTS_DIR = OUTPUT_DIR / "screenshots"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}

SESSION = requests.Session()
SESSION.headers.update(HEADERS)

# All pages to scrape (from sitemap analysis)
ALL_PAGES = {
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
    # Industry pages
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
    # Product pages
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
    # Success stories
    "story-hindustan-motors": "/success-stories/hindustan-motors/",
    "story-hical-technologies": "/success-stories/hical-technologies/",
    "story-excel-glass": "/success-stories/excel-glass/",
    "story-infosys": "/success-stories/infosys-technologies-ltd/",
    "story-jmt-auto": "/success-stories/jmt-auto-ltd/",
    "story-gas-turbine": "/success-stories/gas-turbine-research-establishment/",
    "story-ashok-leyland": "/success-stories/ashok-leyland-ltd/",
    "story-jindal-steel": "/success-stories/jindal-steel-power-limited-raigarh/",
}


def fetch_page(url):
    """Fetch a page and return response object."""
    full_url = urljoin(BASE_URL, url)
    try:
        resp = SESSION.get(full_url, timeout=30)
        resp.raise_for_status()
        return resp
    except requests.RequestException as e:
        print(f"  [ERROR] Failed to fetch {full_url}: {e}")
        return None


def extract_page_content(html, url):
    """Extract structured content from an HTML page."""
    soup = BeautifulSoup(html, "lxml")
    content = {
        "url": urljoin(BASE_URL, url),
        "title": "",
        "meta_description": "",
        "breadcrumbs": [],
        "headings": [],
        "paragraphs": [],
        "lists": [],
        "links": [],
        "images": [],
        "buttons": [],
        "sections": [],
        "raw_text": "",
        "structured_data": [],
    }

    # Title
    title_tag = soup.find("title")
    if title_tag:
        content["title"] = title_tag.get_text(strip=True)

    # Meta description
    meta_desc = soup.find("meta", attrs={"name": "description"})
    if meta_desc:
        content["meta_description"] = meta_desc.get("content", "")

    # OG image
    og_image = soup.find("meta", attrs={"property": "og:image"})
    if og_image:
        content["og_image"] = og_image.get("content", "")

    # Structured data (JSON-LD)
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(script.string)
            content["structured_data"].append(data)
        except (json.JSONDecodeError, TypeError):
            pass

    # Remove script, style, nav, footer for content extraction
    main_content = soup.find("main") or soup.find("div", id="content") or soup.find("article") or soup

    # Also try to find Elementor content
    elementor_content = soup.find_all("div", class_=re.compile(r"elementor-section|elementor-widget"))

    # Extract headings
    for tag in ["h1", "h2", "h3", "h4", "h5", "h6"]:
        for heading in soup.find_all(tag):
            text = heading.get_text(strip=True)
            if text and len(text) > 1:
                content["headings"].append({
                    "level": tag,
                    "text": text,
                })

    # Extract paragraphs
    for p in soup.find_all("p"):
        text = p.get_text(strip=True)
        if text and len(text) > 5:
            content["paragraphs"].append(text)

    # Extract lists
    for ul in soup.find_all(["ul", "ol"]):
        items = []
        for li in ul.find_all("li", recursive=False):
            text = li.get_text(strip=True)
            if text:
                items.append(text)
        if items:
            content["lists"].append(items)

    # Extract all images
    for img in soup.find_all("img"):
        src = img.get("src", "") or img.get("data-src", "") or img.get("data-lazy-src", "")
        if src and not src.startswith("data:"):
            full_src = urljoin(BASE_URL, src)
            content["images"].append({
                "src": full_src,
                "alt": img.get("alt", ""),
                "width": img.get("width", ""),
                "height": img.get("height", ""),
            })

    # Also check for background images in style attributes
    for elem in soup.find_all(style=True):
        style = elem.get("style", "")
        bg_urls = re.findall(r'url\(["\']?(.*?)["\']?\)', style)
        for bg_url in bg_urls:
            if bg_url and not bg_url.startswith("data:"):
                full_src = urljoin(BASE_URL, bg_url)
                content["images"].append({
                    "src": full_src,
                    "alt": "background-image",
                    "type": "background",
                })

    # Extract links
    for a in soup.find_all("a", href=True):
        href = a.get("href", "")
        text = a.get_text(strip=True)
        if href and href != "#":
            content["links"].append({
                "href": urljoin(BASE_URL, href),
                "text": text,
                "classes": " ".join(a.get("class", [])),
            })

    # Extract buttons
    for btn in soup.find_all(["button", "a"], class_=re.compile(r"btn|button|cta|elementor-button")):
        text = btn.get_text(strip=True)
        href = btn.get("href", "")
        if text:
            content["buttons"].append({
                "text": text,
                "href": urljoin(BASE_URL, href) if href else "",
                "classes": " ".join(btn.get("class", [])),
            })

    # Extract Elementor sections
    for section in soup.find_all("section", class_=re.compile(r"elementor-section")):
        section_data = {
            "id": section.get("data-id", ""),
            "classes": " ".join(section.get("class", [])),
            "headings": [],
            "text": [],
            "images": [],
        }
        for h in section.find_all(["h1", "h2", "h3", "h4", "h5", "h6"]):
            t = h.get_text(strip=True)
            if t:
                section_data["headings"].append(t)
        for p in section.find_all("p"):
            t = p.get_text(strip=True)
            if t and len(t) > 3:
                section_data["text"].append(t)
        for img in section.find_all("img"):
            src = img.get("src", "") or img.get("data-src", "")
            if src and not src.startswith("data:"):
                section_data["images"].append(urljoin(BASE_URL, src))
        if section_data["headings"] or section_data["text"]:
            content["sections"].append(section_data)

    # Extract breadcrumbs
    breadcrumb_nav = soup.find("nav", class_=re.compile(r"breadcrumb")) or soup.find("div", class_=re.compile(r"breadcrumb"))
    if breadcrumb_nav:
        for a in breadcrumb_nav.find_all("a"):
            content["breadcrumbs"].append({
                "text": a.get_text(strip=True),
                "href": urljoin(BASE_URL, a.get("href", "")),
            })

    # Raw text content
    body = soup.find("body")
    if body:
        # Remove script and style
        for tag in body.find_all(["script", "style", "noscript"]):
            tag.decompose()
        content["raw_text"] = body.get_text(separator="\n", strip=True)
        # Clean up excessive newlines
        content["raw_text"] = re.sub(r"\n{3,}", "\n\n", content["raw_text"])

    return content


def download_image(url, save_dir, filename=None):
    """Download an image and save it."""
    if not url or url.startswith("data:"):
        return None

    try:
        parsed = urlparse(url)
        if not filename:
            filename = os.path.basename(parsed.path)
        if not filename or filename == "/":
            filename = hashlib.md5(url.encode()).hexdigest()[:12] + ".jpg"

        filepath = save_dir / filename
        if filepath.exists() and filepath.stat().st_size > 0:
            return str(filepath)

        resp = SESSION.get(url, timeout=30, stream=True)
        resp.raise_for_status()

        with open(filepath, "wb") as f:
            for chunk in resp.iter_content(chunk_size=8192):
                f.write(chunk)

        size = filepath.stat().st_size
        if size > 0:
            print(f"  [OK] Downloaded: {filename} ({size:,} bytes)")
            return str(filepath)
        else:
            filepath.unlink(missing_ok=True)
            return None
    except Exception as e:
        print(f"  [ERROR] Failed to download {url}: {e}")
        return None


def scrape_all_pages():
    """Scrape all pages and save raw HTML + extracted content."""
    all_content = {}
    all_images = set()

    total = len(ALL_PAGES)
    for i, (name, path) in enumerate(ALL_PAGES.items(), 1):
        print(f"\n[{i}/{total}] Scraping: {name} ({path})")

        resp = fetch_page(path)
        if not resp:
            continue

        # Save raw HTML
        safe_name = name.replace("/", "_")
        html_file = RAW_HTML_DIR / f"{safe_name}.html"
        with open(html_file, "w", encoding="utf-8") as f:
            f.write(resp.text)
        print(f"  Saved HTML: {html_file.name}")

        # Extract content
        content = extract_page_content(resp.text, path)
        all_content[name] = content

        # Collect image URLs
        for img in content["images"]:
            src = img.get("src", "")
            if src and "sanpar.com" in src:
                all_images.add(src)

        print(f"  Found: {len(content['headings'])} headings, {len(content['paragraphs'])} paragraphs, {len(content['images'])} images")

        # Be polite - small delay between requests
        time.sleep(0.5)

    return all_content, all_images


def download_all_images(image_urls):
    """Download all discovered images into categorized folders."""
    print(f"\n{'='*60}")
    print(f"Downloading {len(image_urls)} images...")
    print(f"{'='*60}")

    downloaded = 0
    for url in sorted(image_urls):
        # Categorize by URL path
        if "logo" in url.lower() or "icon" in url.lower() or "favicon" in url.lower():
            save_dir = IMAGES_DIR / "logo"
        elif any(p in url.lower() for p in ["product", "xeros", "chiller", "dryer", "filter", "drain", "cooler", "separator", "dehumid", "conditioner", "ecodrair", "cat_", "medical", "sfd", "smpl", "sac_", "ms_", "element"]):
            save_dir = IMAGES_DIR / "products"
        elif "banner" in url.lower() or "hero" in url.lower() or "slide" in url.lower():
            save_dir = IMAGES_DIR / "banners"
        elif "industry" in url.lower() or "sector" in url.lower():
            save_dir = IMAGES_DIR / "industries"
        elif "success" in url.lower() or "story" in url.lower() or "client" in url.lower():
            save_dir = IMAGES_DIR / "success-stories"
        else:
            save_dir = IMAGES_DIR / "misc"

        save_dir.mkdir(parents=True, exist_ok=True)
        result = download_image(url, save_dir)
        if result:
            downloaded += 1

    print(f"\nDownloaded {downloaded}/{len(image_urls)} images successfully.")
    return downloaded


def save_content_json(all_content):
    """Save extracted content into organized JSON files."""
    print(f"\n{'='*60}")
    print("Saving structured content JSON files...")
    print(f"{'='*60}")

    # Homepage
    if "homepage" in all_content:
        save_json(DATA_DIR / "homepage.json", all_content["homepage"])

    # Who We Are
    if "who-we-are" in all_content:
        save_json(DATA_DIR / "who-we-are.json", all_content["who-we-are"])

    # Contact Us
    if "contact-us" in all_content:
        save_json(DATA_DIR / "contact-us.json", all_content["contact-us"])

    # Support & Service
    if "support-service" in all_content:
        save_json(DATA_DIR / "support-service.json", all_content["support-service"])

    # Technology
    if "technology" in all_content:
        save_json(DATA_DIR / "technology.json", all_content["technology"])

    # Work With Us
    if "work-with-us" in all_content:
        save_json(DATA_DIR / "work-with-us.json", all_content["work-with-us"])

    # News
    if "news" in all_content:
        save_json(DATA_DIR / "news.json", all_content["news"])

    # Blogs
    if "blogs" in all_content:
        save_json(DATA_DIR / "blogs.json", all_content["blogs"])

    # Events
    if "events" in all_content:
        save_json(DATA_DIR / "events.json", all_content["events"])

    # Products
    products_dir = DATA_DIR / "products"
    products_dir.mkdir(exist_ok=True)
    product_index = []
    for name, content in all_content.items():
        if name.startswith("prod-"):
            prod_name = name.replace("prod-", "")
            save_json(products_dir / f"{prod_name}.json", content)
            product_index.append({
                "slug": prod_name,
                "title": content.get("title", ""),
                "url": content.get("url", ""),
            })
    save_json(products_dir / "_index.json", {"products": product_index})

    # Industries
    industries_dir = DATA_DIR / "industries"
    industries_dir.mkdir(exist_ok=True)
    industry_index = []
    for name, content in all_content.items():
        if name.startswith("ind-"):
            ind_name = name.replace("ind-", "")
            save_json(industries_dir / f"{ind_name}.json", content)
            industry_index.append({
                "slug": ind_name,
                "title": content.get("title", ""),
                "url": content.get("url", ""),
            })
    save_json(industries_dir / "_index.json", {"industries": industry_index})

    # Success Stories
    stories_dir = DATA_DIR / "success-stories"
    stories_dir.mkdir(exist_ok=True)
    story_index = []
    for name, content in all_content.items():
        if name.startswith("story-"):
            story_name = name.replace("story-", "")
            save_json(stories_dir / f"{story_name}.json", content)
            story_index.append({
                "slug": story_name,
                "title": content.get("title", ""),
                "url": content.get("url", ""),
            })
    save_json(stories_dir / "_index.json", {"success_stories": story_index})

    # Products & Solutions index page
    if "products-solutions" in all_content:
        save_json(DATA_DIR / "products" / "products-solutions.json", all_content["products-solutions"])

    # Industries index page
    if "industries-applications" in all_content:
        save_json(DATA_DIR / "industries" / "industries-applications.json", all_content["industries-applications"])

    # Success Stories index page
    if "success-stories" in all_content:
        save_json(DATA_DIR / "success-stories" / "success-stories-index.json", all_content["success-stories"])

    print("All content JSON files saved.")


def save_json(filepath, data):
    """Save data as formatted JSON."""
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"  Saved: {filepath.name}")


def main():
    """Main execution."""
    print("=" * 60)
    print("SANPAR Website Scraper")
    print("=" * 60)
    print(f"Base URL: {BASE_URL}")
    print(f"Output: {OUTPUT_DIR}")
    print(f"Pages to scrape: {len(ALL_PAGES)}")
    print()

    # Step 1: Scrape all pages
    all_content, all_images = scrape_all_pages()

    # Step 2: Save content JSON files
    save_content_json(all_content)

    # Step 3: Download all images
    download_all_images(all_images)

    # Step 4: Save master content dump
    save_json(OUTPUT_DIR / "all-content.json", all_content)

    print(f"\n{'='*60}")
    print("SCRAPING COMPLETE!")
    print(f"{'='*60}")
    print(f"Pages scraped: {len(all_content)}")
    print(f"Images found: {len(all_images)}")
    print(f"Output directory: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
