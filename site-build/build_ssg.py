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
TEMPLATE_FILE = SITE_BUILD_DIR / "template.html"
BASE_URL = "https://sanpar.com"

# Product images mapping for OG tags
PRODUCT_IMAGES = {
    "product-xeros": "images/products/Xeros-Internal-2-1024x720.webp",
    "product-ecodrair": "images/products/ecodrair.webp",
    "product-adsorption": "images/products/adsorption.webp",
    "product-water-chillers": "images/products/Water-chiller.webp",
    "product-air-chillers": "images/products/air-chiller.webp",
    "product-coolant-chillers": "images/products/coolant-chiller.webp",
    "product-oil-chillers": "images/products/oil-chiller.webp",
    "product-precision-ac": "images/products/SMPL_IAC_PAC.webp",
    "product-dehumidifier": "images/products/dehumidifier.webp",
    "product-cat-m1": "images/products/CAT-X1-157A-r9r1p9az9aamxr9q641lxm4awfwxu9z4bck6deqg0w.webp",
    "product-cat-dth": "images/products/cat-dth.webp",
    "product-filters": "images/products/filters.webp",
    "product-drains": "images/products/drains.webp",
    "product-separator": "images/products/separator.webp",
    "product-aftercooler": "images/products/aftercooler.webp",
}

# Breadcrumb hierarchy mapping
BREADCRUMB_HIERARCHY = {
    # Products
    "products": [("Home", "/"), ("Products", None)],
    "product-xeros": [("Home", "/"), ("Products", "/products"), ("Xeros Series", None)],
    "product-ecodrair": [("Home", "/"), ("Products", "/products"), ("Ecodrair Series", None)],
    "product-adsorption": [("Home", "/"), ("Products", "/products"), ("Adsorption Dryers", None)],
    "product-water-chillers": [("Home", "/"), ("Products", "/products"), ("Water Chillers", None)],
    "product-air-chillers": [("Home", "/"), ("Products", "/products"), ("Air Chillers", None)],
    "product-coolant-chillers": [("Home", "/"), ("Products", "/products"), ("Coolant Chillers", None)],
    "product-oil-chillers": [("Home", "/"), ("Products", "/products"), ("Oil Chillers", None)],
    "product-precision-ac": [("Home", "/"), ("Products", "/products"), ("Precision AC", None)],
    "product-dehumidifier": [("Home", "/"), ("Products", "/products"), ("Dehumidifier", None)],
    "product-cat-m1": [("Home", "/"), ("Products", "/products"), ("CAT M1 Series", None)],
    "product-cat-dth": [("Home", "/"), ("Products", "/products"), ("CAT DTH Series", None)],
    "product-filters": [("Home", "/"), ("Products", "/products"), ("Compressed Air Filters", None)],
    "product-drains": [("Home", "/"), ("Products", "/products"), ("Drains", None)],
    "product-separator": [("Home", "/"), ("Products", "/products"), ("Moisture Separator", None)],
    "product-aftercooler": [("Home", "/"), ("Products", "/products"), ("Aftercooler", None)],
    # Industries
    "industries": [("Home", "/"), ("Industries", None)],
    "industry-aerospace-defence": [("Home", "/"), ("Industries", "/industries"), ("Aerospace & Defence", None)],
    "industry-pharmaceutical": [("Home", "/"), ("Industries", "/industries"), ("Pharmaceutical", None)],
    "industry-food-beverage": [("Home", "/"), ("Industries", "/industries"), ("Food & Beverage", None)],
    "industry-machine-tools": [("Home", "/"), ("Industries", "/industries"), ("Machine Tools", None)],
    "industry-manufacturing": [("Home", "/"), ("Industries", "/industries"), ("Manufacturing", None)],
    "industry-textile": [("Home", "/"), ("Industries", "/industries"), ("Textile", None)],
    "industry-plastics": [("Home", "/"), ("Industries", "/industries"), ("Plastics", None)],
    "industry-cement": [("Home", "/"), ("Industries", "/industries"), ("Cement", None)],
    "industry-chemical": [("Home", "/"), ("Industries", "/industries"), ("Chemical", None)],
    "industry-energy-power": [("Home", "/"), ("Industries", "/industries"), ("Energy & Power", None)],
    # Success Stories
    "success-stories": [("Home", "/"), ("Success Stories", None)],
    "story-hindustan-motors": [("Home", "/"), ("Success Stories", "/success-stories"), ("Hindustan Motors", None)],
    "story-gas-turbine-research-establishment": [("Home", "/"), ("Success Stories", "/success-stories"), ("GTRE", None)],
    "story-jindal-steel-power-limited-raigarh": [("Home", "/"), ("Success Stories", "/success-stories"), ("Jindal Steel", None)],
    "story-ashok-leyland-ltd": [("Home", "/"), ("Success Stories", "/success-stories"), ("Ashok Leyland", None)],
    "story-excel-glass": [("Home", "/"), ("Success Stories", "/success-stories"), ("Excel Glass", None)],
    "story-hical-technologies": [("Home", "/"), ("Success Stories", "/success-stories"), ("Hical Technologies", None)],
    "story-infosys-technologies-ltd": [("Home", "/"), ("Success Stories", "/success-stories"), ("Infosys", None)],
    "story-jmt-auto-ltd": [("Home", "/"), ("Success Stories", "/success-stories"), ("JMT Auto", None)],
    # Other pages
    "who-we-are": [("Home", "/"), ("About Us", None)],
    "support": [("Home", "/"), ("Support", None)],
    "contact": [("Home", "/"), ("Contact", None)],
    "work-with-us": [("Home", "/"), ("Careers", None)],
    "job-openings": [("Home", "/"), ("Job Openings", None)],
    "news": [("Home", "/"), ("News", None)],
    "blogs": [("Home", "/"), ("Blogs", None)],
    "events": [("Home", "/"), ("Events", None)],
    "technology": [("Home", "/"), ("Technology", None)],
    "privacy-policy": [("Home", "/"), ("Privacy Policy", None)],
    "terms-and-conditions": [("Home", "/"), ("Terms & Conditions", None)],
}


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


