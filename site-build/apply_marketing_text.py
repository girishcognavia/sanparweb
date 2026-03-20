"""
Apply WEBSITE-CONTENT-ALTERNATE.md marketing text replacements across all site-build HTML pages.
"""
import os
import re

SITE = os.path.dirname(os.path.abspath(__file__))

def r(file, old, new):
    """Replace old with new in file. Returns True if replacement was made."""
    path = os.path.join(SITE, file)
    if not os.path.exists(path):
        print(f"  SKIP (not found): {file}")
        return False
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    if old not in content:
        print(f"  SKIP (text not found): {file} <- {old[:60]}...")
        return False
    content = content.replace(old, new, 1)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    return True

def ra(file, old, new):
    """Replace ALL occurrences of old with new in file."""
    path = os.path.join(SITE, file)
    if not os.path.exists(path):
        return False
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    if old not in content:
        return False
    content = content.replace(old, new)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    return True

def apply_to_all(old, new):
    """Apply replacement to all HTML files."""
    count = 0
    for f in os.listdir(SITE):
        if f.endswith('.html'):
            if ra(f, old, new):
                count += 1
    return count

# ============================================================
# HOMEPAGE (index.html)
# ============================================================
print("=== HOMEPAGE ===")

# Hero eyebrow - reorder
r('index.html',
  '<span class="label" style="color:var(--color-accent)">Excellence Since 1994</span>\n    <p style="font-size:var(--text-lg);font-weight:700;color:var(--color-accent);margin-bottom:var(--space-2);letter-spacing:2px;text-transform:uppercase">We Are Solutionizers</p>',
  '<p style="font-size:var(--text-lg);font-weight:700;color:var(--color-accent);margin-bottom:var(--space-2);letter-spacing:2px;text-transform:uppercase">We Are Solutionizers</p>\n    <span class="label" style="color:var(--color-accent)">Excellence Since 1994</span>')

# Hero headline
r('index.html',
  '<h1>Compressed Air Treatment &amp; Industrial Cooling Solutions</h1>',
  '<h1>Your Production Depends on Clean, Dry Air. We Make Sure It Never Fails.</h1>')

# Hero subtitle
r('index.html',
  'We design, manufacture, and service high-performance compressed air dryers, industrial chillers, and aerospace cooling systems — trusted by 3000+ customers across 10 industries worldwide.',
  'From compressed air dryers rated up to 10,000 CFM to aerospace-grade liquid cooling systems approved by DGAQA — we design, manufacture, and stand behind every system we build. Over 3,000 installations. 10 industries. Zero compromise on quality.')

# Hero trust badges
r('index.html',
  '<div class="hero__proof-item"><strong>ISO 9001:2015</strong> Certified</div>',
  '<div class="hero__proof-item"><strong>ISO 9001:2015</strong> Quality Certified</div>')
r('index.html',
  '<div class="hero__proof-item"><strong>AS 9100D</strong> Aerospace Standard</div>',
  '<div class="hero__proof-item"><strong>AS 9100D</strong> Aerospace &amp; Defence Standard</div>')
r('index.html',
  '<div class="hero__proof-item"><strong>30+</strong> Years in Operation</div>',
  '<div class="hero__proof-item"><strong>30+</strong> Years of Zero-Defect Manufacturing</div>')
r('index.html',
  '<div class="hero__proof-item"><strong>3000+</strong> Customers Served</div>',
  '<div class="hero__proof-item"><strong>3,000+</strong> Systems Deployed Worldwide</div>')

# Hero CTA buttons
r('index.html',
  '>Explore Solutions <span class="arrow">→</span></a>',
  '>Find Your Solution <span class="arrow">→</span></a>')
r('index.html',
  'style="border-color:rgba(255,255,255,0.4);color:white">Contact Us</a>',
  'style="border-color:rgba(255,255,255,0.4);color:white">Talk to an Engineer</a>')

# Stats section labels
r('index.html', '>Years of Engineering Excellence<', '>Years, Zero Shortcuts<')
r('index.html', '>Our Employees<', '>Engineers &amp; Specialists<')
r('index.html', '>Our Products<', '>Product Families, 100+ Configurations<')
r('index.html', '>Our Customers<', '>Installations Across 10 Industries<')

# Defence section headline
r('index.html',
  '<h2>Trusted by India\'s Defence Establishment</h2>',
  '<h2>Trusted Where Failure Is Not an Option</h2>')

# Defence section body
r('index.html',
  'From DGAQA-qualified airborne liquid cooling systems to ground testing equipment for GTRE/DRDO, SANPAR delivers mission-critical thermal solutions that meet the most demanding standards in aerospace and defence.',
  'When India\'s defence establishment needs airborne liquid cooling systems for fighter aircraft avionics, they turn to SANPAR. Our systems are DGAQA-qualified, CEMILAC-approved, and field-proven in some of the nation\'s most demanding programmes — including turbine testing at GTRE/DRDO.')

# Defence badges
r('index.html', '>AS 9100D Certified</span>', '>AS 9100D (EN 9100:2018) Certified</span>')
r('index.html', '>DGAQA Qualified</span>', '>DGAQA Qualification for Airborne Systems</span>')
r('index.html', '>CEMILAC Approved</span>', '>CEMILAC Design Approval</span>')

# Products showcase section
r('index.html',
  '<h2>Reliable & Efficient Systems</h2>',
  '<h2>Engineered to Perform. Built to Last.</h2>')
r('index.html',
  'Precision-engineered products across four categories — from compressed air treatment to medical-grade desiccant dryers.',
  'Four product families. One engineering standard: uncompromising. From high-capacity refrigerated dryers to ISO 8573.1 Class 1 medical air systems — every unit leaves our Bengaluru facility tested, validated, and ready for your most demanding application.')

# Xeros card on homepage
r('index.html',
  '<p>Refrigerated air dryers with open/closed loop design. 85–10,000 CFM capacity.</p>',
  '<p>Open and closed-loop refrigerated air dryers rated 85 to 10,000 CFM. Tropical-optimised for Indian and Southeast Asian climates.</p>')

# Water Chillers card on homepage
r('index.html',
  '<p>CFC-free chillers from 0.5TR to 100TR capacity. PLC-controlled precision.</p>',
  '<p>CFC-free industrial chillers from 0.5TR to 100TR. PLC-controlled with ±0.5°C accuracy. Air-cooled and water-cooled variants.</p>')

