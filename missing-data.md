# SANPAR Website — Missing Data & Content Guide

This document lists all content/data that was present on the original website (sanpar.com) but was missing in the new design. These have now been added to the codebase. Use this as a reference when building or extending the SANPAR website to ensure nothing is left behind.

---

## 1. Real Success Stories (Previously Fake Case Studies)

**Location:** `data/caseStudies.ts`
**Page:** `/case-studies` and `/case-studies/[slug]`

The original website had 8 real client success stories. These were previously replaced with 3 fake marketing case studies (SaaS rebrand, pharma LinkedIn, website redesign) which had nothing to do with SANPAR.

### Correct Client List (from sanpar.com):
1. **Hindustan Motors** — Automobile industry, compressed air treatment
2. **HiCal Technologies** — Manufacturing, precision air treatment
3. **Excel Glass** — Manufacturing, industrial cooling + compressed air
4. **Infosys Technologies Ltd** — IT & Technology, precision air conditioning
5. **JMT Auto Ltd** — Automobile, paint shop compressed air
6. **Gas Turbine Research Establishment (GTRE/DRDO)** — Aerospace & Defence, defence-grade systems
7. **Ashok Leyland Ltd** — Automobile, high-capacity air treatment
8. **Jindal Steel & Power Limited, Raigarh** — Manufacturing, heavy-duty continuous operation

Each success story should include: industry, services provided, key result metric, challenge, approach, solution, and measurable results.

---

## 2. Company Statistics (Real Data)

**Location:** `data/company.ts` → `stats` object
**Used in:** `components/home/StatsBar.tsx`

| Stat | Correct Value | Label |
|------|--------------|-------|
| Years | 31+ | Years of Engineering Excellence |
| Employees | 100+ | Our Employees |
| Products | 50+ | Our Products |
| Customers | 3500+ | Our Customers |

**Previously wrong:** 32+ Years, 200+ Products, 40+ Clients, 14 Industries

---

## 3. Full Company Address

**Location:** `data/company.ts` → `address`
**Used in:** `components/layout/Footer.tsx`, `app/contact/page.tsx`

**Correct (full) address:**
```
SANPAR Industries Pvt. Ltd.
Plot No.4, 2nd Cross
KSSIDC Industrial Estate
Bommasandra 2nd Stage
Bengaluru - 560 099, India
```

**Previously had:** "Bommasandra Industrial Estate, Bengaluru, Karnataka, India" (incomplete)

---

## 4. Contact Details

**Location:** `data/company.ts`

| Field | Value |
|-------|-------|
| Phone | +91 73491 42424 |
| Fax | +91 80 4343 5959 |
| Email | enquiry@sanpar.com |

**Note:** The second phone number is actually a **fax number**, not an alternate phone. The field was renamed from `phoneAlt` to `fax`.

---

## 5. Social Media Links (Missing Platforms)

**Location:** `data/company.ts` → `social`
**Used in:** `components/layout/Footer.tsx`

| Platform | Present Before? | URL |
|----------|----------------|-----|
| LinkedIn | Yes | https://www.linkedin.com/company/sanpar-industries |
| Twitter/X | Yes | https://x.com/SANPARindia |
| YouTube | Yes | https://www.youtube.com/channel/UCtD9fjNAP-VTtvyApCV8juw |
| Facebook | Yes | https://www.facebook.com/sanparindustries/ |
| **Instagram** | **NO — was missing** | https://www.instagram.com/sanparindustries/ |
| **Pinterest** | **NO — was missing** | https://www.pinterest.com/sanparindustries/ |

---

## 6. Company Tagline

**Location:** `data/company.ts` → `tagline`

**Correct:** "Excellence Since 1994"
**Previously had:** "Precision-Engineered Thermal Solutions Since 1994"

---

## 7. Industries — Only 10 (Not 14)

**Location:** `data/industries.ts`
**Page:** `/industries` and `/industries/[slug]`

The original website lists exactly **10 industries**. The new design had incorrectly added 4 extra industries.

### Correct 10 Industries:
1. Aerospace & Defence
2. Pharmaceutical
3. Food & Beverage
4. Machine Tools
5. Manufacturing
6. Energy & Power
7. Cement
8. Chemical
9. Plastics
10. Textile

### Removed (not on original):
- ~~Automobile~~
- ~~Painting & White Goods~~
- ~~Fertilizer~~
- ~~Airport Operations~~

---

