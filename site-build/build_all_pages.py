"""
SANPAR Website - Complete Page Generator
Reads all JSON data from repo-data and generates all missing HTML pages.
Also generates updated versions of existing pages with full content.
"""
import json, os, html as h

BASE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(BASE, '..', 'repo-data', 'data')

def load(path):
    fp = os.path.join(DATA, path)
    if not os.path.exists(fp):
        print(f"  WARN: {fp} not found")
        return {}
    with open(fp, 'r', encoding='utf-8') as f:
        return json.load(f)

def esc(t): return h.escape(str(t)) if t else ''

# Shared header with mega-menu (all product links)
def header(active=''):
    items = [
        ('index.html','Home'),('who-we-are.html','About Us'),('products.html','Products'),
        ('industries.html','Industries'),('support.html','Support')
    ]
    menu = ''
    for href, label in items:
        cls = ' class="active"' if label == active else ''
        menu += f'<li><a href="{href}"{cls}>{label}</a></li>'

    return f'''<a href="#main-content" class="skip-link">Skip to main content</a>
<header class="header" role="banner"><div class="header__inner">
<a href="index.html" class="header__logo"><img src="images/logo/cropped-sanpar-icon-300x300.png" alt="SANPAR" width="36" height="36"> SANPAR</a>
<nav class="header__nav" aria-label="Main navigation"><ul class="header__menu">{menu}</ul></nav>
<div class="header__actions"><a href="contact.html" class="btn btn--primary header__cta">Contact Us</a>
<button class="header__hamburger" aria-label="Open menu"><span></span><span></span><span></span></button></div>
</div></header>
<div class="mobile-overlay"></div>
<nav class="mobile-nav" aria-label="Mobile navigation"><div class="mobile-nav__header"><span class="header__logo" style="font-size:var(--text-lg)">SANPAR</span><button class="mobile-nav__close" aria-label="Close menu">&times;</button></div>
<ul class="mobile-nav__menu"><li><a href="index.html">Home</a></li><li><a href="who-we-are.html">About Us</a></li><li><a href="products.html">Products</a></li><li><a href="industries.html">Industries</a></li><li><a href="support.html">Support</a></li></ul>
<div class="mobile-nav__footer"><a href="contact.html" class="btn btn--primary" style="width:100%;justify-content:center">Contact Us</a></div></nav>'''

def trust_bar():
    return '<div class="trust-bar"><div class="trust-bar__inner"><div class="trust-bar__item">&#10003; ISO 9001:2015</div><div class="trust-bar__item">&#10003; AS 9100D</div><div class="trust-bar__item">&#10003; 30+ Years</div><div class="trust-bar__item">&#10003; 3000+ Customers</div></div></div>'

def footer():
    return f'''{trust_bar()}
<footer class="footer" role="contentinfo"><div class="footer__grid">
<div class="footer__col"><h4>SANPAR Industries</h4><p>Precision-engineered solutions in compressed air treatment and industrial cooling, trusted globally for over 31 years.</p>
<div class="footer__social"><a href="https://www.linkedin.com/company/sanpar-industries" aria-label="LinkedIn">in</a><a href="https://www.youtube.com/channel/UCtD9fjNAP-VTtvyApCV8juw" aria-label="YouTube">&#9654;</a><a href="https://www.facebook.com/sanparindustries/" aria-label="Facebook">f</a><a href="https://x.com/SANPARindia" aria-label="Twitter/X">&#120143;</a></div>
<p style="margin-top:var(--space-4);font-size:var(--text-xs)">+91 7349 142 424 | +91 80 4343 5959<br>enquiry@sanpar.com</p></div>
<div class="footer__col"><h4>Quick Links</h4><ul class="footer__links"><li><a href="index.html">Home</a></li><li><a href="who-we-are.html">Who We Are</a></li><li><a href="products.html">Products</a></li><li><a href="industries.html">Industries</a></li><li><a href="support.html">Support</a></li><li><a href="contact.html">Contact Us</a></li></ul></div>
<div class="footer__col"><h4>Company</h4><ul class="footer__links"><li><a href="success-stories.html">Success Stories</a></li><li><a href="work-with-us.html">Careers</a></li><li><a href="news.html">News</a></li><li><a href="blogs.html">Blogs</a></li><li><a href="technology.html">Technology</a></li><li><a href="job-openings.html">Job Openings</a></li></ul></div>
<div class="footer__col"><h4>Contact</h4><ul class="footer__links"><li><a href="tel:+917349142424">+91 7349 142 424</a></li><li><a href="tel:+918043435959">Fax: +91 80 4343 5959</a></li><li><a href="mailto:enquiry@sanpar.com">enquiry@sanpar.com</a></li></ul>
<p style="margin-top:var(--space-4);font-size:var(--text-xs)">SANPAR Industries Pvt. Ltd<br>Plot No.4, 2nd Cross, KSSIDC Industrial Estate<br>Bommasandra 2nd Stage<br>Bengaluru 560 099, Karnataka, India</p></div>
</div><div class="footer__bottom"><span>&copy; 2025 SANPAR Industries Pvt. Ltd. All rights reserved.</span><div class="flex gap-4"><a href="privacy-policy.html">Privacy Policy</a><a href="terms-and-conditions.html">Terms &amp; Conditions</a></div></div></footer>'''

