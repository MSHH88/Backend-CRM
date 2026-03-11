# Getting Data — Calculations & Catalog Data Checklist

> **Last Updated:** March 11, 2026
> **Purpose:** Know exactly what we have and what we still need to gather
> **Format:** ✅ = Have, ❌ = Need, ⚠️ = Partial

---

## Table of Contents

1. [Overall Status](#1-overall-status)
2. [Calculations Status (Engine Logic)](#2-calculations-status-engine-logic)
3. [Catalog Data Status (EUR Prices)](#3-catalog-data-status-eur-prices)
4. [Product-by-Product Checklist](#4-product-by-product-checklist)
5. [Still Need to Gather — Action Items](#5-still-need-to-gather--action-items)
6. [Data Format Required](#6-data-format-required)

---

## 1. Overall Status

| Category | Progress | Details |
|----------|----------|---------|
| **Calculations (engine logic)** | **~83%** | 6 of 12 product types have calculations (Haustüren ~95%, Rollladen ~97%) |
| **Catalog data (EUR prices)** | **~20%** | 8 of ~40 manufacturer/material combos (Holz Haustür ~65%, Rollladen upgraded to ~98%) |

**Key:** Calculations = HOW prices are computed (from website analysis). Catalog data = ACTUAL prices (from manufacturer catalogs).
Once a calculation is complete, adding a new manufacturer = just providing catalog data.

---

## 2. Calculations Status (Engine Logic)

### What We Have ✅

- [x] **Fenster (Windows)** — 100% complete
  - [x] Base price matrix lookup (2D width×height)
  - [x] Profile system pricing (multiplier + absolute methods)
  - [x] All surcharge categories (color, glazing, sound, security, muntins, opening, roller shutter)
  - [x] Discount calculation (×0.60 universal)
  - [x] Quantity discount tiers
  - [x] Can handle ANY new manufacturer with just catalog data

- [x] **Balkontüren (Balcony Doors)** — ~97% complete
  - [x] Base price matrix lookup (same as Fenster)
  - [x] Profile system pricing
  - [x] All surcharges
  - [x] Threshold options (4 types confirmed: Standard, Flache, Magnet, Rollstuhlgerecht)
  - [x] Opening direction options
  - [ ] Exact EUR threshold prices (have ranges, need catalog values)

- [x] **Haustüren (Front Doors)** — ~95% complete (was ~92%)
  - [x] Base dimension pricing (formula-based, width-dominant)
  - [x] Width/height impact calculation (+€37.77/100mm W, +€1.64/100mm H)
  - [x] Model selection tiers (3 tiers)
  - [x] Color surcharges (5 tiers)
  - [x] Electronic access systems
  - [x] Side panels — 7 Bautyp variants (from 7B Alu data)
  - [x] Transom pricing (from 7B Alu data)
  - [x] Security/access options
  - [x] Threshold surcharges verified — Drutex Holz: only Standard threshold (€0), no other options offered. PIRNAR uses separate shop (not same configurator). Threshold options are manufacturer-specific.
  - [x] Side panel surcharges are SIZE-DEPENDENT ✅ CONFIRMED — non-linear increase with width: +€378 at 330mm, +€643 at 500mm, +€1,684 at 1000mm (Drutex Holz, 1-Wing, Pine, 1900mm H). Not a fixed fee — dynamic calculation based on dimensions.
  - [ ] Exact EUR prices (have ranges, need catalog values)

- [x] **Rollladen Aufsatz (Integrated Shutters)** — ~97% complete (was ~95%)
  - [x] Base dimension pricing — **COMPLETE 24-point matrix** (6W × 4H)
  - [x] Kastenhoehe variants (175mm vs 215mm) — 215mm = -€65.01 discount
  - [x] Model selection (4 models) — insect protection +€159.38
  - [x] Drive type surcharges — **EXPANDED to 9 options** (was 6): added Motor Rescue €638.94, Somfy OXIMO €576.95, Somfy + Remote €769.05
  - [x] Color surcharges (Kasten + Panzer) — **12 colors confirmed** (was 11 + 1 unconfirmed): Nussbaum CORRECTED €81.71→€63.14, Braun Metallic CONFIRMED €0, added Beige €0
  - [x] Seitenblende + Putzträger surcharges — Putzträger beidseitig CORRECTED €35.25→€35.14
  - [x] Weight calculation formula: `(H × W × 3.6 / 1M) / divisions`, max 12kg per section
  - [x] Calculator implementations available (JS + Python)
  - [ ] Seitenblende pricing not yet separately verified
  - [ ] Farbe Kasten/Führungsschienen not yet separated from base
  - [ ] Verify with second manufacturer (only have Drutex)

- [x] **Falt-Schiebe-Tür (Folding Doors)** — ~75% complete
  - [x] Base pricing (element-count based, 3-6 parts)
  - [x] Size-based scaling (width + height impact)
  - [x] Discount factor confirmed (0.60)
  - [x] Dimension constraints (2280-6000mm W × 1900-2500mm H)
  - [x] Threshold surcharges (3 types)
  - [x] Folding direction surcharge
  - [x] Lock hardware surcharges
  - [x] Frame extension pricing
  - [ ] Glass surcharges — per m² values need verification
  - [ ] Color surcharges — percentage-based "15-25%" needs verification (fixed EUR or %?)
  - [ ] Exact EUR values (all prices are approximate ranges)
  - [ ] Non-linear scaling formula (behavior described, exact formula not derived)
  - [ ] Glass weight auto-limits (thresholds not quantified)

- [x] **PSK (Parallel-Schiebe-Kipptür)** — ~70% complete
  - [x] Base price logic (width ranges with flat/progressive pricing)
  - [x] Profile options (5 profiles)
  - [x] Opening types (4 variants)
  - [x] Extreme size pricing rules (from 7B data)
  - [x] Alu profiles (4 profiles from 7B data)
  - [ ] Height pricing — data anomalies at 2500mm+ need resolution
  - [ ] Full color surcharge catalog (base colors known, full catalog MISSING)
  - [ ] Verify if Alu uses percentage-based color surcharges
  - [ ] Full glass surcharge catalog (6 types known, need complete list)
  - [ ] Full surcharge catalog depth (5 options received, ~20+ expected)
  - [ ] Exact EUR prices from catalog

### What We DON'T Have ❌

- [ ] **HST (Hebe-Schiebe-Tür)** — 0% complete
  - [ ] No data extracted yet
  - [ ] Likely similar to PSK (formula-based) but larger sizes
  - [ ] Need to analyze from fenstermaxx24.com
  - [ ] Then need catalog data from manufacturer

- [ ] **Smart-Slide** — 0% complete
  - [ ] No data extracted yet
  - [ ] May be variant of HST
  - [ ] Need to analyze from fenstermaxx24.com

- [ ] **Vorsatzrollladen (External Shutters)** — 0% complete
  - [ ] Likely similar additive architecture to Aufsatzrollladen
  - [ ] Need to analyze from fenstermaxx24.com

- [ ] **Raffstore (External Blinds)** — 0% complete
  - [ ] May be additive like Rollladen or unique
  - [ ] Need to analyze from fenstermaxx24.com

- [ ] **Insektenschutz (Insect Protection)** — 0% complete
  - [ ] Likely simple additive pricing (W×H formula)
  - [ ] Need to analyze

- [ ] **Fensterbänke (Window Sills)** — 0% complete
  - [ ] Likely length-based simple calculation (length × price_per_meter)
  - [ ] Need to analyze

---

## 3. Catalog Data Status (EUR Prices)

### What We Have ✅

| # | Product | Manufacturer | Material | Status |
|---|---------|-------------|----------|--------|
| 1 | Fenster | Drutex | PVC/Kunststoff | ✅ **INTEGRATED** — 441 data points |
| 2 | Fenster | Gealan | PVC/Kunststoff | ✅ **Ready** — per-profile pricing |
| 3 | Fenster | Drutex | Holz (Wood) | ✅ **Ready** — 378 data points |
| 4 | Balkontür | Aluprof | Aluminium | ✅ **Ready** — 288 data points |
| 5 | Haustür | Drutex | PVC/Kunststoff | ✅ **Ready** — formula-based |
| 6 | Rollladen | Drutex | Generic | ✅ **COMPREHENSIVE** — 24 base prices, 9 drives, 12 colors, weight formula. See `AUFSATZROLLLADEN_ANALYSIS.md` |
| 7 | PSK | Drutex | PVC/Kunststoff | ⚠️ **PARTIAL** — need full surcharges |
| 8 | Haustür | Drutex | Holz (Wood) | ⚠️ **~65%** — base prices + 9 surcharges; missing colors, glass, handles (see `HOLZ_HAUSTUER_ANALYSIS.md`) |

### What We DON'T Have ❌

**Fenster (Windows) — need ~7+ more combos:**

| Manufacturer | PVC | Holz | Holz-Alu | Kunststoff-Alu | Alu |
|-------------|:---:|:----:|:--------:|:--------------:|:---:|
| Drutex | ✅ | ✅ | ❌ | ❌ | ❌ |
| Gealan | ✅ | — | — | — | — |
| Salamander | ❌ | — | — | — | — |
| VEKA | ❌ | — | — | — | — |
| Rehau | ❌ | — | — | — | — |
| Schüco | — | — | ❌ | ❌ | ❌ |
| Aluplast | ❌ | — | — | — | — |

**Haustüren (Front Doors) — need ~5+ more combos:**

| Manufacturer | PVC | Holz | Aluminium | Holz-Alu |
|-------------|:---:|:----:|:---------:|:--------:|
| Drutex | ✅ | ⚠️ ~65% | ❌ | — |
| Schüco | — | — | ❌ | — |
| Hörmann | ❌ | ❌ | ❌ | — |

**Balkontüren (Balcony Doors) — need ~5+ more combos:**

| Manufacturer | PVC | Holz | Aluminium | Holz-Alu | Kunststoff-Alu |
|-------------|:---:|:----:|:---------:|:--------:|:--------------:|
| Aluprof | — | — | ✅ | — | — |
| Drutex | ❌ | ❌ | — | — | ❌ |
| Schüco | — | — | ❌ | ❌ | — |

**Terrassentüren (PSK / HST / Smart-Slide / Falt-Schiebe) — need ~5+ more combos:**

| Type | Status |
|------|--------|
| PSK — Drutex PVC | ⚠️ PARTIAL — need full surcharge catalog |
| PSK — Other manufacturers | ❌ NEED |
| HST — All manufacturers | ❌ NEED |
| Smart-Slide — All manufacturers | ❌ NEED |
| Falt-Schiebe-Tür — All manufacturers | ❌ NEED (have Alu ranges only) |

**Rollladen / Sonnenschutz — need ~3+ more combos:**

| Type | Status |
|------|--------|
| Aufsatzrollladen — Drutex | ✅ **COMPREHENSIVE** — 24 prices, 9 drives, 12 colors, calculators |
| Vorsatzrollladen — All | ❌ NEED |
| Raffstore — All | ❌ NEED |
| Insektenschutz (standalone) | ❌ NEED |

---

## 4. Product-by-Product Checklist

### 4A. Fenster (Windows) — Calculation ✅ COMPLETE

**Engine logic: DONE. Just need catalog data for new manufacturers.**

Per manufacturer catalog checklist:
- [ ] Profile systems list (names + Uw values)
- [ ] Base price matrix (width × height in mm → EUR)
- [ ] Profile multipliers OR separate price matrix per profile
- [ ] Surcharge: Farbe Außen (exterior color) options + EUR prices
- [ ] Surcharge: Farbe Innen (interior color) options + EUR prices
- [ ] Surcharge: Verglasung (glazing) options + EUR prices
- [ ] Surcharge: Schallschutz (sound insulation) options + EUR prices
- [ ] Surcharge: Sicherheitsverglasung (security glass) options + EUR prices
- [ ] Surcharge: Sprossen (muntins) options + EUR prices
- [ ] Surcharge: Öffnungsrichtung (opening type) options + EUR prices
- [ ] Surcharge: Ornamentglas options + EUR prices
- [ ] Surcharge: Griff (handle) options + EUR prices
- [ ] Size range (min/max width and height)
- [ ] Discount factor confirmation (expect 0.60)
- [ ] Any manufacturer-specific extras

### 4B. Balkontüren (Balcony Doors) — Calculation ✅ ~97% COMPLETE

**Same as Fenster checklist, PLUS:**
- [ ] Threshold (Schwelle) options + EUR surcharges
- [ ] Balkontür-specific opening direction options
- [ ] Exact EUR for 4 threshold types (Standard, Flache, Magnet, Rollstuhlgerecht)

### 4C. Haustüren (Front Doors) — Calculation ✅ ~95% COMPLETE

> **UPDATE (March 11, 2026):** Holz Haustüren data analyzed from CEO-uploaded file.
> - Threshold: Drutex Holz only offers Standard (€0), no other options. PIRNAR uses separate shop.
> - Side panels: CONFIRMED size-dependent, non-linear pricing (+€378 at 330mm to +€1,684 at 1000mm).
> - **Impact on engine:** Side panel pricing needs width-based formula, NOT fixed surcharge.
> - **NEW:** Drutex Holz catalog data extracted: 2 profiles (Kiefer, Meranti), 50 price points, 9 surcharge categories, 23 models. See `HOLZ_HAUSTUER_ANALYSIS.md`.
> - **Still needed:** Color surcharges, glass surcharges, handle surcharges (not yet extracted from configurator).

Per manufacturer catalog checklist:
- [ ] Model list with base prices (grouped by tier)
- [ ] Width/height pricing formula or table
- [ ] Profile systems + price differences
- [ ] Color options + EUR prices (exterior and interior separately)
- [ ] Glazing options + EUR prices
- [ ] Electronic access system options + EUR prices
- [ ] Handle options + EUR prices
- [ ] Hinge color options + EUR prices
- [x] Threshold options — verified: manufacturer-specific (Drutex Holz: Standard only €0)
- [ ] Security hardware options + EUR prices (RC2, Verriegelung, etc.)
- [x] Side panel (Seitenteil) — CONFIRMED size-dependent: width-based formula needed (not fixed EUR)
  - Drutex Holz reference: 330mm=+€378, 500mm=+€643, 1000mm=+€1,684 (1-Wing, Pine, 1900mm H)
- [ ] Transom (Oberlicht) options + EUR prices
- [ ] Discount factor confirmation

### 4D. Rollladen Aufsatz (Integrated Shutters) — Calculation ✅ ~97% COMPLETE, Catalog ✅ ~98%

> **UPDATE (March 11, 2026):** Comprehensive Aufsatzrollladen data analyzed from CEO-uploaded files.
> - Complete 24-point base price matrix (6W × 4H) — replaces partial data
> - 3 NEW drive types added: Motor Rescue (€638.94), Somfy OXIMO (€576.95), Somfy + Remote (€769.05)
> - Price CORRECTIONS: Nussbaum €81.71→€63.14, Braun Metallic confirmed €0, Putzträger beidseitig €35.25→€35.14
> - Weight formula documented: `(H × W × 3.6 / 1M) / divisions`, max 12kg
> - JS + Python calculator implementations provided. Full analysis in `AUFSATZROLLLADEN_ANALYSIS.md`.

**ADDITIVE architecture (Architecture C) — confirmed. Catalog data essentially complete.**

Per manufacturer catalog checklist:
- [x] Base price matrix (width × height → EUR) — **24 data points COMPLETE**
- [x] Model selection (4 models) — €0/€0/€159.38/€159.38
- [x] Drive type surcharges (9 options) — €0 to €769.05
- [x] Panel color surcharges (12 options) — 10 standard (€0), 2 premium (€27.86/€63.14)
- [x] Box height options (2) — 175mm €0, 215mm -€65.01 (discount)
- [x] Plaster carrier options (4) — €0 to €35.14
- [x] Weight calculation formula + constraints
- [x] Discount factor confirmed (0.60)
- [x] API endpoints documented (5 endpoints)
- [x] Calculator implementations (JS + Python)
- [ ] Seitenblende surcharge options (not yet separately tested)
- [ ] Farbe Kasten/Führungsschienen (box/guide rail color, not separated from base)
- [ ] Second manufacturer verification

### 4E. PSK (Terrace Sliding Door) — Calculation ⚠️ ~70% COMPLETE

**Still need both calculation completion AND catalog data:**
- [ ] Resolve height pricing anomalies at 2500mm+
- [ ] Complete color surcharge catalog (base colors → full catalog)
- [ ] Verify if Alu uses percentage-based color surcharges
- [ ] Complete glass surcharge catalog
- [ ] Full surcharge catalog (have 5 options, expect ~20+)
- [ ] Exact EUR prices from manufacturer catalog
- [ ] Profile list with base prices
- [ ] Size range and pricing table
- [ ] Discount factor confirmation

### 4F. HST (Lift-Slide Door) — Calculation ❌ 0% COMPLETE

**Need to FIRST analyze calculation logic, THEN gather catalog data:**
- [ ] Analyze HST configurator on fenstermaxx24.com
- [ ] Determine pricing architecture (likely formula-based like PSK)
- [ ] Document base price logic
- [ ] Document surcharge categories
- [ ] Extract sample prices for validation
- [ ] Then: gather manufacturer catalog data (same format as PSK)

### 4G. Smart-Slide — Calculation ❌ 0% COMPLETE

- [ ] Analyze Smart-Slide configurator on fenstermaxx24.com
- [ ] Determine if variant of HST or unique architecture
- [ ] Document pricing logic
- [ ] Extract sample prices for validation
- [ ] Then: gather manufacturer catalog data

### 4H. Falt-Schiebe-Tür (Folding Doors) — Calculation ⚠️ ~75% COMPLETE

**Element-formula architecture (Architecture D). Need to complete:**
- [ ] Verify glass surcharges per m² (exact EUR values)
- [ ] Verify color surcharges — percentage-based or fixed EUR?
- [ ] Derive exact non-linear scaling formula
- [ ] Quantify glass weight auto-limit thresholds
- [ ] Get exact EUR prices (currently have approximate ranges only)
- [ ] Gather additional manufacturer catalogs (have Alu ranges only)

### 4I. Vorsatzrollladen (External Shutters) — Calculation ❌ 0% COMPLETE

- [ ] Analyze Vorsatzrollladen configurator on fenstermaxx24.com
- [ ] Determine if same additive architecture as Aufsatzrollladen
- [ ] Document pricing components
- [ ] Then: gather manufacturer catalog data

### 4J. Raffstore (External Blinds) — Calculation ❌ 0% COMPLETE

- [ ] Analyze Raffstore configurator on fenstermaxx24.com
- [ ] Determine pricing architecture
- [ ] Document pricing components
- [ ] Then: gather manufacturer catalog data

### 4K. Insektenschutz (Insect Protection) — Calculation ❌ 0% COMPLETE

- [ ] Analyze pricing (likely simple W×H formula)
- [ ] Document options and surcharges
- [ ] Then: gather manufacturer catalog data

### 4L. Fensterbänke (Window Sills) — Calculation ❌ 0% COMPLETE

- [ ] Analyze pricing (likely length × price_per_meter)
- [ ] Document material options + prices
- [ ] Then: gather manufacturer catalog data

---

## 5. Still Need to Gather — Action Items

### Priority 1 — Complete Existing Calculations (Quick Wins)

- [ ] **PSK:** Get full surcharge catalog from Drutex (we have 5 of ~20+ surcharges)
- [ ] **Falt-Schiebe-Tür:** Verify color surcharge method (% or fixed EUR?) from catalog
- [ ] **Falt-Schiebe-Tür:** Get exact EUR prices (currently have ranges)
- [x] **Haustüren:** Verify threshold surcharges per manufacturer — ✅ DONE (Drutex Holz: Standard only €0, no alternatives. Threshold options are manufacturer-specific.)
- [x] **Haustüren:** Verify if side panel surcharges are size-dependent — ✅ CONFIRMED size-dependent (non-linear: +€378 at 330mm → +€1,684 at 1000mm)
- [ ] **Haustüren (Holz):** Extract color surcharges (Farbe Außen/Innen) — key missing data
- [ ] **Haustüren (Holz):** Extract glass/glazing surcharges — key missing data
- [ ] **Haustüren (Holz):** Extract handle surcharges (Griff) — missing data
- [ ] **Haustüren (Holz):** Gather more side panel width data points (every 100mm) for precise formula
- [ ] **Balkontüren:** Get exact EUR for threshold types
- [x] **Rollladen:** Update `rollladen_calculations.json` — Nussbaum €81.71→€63.14, Braun Metallic confirmed €0, Putzträger €35.25→€35.14
- [x] **Rollladen:** Add 3 new drive types (Motor Rescue €638.94, Somfy OXIMO €576.95, Somfy+Remote €769.05)
- [x] **Rollladen:** Add Beige color (farbe_panzer_12, €0)
- [ ] **Rollladen:** Test Seitenblende surcharge options separately
- [ ] **Rollladen:** Test Farbe Kasten/Führungsschienen separately from Panzerfarbe

### Priority 2 — Analyze Missing Calculations (From fenstermaxx24.com)

- [ ] **HST** — Analyze configurator, determine pricing architecture
- [ ] **Smart-Slide** — Analyze configurator, check if HST variant
- [ ] **Vorsatzrollladen** — Analyze configurator, likely similar to Aufsatz
- [ ] **Raffstore** — Analyze configurator, new product type
- [ ] **Insektenschutz** — Analyze pricing, likely simple
- [ ] **Fensterbänke** — Analyze pricing, likely simple

### Priority 3 — Gather Catalog Data for New Manufacturers

**Fenster (highest volume product):**
- [ ] Salamander PVC — Base price catalog + Surcharges
- [ ] VEKA PVC — Base price catalog + Surcharges
- [ ] Rehau PVC — Base price catalog + Surcharges
- [ ] Aluplast PVC — Base price catalog + Surcharges
- [ ] Holz-Alu (any manufacturer) — Base price catalog + Surcharges
- [ ] Kunststoff-Alu (any manufacturer) — Base price catalog + Surcharges

**Balkontüren:**
- [ ] PVC (any manufacturer) — Base price catalog + Surcharges
- [ ] Holz (any manufacturer) — Base price catalog + Surcharges

**Haustüren:**
- [ ] Second manufacturer (any) — Model catalog + Surcharges
- [ ] Aluminium doors — Model catalog + Surcharges

### Priority 4 — Premium & Remaining Products

- [ ] Schüco Aluminium windows — Full catalog
- [ ] Schüco Aluminium doors — Full catalog
- [ ] PSK complete — All manufacturers
- [ ] HST catalog data — After calculation is analyzed
- [ ] Vorsatzrollladen catalog data — After calculation is analyzed
- [ ] Raffstore catalog data — After calculation is analyzed
- [ ] Smart-Slide catalog data — After calculation is analyzed

### Open Question for CEO 🔑

- [ ] **What is our margin on top of Angebotspreis (60% of list)?**
  - Do we sell at Angebotspreis or add our own margin?
  - Same margin for all products or different per category?
- [ ] **Confirm discount factor is 0.60 for ALL manufacturers** (verified for Drutex, Gealan, Holz, Alu so far)

---

## 6. Data Format Required

When providing catalog data for any new manufacturer, we need:

### Per Manufacturer × Product Combo:

```
1. BASE PRICE DATA
   - Profile/system list (names, Uw values)
   - Price matrix: width × height → EUR (or formula for doors)
   - Per profile if prices differ by profile

2. SURCHARGE CATALOG
   - Every option with fixed EUR price
   - Grouped by category (color, glazing, security, etc.)
   - Both exterior and interior options separately

3. METADATA
   - Size range (min/max width and height in mm)
   - Discount factor (expect 0.60, confirm)
   - Available dimension steps (100mm, 50mm, etc.)
```

### Example JSON Format:
```json
{
  "manufacturer": "Salamander",
  "material": "PVC",
  "product": "Fenster",
  "profiles": [
    {
      "name": "Streamline 76",
      "uw_value": 1.1,
      "prices": {
        "500x500": 89.50,
        "600x600": 105.20
      }
    }
  ],
  "surcharges": {
    "verglasung": [
      { "name": "2-fach Standard", "price": 0.00 },
      { "name": "3-fach Premium", "price": 12.50 }
    ],
    "aussenfarbe": [
      { "name": "Weiß", "price": 0.00 },
      { "name": "Anthrazit", "price": 35.00 }
    ]
  }
}
```

---

## Quick Reference — Summary Table

| Product | Calculation | Catalog Data | Next Step |
|---------|:-----------:|:------------:|-----------|
| Fenster | ✅ 100% | ✅ 3 combos | Gather more manufacturer catalogs |
| Balkontüren | ✅ 97% | ✅ 1 combo | Gather PVC/Holz catalogs + exact EUR thresholds |
| Haustüren | ✅ 95% | ⚠️ 2 combos | Thresholds + side panels verified; Holz ~65% (need colors/glass); gather 2nd manufacturer |
| Rollladen (Aufsatz) | ✅ 97% | ✅ **~98%** | Comprehensive: 24 prices, 9 drives, 12 colors, JS+PY calcs. See `AUFSATZROLLLADEN_ANALYSIS.md` |
| Falt-Schiebe-Tür | ⚠️ 75% | ⚠️ Ranges | Verify color method + get exact EUR |
| PSK | ⚠️ 70% | ⚠️ Partial | Get full surcharge catalog |
| HST | ❌ 0% | ❌ None | Analyze fenstermaxx24.com first |
| Smart-Slide | ❌ 0% | ❌ None | Analyze fenstermaxx24.com first |
| Vorsatzrollladen | ❌ 0% | ❌ None | Analyze fenstermaxx24.com first |
| Raffstore | ❌ 0% | ❌ None | Analyze fenstermaxx24.com first |
| Insektenschutz | ❌ 0% | ❌ None | Analyze pricing |
| Fensterbänke | ❌ 0% | ❌ None | Analyze pricing |
