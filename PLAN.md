# SANPAR Website Transformation Plan

**Prepared by:** Senior Web Designer & Front-End Architect
**Date:** 2026-03-19
**Reference Standard:** ABB Group (abb.com)
**Target:** SANPAR Industries Pvt. Ltd (sanpar.com)

---

# Phase 1 — Research & Audit

"As the senior designer, I am now entering Phase 1."

---

## Step 1.1 — Reference Website Observation (ABB)

### Above the Fold — Homepage (Desktop 1440px)

- **Headline:** Dynamic hero promo (AEM `pageheaderpromo` component) — currently featuring "ABB Annual General Meeting 2026" and the persistent tagline "Helping industries outrun — leaner and cleaner"
- **Typographic treatment:** ABBvoiceDisplay font, semi-bold 600 weight, UPPERCASE display text, generous leading
- **Subheadline:** "Global technology leader in electrification and automation. ABB helps industries run at high performance, while becoming more efficient, productive and sustainable."
- **Primary CTA:** Client-side rendered within hero promo — positioned centre-left, solid red (#EE0000) button with white text, rounded corners
- **Background treatment:** Full-bleed hero image/video via interactive media component; dark overlay gradient for text readability
- **Navigation:** Sticky global header — ABB logo (left), 7 primary items (Products & Solutions, Industries, Services, About us, Where to buy, Contact us, Careers), utility icons (Search, Cart, Globe/Language selector, MyABB portal lock icon)
- **Trust signals before scroll:** Tagline establishes "global technology leader" within the first second; logo mark carries institutional weight
- **Emotional tone:** Authoritative, Purposeful, Restrained

### Above the Fold — Homepage (Mobile 375px)

- **Navigation collapses** to hamburger menu + logo + search icon
- **Hero scales** to single-column; headline stacks vertically with reduced type size (32px display)
- **CTA remains prominent** in thumb-zone
- **Trust language identical** — tagline visible immediately

### Above the Fold — About Page (Desktop 1440px)

- **Headline:** "About ABB" — portfolio/family-style header with corporate HQ photography (Zurich)
- **Subheadline:** "Engineered to Outrun" followed by purpose statement
- **Trust signals:** "around 110,000 employees worldwide and a history that stretches back more than 140 years" — appears within first scroll section
- **Secondary navigation:** Sub-section nav for About area
- **Emotional tone:** Established, Global, Purposeful

### Above the Fold — About Page (Mobile 375px)

- **Navigation collapses** to hamburger menu + logo; same pattern as homepage mobile
- **Hero scales** to single-column with "About ABB" headline in reduced display size (~28px); HQ photography crops to mobile aspect ratio
- **Subheadline** "Engineered to Outrun" remains visible but purpose paragraph likely pushed below fold
- **Trust signals:** "110,000 employees" and "140+ years" text is within first scroll on mobile — encounters credibility within 1–2 thumb swipes
- **Secondary navigation** collapses or becomes horizontally scrollable tabs
- **Emotional tone:** Same — Established, Global, Purposeful

### Above the Fold — Product/Service Page (Desktop 1440px)

*Note: `https://www.abb.com/products` returns a 404. The actual product index lives at `https://new.abb.com/offerings` on ABB's legacy Sitefinity platform — a separate CMS from the modern AEM-powered homepage and about pages.*

- **Headline:** "Product and services A-Z" (H2, not H1 — legacy treatment)
- **Subheadline:** "We have a complete portfolio of industrial technology products for customers in utilities, industry, transport and infrastructure"
- **Primary CTA:** None above the fold — the page is a browse-only alphabetical index with linked product names
- **Background treatment:** White background with minimal chrome; no hero image or colour treatment; functional, not promotional
- **Navigation:** Same sticky header as other pages — 7 primary items + utility icons (search, cart, globe, login). Mega-menu dropdowns for Products & Solutions, Industries, Services. Legacy "FIFA" framework styling vs modern AEM styling on homepage.
- **Trust signals before scroll:** Product breadth itself acts as trust — hundreds of products listed alphabetically from A to Y, demonstrating portfolio scale
- **Emotional tone:** Functional, Comprehensive, Utilitarian

**Key observation:** ABB's product index page is deliberately understated — no hero, no promotional language, no lifestyle photography. It trusts the catalogue's depth to speak for itself. This is the opposite of SANPAR's Products page, which has a massive decorative hero but almost no products.

### Above the Fold — Contact Page

- **Headline:** "ABB Global Contact Center"
- **Subheadline:** Service description bullet points
- **Background:** Clean white with #F0F0F0 breadcrumb bar
- **Key interaction:** Country/territory dropdown selector → "Continue" button → regional routing
- **Emotional tone:** Helpful, Accessible, Direct

---

### Typography System

| Property | Value |
|----------|-------|
| **Heading font** | ABBvoiceDisplay (custom), fallback: Helvetica Neue, Helvetica, Arial, sans-serif |
| **Body font** | ABBvoice (custom), same fallback stack |
| **UI labels** | ABBvoice at smaller sizes (12–14px) |
| **Mono** | Not observed |

**Weight scale in use:**

| Weight | Token | Usage |
|--------|-------|-------|
| 300 (Light) | `--aot-ref-font-weight-300` | Subtle body text, captions |
| 400 (Regular) | `--aot-ref-font-weight-400` | Body text, paragraphs |
| 500 (Medium) | `--aot-ref-font-weight-500` | UI elements, labels |
| 600 (Semi-Bold) | `--aot-ref-font-weight-600` | All headings (Display font) |
| 700 (Bold) | `--aot-ref-font-weight-700` | Emphasis, strong text |

**Size scale (all defined tokens):**
10px, 12px, 14px, 16px, 18px, 20px, 24px, 28px, 32px, 40px, 48px, 56px, 64px, 72px, 80px, 96px

**Display typography (mobile ≤767px):**
- Display Large: 32px/32px, weight 600, UPPERCASE
- Headline UC X-Large: 40px/44px, weight 600, UPPERCASE
- Headline UC Large: 32px/35.2px, weight 600, UPPERCASE
- Headline UC Medium: 28px/30.8px, weight 600, UPPERCASE
- Headline SC X-Large: 28px/28px, weight 600, sentence case

**Line-height:** Tightly controlled per size — ratios range from 1.0 (display) to 1.6 (body)
**Letter-spacing:** normal for body; expands to 1.44px–2.56px for UPPERCASE display headings
**Max distinct text sizes per page:** ~8–10 (disciplined hierarchy)
**Text colour hierarchy:** 4 levels — #1F1F1F (primary), #525252 (secondary), #696969 (tertiary), #9E9E9E (disabled/muted)

---

### Colour System

**Primary brand:**

| Name | Hex | Usage |
|------|-----|-------|
| ABB Red | #EE0000 | Primary brand, CTAs, accent borders |
| ABB Red Active | #B10303 | Active/pressed states |
| ABB Red Disabled | #D67B7B | Disabled state |

**Secondary/Accent:**

| Name | Hex | Usage |
|------|-----|-------|
| Lilac | #615EEF | Accent, decorative, hover gradient start |
| Lilac Light | #E3E7FF | Light accent background |
| Lilac BG | #EEF1FF | Section background variant |
| Focus Blue | #2934FF | Keyboard focus rings |
| Link Blue | #0081C7 | Info status colour |

**Signature gradient:** `linear-gradient(90deg, #615EEF 13%, #EE0000 65.5%)` — lilac-to-red, used on CTA hover

**Neutral/Grey scale (14 steps):**
#FFFFFF → #FAFAFA → #F9F9F9 → #EBEBEB → #DBDBDB → #BABABA → #9E9E9E → #858585 → #696969 → #525252 → #333333 → #1F1F1F → #0F0F0F → #000000

**Semantic colours:**

| Status | Colour | Discreet BG |
|--------|--------|-------------|
| Info | #0081C7 | #EBF1FF |
| Success | #21A67A | #EDF8F4 |
| Warning | #FFA200 | #FFF8EB |
| Error | #EF3A34 | #FEEFEF |

**Background treatments:** White (#FFF), secondary (#FAFAFA), lilac tint (#EEF1FF), dark grey (#333333), near-black (#0F0F0F)
**Contrast impression:** High — primary text on white exceeds WCAG AAA (16.7:1)

---

### Spacing & Whitespace

| Property | Desktop | Tablet | Mobile |
|----------|---------|--------|--------|
| Max container width | 2400px | — | — |
| Section padding (top/bottom) | 128px | 96px | 80px |
| Gutter | 24px | 24px | 16px |
| Content-to-whitespace ratio | **Airy** | Balanced | Balanced |

**Spacing scale:** 4px → 8px → 12px → 16px → 20px → 24px → 32px → 40px → 48px → 56px → 64px → 72px → 80px → 96px → 128px → 160px
**Card padding:** Generous — inner padding aligned to spacing tokens (typically 24–32px)

---

### Layout & Grid

- **Column structure:** 12-column AEM grid; content grid uses `repeat(4, 1fr)` on mobile scaling to 12 columns on desktop
- **Responsive behaviour:** Components reflow from multi-column to stacked single-column; hero images scale down with adjusted type; navigation collapses to hamburger; display text sizes reduce by ~50%
- **Section rhythm:** Meaningful variation — hero sections use maximum vertical spacing (128px+), content sections use moderate spacing (64–96px), related content blocks use tighter spacing (32–48px)

---

### Component Inventory

| Component | Key Characteristics | Interaction | Mobile Adaptation |
|-----------|-------------------|-------------|-------------------|
| Global Header | Sticky, logo left, mega-menu, utility icons right | Hover expands mega menu; click-count tracking | Hamburger drawer, simplified utility bar |
| Skip Links | Accessibility button targeting main content | Keyboard-only visible | Same |
| Page Header Promo | Full-bleed hero with image/video, headline, CTA | Supports interactive media | Single-column stack, reduced type |
| Page Editorial | H2 + paragraph content blocks | Static | Full-width stack |
| Links Carousel | Tabbed carousel with industry-specific cards | Tab switching, horizontal scroll | Swipeable, tabs stack or scroll |
| Content Highlights | Multi-card grid (6 items), H3 + description | Hover states on cards | 1-column stack |
| Articles Promo | Article card grid | Card hover elevation | Stack to 1-column |
| News Grid Promo | News card grid with latest items | Card interactions | Stack |
| Rich Content Highlights | Product showcase with 5 named products | Expand/detail interaction | Accordion or stack |
| Quote/Blockquote | Styled blockquote with citation | Static | Reduced padding |
| Technical Data (KPIs) | Statistics grid with numerical data + footnotes | Static, possibly counter animation | 2-column then 1-column |
| Newsletter Signup | Email input + submit button | Form validation | Full-width input |
| Secondary Navigation | Sub-section navigation bar | Hover/active states | Collapsible or horizontal scroll |
| Country Selector | Dropdown + Continue button → regional routing | Select interaction | Full-width dropdown |
| Content Tiles | Image + H3 + description cards | Hover lift/shadow | Stack to 1-column |
| Breadcrumb | Grey bar with path links | Tooltip on truncated items | Hidden below 1000px; moves to nav |
| Language/Region Selector | Modal overlay with 4 regional tabs, 3-column country list | Tab switching, modal open/close | Full-screen overlay |
| Cookie Consent | Banner/modal for consent management | Accept/reject/customise | Full-width banner |
| Mega Menu | Multi-level dropdown from primary nav | Hover/click open, SVG chevrons | Full-screen drawer with accordion |
| Search Bar | Input with auto-suggestion panel (Suggestions + Products) | Type-ahead, category results | Full-width overlay |
| Cart Preview | Shopping list preview panel | Click toggle | Slide-in panel |
| Footer | Multi-column with links, legal, social | Hover on links | Stack to 1-column accordion |
| Scroll-to-Top | Fixed button at bottom-right | Click scrolls to top | Same, smaller size |
| Skeleton Loader | Content placeholder during JS hydration | Pulse/shimmer animation | Same |

---

### Motion & Interaction

- **Hover states:** Primary CTA uses lilac-to-red gradient on hover; links underline; cards receive subtle elevation/shadow
- **Scroll-triggered animations:** Component entrance animations on scroll into viewport; skeleton loaders during JS hydration
- **Transition duration:** Subtle — estimated 200–300ms for most interactions; not flashy
- **Page load:** AEM pages load HTML skeleton then hydrate components via JS Initializer; skeleton loader visible during hydration
- **Focus states:** Vivid blue outline (2px solid #2934FF, 2px offset, 4px radius) — highly accessible

---

### Imagery & Iconography

- **Photography style:** Corporate-industrial; clean, well-lit environments; product/technology in context; HQ architectural shots; diversity in global workforce imagery
- **Colour grading:** Cool, professional tones; high contrast; desaturated backgrounds with product focus
- **Illustration style:** Minimal — photography-dominant
- **Icon style:** SVG inline icons for navigation (outline style); legacy pages use icon fonts (3 sets); pictographic icons at 48×48px for contact functions
- **Visual mood:** Technical, Professional, Global

---

### Trust Architecture

- **Homepage trust signals:** Tagline "Global technology leader" in first words; industry breadth (21 industries in metadata); product leadership section; industry-specific statistics ("One in four data centers run on ABB technology")
- **About page trust signals:** 110,000 employees worldwide; 140+ year history; full financial KPIs ($33.2B revenue, $1.3B R&D, 19% EBITA margin); CEO name and quote; purpose statement as blockquote
- **Contact page:** 150+ countries in selector; multiple institutional contact paths (Investor Relations, Media, Suppliers, Careers)
- **Trust encounter speed:** Within first second — tagline and logo carry immediate credibility; within first scroll — employee count, heritage, financials
- **Global/regional wayfinding:** Extensive language/region selector modal (4 regional tabs, multi-language per country)

---

### User Journey Observation

**Homepage scroll story (section order):**
1. Hero promo (full-bleed, headline + CTA)
2. Topical announcement (AGM, Annual Report — timely events)
3. Industry carousel (6 industries with stats — "why we matter")
4. Business areas (6 capability areas — "what we do")
5. Articles promo (thought leadership)
6. Latest news (currency/activity)
7. Product leadership (5 named products — "how we deliver")
8. Links + Footer

**Primary conversion pathway:** Country-specific routing via contact selector → regional contact center
**First CTA scroll depth:** 0% — visible in hero before any scroll
**Audience types addressed:** 8 distinct audiences (industrial buyers, decision-makers, service customers, investors, media, job seekers, suppliers, privacy/compliance)

---

### Accessibility Signals

- **Focus states:** Present and high-visibility — 2px solid #2934FF with 2px offset
- **Skip-to-content:** Dedicated button + JS module
- **Semantic HTML:** Proper use of header, main, footer, nav, section elements
- **Language declaration:** `<html lang="en">` on all pages
- **ARIA:** `aria-current="page"` on breadcrumbs; external link accessibility text
- **Colour contrast:** Primary text #1F1F1F on white = ~16.7:1 (AAA); ABB Red on white = ~4.6:1 (AA large text)
- **Touch targets:** Country selector and CTA buttons adequately sized; breadcrumb links depend on CSS rendering

---

## Step 1.2 — Inspiration Extraction

| Observation Category | Finding | Adopt | Adapt | Avoid |
|---------------------|---------|-------|-------|-------|
| **Typography hierarchy** | 16-step type scale with disciplined weight usage; display font distinct from body; UPPERCASE for display headings | Adopt: Rigorous type scale with limited sizes per page | Adapt: Use a display/body font pairing suited to SANPAR's identity (not ABBvoice) | Avoid: Copying ABB's custom font family |
| **Colour system** | 14-step grey scale; semantic colours with discreet variants; minimal primary palette | Adopt: Semantic colour system with discreet background variants | Adapt: Build equivalent depth using SANPAR's blue-purple palette | Avoid: ABB's red primary and lilac accent colours |
| **Whitespace** | 128px section padding on desktop; airy content-to-whitespace ratio; generous card padding | Adopt: Generous section vertical padding (80px+ mobile, 128px+ desktop) | Adapt: Scale spacing to SANPAR's 1200px container (vs ABB's 2400px) | — |
| **Component quality** | Each component has defined hover, active, focus, and disabled states; consistent border-radius scale | Adopt: State completeness for every interactive component | Adapt: Component styling to SANPAR's visual language | — |
| **Trust architecture** | Trust signals appear before scroll; financial KPIs prominent; named leadership quoted; global footprint emphasized | Adopt: Trust signals above the fold | Adapt: Lead with engineering heritage and certifications (ISO, AS 9100D) rather than financial metrics | Avoid: Financial KPI display style (not appropriate for SANPAR's scale) |
| **Navigation** | Mega-menu with product descriptions; clear hierarchy; utility icons; sticky behaviour | Adopt: Sticky navigation with skip-to-content | Adapt: Mega-menu pattern for SANPAR's 14-product catalogue | Avoid: ABB's specific icon font sets |
| **Hero treatment** | Full-bleed hero with headline + CTA; overlay gradient for readability; interactive media support | Adopt: Clear value proposition + CTA above the fold | Adapt: Hero composition suited to SANPAR (engineering excellence, not corporate abstraction) | Avoid: ABB's event-driven rotating hero pattern |
| **Responsive design** | Mobile-first token system; type sizes reduce ~50%; navigation collapses; sections reflow to single column | Adopt: Token-based responsive spacing and typography | Adapt: Breakpoints to SANPAR's needs (544px/921px vs ABB's system) | — |
| **Motion** | Subtle 200–300ms transitions; skeleton loaders; scroll-triggered entrances; reduced-motion support | Adopt: Subtle transition timing; `prefers-reduced-motion` support | Adapt: Entrance animations appropriate to SANPAR's content density | Avoid: Skeleton loader pattern (SANPAR won't have AEM hydration) |
| **Imagery** | Corporate-industrial photography; clean, well-lit; product in context; cool tones | Adopt: Product-in-context photography principle | Adapt: Show SANPAR's actual products and factory environments | Avoid: ABB's specific photography style/grading |
| **Accessibility** | Skip links, focus rings, semantic HTML, ARIA attributes, WCAG AAA contrast | Adopt: All accessibility features — focus rings, skip links, semantic HTML, WCAG AA minimum | — | — |
| **Grid system** | 12-column with 24px gutters; 4-column mobile; consistent section rhythm | Adopt: Section rhythm variation by content type | Adapt: 12-column grid within 1200px container | Avoid: ABB's 2400px max-width (too wide for SANPAR's content volume) |
| **Footer** | Multi-column with comprehensive links, legal, social, newsletter | Adopt: Comprehensive footer with trust signals | Adapt: Layout to SANPAR's link volume and golden accent identity | — |
| **Global wayfinding** | Language/region selector with 4 regional tabs | Adapt: Simplified regional selector for SANPAR's export markets | Avoid: ABB's 150+ country complexity |
| **User journey** | Clear scroll narrative: who we are → why we matter → what we do → how we deliver | Adopt: Structured scroll narrative with intentional section ordering | Adapt: Tailor story to SANPAR's heritage + engineering excellence narrative | — |
| **Content tone** | Corporate, global, assured — uses statistics and named leadership to establish authority | Adopt: Confidence without arrogance; let proof speak | Adapt: Use SANPAR's 30+ year heritage and defence certifications as authority anchors | Avoid: ABB's corporate language style |

