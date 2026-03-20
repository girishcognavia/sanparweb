#!/usr/bin/env python3
"""
Fix audit gaps:
1. Create missing individual JSON files (shop, job-openings)
2. Populate sections & breadcrumbs from raw HTML
3. Add local image path mappings
"""

import json
import re
import os
from pathlib import Path
from bs4 import BeautifulSoup
from urllib.parse import urljoin

BASE_URL = "https://sanpar.com"
ROOT = Path(__file__).parent
DATA_DIR = ROOT / "data"
RAW_HTML_DIR = ROOT / "raw-html"
IMAGES_DIR = ROOT / "images"
ALL_CONTENT_FILE = ROOT / "all-content.json"


def build_image_mapping():
    """Build a map from remote URLs to local file paths."""
    mapping = {}
    for img_file in IMAGES_DIR.rglob("*"):
        if img_file.is_file():
            fname = img_file.name
            rel_path = str(img_file.relative_to(ROOT)).replace("\\", "/")
            mapping[fname] = rel_path
    return mapping


def extract_sections_from_html(html_path):
    """Extract structured sections from Elementor HTML."""
    with open(html_path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f.read(), "lxml")

    sections = []

    # Try Elementor containers (modern Elementor uses div with data-element_type="container")
    el_sections = soup.find_all("div", attrs={"data-element_type": "container"})
    # Also try classic section elements
    if not el_sections:
        el_sections = soup.find_all("section", class_=re.compile(r"elementor-section"))
    # Filter to top-level containers only (not nested ones)
    top_level = []
    for sec in el_sections:
        parent = sec.find_parent(attrs={"data-element_type": "container"})
        if parent is None:
            top_level.append(sec)
    if not top_level:
        top_level = el_sections[:20]  # fallback: take first 20
    if top_level:
        for sec in top_level:
            section_data = {
                "element_id": sec.get("data-id", ""),
                "classes": " ".join(sec.get("class", [])),
                "headings": [],
                "paragraphs": [],
                "images": [],
                "links": [],
                "buttons": [],
            }
            for tag in ["h1", "h2", "h3", "h4", "h5", "h6"]:
                for h in sec.find_all(tag, recursive=True):
                    text = h.get_text(strip=True)
                    if text and len(text) > 1:
                        section_data["headings"].append({"level": tag, "text": text})

            for p in sec.find_all("p", recursive=True):
                text = p.get_text(strip=True)
                if text and len(text) > 5:
                    section_data["paragraphs"].append(text)

            for img in sec.find_all("img", recursive=True):
                src = img.get("src", "") or img.get("data-src", "")
                if src and not src.startswith("data:"):
                    section_data["images"].append({
                        "src": urljoin(BASE_URL, src),
                        "alt": img.get("alt", ""),
                    })

            for a in sec.find_all("a", href=True, recursive=True):
                href = a.get("href", "")
                text = a.get_text(strip=True)
                classes = " ".join(a.get("class", []))
                if "button" in classes.lower() or "btn" in classes.lower() or "elementor-button" in classes.lower():
                    section_data["buttons"].append({"text": text, "href": urljoin(BASE_URL, href)})
                elif href != "#" and text:
                    section_data["links"].append({"text": text, "href": urljoin(BASE_URL, href)})

            # Only include sections that have content
            if section_data["headings"] or section_data["paragraphs"] or section_data["images"]:
                sections.append(section_data)

    return sections


def extract_breadcrumbs_from_html(html_path):
    """Extract breadcrumbs from HTML."""
    with open(html_path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f.read(), "lxml")

    breadcrumbs = []

    # Try schema.org JSON-LD breadcrumbs
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(script.string)
            if isinstance(data, dict) and data.get("@type") == "BreadcrumbList":
                for item in data.get("itemListElement", []):
                    item_val = item.get("item", {})
                    if isinstance(item_val, str):
                        breadcrumbs.append({
                            "position": item.get("position", 0),
                            "text": item.get("name", ""),
                            "href": item_val,
                        })
                    elif isinstance(item_val, dict):
                        breadcrumbs.append({
                            "position": item.get("position", 0),
                            "text": item_val.get("name", ""),
                            "href": item_val.get("@id", ""),
                        })
                return breadcrumbs
            # Check if it's a graph
            if isinstance(data, dict) and "@graph" in data:
                for node in data["@graph"]:
                    if node.get("@type") == "BreadcrumbList":
                        for item in node.get("itemListElement", []):
                            item_val = item.get("item", {})
                            if isinstance(item_val, str):
                                breadcrumbs.append({
                                    "position": item.get("position", 0),
                                    "text": item.get("name", ""),
                                    "href": item_val,
                                })
                            elif isinstance(item_val, dict):
                                breadcrumbs.append({
                                    "position": item.get("position", 0),
                                    "text": item_val.get("name", item.get("name", "")),
                                    "href": item_val.get("@id", ""),
                                })
                        return breadcrumbs
        except (json.JSONDecodeError, TypeError, AttributeError):
            pass

    # Try HTML breadcrumbs
    nav = soup.find("nav", class_=re.compile(r"breadcrumb", re.I))
    if nav:
        pos = 1
        for a in nav.find_all("a"):
            breadcrumbs.append({
                "position": pos,
                "text": a.get_text(strip=True),
                "href": urljoin(BASE_URL, a.get("href", "")),
            })
            pos += 1
        # Last item (current page, may not be a link)
        spans = nav.find_all("span")
        for span in spans:
            text = span.get_text(strip=True)
            if text and not any(b["text"] == text for b in breadcrumbs):
                breadcrumbs.append({"position": pos, "text": text, "href": ""})
                pos += 1

    return breadcrumbs