# Precision AC card on homepage
r('index.html',
  '<p>Climate controller with ±1°C temperature and ±2% RH accuracy. LAN connectivity.</p>',
  '<p>Server room and laboratory climate control with ±1°C temperature and ±2% RH precision. Remote monitoring via LAN. 24/7 unattended operation.</p>')

# CAT M1 card on homepage
r('index.html',
  '<p>ISO 8573.1 Class 1 medical air filtration. 0.01μm particle, 0.003mg/m³ oil.</p>',
  '<p>Medical-grade desiccant air filtration meeting ISO 8573.1 Class 1 — the highest purity standard. Hospital and pharmaceutical facility ready.</p>')

# Industries section
r('index.html',
  '<h2>Solutions Across 10 Sectors</h2>',
  '<h2>One Engineering Partner. Ten Industries. Thousands of Solutions Deployed.</h2>')

# Success Stories section headline
r('index.html',
  '<h2>Success Stories</h2>',
  '<h2>Measurable Impact, Documented Results</h2>')

# Hindustan Motors card
r('index.html',
  '<div class="card__result">Saved ₹8.7 lakhs/month</div>',
  '<div class="card__result">₹8.7 Lakhs Saved Every Month</div>')
r('index.html',
  'Replaced desiccant dryer with refrigerated system, eliminating 25% purge losses and 6 compressors.',
  'By switching from a desiccant dryer to SANPAR\'s refrigerated system, Hindustan Motors eliminated 25% purge losses and retired 6 compressors. That\'s over ₹1 crore saved annually.')

# GTRE card
r('index.html',
  '<div class="card__result">Power consumption reduced</div>',
  '<div class="card__result">Power Consumption Slashed for DRDO\'s Turbine Testing</div>')
r('index.html',
  'Custom 35 bar g high-pressure compressed air treatment system for turbine engine testing at GTRE/DRDO.',
  'SANPAR engineered a custom 35 bar g high-pressure air treatment system for GTRE — replacing a desiccant dryer that was wasting 25% of compressed air in purge losses.')

# Jindal Steel card
r('index.html',
  '<div class="card__result">6 dryers deployed successfully</div>',
  '<div class="card__result">6 High-Capacity Dryers Deployed at Raigarh</div>')
r('index.html',
  'Moisture-free compressed air for blast furnace operations, maintaining production volumes at scale.',
  'Jindal Steel needed moisture-free compressed air for their blast furnace — at scale, without compromise. SANPAR delivered 6 refrigerated dryers with eco-friendly R407C refrigerant.')

# Trusted partners headline
r('index.html',
  '<h2>Trusted by Industry Leaders</h2>',
  '<h2>The Companies That Trust Their Operations to SANPAR</h2>')

# CTA section
r('index.html',
  "<h2 style=\"color:var(--text-inverse)\">Let's Engineer Your Solution</h2>",
  '<h2 style="color:var(--text-inverse)">Every Application Is Different. Your Solution Should Be Too.</h2>')
r('index.html',
  'Whether you need compressed air treatment, industrial cooling, or aerospace-grade thermal systems — our engineering team is ready to design, build, and support your solution.',
  "Tell us about your process conditions — flow rate, pressure, dew point, ambient temperature — and our engineering team will design a system that fits your plant, your budget, and your performance targets. We don't sell boxes. We solve thermal engineering problems.")

# CTA buttons
r('index.html', '>Get in Touch</a>', '>Request a Custom Proposal</a>')
r('index.html', '>Browse Products</a>', '>Explore Product Range</a>')

print("  Homepage done.")

# ============================================================
# WHO WE ARE (who-we-are.html)
# ============================================================
print("=== WHO WE ARE ===")

r('who-we-are.html',
  'Established 1994',
  'Founded 1994')

# We need to check if there's a "Bengaluru, India" that can get "Trusted Worldwide" appended
r('who-we-are.html',
  'Bengaluru, India</span>',
  'Bengaluru, India · Trusted Worldwide</span>')

r('who-we-are.html',
  '<h1>Who We Are</h1>',
  "<h1>The Engineers Behind India's Most Trusted Compressed Air Systems</h1>")

r('who-we-are.html',
  'Three decades of precision engineering in compressed air treatment, industrial cooling, and aerospace thermal systems.',
  "For thirty years, SANPAR has designed, built, and serviced the systems that keep India's factories, defence establishments, and hospitals running. This is how we got here — and where we're headed.")

r('who-we-are.html',
  '<h2>Precision-Engineered for Industry</h2>',
  '<h2>Built by Engineers. Proven by Industry.</h2>')

r('who-we-are.html',
  'Established in 1994, SANPAR has over three decades of experience in application, manufacturing, engineering and R&D in the field of compressed air treatment and thermal engineering.',
  'SANPAR was founded in 1994 with a single product and a clear ambition: to manufacture compressed air treatment systems that match the quality of the world\'s best. Today, with 14 product lines, 200+ engineers, and an AS 9100D-certified manufacturing facility in Bengaluru, we serve customers across aerospace, defence, pharmaceutical, steel, and nine other industry verticals.')

r('who-we-are.html',
  'We have built our reputation through every step in the chain — technology, design, development, manufacturing, and delivery. Our manufacturing facility in Bangalore, India is operated by a team of qualified, skilled engineers who work seamlessly to produce world-class products.',
  "We own the entire value chain — from R&D and thermal simulation through manufacturing, testing, installation, and lifetime support. Every system that leaves our facility has been designed, assembled, and validated by our team. That's not outsourcing with a label. That's engineering with accountability.")

r('who-we-are.html',
  'From inventions to innovations, energy responsibility to environment stewardship, SANPAR provides solutions to complex thermal engineering applications.',
  '')

# Mission
r('who-we-are.html',
  'Delivering innovative, cost-effective, and reliable thermal engineering products to the manufacturing industry and aerospace sector, empowering our people to demonstrate their capabilities at the global level.',
  'To engineer thermal solutions that global industries trust with their most critical processes — and to build a team of engineers whose capabilities are recognised not just in India, but worldwide.')

# Vision
r('who-we-are.html',
  'To design and manufacture zero-defect products that create long-lasting trust within our clientele — building extraordinary leadership in thermal engineering for industries and aerospace.',
  'To become the standard against which compressed air treatment and thermal engineering systems are measured — in India and globally — through zero-defect manufacturing and unshakeable customer trust.')

