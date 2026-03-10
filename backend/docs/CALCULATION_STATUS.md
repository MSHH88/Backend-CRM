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
| **CALCULATIONS** (formulas, logic, how prices are computed) | Analyzing fenstermaxx24.com / manufacturer websites / API reverse-engineering | **~70% complete** |
| **CATALOG DATA** (actual EUR prices, surcharge amounts, base price tables) | Your catalogs from manufacturers | **~15% complete** (6 of ~40 combos) |

**Key Insight:** Once all calculations are known, the system can accept catalog data and automatically generate pricing. The calculations are the ENGINE — the catalog data is the FUEL.

### Current Score

- **Calculations we HAVE:** Fenster (all materials), Balkontür, Haustüren, Rollladen (Aufsatz), PSK (partial)
- **Calculations we NEED:** HST, Smart-Slide, Falt-Schiebe-Tür, Vorsatzrollladen, Raffstore, Insektenschutz, Fensterbänke
- **Catalog data we HAVE:** 6 complete + 1 partial (Drutex PVC, Gealan PVC, Holz, Alu Balkontür, Drutex Haustür, Rollladen, PSK partial)
- **Catalog data we NEED:** ~30+ more manufacturer/material combinations

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

### Architecture C: ADDITIVE COMPONENTS (Rollladen)

```
base_price = f(width, height, kastenhoehe) // Component formula
surcharges = farbe + antrieb + seitenblende + putztraeger
total = (base_price + surcharges) × 0.60
```

- **Used by:** Rollladen (Aufsatz), likely Vorsatzrollladen
- **Status:** ✅ Aufsatzrollladen UNDERSTOOD, ❌ Vorsatzrollladen UNKNOWN
- **Key difference:** Uses server-side session state (obj_rollladen), separate from main konfigurator

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
| Threshold options | ⚠️ NEEDS VERIFICATION | May have Balkontür-specific threshold surcharges |
| **Overall Balkontür Calc** | **✅ ~95% COMPLETE** | **Same engine as Fenster, verify threshold** |

**Manufacturers with catalog data:** Aluprof Aluminium ✅
**Manufacturers MISSING catalog data:** ALL PVC, ALL Holz, ALL Holz-Alu Balkontüren

### 4C. HAUSTÜREN (Front Doors) — 1-4 Manufacturers, 2-4 Materials

| Calculation Aspect | Status | Notes |
|---|---|---|
| Base dimension pricing | ✅ COMPLETE | Formula-based (NOT matrix), width-dominant |
| Width impact calculation | ✅ COMPLETE | ~€37.77 per 100mm width |
| Height impact calculation | ✅ COMPLETE | ~€1.64 per 100mm height (23× less than width) |
| Model selection tiers | ✅ COMPLETE | 3 tiers: 0 / +€75 / +€361 |
| Color surcharges | ✅ COMPLETE | 5 tiers: 0 / +€25 / +€146 / +€259 / +€349 |
| Profile options | ✅ COMPLETE | Only 2 profiles (p2, p4 for Drutex) |
| Electronic access systems | ✅ COMPLETE | +€912–€1142 (largest surcharge) |
| Handle surcharges | ✅ COMPLETE | Cosmetic only (€0 for most) |
| Hinge color surcharges | ✅ COMPLETE | 0–€96.54 |
| Threshold surcharges | ⚠️ NEEDS VERIFICATION | May vary per manufacturer |
| Side panels (Seitenteil) | ❌ UNKNOWN | Need to analyze if/how side panels affect pricing |
| Transom (Oberlicht) | ❌ UNKNOWN | Need to analyze pricing for transom options |
| **Overall Haustür Calc** | **✅ ~85% COMPLETE** | **Core formula known, side panel/transom pricing TBD** |

**Manufacturers with catalog data:** Drutex PVC ✅
**Manufacturers MISSING catalog data:** ALL other Haustür manufacturers/materials

### 4D. PSK (Parallel-Schiebe-Kipptür) — 1-3 Manufacturers, 2-3 Materials

