"""
Extract ALL text content from every HTML page in exact section order.
Outputs a structured Markdown file.
Does NOT modify any existing files.
"""
import os, re
from html.parser import HTMLParser

BASE = os.path.dirname(os.path.abspath(__file__))

class TextExtractor(HTMLParser):
    """Extract visible text from HTML, preserving order and structure."""
    def __init__(self):
        super().__init__()
        self.result = []
        self.current_tag = ''
        self.skip_tags = {'script', 'style', 'meta', 'link', 'head'}
        self.skip = False
        self.tag_stack = []

    def handle_starttag(self, tag, attrs):
        self.tag_stack.append(tag)
        if tag in self.skip_tags:
            self.skip = True
        self.current_tag = tag
        attrs_dict = dict(attrs)

        # Mark structural elements
        if tag in ('h1','h2','h3','h4','h5','h6'):
            self.result.append(('heading', tag, ''))
        elif tag == 'section':
            cls = attrs_dict.get('class','')
            self.result.append(('section_start', cls, ''))
        elif tag == 'p':
            self.result.append(('para_start', '', ''))
        elif tag == 'a':
            href = attrs_dict.get('href','')
            cls = attrs_dict.get('class','')
            if 'btn' in cls:
                self.result.append(('button_start', href, ''))
            elif 'mega-menu' in cls or 'footer__links' in str(attrs_dict):
                self.result.append(('link_start', href, ''))
        elif tag == 'span':
            cls = attrs_dict.get('class','')
            if 'label' in cls:
                self.result.append(('label_start', '', ''))
            elif 'badge' in cls:
                self.result.append(('badge_start', '', ''))
        elif tag == 'li':
            self.result.append(('li_start', '', ''))
        elif tag == 'img':
            alt = attrs_dict.get('alt','')
            if alt and alt != 'Client logo' and alt != 'SANPAR':
                self.result.append(('img_alt', '', alt))
        elif tag == 'nav' and 'breadcrumb' in attrs_dict.get('class',''):
            self.result.append(('breadcrumb_start', '', ''))
        elif tag == 'div':
            cls = attrs_dict.get('class','')
            if 'card__result' in cls:
                self.result.append(('result_start', '', ''))
            elif 'stat__number' in cls:
                suffix = attrs_dict.get('data-suffix','')
                count = attrs_dict.get('data-count','')
                if count:
                    self.result.append(('text', '', f'{count}{suffix}'))
            elif 'stat__label' in cls:
                self.result.append(('stat_label', '', ''))

    def handle_endtag(self, tag):
        if self.tag_stack and self.tag_stack[-1] == tag:
            self.tag_stack.pop()
        if tag in self.skip_tags:
            self.skip = False

    def handle_data(self, data):
        if self.skip:
            return
        text = data.strip()
        if not text:
            return
        # Skip navigation duplicates we'll handle separately
        self.result.append(('text', self.current_tag, text))

    def handle_entityref(self, name):
        entities = {'amp':'&','lt':'<','gt':'>','nbsp':' ','copy':'©','rarr':'→','rsaquo':'›','mdash':'—','plusmn':'±','deg':'°'}
        self.result.append(('text', '', entities.get(name, f'&{name};')))

    def handle_charref(self, name):
        try:
            char = chr(int(name)) if not name.startswith('x') else chr(int(name[1:],16))
            self.result.append(('text', '', char))
        except:
            pass

