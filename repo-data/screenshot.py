#!/usr/bin/env python3
"""
SANPAR Website Screenshot Capture
Takes full-page screenshots of all pages using Playwright.
"""

import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

OUTPUT_DIR = Path(__file__).parent / "screenshots"
BASE_URL = "https://sanpar.com"

PAGES = {
    "homepage": "/",
    "who-we-are": "/who-we-are/",
    "contact-us": "/contact-us/",
    "products-solutions": "/products-solutions/",
    "industries-applications": "/industries-applications/",
    "support-service": "/support-service/",
    "technology": "/technology/",
    "work-with-us": "/work-with-us/",
    "success-stories": "/success-stories/",
    "news": "/news/",
    "blogs": "/blogs/",
    "events": "/events/",
    # Industries
    "ind-aerospace-defence": "/industries-applications/aerospace-and-defence/",
    "ind-machine-tools": "/industries-applications/machine-tools/",
    "ind-pharmaceutical": "/industries-applications/pharmaceutical/",
    "ind-cement": "/industries-applications/cement-industry/",
    "ind-textile": "/industries-applications/textile-industry/",
    "ind-food-beverage": "/industries-applications/food-beverage-industry/",
    "ind-plastics": "/industries-applications/plastics-industry/",
    "ind-manufacturing": "/industries-applications/manufacturing-industry/",
    "ind-energy-power": "/industries-applications/energy-power-industry/",
    "ind-chemical": "/industries-applications/chemical-indsutry/",
    # Products
    "prod-water-chillers": "/our-prouct/water-chillers/",
    "prod-cat-m1-series": "/our-prouct/cat-m1-series/",
    "prod-dehumidifier": "/our-prouct/dehumidifier/",
    "prod-precision-ac": "/our-prouct/precision-air-conditioner/",
    "prod-air-chillers": "/our-prouct/air-chillers/",
    "prod-moisture-separator": "/our-prouct/centrifugal-moisture-separator/",
    "prod-aftercooler": "/our-prouct/aftercooler/",
    "prod-compressed-air-filters": "/our-prouct/compressed-air-filters/",
    "prod-adsorption-dryers": "/our-prouct/adsorption-based-compressed-air-dryers/",
    "prod-xeros-series": "/our-prouct/xeros-series/",
    "prod-cat-dth-series": "/our-prouct/cat-dth-series/",
    "prod-drains": "/our-prouct/drains/",
    "prod-coolant-chillers": "/our-prouct/coolant-chillers/",
    "prod-ecodrair-series": "/our-prouct/ecodrair-series/",
    # Success stories
    "story-hindustan-motors": "/success-stories/hindustan-motors/",
    "story-infosys": "/success-stories/infosys-technologies-ltd/",
    "story-ashok-leyland": "/success-stories/ashok-leyland-ltd/",
    "story-jindal-steel": "/success-stories/jindal-steel-power-limited-raigarh/",
}


async def capture_screenshots():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    total = len(PAGES)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": 1440, "height": 900},
            device_scale_factor=1,
        )

        page = await context.new_page()

        for i, (name, path) in enumerate(PAGES.items(), 1):
            url = f"{BASE_URL}{path}"
            filepath = OUTPUT_DIR / f"{name}.png"

            print(f"[{i}/{total}] Capturing: {name}...")
            try:
                await page.goto(url, wait_until="networkidle", timeout=30000)
                # Wait a moment for animations/lazy-loaded content
                await page.wait_for_timeout(2000)
                # Scroll down to trigger lazy loading
                await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                await page.wait_for_timeout(1500)
                await page.evaluate("window.scrollTo(0, 0)")
                await page.wait_for_timeout(500)
                # Take full-page screenshot
                await page.screenshot(path=str(filepath), full_page=True)
                size = filepath.stat().st_size
                print(f"  [OK] Saved: {name}.png ({size:,} bytes)")
            except Exception as e:
                print(f"  [ERROR] {name}: {e}")

        await browser.close()

    print(f"\nScreenshot capture complete! ({total} pages)")


if __name__ == "__main__":
    asyncio.run(capture_screenshots())