def page_wrap(title, active, body, desc=''):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="{esc(desc)}">
<title>{esc(title)} &mdash; SANPAR Industries</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/tokens.css"><link rel="stylesheet" href="css/layout.css"><link rel="stylesheet" href="css/components.css">
<link rel="icon" href="images/logo/cropped-sanpar-icon-300x300.png" type="image/png">
</head>
<body>
{header(active)}
<main id="main-content">
{body}
</main>
{footer()}
<script src="js/main.js"></script>
</body>
</html>'''

def breadcrumb(items):
    parts = [f'<li><a href="index.html">Home</a></li>']
    for i, (href, label) in enumerate(items):
        parts.append('<li class="breadcrumb__sep">&rsaquo;</li>')
        if i == len(items)-1:
            parts.append(f'<li class="breadcrumb__current" aria-current="page">{esc(label)}</li>')
        else:
            parts.append(f'<li><a href="{href}">{esc(label)}</a></li>')
    return f'<nav class="breadcrumb"><ul class="breadcrumb__list">{"".join(parts)}</ul></nav>'

def page_hero(label, title, desc):
    return f'<section class="page-hero"><div style="max-width:var(--container-max);margin:0 auto"><span class="label" style="color:var(--color-accent)">{esc(label)}</span><h1>{esc(title)}</h1><p>{esc(desc)}</p></div></section>'

# ============================================================
# SUCCESS STORIES
# ============================================================
stories_data = {
    'hindustan-motors': {'client':'Hindustan Motors, Calcutta','product':'Refrigerated Air Dryer','industry':'Automobile','outcome':'Avoided usage of 6 compressors, saving at least Rs.8.7 lakhs per month','requirement':'Plant equipped with centralised Desiccant Dryer with 25% purge losses. Air leakage found in pneumatic lines.','solution':'Replace desiccant dryer with refrigerated dryer (no purge losses). Arrest all leaks in pneumatic lines.','result':'Saved Rs.8.7 lakhs/month'},
    'hical-technologies': {'client':'Hical Technologies Pvt. Ltd.','product':'Precision Air Conditioner','industry':'Aviation/Electronics','outcome':'Constant climate maintained for vacuum potting process (23+/-2 deg C, 40+/-5% RH)','requirement':'Vacuum potting of polyurethane requires controlled temperature and humidity to prevent pustule formation on inductors.','solution':'Custom Precision Air Conditioner with cooling, heating, dehumidification and humidification modes.','result':'Climate maintained at 23+/-2 deg C'},
    'excel-glass': {'client':'Excel Glass, Allappuzha, Kerala','product':'Refrigerated Air Dryer (XEROS Series)','industry':'Glass Manufacturing','outcome':'Glass moulds free from blowholes. Largest refrigerated dryer by an Indian manufacturer.','requirement':'Existing shell and tube dryer had 0.2 bar pressure drop, refrigerant leaks and moisture carry-over causing blowholes.','solution':'XEROS series with aluminium plate heat exchangers (0.1 bar drop) and brazed plate condenser.','result':'Blowholes eliminated'},
    'infosys-technologies-ltd': {'client':'Infosys Technologies Ltd, Mysore','product':'Compressed Air Treatment System','industry':'Software Services','outcome':'Reduced time consumption on drying laundry material at residential campus.','requirement':'Pneumatic laundry drying machine at residential campus needed treated compressed air.','solution':'Refrigerated compressed air treatment system (dryer + filters). Capacity: 11.50 cfm / 7 bar g.','result':'Drying time reduced'},
    'jmt-auto-ltd': {'client':'JMT Auto Ltd, Jamshedpur','product':'Refrigerated Dehumidifier','industry':'Automobile','outcome':'CMM machine functions accurately. Repeat order placed for Dharwad plant.','requirement':'Standard room humidity 40-60% required for precision CMM (Coordinate Measuring Machine).','solution':'Refrigerated dehumidifier with built-in hygrostat, fully automatic operation.','result':'Repeat order for 2nd plant'},
    'gas-turbine-research-establishment': {'client':'Gas Turbine Research Establishment (GTRE), Bangalore','product':'High Pressure Compressed Air Treatment System','industry':'Defence Research','outcome':'Reduced power consumption for cooling air considerably.','requirement':'Cool dry air at 35 bar g needed for monitoring turbine blade expansion during engine testing. Previous desiccant dryer had 25% purge losses.','solution':'Refrigerated compressed air treatment system on mobile trolley: dryer + pre/after/final filters + timer drains + regulators + flow meter. 22 cfm / 35 bar g.','result':'Power consumption reduced'},
    'ashok-leyland-ltd': {'client':'Engine R&D Division, Ashok Leyland Ltd, Hosur','product':'Climatic Controller','industry':'Automobile','outcome':'Accurate measurement of filter paper for particulate emissions testing per ARAI standards.','requirement':'45+/-2% RH, 22+/-1 deg C required for weighing filter paper used in emission measurement.','solution':'Climatic Controller integrating cooling system, humidifier and dehumidifier.','result':'Emissions testing accuracy achieved'},
    'jindal-steel-power-limited-raigarh': {'client':'Jindal Steel & Power Limited, Raigarh','product':'Refrigerated Air Dryer','industry':'Steel Manufacturing','outcome':'Dry air protects blast furnace, maintains production volumes and quality.','requirement':'Moisture-free compressed air for blast furnace at new production facility. Multiple systems needed.','solution':'6 large capacity refrigerated compressed air dryers with varied operating pressures. All use R407C eco-friendly refrigerant.','result':'6 dryers deployed successfully'},
}

def build_success_stories():
    # Index page
    body = page_hero('8 Proven Results', 'Success Stories', 'SANPAR takes immense pride in providing solutions that deliver measurable results. Understanding, documenting and tailoring the right solution addressing key challenges keeps our team driven.')
    body += breadcrumb([('success-stories.html','Success Stories')])
    body += '<section class="section"><div class="container"><div class="grid grid--2" style="gap:var(--space-6)">'
    for slug, s in stories_data.items():
        body += f'''<div class="card card--story animate-on-scroll"><div class="card__body">