def add_local_image_paths(content, image_map):
    """Add local_path to image entries based on filename matching."""
    for img in content.get("images", []):
        src = img.get("src", "")
        if src:
            fname = os.path.basename(src.split("?")[0])
            if fname in image_map:
                img["local_path"] = image_map[fname]
    return content


def main():
    print("=" * 60)
    print("Fixing audit gaps...")
    print("=" * 60)

    # Load master content
    with open(ALL_CONTENT_FILE, "r", encoding="utf-8") as f:
        all_content = json.load(f)

    # Build image mapping
    image_map = build_image_mapping()
    print(f"Built image mapping: {len(image_map)} local images indexed")

    # Fix 1: Create missing individual JSON files
    print("\n--- Creating missing JSON files ---")
    for key in ["shop", "job-openings"]:
        if key in all_content:
            filepath = DATA_DIR / f"{key}.json"
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(all_content[key], f, indent=2, ensure_ascii=False)
            print(f"  Created: {filepath.name}")

    # Fix 2 & 3: Enhance all JSON files with sections, breadcrumbs, local paths
    print("\n--- Enhancing JSON files with sections, breadcrumbs, local image paths ---")

    enhanced_count = 0
    for name, content in all_content.items():
        html_file = RAW_HTML_DIR / f"{name}.html"
        if not html_file.exists():
            continue

        # Extract sections
        sections = extract_sections_from_html(html_file)
        if sections:
            content["sections"] = sections

        # Extract breadcrumbs
        breadcrumbs = extract_breadcrumbs_from_html(html_file)
        if breadcrumbs:
            content["breadcrumbs"] = breadcrumbs

        # Add local image paths
        add_local_image_paths(content, image_map)

        enhanced_count += 1

    # Save enhanced all-content.json
    with open(ALL_CONTENT_FILE, "w", encoding="utf-8") as f:
        json.dump(all_content, f, indent=2, ensure_ascii=False)
    print(f"\n  Enhanced {enhanced_count} pages in all-content.json")

    # Now update individual JSON files
    print("\n--- Updating individual JSON files ---")
    updated = 0

    # Map of JSON file paths to their content keys
    file_key_map = {
        DATA_DIR / "homepage.json": "homepage",
        DATA_DIR / "who-we-are.json": "who-we-are",
        DATA_DIR / "contact-us.json": "contact-us",
        DATA_DIR / "support-service.json": "support-service",
        DATA_DIR / "technology.json": "technology",
        DATA_DIR / "work-with-us.json": "work-with-us",
        DATA_DIR / "news.json": "news",
        DATA_DIR / "blogs.json": "blogs",
        DATA_DIR / "events.json": "events",
        DATA_DIR / "shop.json": "shop",
        DATA_DIR / "job-openings.json": "job-openings",
    }

    # Add product files
    for name in all_content:
        if name.startswith("prod-"):
            prod_name = name.replace("prod-", "")
            file_key_map[DATA_DIR / "products" / f"{prod_name}.json"] = name

    # Add industry files
    for name in all_content:
        if name.startswith("ind-"):
            ind_name = name.replace("ind-", "")
            file_key_map[DATA_DIR / "industries" / f"{ind_name}.json"] = name

    # Add success story files
    for name in all_content:
        if name.startswith("story-"):
            story_name = name.replace("story-", "")
            file_key_map[DATA_DIR / "success-stories" / f"{story_name}.json"] = name

    for filepath, key in file_key_map.items():
        if key in all_content and filepath.parent.exists():
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(all_content[key], f, indent=2, ensure_ascii=False)
            updated += 1

    print(f"  Updated {updated} individual JSON files")

    # Summary
    print(f"\n{'=' * 60}")
    print("GAPS FIXED!")
    print(f"{'=' * 60}")

    # Verify sections
    total_sections = sum(len(c.get("sections", [])) for c in all_content.values())
    total_breadcrumbs = sum(len(c.get("breadcrumbs", [])) for c in all_content.values())
    total_local_paths = sum(
        sum(1 for img in c.get("images", []) if img.get("local_path"))
        for c in all_content.values()
    )
    print(f"  Total sections extracted: {total_sections}")
    print(f"  Total breadcrumb entries: {total_breadcrumbs}")
    print(f"  Total images with local paths: {total_local_paths}")


if __name__ == "__main__":
    main()