# Quality Policy
r('who-we-are.html',
  'SANPAR is committed to design, manufacture, and maintain its products to the satisfaction of the customer through continual improvement in the quality management system. We identify customer requirements and ensure their satisfaction at every transaction interface.',
  "Every system we ship must work exactly as specified, on day one and for years after. Our quality management system — certified to ISO 9001:2015 and AS 9100D — ensures that customer requirements are locked in at design stage and validated at every checkpoint: incoming inspection, in-process testing, final acceptance, and post-installation commissioning.")

# CTA
r('who-we-are.html',
  'Ready to Work Together?',
  'Your next system starts with a conversation.')
r('who-we-are.html',
  'Explore our products or get in touch with our engineering team.',
  "Tell us what you need — our engineers will tell you exactly how we'd solve it. No sales pitch. Just engineering.")
r('who-we-are.html',
  '>Explore Products</a>',
  '>Explore Products</a>')
r('who-we-are.html',
  '>Contact Us</a>',
  '>Talk to an Engineer</a>')

print("  Who We Are done.")

# ============================================================
# PRODUCTS (products.html)
# ============================================================
print("=== PRODUCTS ===")

r('products.html',
  '14 Product Lines Across 4 Categories',
  '14 Product Families. 100+ Configurations. One Quality Standard.')

r('products.html',
  '<h1>Products &amp; Solutions</h1>',
  '<h1>Precision Systems for Clean Air, Precise Cooling, and Controlled Environments</h1>')

r('products.html',
  'Precision-engineered systems for compressed air treatment, industrial cooling, climate control, and medical air — designed for industries that demand zero compromise.',
  "Every system we build is designed for one environment: yours. From high-volume refrigerated dryers for steel plants to medical-grade air filtration for hospital operating theatres — our product range covers the full spectrum. All manufactured in-house. All backed by lifetime support.")

# Compressed Air Treatment section
r('products.html',
  'From refrigerated dryers to precision filters — ensuring clean, dry compressed air for critical industrial processes.',
  'Moisture, oil, and particulates cost you money in corrosion, reject rates, and unplanned downtime. Our air treatment systems eliminate all three — from intake to point of use.')

# Xeros
r('products.html',
  'Refrigerated air dryers. 85–10,000 CFM, 3–16 bar g. R407C/R134A refrigerants.',
  "High-capacity refrigerated air dryers engineered for tropical climates. 85 to 10,000 CFM. 3 to 16 bar g. Open and closed-loop. R407C eco-friendly refrigerant. India's widest range from a single manufacturer.")

# Ecodrair
r('products.html',
  'Tube-in-tube dryers. 5–180 CFM, 4–16 bar g. Compact and energy-efficient.',
  'Compact tube-in-tube refrigerated dryers for space-constrained installations. 5 to 180 CFM. Energy-efficient with lowest operating cost in its class. Ideal for workshop, laboratory, and small-plant applications.')

# Adsorption Dryers
r('products.html',
  'Desiccant-based drying. Down to -70°C dew point. Heatless, HOC, and blower reactivated.',
  "When refrigerated drying isn't enough. Dew points down to -70°C — essential for pharmaceutical, food-grade, and critical pneumatic applications. Heatless, heated-with-blower, and HOC configurations.")

# Compressed Air Filters
r('products.html',
  'PPF/PF/AF/FF/AC series. 25μm to 0.01μm filtration. ISO 8573.1 Class 1.',
  'Five-stage filtration from 25μm pre-filtration to 0.01μm final polishing. Achieve ISO 8573.1 Class 1 air quality — the highest international standard. Every filter pressure-tested before dispatch.')

# Aftercooler
r('products.html',
  'Air-cooled and water-cooled variants. Copper tubes, SS316 baffles.',
  'Remove up to 70% of moisture at the compressor outlet — before it enters your system. Air-cooled and water-cooled variants with copper tube construction and SS316 baffles. The first line of defence.')

# Moisture Separator
r('products.html',
  'Centrifugal design. No moving parts, 0.06 bar pressure drop.',
  'Centrifugal moisture separation with no moving parts — zero maintenance and virtually zero pressure drop (0.06 bar). Install it. Forget about it. It keeps working.')

# Drains
r('products.html',
  'Condensate drain valves — float, timer, mechanical, level-sensor. Max 16 bar g.',
  'Condensate drains that protect your system 24/7. Float, timer, mechanical, or electronic level-sensor types. Rated up to 16 bar g. The small component that prevents the biggest headaches.')

# Industrial Cooling section
r('products.html',
  'CFC-free chillers and cooling solutions for precision manufacturing environments.',
  'When your process demands stable temperatures, an inconsistent chiller costs you production quality and profit margin. Our CFC-free cooling systems deliver ±0.5°C stability, shift after shift, year after year.')

# Water Chillers
r('products.html',
  'CFC-free, 0.5–100TR, air/water-cooled, PLC-controlled.',
  'CFC-free process chillers from 0.5TR to 100TR. PLC-controlled with digital temperature display. Air-cooled and water-cooled variants. Designed for 24/7 industrial operation.')

# Air Chillers
r('products.html',
  'Constant temperature water supply. 5–10,000 CFM capacity.',
  'Precision forced-air chillers delivering constant-temperature coolant for process-critical applications. 5 to 10,000 CFM. Ideal for defence ground testing, electronics cooling, and industrial HVAC.')

# Coolant Chillers
r('products.html',
  'CFC-free process cooling for machine tools and manufacturing.',
  'Purpose-built for CNC machining centres, grinding operations, and EDM equipment. Maintains cutting fluid temperature within tight tolerances — extending tool life and reducing reject rates. CFC-free.')

# Precision AC
r('products.html',
  '±1°C temperature, ±2% RH. LAN connectivity. For server rooms and labs.',
  'Climate control for environments where standard HVAC isn\'t precise enough. ±1°C temperature, ±2% RH. Remote monitoring via LAN. For server rooms, metrology labs, CMM rooms, and pharmaceutical storage.')

# Dehumidifier
r('products.html',
  'Industrial dehumidification. ±5% RH accuracy. 24/7 operation.',
  'Industrial dehumidification for spaces where moisture means defects. ±5% RH accuracy in continuous 24/7 operation — protecting stored materials, preventing corrosion, and maintaining quality.')

# CAT M1
r('products.html',
  'Medical desiccant air filter. 0.01μm particle filtration, 0.003mg/m³ oil.',
  'Medical-grade desiccant air filtration meeting the highest international purity standard: ISO 8573.1 Class 1. 0.01μm particles, 0.003mg/m³ oil. For hospitals and pharmaceutical manufacturing.')