<span class="badge badge--accent">{esc(s["industry"])}</span>
<div class="card__result">{esc(s["result"])}</div>
<h3>{esc(s["client"])}</h3>
<p><strong>Product:</strong> {esc(s["product"])}</p>
<p>{esc(s["outcome"])}</p>
<a href="story-{slug}.html" class="btn btn--tertiary">Read full case study <span class="arrow">&rarr;</span></a>
</div></div>'''
    body += '</div></div></section>'
    write_page('success-stories.html', 'Success Stories', 'About Us', body, 'SANPAR success stories across automobile, defence, steel, glass, pharmaceutical industries.')
    print("  Created success-stories.html")

    # Individual pages
    for slug, s in stories_data.items():
        body = page_hero(s['industry'], s['client'], f'Product: {s["product"]}')
        body += breadcrumb([('success-stories.html','Success Stories'),(f'story-{slug}.html', s['client'].split(',')[0])])
        body += f'''<section class="section"><div class="container container--narrow">
<div class="animate-on-scroll" style="background:var(--color-info-bg);padding:var(--space-6);border-radius:var(--radius-md);margin-bottom:var(--space-8)">
<h3 style="color:var(--color-primary);margin-bottom:var(--space-2)">Outcome</h3><p style="font-size:var(--text-lg);font-weight:600">{esc(s["outcome"])}</p></div>
<div class="grid grid--2" style="gap:var(--space-8);margin-bottom:var(--space-8)">
<div><span class="badge badge--industry" style="margin-bottom:var(--space-3)">Product</span><p style="font-weight:600">{esc(s["product"])}</p></div>
<div><span class="badge badge--industry" style="margin-bottom:var(--space-3)">Industry</span><p style="font-weight:600">{esc(s["industry"])}</p></div></div>
<h3>Requirement</h3><p>{esc(s["requirement"])}</p>
<h3 style="margin-top:var(--space-6)">Solution</h3><p>{esc(s["solution"])}</p>
<h3 style="margin-top:var(--space-6)">SANPAR Service</h3>
<ul style="list-style:none;padding:0"><li style="padding:var(--space-2) 0">&#10003; Installation and commissioning at customer site</li><li style="padding:var(--space-2) 0">&#10003; Training on operation and control logic</li><li style="padding:var(--space-2) 0">&#10003; Prompt service attention</li></ul>
</div></section>
<section class="section section--dark" style="text-align:center"><div class="container container--narrow animate-on-scroll">
<h2 style="color:var(--text-inverse)">Have a Similar Challenge?</h2>
<p style="color:rgba(255,255,255,0.7);margin:0 auto var(--space-8)">Our engineering team can design a solution tailored to your specific requirements.</p>
<a href="contact.html" class="btn btn--light btn--lg">Contact Us</a></div></section>'''
        write_page(f'story-{slug}.html', s['client'].split(',')[0], 'About Us', body, f'SANPAR success story: {s["client"]} - {s["outcome"]}')
        print(f"  Created story-{slug}.html")

# ============================================================
# INDUSTRY DETAIL PAGES
# ============================================================
industries_data = [
    {'slug':'aerospace-defence','name':'Aerospace & Defence','file':'aerospace-defence.json','img':'images/industries/aerospace-scaled.webp'},
    {'slug':'machine-tools','name':'Machine Tools','file':'machine-tools.json','img':''},
    {'slug':'pharmaceutical','name':'Pharmaceutical','file':'pharmaceutical.json','img':'images/industries/Pharma-3-scaled.png'},
    {'slug':'cement','name':'Cement Industry','file':'cement.json','img':''},
    {'slug':'textile','name':'Textile Industry','file':'textile.json','img':'images/industries/Textile-industry-1-scaled.png'},
    {'slug':'food-beverage','name':'Food & Beverage','file':'food-beverage.json','img':'images/industries/Food-scaled.png'},
    {'slug':'plastics','name':'Plastics Industry','file':'plastics.json','img':'images/industries/Plastics-Industry-scaled.webp'},
    {'slug':'manufacturing','name':'Manufacturing','file':'manufacturing.json','img':'images/industries/Manufacture-Industry-scaled.webp'},
    {'slug':'energy-power','name':'Energy & Power','file':'energy-power.json','img':'images/industries/Energy-Power-Industry-scaled.webp'},
    {'slug':'chemical','name':'Chemical Industry','file':'chemical.json','img':'images/industries/Chemical-Industry-scaled.webp'},
]

def build_industry_pages():
    for ind in industries_data:
        data = load(f'industries/{ind["file"]}')
        paras = [p for p in data.get('paragraphs',[]) if len(p)>60 and 'Sanpar' != p and 'Precision-engineered' not in p and '2025 SANPAR' not in p and 'Terms' not in p][:6]
        headings = [h for h in data.get('headings',[]) if h.get('level') in ('h2','h3') and 'SANPAR Industries' not in h.get('text','') and 'Quick Links' not in h.get('text','') and 'Product Categories' not in h.get('text','') and 'Industries' not in h.get('text','')][:4]

        body = page_hero('Industry Solutions', ind['name'], f'How SANPAR serves the {ind["name"].lower()} sector with precision thermal engineering solutions.')
        body += breadcrumb([('industries.html','Industries'),(f'industry-{ind["slug"]}.html', ind['name'])])

        body += '<section class="section"><div class="container"><div class="grid grid--2" style="gap:var(--space-12);align-items:start"><div class="animate-on-scroll">'
        for hdg in headings[:2]:
            body += f'<h2>{esc(hdg["text"])}</h2>'
        for p in paras[:3]:
            body += f'<p>{esc(p)}</p>'
        body += '</div><div class="animate-on-scroll">'
        if ind['img']:
            body += f'<img src="{ind["img"]}" alt="{esc(ind["name"])}" style="width:100%;border-radius:var(--radius-lg)" loading="lazy">'
        else:
            body += f'<div style="background:var(--bg-dark);border-radius:var(--radius-lg);padding:var(--space-16);text-align:center;color:white"><h3 style="color:white">{esc(ind["name"])}</h3></div>'
        body += '</div></div></div></section>'

        if len(paras) > 3 or len(headings) > 2:
            body += '<section class="section section--light"><div class="container container--narrow"><div class="animate-on-scroll">'
            for hdg in headings[2:]:
                body += f'<h3>{esc(hdg["text"])}</h3>'
            for p in paras[3:]:
                body += f'<p>{esc(p)}</p>'
            body += '</div></div></section>'

        body += '''<section class="section section--dark" style="text-align:center"><div class="container container--narrow animate-on-scroll">
