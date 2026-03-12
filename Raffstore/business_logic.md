# Raffstore Business Logic and Rules

## Dimension Limits
The configurator enforces the following size constraints:
- **Width (Breite):** 800 mm to 4000 mm
- **Height (Höhe):** 800 mm to 2500 mm

## Conditional Logic (Based on `rules.min.js`)
- **Type-Based Model Visibility:**
  - `typ1` (Aufsatz): Shows models `m1`, `m2` (ZF-S Kasten).
  - `typ2` (Vorsatz): Shows models `m3`, `m4` (ZF-A Kasten).
- **Putzleiste Availability:**
  - `typ1` (Aufsatz): Putzleiste options are hidden (`collapse`).
  - `typ2` (Vorsatz): Putzleiste options are visible.
- **Antrieb (Motor) vs. Steuerung:**
  - If `aa_1` (Standard Motor) is selected, the `steuerung` (Smart Home) section is visible.
  - If other motors are selected, the `steuerung` section is hidden and reset to `st_0` (None).
- **Color Matching:**
  - By default, the slat color (`fe`) is set to match the box/rail color (`fkf`).
  - The UI allows manual override of the slat color.

## Price Calculation Logic
- **Discount:** A flat **40% discount** is applied to the "Old Price" (Preisempfehlung).
- **Formula:** `New Price = Old Price * 0.6`.
- **Surcharges:** Most upgrades (300mm box, Z-90 slats, RAL colors) have a uniform surcharge of **31,43 €** (Old Price) at the base size. This suggests a fixed percentage of the base price or a category-based flat fee.
- **API Communication:** The frontend sends the `obj_konfig` JSON object to `/ajax/berechnen/` and receives the updated HTML for the sidebar.
