# Insektenschutz Plissee — Dataset Analysis

> **Date:** March 11, 2026 (initial), **March 12, 2026** (expanded with 4 new files)
> **Source:** CEO-uploaded dataset (Datasets branch → `Insektenschutz/`)
> **Product:** Aluminium Insektenschutz-Plissee (Insect Protection Pleated Doors)
> **Manufacturer:** Drutex
> **Configurator:** fenstermaxx24.com
> **Files Analyzed (March 11):** `insektenschutz_plissee_data.js`, `insektenschutz_plissee_data.py`, `insektenschutz_plissee_data.txt`
> **Files Analyzed (March 12 — NEW):** `insektenschutz_plissee_size_price_matrix.txt`, `insektenschutz_plissee_colors_options.txt`, `insektenschutz_plissee_api.txt`, `insektenschutz_plissee_complete_research.txt`

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Overview](#2-product-overview)
3. [Pricing Architecture](#3-pricing-architecture)
4. [Plissee Types](#4-plissee-types)
5. [Surcharges & Options](#5-surcharges--options)
6. [Dimension Constraints](#6-dimension-constraints)
7. [Size-Based Price Variations](#7-size-based-price-variations)
8. [Comparison with Rollladen Products](#8-comparison-with-rollladen-products)
9. [Data Completeness & Missing Items](#9-data-completeness--missing-items)
10. [Calculator Implementation](#10-calculator-implementation)

---

## 1. Executive Summary

### What We Found

The Insektenschutz Plissee is a **standalone** insect protection product (not integrated with Rollladen). Key findings:

| Aspect | Finding |
|--------|---------|
| **Architecture** | **ADDITIVE** — same as Rollladen (Architecture C) |
| **Plissee Types** | 2 types: 1-teilige (€906.50) and 2-teilige (€1,693.50) |
| **Discount Factor** | 0.60 (40% off) — **IDENTICAL** to all other products |
| **Frame Colors** | 5 RAL colors — **ALL €0 surcharge** (individually tested and confirmed) |
| **Opening Directions** | 2 directions — **ALL €0 surcharge** |
| **Net Color** | 1 option (Black) — €0 surcharge |
| **Pricing** | Dimensions (width + height) + Plissee type selection drive the price |
| **Data Completeness** | **~95%** (⬆️ was 90%) — expanded with 13 systematic price data points |

### ⚠️ Key Corrections (March 12, 2026)

| What Changed | Old Understanding | New Understanding |
|-------------|------------------|------------------|
| **Width impact** | "Minimal/no impact" | **Width IS significant** (+€259 for 700→2150mm, +47.6%) |
| **Height ceiling** | Not documented | **Price does NOT increase above 2300mm** (2300=2550=same price) |
| **Price data points** | 6 scattered | **13 systematic** (7 width × 1 height + 4 height × 1 width + 3 combined) |
| **Calculation method** | Unknown | **Client-side JavaScript** (no server API calls — different from Rollladen) |
| **Colors** | "Noted as potentially incomplete" | **All 5 individually tested and confirmed €0** |

### Key Insight: Simplest Pricing Model

Unlike Aufsatzrollladen (9 drives, 12 colors, 4 plaster options) or Vorsatzrollladen (6 models, same surcharges), the Insektenschutz Plissee has **virtually no surcharges** — only the Plissee type selection (1-teilige vs 2-teilige) and dimensions affect the price. All colors and directions are free. This makes it the simplest product to implement.

### ⚠️ CEO Note: Data Incomplete

The CEO noted this dataset has **some data missing regarding all colour options**. The 5 frame colors documented may not be the complete set. Additional color options may exist that were not captured in this extraction. However, all 5 documented colors have been individually tested and confirmed at €0 surcharge.

---

## 2. Product Overview

- **Product Type:** Aluminium Insektenschutz-Plissee
- **Purpose:** Insect protection for sliding doors, terrace doors, folding sliding doors, balcony doors
- **Material:** Aluminum frame, black mesh net
- **Profile:** Iglo Plissee
- **Manufacturer:** Drutex
- **Frame Finish:** RAL-Farben Matt (RAL Colors Matte)

---

## 3. Pricing Architecture

### Architecture C: ADDITIVE (Same as Rollladen)

```
Final Price = (Base_Price + Surcharges) × 0.60
```

Where:
- **Base_Price** = Price for selected Plissee type at given dimensions
- **Surcharges** = Sum of all option surcharges (mostly €0 for this product!)
- **0.60** = Universal discount multiplier (40% off)

### Confirmed Universal Formula

The Insektenschutz Plissee uses the **exact same pricing formula** as all other products:
- Discount factor: **0.60** ✅ (confirmed, consistent with Fenster, Rollladen, Haustüren, etc.)
- Additive surcharges ✅
- No matrix lookup needed for options (only for base dimension pricing)

---

## 4. Plissee Types

| Type | Name | Base Price (€) | Surcharge vs Type 1 (€) | Notes |
|------|------|---------------|-------------------------|-------|
| 1-teilige | 1-teilige Plissee Tür | 906.50 | 0.00 | Single-part, default |
| 2-teilige | 2-teilige Plissee Tür | 1,693.50 | +787.00 | Two-part, width doubled in display |

### Key Points
- **2-teilige costs +86.8% more** than 1-teilige
- 2-teilige automatically doubles the display width (e.g., input 1025mm → displays 2050mm)
- The 2-teilige surcharge of €787.00 is the **only significant cost adder** in this product

---

## 5. Surcharges & Options

### 5A. Opening Directions (Plissee-Tür Öffnungsrichtung)

| Direction | Name | Surcharge (€) |
|-----------|------|---------------|
| Rechts nach Links | Slides right to left (default) | 0.00 |
| Links nach Rechts | Slides left to right | 0.00 |

**Result:** Opening direction has **ZERO price impact**.

### 5B. Frame Colors (Rahmen Farbe)

| # | Color | RAL Code | Surcharge (€) |
|---|-------|----------|---------------|
| 1 | Weiß (White) | 9016 | 0.00 (default) |
| 2 | Anthrazitgrau | 7016 | 0.00 |
| 3 | Graubraun | 8019 | 0.00 |
| 4 | Tiefschwarz | 9005 | 0.00 |
| 5 | White Aluminium | 9006 | 0.00 |

**Result:** ALL frame colors have **ZERO surcharge**. This is unique among all products analyzed — Rollladen has premium colors at €27.86–€63.14.

> ⚠️ **Note:** CEO indicated the color set may be incomplete. Additional color options may exist.

### 5C. Net Color (Netzfarbe)

| Color | Surcharge (€) |
|-------|---------------|
| Schwarz (Black) | 0.00 |

Only one net color available — no surcharge.

### 5D. Surcharge Summary

| Category | Options | Price Impact |
|----------|---------|-------------|
| Plissee Type | 2 | **YES** (+€787.00 for 2-teilige) |
| Opening Direction | 2 | **NO** (all €0) |
| Frame Color | 5 | **NO** (all €0) |
| Net Color | 1 | **NO** (€0) |

**Total configurable options: 10** — but only 1 option (Plissee type) actually changes the price.

---

## 6. Dimension Constraints

| Dimension | Min (mm) | Max (mm) | Range (mm) |
|-----------|----------|----------|------------|
| Width | 700 | 2,400 (1-teilige) / 3,600 (2-teilige) | 1,700 / 2,900 |
| Height | 1,900 | 2,600 | 700 |

### Comparison with Other Products

| Product | Height Min | Height Max | Height Range |
|---------|-----------|-----------|-------------|
| **Insektenschutz Plissee** | **1,900** | **2,600** | **700mm** (MOST LIMITED) |
| Aufsatzrollladen | 1,000 | 1,700 | 700mm |
| Vorsatzrollladen | 1,000 | 1,300 | 300mm (SMALLEST) |
| Fenster | 500 | 2,300+ | 1,800mm+ |

**Key Insight:** The Insektenschutz Plissee has the **highest minimum height** (1,900mm), suggesting it is specifically designed for door-height openings (not windows).

---

## 7. Size-Based Price Variations

> **⚠️ CORRECTED March 12, 2026:** The original March 11 analysis concluded width had "minimal impact" based on only 3 data points. The expanded dataset (13 points) shows **width IS significant**. See corrected analysis below.

### Width Impact (Height fixed at 1,900mm, 1-teilige) — EXPANDED ⬆️

| Width (mm) | Final Price (€) | Change from 700mm | Per 250mm step |
|:----------:|:---------------:|:------------------:|:--------------:|
| 700 | 543.90 | — | — |
| 950 | 558.84 | +14.94 | +14.94 |
| 1,200 | 586.78 | +42.88 | +27.94 |
| 1,450 | 641.29 | +97.39 | +54.51 |
| 1,700 | 673.93 | +130.03 | +32.64 |
| 1,950 | 792.34 | +248.44 | +118.41 ⚠️ |
| 2,150 | 802.85 | +258.95 | +10.51 |

**Finding (CORRECTED):** Width has **significant impact** on price: +€258.95 (+47.6%) from 700→2150mm. The increase is **non-linear** — steeper at larger widths (1700→1950mm = +€118.41 per 250mm step vs 700→950mm = +€14.94). This suggests stepped/banded pricing with wider bands at smaller sizes and narrower bands at larger sizes.

### Height Impact (Width fixed at 700mm, 1-teilige) — EXPANDED ⬆️

| Height (mm) | Final Price (€) | Change from 1,900mm |
|:-----------:|:---------------:|:-------------------:|
| 1,900 | 543.90 | — |
| 2,050 | 567.14 | +23.24 |
| 2,300 | 619.43 | +75.53 |
| 2,550 | 619.43 | +0.00 ⚠️ **CEILING** |

**Finding (NEW):** Height increases up to 2300mm add €75.53 (+13.9%). However, there is a **PRICE CEILING at 2300mm** — heights above 2300mm (tested at 2550mm) produce the IDENTICAL price. This means the effective maximum height for pricing purposes is 2300mm.

### Combined Dimension Tests — EXPANDED ⬆️

| Width × Height | Final Price (€) | Notes |
|:--------------:|:---------------:|:------|
| 950 × 2,050 | 580.97 | Width + Height both increased |
| 1,200 × 2,300 | 668.12 | Mid-range |
| 1,450 × 2,550 | 763.29 | Large — note height above ceiling |

### Dimension Impact Summary

| Dimension | Total Range | Price Impact | Per 100mm |
|-----------|:-----------:|:------------:|:---------:|
| **Width** (700→2150mm) | 1,450mm | +€258.95 (+47.6%) | ~€17.86 avg (non-linear) |
| **Height** (1900→2300mm) | 400mm | +€75.53 (+13.9%) | ~€18.88 avg (but ceiling at 2300) |

**Key finding:** Both width and height matter, with similar per-100mm impact (~€18/100mm). Width has more TOTAL impact because it has a wider range (1,450mm vs 400mm effective height range). The height ceiling at 2300mm limits height's overall contribution.

### ⚠️ Note on Original Analysis Error

The original March 11 analysis used data points at 950mm and 1,200mm width (both at 1,200×1,900 starting point) which happened to produce the same price (€693.59), leading to the incorrect conclusion that width had "minimal impact." The expanded March 12 dataset with 7 width data points clearly shows width is significant, especially at larger sizes.

---

## 8. Comparison with Rollladen Products

### Architecture Comparison

| Feature | Aufsatzrollladen | Vorsatzrollladen | Insektenschutz Plissee |
|---------|-----------------|-----------------|----------------------|
| **Architecture** | ADDITIVE (C) | ADDITIVE (C) | ADDITIVE (C) |
| **Discount Factor** | 0.60 | 0.60 | 0.60 |
| **Base Pricing** | 24-point W×H matrix | Model-based + dimension | Type-based + dimension |
| **Models/Types** | 4 models | 6 models | 2 types |
| **Drive Options** | 9 (€0–€769.05) | 9 (identical to Aufsatz) | N/A |
| **Color Options** | 12 (10 free, 2 premium) | 12 (identical to Aufsatz) | 5 (ALL free) |
| **Color Surcharges** | €0–€63.14 | €0–€63.14 | ALL €0 |
| **Insect Protection** | +€159.38 (integrated) | +€159.38 (integrated) | N/A (IS the product) |
| **Complexity** | Medium | Medium | **LOW** |

### Shared Elements

| Element | Aufsatz ↔ Vorsatz | Aufsatz ↔ Insektenschutz | All Three |
|---------|-------------------|-------------------------|-----------|
| Discount factor (0.60) | ✅ Identical | ✅ Identical | ✅ All share |
| ADDITIVE architecture | ✅ Identical | ✅ Identical | ✅ All share |
| Panel colors | ✅ Same 12 | ❌ Different (5 RAL vs 12 panel) | ❌ |
| Drive types | ✅ Same 9 | ❌ No drives | ❌ |
| Insect protection option | ✅ Same €159.38 | N/A | N/A |

### Key Differences

1. **Insektenschutz is a standalone product** — not an add-on to Rollladen
2. **No motorization** — Plissee is manually operated only
3. **No color premium** — all 5 colors are free (vs Rollladen's 2 premium colors)
4. **Both width and height affect pricing** — width is non-linear, height has ceiling at 2300mm
5. **Door-height only** — minimum 1,900mm height (vs Rollladen starting at 1,000mm)
6. **Client-side calculation** — JavaScript on client (vs Rollladen server-side AJAX)

---

## 9. Data Completeness & Missing Items

### What We Have ✅

- [x] Plissee type catalog (2 types with base prices)
- [x] Opening direction options (2, all €0)
- [x] Frame color options (5 RAL colors, all €0 — individually tested March 12)
- [x] Net color options (1, €0)
- [x] Dimension constraints (W: 700–2400, H: 1900–2600)
- [x] Size-based price variation — **13 systematic data points** (⬆️ was 6 scattered)
- [x] Discount factor confirmed (0.60)
- [x] Price calculation formula confirmed
- [x] Calculator implementation (JS + Python)
- [x] API endpoint & form element IDs documented (⬆️ NEW)
- [x] Configuration object structure (`obj_plissee`) documented (⬆️ NEW)
- [x] Example calculations with verified prices
- [x] Height ceiling effect at 2300mm (⬆️ NEW)
- [x] Non-linear width pricing characterized (⬆️ NEW)
- [x] Client-side calculation mechanism confirmed (⬆️ NEW)

### What We Don't Have ❌

- [ ] **Complete color catalog** — 5 colors confirmed and tested, but CEO noted set may be incomplete
- [ ] **2-teilige dimension-based pricing** — only have one data point for 2-teilige base; need size variations
- [ ] **Second manufacturer data** — only have Drutex
- [ ] **Weight constraints** — not documented (may not apply to Plissee)
- [x] ~~**Full W×H base price matrix**~~ — ✅ NOW HAVE 13 systematic data points (sufficient for interpolation)
- [x] ~~**Dimension step intervals**~~ — ✅ Tested with 250mm increments, non-linear pattern documented

### Data Completeness Estimate: **~95%** (⬆️ was 90%)

The core calculation logic is fully understood with 13 systematic data points. The main gaps are:
1. Potentially incomplete color list (CEO flag — but all 5 documented colors confirmed at €0)
2. Missing 2-teilige size variation data (only have base price, need width/height price changes for 2-teilige)

---

## 10. Calculator Implementation

### Available Implementations

The Datasets branch includes calculator implementations in:
- **JavaScript:** `insektenschutz_plissee_data.js` — Node.js module with `InsektenschutzPlisseeCalculator` class
- **Python:** `insektenschutz_plissee_data.py` — Python class equivalent

### Calculator Features

1. **Configuration management** — Set type, dimensions, color, direction
2. **Dimension validation** — Enforces min/max constraints
3. **Price calculation** — Base price + surcharges × 0.60
4. **Area calculation** — Handles 2-teilige width doubling
5. **Price breakdown** — Detailed component breakdown

### Example Calculation

```
Configuration: 1-teilige, 700×1900mm, White, Right-to-Left

  Base Price:           906.50 EUR
  + Plissee Type:         0.00 EUR
  + Opening Direction:    0.00 EUR
  + Frame Color:          0.00 EUR
  + Net Color:            0.00 EUR
  = Before Discount:    906.50 EUR
  × 0.60 (40% off):
  = FINAL PRICE:        543.90 EUR
```

```
Configuration: 2-teilige, 2050×1900mm, Anthrazitgrau, Left-to-Right

  Base Price:         1,693.50 EUR
  + Plissee Type:         0.00 EUR (surcharge is built into base)
  + Opening Direction:    0.00 EUR
  + Frame Color:          0.00 EUR
  + Net Color:            0.00 EUR
  = Before Discount:  1,693.50 EUR
  × 0.60 (40% off):
  = FINAL PRICE:      1,016.15 EUR
```

---

## Appendix: Raw Price Data Points

### 1-teilige Plissee Tür — Expanded Dataset (March 12, 2026)

**Width variation** (Height fixed at 1,900mm):

| Width (mm) | Height (mm) | Final Price (€) | Base Price (est.) | Source |
|:---------:|:---------:|:---------------:|:----------------:|:------:|
| 700 | 1,900 | 543.90 | 906.50 | March 11 + 12 |
| 950 | 1,900 | 558.84 | ~931.40 | March 12 🆕 |
| 1,200 | 1,900 | 586.78 | ~977.97 | March 12 🆕 |
| 1,450 | 1,900 | 641.29 | ~1,068.82 | March 12 🆕 |
| 1,700 | 1,900 | 673.93 | ~1,123.22 | March 12 🆕 |
| 1,950 | 1,900 | 792.34 | ~1,320.57 | March 12 🆕 |
| 2,150 | 1,900 | 802.85 | ~1,338.08 | March 12 🆕 |

**Height variation** (Width fixed at 700mm):

| Width (mm) | Height (mm) | Final Price (€) | Base Price (est.) | Source |
|:---------:|:---------:|:---------------:|:----------------:|:------:|
| 700 | 1,900 | 543.90 | 906.50 | March 11 + 12 |
| 700 | 2,050 | 567.14 | ~945.23 | March 12 🆕 |
| 700 | 2,300 | 619.43 | ~1,032.38 | March 12 🆕 |
| 700 | 2,550 | 619.43 | ~1,032.38 | March 12 🆕 ⚠️ CEILING |

**Combined variations:**

| Width (mm) | Height (mm) | Final Price (€) | Base Price (est.) | Source |
|:---------:|:---------:|:---------------:|:----------------:|:------:|
| 950 | 2,050 | 580.97 | ~968.28 | March 12 🆕 |
| 1,200 | 2,300 | 668.12 | ~1,113.53 | March 12 🆕 |
| 1,450 | 2,550 | 763.29 | ~1,272.15 | March 12 🆕 |

**Original March 11 data points (from different base widths — may not align with expanded dataset):**

| Width (mm) | Height (mm) | Final Price (€) | Base Price (est.) | Note |
|:---------:|:---------:|:---------------:|:----------------:|:-----|
| 950 | 1,900 | 693.59 | ~1,155.98 | Original data — different base? |
| 1,200 | 1,900 | 693.59 | ~1,155.98 | Original data — same as 950mm |
| 1,200 | 2,050 | 855.43 | ~1,425.72 | Original data |
| 1,200 | 2,300 | 902.46 | ~1,504.10 | Original data |
| 1,450 | 2,300 | 902.46 | ~1,504.10 | Original data — same as 1200mm |

> **⚠️ Note:** The March 11 and March 12 data show different prices for the same dimensions (e.g., 950×1900: €693.59 vs €558.84). This discrepancy likely means the March 11 data was extracted at a different starting configuration or the configurator state was different. The March 12 data is the systematic extraction and should be treated as authoritative.

### 2-teilige Plissee Tür

| Width (mm) | Height (mm) | Final Price (€) | Base Price (est.) |
|:---------:|:---------:|:---------------:|:----------------:|
| 2,050 | 1,900 | 1,016.15 | 1,693.50 |

---

*Analysis by automated system based on CEO-uploaded dataset files.*
