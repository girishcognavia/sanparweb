# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **website data extraction and archival project** for SANPAR Industries Pvt. Ltd (sanpar.com) — a compressed air treatment solutions company based in Bengaluru, India. The repo contains scraped content, structured data, and tools to support a major website redesign initiative documented in PLAN.md.

This is NOT a frontend application repo. There is no build system, no package.json, no framework. It is a Python-based data pipeline that scrapes, processes, and serves archived website content.

## Script Pipeline

Scripts are designed to run sequentially:

```
scraper.py → fix-gaps.py → fix-paths.py → screenshot.py → mirror.py → serve.py OR server.py
```

| Script | Command | Purpose |
|--------|---------|---------|
| `scraper.py` | `python scraper.py` | Scrape all 46 pages from sanpar.com; outputs raw HTML, JSON, images |
| `fix-gaps.py` | `python fix-gaps.py` | Enrich JSON with Elementor sections, breadcrumbs, local image paths |
| `fix-paths.py` | `python fix-paths.py` | Map all image URLs to local file paths in all JSON files |
| `screenshot.py` | `python screenshot.py` | Capture full-page screenshots via Playwright (requires `playwright install`) |
| `mirror.py` | `python mirror.py` | Build fully offline-browsable mirror with rewritten URLs |
| `serve.py` | `python serve.py` | Serve offline mirror at http://localhost:3456 |
| `server.py` | `python server.py` | Serve interactive data viewer dashboard at http://localhost:3456 |

Both `serve.py` and `server.py` bind to port 3456 — only run one at a time.

## Python Dependencies

- `requests`, `beautifulsoup4`, `lxml` — used by scraper, mirror, fix scripts
- `playwright` — used only by screenshot.py (requires `playwright install chromium`)

No requirements.txt exists. Scripts import directly.

## Data Architecture

**Master data file:** `all-content.json` (~3.1 MB) — contains all 46 pages keyed by slug (e.g., `homepage`, `prod-water-chillers`, `ind-aerospace-defence`, `story-hindustan-motors`).

**Per-page JSON structure:**
- `url`, `title`, `meta_description`, `og_image`
- `headings` (with level), `paragraphs`, `lists`, `links`, `images`, `buttons`
- `sections` (Elementor container structure with nested content)
- `breadcrumbs`, `structured_data` (JSON-LD), `raw_text`

**Key config files:**
- `data/site-config.json` — Design system tokens (colours, typography, spacing, buttons, forms), company info, platform details
- `data/navigation.json` — Full site navigation tree (6 primary items, secondary nav, footer nav, success stories list)

**Content organized in `data/` subdirectories:**
- `data/products/` — 14 product JSON files + index
- `data/industries/` — 10 industry JSON files + index
- `data/success-stories/` — 8 case study JSON files + index

## Key Files

- `PLAN.md` — Comprehensive design transformation plan (55 tasks across 11 tracks, phased rollout). This is the primary strategic document.
- `REFERENCE.md` — Quick-reference company overview, design system summary, product/industry listings, file structure guide.
- `data/site-config.json` — Source of truth for current design tokens (primary: `#060097`, secondary: `#c10fff`, accent: `#ffcd57`; fonts: Inter body, Plus Jakarta Sans headings).

## Important Context

- The live site (sanpar.com) runs WordPress + Astra theme + Elementor + WooCommerce. This repo archives its content, not its codebase.
- PLAN.md references ABB (abb.com) as the design quality benchmark. The goal is elevating SANPAR's visual standard, not copying ABB.
- Product URLs on the live site contain a typo: `/our-prouct/` instead of `/our-product/`. This is preserved in the data.
- The repo focuses on the **main branch only**. Sub-tree branches contain the same data with alternative designs — ignore them.
- All content in the data files is protected — do not modify company claims, certifications (ISO 9001:2015, AS 9100D), pricing, or client references without explicit approval.