<h2 style="color:var(--text-inverse)">Need Solutions for Your Industry?</h2>
<p style="color:rgba(255,255,255,0.7);margin:0 auto var(--space-8)">Our engineering team designs custom thermal solutions for your specific application requirements.</p>
<div class="flex justify-center gap-4" style="flex-wrap:wrap"><a href="products.html" class="btn btn--light btn--lg">Browse Products</a><a href="contact.html" class="btn btn--secondary btn--lg" style="border-color:rgba(255,255,255,0.3);color:white">Contact Us</a></div></div></section>'''

        write_page(f'industry-{ind["slug"]}.html', ind['name'], 'Industries', body, f'SANPAR solutions for {ind["name"]} - compressed air treatment and industrial cooling.')
        print(f"  Created industry-{ind['slug']}.html")

# ============================================================
# SIMPLE CONTENT PAGES
# ============================================================
def build_work_with_us():
    body = page_hero('Careers at SANPAR', 'Work With Us', 'Our culture is built on inclusion, collaboration, high performance and opportunity that makes SANPAR one of the most rewarding places to work.')
    body += breadcrumb([('work-with-us.html','Work With Us')])
    body += '''<section class="section"><div class="container"><div class="grid grid--2" style="gap:var(--space-12)">
<div class="animate-on-scroll"><span class="label">Culture</span><h2>Empowering Growth, Inspiring Innovation</h2>
<p>As empowering the people at work to demonstrate their skillsets at the global level is our mission, we provide a platform for all employees to envision and accomplish their professional and personal goals.</p>
<p>We believe in agile, collaborative, fast-paced, flexible, inclusive and passionate work culture that defines life at SANPAR.</p>
<a href="job-openings.html" class="btn btn--primary">View Job Openings</a></div>
<div class="animate-on-scroll"><div style="background:var(--bg-light);padding:var(--space-8);border-radius:var(--radius-lg)">
<h3>Faces of SANPAR</h3><p>Meet some of our employees and discover what they do.</p>
<div style="margin-top:var(--space-4)"><h4>Manikyam. K</h4><p style="color:var(--text-secondary);font-size:var(--text-sm)">General Manager - Commercial</p></div>
<div style="margin-top:var(--space-4)"><h4>Kavan M.C</h4><p style="color:var(--text-secondary);font-size:var(--text-sm)">Asst. Manager - Customer Support</p></div></div></div></div></div></section>

