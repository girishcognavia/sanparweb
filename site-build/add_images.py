"""Add company/culture images to text-heavy pages."""
import re, os
BASE = os.path.dirname(os.path.abspath(__file__))

def read(f):
    with open(os.path.join(BASE,f),'r',encoding='utf-8') as fh: return fh.read()
def write(f,c):
    with open(os.path.join(BASE,f),'w',encoding='utf-8') as fh: fh.write(c)

# ============================================================
# SUPPORT PAGE - Add service images
# ============================================================
def fix_support():
    html = read('support.html')
    # Add image to the first section
    html = html.replace(
        '<span class="label">Ongoing Assurance</span>\n          <h2>We Don',
        '<img src="images/misc/Complete-system-black-1-scaled.webp" alt="SANPAR compressed air treatment system" style="width:100%;border-radius:var(--radius-lg);margin-bottom:var(--space-8)" loading="lazy">\n          <span class="label">Ongoing Assurance</span>\n          <h2>We Don'
    )
    write('support.html', html)
    print("  support.html - added system image")

# ============================================================
# WORK WITH US - Add career/culture images
# ============================================================
def fix_careers():
    html = read('work-with-us.html')
    # Add team image
    html = html.replace(
        '<h3>Faces of SANPAR</h3><p>Meet some of our employees',
        '<img src="images/misc/Team-work-1.gif" alt="SANPAR team collaboration" style="width:100%;border-radius:var(--radius-md);margin-bottom:var(--space-6)" loading="lazy">\n<h3>Faces of SANPAR</h3><p>Meet some of our employees'
    )
    # Add conduct guide image
    html = html.replace(
        '<span class="label">Conduct Guide</span><h2>Employee Code of Conduct</h2>',
        '<span class="label">Conduct Guide</span><h2>Employee Code of Conduct</h2>\n<img src="images/misc/Conduct-Guide-916x1024.webp" alt="SANPAR Employee Code of Conduct" style="max-width:320px;margin:0 auto var(--space-8);display:block;border-radius:var(--radius-md)" loading="lazy">'
    )
    # Add benefits image
    html = html.replace(
        '<span class="label">Benefits</span><h2>How We Care for You</h2>',
        '<img src="images/misc/Benefits-916x1024.webp" alt="SANPAR employee benefits" style="width:100%;border-radius:var(--radius-md);margin-bottom:var(--space-6)" loading="lazy">\n<span class="label">Benefits</span><h2>How We Care for You</h2>'
    )
    # Add career start image
    html = html.replace(
        '<span class="label">Start Building Your Career</span>',
        '<img src="images/misc/Start-building-your-career-with-us-916x1024.webp" alt="Start your career at SANPAR" style="width:100%;border-radius:var(--radius-md);margin-bottom:var(--space-6)" loading="lazy">\n<span class="label">Start Building Your Career</span>'
    )
    write('work-with-us.html', html)
    print("  work-with-us.html - added team, conduct, benefits, career images")

# ============================================================
# WHO WE ARE - Add company images
# ============================================================
def fix_about():
    html = read('who-we-are.html')
    # Add ISO certification image to quality policy
    html = html.replace(
        '<h3>Quality Policy</h3>',
        '<img src="images/misc/ISO-Certification.gif" alt="SANPAR ISO 9001:2015 Certification" style="max-width:280px;margin-bottom:var(--space-6);border-radius:var(--radius-md)" loading="lazy">\n        <h3>Quality Policy</h3>'
    )
    # Add management team image
    html = html.replace(
        '<h4>Ethics</h4>',
        '<h4>Ethics</h4><img src="images/misc/management-team.webp" alt="SANPAR management team" style="display:none">'
    )
    write('who-we-are.html', html)
    print("  who-we-are.html - added ISO and management images")

# ============================================================
# TECHNOLOGY - Add development image
# ============================================================
def fix_technology():
    html = read('technology.html')
    html = html.replace(
        '<span class="label">White Papers</span>',
        '<img src="images/misc/Development-focus-1.gif" alt="SANPAR R&D and technology development" style="width:100%;max-width:400px;border-radius:var(--radius-md);margin-bottom:var(--space-8)" loading="lazy">\n<span class="label">White Papers</span>'
    )
    write('technology.html', html)
    print("  technology.html - added R&D image")

