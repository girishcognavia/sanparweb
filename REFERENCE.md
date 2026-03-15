# SANPAR Website Clone - Reference Document

## Company Overview
- **Name**: SANPAR Industries Pvt. Ltd
- **Tagline**: "Excellence Since 1994"
- **Business**: Compressed air treatment solutions for industries
- **Location**: Bengaluru 560 099, Karnataka, India
- **Phone**: +91 7349142424 | **Fax**: +91 80 4343 5959
- **Email**: enquiry@sanpar.com
- **Website**: https://sanpar.com

## What's Included in This Clone

| Asset Type | Count | Location |
|---|---|---|
| Full-page screenshots | 40 | `screenshots/` |
| Downloaded images | 144 | `images/` |
| Raw HTML pages | 46 | `raw-html/` |
| Structured JSON data | 49 | `data/` |

---

## Design System

### Colors
| Name | Hex | Usage |
|---|---|---|
| Primary | `#060097` | Deep blue - headers, buttons, primary elements |
| Secondary | `#c10fff` | Purple - accents, gradients |
| Accent | `#ffcd57` | Golden - highlights, footer border |
| Text Primary | `#1e293b` | Dark slate - body text |
| Background | `#f9f6fe` | Light purple - section backgrounds |
| White | `#FFFFFF` | Main background |
| Border | `#F2F5F7` | Subtle borders |

### Typography
| Element | Font | Size | Weight |
|---|---|---|---|
| Headings | Plus Jakarta Sans | 64px/48px/24px | 600 |
| Body | Inter | 16px | 400 |
| Small | Inter | 14px | 400 |

### UI Components
- **Buttons**: Border-radius 50px (pill-shaped), padding 12px 32px
- **Inputs**: Height 40px, border-radius 4px, focus color #046BD2
- **Container**: Max-width 1200px
- **Breakpoints**: Mobile 544px, Tablet 921px

---

## Site Navigation Structure

### Main Menu
1. **Home** → `/`
2. **About Us** → `/who-we-are/`
   - Who We Are
   - Technology
   - Success Stories
   - Work With Us
3. **Products** → `/products-solutions/`
   - Compressed Air Treatment (7 products)
   - Industrial Cooling System (3 products)
   - Industrial Air Conditioning (2 products)
   - Medical Desiccant Air Dryer (2 products)
4. **Industries** → `/industries-applications/` (10 industries)
5. **Support & Services** → `/support-service/`
6. **Contact** → `/contact-us/`

---

## Products (14 Total)

### Compressed Air Treatment
| Product | Key Feature | Image |
|---|---|---|
| Xeros Series | Refrigerant air dryer, open/closed loop | `images/products/Xeros-Internal-2-1024x720.png` |
| Ecodrair Series | Tube-in-tube design, 5-180 cfm, 4-16 bar g | `images/products/CAT_D1-5A-cutout.webp` |
| Adsorption Dryers | Reversible adsorption drying process | `images/misc/Voltas-Limited-*.webp` |
| Compressed Air Filters | Microfilters for solid/liquid/aerosol/mist/gas | `images/products/Elements_PFFFCF_1-*.webp` |
| Aftercooler | Cools hot compressed air from compressors | `images/products/SAC_WC_1-768x540.webp` |
| Centrifugal Moisture Separator | No moving parts, constant pressure drop | `images/products/MS_1-*.webp` |
| Drains | Condensate drain valves for system protection | `images/products/SFD320_1-*.webp` |

### Industrial Cooling System
| Product | Key Feature | Image |
|---|---|---|
| Water Chillers | CFC-free, from 0.5TR capacity | `images/products/Water-chiller.webp` |
| Air Chillers | Constant temperature supply, closed circuit | `images/products/Product-2-768x540.webp` |
| Coolant Chillers | CFC-free process cooling | `images/products/Coolant-*.webp` |

### Industrial Air Conditioning
| Product | Key Feature | Image |
|---|---|---|
| Dehumidifier | For sensitive electronics, compact spaces | `images/products/SMPL_IAC_DH-*.webp` |
| Precision Air Conditioner | Fine balance temp & humidity | `images/products/SMPL_IAC_PAC.webp` |

