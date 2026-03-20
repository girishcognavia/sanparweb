#!/usr/bin/env python3
"""Fix unmapped local_path references in all JSON files."""

import json
import os
from pathlib import Path

ROOT = Path(__file__).parent

# Build comprehensive filename->local_path mapping
image_map = {}
for img in (ROOT / "images").rglob("*"):
    if img.is_file():
        rel = str(img.relative_to(ROOT)).replace("\\", "/")
        image_map[img.name] = rel

print(f"Image map has {len(image_map)} entries")

# Load master JSON
with open(ROOT / "all-content.json", "r", encoding="utf-8") as f:
    all_data = json.load(f)

fixed = 0
for page_name, content in all_data.items():
    for img in content.get("images", []):
        if not img.get("local_path"):
            src = img.get("src", "")
            if src:
                fname = os.path.basename(src.split("?")[0])
                if fname in image_map:
                    img["local_path"] = image_map[fname]
                    fixed += 1
                else:
                    # Try partial match
                    base = fname.rsplit(".", 1)[0] if "." in fname else fname
                    for key, val in image_map.items():
                        key_base = key.rsplit(".", 1)[0] if "." in key else key
                        if base and key_base and (base == key_base or key_base.startswith(base) or base.startswith(key_base)):
                            img["local_path"] = val
                            fixed += 1
                            break

# Save updated master
with open(ROOT / "all-content.json", "w", encoding="utf-8") as f:
    json.dump(all_data, f, indent=2, ensure_ascii=False)

# Also update individual JSON files
DATA_DIR = ROOT / "data"
file_key_map = {}
for name in all_data:
    if name.startswith("prod-"):
        file_key_map[DATA_DIR / "products" / f"{name.replace('prod-', '')}.json"] = name
    elif name.startswith("ind-"):
        file_key_map[DATA_DIR / "industries" / f"{name.replace('ind-', '')}.json"] = name
    elif name.startswith("story-"):
        file_key_map[DATA_DIR / "success-stories" / f"{name.replace('story-', '')}.json"] = name
    else:
        file_key_map[DATA_DIR / f"{name}.json"] = name

updated_files = 0
for filepath, key in file_key_map.items():
    if filepath.exists() and key in all_data:
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(all_data[key], f, indent=2, ensure_ascii=False)
        updated_files += 1

# Count current state
total_imgs = 0
mapped_imgs = 0
unmapped_urls = set()
for page_name, content in all_data.items():
    for img in content.get("images", []):
        total_imgs += 1
        if img.get("local_path"):
            mapped_imgs += 1
        else:
            unmapped_urls.add(img.get("src", ""))

print(f"Fixed {fixed} additional local_path mappings")
print(f"Updated {updated_files} individual JSON files")
print(f"Total images referenced: {total_imgs}")
print(f"With local_path: {mapped_imgs} ({mapped_imgs*100//total_imgs}%)")
print(f"Without local_path: {total_imgs - mapped_imgs}")
if unmapped_urls:
    print(f"\nRemaining unmapped unique URLs ({len(unmapped_urls)}):")
    for url in sorted(unmapped_urls):
        fname = os.path.basename(url) if url else "(empty)"
        print(f"  {fname}")