def extract_page_text(filepath):
    """Extract structured text from an HTML file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # Remove header/nav (we'll extract once)
    # Remove everything between <header> and </nav> (mobile nav)
    body_html = html

    parser = TextExtractor()
    parser.feed(body_html)

    return parser.result

def format_page_content(filepath, page_title):
    """Format extracted text into readable markdown sections."""
    raw = extract_page_text(filepath)

    lines = []
    in_header = False
    in_mobile_nav = False
    in_footer = False
    seen_main = False
    current_heading = ''
    skip_nav_text = {'Home','About Us','Products','Industries','Support','Contact Us',
                     'SANPAR','Skip to main content','Open menu','Close menu','×'}

    i = 0
    while i < len(raw):
        typ, meta, text = raw[i]

        # Track sections
        if typ == 'text' and text == 'Skip to main content':
            in_header = True
        if typ == 'section_start' and ('hero' in meta or 'page-hero' in meta):
            in_header = False
            in_mobile_nav = False
            seen_main = True
        if typ == 'section_start' and 'trust-bar' in meta:
            in_footer = True
        if typ == 'text' and 'trust-bar' in str(meta):
            in_footer = True

        # Skip header/nav/footer duplicates
        if in_header or in_mobile_nav:
            i += 1
            continue

        # Detect footer start
        if typ == 'text' and text in ('✓','✓ ISO 9001:2015','SANPAR Industries','PRODUCTS','QUICK LINKS','COMPANY','CONTACT'):
            if seen_main:
                in_footer = True
        if in_footer:
            i += 1
            continue

        # Skip common nav text
        if typ == 'text' and text in skip_nav_text and not seen_main:
            i += 1
            continue

        # Format output
        if typ == 'heading':
            current_heading = meta
        elif typ == 'label_start':
            pass  # next text will be the label
        elif typ == 'badge_start':
            pass
        elif typ == 'section_start':
            if seen_main and meta and 'section--' in meta:
                lines.append('')
        elif typ == 'text':
            tag = meta
            if tag in ('h1',):
                lines.append(f'\n### {text}')
            elif tag in ('h2',):
                lines.append(f'\n#### {text}')
            elif tag in ('h3',):
                lines.append(f'\n##### {text}')
            elif tag in ('h4','h5','h6'):
                lines.append(f'\n###### {text}')
            elif tag == 'small':
                lines.append(f'  *{text}*')
            elif text and len(text) > 1:
                # Skip very short text that's just punctuation
                if text in ('›','→','—','·','|','×','0'):
                    pass
                elif text.startswith('©'):
                    pass  # copyright in footer
                else:
                    lines.append(text)
        elif typ == 'img_alt':
            lines.append(f'[Image: {text}]')

        i += 1

    return lines

def extract_all():
    """Main extraction - all pages in order."""
    # Define page order matching site structure
    pages = [
        ('index.html', 'Homepage'),
        ('who-we-are.html', 'Who We Are'),
        ('products.html', 'Products & Solutions'),
        ('product-xeros.html', 'Xeros Series'),
        ('product-ecodrair.html', 'Ecodrair Series'),
        ('product-adsorption.html', 'Adsorption Dryers'),
        ('product-filters.html', 'Compressed Air Filters'),
        ('product-aftercooler.html', 'Aftercooler'),
        ('product-separator.html', 'Moisture Separator'),
        ('product-drains.html', 'Drains'),
        ('product-water-chillers.html', 'Water Chillers'),
        ('product-air-chillers.html', 'Air Chillers'),
        ('product-coolant-chillers.html', 'Coolant Chillers'),
        ('product-dehumidifier.html', 'Dehumidifier - Xerion Series'),
        ('product-precision-ac.html', 'Precision Air Conditioner'),
        ('product-cat-m1.html', 'CAT M1 Series'),
        ('product-cat-dth.html', 'CAT DTH Series'),
        ('industries.html', 'Industries & Applications'),
        ('industry-aerospace-defence.html', 'Aerospace & Defence'),
        ('industry-machine-tools.html', 'Machine Tools'),
        ('industry-pharmaceutical.html', 'Pharmaceutical'),
        ('industry-cement.html', 'Cement Industry'),
        ('industry-textile.html', 'Textile Industry'),
        ('industry-food-beverage.html', 'Food & Beverage'),
        ('industry-plastics.html', 'Plastics Industry'),
        ('industry-manufacturing.html', 'Manufacturing'),
        ('industry-energy-power.html', 'Energy & Power'),
        ('industry-chemical.html', 'Chemical Industry'),
        ('support.html', 'Support & Services'),
        ('contact.html', 'Contact Us'),
        ('success-stories.html', 'Success Stories'),
        ('story-hindustan-motors.html', 'Hindustan Motors'),
        ('story-hical-technologies.html', 'Hical Technologies'),
        ('story-excel-glass.html', 'Excel Glass'),
        ('story-infosys-technologies-ltd.html', 'Infosys Technologies'),
        ('story-jmt-auto-ltd.html', 'JMT Auto Ltd'),
        ('story-gas-turbine-research-establishment.html', 'Gas Turbine Research Establishment'),
        ('story-ashok-leyland-ltd.html', 'Ashok Leyland Ltd'),
        ('story-jindal-steel-power-limited-raigarh.html', 'Jindal Steel Power Limited'),
        ('work-with-us.html', 'Work With Us'),
        ('technology.html', 'Technology'),
        ('news.html', 'News'),
        ('blogs.html', 'Blogs'),
        ('events.html', 'Events'),
        ('shop.html', 'Shop / My Account'),
        ('job-openings.html', 'Job Openings'),
        ('privacy-policy.html', 'Privacy Policy'),
        ('terms-and-conditions.html', 'Terms and Conditions'),
    ]

    md = ['# SANPAR Industries — Complete Website Text Content\n']
    md.append('*Extracted from all 48 pages in document order, section by section.*\n')
    md.append('---\n')

    for filename, title in pages:
        filepath = os.path.join(BASE, filename)
        if not os.path.exists(filepath):
            md.append(f'\n## {title}\n\n*Page not found: {filename}*\n')
            continue

        md.append(f'\n## {title}\n')
        md.append(f'**File:** `{filename}`\n')

        lines = format_page_content(filepath, title)

        # Clean up and deduplicate consecutive empty lines
        prev_empty = False
        for line in lines:
            if not line.strip():
                if not prev_empty:
                    md.append('')
                prev_empty = True
            else:
                md.append(line)
                prev_empty = False

        md.append('\n---\n')

    return '\n'.join(md)

if __name__ == '__main__':
    print("Extracting text from all 48 pages...")
    content = extract_all()

    outpath = os.path.join(BASE, '..', 'WEBSITE-CONTENT.md')
    with open(outpath, 'w', encoding='utf-8') as f:
        f.write(content)

    lines = content.count('\n')
    print(f"Done! Written to WEBSITE-CONTENT.md ({lines} lines)")