---

## Step 1.3 — Target Repository Audit

### Tech Stack

| Property | Value |
|----------|-------|
| **CMS** | WordPress with Astra theme |
| **Page builder** | Elementor |
| **E-commerce** | WooCommerce |
| **CSS approach** | Elementor-generated CSS; Google Fonts (Inter, Plus Jakarta Sans) |
| **Component structure** | Elementor widget-based sections; no reusable component library |
| **Design tokens** | Documented in `data/site-config.json` — colours, typography, spacing, buttons, forms |
| **Build tooling** | None — WordPress/Elementor handles build; repository is a data extraction archive |
| **Repository nature** | Scraped archive of live site — contains raw HTML, structured JSON, images, screenshots |

### Page Inventory

| Page / Template | Route or File Path | Primary Purpose |
|----------------|-------------------|-----------------|
| Homepage | `/` / `data/homepage.json` | Hero, stats, product showcase, client logos, company intro |
| Who We Are | `/who-we-are/` / `data/who-we-are.json` | Company history, mission, vision, values, certifications, timeline |
| Technology | `/technology/` / `data/technology.json` | White papers, R&D documentation |
| Success Stories Index | `/success-stories/` / `data/success-stories/success-stories-index.json` | Case study listing |
| Work With Us | `/work-with-us/` / `data/work-with-us.json` | Careers, culture, benefits |
| Products & Solutions | `/products-solutions/` / `data/products/products-solutions.json` | Product category overview |
| Xeros Series | `/our-prouct/xeros-series/` / `data/products/xeros-series.json` | Refrigerated air dryer |
| Ecodrair Series | `/our-prouct/ecodrair-series/` / `data/products/ecodrair-series.json` | Tube-in-tube dryer |
| Adsorption Dryers | `/our-prouct/adsorption-based-compressed-air-dryers/` / `data/products/adsorption-dryers.json` | Desiccant-based dryers |
| Compressed Air Filters | `/our-prouct/compressed-air-filters/` / `data/products/compressed-air-filters.json` | Microfilters |
| Aftercooler | `/our-prouct/aftercooler/` / `data/products/aftercooler.json` | Air/water-cooled aftercoolers |
| Moisture Separator | `/our-prouct/centrifugal-moisture-separator/` / `data/products/moisture-separator.json` | Centrifugal separator |
| Drains | `/our-prouct/drains/` / `data/products/drains.json` | Condensate drain valves |
| Water Chillers | `/our-prouct/water-chillers/` / `data/products/water-chillers.json` | CFC-free chillers |
| Air Chillers | `/our-prouct/air-chillers/` / `data/products/air-chillers.json` | Constant-temp water supply |
| Coolant Chillers | `/our-prouct/coolant-chillers/` / `data/products/coolant-chillers.json` | Process cooling |
| Dehumidifier | `/our-prouct/dehumidifier/` / `data/products/dehumidifier.json` | Xerion Series |
| Precision AC | `/our-prouct/precision-air-conditioner/` / `data/products/precision-ac.json` | Climate controller |
| CAT M1 Series | `/our-prouct/cat-m1-series/` / `data/products/cat-m1-series.json` | Medical air filter |
| CAT DTH Series | `/our-prouct/cat-dth-series/` / `data/products/cat-dth-series.json` | Medical air dryer |
| Industries Index | `/industries-applications/` / `data/industries/industries-applications.json` | Industry verticals overview |
| Aerospace & Defence | `/industries-applications/aerospace-and-defence/` / `data/industries/aerospace-defence.json` | Defence/aerospace solutions |
| Machine Tools | `/industries-applications/machine-tools/` / `data/industries/machine-tools.json` | Machine tool cooling |
| Pharmaceutical | `/industries-applications/pharmaceutical/` / `data/industries/pharmaceutical.json` | Cleanroom solutions |
| Cement | `/industries-applications/cement-industry/` / `data/industries/cement.json` | Cement production |
| Textile | `/industries-applications/textile-industry/` / `data/industries/textile.json` | Humidity control |
| Food & Beverage | `/industries-applications/food-beverage-industry/` / `data/industries/food-beverage.json` | Food safety air |
| Plastics | `/industries-applications/plastics-industry/` / `data/industries/plastics.json` | Plastics manufacturing |
| Manufacturing | `/industries-applications/manufacturing-industry/` / `data/industries/manufacturing.json` | General manufacturing |
| Energy & Power | `/industries-applications/energy-power-industry/` / `data/industries/energy-power.json` | Power plant applications |
| Chemical | `/industries-applications/chemical-indsutry/` / `data/industries/chemical.json` | Chemical process |
| Support & Services | `/support-service/` / `data/support-service.json` | Aftercare, maintenance |
| Contact Us | `/contact-us/` / `data/contact-us.json` | Form, regional offices, map |
| News | `/news/` / `data/news.json` | Company news (4 items) |
| Blogs | `/blogs/` / `data/blogs.json` | Blog posts (1 post) |
| Events | `/events/` / `data/events.json` | Events listing |
| Shop | `/shop/` / `data/shop.json` | WooCommerce login/account |
| Job Openings | `/job-openings/` / `data/job-openings.json` | Sales Engineer listing |
| Privacy Policy | `/privacy-policy/` / `data/privacy-policy.json` | Privacy policy |
| Terms & Conditions | `/terms-and-conditions/` / `data/terms-and-conditions.json` | Terms of use |
| 8 Success Stories | `/success-stories/[client]/` | Individual case studies |

**Total: 46 pages across 4 categories (14 main, 10 industry, 14 product, 8 success stories)**

### Above the Fold — Target Site (Homepage)