# CAT DTH
r('products.html',
  'Medical air dryer. -40°C dew point, 5–1500 CFM. Breathing air quality.',
  'Medical air dryers certified to BS EN12021:2014 breathing air standard. -40°C dew point across 5 to 1,500 CFM. Essential for hospital medical air, hyperbaric chambers, and respiratory therapy.')

print("  Products done.")

# ============================================================
# INDUSTRIES (industries.html)
# ============================================================
print("=== INDUSTRIES ===")

r('industries.html',
  '10 Sectors Served Worldwide',
  'Trusted Across 10 Industry Verticals. Proven in Thousands of Installations.')

r('industries.html',
  '<h1>Industries &amp; Applications</h1>',
  '<h1>Your Industry Has Unique Demands. We Engineer Systems That Meet Them.</h1>')

r('industries.html',
  "From aerospace and defence to pharmaceutical and food processing — SANPAR delivers precision thermal engineering solutions tailored to every industry's unique demands.",
  "No two industries use compressed air the same way. A pharmaceutical cleanroom has different purity requirements than a steel blast furnace. We don't sell generic solutions — we engineer systems that match your specific process conditions, compliance standards, and performance targets.")

# Industry cards
r('industries.html',
  'Liquid cooling systems, airborne chillers, ground testing equipment for avionics and radar.',
  "DGAQA-qualified liquid cooling for airborne avionics. Ground testing equipment for DRDO. AS 9100D-certified manufacturing. The thermal engineering partner India's defence establishment trusts.")

r('industries.html',
  'Cleanroom environment control, lab humidity management, drug storage compliance.',
  'ISO-compliant compressed air for drug manufacturing. Precision climate control for cleanrooms. Humidity management for API storage. When patient safety depends on air quality, there is no margin for error.')

r('industries.html',
  'Contamination-free compressed air for packaging, freeze drying, and sanitation.',
  'Food-contact compressed air free from moisture, oil, and particulates. Protecting product safety, shelf life, and regulatory compliance across packaging, processing, and sanitation.')

r('industries.html',
  'Pneumatic tools, spray painting, precision assembly — customised thermal solutions.',
  "Clean dry air for pneumatic tools, spray booths, and assembly lines. Process chillers for CNC and grinding operations. We serve plants that can't afford unplanned downtime.")

r('industries.html',
  'Compressed air solutions for power generation and distribution facilities.',
  'Compressed air treatment for power plants, substations, and energy infrastructure. Reliable systems designed for harsh environments, extreme temperatures, and continuous operation.')

r('industries.html',
  'Petrochemicals, polymers, specialty chemicals — process air treatment.',
  'Moisture-free compressed air for chemical processing, polymer production, and specialty chemical handling. Protecting product purity, process stability, and equipment integrity.')

r('industries.html',
  'Humidity control for looms, spinning frames, and sewing operations.',
  'Dry compressed air for jet looms, spinning frames, and knitting machines. Humidity control that reduces yarn breakage, eliminates corrosion, and cuts energy waste.')

r('industries.html',
  'Synthetic materials manufacturing — mould cooling and process air.',
  'Process chillers for injection moulding, extrusion, and thermoforming. Compressed air dryers for blow moulding. Consistent temperature control that means fewer rejects.')

r('industries.html',
  'Compressed air for pneumatic conveying, aeration, cooling, and powering tools.',
  "Rugged compressed air systems built for the cement industry's harshest conditions — dust, heat, and continuous operation. Clean dry air for pneumatic conveying and instrumentation.")

r('industries.html',
  'Air dryers and chillers for precision machining and CNC operations.',
  'Coolant chillers and compressed air dryers engineered for CNC machining centres, grinding operations, and EDM equipment. Tighter tolerances, longer tool life, better surface finish.')

# Don't See Your Industry
r('industries.html',
  "Don't See Your Industry?",
  "Your Application Isn't Listed? That's Fine — We've Probably Solved It Before.")
r('industries.html',
  'We engineer custom thermal solutions for specialised applications. Tell us about your requirements and our team will design the right system.',
  "SANPAR has designed custom thermal solutions for astrophysics observatories, submarine component testing, and pharmaceutical cold chains — applications that don't fit neat categories. Tell us your process conditions, and our engineers will design a system that does.")
r('industries.html',
  '>Contact Our Engineers</a>',
  '>Request a Technical Consultation</a>')

print("  Industries done.")

# ============================================================
# INDUSTRY DETAIL PAGES (10 pages)
# ============================================================
print("=== INDUSTRY DETAIL PAGES ===")

# Aerospace & Defence
r('industry-aerospace-defence.html',
  '<h2>Aerospace and Defence</h2>',
  '<h2>Thermal Engineering for Missions That Cannot Fail</h2>')

r('industry-aerospace-defence.html',
  '<h2>Advanced Liquid cooling system</h2>',
  '<h2>Advanced Liquid Cooling Systems</h2>')

r('industry-aerospace-defence.html',
  'Our advanced liquid cooling systems are designed with efficiency in mind.SANPAR systems are designed to be compact to handle the demands of modern avionics system.Our product portfolio includes a variety of products like Liquid Cooling System(LCS), Forced air chillers, Cold plates, Ground filling unit, Coolant Circulation module(CCM) and All in one (AIO) simulator and many more.Over the past decade, the evolution of advanced liquid cooling system technology has been significant to regulate temperature and ensure the reliability of critical components. SANPAR emerging engineers are allowed to simulate the flow of liquids and gases through complex systems, which helps them to optimize the design of cooling systems for maximum efficiency.',
  "Modern avionics systems generate intense heat in confined spaces — and the cooling solution must be as compact, reliable, and lightweight as the systems it protects. SANPAR's advanced liquid cooling systems are purpose-built for this environment. Our portfolio includes Liquid Cooling Systems (LCS), Forced air chillers, Cold plates, Ground filling units, Coolant Circulation Modules (CCM), and All-in-One (AIO) simulators.")

r('industry-aerospace-defence.html',
  'We strive to be at the forefront of innovation in the avionics & defence industry by continually improving and refining our advanced cooling systems to ensure that they are the most efficient, reliable, and cost-effective solutions.',
  "Every system is designed using computational fluid dynamics (CFD) simulation, prototyped in-house, and validated to DGAQA and CEMILAC standards before delivery. We don't just build cooling systems — we build cooling systems that are qualified to fly.")