## 8. Products — Only 15 (Not 16)

**Location:** `data/products.ts`
**Page:** `/products` and `/products/[slug]`

### Correct Product List (4 categories, 15 products):

**Compressed Air Treatment (7):**
1. ECODRAIR Series
2. XEROS Series
3. Adsorption Based Compressed Air Dryers
4. Compressed Air Filters
5. Aftercooler
6. Centrifugal Moisture Separator
7. Drains

**Industrial Cooling (3):**
8. Air Chillers
9. Water Chillers
10. Coolant Chillers

**Industrial Air Conditioning (2):**
11. Precision Air Conditioner
12. Dehumidifier (Xerion)

**Medical Desiccant Dryers (2):**
13. CAT DTH Series
14. CAT M1 Series

### Removed (not on original):
- ~~Oil Chillers~~ (was incorrectly added)

---

## 9. Items Removed (Were NOT on Original Website)

These items existed in the new design but have NO equivalent on sanpar.com and were removed:

| Item | What It Was | Where It Was |
|------|------------|-------------|
| **Defence page** (`/defence`) | Dedicated defence microsite | `app/defence/page.tsx` — deleted |
| **Defence nav badge** | Orange "Defence" button in navbar | `components/layout/Navbar.tsx` — removed |
| **Defence mobile menu item** | Defence link in mobile nav | `components/layout/MobileMenu.tsx` — removed |
| **DefenceSpotlight** | Homepage section promoting defence | `app/page.tsx` — removed from render |
| **SANPAR Defence Systems entity** | `defenceEntity` field in company data | `data/company.ts` — removed |
| **Defence in search** | Defence Systems in command palette & search API | Both files — removed/replaced |

**Note:** Aerospace & Defence **as an industry** is still present — it's a real industry SANPAR serves. What was removed is the dedicated Defence microsite/page/branding that doesn't exist on the original website.

---

## 10. Pages on Original Not Yet in New Design

These pages exist on sanpar.com but are NOT yet built in the new design. Consider adding them in future iterations:

| Page | URL on Original | Priority |
|------|----------------|----------|
| Events | sanpar.com/events/ | Medium |
| News | sanpar.com/news/ | Medium |
| Shop / E-commerce | sanpar.com/shop/ | Low (WooCommerce on original) |
| Register | sanpar.com/register/ | Low |
| Privacy Policy | sanpar.com/privacy-policy/ | High (legal requirement) |
| Terms & Conditions | sanpar.com/terms-and-conditions/ | High (legal requirement) |
| Job Openings (specific listings) | sanpar.com/job-openings/ | Medium |

---

## 11. Navigation Labels

| Section | Original Website Label | New Design Label |
|---------|----------------------|-----------------|
| About | Who We Are | About Us |
| Products | Products & Solutions | Products |
| Industries | Industries & Applications | Industries |
| Success Stories | Success Stories | Success Stories (was "Case Studies") |
| Support | Support & Service | Support |
| Careers | Work With Us | Careers |
| Blog/News | Events / News / Blogs (separate) | Insights (combined) |

---

## Quick Reference: Files Modified

| File | Changes Made |
|------|-------------|
| `data/company.ts` | Fixed tagline, address, fax label, social links, removed defenceEntity |
| `data/products.ts` | Removed Oil Chillers |
| `data/industries.ts` | Removed 4 extra industries |
| `data/caseStudies.ts` | Replaced 3 fake with 8 real success stories |
| `data/navigation.ts` | Removed Oil Chillers nav, Defence footer link, renamed Case Studies |
| `components/layout/Navbar.tsx` | Removed Defence badge |
| `components/layout/MobileMenu.tsx` | Removed Defence mobile link |
| `components/layout/Footer.tsx` | Added Instagram, fixed fax label |
| `components/layout/CommandPalette.tsx` | Removed Defence, updated counts |
| `components/home/ProductsOverview.tsx` | Removed Oil Chillers reference |
| `components/home/CompanyStoryTeaser.tsx` | Updated milestones and stats |
| `app/page.tsx` | Removed DefenceSpotlight |
| `app/products/page.tsx` | Removed Oil Chiller from hero images |
| `app/case-studies/page.tsx` | Renamed to Success Stories |
| `app/case-studies/[slug]/page.tsx` | Updated breadcrumb |
| `app/api/search/route.ts` | Removed Defence, added Success Stories |
| `app/defence/` | **Deleted entirely** |