| Calculation Aspect | Status | Notes |
|---|---|---|
| Base price logic | ⚠️ PARTIAL | Width ranges with flat pricing (1200-1700mm all same), progressive above 1800mm |
| Height pricing | ⚠️ PARTIAL | Progressive 1800-2400mm, data anomalies at 2500mm+ |
| Profile options | ✅ COMPLETE | 5 profiles (p1-p5), price range 1177-1350 EUR |
| Opening types | ✅ COMPLETE | 4 variants (ks_fest, fest_ks, ks_ff, ff_ks) |
| Color surcharges | ⚠️ PARTIAL | Base colors known, full surcharge catalog MISSING |
| Glass surcharges | ⚠️ PARTIAL | 6 types known, need complete catalog |
| Surcharge catalog | ❌ INCOMPLETE | Missing most surcharge categories |
| **Overall PSK Calc** | **⚠️ ~60% COMPLETE** | **Need complete surcharge catalog + verify extreme sizes** |

**Manufacturers with catalog data:** Drutex PVC (PARTIAL) ⚠️
**Manufacturers MISSING catalog data:** ALL others

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

### 4G. FALT-SCHIEBE-TÜR — ❌ NO DATA

| Calculation Aspect | Status | Notes |
|---|---|---|
| All aspects | ❌ UNKNOWN | No data extracted yet |
| **Overall Falt-Schiebe Calc** | **❌ 0% COMPLETE** | **Need to analyze from fenstermaxx24.com** |

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

### 4I. VORSATZROLLLADEN (External Shutters) — ❌ NO DATA

| Calculation Aspect | Status | Notes |
|---|---|---|
| All aspects | ❌ UNKNOWN | Likely similar additive architecture to Aufsatzrollladen |
| **Overall Vorsatz Calc** | **❌ 0% COMPLETE** | **Need to analyze from fenstermaxx24.com** |

### 4J. RAFFSTORE (External Blinds) — ❌ NO DATA

| Calculation Aspect | Status | Notes |
|---|---|---|
| All aspects | ❌ UNKNOWN | May be additive like Rollladen or unique |
| **Overall Raffstore Calc** | **❌ 0% COMPLETE** | **Need to analyze from fenstermaxx24.com** |

### 4K. INSEKTENSCHUTZ (Insect Protection) — ❌ NO DATA

| Calculation Aspect | Status | Notes |
|---|---|---|
| All aspects | ❌ UNKNOWN | Likely simple additive pricing |
| **Overall Insektenschutz Calc** | **❌ 0% COMPLETE** | **Need to analyze** |

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
| **Falt-Schiebe-Tür** | Unknown | LOW | Medium | Unique folding mechanism |
| **Vorsatzrollladen** | Likely Additive (C) | MEDIUM | Small | Likely similar to Aufsatzrollladen |
| **Raffstore** | Unknown | LOW | Medium | External blind, new product type |
| **Insektenschutz** | Likely Simple additive | LOW | Small | Probably simple W×H formula |
| **Fensterbänke** | Likely Linear (length-based) | LOW | Small | Simple length × price_per_meter |

### 7B. Calculations That Need COMPLETION

| Product | What's Missing | Priority | Effort |
|---------|---------------|----------|--------|
| **PSK** | Complete surcharge catalog, verify extreme size pricing | HIGH | Small |
| **Haustüren** | Side panel (Seitenteil) pricing, Transom (Oberlicht) pricing | MEDIUM | Medium |
| **Balkontüren** | Verify threshold-specific surcharges | LOW | Small |

### 7C. Calculations That Are FULLY COMPLETE ✅

| Product | Status | Can Accept New Catalog Data? |
|---------|--------|-----|
| **Fenster (all materials)** | ✅ 100% | YES — just add base prices + surcharge catalog |
| **Balkontüren** | ✅ ~95% | YES (after threshold verification) |
| **Haustüren** | ✅ ~85% | YES for basic doors (side panels TBD) |
| **Rollladen (Aufsatz)** | ✅ ~95% | YES — just add catalog data |

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