### Medical Desiccant Air Dryer
| Product | Key Feature | Image |
|---|---|---|
| CAT M1 Series | ISO 8573.1 Class 1, 0.01μm, 0.003mg/m³ oil | `images/products/FilterSFD_1-*.webp` |
| CAT DTH Series | BS EN12021:2014 breathing air quality | `images/products/medical-dryer.webp` |

---

## Industries Served (10)

1. **Aerospace & Defence** - Advanced liquid cooling for avionics
2. **Machine Tools** - Air dryers & chillers for precision machining
3. **Pharmaceutical** - Environmental control for drug safety
4. **Cement** - Compressed air for pneumatic conveying, aeration, cooling
5. **Textile** - Dry air for looms, spinning frames, sewing machines
6. **Food & Beverage** - $7 trillion global market, contamination-free air
7. **Plastics** - Synthetic materials manufacturing support
8. **Manufacturing** - Customized thermal solutions for automation
9. **Energy & Power** - Growing demand sector solutions
10. **Chemical** - Petrochemicals, polymers, specialty chemicals

---

## Success Stories (8 Clients)

| Client | Industry | Key Result |
|---|---|---|
| Hindustan Motors, Calcutta | Automobile | Saved 6 compressors, ₹8.7L/month savings |
| Hical Technologies | Electronics | - |
| Excel Glass | Glass Manufacturing | - |
| Infosys Technologies, Mysore | Software Services | Reduced laundry drying time |
| JMT Auto Ltd | Automotive | - |
| Gas Turbine Research Est. | Defence Research | - |
| Ashok Leyland Ltd | Automobile | - |
| Jindal Steel Power, Raigarh | Steel | - |

---

## Key Page Content Highlights

### Homepage
- Hero: "Years of Engineering Excellence" with animated counters
- Stats: 30+ years, 200+ employees, 14+ products, 3000+ customers
- About section: "Excellence Since 1994"
- Product showcase carousel
- Client logos section (44+ logos)
- CTA: "More About Us" button

### Who We Are
- Headline: "We are Solutionizers"
- Timeline/milestones with animated icons
- Team photo and management info
- Statistics counters

### Support & Service
- "Aftercare Excellence" headline
- Ongoing maintenance and monitoring commitment
- Post-implementation support emphasis

### Work With Us
- Culture: "Inclusion, Collaboration, High Performance"
- "Empowering Growth, Inspiring Innovation"
- Career benefits, conduct guide sections

---

## File Structure

```
sanpar-clone/
├── REFERENCE.md              ← You are here
├── scraper.py                ← Main scraping script
├── screenshot.py             ← Screenshot capture script
├── all-content.json          ← Complete data dump (all pages)
├── data/
│   ├── site-config.json      ← Design system, colors, fonts, contact
│   ├── navigation.json       ← Full site navigation/sitemap
│   ├── homepage.json         ← Homepage content
│   ├── who-we-are.json       ← About page
│   ├── contact-us.json       ← Contact page
│   ├── support-service.json
│   ├── technology.json
│   ├── work-with-us.json
│   ├── news.json
│   ├── blogs.json
│   ├── events.json
│   ├── products/             ← 14 product JSON files + _index.json
│   ├── industries/           ← 10 industry JSON files + _index.json
│   └── success-stories/      ← 8 story JSON files + _index.json
├── images/
│   ├── logo/                 ← 46 client/company logos
│   ├── products/             ← 34 product images
│   ├── industries/           ← 5 industry images
│   ├── success-stories/      ← 8 success story images
│   └── misc/                 ← 51 other images (GIFs, banners, etc.)
├── screenshots/              ← 40 full-page PNG screenshots
└── raw-html/                 ← 46 raw HTML files
```

---

## How to Use This Data

1. **For Design Reference**: Open `screenshots/` folder to see visual layout of each page
2. **For Content**: Use `data/*.json` files for structured text content
3. **For Images**: All images in `images/` folder, organized by category
4. **For Exact HTML**: Check `raw-html/` for original markup
5. **For Design System**: See `data/site-config.json` for colors, fonts, spacing
6. **For Navigation**: See `data/navigation.json` for complete site structure
7. **For Full Data Dump**: `all-content.json` contains everything from all 46 pages