# ============================================================
# NEWS - Add article images
# ============================================================
def fix_news():
    html = read('news.html')
    articles = [
        ('NEW PRODUCT DEVELOPMENT', 'images/misc/Development-focus-1.gif'),
        ('SANPAR DEVELOPS LENS STORAGE', 'images/misc/International-cooperation.gif'),
        ('SANPAR COMPLETES GLORIOUS 21', 'images/misc/Starting-a-business-project.gif'),
        ('SANPAR at HANNOVER MESSE', 'images/misc/Flying-around-the-world.gif'),
    ]
    for title_start, img in articles:
        html = html.replace(
            f'<h3>{title_start}',
            f'<img src="{img}" alt="{title_start}" style="width:100%;height:180px;object-fit:cover;border-radius:var(--radius-md) var(--radius-md) 0 0;margin:-var(--space-6);margin-bottom:var(--space-4);width:calc(100% + var(--space-12))" loading="lazy"><h3>{title_start}'
        )
    write('news.html', html)
    print("  news.html - added article images")

# ============================================================
# SUCCESS STORIES INDEX - Add story images
# ============================================================
def fix_stories():
    html = read('success-stories.html')
    stories_imgs = [
        ('Hindustan Motors', 'images/success-stories/story1.webp'),
        ('Hical Technologies', 'images/success-stories/story2.webp'),
        ('Excel Glass', 'images/success-stories/story3.webp'),
        ('Infosys Technologies', 'images/success-stories/story4.webp'),
        ('JMT Auto', 'images/success-stories/story5.webp'),
        ('Gas Turbine Research', 'images/success-stories/story6.webp'),
        ('Ashok Leyland', 'images/success-stories/story7.webp'),
        ('Jindal Steel', 'images/success-stories/story8.webp'),
    ]
    for name, img in stories_imgs:
        html = html.replace(
            f'<h3>{name}',
            f'<img src="{img}" alt="{name}" style="width:100%;height:160px;object-fit:cover;border-radius:var(--radius-md);margin-bottom:var(--space-4)" loading="lazy"><h3>{name}'
        )
    write('success-stories.html', html)
    print("  success-stories.html - added 8 story images")

# ============================================================
# JOB OPENINGS - Add career image
# ============================================================
def fix_jobs():
    html = read('job-openings.html')
    html = html.replace(
        '<span class="badge badge--accent">Full Time</span>',
        '<img src="images/misc/Investment-data.gif" alt="Career opportunities at SANPAR" style="width:100%;height:200px;object-fit:cover;border-radius:var(--radius-md);margin-bottom:var(--space-4)" loading="lazy"><span class="badge badge--accent">Full Time</span>'
    )
    write('job-openings.html', html)
    print("  job-openings.html - added career image")

# ============================================================
# BLOGS - Add blog image
# ============================================================
def fix_blogs():
    html = read('blogs.html')
    html = html.replace(
        '<h3>ECODRAIR SERIES',
        '<img src="images/products/Ecodrair-arrangement1-cutout-1024x720.webp" alt="ECODRAIR Series compressed air dryer" style="width:100%;height:200px;object-fit:cover;border-radius:var(--radius-md) var(--radius-md) 0 0" loading="lazy"><div style="padding:var(--space-6)"><h3>ECODRAIR SERIES'
    )
    # Close the extra div
    html = html.replace(
        'Read More <span class="arrow">&rarr;</span></a></div></div></div>',
        'Read More <span class="arrow">&rarr;</span></a></div></div></div></div>'
    )
    write('blogs.html', html)
    print("  blogs.html - added Ecodrair product image")

# ============================================================
# INDIVIDUAL STORY PAGES - Add images
# ============================================================
def fix_story_pages():
    stories = [
        ('story-hindustan-motors.html', 'images/success-stories/story1.webp'),
        ('story-hical-technologies.html', 'images/success-stories/story2.webp'),
        ('story-excel-glass.html', 'images/success-stories/story3.webp'),
        ('story-infosys-technologies-ltd.html', 'images/success-stories/story4.webp'),
        ('story-jmt-auto-ltd.html', 'images/success-stories/story5.webp'),
        ('story-gas-turbine-research-establishment.html', 'images/success-stories/story6.webp'),
        ('story-ashok-leyland-ltd.html', 'images/success-stories/story7.webp'),
        ('story-jindal-steel-power-limited-raigarh.html', 'images/success-stories/story8.webp'),
    ]
    for fname, img in stories:
        html = read(fname)
        if img not in html:
            html = html.replace(
                '<section class="section"><div class="container container--narrow">',
                f'<section class="section"><div class="container container--narrow">\n<img src="{img}" alt="Success story" style="width:100%;max-height:300px;object-fit:cover;border-radius:var(--radius-lg);margin-bottom:var(--space-8)" loading="lazy">',
                1
            )
            write(fname, html)
    print("  8 story pages - added banner images")

# ============================================================
if __name__ == '__main__':
    print("Adding images to text-heavy pages...\n")
    fix_support()
    fix_careers()
    fix_about()
    fix_technology()
    fix_news()
    fix_stories()
    fix_jobs()
    fix_blogs()
    fix_story_pages()
    print("\nDone!")