r('industry-aerospace-defence.html',
  'An advanced liquid cooling system is a technology that uses a liquid to transfer heat away from a component or system, and is designed to provide superior cooling performance compared to traditional air-cooling methods. It typically involves the circulation of a coolant liquid through a system of channels or pipes, which absorb heat from the components being cooled, and then transport the heat to a radiator or other heat exchanger, where it is dissipated into the environment.',
  '')

r('industry-aerospace-defence.html',
  'A coolant circulation module (CCM) is a component of a liquid cooling system that is responsible for circulating coolant fluid throughout the system to regulate temperature and ensure efficient cooling. The CCM typically consists of a pump, a reservoir, and a set of valves and sensors that control the flow and temperature of the coolant.',
  'The heartbeat of any liquid cooling system. Our CCMs integrate precision pumps, temperature-controlled reservoirs, and intelligent valve systems to maintain exact coolant flow rates and temperatures across the entire thermal circuit. Built to withstand vibration, altitude changes, and temperature extremes.')

r('industry-aerospace-defence.html',
  'The pump is responsible for moving the coolant fluid through the system, while the reservoir stores excess coolant and helps maintain the correct fluid level. The valves and sensors are used to control the flow and temperature of the coolant. Coolant circulation modules are a critical component of liquid cooling systems.',
  '')

# Machine Tools
r('industry-machine-tools.html',
  '<h2>Machine Tools Industry</h2>',
  '<h2>When Precision Machining Demands Precision Cooling</h2>')

# Pharmaceutical
r('industry-pharmaceutical.html',
  '<h2>Pharmaceutical Industry</h2>',
  '<h2>Where Air Quality Is Patient Safety</h2>')

# Cement
r('industry-cement.html',
  '<h2>Cement Industry</h2>',
  '<h2>Compressed Air Systems Built for the Toughest Environment in Industry</h2>')

# Textile
r('industry-textile.html',
  '<h2>Textile Industry</h2>',
  '<h2>Protecting Yarn Quality and Loom Performance with Precision Air Treatment</h2>')

# Food & Beverage
r('industry-food-beverage.html',
  '<h2>Food &amp; Beverage Industry</h2>',
  '<h2>When Compressed Air Touches Food, Purity Isn\'t Optional</h2>')

# Plastics
r('industry-plastics.html',
  '<h2>Plastics Industry</h2>',
  '<h2>Faster Cycles. Fewer Rejects. Lower Energy Costs.</h2>')

# Manufacturing
r('industry-manufacturing.html',
  '<h2>Manufacturing Industry</h2>',
  '<h2>The Air Treatment Systems That Keep Production Lines Running</h2>')

# Energy & Power
r('industry-energy-power.html',
  '<h2>Energy &amp; Power Industry</h2>',
  '<h2>Reliable Air Treatment for Critical Energy Infrastructure</h2>')

# Chemical
r('industry-chemical.html',
  '<h2>Chemical Industry</h2>',
  '<h2>Protecting Process Purity in Corrosive and Volatile Environments</h2>')

# Common CTA across all industry pages
for page in ['industry-aerospace-defence.html', 'industry-machine-tools.html', 'industry-pharmaceutical.html',
             'industry-cement.html', 'industry-textile.html', 'industry-food-beverage.html',
             'industry-plastics.html', 'industry-manufacturing.html', 'industry-energy-power.html',
             'industry-chemical.html']:
    r(page, 'Need Solutions for Your Industry?', "Let's Engineer Your Solution")
    r(page,
      'Our engineering team designs custom thermal solutions for your specific application requirements.',
      "Tell us about your process — flow rates, pressures, ambient conditions, compliance requirements — and we'll design a system that fits. No obligation. No generic catalogue response. Just engineering.")

print("  Industry detail pages done.")

# ============================================================
# SUCCESS STORIES (success-stories.html)
# ============================================================
print("=== SUCCESS STORIES ===")

r('success-stories.html',
  '8 Proven Results',
  '8 Documented Case Studies. Measurable ROI. Real Customer Names.')

r('success-stories.html',
  '<h1>Success Stories</h1>',
  '<h1>The Numbers Speak. So Do Our Customers.</h1>')

r('success-stories.html',
  'SANPAR takes immense pride in providing solutions that deliver measurable results. Understanding, documenting and tailoring the right solution addressing key challenges keeps our team driven.',
  "Every case study on this page includes the customer's name, the problem they faced, the SANPAR solution we engineered, and the measured outcome. We don't publish anonymous testimonials or vague claims — because when you can name your customers and quantify your results, you don't need to.")

# Individual cards on success-stories.html
r('success-stories.html',
  'Avoided usage of 6 compressors, saving at least Rs.8.7 lakhs per month',
  '6 compressors eliminated. ₹8.7 lakhs saved every month. Over ₹1 crore in annual savings.')

r('success-stories.html',
  'Constant climate maintained for vacuum potting process (23+/-2 deg C, 40+/-5% RH)',
  'Vacuum potting environment stabilised at 23±2°C and 40±5% RH — eliminating pustule defects and achieving 100% yield.')

r('success-stories.html',
  'Glass moulds free from blowholes. Largest refrigerated dryer by an Indian manufacturer.',
  "Blowholes eliminated entirely. SANPAR's XEROS dryer cut pressure drop in half (0.2 to 0.1 bar) — India's largest refrigerated dryer from a domestic manufacturer.")

r('success-stories.html',
  'Reduced time consumption on drying laundry material at residential campus.',
  'Laundry drying time at Infosys Mysore campus reduced significantly — a compact 11.50 CFM / 7 bar g system solving a quality-of-life problem for thousands.')

r('success-stories.html',
  'CMM machine functions accurately. Repeat order placed for Dharwad plant.',
  'CMM measurement accuracy restored to specification — JMT Auto ordered a second system for Dharwad within months.')

r('success-stories.html',
  'Reduced power consumption for cooling air considerably.',
  'Power consumption for turbine blade testing air supply reduced dramatically — replacing a desiccant dryer with 25% purge losses.')

r('success-stories.html',
  'Accurate measurement of filter paper for particulate emissions testing per ARAI standards.',
  'Emissions testing accuracy achieved for ARAI-standard particulate measurement at exactly 22±1°C and 45±2% RH.')

r('success-stories.html',
  'Dry air protects blast furnace, maintains production volumes and quality.',
  '6 large-capacity dryers deployed — protecting blast furnace operations with R407C eco-friendly refrigerant.')