def generate_hreflang_tags():
    """Generate hreflang tags for India market targeting"""
    return '''
  <!-- Language & Region Targeting -->
  <link rel="alternate" hreflang="en-IN" href="{url}">
  <link rel="alternate" hreflang="en" href="{url}">
  <link rel="alternate" hreflang="x-default" href="{url}">'''


def generate_og_tags(slug, route):
    """Generate Open Graph and Twitter Card meta tags"""
    title = decode_html_entities(route.get('title', 'SANPAR Industries'))
    description = decode_html_entities(route.get('description', ''))
    url = generate_canonical_url(slug)

    # Use product-specific images for product pages
    if slug in PRODUCT_IMAGES:
        og_image = f"{BASE_URL}/{PRODUCT_IMAGES[slug]}"
    else:
        og_image = f"{BASE_URL}/images/logo/cropped-sanpar-icon-300x300.png"

    hreflang = generate_hreflang_tags().format(url=url)

    return f'''
  <!-- Canonical URL -->
  <link rel="canonical" href="{url}">{hreflang}

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


def generate_breadcrumb_schema(slug):
    """Generate BreadcrumbList JSON-LD schema"""
    if slug == 'home' or slug not in BREADCRUMB_HIERARCHY:
        return ""

    items = BREADCRUMB_HIERARCHY[slug]
    item_list = []

    for i, (name, url) in enumerate(items, 1):
        item = {
            "@type": "ListItem",
            "position": i,
            "name": name
        }
        if url:
            item["item"] = BASE_URL + url
        item_list.append(item)

    breadcrumb_schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": item_list
    }

    return f'\n  <script type="application/ld+json">{json.dumps(breadcrumb_schema, indent=2)}</script>'


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

    # Add Product schema for product pages with enhanced fields
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
            "url": url,
            "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "priceCurrency": "INR",
                "priceSpecification": {
                    "@type": "PriceSpecification",
                    "priceCurrency": "INR"
                },
                "seller": {
                    "@type": "Organization",
                    "name": "SANPAR Industries Pvt. Ltd"
                }
            }
        }
        # Add product image if available
        if slug in PRODUCT_IMAGES:
            product_schema["image"] = f"{BASE_URL}/{PRODUCT_IMAGES[slug]}"
        schemas.append(product_schema)

    # Generate script tags
    schema_scripts = ""
    for schema in schemas:
        schema_scripts += f'\n  <script type="application/ld+json">{json.dumps(schema, indent=2)}</script>'

    # Add breadcrumb schema
    schema_scripts += generate_breadcrumb_schema(slug)

    return schema_scripts


def add_noopener_to_external_links(html):
    """Add rel='noopener' to all external links for security and SEO"""
    # Pattern to match external links (https://) that don't already have rel attribute
    # This handles links in the footer social section

    # First, handle links that already have a target but no rel
    html = re.sub(
        r'<a\s+href="(https?://[^"]+)"([^>]*)>',
        lambda m: add_rel_noopener(m),
        html
    )
    return html


def add_rel_noopener(match):
    """Helper to add rel=noopener to external links"""
    href = match.group(1)
    rest = match.group(2)

    # Skip if already has rel attribute
    if 'rel=' in rest:
        return match.group(0)

    # Skip internal sanpar.com links
    if 'sanpar.com' in href:
        return match.group(0)

    # Skip font/cdn links
    if 'fonts.googleapis.com' in href or 'fonts.gstatic.com' in href:
        return match.group(0)

    return f'<a href="{href}" rel="noopener"{rest}>'


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

    # Add canonical, OG tags, hreflang, and schema before </head>
    og_tags = generate_og_tags(slug, route)
    schema_tags = generate_schema_org(slug, route)
    seo_block = og_tags + schema_tags

    html = html.replace('</head>', f'{seo_block}\n</head>')

    # Inject content into main-content
    html = html.replace(
        '<main id="main-content"></main>',
        f'<main id="main-content">\n{content}\n</main>'
    )

    # Add rel=noopener to external links
    html = add_noopener_to_external_links(html)

    return html


def create_llms_txt():
    """Create llms.txt file for AI crawlers"""
    llms_content = """# SANPAR Industries - AI Context File
# https://sanpar.com/llms.txt

## Company Overview
SANPAR Industries Pvt. Ltd. is India's leading manufacturer of compressed air treatment systems, industrial cooling equipment, and aerospace cooling systems. Founded in 1994 in Bengaluru, Karnataka, India.

## Certifications
- ISO 9001:2015 Quality Management
- AS 9100D (EN 9100:2018) Aerospace & Defence Standard
- DGAQA Qualification for Airborne Systems
- CEMILAC Design Approval

## Primary Product Categories

### 1. Compressed Air Treatment
- **Xeros Series**: Refrigerated air dryers (85-10,000 CFM), open and closed loop design
- **Ecodrair Series**: Tube-in-tube dryers (5-180 CFM)
- **Adsorption Dryers**: Desiccant-based drying down to -70°C dew point
- **Compressed Air Filters**: ISO 8573.1 Class 1 filtration
- **Moisture Separators**: Centrifugal separation, zero maintenance
- **Aftercoolers**: Air-cooled and water-cooled variants
- **Drains**: Float, timer, mechanical, and level-sensor types

### 2. Industrial Cooling
- **Water Chillers**: CFC-free, 0.5TR to 100TR capacity
- **Air Chillers**: Constant-temperature supply systems
- **Coolant Chillers**: Process cooling for manufacturing
- **Oil Chillers**: Hydraulic and CNC machine cooling

### 3. Air Conditioning
- **Precision AC**: ±1°C temperature, ±2% RH accuracy for server rooms
- **Dehumidifier (Xerion Series)**: Industrial humidity control

### 4. Medical Air Systems
- **CAT M1 Series**: ISO 8573.1 Class 1 medical air filtration
- **CAT DTH Series**: BS EN12021:2014 breathing air systems

## Industries Served
1. Aerospace & Defence
2. Pharmaceutical
3. Food & Beverage
4. Machine Tools
5. Manufacturing
6. Textile
7. Plastics
8. Cement
9. Chemical
10. Energy & Power

## Key Statistics
- 32+ years of operation
- 3,500+ installations
- 50+ product families
- 100+ configurations
- 8 regional offices across India

## Contact Information
- **Phone**: +91 7349 142 424
- **Fax**: +91 80 4343 5959
- **Email**: enquiry@sanpar.com
- **Address**: Plot No.4, 2nd Cross, KSSIDC Industrial Estate, Bommasandra 2nd Stage, Bengaluru 560099, Karnataka, India

## Social Media
- LinkedIn: https://www.linkedin.com/company/sanpar-industries
- YouTube: https://www.youtube.com/channel/UCtD9fjNAP-VTtvyApCV8juw
- Facebook: https://www.facebook.com/sanparindustries/
- Twitter/X: https://x.com/SANPARindia
- Instagram: https://www.instagram.com/sanparindustries/

## Notable Customers
- Hindustan Motors
- Gas Turbine Research Establishment (DRDO)
- Jindal Steel & Power
- Ashok Leyland
- Infosys Technologies
- Excel Glass
- Hical Technologies
- JMT Auto

## Website
https://sanpar.com
"""

    llms_path = SITE_BUILD_DIR / "llms.txt"
    with open(llms_path, 'w', encoding='utf-8') as f:
        f.write(llms_content)
    print(f"  ✓ Created llms.txt for AI crawlers")


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

    # Create llms.txt
    print("\nCreating AI context files...")
    create_llms_txt()

    print(f"\n{'=' * 60}")
    print(f"Build complete: {success_count}/{len(routes)} pages generated")
    print(f"{'=' * 60}")

    # Summary
    print("\nGoogle SEO Best Practices Implemented:")
    print("  ✓ Canonical URLs")
    print("  ✓ Open Graph meta tags")
    print("  ✓ Twitter Card meta tags")
    print("  ✓ JSON-LD Schema.org (Organization, WebPage, Product)")
    print("  ✓ BreadcrumbList schema for navigation")
    print("  ✓ Enhanced Product schema with offers")
    print("  ✓ hreflang tags for India market (en-IN)")
    print("  ✓ rel='noopener' on external links")
    print("  ✓ Product-specific OG images")
    print("  ✓ llms.txt for AI crawlers")
    print("  ✓ Pre-rendered content in HTML (crawlable)")


if __name__ == "__main__":
    main()