<section class="section section--light"><div class="container"><div class="text-center animate-on-scroll" style="margin-bottom:var(--space-10)"><span class="label">Conduct Guide</span><h2>Employee Code of Conduct</h2>
<p style="margin:0 auto">We commit to creating a responsible, supportive environment where every employee acts professionally, collaborates effectively, and prioritises well-being and integrity.</p></div>
<div class="grid grid--3">
<div class="animate-on-scroll" style="padding:var(--space-6);background:white;border-radius:var(--radius-md);text-align:center"><h4>Respect</h4></div>
<div class="animate-on-scroll" style="padding:var(--space-6);background:white;border-radius:var(--radius-md);text-align:center"><h4>Ethics</h4></div>
<div class="animate-on-scroll" style="padding:var(--space-6);background:white;border-radius:var(--radius-md);text-align:center"><h4>Team Work</h4></div>
<div class="animate-on-scroll" style="padding:var(--space-6);background:white;border-radius:var(--radius-md);text-align:center"><h4>Safety</h4></div>
<div class="animate-on-scroll" style="padding:var(--space-6);background:white;border-radius:var(--radius-md);text-align:center"><h4>Equity</h4></div>
<div class="animate-on-scroll" style="padding:var(--space-6);background:white;border-radius:var(--radius-md);text-align:center"><h4>Accountability</h4></div>
</div></div></section>