print("  Success stories done.")

# ============================================================
# SUCCESS STORY DETAIL PAGES (8 pages)
# ============================================================
print("=== SUCCESS STORY DETAIL PAGES ===")

# Hindustan Motors
r('story-hindustan-motors.html',
  'Avoided usage of 6 compressors, saving at least Rs.8.7 lakhs per month',
  '6 compressors eliminated. ₹8.7 lakhs saved every month. Over ₹1 crore in annual savings — with zero production disruption during the changeover.')

# Hical Technologies
r('story-hical-technologies.html',
  'Constant climate maintained for vacuum potting process (23+/-2 deg C, 40+/-5% RH)',
  'Vacuum potting environment stabilised at 23±2°C and 40±5% RH — eliminating pustule defects on inductors and achieving 100% yield on a previously inconsistent process.')

# Excel Glass
r('story-excel-glass.html',
  'Glass moulds free from blowholes. Largest refrigerated dryer by an Indian manufacturer.',
  "Blowholes in glass moulds eliminated entirely. SANPAR's XEROS dryer replaced a failing shell-and-tube system — cutting pressure drop in half (0.2 bar to 0.1 bar) while delivering India's largest refrigerated dryer from a domestic manufacturer.")

# Infosys
r('story-infosys-technologies-ltd.html',
  'Reduced time consumption on drying laundry material at residential campus.',
  'Laundry drying time at Infosys Mysore campus reduced significantly — a compact 11.50 CFM / 7 bar g system that solved a quality-of-life problem for thousands of resident employees.')

# JMT Auto
r('story-jmt-auto-ltd.html',
  'CMM machine functions accurately. Repeat order placed for Dharwad plant.',
  'CMM measurement accuracy restored to specification — and JMT Auto was so impressed, they ordered a second system for their Dharwad plant within months.')

# Gas Turbine
r('story-gas-turbine-research-establishment.html',
  'Reduced power consumption for cooling air considerably.',
  "Power consumption for turbine blade testing air supply reduced dramatically — by replacing a desiccant dryer (25% purge loss) with a custom SANPAR refrigerated system on a mobile trolley. Now used for India's most advanced gas turbine development programme.")

# Ashok Leyland
r('story-ashok-leyland-ltd.html',
  'Accurate measurement of filter paper for particulate emissions testing per ARAI standards.',
  'Emissions testing accuracy achieved for ARAI-standard particulate measurement — a SANPAR Climatic Controller maintains the weighing room at exactly 22±1°C and 45±2% RH, enabling precise filter paper measurements.')

# Jindal Steel
r('story-jindal-steel-power-limited-raigarh.html',
  'Dry air protects blast furnace, maintains production volumes and quality.',
  '6 large-capacity dryers deployed across Raigarh facility — protecting blast furnace operations from moisture-related damage and maintaining full production volumes with R407C eco-friendly refrigerant.')

# Common CTA across all story pages
for page in ['story-hindustan-motors.html', 'story-hical-technologies.html', 'story-excel-glass.html',
             'story-infosys-technologies-ltd.html', 'story-jmt-auto-ltd.html',
             'story-gas-turbine-research-establishment.html', 'story-ashok-leyland-ltd.html',
             'story-jindal-steel-power-limited-raigarh.html']:
    r(page, 'Have a Similar Challenge?', 'Facing a Similar Challenge in Your Plant?')
    r(page,
      'Our engineering team can design a solution tailored to your specific requirements.',
      "Send us your process conditions — compressed air flow, pressure, ambient temperature, current equipment — and our engineering team will design a solution specific to your application. No obligation. Just engineering.")

print("  Story detail pages done.")

# ============================================================
# SUPPORT (support.html)
# ============================================================
print("=== SUPPORT ===")

r('support.html',
  'Lifetime Support Beyond Warranty',
  "Your System's Performance Is Our Ongoing Responsibility")

r('support.html',
  '<h1>Support &amp; Services</h1>',
  '<h1>We Build It. We Install It. We Stand Behind It. For Life.</h1>')

r('support.html',
  'From installation and commissioning through to preventive maintenance and emergency response — we stand behind every system we build.',
  "Every SANPAR system ships with a 1-year warranty on products and spares. But our commitment doesn't expire with the warranty. We offer lifetime support — preventive maintenance programmes, genuine spare parts, emergency response, and remote technical assistance — because the system we installed five years ago is still our system.")

r('support.html',
  "We Don't Just Deliver — We Maintain",
  'Half the Job Is Building the System. The Other Half Is Keeping It Running.')

r('support.html',
  'Providing cutting-edge solutions covers only half of our implementation cycle. We take pride in the other critical aspect of customer experience: the maintenance and regular monitoring of our installed products.',
  'Most equipment manufacturers consider their job done at delivery. We consider ours ongoing.')

r('support.html',
  'Beyond the one-year warranty on our products and spares, we offer a lifetime support maintenance programme — ensuring timely replacement of elements and spares for maximum equipment availability at minimal operating costs.',
  'Our goal is simple: maximum equipment availability at the lowest total cost of ownership. Your compressor runs 8,760 hours a year. Your air treatment system should too.')

print("  Support done.")

# ============================================================
# CONTACT (contact.html)
# ============================================================
print("=== CONTACT ===")

r('contact.html',
  'Get in Touch</span>',
  "Let's Start with Your Requirements</span>")

r('contact.html',
  '<h1>Contact Us</h1>',
  '<h1>Talk to the Engineers Who Build Your Systems</h1>')

r('contact.html',
  'Our engineering team is ready to help you find the right solution. Reach out via the form below or contact your nearest regional office.',
  "Whether you need a budget quote for a new air dryer, technical support for an existing installation, or a custom engineering proposal for a complex application — you'll speak directly with our technical team. No call centres. No chatbots. Engineers who understand your industry.")

r('contact.html',
  'We value your business and our customer service personnel are on-call to assist you with your requirements.',
  'Every enquiry is reviewed by a qualified engineer within 24 hours. For urgent production-critical requests, call our Bengaluru headquarters directly.')

r('contact.html',
  'Customer Support Enquiry',
  'Submit Your Requirement')

r('contact.html',
  'Fill in the form and our team will respond within 24 hours.',
  "Tell us about your application. Our engineering team will respond with a technical recommendation within 24 hours — not a generic brochure, but a specific solution matched to your process conditions.")

r('contact.html',
  'Regional Support Contacts',
  'Nationwide Service Network — 8 Regional Offices Across India')

