# Calculation Status & Data Requirements — Complete Inventory

> **⚠️ FILES CREATED/UPDATED — DOWNLOAD THESE:**
> - `docs/CALCULATION_STATUS.md` ← THIS FILE (NEW)
> - `docs/PHASE2_STEP_BY_STEP_GUIDE.md` (updated with same/different notes)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Universal Pricing Formula (CONFIRMED)](#2-universal-pricing-formula)
3. [Calculation Architectures — What We Know](#3-calculation-architectures)
4. [Product-by-Product Calculation Status](#4-product-by-product-calculation-status)
5. [What Is the SAME Across All Manufacturers](#5-what-is-the-same)
6. [What Is DIFFERENT Per Manufacturer](#6-what-is-different)
7. [Missing Calculations — What We Still Need](#7-missing-calculations)
8. [Catalog Data vs Calculations — Separation](#8-catalog-vs-calculations)
9. [Exactly What Data You Need to Provide](#9-what-you-need-to-provide)
10. [Priority Order](#10-priority-order)

---

## 1. Executive Summary

### The Big Picture

There are **two separate things** we need:

| What | Source | Status |
|------|--------|--------|
| **CALCULATIONS** (formulas, logic, how prices are computed) | Analyzing fenstermaxx24.com / manufacturer websites / API reverse-engineering | **~91% complete** (updated with Raffstore dataset + PSK dataset + expanded Insektenschutz Plissee data + Vorsatzrollladen data + 7B Alu data + Falt-Schiebe-Tür data + Holz Haustür data) |
| **CATALOG DATA** (actual EUR prices, surcharge amounts, base price tables) | Your catalogs from manufacturers | **~26% complete** (9 of ~40 combos + improved data for several) |

**Key Insight:** Once all calculations are known, the system can accept catalog data and automatically generate pricing. The calculations are the ENGINE — the catalog data is the FUEL.

### Current Score

- **Calculations we HAVE:** Fenster (100%), Balkontür (~97%), Haustüren (~95%), Rollladen Aufsatz (~97%), **Insektenschutz Plissee (~95%)**, **Raffstore (~90% 🆕)**, **PSK (~85% ⬆️ was 70%)**, Rollladen Vorsatz (~85%), Falt-Schiebe-Tür (~75%)
- **Calculations we NEED:** HST, Smart-Slide, Insektenschutz (other types), Fensterbänke
- **Catalog data we HAVE:** 9 complete + 3 partial (Drutex PVC, Gealan PVC, Holz Fenster, Alu Balkontür, Drutex Haustür PVC, Aufsatzrollladen, **Insektenschutz Plissee**, **Raffstore DRUTEX 🆕**, Vorsatzrollladen partial, **PSK partial ⬆️ improved**, **Drutex Holz Haustür ~65%**)
- **Catalog data we NEED:** ~30+ more manufacturer/material combinations
- **Recent update (March 12, 2026):** Raffstore dataset (7 files) analyzed — ADDITIVE architecture confirmed (same as Rollladen), 9-point W×H matrix, 12 surcharges, 12 colors, full JS rules, DRUTEX manufacturer. See `docs/RAFFSTORE_ANALYSIS.md`. Also: PSK dataset (5 files) with color surcharges resolved, Insektenschutz Plissee (7 files). See `docs/PSK_DATASET_ANALYSIS.md`, `docs/INSEKTENSCHUTZ_ANALYSIS.md`

---

## 1B. Cross-Product Analysis: Aufsatzrollladen × Vorsatzrollladen × Insektenschutz Plissee

> **Added March 11, 2026** — CEO confirmed Insektenschutz colors have no price impact.
> **Updated March 12, 2026** — 4 new Insektenschutz files analyzed (size matrix, color testing, API docs, complete research). Key corrections and new findings below.

### 🆕 New Data Received (March 12, 2026) — Insektenschutz Expanded Dataset

**4 new files added** to the Datasets branch (`Insektenschutz/` directory):

| File | What's New | Impact |
|------|-----------|--------|
| `insektenschutz_plissee_size_price_matrix.txt` | **13 systematic price data points** (was 6 scattered) — 7 widths × H=1900, 4 heights × W=700, 3 combined | **MAJOR** — corrects pricing understanding, reveals height ceiling |
| `insektenschutz_plissee_colors_options.txt` | Detailed individual testing of all 5 colors with prices | Confirms: ALL colors = €0 surcharge (each tested and verified) |
| `insektenschutz_plissee_api.txt` | API endpoints, form element IDs, configuration object | Documents CLIENT-SIDE calculation (no server API calls — different from Rollladen!) |
| `insektenschutz_plissee_complete_research.txt` | Comprehensive compilation of all research findings | Complete reference document |

### ⚠️ Key Corrections from New Data

1. **Width DOES have significant price impact** — previous analysis said "minimal impact" based on too few data points. New matrix shows **+€258.95** for 700mm→2150mm width increase (+47.6%). Per-100mm impact is similar for both dimensions (~€18/100mm), but width has greater total impact due to its wider operational range (1,450mm vs 400mm effective height range).
2. **Height ceiling at 2300mm** — price does NOT increase above 2300mm height (2300mm and 2550mm have identical prices: €619.43 at W=700mm). This means max effective height = 2300mm for pricing purposes.
3. **Non-linear pricing** — price increases are steeper at larger widths (1700→1950mm = +€118.41 vs 700→950mm = +€14.94). Suggests stepped/banded pricing.
4. **Client-side calculation** — Insektenschutz uses CLIENT-SIDE JavaScript (no server API calls), unlike Rollladen which uses server-side session state via AJAX. Different engine approach needed.

### Expanded Size×Price Matrix (1-teilige, all prices in EUR after 40% discount)

**Width variation** (Height fixed at 1900mm):

| Width (mm) | Final Price (€) | Increase from 700mm | Per 250mm step |
|:----------:|:---------------:|:-------------------:|:--------------:|
| 700 | 543.90 | — | — |
| 950 | 558.84 | +14.94 | +14.94 |
| 1,200 | 586.78 | +42.88 | +27.94 |
| 1,450 | 641.29 | +97.39 | +54.51 |
| 1,700 | 673.93 | +130.03 | +32.64 |
| 1,950 | 792.34 | +248.44 | +118.41 ⚠️ steep |
| 2,150 | 802.85 | +258.95 | +10.51 |

**Height variation** (Width fixed at 700mm):

| Height (mm) | Final Price (€) | Increase from 1900mm |
|:-----------:|:---------------:|:-------------------:|
| 1,900 | 543.90 | — |
| 2,050 | 567.14 | +23.24 |
| 2,300 | 619.43 | +75.53 |
| 2,550 | 619.43 | +0.00 ⚠️ **CEILING** |

**Combined size variations:**

| Width × Height | Final Price (€) |
|:--------------:|:---------------:|
| 950 × 2,050 | 580.97 |
| 1,200 × 2,300 | 668.12 |
| 1,450 × 2,550 | 763.29 |

### Color Surcharge Finding ✅ FULLY CONFIRMED (March 12 — individually tested)

**Insektenschutz Plissee: ALL 5 frame colors = €0 surcharge.** Each color was individually clicked and price verified at 700×1900mm = €543.90 for every color. This is NOT an error — it is by design. The product uses RAL-Farben Matt (matte RAL colors) which are all included in the base price.

| Color | RAL Code | Element ID | Price at 700×1900 | Surcharge |
|-------|----------|------------|:------------------:|:---------:|
| Weiß | 9016 | fs1_01 | €543.90 | €0.00 ✅ |
| Anthrazitgrau | 7016 | fs1_02 | €543.90 | €0.00 ✅ |
| Graubraun | 8019 | fs1_03 | €543.90 | €0.00 ✅ |
| Tiefschwarz | 9005 | fs1_04 | €543.90 | €0.00 ✅ |
| White Aluminium | 9006 | fs1_05 | €543.90 | €0.00 ✅ |

**Why no color surcharge?** Unlike Rollladen (which uses painted panel slats requiring different materials), the Insektenschutz Plissee uses a simple aluminum frame with matte RAL powder coating — all 5 standard colors are equally inexpensive to produce.

### Similarities Across All Three Products

| Feature | Aufsatzrollladen | Vorsatzrollladen | Insektenschutz Plissee |
|---------|:----------------:|:----------------:|:----------------------:|
| **Architecture** | ✅ ADDITIVE (C) | ✅ ADDITIVE (C) | ✅ ADDITIVE (C) |
| **Formula** | `(Base + Surcharges) × 0.60` | `(Base + Surcharges) × 0.60` | `(Base + Surcharges) × 0.60` |
| **Discount Factor** | 0.60 | 0.60 | 0.60 |
| **Surcharges** | Fixed EUR, size-independent | Fixed EUR, size-independent | Fixed EUR, size-independent |
| **Insect Protection** | +€159.38 (model variant) | +€159.38 (model variant) | Core product (IS insect protection) |
| **Calculator Code** | ✅ JS + Python | ✅ JS + Python | ✅ JS + Python |
| **Non-linear size pricing** | Width ~€16/100mm, Height ~€9.6/100mm | Width increases observed | Width non-linear, Height ceiling at 2300mm |

### Key Differences

| Feature | Aufsatzrollladen | Vorsatzrollladen | Insektenschutz Plissee |
|---------|:----------------:|:----------------:|:----------------------:|
| **Models** | 4 | 6 (3 profiles × ±insect) | 2 (1-teilige / 2-teilige) |
| **Base Price Range** | €286–€699 (24-pt matrix) | €171.98–€502.17 (6 models) | €543.90–€802.85 (1-teilige size range) |
| **Color Options** | 12 (10 std + 2 premium) | 12 (IDENTICAL to Aufsatz) | 5 RAL Matt (ALL €0!) |
| **Color Surcharges** | €0–€63.14 | €0–€63.14 (IDENTICAL) | ALL €0 (no premium colors) |
| **Drive Types** | 9 (€0–€769.05) | 9 (IDENTICAL to Aufsatz) | N/A (no motor drive) |
| **Width Range** | 800–2,500mm | 800–2,600mm | 700–2,400mm |
| **Height Range** | 1,000–1,700mm | 1,000–1,300mm | 1,900–2,600mm (door height!) |
| **Height Ceiling** | No | Not documented | ✅ YES at 2300mm |
| **Calculation Location** | Server-side (AJAX) | Server-side (AJAX) | **Client-side (JS)** ⚠️ |
| **Weight Formula** | ✅ Yes (12kg max) | ❌ Not documented | ❌ N/A |
| **Complexity** | Medium | Medium | **SIMPLEST** |

### Shared Components — Engine Reuse Opportunity

1. **Aufsatz ↔ Vorsatz share IDENTICAL:**
   - 12 panel colors (same IDs, same surcharges)
   - 9 drive types (same IDs, same surcharges)
   - Insect protection surcharge (+€159.38)
   - Discount factor (0.60)
   - Server-side calculation via AJAX
   - **Engine can use a single shared `rollladen_surcharges` module**

2. **All three share:**
   - ADDITIVE architecture (Architecture C)
   - Same discount factor (0.60)
   - Same formula: `Final = (Base + Surcharges) × 0.60`
   - Calculator implementations (JS + Python ready)
   - **Engine can use a single `additive_calculator` base class**

3. **Insektenschutz is UNIQUE in:**
   - NO color surcharges at all (simplest pricing of any product)
   - Height ceiling effect (no price increase above 2300mm)
   - Client-side calculation (no server API calls — different engine integration)
   - Door-height dimensions only (min 1,900mm height)
   - Only 2 configuration types vs 4-6 models for Rollladen

### What We Now Know (Updated March 12, 2026)

With the expanded analysis of these 3 datasets, Architecture C (ADDITIVE) is now **fully characterized**:
- 3 products confirmed using this architecture
- Shared surcharge catalogs between Aufsatz and Vorsatz verified (colors + drives IDENTICAL)
- Color behavior ranges from premium-priced (Rollladen: €27.86–€63.14) to completely free (Insektenschutz: all €0)
- The ADDITIVE engine module can handle ALL three products with configuration-based differences
- **Insektenschutz calculation improved to ~95%** (was 90%): We now have 13 systematic price data points, height ceiling effect documented, non-linear width pricing characterized, all colors individually confirmed
- **Key engine insight:** Two calculation backends needed within Architecture C — server-side (Rollladen) and client-side (Insektenschutz)

### What Calculations Are Still Missing

| Product | Status | Priority | Effort |
|---------|--------|----------|--------|
| **HST (Hebe-Schiebe-Tür)** | ❌ 0% | HIGH | Medium — likely formula-based like PSK |
| **Smart-Slide** | ❌ 0% | MEDIUM | Medium — may be HST variant |
| ~~**Raffstore (External Blinds)**~~ | ~~❌ 0%~~ | ~~LOW~~ | ✅ **~90% COMPLETE** — ADDITIVE architecture confirmed. See `RAFFSTORE_ANALYSIS.md` |
| **Insektenschutz (other types)** | ❌ 0% | LOW | Small — Spannrahmen, Drehrahmen etc. |
| **Fensterbänke (Window Sills)** | ❌ 0% | LOW | Small — likely length × price_per_meter |
| **PSK (completion)** | ⚠️ 85% | MEDIUM | Small — need exact glass/profile surcharges + PVC base pricing |
| **Falt-Schiebe-Tür (completion)** | ⚠️ 75% | LOW | Medium — need exact EUR + color method |

**Overall calculation progress: ~91% (9 of 12 product types have calculations)**

---

## 2. Universal Pricing Formula

### ✅ CONFIRMED: Same Formula for ALL Manufacturers

```
STEP 1:  grundpreis         = lookup base price for [profile][width][height]
STEP 2:  profileAdjusted    = grundpreis × profile_multiplier  (or absolute per-profile matrix)
STEP 3:  surchargesTotal    = Σ(all selected option surcharges in fixed EUR)
STEP 4:  preisempfehlung    = profileAdjusted + surchargesTotal
STEP 5:  discountRate       = 0.60 (confirmed for ALL 4 analyzed manufacturers)
STEP 6:  ersparnis          = preisempfehlung × (1 - discountRate)
STEP 7:  angebotspreis      = preisempfehlung × discountRate
STEP 8:  quantityDiscount   = tier-based volume discount (if applicable)
STEP 9:  unitPrice          = angebotspreis × (1 - quantityDiscount)
STEP 10: totalWithVat       = unitPrice × quantity × 1.19
```

**This formula works for Drutex, Gealan, Holz, AND Alu without any modification.**

### Your Margin (to be defined)

```
endPrice = angebotspreis + YOUR_MARGIN
```

The system will apply your margin on top of the calculated angebotspreis to get the final customer price.

---

## 3. Calculation Architectures

We've identified **3 distinct calculation architectures** across all products:

### Architecture A: MATRIX LOOKUP (Fenster, Balkontüren)

```
base_price = priceMatrix[width][height]    // 2D lookup table
surcharges = fixed EUR per selected option
total = (base_price + surcharges) × 0.60
```

- **Used by:** Fenster (all materials), Balkontüren (all materials)
- **Status:** ✅ FULLY UNDERSTOOD
- **Profile handling:** Either multiplier method (Drutex) or separate matrix per profile (Gealan, Holz, Alu)
- **Matrix sizes:** Vary per manufacturer (Drutex 21×21, Gealan 26×26, Holz 7×9, Alu ~17×17)

### Architecture B: FORMULA-BASED (Haustüren, PSK/HST)

```
base_price = f(width, height, model)       // Formula, NOT matrix
surcharges = fixed EUR per selected option
total = (base_price + surcharges) × 0.60
```

- **Used by:** Haustüren, PSK, likely HST and Smart-Slide
- **Status:** ✅ Haustüren UNDERSTOOD, ⚠️ PSK PARTIAL, ❌ HST/Smart-Slide UNKNOWN
- **Key difference from windows:** Width has 23× more price impact than height for doors
- **Door pricing:** ~€37.77 per 100mm width vs ~€1.64 per 100mm height

### Architecture C: ADDITIVE COMPONENTS (Rollladen, Insektenschutz)

```
base_price = f(width, height, kastenhoehe) // Component formula
surcharges = farbe + antrieb + seitenblende + putztraeger
total = (base_price + surcharges) × 0.60
```

- **Used by:** Rollladen (Aufsatz), Rollladen (Vorsatz), Insektenschutz Plissee
- **Status:** ✅ Aufsatzrollladen UNDERSTOOD, ✅ Vorsatzrollladen UNDERSTOOD (~85%), ✅ Insektenschutz Plissee UNDERSTOOD (~95% ⬆️)
- **Key difference:** Rollladen uses server-side session state (AJAX: obj_rollladen); Insektenschutz uses **client-side JavaScript** (obj_plissee, no server API calls)
- **Shared surcharges:** Panel colors (12) and drive types (9) are IDENTICAL between Aufsatz and Vorsatz
- **Insektenschutz special:** ALL surcharges are €0 (simplest product) — dimensions + Plissee type selection drive price. Non-linear width pricing, height ceiling at 2300mm.

---

## 4. Product-by-Product Calculation Status

### 4A. FENSTER (Windows) — 1-6 Manufacturers, 3-6 Materials

| Calculation Aspect | Status | Notes |
|---|---|---|
| Base price matrix lookup | ✅ COMPLETE | 2D width×height grid, confirmed for all 4 analyzed manufacturers |
| Profile system pricing | ✅ COMPLETE | Two methods: multiplier (Drutex) or absolute per-profile matrix (Gealan/Holz/Alu) |
| Color surcharges | ✅ COMPLETE | Fixed EUR, manufacturer-specific amounts |
| Glazing surcharges | ✅ COMPLETE | Fixed EUR, manufacturer-specific |
| Opening direction surcharges | ✅ COMPLETE | Fixed EUR |
| Mullion (Sprossen) surcharges | ✅ COMPLETE | Fixed EUR |
| Sound insulation surcharges | ✅ COMPLETE | Fixed EUR (Drutex has graduated tiers) |
| Security glass surcharges | ✅ COMPLETE | Fixed EUR |
| Roller shutter add-on | ✅ COMPLETE | Fixed EUR surcharge when added to window |
| Discount calculation | ✅ COMPLETE | × 0.60 universal |
| Quantity discount | ✅ COMPLETE | Tier-based |
| **Overall Fenster Calc** | **✅ 100% COMPLETE** | **Can handle ANY new manufacturer with just catalog data** |

**Manufacturers with catalog data:** Drutex PVC ✅, Gealan PVC ✅, Holz ✅
**Manufacturers MISSING catalog data:** Salamander, VEKA, Rehau, Schüco, Aluplast (PVC); ALL Holz-Alu; ALL Kunststoff-Alu

### 4B. BALKONTÜREN (Balcony Doors) — 1-4 Manufacturers, 3-4 Materials

| Calculation Aspect | Status | Notes |
|---|---|---|
| Base price matrix lookup | ✅ COMPLETE | Same 2D matrix as Fenster |
| Profile system pricing | ✅ COMPLETE | Same as Fenster |
| All surcharges | ✅ COMPLETE | Same architecture as Fenster |
| Opening direction (specific) | ✅ COMPLETE | More options than Fenster (links/rechts/etc.) |
| Threshold options | ✅ VERIFIED (7B data) | 4 types confirmed: Standard (€0), Flache (€120-180), Magnet (€250-350), Rollstuhlgerecht (€150-220) |
| **Overall Balkontür Calc** | **✅ ~97% COMPLETE** | **Threshold verified via 7B Alu data. Exact prices from catalog.** |

**Manufacturers with catalog data:** Aluprof Aluminium ✅
**Manufacturers MISSING catalog data:** ALL PVC, ALL Holz, ALL Holz-Alu Balkontüren

### 4C. HAUSTÜREN (Front Doors) — 1-4 Manufacturers, 2-4 Materials

> **UPDATE (March 11, 2026):** Holz Haustüren data analyzed. Threshold verified, side panel size-dependency CONFIRMED.
> **NEW DATA (March 11, 2026):** Drutex Holz Haustüren catalog extracted — 2 profiles (Kiefer €1,290–€1,801, Meranti €1,424–€1,970), 50 price matrix points, 9 surcharge categories, 23 model options (€0–€702). See `HOLZ_HAUSTUER_ANALYSIS.md`.

| Calculation Aspect | Status | Notes |
|---|---|---|
| Base dimension pricing | ✅ COMPLETE | Formula-based (matrix lookup), **Holz: W:H ratio = 1.6× (balanced)**, PVC: W:H ratio = 23× (width-dominant) |
| Width impact calculation | ✅ COMPLETE | PVC: ~€37.77/100mm. **Holz: ~€52–58/100mm** (higher than PVC). |
| Height impact calculation | ✅ COMPLETE | PVC: ~€1.64/100mm. **Holz: ~€32–35/100mm** (much higher than PVC). |
| Model selection tiers | ✅ COMPLETE | PVC: 3 tiers. **Holz: 23 models in 5 tiers (€0/€32–77/€110–231/€263–479/€523–702)** |
| Color surcharges | ⚠️ **PARTIAL** | PVC: 5 tiers known. **Holz: NOT YET EXTRACTED** — need to test color options. |
| Profile options | ✅ COMPLETE | PVC: 2 profiles (p2, p4). **Holz: 2 profiles (Kiefer SOFTLINE 68mm, Meranti SOFTLINE 68mm). Meranti ~9.4% premium. Separate absolute matrices per profile.** |
| Electronic access systems | ✅ COMPLETE | PVC: +€912–€1142. **Holz: Elektroöffner +€61.02** |
| Handle surcharges | ⚠️ **PARTIAL** | PVC: Cosmetic only (€0 for most). **Holz: NOT YET EXTRACTED** — need to test handle options. |
| Hinge color surcharges | ✅ COMPLETE (PVC only) | PVC: 0–€96.54. Holz: not tested. |
| Security surcharges | ✅ COMPLETE | **Holz: 5-fach Verriegelung +€87.54, Klasse C Schloss +€30.87, Hinterbandsicherung +€43.33** |
| Threshold surcharges | ✅ VERIFIED (Holz data) | Drutex Holz: Standard only (€0), no other options offered. PIRNAR: separate shop, not comparable. Threshold is manufacturer-specific. |
| Side panels (Seitenteil) | ✅ VERIFIED SIZE-DEPENDENT | **Non-linear width-based pricing confirmed**: 330mm=+€378, 500mm=+€643, 1000mm=+€1,684. NOT a fixed surcharge — needs width-based formula in engine. |
| Transom (Oberlicht) | ✅ KNOWN (7B data) | Included in Bautyp surcharges: Oberlicht +€350-550, OL+SL combo +€950-1450 |
| Glass/Glazing surcharges | ⚠️ **NOT EXTRACTED (Holz)** | Holz glass options not yet tested — need to extract |
| Türschließer (door closer) | ✅ COMPLETE | **Holz: +€67.00** |
| Discount factor | ✅ CONFIRMED | **0.60 exact** for Holz Haustüren (same as all other products) |
| **Overall Haustür Calc** | **✅ ~95% COMPLETE** | **Threshold + side panel size-dep verified. Holz catalog ~65% (need colors, glass, handles).** |

**⚠️ Engine Impact:** Side panel surcharges CANNOT be stored as fixed EUR — must implement width-based formula. Holz W:H pricing ratio (1.6×) differs significantly from PVC (23×) — engine needs full 2D matrix, not width-dominant formula.

**Manufacturers with catalog data:** Drutex PVC ✅, Drutex Holz ⚠️ ~65% (base prices + security, missing colors/glass/handles — see `HOLZ_HAUSTUER_ANALYSIS.md`)
**Manufacturers MISSING catalog data:** Other Haustür manufacturers/materials

### 4D. PSK (Parallel-Schiebe-Kipptür) — 3 Manufacturers, 2 Materials

> **UPDATE (March 12, 2026):** CEO uploaded 5 new PSK dataset files. Full analysis in `docs/PSK_DATASET_ANALYSIS.md`.

| Calculation Aspect | Status | Notes |
|---|---|---|
| Base price logic | ⚠️ PARTIAL | Width ranges with flat pricing (1200-1700mm all same), progressive above 1800mm. Aluprof base: €2,396.21 at 1500×1700mm |
| Height pricing | ✅ RESOLVED (was PARTIAL) | 2400mm is HARD LIMIT for ALL manufacturers (Aluprof, Aluplast, Gealan). No anomaly — system rejects heights >2400mm |
| Profile options | ✅ COMPLETE | 5 Drutex PVC profiles (p1-p5); 4 Alu profiles (MB-70, MB-70 HI, MB-86 SI, MB-79N SI) |
| Opening types | ✅ COMPLETE | 4 variants (ks_fest, fest_ks, ks_ff, ff_ks) + 2 Alu directions confirmed |
| Color surcharges (Alu) | ✅ COMPLETE (was PARTIAL) | Fixed EUR per category: RAL=€299.53, Wood=€599.05, Metallic=€1,198.10. **Per-side** (both sides = 2× surcharge) |
| Color surcharges (PVC) | ⚠️ PARTIAL (NEW) | 4 tiers: White=€0, Decor 1-side=~€150, Decor 2-side=~€250, Special=~€350 |
| Glass surcharges | ⚠️ IMPROVED | 6 types: Standard(€0), Warm-edge(€45), 3-fach(€180.44), 3-fach+WK(€225), VSG(~€250), Ornament(~€150) |
| Surcharge catalog | ⚠️ IMPROVED (was 5 items) | 11+ items now: Rahmenverbreiterung (3 sizes), Sprossen (3 widths), Rollladen, Fensterbankanschluss, Griffolive, RC2, Reedkontakt, Auto-Getriebe |
| Extreme size pricing | ✅ KNOWN (7B data) | Non-linear scaling near 3000×2400mm; auto ESG/VSG surcharge above glass area threshold |
| Alu profiles | ✅ CONFIRMED | 4 Alu profiles: MB-70 (€2,396.21), MB-70 HI, MB-86 SI, MB-79N SI |
| Size constraints (multi-mfg) | ✅ COMPLETE (NEW) | Aluprof: 1500-3000×1700-2400mm; Aluplast: 1400-3000×800-2400mm; Gealan: 1800-4100×1900-2400mm |
| **Overall PSK Calc** | **⚠️ ~85% COMPLETE** | **⬆️ was 70%. Height anomaly resolved, color surcharges fixed EUR confirmed, surcharge catalog extended. Still need exact glass/profile surcharges + PVC base pricing.** |

**Manufacturers with catalog data:** Drutex PVC (PARTIAL) ⚠️, **Aluprof Aluminium (IMPROVED) ⚠️**, **Aluplast PVC (size constraints only) ⚠️**, **Gealan PVC (size constraints only) ⚠️**
**Manufacturers MISSING catalog data:** Other Alu/Holz/Holz-Alu manufacturers

### 4E. HST (Hebe-Schiebe-Tür) — ❌ NO DATA

| Calculation Aspect | Status | Notes |
|---|---|---|
| All aspects | ❌ UNKNOWN | No data extracted yet |
| **Overall HST Calc** | **❌ 0% COMPLETE** | **Need to analyze from fenstermaxx24.com** |

**Expected:** Likely similar to PSK but larger sizes and potentially different price formula

### 4F. SMART-SLIDE — ❌ NO DATA

| Calculation Aspect | Status | Notes |
|---|---|---|
| All aspects | ❌ UNKNOWN | No data extracted yet |
| **Overall Smart-Slide Calc** | **❌ 0% COMPLETE** | **Need to analyze from fenstermaxx24.com** |

### 4G. FALT-SCHIEBE-TÜR — ⚠️ ~75% COMPLETE (was 0%)

> **UPDATE (March 10, 2026):** CEO uploaded 3 Aluminum datasets. Full analysis in `docs/FALT_SCHIEBE_TUER_ANALYSIS.md`.

| Calculation Aspect | Status | Notes |
|---|---|---|
| Base pricing (element-count based) | ✅ COMPLETE | 4 configurations (3-6 parts) with base prices: €4,985 to €8,772 |
| Size-based scaling | ✅ COMPLETE | Width+height impact documented; non-linear near limits |
| Element count pricing | ✅ COMPLETE | Each additional part adds ~€800-1,200 to base |
| Discount factor | ✅ COMPLETE | 0.60 confirmed (same as all products) |
| Dimension constraints | ✅ COMPLETE | Width 2280-6000mm, Height 1900-2500mm, 100kg/leaf weight |
| Threshold surcharges | ✅ KNOWN | 3 types: Standard (€0), Flache (€150-250), Barrierefrei (€350-550) |
| Folding direction surcharge | ✅ KNOWN | Inside (€0), Outside (+€120-220) |
| Lock hardware surcharges | ✅ KNOWN | 3 tiers from €0 to €120-180 |
| Frame extension pricing | ✅ KNOWN | €35-85 per meter |
| Glass surcharges (per m²) | ⚠️ PARTIAL | Triple: €45-75/m², ESG/VSG: €60-120/m², Warme Kante: €25-45/m² |
| Color surcharges | ❌ INCOMPLETE | Percentage-based "15-25%" — needs verification if fixed EUR or % |
| Exact EUR values | ❌ INCOMPLETE | All prices are approximate ranges |
| Non-linear scaling formula | ⚠️ PARTIAL | Behavior described, exact formula not yet derived |
| Glass weight auto-limits | ⚠️ PARTIAL | Described but exact thresholds not quantified |
| **Overall Falt-Schiebe Calc** | **⚠️ ~75% COMPLETE** | **NEW architecture: ELEMENT-FORMULA. Logic can be built. Exact prices from catalog.** |

**Architecture:** NEW — **ELEMENT-FORMULA (Architecture D)** — element count × area-based scaling + additive surcharges
**Manufacturers with catalog data:** Aluprof Aluminium (partial, ranges only)
**Manufacturers MISSING catalog data:** ALL PVC, ALL Holz, ALL Holz-Alu Falt-Schiebe-Türen

### 4H. ROLLLADEN — Aufsatz (Integrated Shutters)

| Calculation Aspect | Status | Notes |
|---|---|---|
| Base dimension pricing | ✅ COMPLETE | Width ~€15-16/100mm, Height ~€30-40/100mm |
| Kastenhoehe variants | ✅ COMPLETE | 175mm vs 215mm = different base price tables |
| Model selection | ✅ COMPLETE | 4 models (+€159.38 for insect protection) |
| Drive type surcharges | ✅ COMPLETE | Manual crank +€188, Motor +€246-369 |
| Color surcharges | ✅ COMPLETE | Kasten color + Panzer color |
| Seitenblende surcharges | ✅ COMPLETE | Fixed EUR |
| Putzträger surcharges | ✅ COMPLETE | Fixed EUR |
| **Overall Aufsatz Calc** | **✅ ~95% COMPLETE** | **Fully analyzed, separate module needed** |

**Note:** Rollladen uses server-side state management (obj_rollladen), different from main konfigurator.

**Manufacturers with catalog data:** Drutex ✅
**Manufacturers MISSING catalog data:** Other Rollladen manufacturers (often only 1-2 for Rollladen)

### 4I. VORSATZROLLLADEN (Surface Mount Shutters) — ✅ ~85% COMPLETE 🆕

> **UPDATE (March 11, 2026):** Vorsatzrollladen dataset analyzed from CEO-uploaded files.
> ADDITIVE architecture (Architecture C) confirmed — same as Aufsatzrollladen.
> Full analysis in `docs/VORSATZROLLLADEN_ANALYSIS.md`.

| Calculation Aspect | Status | Notes |
|---|---|---|
| Architecture type | ✅ ADDITIVE (C) | Same as Aufsatzrollladen: `Final = (Base + Surcharges) × 0.60` |
| Model catalog | ✅ 6 models | 3 Aluprof profiles (SK 45°, SKO-P Rund, SP-E 90° Unterputz) × ±insect protection |
| Model base prices | ✅ Complete (at min dims) | €171.98 (Model 1) to €502.17 (Model 5) at 800×1000 |
| Insect protection | ✅ +€159.38 flat | Same surcharge amount as Aufsatzrollladen |
| Drive types | ✅ 9 options | **IDENTICAL** to Aufsatzrollladen (€0–€769.05) |
| Panel colors | ✅ 12 options | **IDENTICAL** to Aufsatzrollladen (10 std + 2 premium) |
| Box height | ✅ 3 options | 137mm/165mm/180mm — all €0 (different from Aufsatz) |
| Rails | ✅ 2 options | Standard/Premium — both €0 |
| Lamella width | ✅ 1 option | 39mm — €0 |
| Drive side | ✅ 2 options | Links/Rechts — both €0 |
| Dimension constraints | ✅ Complete | 800–2600mm W × 1000–1300mm H (narrower height than Aufsatz) |
| Discount factor | ✅ 0.60 | Confirmed (same universal discount) |
| Calculator code | ✅ JS + Python | Ready for integration |
| Full W×H price matrix | ⚠️ PARTIAL | Only model base prices at 800×1000; need full grid |
| Size-based scaling | ⚠️ Sample data only | Price increases with width observed, formula not derived |
| Weight formula | ❌ NOT documented | May not apply to surface mount installation |
| **Overall Vorsatz Calc** | **✅ ~85% COMPLETE** | **Architecture confirmed, models + surcharges documented. Need full W×H matrix.** |

**Key insight:** Vorsatz and Aufsatz share the same ADDITIVE architecture and many identical surcharges (colors, drives, discount). Engine can reuse shared components.

**Manufacturers with catalog data:** Aluprof/fenstermaxx24 ✅
**Manufacturers MISSING catalog data:** Other Vorsatzrollladen manufacturers

### 4J. RAFFSTORE (External Blinds) — ✅ ~90% COMPLETE 🆕

> **UPDATE (March 12, 2026):** Raffstore dataset (7 files) analyzed from CEO-uploaded files.
> - ADDITIVE architecture confirmed (Architecture C, server-side — same as Rollladen)
> - 9-point W×H base price matrix documented (Vorsatz, DRUTEX)
> - 12 surcharge items with EUR values, 12 color options
> - 2 types (Vorsatz base €681.57, Aufsatz +€248.87), 4 models, 3 slat types
> - 5 motor options (€0 to +€332.01) + smart home steuerung (+€104.73)
> - Dimension limits: 800-4000mm W × 800-2500mm H
> - Full JS configuration rules + 3 API endpoints documented
> - Width-dominant pricing (first 250mm W = +€216.46 vs +€58.14 H)
> - Discount factor 0.60 confirmed. Full analysis in `RAFFSTORE_ANALYSIS.md`.

| Calculation Aspect | Status | Notes |
|---|---|---|
| Architecture classification | ✅ CONFIRMED | ADDITIVE (Architecture C, server-side AJAX — same as Rollladen) |
| Discount factor | ✅ CONFIRMED | 0.60 (40% off list price) |
| Base price matrix (Vorsatz) | ✅ HAVE | 9 data points (W×H), non-linear pricing |
| Dimension limits | ✅ COMPLETE | 800-4000mm W × 800-2500mm H |
| Type surcharges | ✅ COMPLETE | Aufsatz adds +€248.87 at base |
| Model surcharges | ✅ COMPLETE | 4 models (2 per type), 300mm box = +€31.43 |
| Slat type surcharges | ✅ COMPLETE | 3 types: C-80 (€0), Z-90 (+€31.43), S-90 (+€31.43) |
| Color system (box) | ✅ COMPLETE | 6 options: standard €0, 5 non-standard flat €31.43 |
| Color system (slats) | ✅ COMPLETE | 6 options: ALL €0 surcharge |
| Motor surcharges | ✅ COMPLETE | 5 options: standard €0 to premium +€332.01 |
| Steuerung (smart home) | ✅ HAVE | uWIFI Blebox +€104.73 |
| Putzleiste | ✅ HAVE | +€31.43 (Vorsatz only) |
| Configuration rules | ✅ COMPLETE | Full JS logic for all conditional display rules |
| API endpoints | ✅ COMPLETE | berechnen, minmax, addWarenkorb |
| Aufsatz base price matrix | ⚠️ PARTIAL | Only Aufsatz surcharge at base size known (+€248.87), size scaling unknown |
| More W×H data points | ⚠️ NEED | 9 points → ideally 24+ (like Aufsatzrollladen 6W×4H) |
| Fernbedienung options | ❌ MISSING | `fst` parameter exists but no surcharges captured |
| Windschutz options | ❌ MISSING | `wss` parameter exists but no surcharges captured |
| Kastendeckel options | ❌ MISSING | `kd` parameter (Aufsatz only), no surcharges |
| Adapter options | ❌ MISSING | `ada` parameter (Aufsatz only), no surcharges |
| **Overall Raffstore Calc** | **✅ ~90% COMPLETE** | **Architecture confirmed, core surcharges documented. Need more W×H data + a few missing option prices.** |

**Key insight:** Raffstore is the 4th product confirmed using Architecture C (ADDITIVE, server-side). The engine module for Aufsatzrollladen/Vorsatzrollladen can be extended to handle Raffstore with product-specific surcharge categories (slat types, independent box/slat colors, type switch).

**Manufacturers with catalog data:** DRUTEX ✅
**Manufacturers MISSING catalog data:** Other Raffstore manufacturers

### 4K. INSEKTENSCHUTZ PLISSEE (Insect Protection) — ✅ ~95% COMPLETE ⬆️

> **UPDATE (March 11, 2026):** Insektenschutz Plissee dataset analyzed from CEO-uploaded files.
> **UPDATE (March 12, 2026):** 4 new files added — expanded size×price matrix (13 points), individual color testing, API docs, complete research.
> - ADDITIVE architecture confirmed (Architecture C — same as Rollladen)
> - SIMPLEST product analyzed — only Plissee type selection + dimensions affect price
> - 2 Plissee types, 5 colors (all free — individually tested and confirmed), 2 directions (all free)
> - ⚠️ CORRECTED: Width IS significant (not minimal as previously stated). Non-linear pricing.
> - ⚠️ NEW: Height ceiling effect at 2300mm — no price increase above this height
> - ⚠️ NEW: Client-side calculation (no server API calls — different from Rollladen)
> - Full analysis in `INSEKTENSCHUTZ_ANALYSIS.md`

| Calculation Aspect | Status | Notes |
|---|---|---|
| Base pricing (Plissee types) | ✅ COMPLETE | 1-teilige: €906.50, 2-teilige: €1,693.50 (+€787.00) |
| Discount factor | ✅ CONFIRMED | 0.60 (40% off) — identical to all products |
| Frame colors | ✅ FULLY CONFIRMED ⬆️ | 5 RAL Matt colors — ALL €0 surcharge (each individually tested March 12) |
| Opening directions | ✅ COMPLETE | 2 options — ALL €0 surcharge |
| Net color | ✅ COMPLETE | 1 option (Black) — €0 |
| Dimension constraints | ✅ COMPLETE | 700-2400mm W × 1900-2600mm H (door-height only, min 1900mm) |
| Size-based pricing | ✅ CORRECTED ⬆️ | Width IS significant (+€259 for 700→2150mm). Non-linear, steeper at larger widths. |
| Height ceiling effect | ✅ NEW ⬆️ | No price increase above 2300mm (2300mm = 2550mm = same price) |
| W×H price matrix | ✅ EXPANDED ⬆️ | 13 systematic data points (was 6 scattered). Width: 7 points, Height: 4 points, Combined: 3 points |
| Calculator implementations | ✅ COMPLETE | JS + Python available |
| API & element IDs | ✅ NEW ⬆️ | Form element IDs (breite, hoehe, typ1/typ2, pl_l/pl_r, fs1_01-fs1_05), client-side calculation |
| 2-teilige dimension pricing | ❌ PARTIAL | Still only one data point for 2-teilige base |
| Complete color catalog | ⚠️ PARTIAL | 5 colors confirmed and tested — but CEO noted set may be incomplete |
| **Overall Insektenschutz Calc** | **✅ ~95% COMPLETE** ⬆️ | **Improved from 90%. 13 price data points, all colors confirmed, height ceiling found. See `INSEKTENSCHUTZ_ANALYSIS.md`** |

### 4L. FENSTERBÄNKE (Window Sills) — ❌ NO DATA

| Calculation Aspect | Status | Notes |
|---|---|---|
| All aspects | ❌ UNKNOWN | Likely length-based simple calculation |
| **Overall Fensterbänke Calc** | **❌ 0% COMPLETE** | **Need to analyze** |

---

## 5. What Is the SAME Across All Manufacturers

> **IMPORTANT: These are confirmed identical for ALL 4 analyzed manufacturers (Drutex, Gealan, Holz, Alu)**

| What | Same? | Details |
|------|-------|---------|
| **Master Formula** | ✅ SAME | `angebotspreis = (base_price + surcharges) × 0.60` |
| **Discount Factor** | ✅ SAME | 0.60 for ALL manufacturers (40% off Preisempfehlung) |
| **Surcharge Method** | ✅ SAME | Additive, fixed EUR amounts — never percentages |
| **Surcharge Independence** | ✅ SAME | Surcharges do NOT depend on window size |
| **VAT Rate** | ✅ SAME | 19% MwSt |
| **Price Calculation Flow** | ✅ SAME | base → profile adjust → add surcharges → apply discount |
| **Configurator Steps** | ✅ SAME | Profil → Maße → Farbe → Glas → Sprossen → Rollladen → Sonstiges |
| **API Pattern** | ✅ SAME | POST /confapp/{Manufacturer}/{Product-Slug}/ajax/berechnen/ |
| **Response Fields** | ✅ SAME | grundpreis, aufpreis_profil, aufpreis_farbe, preisempfehlung, ersparnis, angebotspreis |
| **Quantity Discount Concept** | ✅ SAME | Tier-based volume discounts |

---

## 6. What Is DIFFERENT Per Manufacturer

> **IMPORTANT: These DIFFER between manufacturers — each needs its own data**

| What | Different? | Details |
|------|-----------|---------|
| **Surcharge EUR Amounts** | ❌ DIFFERENT | Same option = completely different price per manufacturer |
|  | | Example: Anthrazit color = €6.44 (Gealan) vs €43.68 (Drutex) vs €69.88 (Alu) vs €80.50 (Holz) |
| **Surcharge Category Count** | ❌ DIFFERENT | Drutex: 9 categories, Gealan: 22, Holz: 25, Alu: 28 |
| **Profile Pricing Method** | ❌ DIFFERENT | Drutex: single matrix × multiplier (0.95-1.29); Others: separate matrix per profile |
| **Base Price Matrix Size** | ❌ DIFFERENT | Drutex: 21×21 (441 cells), Gealan: 26×26 (676), Holz: varies, Alu: varies |
| **Dimension Range** | ❌ DIFFERENT | Each manufacturer supports different min/max sizes |
| **Dimension Step Size** | ❌ DIFFERENT | Drutex: 100mm steps, Others: may use 50mm or other |
| **Available Profiles** | ❌ DIFFERENT | Drutex: 6 (Iglo 5, Iglo 5 Classic, Iglo Energy, etc.), Gealan: 3, etc. |
| **Available Options** | ❌ DIFFERENT | Some have ornamental glass, others don't; security options vary |
| **Product Availability** | ❌ DIFFERENT | Not every manufacturer offers every product type |
| **Color Catalog** | ❌ DIFFERENT | Each has different available RAL/foil colors |

### Surcharge Price Comparison (Example: Same Option, All Manufacturers)

| Surcharge Option | Drutex PVC | Gealan PVC | Holz | Alu |
|---|---|---|---|---|
| Anthrazit Außenfarbe | €43.68 | €6.44 | €80.50 | €69.88 |
| 3-fach Premium Glas | €39.81 | €4.76 | €13.33 | €11.50 |
| Sicherheitsverglasung | €200.59 | €6.54 | €33.33 | €42.01 |
| Sprossen (Innen) | €29.37 | €10.22 | €12.50 | €23.83 |
| Rollladen (added) | €322.63 | €81.21 | N/A | N/A |

**Conclusion: You CANNOT reuse one manufacturer's surcharges for another. Each needs its own catalog.**

---

## 7. Missing Calculations — What We Still Need

### 7A. Calculations That Need to Be CREATED (from fenstermaxx24.com analysis)

These calculations we do NOT have yet and need to reverse-engineer from the website:

| Product | Architecture | Priority | Effort | Notes |
|---------|-------------|----------|--------|-------|
| **HST (Hebe-Schiebe-Tür)** | Likely Formula-based (B) | HIGH | Medium | Check if similar to PSK |
| **Smart-Slide** | Likely Formula-based (B) | MEDIUM | Medium | May be variant of HST |
| ~~**Falt-Schiebe-Tür**~~ | ~~Unknown~~ | ~~LOW~~ | ~~Medium~~ | ✅ **MOVED to 7B** — data received, now ~75% complete. See `docs/FALT_SCHIEBE_TUER_ANALYSIS.md` |
| ~~**Vorsatzrollladen**~~ | ~~Likely Additive (C)~~ | ~~MEDIUM~~ | ~~Small~~ | ✅ **ANALYZED** — ADDITIVE architecture confirmed, ~85% complete. See `docs/VORSATZROLLLADEN_ANALYSIS.md` |
| ~~**Raffstore**~~ | ~~Unknown~~ | ~~LOW~~ | ~~Medium~~ | ✅ **ANALYZED** — ADDITIVE architecture confirmed (server-side, same as Rollladen), ~90% complete. See `docs/RAFFSTORE_ANALYSIS.md` |
| ~~**Insektenschutz**~~ | ~~Likely Simple additive~~ | ~~LOW~~ | ~~Small~~ | ✅ **ANALYZED** — ADDITIVE architecture confirmed, ~90% complete. SIMPLEST product. See `docs/INSEKTENSCHUTZ_ANALYSIS.md` |
| **Insektenschutz (other types)** | Likely Additive (C) | LOW | Small | Check if Spannrahmen, Drehrahmen, etc. exist on configurator |
| **Fensterbänke** | Likely Linear (length-based) | LOW | Small | Simple length × price_per_meter |

### 7B. Calculations That Need COMPLETION

> **UPDATE (March 10, 2026):** CEO uploaded 3 Aluminium datasets addressing these gaps.
> Full analysis in `docs/7B_DATASET_ANALYSIS.md`.
> **UPDATE (March 10, 2026):** CEO uploaded 3 Falt-Schiebe-Tür Aluminium datasets.
> Full analysis in `docs/FALT_SCHIEBE_TUER_ANALYSIS.md`.
> **UPDATE (March 11, 2026):** CEO uploaded Holz Haustüren surcharge & sizing analysis.
> Threshold verified (Standard only), side panel SIZE-DEPENDENCY confirmed (non-linear).
> **UPDATE (March 11, 2026):** CEO uploaded Vorsatzrollladen dataset.
> ADDITIVE architecture confirmed, 6 models (3 Aluprof profiles × ±insect), shared surcharges with Aufsatz verified.
> Full analysis in `docs/VORSATZROLLLADEN_ANALYSIS.md`.
> **UPDATE (March 11, 2026):** CEO uploaded Insektenschutz Plissee dataset.
> ADDITIVE architecture confirmed, SIMPLEST product analyzed. 2 types, 5 colors (all free), height-dominant pricing.
> ⚠️ CEO noted: color data may be incomplete.
> Full analysis in `docs/INSEKTENSCHUTZ_ANALYSIS.md`.
> **UPDATE (March 12, 2026):** CEO uploaded 4 additional Insektenschutz files to Datasets branch.
> Expanded size×price matrix (13 data points), detailed color testing (all individually confirmed €0), API docs.
> KEY CORRECTIONS: Width IS significant (not minimal), height ceiling at 2300mm, client-side calculation.
> Insektenschutz Plissee improved to ~95% complete (was 90%).

| Product | What Was Missing | Data Received? | New Status | Remaining Gap |
|---------|-----------------|----------------|------------|---------------|
| **PSK** | Complete surcharge catalog, verify extreme size pricing | ✅ YES — 11+ surcharge options + color EUR amounts + multi-mfg size constraints + height limit resolved | **~85%** (was 70%) | Exact glass/profile surcharges, PVC manufacturer base pricing, complete PVC color catalog |
| **Haustüren** | Side panel (Seitenteil) pricing, Transom (Oberlicht) pricing, threshold verification, side panel size-dep | ✅ YES — 7 Bautyp variants + Holz threshold + side panel sizing | **~95%** (was 92%) | Exact EUR prices. Side panel needs width-based formula (NOT fixed surcharge). |
| **Balkontüren** | Verify threshold-specific surcharges | ✅ YES — 4 threshold types confirmed | **~97%** (was 95%) | Exact EUR prices |
| **Falt-Schiebe-Tür** | ALL calculation data (was 0%) | ✅ YES — 3 files: calculation logic + size pricing + surcharges | **~75%** (was 0%) | Exact EUR values, verify % colors, derive non-linear formula, quantify glass weight limits |
| **Insektenschutz Plissee** | ALL calculation data (was 0%) | ✅ YES — 3+4 files: data + calculator (JS + Python) + size matrix + color testing + API + research | **~95%** (was 0%→90%→95%) ⬆️ | 2-teilige dimension pricing, ⚠️ complete color catalog (5 confirmed, but CEO noted set may be incomplete) |

**New data received per product:**

**Balkontüren (Alu):**
- 4 threshold types: Standard (€0), Flache Schwelle (€120-180), Magnet-Schwelle (€250-350), Rollstuhlgerecht (€150-220)
- 11 hardware surcharge options (Kämpfer, Griffe variants, Aufbohrschutz, Sicherheitsbeschläge, Verdeckte Beschläge, Reedkontakt, Schnäpper, Lüftung, Rahmenverbreiterung)
- Dimension constraints: Single 440-1200mm W × 1700-2400mm H; Double 760-2000mm W

**Haustüren (Alu):**
- 7 Bautyp variants: 1 Flügel (€0), +Seitenteil links/rechts (€600-900 each), +2 Seitenteile (€1200-1800), +Oberlicht (€350-550), +OL+SL (€950-1450), 2 Flügel (€1500-2200)
- 5 security options: Verriegelung 3-fach (€80-150), Elektroöffner (€45-75), Fingerprint (€450-750), Türschließer (€120-220), Hinterbandsicherung (€35/unit)
- Side panel width range: 300-1000mm; Max total height with transom: 3000mm

**Haustüren (Holz — NEW March 11, 2026):**
- Threshold: Drutex Holz only offers Standard threshold (€0). No Flache/Magnet/Rollstuhlgerecht options. PIRNAR uses separate shop items — no direct comparison possible.
- Side panels: CONFIRMED SIZE-DEPENDENT (non-linear). NOT a fixed surcharge.
  - 330mm width → +€378.19 surcharge
  - 500mm width → +€642.95 surcharge
  - 1000mm width → +€1,684.23 surcharge
  - Reference: 1-Wing door, Pine, 1900mm height, base price €1,290.46 (40% discount applied)
- **Catalog data extracted (March 11, 2026):**
  - 2 profiles: Kiefer SOFTLINE 68mm (€1,290–€1,801), Meranti SOFTLINE 68mm (€1,424–€1,970)
  - 50 price matrix data points (5 widths × 5 heights × 2 profiles)
  - 23 model surcharges: €0 (m1) to €701.69 (m15), across 5 tiers
  - Security: 5-fach Verriegelung +€87.54, Klasse C Schloss +€30.87, Hinterbandsicherung +€43.33
  - Functional: Elektroöffner +€61.02, Türschließer +€67.00
  - Meranti premium over Kiefer: ~9.4% (separate absolute matrices, not multiplicative)
  - Discount factor: 0.60 confirmed exact
  - **Still missing:** Color surcharges, glass surcharges, handle surcharges (~35% of catalog data)
- **Engine impact:** Side panel pricing needs width-based formula (polynomial or stepped), not fixed EUR lookup. This differs from the 7B Alu data which showed fixed-range surcharges per Bautyp. Holz W:H ratio = 1.6× (much more balanced than PVC 23×).

**PSK (Alu):**
- 4 profiles: MB-70 (€2,396.21 base), MB-70 HI, MB-86 SI, MB-79N SI
- 11+ surcharges: Rahmenverbreiterung (25/50/100mm → €50/100/200), Sprossen innenliegend (8/18/26mm → €150/200/250), Rollladen (€500+), Fensterbankanschluss (€30), Griffolive (€50), RC2 (€150), Reedkontakt (€80), Auto-Getriebe UP (€120), HS-Master Elektroantrieb (€1,200+)
- **NEW (March 12, 2026):** Color surcharges are FIXED EUR: RAL=€299.53, Wood=€599.05, Metallic=€1,198.10. Per-side (both sides = 2×)
- **NEW:** Height hard limit 2400mm for ALL manufacturers (Aluprof, Aluplast, Gealan) — no anomaly
- **NEW:** Multi-manufacturer size constraints: Aluprof 1500-3000×1700-2400, Aluplast 1400-3000×800-2400, Gealan 1800-4100×1900-2400
- **NEW:** PVC color tiers: White=€0, Decor 1-side=~€150, Decor 2-side=~€250, Special=~€350
- Glass: 6 types from €0 (standard) to €225 (3-fach + warme Kante). VSG ~€250, Ornament ~€150
- Full analysis in `docs/PSK_DATASET_ANALYSIS.md`

**Falt-Schiebe-Tür (NEW — March 10, 2026):**
- 3 files: Calculation Logic, Size-Based Price Changes, Surcharge Catalog
- 4 element configurations: 3-teilig (€4,986), 4-teilig (€6,101), 5-teilig (€8,012), 6-teilig (€8,772)
- NEW Architecture D: ELEMENT-FORMULA — element count × area-based scaling + surcharges
- Surcharges: 3 threshold types, folding direction, lock hardware, per-m² glass surcharges
- Discount: 0.60 confirmed; Dimension limits: 2280-6000mm W × 1900-2500mm H
- Full analysis in `docs/FALT_SCHIEBE_TUER_ANALYSIS.md`

**Insektenschutz Plissee (NEW — March 11, 2026; EXPANDED March 12, 2026):**
- **Original 3 files (March 11):** Research data (TXT), Calculator (JS), Calculator (Python)
- **4 new files (March 12):** Size×price matrix (13 data points), Color/options testing, API endpoints, Complete research
- 2 Plissee types: 1-teilige (€906.50), 2-teilige (€1,693.50 = +€787.00)
- ADDITIVE architecture (Architecture C) — same as Rollladen
- SIMPLEST product analyzed — only Plissee type + dimensions affect price; all colors/directions free
- 5 frame colors (RAL Matt): Weiß 9016, Anthrazitgrau 7016, Graubraun 8019, Tiefschwarz 9005, White Aluminium 9006 — ALL €0 (individually tested and confirmed March 12)
- 2 opening directions: both €0; 1 net color (Black): €0
- ⚠️ **CORRECTED (March 12):** Width HAS significant impact (+€259 for 700→2150mm). Previous "minimal impact" based on too few data points.
- ⚠️ **NEW (March 12):** Height ceiling at 2300mm — prices do NOT increase above 2300mm height
- ⚠️ **NEW (March 12):** Non-linear width pricing — steeper increases at larger widths (1700→1950: +€118 vs 700→950: +€15)
- ⚠️ **NEW (March 12):** Client-side calculation via JavaScript (no server API calls — unlike Rollladen which uses server-side AJAX)
- 13 price data points: W=[700,950,1200,1450,1700,1950,2150]×H=1900; W=700×H=[1900,2050,2300,2550]; plus 3 combined
- Dimension constraints: 700-2400mm W × 1900-2600mm H (door-height only)
- Discount: 0.60 confirmed
- ⚠️ CEO noted: color data may be incomplete — 5 colors confirmed, additional may exist
- Full analysis in `docs/INSEKTENSCHUTZ_ANALYSIS.md`

**⚠️ Note:** All prices are approximate ranges. Exact EUR values come from the final manufacturer catalog. For testing, use midpoint of each range.

**⚠️ Drutex Surcharge Note:** CEO observed Drutex surcharges may be higher due to analysis using a larger window size. Will be verified when surcharge catalog is provided. This does NOT affect the calculation logic — only the catalog data values. See `docs/FALT_SCHIEBE_TUER_ANALYSIS.md` Section 5 for details.

### 7C. Calculations That Are FULLY or MOSTLY COMPLETE ✅

| Product | Status | Can Accept New Catalog Data? |
|---------|--------|-----|
| **Fenster (all materials)** | ✅ 100% | YES — just add base prices + surcharge catalog |
| **Balkontüren** | ✅ ~97% | YES — threshold types now confirmed, exact prices from catalog |
| **Haustüren** | ✅ ~95% | YES — side panels + transoms known, threshold + size-dep verified via Holz data |
| **Rollladen (Aufsatz)** | ✅ ~97% | YES — just add catalog data |
| **Insektenschutz Plissee** | ✅ ~95% ⬆️ | YES — simplest product, 13 price points available, all colors confirmed. Just need 2-teilige matrix + verify complete color list |
| **Rollladen (Vorsatz)** | ✅ ~85% | MOSTLY — need full W×H matrix |
| **Falt-Schiebe-Tür** | ⚠️ ~75% | MOSTLY — element-count logic known, need exact EUR + verify color method |

---

## 8. Catalog Data vs Calculations — Separation

### Your Understanding Is CORRECT ✅

```
CALCULATIONS (engine logic)          CATALOG DATA (fuel)
─────────────────────────           ──────────────────
We create from analysis              You provide from catalogs
                                    
├── Matrix lookup formula            ├── Base price matrices (EUR)
├── Formula-based pricing            ├── Surcharge catalogs (EUR)  
├── Additive component logic         ├── Profile lists & multipliers
├── Discount factor (×0.60)          ├── Available options per mfg
├── Surcharge addition logic         ├── Size ranges per product
└── Margin application               └── Your margin percentages
```

### Once Calculations Are Complete, Adding a New Manufacturer = JUST DATA

For a product where the calculation is complete (e.g., Fenster):
1. You provide the catalog (base prices + surcharges)
2. System extracts the data automatically
3. New manufacturer is available immediately

### For Products Where Calculation Is MISSING (e.g., HST):
1. First: We analyze fenstermaxx24.com to understand the calculation
2. Then: We code the calculation into the engine
3. Then: You provide catalogs, system works automatically

---

## 9. Exactly What Data You Need to Provide

### 9A. FOR FENSTER (Windows) — Calculation ✅ COMPLETE, Need Catalog Data

**Typical: 1-6 manufacturers, 3-6 materials**

| Manufacturer/Material | Have? | What You Need to Provide |
|---|---|---|
| Drutex PVC (Kunststoff) | ✅ HAVE | Nothing — integrated |
| Gealan PVC (Kunststoff) | ✅ HAVE | Nothing — data ready |
| Holz (Manufacturer TBD) | ✅ HAVE | Nothing — data ready |
| Salamander PVC | ❌ NEED | Base price catalog + Surcharge catalog |
| VEKA PVC | ❌ NEED | Base price catalog + Surcharge catalog |
| Rehau PVC | ❌ NEED | Base price catalog + Surcharge catalog |
| Schüco PVC | ❌ NEED | Base price catalog + Surcharge catalog |
| Aluplast PVC | ❌ NEED | Base price catalog + Surcharge catalog |
| Kunststoff-Alu (any mfg) | ❌ NEED | Base price catalog + Surcharge catalog |
| Holz-Alu (any mfg) | ❌ NEED | Base price catalog + Surcharge catalog |

**Per manufacturer catalog must include:**
- [ ] Profile list (which profiles are available)
- [ ] Base price matrix (width × height in cm or mm, with EUR prices)
- [ ] Profile multipliers OR separate price matrix per profile
- [ ] Surcharge catalog: Farbe Außen, Farbe Innen, Verglasung, Schallschutz, Sicherheitsverglasung, Sprossen, Öffnungsrichtung, Rollladen-Aufpreis, Sonstiges
- [ ] Size range (min/max width and height)
- [ ] Discount factor (we assume 0.60 — confirm or provide actual)

### 9B. FOR BALKONTÜREN (Balcony Doors) — Calculation ✅ ~95% COMPLETE

**Typical: 1-4 manufacturers, 3-4 materials**

| Manufacturer/Material | Have? | What You Need to Provide |
|---|---|---|
| Aluprof Aluminium | ✅ HAVE | Nothing — data ready |
| PVC (any manufacturer) | ❌ NEED | Base price catalog + Surcharge catalog |
| Holz (any manufacturer) | ❌ NEED | Base price catalog + Surcharge catalog |
| Holz-Alu (any mfg) | ❌ NEED | Base price catalog + Surcharge catalog |

**Same catalog format as Fenster, plus:**
- [ ] Threshold (Schwelle) options and surcharges
- [ ] Opening direction options specific to Balkontür

### 9C. FOR HAUSTÜREN (Front Doors) — Calculation ✅ ~95% COMPLETE

**Typical: 1-4 manufacturers, 2-4 materials**

| Manufacturer/Material | Have? | What You Need to Provide |
|---|---|---|
| Drutex PVC | ✅ HAVE | Nothing — data ready |
| Drutex Holz | ✅ HAVE (partial) | Threshold + side panel data verified (March 11, 2026) |
| Other PVC manufacturers | ❌ NEED | Model catalog + Price catalog + Surcharges |
| Aluminium doors | ❌ NEED | Model catalog + Price catalog + Surcharges |
| Other Holz doors | ❌ NEED | Model catalog + Price catalog + Surcharges |

**Per manufacturer catalog must include:**
- [ ] Model list with base prices (doors are model-based, not just size-based)
- [ ] Width/height pricing formula or table
- [ ] Color catalog with surcharges (typically 5 tiers)
- [ ] Electronic access system options + prices
- [ ] Handle options + prices
- [ ] Hinge color options + prices
- [ ] Security hardware options + prices
- [ ] Side panel (Seitenteil) options + prices — **⚠️ SIZE-DEPENDENT: need width-based pricing, not just fixed surcharges**
- [ ] Transom (Oberlicht) options + prices (if offered)
- [x] Threshold (Schwelle) options — verified: Drutex Holz=Standard only (€0)

### 9D. FOR TERRASSENTÜREN — Calculations Partially/Not Complete

#### PSK (Parallel-Schiebe-Kipptür) — Calculation ⚠️ ~85% COMPLETE

> **Updated March 12, 2026:** 5 new PSK data files analyzed. See `docs/PSK_DATASET_ANALYSIS.md`.

| Manufacturer/Material | Have? | What You Need to Provide |
|---|---|---|
| Drutex PVC | ⚠️ PARTIAL | Base price formula completion |
| Aluprof Aluminium | ⚠️ IMPROVED | Exact profile upgrade surcharges (MB-70 HI, MB-86 SI, MB-79N SI deltas) |
| Aluplast PVC | ⚠️ SIZE ONLY | Base pricing + full surcharge catalog |
| Gealan PVC | ⚠️ SIZE ONLY | Base pricing + full surcharge catalog |

**What's been resolved:**
- ✅ Height anomaly — 2400mm is hard limit for ALL manufacturers
- ✅ Alu color surcharges — fixed EUR: RAL=€299.53, Wood=€599.05, Metallic=€1,198.10 (per side)
- ✅ Multi-manufacturer size constraints documented
- ✅ 11+ surcharge items now cataloged

**What you still need to provide:**
- [ ] Exact profile upgrade surcharges (HI, SI variants)
- [ ] Aluplast/Gealan base pricing at reference sizes
- [ ] Exact PVC per-decor color surcharges
- [ ] Verify glass surcharges (VSG ~€250, Ornament ~€150 marked as "example")

#### HST (Hebe-Schiebe-Tür) — Calculation ❌ 0% COMPLETE

**We need to analyze fenstermaxx24.com FIRST before you can provide useful data.**

#### Smart-Slide — Calculation ❌ 0% COMPLETE

**We need to analyze fenstermaxx24.com FIRST.**

#### Falt-Schiebe-Tür — Calculation ⚠️ ~75% COMPLETE (was 0%)

> **UPDATE (March 10, 2026):** CEO provided 3 Aluminum datasets. Full analysis in `docs/FALT_SCHIEBE_TUER_ANALYSIS.md`.

**Architecture:** NEW — ELEMENT-FORMULA (Architecture D). Element count (3-6 parts) × area-based scaling + additive surcharges.

| Manufacturer/Material | Have? | What You Need to Provide |
|---|---|---|
| Aluprof Aluminium | ⚠️ PARTIAL | Exact EUR prices (ranges provided, not single values) |
| PVC (any mfg) | ❌ NEED | Full catalog — IF you plan to offer PVC Falt-Schiebe |
| Holz-Alu (any mfg) | ❌ NEED | Full catalog — IF you plan to offer Holz-Alu Falt-Schiebe |

**What's still needed from analysis:**
- Verify if color surcharges are percentage-based (15-25%) or fixed EUR
- Derive precise non-linear scaling formula (more data points or deeper website analysis)
- Quantify glass weight auto-limit thresholds

**What you need to provide (from catalog):**
- [ ] Exact base prices per element count (3, 4, 5, 6 parts)
- [ ] Complete surcharge catalog with exact EUR values
- [ ] Color surcharge catalog (verify if percentage or fixed)
- [ ] Glass type pricing (triple, ESG/VSG, Warme Kante)
- [ ] Profile list (if multiple profiles exist beyond MB-86 Fold Line)

### 9E. FOR ROLLLADEN (Shutters) — Calculation ✅ ~95% COMPLETE (Aufsatz only)

**Typically only 1-2 manufacturers for Rolladen (NOT 3-6 like windows)**

| Type/Manufacturer | Have? | What You Need to Provide |
|---|---|---|
| Aufsatzrollladen Drutex | ✅ HAVE | Nothing — data ready |
| Aufsatzrollladen (other mfg) | ❌ NEED | Catalog data (after we confirm same calc applies) |
| Vorsatzrollladen (any mfg) | ❌ NEED | **Calculation needed first** from fenstermaxx24.com |

**Per Rollladen catalog must include:**
- [ ] Model/variant list with base prices
- [ ] Kastenhoehe options (175mm, 215mm, etc.)
- [ ] Drive type options + prices (Gurt, Kurbel, Motor variants)
- [ ] Color options for Kasten + Panzer
- [ ] Width × Height pricing table
- [ ] Seitenblende + Putzträger options + prices

### 9F. FOR RAFFSTORE — Calculation ✅ ~90% COMPLETE 🆕

> **UPDATE (March 12, 2026):** Raffstore dataset analyzed — ADDITIVE architecture confirmed. See `docs/RAFFSTORE_ANALYSIS.md`.

**Raffstore uses same architecture as Rollladen — catalog data can be used NOW.**

### 9G. FOR INSEKTENSCHUTZ, FENSTERBÄNKE — Calculations Partially/Not Complete

**Insektenschutz Plissee is ~95% complete. Other types and Fensterbänke need analysis from fenstermaxx24.com FIRST.**

---

## 10. Priority Order

### Phase A: COMPLETE MISSING CALCULATIONS (from website analysis)

These need to be done before catalog data is useful:

| # | Product | Effort | Priority |
|---|---------|--------|----------|
| A1 | PSK — exact glass/profile surcharges + PVC base pricing | Small | MEDIUM |
| A2 | HST — full calculation analysis | Medium | HIGH |
| A3 | Haustüren — side panel + transom | Medium | MEDIUM |
| A4 | Smart-Slide — calculation analysis | Medium | MEDIUM |
| A5 | Vorsatzrollladen — calculation analysis | Small | MEDIUM |
| ~~A6~~ | ~~Falt-Schiebe-Tür — calculation analysis~~ | ~~Medium~~ | ✅ **~75% DONE** — verify color % + derive formula |
| ~~A7~~ | ~~Raffstore — calculation analysis~~ | ~~Medium~~ | ✅ **~90% DONE** — ADDITIVE architecture confirmed, 12 surcharges + 12 colors. See `RAFFSTORE_ANALYSIS.md` |
| A8 | Insektenschutz — calculation analysis | Small | LOW |
| A9 | Fensterbänke — calculation analysis | Small | LOW |

### Phase B: PROVIDE CATALOG DATA (from your catalogs)

Once calculations are complete, provide catalogs in this priority order:

| # | Product/Material | # Manufacturers Needed |
|---|---|---|
| B1 | Fenster PVC — remaining manufacturers | 3-4 more (Salamander, VEKA, Rehau, Schüco) |
| B2 | Fenster Kunststoff-Alu | 1-3 manufacturers |
| B3 | Fenster Holz-Alu | 1-3 manufacturers |
| B4 | Balkontüren PVC | 1-3 manufacturers |
| B5 | Balkontüren Holz | 1-2 manufacturers |
| B6 | Haustüren (additional mfg) | 1-3 manufacturers |
| B7 | PSK (additional mfg) | 1-2 manufacturers |
| B8 | HST (all mfg) | 1-2 manufacturers |
| B9 | Smart-Slide (all mfg) | 1-2 manufacturers |
| B10 | Vorsatzrollladen | 1-2 manufacturers |
| B11 | Remaining products | As needed |

### Phase C: ADD YOUR MARGINS

For each product/manufacturer combination:
- [ ] Define your margin (% or fixed EUR on top of Angebotspreis)
- [ ] Define any customer-facing discounts or promotions
- [ ] Define quantity discount tiers (if different from manufacturer defaults)

---

## Summary: What You Can Do RIGHT NOW

### You CAN Provide Now (calculations are ready):
1. **Fenster catalogs** for Salamander, VEKA, Rehau, Schüco, Aluplast, Kunststoff-Alu, Holz-Alu
2. **Balkontür catalogs** for PVC, Holz, Holz-Alu manufacturers
3. **Haustür catalogs** for additional manufacturers (basic models, side panels TBD)
4. **Rollladen catalogs** for additional Aufsatz manufacturers
5. **Your margin percentages** for all products

### You Need to WAIT (calculations not ready yet):
1. HST catalogs — we need to analyze the calculation first
2. Smart-Slide catalogs — calculation needed first
3. Falt-Schiebe-Tür catalogs — calculation ~75% done, need exact EUR + color method
4. Fensterbänke catalogs — calculation needed first

### You CAN Provide Now (calculations recently completed):
6. **Raffstore catalogs** for additional manufacturers — calculation ✅ ~90% done (ADDITIVE same as Rollladen)
7. **Vorsatzrollladen catalogs** for additional manufacturers — calculation ✅ ~85% done
8. **Insektenschutz catalogs** for additional manufacturers/types — calculation ✅ ~95% done

### For Testing: We Use Existing Price Data
✅ Correct — for testing and development, we use the price data we already have (Drutex, Gealan, Holz, Alu). Real catalog prices are plugged in later.
