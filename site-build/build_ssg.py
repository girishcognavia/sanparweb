#!/usr/bin/env python3
"""
SANPAR Static Site Generator (SSG)
Pre-renders all pages with full HTML content for SEO and AI crawlers.

Usage: python build_ssg.py
Output: Creates pre-rendered HTML files in the site-build directory
"""

import json
import os
import re
from pathlib import Path
from html import unescape

# Configuration
SITE_BUILD_DIR = Path(__file__).parent
ROUTES_FILE = SITE_BUILD_DIR / "pages" / "routes.json"
TEMPLATE_FILE = SITE_BUILD_DIR / "index.html"
BASE_URL = "https://sanpar.com"

def load_routes():
    """Load routes from routes.json"""
    with open(ROUTES_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def load_template():
    """Load the index.html template"""
    with open(TEMPLATE_FILE, 'r', encoding='utf-8') as f:
        return f.read()

def load_page_content(file_path):
    """Load page fragment content"""
    full_path = SITE_BUILD_DIR / file_path
    if not full_path.exists():
        print(f"  Warning: {file_path} not found")
        return ""
    with open(full_path, 'r', encoding='utf-8') as f:
        return f.read()

def decode_html_entities(text):
    """Decode HTML entities for meta tags"""
    return unescape(text).replace('&amp;', '&')

def generate_canonical_url(slug):
    """Generate canonical URL for a page"""
    if slug == 'home':
        return BASE_URL + "/"
    return f"{BASE_URL}/{slug}"

def generate_og_tags(slug, route):
    """Generate Open Graph and Twitter Card meta tags"""
    title = decode_html_entities(route.get('title', 'SANPAR Industries'))
    description = decode_html_entities(route.get('description', ''))
    url = generate_canonical_url(slug)

    # Default OG image - use product images for product pages
    og_image = f"{BASE_URL}/images/logo/cropped-sanpar-icon-300x300.png"

    return f'''
  <!-- Canonical URL -->
  <link rel="canonical" href="{url}">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="{url}">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:image" content="{og_image}">
  <meta property="og:site_name" content="SANPAR Industries">
  <meta property="og:locale" content="en_IN">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="{description}">
  <meta name="twitter:image" content="{og_image}">'''

def generate_schema_org(slug, route):
    """Generate JSON-LD structured data"""
    title = decode_html_entities(route.get('title', ''))
    description = decode_html_entities(route.get('description', ''))
    url = generate_canonical_url(slug)

    # Base organization schema (included on all pages)
    org_schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "SANPAR Industries Pvt. Ltd",
        "url": BASE_URL,
        "logo": f"{BASE_URL}/images/logo/cropped-sanpar-icon-300x300.png",
        "description": "India's leading manufacturer of compressed air dryers, industrial chillers, and aerospace cooling systems.",
        "foundingDate": "1994",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Plot No.4, 2nd Cross, KSSIDC Industrial Estate, Bommasandra 2nd Stage",
            "addressLocality": "Bengaluru",
            "addressRegion": "Karnataka",
            "postalCode": "560099",
            "addressCountry": "IN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-7349142424",
            "contactType": "sales",
            "email": "enquiry@sanpar.com"
        },
        "sameAs": [
            "https://www.linkedin.com/company/sanpar-industries",
            "https://www.facebook.com/sanparindustries/",
            "https://www.instagram.com/sanparindustries/",
            "https://x.com/SANPARindia",
            "https://www.youtube.com/channel/UCtD9fjNAP-VTtvyApCV8juw"
        ]
    }

    # WebPage schema for all pages
    webpage_schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "description": description,
        "url": url,
        "publisher": {
            "@type": "Organization",
            "name": "SANPAR Industries"
        }
    }

    schemas = [org_schema, webpage_schema]

    # Add Product schema for product pages
    if slug.startswith('product-'):
        product_name = title.replace(' - SANPAR Industries', '').replace(' — SANPAR Industries', '')
        product_schema = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product_name,
            "description": description,
            "brand": {
                "@type": "Brand",
                "name": "SANPAR"
            },
            "manufacturer": {
                "@type": "Organization",
                "name": "SANPAR Industries Pvt. Ltd"
            },
            "url": url
        }
        schemas.append(product_schema)

    # Generate script tags
    schema_scripts = ""
    for schema in schemas:
        schema_scripts += f'\n  <script type="application/ld+json">{json.dumps(schema, indent=2)}</script>'

    return schema_scripts

def build_page(slug, route, template):
    """Build a single pre-rendered page"""
    # Load page content
    content = load_page_content(route['file'])
    if not content:
        return None

    # Get title and description
    title = decode_html_entities(route.get('title', 'SANPAR Industries'))
    description = decode_html_entities(route.get('description', ''))

    # Start with template
    html = template

    # Replace title
    html = re.sub(
        r'<title>.*?</title>',
        f'<title>{title}</title>',
        html
    )

    # Replace meta description
    html = re.sub(
        r'<meta name="description" content="[^"]*">',
        f'<meta name="description" content="{description}">',
        html
    )

    # Add canonical, OG tags, and schema before </head>
    og_tags = generate_og_tags(slug, route)
    schema_tags = generate_schema_org(slug, route)
    seo_block = og_tags + schema_tags

    html = html.replace('</head>', f'{seo_block}\n</head>')

    # Inject content into main-content
    html = html.replace(
        '<main id="main-content"></main>',
        f'<main id="main-content">\n{content}\n</main>'
    )

    return html

def main():
    print("=" * 60)
    print("SANPAR Static Site Generator")
    print("=" * 60)

    # Load data
    print("\nLoading routes...")
    routes = load_routes()
    print(f"  Found {len(routes)} routes")

    print("\nLoading template...")
    template = load_template()
    print(f"  Template loaded ({len(template)} chars)")

    # Build each page
    print("\nBuilding pages...")
    success_count = 0

    for slug, route in routes.items():
        # Determine output path
        if slug == 'home':
            # Homepage stays as index.html
            output_path = SITE_BUILD_DIR / "index.html"
        else:
            # Other pages get their own HTML file at root
            output_path = SITE_BUILD_DIR / f"{slug}.html"

        # Build the page
        html = build_page(slug, route, template)

        if html:
            # Write output
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(html)
            print(f"  ✓ {slug} -> {output_path.name}")
            success_count += 1
        else:
            print(f"  ✗ {slug} - Failed to build")

    print(f"\n{'=' * 60}")
    print(f"Build complete: {success_count}/{len(routes)} pages generated")
    print(f"{'=' * 60}")

    # Summary
    print("\nSEO Features Added:")
    print("  ✓ Canonical URLs")
    print("  ✓ Open Graph meta tags")
    print("  ✓ Twitter Card meta tags")
    print("  ✓ JSON-LD Schema.org (Organization, WebPage, Product)")
    print("  ✓ Pre-rendered content in HTML (crawlable)")

if __name__ == "__main__":
    main()
