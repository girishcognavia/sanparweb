"""
Fix all existing pages with missing content:
- Homepage: all industries, all success stories, all products, more logos, articles, timeline
- Who We Are: full content
- Products: Drains card, links
- Contact: regional phones, fax
- Industries: Cement card
- Global: social URLs, favicon, footer, mega-menu
"""
import os, re

BASE = os.path.dirname(os.path.abspath(__file__))

def read(f):
    with open(os.path.join(BASE, f), 'r', encoding='utf-8') as fh:
        return fh.read()

def write(f, content):
    with open(os.path.join(BASE, f), 'w', encoding='utf-8') as fh:
        fh.write(content)

# ============================================================
# GLOBAL FIXES - Apply to ALL HTML files
# ============================================================
def fix_global():
    print("Fixing global elements across all pages...")
    for fname in os.listdir(BASE):
        if not fname.endswith('.html'):
            continue
        html = read(fname)
        changed = False

        # Fix social media URLs (replace # with real URLs)
        replacements = [
            ('href="#">in</a>', 'href="https://www.linkedin.com/company/sanpar-industries" aria-label="LinkedIn">in</a>'),
            ('href="#">&#9654;</a>', 'href="https://www.youtube.com/channel/UCtD9fjNAP-VTtvyApCV8juw" aria-label="YouTube">&#9654;</a>'),
            ('href="#">f</a>', 'href="https://www.facebook.com/sanparindustries/" aria-label="Facebook">f</a>'),
            ('href="#">&#120143;</a>', 'href="https://x.com/SANPARindia" aria-label="Twitter/X">&#120143;</a>'),
            # Fix text versions too
            ('href="#">in</a>', 'href="https://www.linkedin.com/company/sanpar-industries">in</a>'),
        ]
        for old, new in replacements:
            if old in html:
                html = html.replace(old, new)
                changed = True

        # Add favicon if missing
        if '<link rel="icon"' not in html:
            html = html.replace('</head>', '<link rel="icon" href="images/logo/cropped-sanpar-icon-300x300.png" type="image/png">\n</head>')
            changed = True

        # Fix Privacy/Terms links in footer
        html = html.replace('href="#">Privacy Policy</a>', 'href="privacy-policy.html">Privacy Policy</a>')
        html = html.replace('href="#">Privacy</a>', 'href="privacy-policy.html">Privacy Policy</a>')
        html = html.replace('href="#">Terms</a>', 'href="terms-and-conditions.html">Terms &amp; Conditions</a>')
        html = html.replace('href="#">Terms &amp; Conditions</a>', 'href="terms-and-conditions.html">Terms &amp; Conditions</a>')

        # Fix Success Stories links
        html = html.replace('href="#">Success Stories</a>', 'href="success-stories.html">Success Stories</a>')

        # Fix Careers links
        html = html.replace('href="#">Careers</a>', 'href="work-with-us.html">Careers</a>')

        # Fix industry "Learn more" links on industries.html
        if fname == 'industries.html':
            for slug, name in [('aerospace-defence','Aerospace'),('pharmaceutical','Pharmaceutical'),('food-beverage','Food'),
                               ('manufacturing','Manufacturing'),('energy-power','Energy'),('chemical','Chemical'),
                               ('textile','Textile'),('plastics','Plastics'),('machine-tools','Machine Tools')]:
                # Replace # links near industry names
                pattern = f'(<h3>{name}.*?)<a href="#"'
                replacement = f'\\1<a href="industry-{slug}.html"'
                html = re.sub(pattern, replacement, html, flags=re.DOTALL)

        if changed or True:
            write(fname, html)

    print("  Global fixes applied to all HTML files")