<section class="section"><div class="container"><div class="grid grid--2" style="gap:var(--space-12)">
<div class="animate-on-scroll"><span class="label">Start Building Your Career</span><h2>Internship &amp; Apprenticeship Programme</h2>
<h3>Internship</h3><p>When you join SANPAR, you give your career a great start working on real projects. We offer exceptional internships, rotational programmes and early career opportunities.</p>
<h3 style="margin-top:var(--space-6)">Apprenticeship</h3><p>Apprentices are our future, so we invest in them. Students receive hands-on training where they make a real contribution to our emerging technologies.</p></div>
<div class="animate-on-scroll"><span class="label">Benefits</span><h2>How We Care for You</h2>
<ul style="list-style:none;padding:0">
<li style="padding:var(--space-3) 0;border-bottom:1px solid var(--grey-3)">&#10003; Career Development &amp; Opportunities</li>
<li style="padding:var(--space-3) 0;border-bottom:1px solid var(--grey-3)">&#10003; Job Training &amp; Upskilling</li>
<li style="padding:var(--space-3) 0;border-bottom:1px solid var(--grey-3)">&#10003; Work-Life Balance</li>
<li style="padding:var(--space-3) 0;border-bottom:1px solid var(--grey-3)">&#10003; Employee Recognition &amp; Reward Programs</li>
<li style="padding:var(--space-3) 0;border-bottom:1px solid var(--grey-3)">&#10003; Health Insurance</li>
<li style="padding:var(--space-3) 0;border-bottom:1px solid var(--grey-3)">&#10003; Parental Leave</li>
<li style="padding:var(--space-3) 0">&#10003; Paid &amp; Unpaid Holidays</li></ul></div></div></div></section>'''
    write_page('work-with-us.html', 'Work With Us', 'About Us', body, 'Careers at SANPAR Industries - culture, internships, apprenticeships, job openings, and employee benefits.')

def build_technology():
    body = page_hero('R&D and White Papers', 'Technology', 'Explore SANPAR\'s technical resources, white papers and R&D documentation.')
    body += breadcrumb([('technology.html','Technology')])
    body += '''<section class="section"><div class="container container--narrow"><div class="animate-on-scroll">
<span class="label">White Papers</span><h2>Refrigeration Air Dryers</h2>
<p>Download our technical white paper on refrigeration air dryer technology, design principles, and application considerations.</p>
<div style="background:var(--bg-light);padding:var(--space-6);border-radius:var(--radius-md);margin-top:var(--space-6)">
<h4>Refrigeration Air Dryers - Technical White Paper</h4>
<p style="color:var(--text-secondary);font-size:var(--text-sm)">Comprehensive guide covering open/closed loop design, refrigerant selection, tropical climate considerations, and energy efficiency.</p>
<a href="contact.html" class="btn btn--primary" style="margin-top:var(--space-4)">Request Download</a></div></div></div></section>'''
    write_page('technology.html', 'Technology', 'About Us', body, 'SANPAR technology white papers and R&D documentation.')