print("  Contact done.")

# ============================================================
# WORK WITH US (work-with-us.html)
# ============================================================
print("=== WORK WITH US ===")

r('work-with-us.html',
  'Careers at SANPAR',
  "Build Systems That Power India's Most Critical Industries")

r('work-with-us.html',
  '<h1>Work With Us</h1>',
  '<h1>Your Engineering Career Starts Here — and Goes Global</h1>')

r('work-with-us.html',
  'Our culture is built on inclusion, collaboration, high performance and opportunity that makes SANPAR one of the most rewarding places to work.',
  "SANPAR engineers design cooling systems for fighter aircraft, build air treatment plants for pharmaceutical companies, and solve thermal problems that haven't been solved before. If you want a career where your work matters — this is where you belong.")

r('work-with-us.html',
  'Empowering Growth, Inspiring Innovation',
  'We Hire Engineers Who Want to Build Things That Matter')

r('work-with-us.html',
  'Meet some of our employees and discover what they do.',
  'The People Behind the Systems — Meet the engineers and professionals who design, build, and support SANPAR\'s product range.')

r('work-with-us.html',
  'We commit to creating a responsible, supportive environment where every employee acts professionally, collaborates effectively, and prioritises well-being and integrity.',
  "Six principles guide how we work — with each other, with our customers, and with our suppliers. They're not posters on a wall. They're the standards we hire for, review against, and promote on.")

r('work-with-us.html',
  'When you join SANPAR, you give your career a great start working on real projects. We offer exceptional internships, rotational programmes and early career opportunities.',
  "SANPAR interns don't fetch coffee. They design fixtures, analyse thermal data, shadow commissioning engineers at customer sites, and contribute to real product development. If you're studying mechanical, electrical, or thermal engineering — this is your chance to work on systems that actually ship.")

r('work-with-us.html',
  'Apprentices are our future, so we invest in them. Students receive hands-on training where they make a real contribution to our emerging technologies.',
  "Our apprenticeship programme places students alongside senior engineers in our manufacturing facility. You'll learn production processes, quality inspection, assembly techniques, and testing protocols — skills that engineering colleges don't teach but industry demands.")

r('work-with-us.html',
  'How We Care for You',
  'What You Get — Beyond the Work')

print("  Work With Us done.")

# ============================================================
# TECHNOLOGY (technology.html)
# ============================================================
print("=== TECHNOLOGY ===")

r('technology.html',
  'R&D and White Papers',
  'Engineering Knowledge. Freely Shared.')

r('technology.html',
  '<h1>Technology</h1>',
  '<h1>Technical Resources for Engineers and Procurement Teams</h1>')

r('technology.html',
  "Explore SANPAR's technical resources, white papers and R&D documentation.",
  "Download technical white papers, understand how our products work, and make informed procurement decisions. We believe that the better you understand compressed air treatment technology, the more confident you'll be in choosing SANPAR.")

r('technology.html',
  'Download our technical white paper on refrigeration air dryer technology, design principles, and application considerations.',
  "A 12-page technical guide written by SANPAR's R&D team for plant engineers and procurement professionals.")

r('technology.html',
  'Comprehensive guide covering open/closed loop design, refrigerant selection, tropical climate considerations, and energy efficiency.',
  'Covers the engineering principles behind open-loop and closed-loop refrigerated dryer design, how to select the right refrigerant for your climate, and how to minimise energy consumption without compromising dew point performance.')

r('technology.html',
  'Understanding the principles of refrigeration-based compressed air drying: heat exchange cycles, dew point control, and refrigerant selection for tropical climates.',
  'A visual, engineer-friendly explainer covering the thermodynamic cycle inside every SANPAR dryer: heat exchange stages, dew point control mechanisms, and why refrigerant selection matters more in tropical climates than anywhere else.')

r('technology.html',
  'A technical guide to selecting the right air dryer for your application. Covers refrigerated, desiccant, and membrane dryer technologies with comparison tables and sizing methodology.',
  'Refrigerated vs. desiccant vs. membrane: each technology has a sweet spot. This guide helps plant engineers and procurement teams choose the right dryer type based on required dew point, flow rate, operating pressure, ambient conditions, and total cost of ownership.')

print("  Technology done.")

# ============================================================
# NEWS (news.html)
# ============================================================
print("=== NEWS ===")

r('news.html',
  'SANPAR Industries Latest Updates</span>',
  'Engineering News and Milestones</span>')

r('news.html',
  'Here you will find latest posts and news from SANPAR Industries.',
  "Product launches, project milestones, and industry recognition — stay informed about what's happening at SANPAR.")

r('news.html',
  'Our R&D team are currently working towards our new range of products.',
  'Our R&D division is actively developing the next generation of compressed air treatment and cooling systems — expanding capacity range, improving energy efficiency, and introducing smart monitoring capabilities.')

r('news.html',
  'SANPAR is proud to convey its success in developing a Climatic Chamber for the Indian Institute of Astrophysics.',
  "SANPAR designed and delivered a precision Climatic Chamber for the Indian Institute of Astrophysics — a custom solution maintaining exact temperature and humidity conditions for optical lens storage. When India's premier astrophysics institution needed climate control they could trust, they chose SANPAR.")

r('news.html',
  'SANPAR completes glorious 21 years today, 7th February.',
  'On February 7th, SANPAR marked 21 years of continuous operation — from a single product to 14 product families serving 10 industries. The journey continues.')

r('news.html',
  'SANPAR at HANNOVER MESSE 2015 and more than 3000 exhibitors from around the world.',
  "SANPAR exhibited at HANNOVER MESSE 2015 in Germany — the world's largest industrial technology trade fair — alongside 3,000+ exhibitors from 70 countries. A milestone that placed SANPAR on the global industrial stage.")

print("  News done.")

# ============================================================
# BLOGS (blogs.html)
# ============================================================
print("=== BLOGS ===")

r('blogs.html',
  'Here you will find latest blog posts from SANPAR Industries.',
  'Technical insights, application guides, and engineering perspectives from the SANPAR team.')

r('blogs.html',
  'ECODRAIR Series compressed air dryers by SANPAR feature energy-efficient refrigerant technology and compact design for industrial compressed air treatment.',
  'Why the ECODRAIR Series Is the Most Energy-Efficient Compact Dryer in Its Class — A deep dive into the tube-in-tube heat exchanger design, refrigerant circuit optimisation, and the engineering choices that make ECODRAIR the preferred dryer for small to medium compressed air installations.')