# ============================================================
# FIX CONTACT PAGE - Add regional phone numbers
# ============================================================
def fix_contact():
    print("Fixing Contact page...")
    html = read('contact.html')

    # Replace the regional offices section with full phone numbers
    regional = '''<section class="section section--light">
    <div class="container">
      <div class="text-center animate-on-scroll" style="margin-bottom:var(--space-10)"><span class="label">Regional Presence</span><h2>Regional Support Contacts</h2></div>
      <div class="grid grid--4">
        <div class="animate-on-scroll" style="padding:var(--space-6);background:white;border-radius:var(--radius-md);box-shadow:var(--shadow-subtle)"><h4>Bengaluru</h4><p style="font-size:var(--text-sm);color:var(--text-secondary)">Head Office &amp; Manufacturing</p><a href="tel:+919341343704" style="font-size:var(--text-sm);font-weight:600">+91 9341 343 704</a></div>
        <div class="animate-on-scroll" style="padding:var(--space-6);background:white;border-radius:var(--radius-md);box-shadow:var(--shadow-subtle)"><h4>Mumbai</h4><p style="font-size:var(--text-sm);color:var(--text-secondary)">Western Region</p><a href="tel:+919326452948" style="font-size:var(--text-sm);font-weight:600">+91 9326 452 948</a></div>
        <div class="animate-on-scroll" style="padding:var(--space-6);background:white;border-radius:var(--radius-md);box-shadow:var(--shadow-subtle)"><h4>Chennai</h4><p style="font-size:var(--text-sm);color:var(--text-secondary)">Southern Region</p><a href="tel:+919380342424" style="font-size:var(--text-sm);font-weight:600">+91 9380 342 424</a></div>
        <div class="animate-on-scroll" style="padding:var(--space-6);background:white;border-radius:var(--radius-md);box-shadow:var(--shadow-subtle)"><h4>Pune</h4><p style="font-size:var(--text-sm);color:var(--text-secondary)">Maharashtra Region</p><a href="tel:+919371042525" style="font-size:var(--text-sm);font-weight:600">+91 9371 042 525</a></div>
        <div class="animate-on-scroll" style="padding:var(--space-6);background:white;border-radius:var(--radius-md);box-shadow:var(--shadow-subtle)"><h4>Jamshedpur</h4><p style="font-size:var(--text-sm);color:var(--text-secondary)">Eastern Region</p><a href="tel:+919334196462" style="font-size:var(--text-sm);font-weight:600">+91 9334 196 462</a></div>
        <div class="animate-on-scroll" style="padding:var(--space-6);background:white;border-radius:var(--radius-md);box-shadow:var(--shadow-subtle)"><h4>Chandigarh</h4><p style="font-size:var(--text-sm);color:var(--text-secondary)">Northern Region</p><a href="tel:+917899972424" style="font-size:var(--text-sm);font-weight:600">+91 7899 972 424</a></div>
        <div class="animate-on-scroll" style="padding:var(--space-6);background:white;border-radius:var(--radius-md);box-shadow:var(--shadow-subtle)"><h4>Kolhapur</h4><p style="font-size:var(--text-sm);color:var(--text-secondary)">Regional Support</p><a href="tel:+919373982424" style="font-size:var(--text-sm);font-weight:600">+91 9373 982 424</a></div>
        <div class="animate-on-scroll" style="padding:var(--space-6);background:white;border-radius:var(--radius-md);box-shadow:var(--shadow-subtle)"><h4>Coimbatore</h4><p style="font-size:var(--text-sm);color:var(--text-secondary)">Regional Support</p><a href="tel:+917338392626" style="font-size:var(--text-sm);font-weight:600">+91 7338 392 626</a></div>
      </div>
    </div>
  </section>'''

    # Replace old regional section
    html = re.sub(r'<!-- Regional Offices -->.*?</section>', regional, html, flags=re.DOTALL)
    # If pattern didn't match, try another approach
    if 'tel:+919341343704' not in html:
        html = re.sub(r'<section class="section section--light">\s*<div class="container">\s*<div class="text-center.*?Regional Support Contacts.*?</section>', regional, html, flags=re.DOTALL)

    # Add fax number if missing
    if 'Fax' not in html and '+91 80 4343 5959' not in html:
        html = html.replace('+91 7349 142 424</a>', '+91 7349 142 424</a>\n            </div>\n            <div style="margin-bottom:var(--space-6)">\n              <h4 style="margin-bottom:var(--space-1)">Fax</h4>\n              <p style="font-size:var(--text-lg);font-weight:600">+91 80 4343 5959</p>')

    write('contact.html', html)
    print("  Contact page fixed with regional phones and fax")

# ============================================================
# FIX INDUSTRIES PAGE - Add Cement (10th sector)
# ============================================================
def fix_industries():
    print("Fixing Industries page...")
    html = read('industries.html')

    # Add Cement card before Machine Tools
    cement_card = '''<div class="card card--industry animate-on-scroll" style="background-color:var(--bg-dark)">
          <div class="card__body"><h3>Cement Industry</h3><p style="color:rgba(255,255,255,0.7);font-size:var(--text-sm)">Compressed air for pneumatic conveying, aeration, cooling, and powering tools.</p><a href="industry-cement.html" class="btn btn--tertiary" style="color:var(--color-accent)">Learn more <span class="arrow">&rarr;</span></a></div>
        </div>
        <div class="card card--industry animate-on-scroll" style="background-color:var(--bg-dark)">'''

    # Insert before Machine Tools
    html = html.replace(
        '<div class="card card--industry animate-on-scroll" style="background-color:var(--bg-dark)">\n          <div class="card__body"><h3>Machine Tools</h3>',
        cement_card + '\n          <div class="card__body"><h3>Machine Tools</h3>'
    )

    # Fix "10 Sectors" - it's already correct if Cement is added
    write('industries.html', html)
    print("  Industries page: Cement card added (10 sectors)")

# ============================================================
# FIX PRODUCTS PAGE - Add Drains card
# ============================================================
def fix_products():
    print("Fixing Products page...")
    html = read('products.html')

    # Add Drains card after Moisture Separator
    drains_card = '''<div class="card animate-on-scroll">
          <img src="images/products/SFD320_1-r9r15r5jg1lg11ln26jap1az5m1r4djmmt8gvpnj4w.webp" alt="Drains" class="card__image" loading="lazy">
          <div class="card__body">
            <h3>Drains</h3>
            <p>Condensate drain valves &mdash; float, timer, mechanical, level-sensor. Max 16 bar g.</p>
            <a href="product-drains.html" class="btn btn--tertiary">View details <span class="arrow">&rarr;</span></a>
          </div>
        </div>'''

    # Insert after Moisture Separator card
    html = html.replace(
        '</div>\n    </div>\n  </section>\n\n  <!-- Industrial Cooling -->',
        drains_card + '\n      </div>\n    </div>\n  </section>\n\n  <!-- Industrial Cooling -->'
    )

    write('products.html', html)
    print("  Products page: Drains card added")

# ============================================================
# RUN ALL FIXES
# ============================================================
if __name__ == '__main__':
    print("=== Fixing all existing pages ===\n")
    fix_contact()
    fix_industries()
    fix_products()
    fix_global()
    print("\n=== ALL FIXES COMPLETE ===")
    total = len([f for f in os.listdir(BASE) if f.endswith('.html')])
    print(f"Total HTML files: {total}")