### 9C. FOR HAUSTÜREN (Front Doors) — Calculation ✅ ~85% COMPLETE

**Typical: 1-4 manufacturers, 2-4 materials**

| Manufacturer/Material | Have? | What You Need to Provide |
|---|---|---|
| Drutex PVC | ✅ HAVE | Nothing — data ready |
| Other PVC manufacturers | ❌ NEED | Model catalog + Price catalog + Surcharges |
| Aluminium doors | ❌ NEED | Model catalog + Price catalog + Surcharges |
| Holz doors | ❌ NEED | Model catalog + Price catalog + Surcharges |

**Per manufacturer catalog must include:**
- [ ] Model list with base prices (doors are model-based, not just size-based)
- [ ] Width/height pricing formula or table
- [ ] Color catalog with surcharges (typically 5 tiers)
- [ ] Electronic access system options + prices
- [ ] Handle options + prices
- [ ] Hinge color options + prices
- [ ] Security hardware options + prices
- [ ] Side panel (Seitenteil) options + prices (if offered)
- [ ] Transom (Oberlicht) options + prices (if offered)

### 9D. FOR TERRASSENTÜREN — Calculations Partially/Not Complete

#### PSK (Parallel-Schiebe-Kipptür) — Calculation ⚠️ ~60% COMPLETE

| Manufacturer/Material | Have? | What You Need to Provide |
|---|---|---|
| Drutex PVC | ⚠️ PARTIAL | **Complete surcharge catalog needed** |
| Other manufacturers | ❌ NEED | Full catalog (after calculation is complete) |

**What's still needed from analysis (NOT from you):**
- Complete the PSK calculation by analyzing fenstermaxx24.com more thoroughly
- Verify extreme size pricing (anomalies at 2500mm+)

**What you need to provide (after calculation is done):**
- [ ] Complete surcharge catalog for each manufacturer
- [ ] Profile options + prices
- [ ] Opening type options
- [ ] Size ranges

#### HST (Hebe-Schiebe-Tür) — Calculation ❌ 0% COMPLETE

**We need to analyze fenstermaxx24.com FIRST before you can provide useful data.**

#### Smart-Slide — Calculation ❌ 0% COMPLETE

**We need to analyze fenstermaxx24.com FIRST.**

#### Falt-Schiebe-Tür — Calculation ❌ 0% COMPLETE

**We need to analyze fenstermaxx24.com FIRST.**

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

### 9F. FOR RAFFSTORE, INSEKTENSCHUTZ, FENSTERBÄNKE — Calculations ❌ 0%

**We need to analyze fenstermaxx24.com FIRST before catalogs are useful.**

---

## 10. Priority Order

### Phase A: COMPLETE MISSING CALCULATIONS (from website analysis)

These need to be done before catalog data is useful:

| # | Product | Effort | Priority |
|---|---------|--------|----------|
| A1 | PSK — complete surcharge analysis | Small | HIGH |
| A2 | HST — full calculation analysis | Medium | HIGH |
| A3 | Haustüren — side panel + transom | Medium | MEDIUM |
| A4 | Smart-Slide — calculation analysis | Medium | MEDIUM |
| A5 | Vorsatzrollladen — calculation analysis | Small | MEDIUM |
| A6 | Falt-Schiebe-Tür — calculation analysis | Medium | LOW |
| A7 | Raffstore — calculation analysis | Medium | LOW |
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
3. Falt-Schiebe-Tür catalogs — calculation needed first
4. Vorsatzrollladen catalogs — calculation needed first
5. Raffstore catalogs — calculation needed first
6. Insektenschutz catalogs — calculation needed first
7. Fensterbänke catalogs — calculation needed first

### For Testing: We Use Existing Price Data
✅ Correct — for testing and development, we use the price data we already have (Drutex, Gealan, Holz, Alu). Real catalog prices are plugged in later.