print("  Blogs done.")

# ============================================================
# EVENTS (events.html)
# ============================================================
print("=== EVENTS ===")

r('events.html',
  'Here you will find latest events from SANPAR Industries.',
  'Trade shows, exhibitions, and industry events where you can meet the SANPAR team in person.')

r('events.html',
  'No upcoming events at this time. Check back soon for updates.',
  'No scheduled events at this time. Subscribe to our newsletter or follow us on LinkedIn to be notified when SANPAR exhibits at upcoming trade shows and industry conferences.')

print("  Events done.")

# ============================================================
# SHOP (shop.html)
# ============================================================
print("=== SHOP ===")

r('shop.html',
  '<h1>Shop</h1>',
  '<h1>Customer Portal</h1>')

r('shop.html',
  'Login to your SANPAR account to manage orders and access resources.',
  'Access your account to manage orders, download technical documentation, request spare parts, and track service history. Existing customers only — contact your regional sales representative for account setup.')

print("  Shop done.")

# ============================================================
# REGISTER (register.html)
# ============================================================
print("=== REGISTER ===")

r('register.html',
  '<h1>Register</h1>',
  '<h1>Create Your SANPAR Account</h1>')

r('register.html',
  'Create your SANPAR account to access resources, request quotes, and manage your orders.',
  "Join SANPAR's customer network. Create an account to request quotations, access technical datasheets, track your orders, and manage service requests — all in one place. Registration takes 30 seconds.")

print("  Register done.")

# ============================================================
# JOB OPENINGS (job-openings.html)
# ============================================================
print("=== JOB OPENINGS ===")

r('job-openings.html',
  'Current Openings',
  "Join the Team That Engineers India's Most Critical Systems")

r('job-openings.html',
  'Join our team of skilled engineers and professionals.',
  "We're growing — and we're looking for engineers and sales professionals who want to work on systems that protect fighter aircraft, power steel plants, and safeguard pharmaceutical production.")

r('job-openings.html',
  'Join SANPAR as a Sales Engineer and help deliver precision thermal engineering solutions to customers across India.',
  "We're looking for Sales Engineers across 8 cities who can translate complex thermal engineering into clear customer value. You'll work with plant engineers, procurement teams, and OEMs — presenting solutions that solve real production problems.")

print("  Job Openings done.")

# ============================================================
# PRIVACY POLICY (privacy-policy.html)
# ============================================================
print("=== PRIVACY POLICY ===")

r('privacy-policy.html',
  'SANPAR ("we," "us," or "our") is committed to protecting the privacy and personal data of all users',
  "Your privacy matters to us. This Privacy Policy explains what information SANPAR Industries Pvt. Ltd. collects when you visit our website or interact with our team, how we use it, and how we protect it. We've written this in plain language — but the legal commitments are binding. SANPAR is committed to protecting the privacy and personal data of all users")

print("  Privacy Policy done.")

# ============================================================
# TERMS AND CONDITIONS (terms-and-conditions.html)
# ============================================================
print("=== TERMS AND CONDITIONS ===")

r('terms-and-conditions.html',
  'By accessing and using the SANPAR website ("Website"), you agree to comply with and be bound by these Terms and Conditions.',
  "By using the SANPAR website, you agree to these Terms and Conditions. Please read them carefully — they govern your use of our website, including accessing product information, submitting enquiries, and downloading technical resources.")

print("  Terms and Conditions done.")

# ============================================================
# GLOBAL FOOTER (all pages)
# ============================================================
print("=== GLOBAL FOOTER ===")

count = apply_to_all(
  'Precision-engineered solutions in compressed air treatment and industrial cooling. Trusted by industry leaders across aerospace, defence, pharmaceutical, and manufacturing since 1994.',
  "India's leading manufacturer of compressed air dryers, industrial chillers, and aerospace cooling systems. ISO 9001:2015 and AS 9100D certified. Trusted by 3,000+ customers across 10 industries since 1994.")
print(f"  Footer description updated in {count} files.")

count = apply_to_all(
  '&copy; 2025 SANPAR Industries Pvt. Ltd. All rights reserved.',
  '&copy; 2025 SANPAR Industries Pvt. Ltd. All rights reserved. | ISO 9001:2015 | AS 9100D')
print(f"  Footer copyright updated in {count} files.")

# ============================================================
# COMMON CTAs (all pages)
# ============================================================
print("=== COMMON CTAs ===")

count = apply_to_all('>View details <span class="arrow">→</span></a>', '>Explore this product <span class="arrow">→</span></a>')
print(f"  'View details' -> 'Explore this product' in {count} files.")

count = apply_to_all('>Learn more <span class="arrow">→</span></a>', '>See how we help <span class="arrow">→</span></a>')
print(f"  'Learn more' -> 'See how we help' in {count} files.")

count = apply_to_all('>Read case study <span class="arrow">→</span></a>', '>See the full results <span class="arrow">→</span></a>')
print(f"  'Read case study' -> 'See the full results' in {count} files.")

count = apply_to_all('>Read full case study <span class="arrow">→</span></a>', '>Read the complete case study <span class="arrow">→</span></a>')
print(f"  'Read full case study' -> 'Read the complete case study' in {count} files.")

count = apply_to_all('>Send Enquiry</a>', '>Submit Your Requirement</a>')
print(f"  'Send Enquiry' -> 'Submit Your Requirement' in {count} files.")

count = apply_to_all('>View All 14 Products <', '>See the Complete Product Range <')
print(f"  'View All 14 Products' -> 'See the Complete Product Range' in {count} files.")

count = apply_to_all('>View All 10 Industries <', '>Explore All Industries <')
print(f"  'View All 10 Industries' -> 'Explore All Industries' in {count} files.")

count = apply_to_all('>View All Success Stories <', '>See All 8 Case Studies <')
print(f"  'View All Success Stories' -> 'See All 8 Case Studies' in {count} files.")

count = apply_to_all('>View Job Openings</a>', '>See Current Openings</a>')
print(f"  'View Job Openings' -> 'See Current Openings' in {count} files.")

count = apply_to_all('>Request Download</a>', '>Download White Paper</a>')
print(f"  'Request Download' -> 'Download White Paper' in {count} files.")

count = apply_to_all('>Apply Now</a>', '>Apply for This Role</a>')
print(f"  'Apply Now' -> 'Apply for This Role' in {count} files.")

print("\n=== ALL REPLACEMENTS COMPLETE ===")
