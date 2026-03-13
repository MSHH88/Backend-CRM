# Gealan Schiebetür Business Logic and Rules

## Dimension Limits
The configurator enforces the following size constraints for GEALAN-SMOOVIO:
- **Width (Breite):** 1550 mm to 4000 mm
- **Height (Höhe):** 800 mm to 2500 mm

## Conditional Logic (Based on `rules.min.js`)
- **Material-Based Profiles:**
  - `ma1` (Kunststoff): Shows GEALAN-SMOOVIO (`p1`).
  - `ma2` (Aluminium): Shows Aluminium profiles (e.g., MB-77HS).
- **Type-Based Opening Directions:**
  - `typ1` (2-Flügel): Shows 2-flügel opening directions (`pvc2_ss_sr`, `pvc2_ss_sl`).
  - `typ3` (4-Flügel): Shows 4-flügel opening directions.
- **Color Compatibility:**
  - Standard colors (Weiss, Anthrazitgrau, etc.) are available for both inside and outside.
  - Surcharges for colors are calculated based on the surface area of the profile.
- **Glass Options:**
  - 2-fach and 3-fach verglasung are available.
  - Warme Kante (Swisspacer) is an additional surcharge.
  - Surcharges for glass are calculated based on the total glass area (m²).

## Price Calculation Logic
- **Discount:** A flat **40% discount** is applied to the "Old Price" (Preisempfehlung).
- **Formula:** `New Price = Old Price * 0.6`.
- **Surcharges:** Surcharges for colors, glass, and hardware are added to the base price before the discount is applied.
- **API Communication:** The frontend sends the `obj_konfig` JSON object to `/ajax/berechnen/` and receives the updated HTML for the sidebar.