def build_news():
    articles = [
        ('NEW PRODUCT DEVELOPMENT','Our R&D team are currently working towards our new range of products.','images/misc/sanpar-post-1.jpg' if os.path.exists(os.path.join(BASE,'images/misc/sanpar-post-1.jpg')) else ''),
        ('SANPAR DEVELOPS LENS STORAGE FACILITY FOR INDIAN INSTITUTE OF ASTROPHYSICS','SANPAR is proud to convey its success in developing a Climatic Chamber for the Indian Institute of Astrophysics.',''),
        ('SANPAR COMPLETES GLORIOUS 21 YEARS TODAY!','SANPAR completes glorious 21 years today, 7th February.',''),
        ('SANPAR at HANNOVER MESSE 2015','SANPAR at HANNOVER MESSE 2015 and more than 3000 exhibitors from around the world.',''),
    ]
    body = page_hero('SANPAR Industries Latest Updates', 'News', 'Here you will find latest posts and news from SANPAR Industries.')
    body += breadcrumb([('news.html','News')])
    body += '<section class="section"><div class="container"><div class="grid grid--2" style="gap:var(--space-6)">'
    for title, desc, img in articles:
        body += f'<div class="card animate-on-scroll"><div class="card__body"><h3>{esc(title)}</h3><p>{esc(desc)}</p></div></div>'
    body += '</div></div></section>'
    write_page('news.html', 'News', '', body, 'Latest news from SANPAR Industries.')

def build_blogs():
    body = page_hero('SANPAR Industries Latest Updates', 'Blogs', 'Here you will find latest blog posts from SANPAR Industries.')
    body += breadcrumb([('blogs.html','Blogs')])
    body += '''<section class="section"><div class="container"><div class="grid grid--3"><div class="card animate-on-scroll">
<div class="card__body"><h3>ECODRAIR SERIES COMPRESSED AIR DRYER FOR EFFICIENT AIR TREATMENT</h3>
<p>ECODRAIR Series compressed air dryers by SANPAR feature energy-efficient refrigerant technology and compact design for industrial compressed air treatment.</p>
<a href="product-ecodrair.html" class="btn btn--tertiary">Read More <span class="arrow">&rarr;</span></a></div></div></div></div></section>'''
    write_page('blogs.html', 'Blogs', '', body, 'SANPAR Industries blog posts on compressed air treatment technology.')

def build_events():
    body = page_hero('SANPAR Industries Latest Events', 'Events', 'Here you will find latest events from SANPAR Industries.')
    body += breadcrumb([('events.html','Events')])
    body += '<section class="section"><div class="container container--narrow text-center"><p style="color:var(--text-tertiary)">No upcoming events at this time. Check back soon for updates.</p></div></section>'
    write_page('events.html', 'Events', '', body, 'SANPAR Industries events and exhibitions.')

def build_shop():
    body = page_hero('My Account', 'Shop', 'Login to your SANPAR account to manage orders and access resources.')
    body += breadcrumb([('shop.html','Shop')])
    body += '''<section class="section"><div class="container container--narrow"><div class="animate-on-scroll" style="background:var(--bg-light);padding:var(--space-8);border-radius:var(--radius-lg);max-width:480px;margin:0 auto">
<h2 style="font-size:var(--text-4xl)">Login</h2>
<form><div class="form-group"><label>Username or email address <span class="required">*</span></label><input type="text" class="form-input" required></div>
<div class="form-group"><label>Password <span class="required">*</span></label><input type="password" class="form-input" required></div>
<div style="display:flex;align-items:center;gap:var(--space-2);margin-bottom:var(--space-4)"><input type="checkbox" id="remember"><label for="remember" style="margin:0;font-size:var(--text-sm)">Remember me</label></div>
<button type="submit" class="btn btn--primary" style="width:100%;justify-content:center">Log in</button>
<p style="margin-top:var(--space-4);font-size:var(--text-sm)"><a href="#">Lost your password?</a></p></form></div></div></section>'''
    write_page('shop.html', 'My Account', '', body, 'SANPAR Industries customer account portal.')