- **Navigation bar:** SANPAR icon logo (left), 6 primary items (Home, About Us ▼, Products ▼, Industries ▼, Support & Services, Contact), 5 secondary items (News, Blogs, Events, Shop, Job Openings), WooCommerce cart icon
- **Headline:** "Years of Engineering Excellence"
- **Tagline:** "Excellence Since 1994"
- **Description:** "With over three decades of experience, SANPAR is a trusted leader in compressed air treatment solutions, providing high-performance systems tailored for a wide range of industries."
- **Animated stat counters (trust signals):** 30+ Years | 200+ Employees | 14+ Products | 3000+ Customers
- **CTA buttons:** Product exploration / Contact Us
- **Background:** Deep blue (#060097) to purple (#c10fff) gradient with industrial imagery
- **Emotional tone:** Heritage-proud, Technical, Eager-to-impress

### Above the Fold — Aerospace & Defence Page (Target Key Page)

- **Navigation:** Same 11-item header as homepage — SANPAR icon logo, 6 primary + 5 secondary items, cart icon. Nearly invisible against dark hero background.
- **Breadcrumb:** Home > Aerospace and Defence — present in grey bar below header
- **Headline:** "Aerospace and Defence" (H2, not H1) — bold sans-serif, white on dark background
- **Subheadline:** "Advanced cooling systems for Aerospace and Defence" (H3) — introduces the product category
- **Primary CTA:** "Contact Us" button at bottom of content — not visible above the fold; visitor must scroll past multiple product descriptions
- **Background treatment:** Dark hero section with industrial/aerospace photography; same pattern as other inner pages
- **Trust signals before scroll:** None specific — no certifications (AS 9100D), no client names (GTRE, DRDO), no defence qualifications visible above the fold despite this being the most credibility-sensitive page
- **Emotional tone:** Technical, Aspirational, Underselling

### Design Gap Analysis

| Design Dimension | Reference Level (ABB) | Current State (SANPAR) | Gap |
|-----------------|----------------------|----------------------|-----|
| Above-the-fold impact | Clear value prop + CTA in hero; global authority in first second; restrained confidence | Headline is generic ("Years of Engineering Excellence"); stat counters compete for attention; lacks a single clear CTA hierarchy | **Major** |
| Typography hierarchy | 16-step scale, 5 weights, display/body separation, UPPERCASE display headings, strict hierarchy | 6 sizes (64/48/24/20/16/14px), 2 fonts, limited weight variation, no clear display vs body distinction | **Major** |
| Colour system | 14-step grey scale, semantic colours with discreet variants, signature gradient, dark/light themes | 7 colours total, no grey scale, no semantic colours, no dark theme, gradient is decorative not systematic | **Major** |
| Whitespace / density | 128px section padding desktop; airy ratio; disciplined spacing tokens | 80px section padding; dense content packing; limited spacing variation between section types | **Major** |
| Component quality | Every component has hover/active/focus/disabled states; consistent radius scale; skeleton loaders | Elementor default styling; inconsistent hover states; pill buttons (50px radius) feel casual; no state system | **Major** |
| Trust architecture | Trust signals at second 0 (tagline); financial KPIs; CEO quote; 140+ year heritage; 110K employees | Trust signals present (stats, client logos) but positioned after hero scroll; certifications buried on inner page | **Major** |
| Mobile experience | Token-based responsive system; 50% type reduction; hamburger navigation; thumb-zone CTAs | Elementor's built-in responsive; breakpoints at 544px/921px; unknown CTA thumb-zone placement | **Moderate** |
| Motion & interaction | Subtle 200–300ms transitions; skeleton loaders; scroll entrance animations; reduced-motion support | Animated stat counters; otherwise minimal motion; no entrance animations; no reduced-motion support | **Moderate** |
| Imagery & iconography | Corporate-industrial photography; clean, well-lit; product in context; consistent cool grading | Product cutout images on white; inconsistent image quality; GIF animations for journey; stock-looking elements | **Major** |
| Accessibility | Skip links, focus rings (#2934FF), semantic HTML, ARIA, WCAG AAA contrast, language declaration | Unknown focus states; no documented skip links; Elementor generates semantic HTML inconsistently | **Major** |
| User journey clarity | Structured scroll narrative: who → why → what → how; single clear conversion path | Homepage scroll is feature-heavy but lacks narrative arc; multiple CTAs compete; no clear primary conversion | **Major** |
| SEO & semantic HTML | Single H1 per page; logical heading hierarchy; structured data; semantic landmarks | 7 H1 tags on homepage; H5 used for labels; H6 for certifications; duplicate headings; broken hierarchy | **Critical** |
| Content quality | Professional copywriting; zero grammar errors; globally-calibrated language | Multiple grammar errors, misspellings, factual inaccuracies, Indian-English idioms; URL typos | **Major** |
| Products page commercial effectiveness | Comprehensive A-Z product index; category navigation; descriptions per product | Nearly empty page (3/10 score); only 3 items visible; no filtering, descriptions, or CTAs; massive empty hero | **Critical** |

---

## Step 1.4 — Verified Deep-Dive Findings

*This section documents findings verified by reading the actual repository data files and analysing full-page screenshots of the live site.*

### Visual Audit Scores (from screenshot analysis at 1440×900px)

| Page | Score (1–10) | Key Strength | Key Weakness |
|------|-------------|--------------|--------------|
| Homepage | 5.5 | Strong hero photography; statistics bar is well-positioned | Typography switches between italic serif titles and bold sans-serif headings without system |
| Who We Are | 5.0 | Timeline roadmap graphic is the strongest visual asset site-wide | Excessive text density; wall-of-text syndrome in multiple sections; no CTAs |
| Contact Us | 6.0 | Clean two-column form layout; prominent red "Send Message" CTA | 3D abstract red ribbon graphic clashes with industrial photography approach |
| Products & Solutions | 3.0 | (None significant) | Massive empty black hero; only 3 products visible; no descriptions, filtering, or CTAs; commercially broken |
| Support & Services | 4.0 | Logical content structure (Installation → Maintenance → Spares → Troubleshooting) | Dense paragraph text with zero visual relief; no imagery; no CTAs; reused 3D ribbon graphic |

**Site-wide average: 4.7/10** — reads as a competent mid-tier regional website, not a global industrial enterprise.

### SEO & Heading Hierarchy Issues (Verified from homepage.json)

**Homepage has 7 H1 tags** — a critical SEO violation. The H1 elements are product carousel slides:

| # | H1 Text | Issue |
|---|---------|-------|
| 1 | "Thermal Engineering" | Product category carousel slide |
| 2 | "Compressed Air Treatment(𝘚𝘵𝘢𝘯𝘥𝘢𝘳𝘥)" | Italic Unicode characters in heading; no space before parenthetical |
| 3 | "Compressed Air Treatment(𝘛𝘢𝘪𝘭𝘰𝘳𝘦𝘥 𝘚𝘺𝘴𝘵𝘦𝘮𝘴)" | Same formatting issues |
| 4 | "Industrial Cooling System" | Carousel slide |
| 5 | "Industrial Air Conditioning Systems" | Carousel slide |
| 6 | "Medical Desiccant Air Dryer" | Carousel slide |
| 7 | "Compressed AirDryer" | Missing space ("Air Dryer") |

**H5 misused as a label element** across all pages — "Who we are", "Our Mission", "Our Vision", "Products and Solutions" rendered as H5 where they should be span/label elements or higher-level headings.

**H6 for ISO certification** — "ISO 9001:2015" rendered as H6 on the Who We Are page, the lowest semantic heading level, burying the company's most important credential.

**Duplicate headings:** "Who We Are" appears as both H1 and H2 on the same page.

### Content Quality Errors (Verified from JSON data)

**Grammar and spelling errors found in live content:**

| Page | Error | Correct |
|------|-------|---------|
| Homepage meta | "Years of Engineering Excellence 0 + Our Employees 0 +" | Counter placeholder values leaked into meta description |
| Homepage H1 | "Compressed AirDryer" | "Compressed Air Dryer" (missing space) |
| Homepage footer | "Pharmaceutical Industrty" | "Pharmaceutical Industry" |
| Homepage footer | "Developed byWEBBAZAAR" | Missing space before developer name |
| Who We Are | "We have proved ourself strong" | "We have proved ourselves strong" |
| Who We Are | "located in Banglore, India" | "located in Bangalore, India" (misspelling of company HQ city) |
| Who We Are | "SANPAR is a family of a collective goal" | Awkward phrasing — unclear meaning |
| Who We Are | "We believe in agile, collaborative... are the signature language" | Grammatically broken sentence |
| Xeros Series | "the moisture content in the compressed is removed" | "in the compressed air is removed" (missing word) |
| Xeros Series | "Technical Specification are for the following" | "Technical Specifications are" (subject-verb disagreement) |
| CAT M1 Series | "damage critical equipments like ventilators" | "critical equipment" (wrong plural) |
| Aerospace page | "Applications of Advanced cooling systems in Aerospace in defence" | "in Aerospace and Defence" (typo: "in" for "and") |
| Aerospace page | "SANPAR emerging engineers are allowed to simulate" | Awkward phrasing |
| Hindustan Motors story | "there by saving at least 8.7 lakhs" | "thereby" (one word); "lakhs" not globally understood |
| GTRE story | "involved in research on space shuttle engines" | Factually inaccurate — GTRE researches gas turbine engines for military aircraft, not space shuttles |
| Work With Us | "extra ordinary every day" | "extraordinary" (one word) |
| Work With Us | "Conflict or Interest" | "Conflict of Interest" |
| Work With Us | "Students will be given with a hands-on training" | "Students will be given hands-on training" |
| Product URLs | `/our-prouct/` | `/our-product/` (persistent typo across 14 product URLs) |
| Industry URL | `/chemical-indsutry/` | `/chemical-industry/` (typo in URL) |

### Homepage Scroll Narrative (Verified section order from JSON)

| Section | Content | Heading Level | Narrative Role |
|---------|---------|--------------|----------------|
| 1. Hero carousel | 7 product category slides cycling as H1s | H1 ×7 | Confusing — carousel creates identity crisis (what does SANPAR do?) |
| 2. Stats bar | 30+ years, 200+ employees, 14+ products, 3000+ customers | (counters) | Trust signal — but numbers are suspiciously round |
| 3. "Who we are" | "Excellence Since 1994" + company description + Mission/Vision | H5, H3 | About — but heading hierarchy is H5→H3 (inverted) |
| 4. "Driven by Purpose" | Purpose/vision statements + isometric illustration | H2 | Story — well-positioned but text-heavy |
| 5. Company timeline | 10 milestone entries from 1994–2025 | H2 ×10 | Heritage — but 10 H2s create heading hierarchy chaos |
| 6. "Reliable & Efficient Systems" | Product category cards | H2 | Products — this should come earlier for commercial visitors |
| 7. "Industries And Applications" | Industry cards with background images | H2 | Industries — good but "And" capitalisation is inconsistent |
| 8. "Trusted by Industry Leaders" | Client logo grid (44+ logos) | H2 | Social proof — crammed, needs curation |
| 9. "Recent Articles" | 4 news articles | H2 | Activity signal — articles are dated (2015 Hannover Messe reference) |
| 10. "Keep in touch" + Footer | Contact details + multi-column links | H2 | Closure |

**Key issue:** The scroll narrative is disjointed. A global visitor encounters a carousel of product categories (without context), then stats, then company history, then more company history (timeline), then finally products and industries. The commercial pathway (products → industries → contact) is buried beneath heritage storytelling.

### Navigation Structure Issues (Verified from JSON + screenshots)

- **11 items in header** — 6 primary + 5 secondary (News, Blogs, Events, Shop, Job Openings) + cart icon. Reference site has 7 + utility icons.
- **Navigation nearly invisible** in screenshots — thin bar against dark hero with insufficient contrast.
- **Dual menu rendering** — both desktop mega-menu and mobile menu HTML appear in the DOM simultaneously (Elementor pattern), potentially doubling DOM size.
- **About Us sub-items** include hash-anchor links (#company-history, #chairman-message, #core-values, #management-team, #success-story) — these jump to sections on the Who We Are page rather than being separate pages.

### Contact Page Verified Structure

- **Form fields:** Company Name (no personal name field), Email, Phone, Request Type dropdown (Product/Parts/Service), Product Category dropdown (4 categories), Contact Preference (Phone/Email/Both), Message
- **Missing:** Personal name field — a global prospect expects to provide their name
- **8 regional offices:** Kolhapur, Mumbai, Pune, Bengaluru, Chandigarh, Chennai, Jamshedpur, **Coimbatore (listed twice)** — data error
- **Social links:** Facebook, LinkedIn, X/Twitter, YouTube
- **No Google Maps embed visible** despite "map" being mentioned in initial data

### Products & Solutions Page (Critical Commercial Failure)

The Products & Solutions page is the most commercially important page on a B2B industrial site. Verified findings:

- **Hero:** Massive empty black space with only "Products & Solutions" in decorative italic serif. No value proposition, no imagery, no navigation to product categories.
- **Content:** Only 3 product items visible (Ecodrair Series, Drains, Centrifugal Moisture Separator) via WooCommerce carousel. No descriptions, no specifications, no "Learn more" CTAs.
- **Pricing displayed in ₹ without context** — no "per unit", no "starting from", no currency alternative for global visitors.
- **No product categorisation** visible — the 4-category structure (Compressed Air, Cooling, Air Conditioning, Medical) exists in the navigation JSON but is not surfaced on this page.
- **WooCommerce integration:** "login In To Start Shopping" heading (capitalisation error) appears on product pages — this is a consumer retail pattern, not appropriate for B2B industrial procurement.
- **Visual score: 3/10** — footer-to-content ratio approaches 1:1 because the page is so sparse.

### Trust Architecture — Current State Map (Verified)

| Trust Signal | First Appearance | Scroll Depth | Impact |
|-------------|-----------------|-------------|--------|
| "Excellence Since 1994" tagline | Hero section | 0% (visible immediately) | Low — generic claim, no specificity |
| Stat counters (30+/200+/14+/3000+) | Below hero | ~10% (after first scroll) | Medium — but numbers feel artificially rounded |
| Mission/Vision statements | "Who we are" section | ~20% | Low — generic corporate language |
| Company timeline (30 years of milestones) | Mid-page | ~35% | Medium — good heritage proof but too detailed for homepage |
| Product category cards | "Reliable & Efficient Systems" | ~50% | Medium — but comes too late for commercial visitors |
| Client logos (44+) | "Trusted by Industry Leaders" | ~65% | Medium — but quantity over quality; logos too small to read |
| ISO 9001:2015 certification | Who We Are page only (H6) | N/A on homepage | Low — buried on inner page at lowest heading level |
| AS 9100D aerospace certification | Who We Are page body text | N/A on homepage | Low — strongest differentiator completely absent from homepage |
| Defence/DRDO work references | Aerospace industry page + timeline | N/A on homepage | Low — powerful trust signal invisible on the primary landing page |
| Success story results (₹8.7L savings) | Individual success story pages only | N/A on homepage | Low — quantified proof buried 3 clicks deep |
| Chairman K.S. Sudhakaran quote | Who We Are page | N/A on homepage | Low — no named leadership visible on homepage |

**Critical finding:** A first-time global visitor can spend 30+ seconds on the homepage without encountering a single verifiable trust signal. The ISO certification, aerospace credentials, defence sector work, and client success metrics — SANPAR's strongest differentiators — are all buried on inner pages.

---

# Phase 2 — Brand Design Principle

"As the senior designer, I am now entering Phase 2."

---

## Brand Design Principle Statement

> **"SANPAR should feel precise, proven, and commanding.**
> **Never cluttered, tentative, or provincial."**

---

### Requirement 1 — Positive words must be distinct from each other

| Word | Domain | What it governs |
|------|--------|-----------------|
| **Precise** | Craft & execution | How things are built — type scales, colour tokens, spacing systems, component states. The engineering-grade attention to detail in every pixel. |
| **Proven** | Evidence & trust | What the site shows — certifications, client results, heritage milestones, defence credentials. Facts over claims. |
| **Commanding** | Presence & authority | How the site carries itself — confident hero compositions, restrained colour, generous whitespace, unhurried scroll rhythm. The posture of a company that doesn't need to shout. |

These three words are non-overlapping: "precise" governs the system, "proven" governs the content, "commanding" governs the impression. A site can be precise without being proven (a beautiful template with no trust signals). A site can be proven without being commanding (a credentials page buried in dense text). All three must work together.

---

### Requirement 2 — Positive words must be distinct from the reference brand (ABB)

ABB's observed personality from Phase 1: **Authoritative, Purposeful, Restrained.**

| SANPAR Word | ABB Word | Why they are distinct |
|-------------|----------|---------------------|
| **Precise** ≠ Restrained | ABB's "restrained" is about aesthetic minimalism and editorial discipline — holding back. SANPAR's "precise" is about engineering exactness — measuring twice. Restraint is a choice of taste; precision is a discipline of craft. SANPAR builds to ±1°C tolerances; the design system should mirror that exactness. |
| **Proven** ≠ Authoritative | ABB's "authoritative" comes from institutional scale — $33B revenue, 110K employees, 140+ years. They are authority by sheer mass. SANPAR's "proven" must come from specific evidence — AS 9100D certification, ₹8.7L/month savings at Hindustan Motors, DGAQA-qualified airborne cooling. SANPAR cannot claim authority by scale; it must earn trust by proof. |
| **Commanding** ≠ Purposeful | ABB's "purposeful" means mission-driven — sustainability, resource efficiency, enabling industries. SANPAR's "commanding" means projecting presence and confidence as a company entering global competition from a 200-person Bengaluru base. It is about not being dismissed, not about articulating a higher purpose. |

**Conclusion:** No overlap. SANPAR's principle describes a different brand personality that will not look derivative of ABB.

---

### Requirement 3 — Negative words must name real observed failure modes

Each negative word is anchored to specific, verified findings from Phase 1 (Steps 1.3 and 1.4):

#### "Never cluttered" — Verified evidence:

| Finding | Source | Impact |
|---------|--------|--------|
| 7 H1 tags on a single homepage | Step 1.4, homepage.json headings | Search engines and screen readers receive a chaotic page structure with no clear primary topic |
| 11 navigation items in the header (6 primary + 5 secondary + cart) | Step 1.4, navigation.json | Visitor's first impression is a wall of menu items competing for attention; ABB uses 7 + utility icons |
| 44+ client logos crammed into a single section | Step 1.3, homepage content | Reads as desperation rather than prestige; logos are too small to recognise at any viewport |
| 10 timeline H2 headings on the homepage | Step 1.4, scroll narrative table | Heritage storytelling dominates the homepage with 10 chronological sections before products appear |
| Navigation rendered twice in DOM (desktop + mobile) | Step 1.4, navigation issues | Doubles the HTML weight of the menu structure |
| Stats bar, hero carousel, company about, mission, vision, timeline, products, industries, logos, articles — all on one homepage | Step 1.4, scroll narrative | 10 distinct content sections compete for attention on a single page without clear hierarchy |
| "Translate" floating button on every page | Step 1.4, screenshot analysis | Red pill button on left edge clashes with page design and adds visual noise |

**Design test:** Before adding any element, ask: "Does this reduce clutter or add to it?" If the answer is "adds," it must replace something else or be removed.

#### "Never tentative" — Verified evidence:

| Finding | Source | Impact |
|---------|--------|--------|
| Hero headline "Years of Engineering Excellence" | Step 1.3, above the fold | A global visitor doesn't learn what the company does; the headline is a hedge — safe, generic, non-committal |
| "Excellence Since 1994" repeated as tagline AND section heading | Step 1.4, content errors | Using the same vague phrase twice signals a lack of something specific to say |
| "We are Solutionizers" (H5, not even H1) | Step 1.3, who-we-are.json | An invented word at a low heading level — tentative in both language and hierarchy |
| ISO 9001:2015 rendered as H6 | Step 1.4, heading hierarchy | The company's most important certification is at the lowest possible heading level — semantically whispering its strongest credential |
| AS 9100D aerospace certification buried in body text | Step 1.4, trust architecture map | SANPAR's global differentiator is hidden on an inner page — the site is afraid to lead with its strongest card |
| No CTAs on Who We Are and Support pages | Step 1.4, screenshot analysis | Pages tell the company's story but never ask the visitor to do anything — the site lacks conversion confidence |
| Products page shows only 3 items | Step 1.4, products page analysis | The most important commercial page is nearly empty — as if the company isn't sure its catalogue is worth displaying |
| Form has no personal name field | Step 1.4, contact page structure | Even the contact form holds back from asking a basic question |

**Design test:** Before finalising any element, ask: "Does this project confidence or hedge?" If it hedges, make it bolder.

#### "Never provincial" — Verified evidence:

| Finding | Source | Impact |
|---------|--------|--------|
| Pill-shaped buttons (50px border-radius) | Step 1.3, site-config.json | Reads as casual/playful — appropriate for a consumer app, not a B2B industrial supplier competing globally |
| 3D abstract red ribbon graphic reused across pages | Step 1.4, screenshot analysis | A decorative filler element with no relation to the industrial brand — looks like a template asset |
| Italic serif page titles clashing with bold sans-serif headings | Step 1.4, visual audit | Two incompatible typographic identities coexist on every page — no global enterprise has this inconsistency |
| "Developed by WEBBAZAAR" in footer | Step 1.4, content errors | Third-party developer credit in the footer undermines brand ownership; ABB shows no developer credit |
| Pricing in ₹ without context or currency alternative | Step 1.4, products page | A global visitor encountering "₹38,000" with no unit context or USD equivalent feels the site wasn't built for them |
| "manufacturing fraternity" in mission statement | Step 1.4, content errors | Colloquial Indian-English phrasing that doesn't translate for a non-native English reader |
| "space shuttle engines" factual error for GTRE | Step 1.4, content errors | Misstating what a defence client does signals carelessness to any knowledgeable global prospect |
| URL typos: `/our-prouct/`, `/chemical-indsutry/` | Step 1.4, content errors | Visible to any developer or technical prospect who checks the browser address bar |
| "Banglore" misspelling of own HQ city | Step 1.4, content errors | Misspelling your own city name in English signals that no native English speaker reviewed the content |
| Counter placeholders leaked into meta description ("0 +") | Step 1.4, content errors | Broken meta description visible in search results tells Google (and searchers) the site is not maintained |
| Site-wide visual score of 4.7/10 | Step 1.4, visual audit | The average score across 5 key pages is below the threshold where a global B2B buyer would engage |

**Design test:** Before approving any element, ask: "Would a procurement officer at Airbus or Boeing find this credible?" If not, it's provincial.

---

### Requirement 4 — Every Phase 3 design decision must be defensible against the statement

To verify this requirement is enforceable, here are test cases showing how the principle resolves real design decisions:

| Decision | Precise | Proven | Commanding | Verdict |
|----------|---------|--------|------------|---------|
| Should we use 50px pill-shaped buttons or 8px radius? | 8px is from a defined token scale (precise) | — | 8px projects industrial confidence (commanding); pills feel casual | **8px radius** |
| Should the hero show "Years of Engineering Excellence" or state what SANPAR does? | — | Stating what the company does is factual (proven) | A clear value proposition is confident (commanding); generic taglines hedge (tentative) | **State what they do** |
| Should we show 44 client logos or a curated 16? | 16 from a deliberate selection (precise) | Both show proof, but 44 looks desperate (not commanding) | 16 well-sized logos command more respect than 44 thumbnails | **Curated 16** |
| Should certifications appear on the homepage or only on the About page? | — | Certifications are the strongest proof — hiding them is tentative | Above-fold placement is commanding | **Homepage hero** |
| Should the Products page use a WooCommerce "Add to Cart" pattern? | — | — | B2B industrial procurement uses "Request Quote" not "Add to Cart" (provincial) | **"Request Quote" CTA** |
| Should timeline occupy 10 H2 sections on the homepage? | 10 H2s is structurally imprecise | Timeline proves heritage but 10 sections is cluttered | A homepage should command attention, not lecture on history | **Move timeline to About page; show 3 key milestones on homepage** |

---

### Alternative Words Considered and Rejected

| Alternative | Why rejected |
|-------------|-------------|
| "Robust" instead of "Precise" | Too close to a product attribute; doesn't translate to design decisions about typography and colour |
| "Trusted" instead of "Proven" | Trust is the outcome; proof is the mechanism. "Proven" is more actionable for design decisions. |
| "Bold" instead of "Commanding" | "Bold" risks encouraging visual excess (large type, bright colours); "commanding" is about posture, not volume |
| "Amateurish" instead of "Provincial" | Too harsh and personal; "provincial" diagnoses a scope problem (regional vs global) without insulting the team |
| "Busy" instead of "Cluttered" | "Busy" implies activity, which isn't entirely negative; "cluttered" is unambiguously a failure mode |

---

### Statement for Approval

> **"SANPAR should feel precise, proven, and commanding.**
> **Never cluttered, tentative, or provincial."**

This statement will govern every design decision in Phase 3 across all 11 tracks (A–K). Every task must be defensible against at least one positive word and must not violate any negative word.

**✅ APPROVED — 2026-03-19**

The brand design principle has been reviewed and approved by the stakeholder. All Phase 3 tasks must be defensible against this statement. No design decision may violate any of the three negative words.

---

# Phase 3 — Transformation Plan

"As the senior designer, I am now entering Phase 3."

---

## Adopt/Adapt Traceability Matrix

*Every Phase 3 task must trace to an "Adopt" or "Adapt" decision from Step 1.2. No task may trace to an "Avoid."*

| Task(s) | Inspiration Entry | Decision | Principle Alignment |
|---------|------------------|----------|-------------------|
| A1, A2, A3 | Typography / Colour / Whitespace | Adopt: Rigorous scales; Adapt: SANPAR's palette | Precise |
| A4, A5 | Component quality | Adopt: State completeness, consistent radius | Precise |
| A6 | Motion | Adopt: Subtle timing + reduced-motion | Precise |
| A7 | Grid system | Adopt: Section rhythm variation | Precise |
| B1, B2, B3, B4 | Grid system / Whitespace | Adopt: Section rhythm; Adapt: 1200px container | Commanding (never cluttered) |
| C1, C2, C3, C4 | Navigation | Adopt: Sticky nav; Adapt: Mega-menu for 14 products | Commanding (never cluttered) |
| C5 | Accessibility | Adopt: Skip-to-content link | Precise |
| D1, D2 | Hero treatment / Trust architecture | Adopt: Clear value prop + CTA above fold; Adapt: Engineering heritage hero | Proven + Commanding (never tentative) |
| D3, D4 | Hero treatment | Adapt: Hero composition suited to SANPAR | Commanding |
| D5 | Component quality | Adopt: State completeness for every interactive component | Precise (never provincial) |
| E1–E12 | Component quality | Adopt: Defined states; Adapt: Styling to SANPAR's visual language | Precise |
| F1, F2, F3 | Footer | Adopt: Comprehensive footer with trust; Adapt: Golden accent identity | Proven + Commanding |
| G1, G2, G3, G4 | Trust architecture | Adopt: Trust signals above fold; Adapt: Lead with certifications not financials | Proven (never tentative) |
| H1–H5 | Imagery | Adopt: Product-in-context principle; Adapt: SANPAR's environments | Commanding (never provincial) |
| I1–I5 | Responsive design | Adopt: Token-based responsive; Adapt: SANPAR breakpoints | Precise |
| J1–J5 | Motion | Adopt: Subtle timing; Adapt: Entrance animations for SANPAR content | Precise |
| K (all) | Content tone | Adopt: Confidence without arrogance; Adapt: Heritage + certifications as anchors | Proven (never tentative) |

**Verification: No task traces to an "Avoid" entry.** ✅

---

## Track A — Design Tokens & Foundations

| # | Task | What Changes | Why It Matters | Acceptance Criterion | Effort | Dependency |
|---|------|-------------|----------------|---------------------|--------|------------|
| A1 | Define colour palette tokens | Replace 7-colour system with structured palette: primary (SANPAR blue #060097), secondary (purple #c10fff), accent (gold #ffcd57), plus a 10-step neutral grey scale, 4 semantic colours (success, warning, error, info) each with discreet background variant | The current 7-colour system lacks the depth to create visual hierarchy, state management, or section differentiation; a global-grade site needs systematic colour | All UI colours reference named tokens; no hardcoded hex values remain in stylesheets; grey scale has exactly 10 steps from white to near-black | M | None |
| A2 | Define typography scale tokens | Create a 12-step type scale (12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 56, 64px) with mapped line-heights and letter-spacing; define display (Plus Jakarta Sans 600–700) and body (Inter 400–500) usage rules | Current 6-size system creates unclear hierarchy; pages use inconsistent sizing; no distinction between display and body typography | Every text element on every page maps to exactly one token in the scale; no rogue font-size values remain; display vs body usage documented | M | None |
| A3 | Define spacing scale tokens | Create systematic spacing scale: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128px; define section-type-specific vertical padding (hero: 128px desktop/80px mobile, feature: 96px/64px, content: 64px/48px) | Current uniform 80px section padding creates monotonous rhythm and feels dense compared to reference standard's 128px generous breathing room | All section padding, component gaps, and layout spacing reference spacing tokens; section rhythm varies by content type as specified | M | None |
| A4 | Define shadow and elevation tokens | Create 3-level shadow system: subtle (cards at rest), medium (cards on hover), pronounced (modals/dropdowns); specify exact box-shadow values | No shadow system exists; components lack depth differentiation; hover states have no elevation change | Shadow tokens defined; every elevated component references exactly one shadow level; hover-to-elevated transition specified | S | None |
| A5 | Define border-radius tokens | Replace 50px pill radius and 4px input radius with 4-step scale: 4px (inputs, small elements), 8px (cards, containers), 12px (large panels), 16px (hero overlays) | 50px pill buttons read as casual/playful; inconsistent radius usage across components; global enterprise sites use restrained, consistent radii | All border-radius values reference tokens; no 50px pill radius remains; button radius is 8px | S | None |
| A6 | Define motion/easing tokens | Define transition duration (150ms for micro, 250ms for state changes, 400ms for entrances), easing curves (ease-out for entrances, ease-in-out for state), and `prefers-reduced-motion` fallbacks | No motion system exists; animated counters are the only motion; transitions feel undefined | Motion tokens defined; every animated property references a duration + easing token; reduced-motion media query disables all non-essential animation | S | None |
| A7 | Define z-index scale | Create ordered z-index scale: base (0), dropdown (100), sticky-nav (200), modal-overlay (300), modal (400), toast (500) | No z-index management; sticky nav and dropdowns may conflict; future modals/toasts need predictable stacking | Z-index scale documented; every positioned element uses a named z-index token | S | None |

---

## Track B — Layout & Grid System

| # | Task | What Changes | Why It Matters | Acceptance Criterion | Effort | Dependency |
|---|------|-------------|----------------|---------------------|--------|------------|
| B1 | Implement 12-column responsive grid | Replace Elementor's layout system with a 12-column CSS grid; define column gaps (24px desktop, 16px mobile) and container max-width (1200px centred) | Elementor generates inconsistent widths and gaps; a grid system ensures every page aligns to a predictable structure | All page content aligns to 12-column grid; gutter width is consistent across all pages; container is centred with max-width 1200px | L | A3 |
| B2 | Define responsive breakpoints | Standardise on 3 breakpoints: mobile (≤544px), tablet (545–921px), desktop (≥922px) with token-defined behaviour at each | Current breakpoints exist but behaviour is Elementor-default; components may break at transition points | Every component has defined layout at all 3 breakpoints; no horizontal overflow at any breakpoint between 320px and 1920px | M | A3 |
| B3 | Audit and fix content density per page | Review every page for content-to-whitespace ratio; flag sections denser than reference standard; apply section-type-specific padding from A3 | Homepage and product pages pack content tightly with uniform 80px spacing; this creates visual fatigue and undermines authority | Every section on every page uses the section-type-specific padding from Track A; no section uses less than 64px vertical padding on mobile or 80px on desktop | L | A3, B1 |
| B4 | Standardise content widths per section type | Define max content widths: full-bleed (100%), wide (1200px), narrow (800px for text-heavy sections like blog posts, legal pages) | Text lines on legal and blog pages likely exceed 80 characters per line, reducing readability | Text-heavy sections use narrow (800px) container; product/feature sections use wide (1200px); hero sections use full-bleed | M | B1 |

**Content density flags:**

| Page | Section | Issue | Recommended Min Padding |
|------|---------|-------|------------------------|
| Homepage | Hero + Stats counters | Stats compete with hero headline; too much information before first scroll | Hero: 128px top/bottom; Stats: separate section with 96px padding |
| Homepage | Product showcase | Multiple product cards with minimal vertical separation | 96px top/bottom |
| Homepage | Client logos | 44+ logos feel crammed | 80px top/bottom; limit visible logos to 12–16 with "View all" |
| Product pages | Specifications tables | Dense technical data with minimal breathing room | 64px top/bottom with 24px internal padding |
| Industry pages | Multiple product-industry cross-references | Lists feel like directories rather than curated recommendations | 96px top/bottom; limit to 4–6 featured products per industry |
| Who We Are | Timeline + milestones | Multiple content blocks compete for attention | 96px between major timeline sections |
| Contact Us | Form + regional offices | Form and office list compete on same visual plane | 96px separation; form gets visual priority |

---

## Track C — Navigation & Header

| # | Task | What Changes | Why It Matters | Acceptance Criterion | Effort | Dependency |
|---|------|-------------|----------------|---------------------|--------|------------|
| C1 | Redesign sticky header | Restyle header: logo left, 6 primary nav items centre, CTA button ("Contact Us") + search icon right; reduce header height to ~64px; apply white background with subtle bottom border; add scroll-triggered shadow elevation | Current header has too many items visible (6 primary + 5 secondary + cart); feels cluttered and splits attention | Header contains max 8 visible elements (logo + 6 nav items + 1 CTA); height is 64px; shadow appears on scroll; background is white with 1px bottom border | M | A1, A4, A7 |
| C2 | Build mega-menu for Products | Create structured mega-menu: 4 product category columns (Compressed Air Treatment, Industrial Cooling, Industrial Air Conditioning, Medical Desiccant), each showing product names with one-line descriptions | Products dropdown currently lists 14 items without categorisation; prospects cannot quickly find relevant products; reference site uses descriptive mega-menu | Mega-menu opens on hover/click; 4 category columns visible; each product has name + description; menu closes on outside click; keyboard navigable | L | C1, A1, A6 |
| C3 | Consolidate secondary navigation | Move News, Blogs, Events, Shop, Job Openings from header to footer; header nav should only contain primary user pathways | 11 navigation items in the header overwhelms visitors; secondary items dilute primary pathways; reference site limits header to 7 items + utility icons | Secondary nav items removed from header; appear in footer under appropriate columns; header contains exactly 6 primary nav items + Contact CTA | S | C1 |
| C4 | Implement mobile navigation drawer | Replace Elementor mobile menu with full-height drawer: logo + close button at top, primary nav with accordion sub-menus, Contact CTA pinned at bottom in thumb zone | Mobile navigation must be reliable, accessible, and match the redesigned desktop nav structure | Drawer opens from hamburger; all 6 primary nav items visible; sub-menus expand as accordions; Contact CTA visible without scrolling in bottom 40% of viewport; focustrap active when open | M | C1, C2, A6 |
| C5 | Add skip-to-content link | Add visually hidden "Skip to main content" button that becomes visible on keyboard focus; targets main content area | No skip link exists; essential accessibility feature; reference site implements this | Skip link is first focusable element on every page; visible on Tab key press; jumps focus to main content landmark; styled with focus ring from A1 | S | A1 |

---

## Track D — Hero & Landing Sections

| # | Task | What Changes | Why It Matters | Acceptance Criterion | Effort | Dependency |
|---|------|-------------|----------------|---------------------|--------|------------|
| D1 | Redesign homepage hero composition | Replace current hero with: (1) Clear headline that states what SANPAR does — not just how long they've done it, (2) Single subheadline with value proposition, (3) One primary CTA ("Explore Solutions") + one secondary CTA ("Contact Us"), (4) Full-bleed background with dark overlay gradient for text contrast, (5) ISO 9001 + AS 9100D certification badges visible | Current hero says "Years of Engineering Excellence" — a global visitor doesn't know what the company does; stat counters create noise; no clear single action | A first-time visitor can state what SANPAR does, why they're credible, and what to do next — within 5 seconds, without scrolling, on both desktop (1440px) and mobile (375px) | L | A1, A2, A3, A5, B1 |
| D2 | Separate stats section from hero | Move animated stat counters (30+ years, 200+ employees, 14+ products, 3000+ customers) to a dedicated section below the hero with proper spacing and refined counter animation | Stats currently compete with hero headline for attention; separating them gives each element room to land | Stats section sits immediately below hero with 96px top padding; counter animation triggers on scroll into viewport; numbers use display typography from A2 | M | A2, A3, A6, D1 |
| D3 | Define hero template for product pages | Create consistent hero template for all 14 product pages: breadcrumb above, H1 product name, one-sentence positioning statement, key spec highlight (e.g. "85–10,000 CFM | 3–16 bar"), product hero image to the right | Product pages currently lack consistent hero treatment; some jump straight to content; visitors cannot quickly assess product relevance | All 14 product pages use the hero template; breadcrumb visible; H1, positioning statement, and one key spec visible above the fold; product image visible on desktop | M | A1, A2, A3, B1 |
| D4 | Define hero template for industry pages | Create consistent hero template for all 10 industry pages: breadcrumb, H1 industry name, one-sentence relevance statement ("How SANPAR serves [industry]"), 2–3 key product links | Industry pages currently vary in structure; visitors must scroll to understand SANPAR's relevance to their industry | All 10 industry pages use the template; breadcrumb, H1, relevance statement, and product links visible above the fold | M | A1, A2, A3, B1 |
| D5 | Redesign CTA button hierarchy | Define 3 CTA levels: primary (solid SANPAR blue, 8px radius, white text), secondary (outlined, SANPAR blue border), tertiary (text link with arrow icon); remove pill-shaped radius | Pill buttons (50px radius) undermine seriousness; multiple button styles without hierarchy confuse visitor priority; reference uses a clear 3-level CTA system | All CTAs across all pages use exactly one of the 3 defined levels; no pill-shaped buttons remain; primary CTA is visually dominant | M | A1, A5 |

---

## Track E — Component Library

| # | Task | What Changes | Why It Matters | Acceptance Criterion | Effort | Dependency |
|---|------|-------------|----------------|---------------------|--------|------------|
| E1 | Product card component | **EXISTS — needs restyle.** Align to token system: 8px border-radius, subtle shadow at rest, medium shadow on hover, consistent image aspect ratio (4:3), H3 product name, one-line description, text link CTA. Remove Elementor default styling | Product cards have inconsistent sizing, no hover states, and Elementor-generated classes; they look template-driven rather than intentional | All product cards use identical dimensions, aspect ratio, shadow, radius, and typography; hover state adds elevation; click area covers full card | M | A1, A2, A4, A5 |
| E2 | Industry card component | **EXISTS — needs restyle.** Similar to E1 but with industry-specific background image overlay, industry name as H3, and "Learn more →" text link | Industry cards need consistent visual treatment across homepage and industry index page | All industry cards use consistent styling; background image has dark gradient overlay for text readability; text is white on overlay | M | A1, A2, A4 |
| E3 | Stats counter component | **EXISTS — needs restyle.** Redesign: display-size number (48px desktop/32px mobile), label below in body text, subtle divider between counters, refined animation (count-up on viewport entry) | Current counters are Elementor default; animation lacks refinement; numbers don't use display typography | Counters use display typography from A2; animation triggers once on scroll into viewport; numbers format with appropriate separator; `prefers-reduced-motion` shows final value immediately | M | A2, A6 |
| E4 | Success story card component | **EXISTS — needs restyle.** Redesign: client name (H3), industry tag, one-line result summary, "Read case study →" link; consistent card dimensions | Success story cards lack visual consistency and don't highlight measurable results | All 8 success story cards use identical dimensions and typography; measurable result is visible without clicking through | S | A1, A2, A4 |
| E5 | Client logo grid component | **EXISTS — needs restyle.** Redesign: limit visible logos to 16, organised in a 4×4 grid (desktop) / 2-column (mobile); consistent logo sizing and greyscale treatment; add "Trusted by 3000+ customers" heading | 44+ logos crammed together feels desperate rather than prestigious; reference site curates trust signals carefully | Max 16 logos visible; all logos sized consistently; greyscale with colour on hover; heading above grid; optional "View all clients" link | M | A1, A3 |
| E6 | Testimonial / quote component | **MISSING — needs creation.** Create blockquote component: quotation in large italic text, client name, company name, optional small photo; used on homepage and success story pages | No testimonial component exists; the success stories contain quotable results but they're buried in body text; reference site uses prominent blockquote component | Quote component exists; uses display typography at reduced weight; includes attribution; responsive at all breakpoints; used on at least homepage and 2 success story pages | M | A1, A2 |
| E7 | Specification table component | **EXISTS — needs restyle.** Redesign product spec tables: alternating row backgrounds using grey scale tokens, consistent cell padding (16px), left-aligned headers, responsive horizontal scroll on mobile | Product pages contain spec data but tables lack professional styling; they break on narrow screens | All product spec tables use alternating row colours from grey scale; cell padding is 16px; tables scroll horizontally on mobile with visual scroll indicator | M | A1, A3 |
| E8 | Accordion component | **MISSING — needs creation.** Create FAQ/product-detail accordion: H4 trigger with chevron icon, smooth expand/collapse (250ms ease-out), single-open behaviour | Product pages have long content blocks that would benefit from progressive disclosure; mobile experience needs collapsible sections | Accordion component exists; triggers are keyboard accessible; expand/collapse uses motion tokens; chevron rotates on open; only one panel open at a time | M | A1, A2, A6 |
| E9 | Badge / tag component | **MISSING — needs creation.** Create badge for certifications (ISO 9001, AS 9100D), industry tags, and product categories; small pill with subtle background colour | Certifications are mentioned in text but have no visual prominence; industry tags don't exist for cross-referencing | Badge component exists in 3 variants (certification, industry, category); consistent height (28px), padding (4px 12px), border-radius (4px) | S | A1, A2 |
| E10 | Contact form component | **EXISTS — needs restyle.** Align form inputs to token system: consistent height (48px), 8px radius, clear labels above inputs, focus ring from A1, proper error states using semantic error colour | Current form uses Elementor defaults with 4px radius and 40px height; focus states are unclear; no visible error state system | Form inputs use token-defined height, radius, focus colour; error messages use semantic error colour + discreet background; labels are above inputs; required fields marked with asterisk | M | A1, A5 |
| E11 | Breadcrumb component | **EXISTS — needs restyle.** Restyle: subtle grey background bar, home icon + text path, chevron separators, current page not linked | Breadcrumbs exist on inner pages but lack consistent styling and accessibility | Breadcrumbs appear on all inner pages; use `aria-current="page"` on current item; consistent grey background; separator is chevron SVG | S | A1, A2 |
| E12 | Alert / notification component | **MISSING — needs creation.** Create alert component with 4 semantic variants (info, success, warning, error); icon + text + optional dismiss button | No notification system exists for form validation feedback, cookie consent, or system messages | Alert component exists in 4 variants; each uses semantic colour + discreet background from A1; includes icon, text, and optional close button; ARIA role="alert" | S | A1 |

---

## Track F — Footer & Legal

| # | Task | What Changes | Why It Matters | Acceptance Criterion | Effort | Dependency |
|---|------|-------------|----------------|---------------------|--------|------------|
| F1 | Redesign multi-column footer | Replace current footer with 4-column layout: (1) Company info + social icons, (2) Products (4 categories as links), (3) Industries (top 6 as links) + Company (About, Careers, Support), (4) Contact details (phone, email, address); secondary nav items (News, Blog, Events) added here; golden accent top border retained; dark background (#1F1F1F) with light text | Current footer is minimal; secondary nav is misplaced in header; footer lacks the comprehensive navigation expected of a global industrial company | Footer has 4 columns on desktop, 2 on tablet, 1 stacked on mobile; all secondary nav items appear here; social icons present; golden top border retained; contact details complete | M | A1, A2, A3, B1 |
| F2 | Add trust bar to footer | Add horizontal trust bar above footer columns: ISO 9001 badge, AS 9100D badge, "30+ Years" mark, "3000+ Customers" mark; subtle divider separating trust bar from footer content | Trust certifications are currently buried on the Who We Are page; footer trust bar provides persistent credibility on every page | Trust bar visible on every page; contains ISO and AS 9100D badges; horizontally centred; subtle top/bottom borders separate it from content above and footer below | S | A1, F1 |
| F3 | Standardise legal footer | Create consistent legal footer bar below main footer: copyright text left, Privacy Policy + Terms & Conditions links right, developer credit removed or made subtle | Legal links are present but inconsistently styled; developer credit ("WEBBAZAAR") is prominent and unprofessional for a global-facing site | Legal bar appears on every page; copyright + legal links present; developer credit either removed or reduced to subtle text; year updates dynamically | S | A1, A2, F1 |

---

## Track G — Trust Architecture & Social Proof

| # | Task | What Changes | Why It Matters | Acceptance Criterion | Effort | Dependency |
|---|------|-------------|----------------|---------------------|--------|------------|
| G1 | Move trust signals above the fold | Place ISO 9001 + AS 9100D certification badges in hero section on homepage; position "30+ years | 3000+ customers" as a single line of proof text below the subheadline, not as animated counters | Trust signals currently appear only after scrolling past the hero; a global B2B prospect makes credibility judgements in the first 3 seconds; reference site establishes "global technology leader" immediately | Certification badges visible in hero without scrolling on both desktop and mobile; proof text appears below subheadline | S | D1 |
| G2 | Create trust signal map | Audit and redesign trust signal placement across all 46 pages; define which trust signals appear on which page types: certifications on every page (footer trust bar), client logos on homepage + industry pages, success story teasers on product pages, stats on homepage + about page | Trust signals are currently concentrated on homepage and Who We Are page; product and industry pages — where buying decisions happen — lack social proof | Every page type has at least one trust signal beyond the footer trust bar; product pages include 1–2 relevant success story teasers; industry pages include client logos from that industry | M | F2, E4, E5, E9 |
| G3 | Highlight defence & aerospace credentials | Create a dedicated trust section (or prominent callout) on homepage scroll journey featuring AS 9100D certification, DRDO/defence sector work, and aerospace client references; positioned before the product showcase | SANPAR's defence/aerospace credentials are their strongest global differentiator but are buried on inner pages; a prospect comparing against international competitors won't discover this unless they dig | Defence/aerospace credentials section appears on homepage; AS 9100D badge prominent; mentions aerospace/defence client work; appears before product showcase in scroll order | M | A1, A2, E9, D1 |
| G4 | Redesign success stories as proof points | Restructure success story teasers to lead with measurable results: "Saved ₹8.7 lakhs/month — Hindustan Motors" rather than client name first; add industry tag badge to each story | Current success stories are presented as narratives; the measurable business impact is buried in body text; reference site leads with statistics | All 8 success story cards lead with quantified result in headline; industry badge visible; result is readable without clicking through | S | E4, E9 |

**Trust signal current vs. recommended placement:**

| Trust Signal | Currently Appears | Should Appear |
|-------------|------------------|---------------|
| ISO 9001:2015 | Who We Are page body text | Hero (homepage), Footer trust bar (all pages), About page |
| AS 9100D (Aerospace) | Who We Are page body text | Hero (homepage), Footer trust bar (all pages), About page, Aerospace industry page hero |
| "30+ Years" stat | Homepage counter animation (below fold) | Homepage hero proof line, Footer trust bar |
| "3000+ Customers" stat | Homepage counter animation (below fold) | Homepage hero proof line, Footer trust bar |
| Client logos (44+) | Homepage — single dense section | Homepage (curated 16), Industry pages (relevant subset) |
| Success story results | Individual success story pages only | Product pages (relevant stories), Homepage (featured 3), Industry pages |
| Defence/Aerospace work | Aerospace industry page | Homepage (dedicated section), About page |
| Regional office network | Contact page only | Contact page, Footer |

**Earliest trust encounter:**
- **Current:** ~5–8 seconds (must scroll past hero to reach stat counters)
- **Target:** <3 seconds (certification badges + proof line visible in hero before scroll)

---

## Track H — Imagery & Media Strategy

| # | Task | What Changes | Why It Matters | Acceptance Criterion | Effort | Dependency |
|---|------|-------------|----------------|---------------------|--------|------------|
| H1 | Write photography style brief | Define SANPAR's photography direction: subject matter (products in factory/application context, engineers at work, clean facility environments), colour grading (cool industrial tones, high contrast, desaturated backgrounds), what to avoid (stock photos, cluttered backgrounds, outdated equipment) | Current images are a mix of product cutouts on white, stock photography, and low-resolution GIFs; inconsistent quality undermines credibility | Written brief with: 5+ subject matter guidelines, colour grading direction, show vs avoid lists, 3 described reference images | S | None |
| H2 | Standardise image aspect ratios | Define standard aspect ratios: hero backgrounds (16:9), product images (4:3), industry backgrounds (21:9), client logos (1:1 container), team/people photos (3:4) | Images currently have inconsistent dimensions; some stretch, some crop unpredictably; layout shifts occur on load | Every image type has a defined aspect ratio; all images render without layout shift; lazy loading implemented with explicit width/height attributes | M | B1 |
| H3 | Plan icon set replacement | Specify a consistent icon set: outline style, 24×24px base size, 1.5px stroke weight; identify all locations where icons are needed (navigation, product features, contact info, social media, footer) | No consistent icon system; current site uses mixed icon sources and sizes | Icon requirements documented by location; style specified (outline, 24px, 1.5px stroke); total icon count identified; icon library recommended (e.g. Lucide, Phosphor) | S | None |
| H4 | Define video/embed treatment | Specify treatment for embedded videos or media: 16:9 aspect ratio container, rounded corners (8px), optional caption below, lazy-loaded thumbnail | Technology page has downloadable content; future videos need consistent treatment | Video embed treatment documented; container specs defined; lazy loading behaviour specified | S | A5 |
| H5 | Audit alt text across all images | Review all 144 images for descriptive alt text; flag missing, generic, or inaccurate alt text; provide corrected alt text recommendations | Alt text quality is unknown; accessibility and SEO depend on accurate image descriptions | Every image has audited alt text; all missing alt text flagged with recommended copy; generic alt text ("image1", "photo") flagged for replacement | M | None |

**Photography style brief (H1 output):**

**Subject matter guidelines:**
1. Show products installed in real industrial environments — not isolated on white backgrounds
2. Capture engineers and technicians interacting with equipment — demonstrating human expertise
3. Feature clean, well-organised factory floors and labs — the precision environment
4. Document actual client installations with permission — real-world proof
5. Photograph the Bengaluru facility exterior and interior — establish physical presence

**Colour grading direction:**
- Cool industrial tones (steel blue, concrete grey)
- High contrast, sharp focus on product details
- Desaturated backgrounds with product as colour focal point
- Consistent warm white balance for indoor shots

**What to show:**
- Products in operation with compressed air systems
- Close-up mechanical detail (valves, gauges, filters)
- Engineers in safety gear performing precision work
- Defence/aerospace installation environments (clean rooms, hangars)

**What to avoid:**
- Generic stock photography of "business people shaking hands"
- Low-resolution or pixelated images
- Cluttered, disorganised backgrounds
- GIF animations for content that should be static imagery
- Watermarked or uncredited stock images

**3 reference images (described):**
1. A large refrigerated air dryer unit installed in a concrete-floored industrial facility, with steel piping visible, shot from a slight low angle to convey scale; cool blue-grey grading
2. A close-up of an engineer's hands adjusting a precision gauge on a control panel, shallow depth of field, warm workshop lighting; the engineer wears branded safety gear
3. An aerial/elevated view of a clean manufacturing floor with multiple product units in assembly, showing organisational precision and scale; neutral daylight grading

---

## Track I — Mobile Experience

| # | Task | What Changes | Why It Matters | Acceptance Criterion | Effort | Dependency |
|---|------|-------------|----------------|---------------------|--------|------------|
| I1 | Audit and fix tap target sizes | Review all interactive elements at 375px viewport; ensure minimum 44×44px tap targets for buttons, links, form inputs, navigation items | Small tap targets cause frustration and accessibility failures on mobile; industrial buyers increasingly use tablets and phones on factory floors | Every interactive element measures ≥44×44px at 375px viewport; verified via browser dev tools | M | C4, E10 |
| I2 | Optimise thumb-zone CTA placement | Ensure primary CTA ("Contact Us" / "Get a Quote") appears in bottom 40% of viewport on key mobile pages: homepage, product pages, contact page | CTAs placed at the top of mobile screens require thumb stretching; reference site positions CTAs within natural thumb reach | Primary CTA is positioned in bottom 40% of the visible viewport (without scrolling) on homepage, all product pages, and contact page at 375px | M | D1, D3, D5 |
| I3 | Define mobile content priority | For each page template, specify what changes between desktop and mobile: what gets hidden (move to accordion), what gets reordered (priority content first), what gets stacked (multi-column to single) | Elementor's responsive mode may hide important content or display it in suboptimal order; mobile visitors need the most important information first | Content priority matrix documented for each page template; tested at 375px; trust signals remain visible; no critical content hidden without alternative access path | M | B2 |
| I4 | Audit mobile trust signal adaptation | Verify that certification badges, client logos, and proof text remain legible and impactful on 375px viewport; resize or reposition as needed | Trust signals designed for desktop may become too small or get pushed below the fold on mobile | All trust signals visible on mobile (badges ≥32px height, logos ≥48px width); proof text in hero uses ≥14px font size; footer trust bar wraps gracefully to 2 rows | S | G1, G2, F2 |
| I5 | Test and fix mobile load performance | Audit page weight and load sequence at 375px on 3G throttle; flag images >200KB, uncompressed assets, render-blocking scripts; recommend lazy loading strategy | Industrial prospects in remote locations (factory sites, emerging markets) may have poor connectivity; heavy pages lose visitors | Target: <3s First Contentful Paint on 3G; all images below the fold lazy-loaded; total page weight <2MB; critical CSS inlined | L | H2 |

**Mobile audit findings (375px):**

| Element | Current State | Issue | Fix Required |
|---------|--------------|-------|-------------|
| Navigation | Elementor hamburger menu | Unknown accessibility; likely lacks focustrap | C4 addresses this |
| Hero headline | 64px H1 on mobile | Likely too large; may overflow or wrap awkwardly | D1 — reduce to 32–40px on mobile |
| Stat counters | Horizontal row of 4 | Likely too cramped at 375px; numbers may truncate | D2 — stack to 2×2 grid on mobile |
| Product cards | Unknown card width | May not adapt well to single column | E1 — full-width card on mobile |
| Client logos | 44+ in single section | Excessive scroll on mobile; many logos too small to read | E5 — limit to 8 on mobile, 2-column grid |
| Contact form | Unknown input sizing | Inputs may be too small for comfortable mobile entry | E10 — 48px height, full-width inputs |
| Spec tables | Unknown responsive treatment | Likely overflow or break layout | E7 — horizontal scroll with indicator |
| Footer | Unknown column treatment | Multi-column footer may stack poorly | F1 — single column accordion on mobile |

---

## Track J — Motion & Micro-interactions

| # | Task | What Changes | Why It Matters | Acceptance Criterion | Effort | Dependency |
|---|------|-------------|----------------|---------------------|--------|------------|
| J1 | Define scroll-triggered entrance animations | Apply subtle fade-up entrance (translateY 20px → 0, opacity 0 → 1, 400ms ease-out) to section headings, cards, and content blocks as they enter the viewport | Current site has no entrance animations; content appears abruptly; reference site uses subtle scroll-triggered entrances that create polish | Entrance animations trigger once per element on first viewport entry; animation uses tokens from A6; `prefers-reduced-motion` disables all entrance animations and shows content immediately | M | A6 |
| J2 | Define hover state system | Specify hover states for every interactive element: buttons (darken primary by 10%), cards (elevate shadow from subtle to medium), links (underline offset animation), nav items (bottom border slide-in) | Current site has minimal hover feedback; users lack confirmation that elements are interactive; reference site has comprehensive hover state system | Every interactive element has a visible hover state; transitions use 150ms duration from A6; hover states are CSS-only (no JS required) | M | A1, A4, A6 |
| J3 | Define button state system | Specify all button states: default, hover (darken), active (darken further + scale 0.98), focus (focus ring from A1), disabled (reduced opacity + no pointer) | Buttons currently have default and possibly hover; missing active, focus, and disabled states reduces usability and accessibility | All 3 CTA levels (primary, secondary, tertiary) have all 5 states defined and implemented; focus state uses visible focus ring | S | A1, A6, D5 |
| J4 | Implement stat counter animation | Refine counter animation: count-up from 0 to final value over 1.5s using ease-out curve; trigger on viewport entry using Intersection Observer; show final value if `prefers-reduced-motion` is active | Current counter animation exists but lacks refinement and accessibility consideration | Counters animate once on viewport entry; animation is smooth (60fps); `prefers-reduced-motion` shows final value with no animation; numbers display correctly at all viewport widths | S | A6, D2 |
| J5 | Define page transition behaviour | Specify consistent page load behaviour: fade-in of content (200ms), no full-page transition animations, scroll-to-top on page change | No page transition behaviour defined; pages may load with jarring layout shifts | Content fades in within 200ms of DOM ready; scroll position resets to top on navigation; no layout shift during page load (CLS < 0.1) | S | A6 |

**Motion risk assessment:**

| Task | Performance Risk | Requires prefers-reduced-motion | CWV Impact |
|------|-----------------|--------------------------------|------------|
| J1 — Scroll entrances | NO (CSS transforms are GPU-accelerated) | YES | None |
| J2 — Hover states | NO (CSS-only) | YES (for transitions) | None |
| J3 — Button states | NO (CSS-only) | YES (for transitions) | None |
| J4 — Counter animation | NO (JS + CSS, single trigger) | YES | None |
| J5 — Page transitions | NO (single fade) | YES | Low (fade adds 200ms to perceived load) |

---

## Track K — Content Tone & Messaging (AUDIT ONLY)

⚠️ **No copy has been rewritten. No alternatives have been suggested. This is a flagged list only.**

| Location (Page + Element) | Current Text (first 8 words) | Flag Reason | Recommended Action |
|--------------------------|------------------------------|-------------|-------------------|
| Homepage — Hero H1 | "Years of Engineering Excellence" | Generic; does not state what the company does; a global visitor learns nothing actionable in 5 seconds | Refer to copywriter |
| Homepage — Hero tagline | "Excellence Since 1994" | Heritage claim without specificity; "excellence" is an empty word in global B2B context | Refer to copywriter |
| Homepage — About section heading | "Excellence Since 1994" (repeated) | Repetition of tagline as section heading; wastes an opportunity to advance the narrative | Refer to copywriter |
| Who We Are — Hero H1 | "We are Solutionizers" | Invented word reads as informal/provincial; would not translate well for non-native English speakers entering global markets | Refer to copywriter |
| Who We Are — Mission | "Delivering innovative, cost-effective, and reliable thermal engineering..." | Stacks three adjectives that sound like marketing filler; "manufacturing fraternity" is colloquial and regionally specific | Refer to copywriter |
| Support & Services — H1 | "Aftercare Excellence" | "Excellence" used again (3rd instance); "aftercare" reads as consumer/retail language rather than industrial B2B | Refer to copywriter |
| Work With Us — H1 | "Empowering Growth, Inspiring Innovation" | Generic corporate phrasing that could apply to any company in any industry; undersells SANPAR's actual culture | Low risk — candidate for human revision |
| Work With Us — Section | "Inclusion, Collaboration, High Performance" | Aspirational but generic; doesn't reflect SANPAR's specific engineering culture | Low risk — candidate for human revision |
| Products & Solutions — H1 | "Products & Solutions" | Purely functional; misses opportunity to establish product leadership narrative | Low risk — candidate for human revision |
| Contact — CTA label | "Submit" (form button) | Generic; could be more action-oriented ("Send Enquiry", "Get in Touch") | Low risk — candidate for human revision |
| Footer — Company description | "Precision-engineered solutions in compressed air treatment..." | Solid but uses "trusted globally" without evidence on the same page; consider adding since/certification proof | Low risk — candidate for human revision |
| Homepage — Developer credit | "WEBBAZAAR" | Third-party developer credit in footer undermines professional appearance for global audience | Legal review before changing |
| Multiple pages — URL slug | "/our-prouct/" (misspelling) | "prouct" instead of "product" in URL slugs signals lack of attention to detail; visible to technical prospects | Legal review before changing |

---

# Phase 4 — Expert Review & Iteration

"As the senior designer, now acting as lead reviewer at a global design consultancy, I am entering Phase 4."

---

## 4.1 — Brand Principle Alignment Check

| Track | Alignment to "Precise, Proven, Commanding / Never Cluttered, Tentative, Provincial" | Flags |
|-------|-----------------------------------------------------------------------------------|-------|
| **A — Tokens** | Strong alignment. Token system enforces precision across all visual properties. Every value is deliberate, not arbitrary. | No flags. |
| **B — Layout** | Strong alignment. Grid discipline and content density audit directly address "never cluttered." Section rhythm variation creates commanding presence. | No flags. |
| **C — Navigation** | Strong alignment. Consolidating 11 header items to 7 eliminates clutter. Mega-menu with descriptions is commanding. | No flags. |
| **D — Hero** | Strong alignment. Redesigned hero addresses "never tentative" (clear value prop) and "never provincial" (global-grade composition). Trust signals above fold reinforce "proven." | No flags. |
| **E — Components** | Good alignment. Restyle tasks enforce precision through token adherence. Missing components (accordion, badges) add appropriate polish. | Flag: E5 (client logo grid) — ensure greyscale treatment doesn't make logos unrecognisable. Some industrial logos are already low-contrast. Recommendation: allow logos that are primarily grey/black to remain in original colour. |
| **F — Footer** | Strong alignment. Multi-column footer is commanding. Trust bar reinforces "proven." Dark background adds authority. | No flags. |
| **G — Trust** | Strong alignment. This is the most critical track for "proven." Moving trust signals above the fold and surfacing defence credentials directly addresses SANPAR's strongest differentiators. | No flags. |
| **H — Imagery** | Good alignment. Photography brief addresses "never provincial." | Flag: H1 brief recommends "cool industrial tones" — ensure this doesn't make the brand feel cold or unapproachable. SANPAR's warmth (31 years, family company feel) is an asset that should be preserved, not erased. Recommendation: allow warm tones in people-focused photography while maintaining cool tones for product/facility shots. |
| **I — Mobile** | Good alignment. Thumb-zone CTA placement and performance targets address commanding mobile presence. | No flags. |
| **J — Motion** | Good alignment. Subtle, purposeful motion reinforces precision. Reduced-motion support is essential. | Flag: Ensure entrance animations (J1) don't feel like a template — every element shouldn't animate the same way. Recommendation: vary animation delay (stagger) for cards in a grid; use fade-only (no translateY) for text-only sections. |
| **K — Content** | Strong alignment. Flags correctly identify "tentative" and "provincial" language patterns. | No flags. |

---

## 4.2 — Dependency Audit

### Dependency Check Results

**(a) Circular dependency check:**
No circular dependencies found. All dependency chains are acyclic.

**(b) Track A dependency check — every task touching colour, type, or spacing must list a Track A task:**

| Task | Touches | Track A Dependency | Status |
|------|---------|-------------------|--------|
| B1 | Spacing | A3 | ✅ |
| B2 | Spacing | A3 | ✅ |
| B3 | Spacing | A3 | ✅ |
| B4 | Spacing (implicit) | B1 → A3 | ✅ (transitive) |
| C1 | Colour, spacing | A1, A4 | ✅ |
| C2 | Colour | A1 (via C1) | ✅ (transitive) |
| C3 | — | C1 → A1 | ✅ (transitive) |
| C4 | Colour, spacing | C1 → A1 | ✅ (transitive) |
| C5 | Colour | A1 | ✅ |
| D1 | Colour, type, spacing | A1, A2, A3 | ✅ |
| D2 | Type, spacing | A2, A3 | ✅ |
| D3 | Colour, type, spacing | A1, A2, A3 | ✅ |
| D4 | Colour, type, spacing | A1, A2, A3 | ✅ |
| D5 | Colour, radius | A1, A5 | ✅ |
| E1–E12 | Various | All list A1 or A2 | ✅ |
| F1–F3 | Colour, type, spacing | A1, A2, A3 (via F1 → B1) | ✅ |
| G1–G4 | Colour (via referenced components) | Via D1, E4, E5, E9 → A1 | ✅ (transitive) |
| H2 | Layout | B1 → A3 | ✅ (transitive) |
| I1–I5 | Various | Via referenced components | ✅ (transitive) |
| J1–J5 | Motion | A6 | ✅ |

**(c) L-effort tasks scheduled before dependencies:**

| L-effort Task | Dependencies | All Dependencies ≤ M effort? | Status |
|--------------|-------------|-------------------------------|--------|
| B1 (12-col grid) | A3 (M) | ✅ Yes — A3 is M | ✅ |
| B3 (Content density) | A3 (M), B1 (L) | ⚠️ B1 is L | B1 must complete first; both are R2. Acceptable — they're in the same rollout phase. |
| D1 (Hero redesign) | A1 (M), A2 (M), A3 (M), A5 (S), B1 (L) | ⚠️ B1 is L | B1 must complete first; D1 is R2. Acceptable — correct dependency ordering maintained. |
| I5 (Mobile perf) | H2 (M) | ✅ Yes | ✅ |

**Dependency graph: clean.** No circular dependencies. All token dependencies satisfied. L-effort tasks correctly sequenced after their dependencies.

---

## 4.3 — Acceptance Criterion Audit

All acceptance criteria were reviewed for testability. The following required revision:

| Track | Task # | Issue | Revised Acceptance Criterion |
|-------|--------|-------|------------------------------|
| G2 | Trust signal map | "Every page type has at least one trust signal beyond the footer trust bar" — what counts as a trust signal needs definition | "Every page type has at least one of: certification badge, client logo, success story teaser, or stat counter — verified by visual inspection of each page template; footer trust bar does not count toward this minimum" |
| H1 | Photography brief | "Written brief with: 5+ subject matter guidelines..." — already testable but implicit in task description | No revision needed (criterion is in the task description; moved to AC field): "Brief document contains ≥5 subject matter guidelines, colour grading direction, show/avoid lists, and 3 described reference images" |
| I3 | Mobile content priority | "Content priority matrix documented" — needs definition of completeness | "Content priority matrix exists for all 5 page templates (homepage, product, industry, about, contact); each matrix specifies: items hidden on mobile, items reordered, items stacked; tested at 375px in Chrome DevTools" |

All other acceptance criteria are testable as written.

---

## 4.4 — Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| 1 | **SEO regression from URL changes** — Product URLs contain typo ("/our-prouct/") which may be corrected, breaking existing backlinks and search rankings | H | H | Implement 301 redirects from old URLs to new; submit updated sitemap to Google Search Console; monitor rankings for 30 days post-change |
| 2 | **Design system adoption failure** — Tokens defined (Track A) but developers continue using hardcoded values, creating drift between system and implementation | M | H | Enforce token usage via CSS linting rules (stylelint); document token usage in a living style guide; code review checklist includes "no hardcoded colour/size/spacing values" |
| 3 | **Mobile experience regression during desktop-first implementation** — Developers build desktop layouts first and retrofit mobile, causing mobile breakage during R2 | M | M | Require mobile-first CSS approach; mandate testing at 375px for every PR; include mobile screenshots in PR template; Track I tasks run concurrently with Tracks B–E |
| 4 | **Performance regression from new assets** — New imagery standards (H1) and entrance animations (J1) increase page weight and render time | L | M | Set performance budget: <2MB page weight, <3s FCP on 3G; lazy-load all below-fold images; use CSS transforms (GPU-accelerated) for animations; test with Lighthouse after each R2 milestone |
| 5 | **Loss of existing user familiarity** — Regular customers and distributors who navigate the current site by muscle memory may be disoriented by navigation restructuring (C1–C4) | M | L | Maintain same primary nav labels (Home, About Us, Products, Industries, Support, Contact); keep URL structure stable (except typo fix with redirects); consider subtle "new site" banner for 30 days post-launch |

---

## 4.5 — Protected Content List

| Content Item | Location | Reason for Protection |
|-------------|----------|----------------------|
| ISO 9001:2015 certification claim | Who We Are page, Footer trust bar | Accreditation claim — must match current certification status exactly; any change requires legal verification |
| AS 9100 D (EN 9100:2018) certification claim | Who We Are page, Footer trust bar, Aerospace industry page | Aerospace certification — regulated claim; must match certificate wording exactly |
| Product specifications and technical data | All 14 product pages (CFM ranges, bar ratings, temperature tolerances, ISO standards) | Engineering specifications are contractual — any inaccuracy creates liability; changes require engineering sign-off |
| Medical device compliance claims | CAT M1 Series (ISO 8573.1 Class 1), CAT DTH Series (BS EN12021:2014) | Medical device standards compliance — regulated claims; misrepresentation has legal and safety consequences |
| Product pricing | Ecodrair (₹38K–135K), Filters (₹5.6K–273K), Moisture Separator (₹5.6K–19K), Drains (₹600–4.5K) | Pricing is commercially sensitive; changes require sales team approval |
| Client names and success story claims | All 8 success stories (Hindustan Motors, Hical, Excel Glass, Infosys, JMT Auto, GTRE, Ashok Leyland, Jindal Steel) | Client references may be under NDA or require client approval for use; monetary savings claims (₹8.7 lakhs/month) must be verifiable |
| Privacy Policy | `/privacy-policy/` | Legal document effective Jul 14, 2025 — changes require legal review |
| Terms & Conditions | `/terms-and-conditions/` | Legal document effective Jul 14, 2025 — changes require legal review |
| Company registration details | Contact page (address, phone, fax) | Legal entity information — must match government registration records |
| Defence sector client references | Aerospace & Defence page, Success stories (Gas Turbine Research Establishment) | Defence work references may be subject to classification restrictions; changes require security review |
| SLA and warranty commitments | Support & Services page ("48 hours" spare parts dispatch, "1-year warranty", "lifetime support") | Service commitments are contractual; changes require operations and legal approval |
| Employee count and company statistics | Homepage stats (30+ years, 200+ employees, 14+ products, 3000+ customers) | Statistical claims must be current and verifiable; changes require management approval |

---

## 4.6 — Phased Rollout Sequence

### PHASE R1 — Quick Wins

**Criteria:** Ships within 1 week, no foundational dependency, immediate visible improvement, zero content risk.

| Task | Track | Effort | Description |
|------|-------|--------|-------------|
| A5 | Tokens | S | Define border-radius tokens |
| A6 | Tokens | S | Define motion/easing tokens |
| A7 | Tokens | S | Define z-index scale |
| C3 | Navigation | S | Consolidate secondary navigation (move to footer) |
| C5 | Navigation | S | Add skip-to-content link |
| E11 | Components | S | Restyle breadcrumb component |
| H1 | Imagery | S | Write photography style brief |
| H3 | Imagery | S | Plan icon set replacement |
| H4 | Imagery | S | Define video/embed treatment |

**Total effort:** 9 tasks — 9S
**Estimated calendar time:** 3–4 days for a 2-person team
**End-of-phase state:** "The site has cleaner navigation (fewer header items), consistent corner rounding, accessibility improvements (skip link, breadcrumbs), and a clear photography direction — the clutter is beginning to clear, and the foundation for bigger changes is set."

---

### PHASE R2 — Foundational Changes

**Criteria:** Requires Track A core tokens to be complete, 1–4 weeks, restructures layout or component patterns.

| Task | Track | Effort | Description |
|------|-------|--------|-------------|
| A1 | Tokens | M | Define colour palette tokens |
| A2 | Tokens | M | Define typography scale tokens |
| A3 | Tokens | M | Define spacing scale tokens |
| A4 | Tokens | S | Define shadow/elevation tokens |
| B1 | Layout | L | Implement 12-column responsive grid |
| B2 | Layout | M | Define responsive breakpoints |
| B3 | Layout | L | Audit and fix content density |
| B4 | Layout | M | Standardise content widths |
| C1 | Navigation | M | Redesign sticky header |
| C2 | Navigation | L | Build mega-menu for Products |
| C4 | Navigation | M | Implement mobile navigation drawer |
| D1 | Hero | L | Redesign homepage hero composition |
| D2 | Hero | M | Separate stats section from hero |
| D3 | Hero | M | Define hero template for product pages |
| D4 | Hero | M | Define hero template for industry pages |
| D5 | Hero | M | Redesign CTA button hierarchy |
| E1 | Components | M | Restyle product card component |
| E2 | Components | M | Restyle industry card component |
| E3 | Components | M | Restyle stats counter component |
| E4 | Components | S | Restyle success story card |
| E5 | Components | M | Restyle client logo grid |
| E6 | Components | M | Create testimonial/quote component |
| E7 | Components | M | Restyle specification table component |
| E8 | Components | M | Create accordion component |
| E9 | Components | S | Create badge/tag component |
| E10 | Components | M | Restyle contact form component |
| E12 | Components | S | Create alert/notification component |
| F1 | Footer | M | Redesign multi-column footer |
| F2 | Footer | S | Add trust bar to footer |
| F3 | Footer | S | Standardise legal footer |
| G1 | Trust | S | Move trust signals above the fold |
| G2 | Trust | M | Create trust signal map |
| G3 | Trust | M | Highlight defence/aerospace credentials |
| G4 | Trust | S | Redesign success stories as proof points |
| H2 | Imagery | M | Standardise image aspect ratios |
| H5 | Imagery | M | Audit alt text across all images |
| I1 | Mobile | M | Audit and fix tap target sizes |
| I2 | Mobile | M | Optimise thumb-zone CTA placement |
| I3 | Mobile | M | Define mobile content priority |
| I4 | Mobile | S | Audit mobile trust signal adaptation |

**Total effort:** 40 tasks — 10S, 24M, 6L
**Estimated calendar time:** 4–6 weeks for a 2-person team
**End-of-phase state:** "The site looks and feels like a different company — a global industrial leader. Navigation is clean and purposeful. The homepage immediately communicates what SANPAR does, why they're credible, and what to do next. Every page has consistent typography, spacing, and colour. Products are easy to find. Trust signals are prominent. The mobile experience is reliable."

---

### PHASE R3 — Advanced Polish

**Criteria:** Requires R1 + R2 complete, 4–8 weeks, motion, advanced interactions, full mobile optimisation.

| Task | Track | Effort | Description |
|------|-------|--------|-------------|
| J1 | Motion | M | Define scroll-triggered entrance animations |
| J2 | Motion | M | Define hover state system |
| J3 | Motion | S | Define button state system |
| J4 | Motion | S | Implement stat counter animation |
| J5 | Motion | S | Define page transition behaviour |
| I5 | Mobile | L | Test and fix mobile load performance |

**Total effort:** 6 tasks — 3S, 2M, 1L
**Estimated calendar time:** 2–3 weeks for a 2-person team
**End-of-phase state:** "The site doesn't just look professional — it feels alive. Interactions are smooth and intentional. Pages load fast on any connection. Every hover, scroll, and click confirms that this is a company that sweats the details — because that's exactly what their engineering demands."

---

# Executive Summary

## The Problem

A potential global customer visiting sanpar.com today encounters a website that says "Excellence Since 1994" but looks like it was built last year by a template. The hero headline doesn't explain what the company does. Trust signals — including aerospace certification and defence sector credentials — are buried on inner pages that most visitors will never reach. Forty-four client logos are crammed into a single section, reading as eagerness rather than prestige. Pill-shaped buttons, animated GIF timelines, and a navigation bar with eleven items create visual noise that undermines the very precision SANPAR's products deliver at ±1°C tolerance. A procurement officer at an aerospace firm comparing SANPAR against a European competitor will close the tab within five seconds — not because the products are inferior, but because the website signals a regional supplier, not a global partner. Every day this gap persists, SANPAR pays an invisible tax on its global ambition.

## The Transformation

After this plan is executed, sanpar.com will project the authority of a company that has been trusted by defence research establishments and Fortune 500 manufacturers for three decades. A visitor will land on a homepage that immediately states what SANPAR builds, shows aerospace and ISO certifications before they scroll, and offers a single clear path to explore solutions or make contact. Every page will breathe — generous spacing, disciplined typography, and a consistent component system will replace the current visual clutter. Product pages will lead with specifications in professional data tables. Industry pages will feature relevant case studies with measurable results. The mobile experience will be fast, purposeful, and designed for engineers on factory floors. The site will feel precise, proven, and commanding — matching the calibre of the equipment SANPAR designs and manufactures. This transformation enables SANPAR to compete for international contracts, support the defence systems bifurcation, and convert global prospects who currently disengage at first impression.

## The First Step

The single most important first action is Task A1: defining the colour palette tokens. Every visual change in this plan — from the hero redesign to the footer trust bar to the mobile CTA placement — depends on a systematic colour foundation that replaces the current seven hardcoded values with a structured palette including a neutral grey scale and semantic status colours. This task takes a half-day (2–4 hours) of design decision-making and token documentation. Until it is complete, no track can begin implementation without introducing values that will need to be changed later. Define the colours first; everything else follows.
