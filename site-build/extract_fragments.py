"""Extract <main> content from all HTML pages into SPA fragments."""
import os
import re
import json

SITE_DIR = os.path.dirname(os.path.abspath(__file__))
PAGES_DIR = os.path.join(SITE_DIR, 'pages')
os.makedirs(PAGES_DIR, exist_ok=True)

# Map filenames to route slugs
def filename_to_slug(fname):
    slug = fname.replace('.html', '')
    if slug == 'index':
        return 'home'
    return slug

# Determine which nav item should be active for a given slug
def get_nav_active(slug):
    if slug == 'home':
        return 'Home'
    if slug == 'who-we-are':
        return 'About Us'
    if slug in ('products',) or slug.startswith('product-'):
        return 'Products'
    if slug in ('industries',) or slug.startswith('industry-'):
        return 'Industries'
    if slug == 'support':
        return 'Support'
    if slug == 'contact':
        return 'Contact'
    # Everything else (success-stories, stories, work-with-us, news, blogs, technology, etc.)
    return ''

# Get all HTML files (exclude index.html which we'll also process)
html_files = sorted([
    f for f in os.listdir(SITE_DIR)
    if f.endswith('.html') and os.path.isfile(os.path.join(SITE_DIR, f))
])

routes = {}

for fname in html_files:
    filepath = os.path.join(SITE_DIR, fname)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    slug = filename_to_slug(fname)

    # Extract title
    title_match = re.search(r'<title>(.*?)</title>', content, re.DOTALL)
    title = title_match.group(1).strip() if title_match else 'SANPAR Industries'

    # Extract meta description
    desc_match = re.search(r'<meta\s+name="description"\s+content="(.*?)"', content, re.DOTALL)
    description = desc_match.group(1).strip() if desc_match else ''

    # Extract <main id="main-content"> innerHTML
    main_match = re.search(r'<main\s+id="main-content"[^>]*>(.*?)</main>', content, re.DOTALL)
    if not main_match:
        print(f"WARNING: No <main> found in {fname}, skipping")
        continue

    main_html = main_match.group(1).strip()

    # Write fragment file
    fragment_path = os.path.join(PAGES_DIR, f'{slug}.html')
    with open(fragment_path, 'w', encoding='utf-8') as f:
        f.write(main_html)

    routes[slug] = {
        'file': f'pages/{slug}.html',
        'title': title,
        'description': description,
        'navActive': get_nav_active(slug),
    }

    print(f"  {fname} -> pages/{slug}.html ({len(main_html)} bytes)")

# Write routes manifest as JSON
manifest_path = os.path.join(PAGES_DIR, 'routes.json')
with open(manifest_path, 'w', encoding='utf-8') as f:
    json.dump(routes, f, indent=2)

print(f"\nExtracted {len(routes)} fragments to pages/")
print(f"Route manifest: pages/routes.json")