def build_job_openings():
    body = page_hero('Current Openings', 'Job Openings', 'Join our team of skilled engineers and professionals.')
    body += breadcrumb([('work-with-us.html','Careers'),('job-openings.html','Job Openings')])
    body += '''<section class="section"><div class="container container--narrow">
<div class="card animate-on-scroll"><div class="card__body">
<span class="badge badge--accent">Full Time</span><h3>Sales Engineer</h3>
<p style="color:var(--text-secondary);font-size:var(--text-sm)">Locations: Ahmedabad, Bangalore, Baroda, Chennai, Hyderabad, Jamshedpur, Mumbai, Pune</p>
<p>Join SANPAR as a Sales Engineer and help deliver precision thermal engineering solutions to customers across India.</p>
<a href="contact.html" class="btn btn--primary" style="margin-top:var(--space-4)">Apply Now</a></div></div></div></section>'''
    write_page('job-openings.html', 'Job Openings', '', body, 'SANPAR Industries job openings - Sales Engineer positions across India.')

def build_privacy_policy():
    data = load('privacy-policy.json')
    paras = [p for p in data.get('paragraphs',[]) if len(p)>40 and 'Sanpar' != p and 'Precision-engineered' not in p and '2025 SANPAR' not in p and 'Terms' not in p and 'Privacy Policy' != p]
    lists = data.get('lists',[])
    body = page_hero('Effective Date: 14 July, 2025', 'Privacy Policy', '')
    body += breadcrumb([('privacy-policy.html','Privacy Policy')])
    body += '<section class="section"><div class="container container--narrow"><div class="animate-on-scroll">'
    for p in paras:
        body += f'<p>{esc(p)}</p>'
    # Add list content
    for lst in lists:
        if isinstance(lst, list):
            for item in lst:
                if len(str(item)) > 30 and 'Home' not in str(item) and 'About Us' not in str(item) and 'Products' not in str(item):
                    body += f'<p>{esc(item)}</p>'
    body += '</div></div></section>'
    write_page('privacy-policy.html', 'Privacy Policy', '', body, 'SANPAR Industries privacy policy - effective July 14, 2025.')

def build_terms():
    data = load('terms-and-conditions.json')
    paras = [p for p in data.get('paragraphs',[]) if len(p)>40 and 'Sanpar' != p and 'Precision-engineered' not in p and '2025 SANPAR' not in p and 'Privacy' not in p]
    lists = data.get('lists',[])
    body = page_hero('Effective Date: 14 July, 2025', 'Terms and Conditions', '')
    body += breadcrumb([('terms-and-conditions.html','Terms and Conditions')])
    body += '<section class="section"><div class="container container--narrow"><div class="animate-on-scroll">'
    for p in paras:
        body += f'<p>{esc(p)}</p>'
    for lst in lists:
        if isinstance(lst, list):
            for item in lst:
                if len(str(item)) > 30 and 'Home' not in str(item) and 'About Us' not in str(item) and 'Products' not in str(item):
                    body += f'<p>{esc(item)}</p>'
    body += '</div></div></section>'
    write_page('terms-and-conditions.html', 'Terms and Conditions', '', body, 'SANPAR Industries terms and conditions - effective July 14, 2025.')

def write_page(filename, title, active, body, desc=''):
    html = page_wrap(title, active, body, desc)
    path = os.path.join(BASE, filename)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)

# ============================================================
# MAIN
# ============================================================
if __name__ == '__main__':
    print("Building SANPAR website pages...")
    print("\n--- Success Stories ---")
    build_success_stories()
    print("\n--- Industry Detail Pages ---")
    build_industry_pages()
    print("\n--- Work With Us ---")
    build_work_with_us()
    print("  Created work-with-us.html")
    print("\n--- Technology ---")
    build_technology()
    print("  Created technology.html")
    print("\n--- News ---")
    build_news()
    print("  Created news.html")
    print("\n--- Blogs ---")
    build_blogs()
    print("  Created blogs.html")
    print("\n--- Events ---")
    build_events()
    print("  Created events.html")
    print("\n--- Shop ---")
    build_shop()
    print("  Created shop.html")
    print("\n--- Job Openings ---")
    build_job_openings()
    print("  Created job-openings.html")
    print("\n--- Privacy Policy ---")
    build_privacy_policy()
    print("  Created privacy-policy.html")
    print("\n--- Terms & Conditions ---")
    build_terms()
    print("  Created terms-and-conditions.html")
    print("\n=== DONE ===")
    print(f"Total HTML files: {len([f for f in os.listdir(BASE) if f.endswith('.html')])}")
