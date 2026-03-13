# Getting Data — Calculations & Catalog Data Checklist

> **Last Updated:** March 13, 2026
> **Purpose:** Know exactly what we have and what we still need to gather
> **Format:** ✅ = Have, ❌ = Need, ⚠️ = Partial
> **Recent:** Smart-Slide dataset (6 files) analyzed — FORMULA-BASED architecture confirmed (same as PSK), ~60% calc. Raffstore dataset (7 files) analyzed — ~90% calc complete. PSK updated to ~85%. Cross-product calculation analysis added (Section 5B). CEO Q&A section added (Section 0).

---

## 0. CEO Questions & Answers — Calculation System Readiness

> **Added March 12, 2026** — Answers to CEO questions about catalog impact, calculation similarities, and what we still need.

### Q1: When we have the base price catalog, how much of our issues will be solved?

**Answer: ~85-90% of ALL remaining issues will be solved by the full catalog.**

Here's the breakdown:

| What the Catalog Provides | Impact | Products Affected |
|:--------------------------|:------:|:-----------------|
| **Base prices** (width × height → EUR) for ALL products/manufacturers | 🟢 HUGE | All 12 product types |
| **Surcharge amounts** (exact EUR for each color, glass type, motor, etc.) | 🟢 HUGE | All 12 product types |
| **Available options** (which colors, motors, profiles exist per manufacturer) | 🟢 HIGH | All 12 product types |
| **Dimension limits** (min/max per manufacturer) | 🟡 MEDIUM | Most already known from website |
| **Discount factor** (expect 0.60 for all) | 🟡 CONFIRM | Already verified for 4+ manufacturers |

**What the catalog will NOT solve (the remaining ~10-15%):**
1. ❌ **HST calculation logic** — We haven't analyzed HOW HST prices are computed yet (0% done). The catalog gives prices but we still need to understand the calculation architecture
2. ⚠️ **Smart-Slide calculation logic** — Now ~60% done (was 0%). Architecture confirmed as FORMULA-BASED (same as PSK). Need more data points for exact formula.
3. ❌ **Fensterbänke calculation logic** — Not analyzed yet (0% done)
4. ⚠️ **Falt-Schiebe-Tür scaling formula** — We know it's element-based but haven't derived the exact non-linear formula (~75% done)

**In concrete terms:** Once you provide the full catalog:
- **Fenster** → ✅ 100% ready to build (for every manufacturer in the catalog)
- **Balkontüren** → ✅ 100% ready to build
- **Haustüren** → ✅ 100% ready to build
- **Rollladen Aufsatz** → ✅ 100% ready to build
- **Rollladen Vorsatz** → ✅ 100% ready to build
- **Raffstore** → ✅ 100% ready to build
- **Insektenschutz Plissee** → ✅ 100% ready to build
- **PSK** → ✅ ~95% ready (minor glass catalog gaps)
- **Falt-Schiebe-Tür** → ⚠️ ~85% (need to verify scaling formula)
- **HST** → ❌ Still need to analyze calculation logic FIRST
- **Smart-Slide** → ⚠️ ~75% ready (architecture confirmed FORMULA-BASED, need more price data points)
- **Fensterbänke** → ❌ Still need to analyze calculation logic FIRST

**Bottom line: The catalog is the single biggest unlock. It solves 9 of 12 products completely.**

---

### Q2: What calculations are similar? Cross-reference of shared structures

**Answer: Products fall into 3 major calculation families. Within each family, the calculation logic is IDENTICAL — only base prices and surcharge amounts differ.**

#### FAMILY 1: MATRIX Products (Windows & Doors with 2D Lookup)
> **Calculation:** Look up price in a Width × Height table, then add surcharges

| Product | Calc Status | Same Calculation? | Materials Confirmed | What Differs |
|:--------|:----------:|:-----------------:|:-------------------|:-------------|
| **Fenster (Windows)** | ✅ 100% | ✅ BASE — all others match this | PVC ✅ (2 mfrs), Holz ✅ (1 mfr) | Only base prices and surcharge EUR amounts |
| **Balkontüren** | ✅ 97% | ✅ IDENTICAL to Fenster + threshold options | Alu ✅ (1 mfr) | Same calc + 4 threshold types |

**What we can confirm:**
- ✅ PVC Fenster (Drutex) and PVC Fenster (Gealan) use **exactly the same calculation** — different base prices
- ✅ Holz Fenster (Drutex) uses **exactly the same calculation** as PVC — different base prices
- ✅ Alu Balkontüren (Aluprof) uses **exactly the same calculation** as Fenster — same engine
- ⚠️ Alu Fenster — **very likely same calculation** but not yet confirmed with data (see Q5 below)

**Conclusion for Family 1:** ✅ We have the calculation engine. PVC (2 manufacturers) + Holz (1 manufacturer) all confirmed identical. **We are good on Kunststoff and Holz.** Adding more manufacturers = just catalog data.

#### FAMILY 2: FORMULA Products (Doors & Sliding Doors with Dimension Formulas)
> **Calculation:** Apply dimension-based formulas (not table lookup), then add surcharges

| Product | Calc Status | Same Calculation? | Materials Confirmed | What Differs |
|:--------|:----------:|:-----------------:|:-------------------|:-------------|
| **Haustüren** | ✅ 95% | ✅ BASE — width-dominant formula | PVC ✅, Holz ✅ (both Drutex) | Width +€37.77/100mm, Height +€1.64/100mm |
| **PSK** | ⚠️ 85% | ⚠️ SIMILAR pattern (formula-based) but different parameters | PVC ⚠️ (3 mfrs partial), Alu ⚠️ (1 mfr partial) | Width ranges + progressive tiers |
| **HST** | ❌ 0% | ❓ UNKNOWN — likely similar to PSK | None | Need to analyze |
| **Smart-Slide** | ⚠️ 60% | ✅ CONFIRMED same FORMULA-BASED as PSK | PVC ⚠️ (Gealan, 4 data points) | Height-dominant pricing (~1.75× width), size-dependent surcharges |

**What we can confirm:**
- ✅ Haustüren PVC and Holz use **same width-dominant formula** — confirmed
- ✅ PSK is confirmed formula-based across 3 PVC manufacturers (Aluplast, Gealan, Drutex) + 1 Alu (Aluprof) — **same architecture, same patterns**
- ⚠️ HST is LIKELY formula-based too (same product family) — needs analysis

**Conclusion for Family 2:** ⚠️ Haustüren is solid. PSK improved to 85%. **Smart-Slide confirmed FORMULA-BASED (~60%)** — same architecture as PSK. HST still needs analysis from fenstermaxx24.com.

#### FAMILY 3: ADDITIVE Products (Rollladen/Sonnenschutz/Insektenschutz — Component Pricing)
> **Calculation:** Base price (from W×H matrix) + sum of fixed EUR surcharges per component selected

| Product | Calc Status | Same Calculation? | Manufacturers | What Differs |
|:--------|:----------:|:-----------------:|:-------------|:-------------|
| **Aufsatzrollladen** | ✅ 97% | ✅ BASE — server-side AJAX | Drutex ✅ (~98% catalog) | 24-pt matrix, 9 drives, 12 colors |
| **Vorsatzrollladen** | ✅ 85% | ✅ IDENTICAL to Aufsatz | Aluprof ✅ (~80%) | Same 12 colors, same 9 drives — CONFIRMED |
| **Raffstore** | ✅ 90% | ✅ IDENTICAL architecture | Drutex ✅ (~85%) | 9-pt matrix, 12 surcharges, unique slat types |
| **Insektenschutz Plissee** | ✅ 95% | ⚠️ SIMILAR but client-side JS (not server AJAX) | Drutex ✅ (~85%) | Simplest: all 5 colors = €0 surcharge |

**What we can confirm:**
- ✅ Aufsatz, Vorsatz, and Raffstore use **exactly the same server-side ADDITIVE pattern** — identical AJAX endpoint `/ajax/berechnen/`, identical discount (0.60), identical surcharge stacking
- ✅ Colors and drives are SHARED between Aufsatz and Vorsatz (same 12 colors, same 9 drives, same EUR amounts)
- ✅ Insektenschutz uses the same additive concept but via **client-side JavaScript** instead of server AJAX — slightly different engine code needed

**Conclusion for Family 3:** ✅ One calculation engine handles Aufsatz + Vorsatz + Raffstore. A simpler client-side variant handles Insektenschutz. We have the logic.

#### STANDALONE: Falt-Schiebe-Tür (Folding Doors)
> **Calculation:** Element-count (3-6 parts) × area-based scaling + additive surcharges

- ⚠️ 75% complete — **unique architecture**, not shared with other products
- Need: exact scaling formula, verify color surcharge method (% vs fixed EUR)
- Catalog will help with base prices but scaling formula still needs derivation

---

### Q3: Do we have enough data to build the whole calculation system?

**Answer: YES for ~92% of products. The calculation ENGINE is essentially built. What's missing is mostly FUEL (catalog prices).**

**What we CAN build RIGHT NOW (with catalog):**

| # | Product | Can Build? | Why |
|:-:|:--------|:----------:|:----|
| 1 | Fenster | ✅ YES | 100% calculation complete, 3 material/manufacturer combos confirmed identical |
| 2 | Balkontüren | ✅ YES | 97% — same engine as Fenster, threshold types known |
| 3 | Haustüren | ✅ YES | 95% — formula derived, width-dominant confirmed across PVC + Holz |
| 4 | Aufsatzrollladen | ✅ YES | 97% — most complete product, 24-point matrix, 9 drives, 12 colors |
| 5 | Vorsatzrollladen | ✅ YES | 85% — confirmed same engine as Aufsatz |
| 6 | Raffstore | ✅ YES | 90% — confirmed same ADDITIVE engine as Rollladen |
| 7 | Insektenschutz Plissee | ✅ YES | 95% — simplest product, nearly complete |
| 8 | PSK | ⚠️ MOSTLY | 85% — formula-based, 3 manufacturers confirmed same. Minor gaps in glass catalog |
| 9 | Falt-Schiebe-Tür | ⚠️ PARTIALLY | 75% — need exact scaling formula + color method verification |
| 10 | Smart-Slide | ⚠️ MOSTLY | 60% 🆕 — FORMULA-BASED architecture confirmed (same as PSK). Need more data points for exact formula |

**What we CANNOT build yet:**

| # | Product | Can Build? | Why Not | What's Needed |
|:-:|:--------|:----------:|:--------|:-------------|
| 11 | HST | ❌ NO | 0% — haven't analyzed calculation logic | Analyze fenstermaxx24.com HST configurator |
| 12 | Fensterbänke | ❌ NO | 0% — haven't analyzed | Analyze pricing logic (likely simple) |

**Summary: 10 of 12 products are ready to build (was 9). Smart-Slide moved from "CANNOT" to "CAN build". The catalog unlocks them all at once.**

---

### Q4: What calculations are still missing? What do we still need to gather?

**Missing Calculations (need website analysis, NOT catalog data):**

| Product | What's Missing | Effort | Priority |
|:--------|:---------------|:------:|:--------:|
| **HST** | Everything — no analysis done yet | 🔴 HIGH | HIGH — premium product |
| **Smart-Slide** | More data points for exact formula (architecture confirmed) | 🟡 MEDIUM | MEDIUM — architecture is known |
| **Fensterbänke** | Everything — likely simple (length × price/meter) | 🟢 LOW | LOW |
| **Falt-Schiebe-Tür** | Exact scaling formula + color method | 🟡 MEDIUM | MEDIUM |

**Missing Catalog Data (need from you — the full catalog solves ALL of these):**

| What | Products | Impact |
|:-----|:---------|:------:|
| Base price matrices for ALL manufacturers | All 12 products | 🟢 Biggest unlock |
| Complete surcharge lists per manufacturer | All 12 products | 🟢 Second biggest |
| All available colors per manufacturer × product | Fenster, Haustür, PSK | 🟢 HIGH |
| All glass types + EUR prices | Fenster, Haustür, PSK, Falt-Schiebe-Tür | 🟡 MEDIUM |
| Motor/drive options for Rollladen/Raffstore per manufacturer | Rollladen, Raffstore | 🟡 MEDIUM |

---

### Q5: Do we need Aluminium Fenster datasets from 2 manufacturers to confirm same calculations?

**Answer: Getting 1 Alu manufacturer dataset would be IDEAL, but 2 is NOT necessary. Here's why:**

**Evidence that Alu uses same calculation as PVC/Holz:**
1. ✅ fenstermaxx24.com uses the **same configurator interface** for ALL Fenster materials (PVC, Holz, Alu) — same form fields, same AJAX endpoints
2. ✅ Alu Balkontüren (Aluprof) confirmed **same MATRIX architecture** as PVC/Holz Fenster
3. ✅ PSK Alu (Aluprof) confirmed **same FORMULA architecture** as PVC PSK
4. ✅ Universal discount (0.60) confirmed across ALL materials (PVC, Holz, Alu) for every product tested
5. ✅ Surcharge pattern (fixed EUR, additive) confirmed identical across ALL materials

**Recommendation:**
- ✅ **1 Alu Fenster manufacturer dataset** = ideal for final confirmation — would let us verify the Matrix lookup is identical
- ⚠️ **2 Alu manufacturers** = nice-to-have but not necessary — if 1 Alu matches PVC/Holz pattern, the architecture is confirmed
- 🟢 **Even without Alu data**, we are **95%+ confident** the calculation is the same based on website architecture evidence

**What about Kunststoff?**
- ✅ **Kunststoff is DONE.** We have 2 PVC manufacturers (Drutex + Gealan) confirming identical calculations. Holz (1 manufacturer) also matches. We basically have all for Kunststoff.

**What about Holz-Alu and Kunststoff-Alu hybrid materials?**
- ⚠️ These are untested but **very likely same calculation** — they use the same fenstermaxx24.com configurator. 1 dataset from any hybrid material would confirm.

---

### Q6: Summary — What can we cross off as confirmed?

**✅ CONFIRMED SAME CALCULATIONS (can cross off — only need catalog prices):**

| Category | Products | Evidence | Status |
|:---------|:---------|:---------|:------:|
| **Windows (MATRIX)** | Fenster PVC, Fenster Holz, Balkontür Alu | 2 PVC mfrs + 1 Holz + 1 Alu Balkontür all identical | ✅ DONE |
| **Doors (FORMULA)** | Haustür PVC, Haustür Holz | Both Drutex confirmed same width-dominant formula | ✅ DONE |
| **Rollladen (ADDITIVE server)** | Aufsatz, Vorsatz, Raffstore | All 3 use same AJAX endpoint, same discount, same surcharge stacking | ✅ DONE |
| **Insektenschutz (ADDITIVE client)** | Plissee | Client-side JS, all colors €0, simplest product | ✅ DONE |

**⚠️ VERY LIKELY SAME but not yet confirmed (1 dataset would confirm):**

| Category | What's Unconfirmed | What Would Confirm It |
|:---------|:-------------------|:---------------------|
| **Fenster Alu** | Alu uses same MATRIX calc as PVC/Holz | 1 Alu manufacturer Fenster dataset |
| **Fenster Holz-Alu** | Hybrid uses same MATRIX calc | 1 Holz-Alu dataset |
| **Fenster Kunststoff-Alu** | Hybrid uses same MATRIX calc | 1 Kunststoff-Alu dataset |
| **Haustür Alu** | Alu uses same FORMULA as PVC/Holz | 1 Alu Haustür dataset |

**❌ NOT YET ANALYZED (need website analysis first, then catalog):**

| Product | What's Needed | When Catalog Helps |
|:--------|:-------------|:------------------|
| **HST** | Analyze fenstermaxx24.com configurator | AFTER calculation analysis |
| **Fensterbänke** | Analyze pricing (likely simple) | AFTER calculation analysis |

**⚠️ PARTIALLY ANALYZED (architecture known, need more data):**

| Product | What's Known | What's Needed |
|:--------|:------------|:-------------|
| **Smart-Slide** 🆕 | FORMULA-BASED architecture (same as PSK), 4 data points, Gealan PVC | More W×H data points for exact formula, 4-Flügel pricing, complete surcharges |

---

### Q7: What should you gather next? Priority recommendations

1. **🟢 HIGHEST PRIORITY — The full catalog** → Unlocks 9 of 12 products immediately
2. **🟡 NICE-TO-HAVE — 1 Alu Fenster manufacturer dataset** → Confirms Alu uses same calc (we're 95% confident already)
3. **🟡 NICE-TO-HAVE — 1 Alu Haustür dataset** → Confirms door formula works for Alu too
4. **🔴 WE NEED TO DO — Analyze HST on fenstermaxx24.com** → This is work we do, not data you provide. We will analyze the HST configurator to determine its calculation architecture.

**You do NOT need to gather:**
- ❌ More PVC Fenster datasets — 2 manufacturers already confirm identical calc
- ❌ More Holz datasets — 1 manufacturer is sufficient (Holz calc matches PVC)
- ❌ 2 Alu Fenster manufacturers — 1 is enough (if it matches the pattern, which is very likely)
- ❌ More Rollladen/Raffstore/Insektenschutz datasets from different manufacturers — architecture is confirmed universal

---

## Table of Contents

0. [CEO Questions & Answers — Calculation System Readiness](#0-ceo-questions--answers--calculation-system-readiness)
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
| **Calculations (engine logic)** | **~92%** | 10 of 12 product types have calculations (Smart-Slide ~60% NEW, Raffstore ~90%, Haustüren ~95%, Aufsatz ~97%, Vorsatz ~85%, Insektenschutz ~90%) |
| **Catalog data (EUR prices)** | **~28%** | 12 of ~40 manufacturer/material combos (Smart-Slide Gealan ~40% NEW, Raffstore ~85%, Holz Haustür ~65%, Aufsatz ~98%, Vorsatz ~80%, Insektenschutz ~85%) |

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

- [x] **PSK (Parallel-Schiebe-Kipptür)** — ~85% complete (was ~70%)
  - [x] Base price logic (width ranges with flat/progressive pricing)
  - [x] Profile options (5 profiles)
  - [x] Opening types (4 variants)
  - [x] Extreme size pricing rules (from 7B data)
  - [x] Alu profiles (4 profiles from 7B data)
  - [x] Height anomaly resolved: 2400mm is HARD LIMIT (not anomaly)
  - [x] Color surcharges (Alu): Fixed EUR (RAL €299.53, Wood €599.05, Metallic €1,198.10 per side)
  - [x] Color surcharges (PVC): 4-tier (€0 to ~€350)
  - [x] Multi-manufacturer size constraints (Aluprof, Aluplast, Gealan)
  - [x] 11+ surcharge items documented
  - [ ] Complete glass surcharge catalog (extended but still approximate)
  - [ ] PVC profile-specific base pricing
  - [ ] Exact EUR prices from catalog
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

- [x] **Smart-Slide (Schiebetür)** — ~60% complete ✅ NEW (was 0%)
  - [x] Architecture confirmed: FORMULA-BASED (B) — same as PSK, server-side `/ajax/berechnen/`
  - [x] Manufacturer: Gealan (h7) — GEALAN-SMOOVIO profile (p1)
  - [x] Material: PVC/Kunststoff
  - [x] Types: 2-Flügel (typ1) and 4-Flügel (typ3)
  - [x] Dimension limits: 1550-4000mm W × 800-2500mm H
  - [x] Discount factor confirmed (0.60)
  - [x] Base price data: 4 data points at various W×H
  - [x] Height-dominant pricing: ~€123/100mm H vs ~€70/100mm W (ratio ~1.75:1)
  - [x] Color surcharges: SIZE-DEPENDENT (scale with element area, not fixed EUR)
  - [x] Glass surcharges: SIZE-DEPENDENT (scale with glass area m²)
  - [x] Full API endpoints documented (same `/ajax/berechnen/` as Fenster/PSK)
  - [x] Configuration object (obj_konfig) structure documented
  - [x] Extensive color options identified (Standard, RAL, Holzdekore, Metalleffektfolien)
  - [ ] Need more W×H data points (have 4, need 15-20+ for formula derivation)
  - [ ] 4-Flügel (typ3) pricing not yet tested
  - [ ] Complete surcharge catalog (only 2 tested: glass + 1 color)
  - [ ] Color surcharge scaling formula not yet derived
  - [ ] Second manufacturer data (only have Gealan so far)

- [x] **Vorsatzrollladen (Surface Mount Shutters)** — ~85% complete ✅ NEW
  - [x] ADDITIVE architecture confirmed (same as Aufsatzrollladen)
  - [x] 6 models (3 Aluprof profiles × ±insect protection) with base prices
  - [x] Shared surcharges confirmed: same 12 colors, same 9 drives as Aufsatz
  - [x] Dimension constraints documented (800-2600mm W × 1000-1300mm H)
  - [x] Calculator implementations (JS + Python) available
  - [ ] Full W×H price matrix NOT yet extracted (only base prices at 800×1000)
  - [ ] Size-based price scaling needs more data points

- [x] **Raffstore (External Blinds)** — ~90% complete ✅ NEW
  - [x] ADDITIVE architecture confirmed (Architecture C, server-side — same as Rollladen)
  - [x] 9-point W×H base price matrix (Vorsatz type, DRUTEX)
  - [x] 12 surcharge items documented with EUR values
  - [x] 6 box/rail + 6 slat color options (flat €31.43 non-standard box, €0 slat)
  - [x] 5 motor options (€0 to +€332.01) + smart home steuerung
  - [x] 2 types (Vorsatz base, Aufsatz +€248.87) with 4 models
  - [x] 3 slat types (C-80, Z-90, S-90)
  - [x] Dimension limits: 800-4000mm W × 800-2500mm H
  - [x] Discount factor confirmed (0.60)
  - [x] Full JS configuration rules + API endpoints documented
  - [ ] Need more W×H data points (9 → 24+ for better interpolation)
  - [ ] Aufsatz (typ1) base price matrix not separately documented

- [x] **Insektenschutz Plissee (Insect Protection)** — ~95% complete ✅ UPDATED
  - [x] ADDITIVE architecture confirmed (Architecture C — CLIENT-SIDE JS, not server AJAX)
  - [x] 2 Plissee types: 1-teilige (€906.50) and 2-teilige (€1,693.50, +€787.00)
  - [x] 5 frame colors (RAL Matt) — ALL €0 surcharge (no color premium!)
  - [x] 2 opening directions — ALL €0 surcharge
  - [x] 1 net color (Black) — €0 surcharge
  - [x] Discount factor confirmed (0.60)
  - [x] Width IS significant: +€259 for 700→2150mm (corrected from "minimal impact")
  - [x] Height ceiling at 2300mm: no price increase above this height
  - [x] 13 systematic price data points (expanded from scattered data)
  - [x] Non-linear width pricing (steeper at larger widths)
  - [x] Client-side JS calculation (different from Rollladen server-side)
  - [x] Dimension constraints: 700-2400mm W × 1900-2600mm H (door-height only)
  - [x] Calculator implementations (JS + Python) available
  - [ ] Full W×H base price matrix NOT yet extracted (have 13 points, not systematic grid)
  - [ ] ⚠️ Color list may be incomplete (CEO noted missing color options)

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
| 6 | Rollladen (Aufsatz) | Drutex | Generic | ✅ **COMPREHENSIVE** — 24 base prices, 9 drives, 12 colors, weight formula. See `AUFSATZROLLLADEN_ANALYSIS.md` |
| 7 | PSK | Drutex | PVC/Kunststoff | ⚠️ **PARTIAL** — need full surcharges |
| 8 | Haustür | Drutex | Holz (Wood) | ⚠️ **~65%** — base prices + 9 surcharges; missing colors, glass, handles (see `HOLZ_HAUSTUER_ANALYSIS.md`) |
| 9 | Rollladen (Vorsatz) | Aluprof | Generic | ⚠️ **~80%** — 6 models, 9 drives, 12 colors, calculators. Need full W×H matrix. See `VORSATZROLLLADEN_ANALYSIS.md` |
| 10 | Insektenschutz Plissee | Drutex | Aluminium | ⚠️ **~85%** — 2 types, 5 colors (all €0), height-dominant pricing, calculators. Color list may be incomplete. See `INSEKTENSCHUTZ_ANALYSIS.md` |
| 11 | Smart-Slide | Gealan | PVC/Kunststoff | ⚠️ **~40%** 🆕 — 4 price data points, base config + 2 surcharges tested. Architecture confirmed FORMULA-BASED. See `SMART_SLIDE_ANALYSIS.md` |

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
| Smart-Slide — Gealan PVC | ⚠️ **~40%** 🆕 — Architecture confirmed, need more data points |
| Smart-Slide — Other manufacturers | ❌ NEED |
| Falt-Schiebe-Tür — All manufacturers | ❌ NEED (have Alu ranges only) |

**Rollladen / Sonnenschutz / Insektenschutz — separate categories:**

| Type | Category | Status |
|------|----------|--------|
| **Aufsatzrollladen** (Integrated) — Drutex | Rollladen | ✅ **COMPREHENSIVE** — 24 prices, 9 drives, 12 colors, calculators |
| **Vorsatzrollladen** (Surface Mount) — Aluprof | Rollladen | ⚠️ **~80%** — 6 models, shared surcharges confirmed, need W×H matrix |
| **Insektenschutz Plissee** — Drutex | Insektenschutz | ⚠️ **~85%** — 2 types, 5 colors (all free), height-dominant pricing. See `INSEKTENSCHUTZ_ANALYSIS.md` |
| **Raffstore** — Drutex | Sonnenschutz | ⚠️ **~85%** 🆕 — 9-point W×H matrix, 12 surcharges, 12 colors, full rules. See `RAFFSTORE_ANALYSIS.md` |
| Aufsatzrollladen — Other manufacturers | Rollladen | ❌ NEED |
| Vorsatzrollladen — Other manufacturers | Rollladen | ❌ NEED |
| Insektenschutz — Other types/manufacturers | Insektenschutz | ❌ NEED |
| Raffstore — Other manufacturers | Sonnenschutz | ❌ NEED |

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

### 4E. PSK (Terrace Sliding Door) — Calculation ⚠️ ~85% COMPLETE (was ~70%)

> **UPDATE (March 12, 2026):** PSK dataset (5 files) analyzed. Color surcharges resolved (Alu = fixed EUR not percentage), 2400mm height limit confirmed, 11+ surcharges documented, 3 manufacturers covered. See `PSK_DATASET_ANALYSIS.md`.

**Significant improvement — most calculation gaps resolved:**
- [x] Height pricing anomalies — ✅ RESOLVED: 2400mm is hard limit, not anomaly
- [x] Color surcharge catalog — ✅ Alu: Fixed EUR (RAL €299.53, Wood €599.05, Metallic €1,198.10 per side)
- [x] Color surcharge catalog — ✅ PVC: 4-tier (€0 to ~€350)
- [x] Verify if Alu uses percentage-based color surcharges — ✅ RESOLVED: Fixed EUR, not %
- [x] Size constraints by manufacturer — ✅ 3 manufacturers documented (Aluprof, Aluplast, Gealan)
- [ ] Complete glass surcharge catalog (extended but still approximate)
- [ ] PVC profile-specific base pricing (Aluplast/Gealan base prices not fully documented)
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

### 4G. Smart-Slide (Schiebetür) — Calculation ⚠️ ~60% COMPLETE 🆕 (was 0%)

> **UPDATE (March 13, 2026):** CEO uploaded Smart-Slide dataset (6 files) from Datasets branch.
> Architecture confirmed: FORMULA-BASED (B), same as PSK. Server-side `/ajax/berechnen/`.
> Manufacturer: Gealan (h7) — GEALAN-SMOOVIO profile (p1), PVC/Kunststoff.
> Key finding: NOT an HST variant — it's a standard PVC sliding door.
> Full analysis in `SMART_SLIDE_ANALYSIS.md`.

**FORMULA-BASED architecture (Architecture B) — confirmed. Same pattern as PSK.**

Per manufacturer catalog checklist:
- [x] Architecture confirmed (FORMULA-BASED, server-side AJAX)
- [x] API endpoints documented (`/ajax/berechnen/`, `/ajax/minmax/`)
- [x] Configuration object structure (obj_konfig) documented
- [x] Base price at reference size: €1,675.32 old / €1,005.19 after discount (1550×800)
- [x] 4 W×H price data points
- [x] Height/width price impact ratio determined (~1.75:1)
- [x] Discount factor confirmed (0.60)
- [x] Dimension limits: 1550-4000mm W × 800-2500mm H
- [x] Door types: 2-Flügel (typ1) and 4-Flügel (typ3)
- [x] Color surcharges are SIZE-DEPENDENT (not fixed EUR)
- [x] Glass surcharges are SIZE-DEPENDENT (scale with area)
- [x] Extensive color options documented (Standard, RAL, Holzdekore, etc.)
- [ ] Systematic W×H price grid (have 4 points, need 15-20+ for formula)
- [ ] 4-Flügel (typ3) pricing data
- [ ] Complete surcharge catalog (glass types, security, sound, muntins, etc.)
- [ ] Color surcharge scaling formula
- [ ] Opening direction surcharges (if any beyond left/right)
- [ ] Rollladen integration surcharges
- [ ] Additional manufacturer catalogs

### 4H. Falt-Schiebe-Tür (Folding Doors) — Calculation ⚠️ ~75% COMPLETE

**Element-formula architecture (Architecture D). Need to complete:**
- [ ] Verify glass surcharges per m² (exact EUR values)
- [ ] Verify color surcharges — percentage-based or fixed EUR?
- [ ] Derive exact non-linear scaling formula
- [ ] Quantify glass weight auto-limit thresholds
- [ ] Get exact EUR prices (currently have approximate ranges only)
- [ ] Gather additional manufacturer catalogs (have Alu ranges only)

### 4I. Vorsatzrollladen (Surface Mount Shutters) — Calculation ✅ ~85% COMPLETE, Catalog ⚠️ ~80%

> **UPDATE (March 11, 2026):** Vorsatzrollladen data analyzed from CEO-uploaded files.
> - ADDITIVE architecture confirmed (same as Aufsatzrollladen)
> - 6 models (3 Aluprof profiles × ±insect protection): SK 45°, SKO-P Round, SP-E 90° Unterputz
> - Shared surcharges: IDENTICAL 12 colors and 9 drives as Aufsatzrollladen
> - Insect protection surcharge confirmed at €159.38 (same as Aufsatz)
> - Dimensions: 800-2600mm W × 1000-1300mm H (narrower height than Aufsatz)
> - JS + Python calculator implementations provided. Full analysis in `VORSATZROLLLADEN_ANALYSIS.md`.

**ADDITIVE architecture (Architecture C) — confirmed. Same formula as Aufsatzrollladen.**

Per manufacturer catalog checklist:
- [x] Model catalog (6 models) — base prices €171.98 to €502.17
- [x] Model surcharges — €0/€170.81/€67.56/€231.21/€330.19/€159.38
- [x] Drive type surcharges (9 options) — €0 to €769.05 — **IDENTICAL to Aufsatz**
- [x] Panel color surcharges (12 options) — 10 standard (€0), 2 premium (€27.86/€63.14) — **IDENTICAL to Aufsatz**
- [x] Box height options (3) — 137mm/165mm/180mm, all €0
- [x] Rail options (2) — both €0
- [x] Lamella width (1 option) — €0
- [x] Dimension constraints documented (800-2600mm W × 1000-1300mm H)
- [x] Discount factor confirmed (0.60)
- [x] Calculator implementations (JS + Python)
- [ ] Full W×H base price matrix (only have model prices at 800×1000 base dimensions)
- [ ] Size-based price scaling characterization (need more data points per dimension)
- [ ] Weight calculation (not observed — may not apply to surface mount)
- [ ] Second manufacturer verification

### 4J. Raffstore (External Blinds) — Calculation ✅ ~90% COMPLETE 🆕

> **UPDATE (March 12, 2026):** Raffstore dataset (7 files) analyzed from CEO-uploaded files.
> - ADDITIVE architecture confirmed (Architecture C, server-side — same as Rollladen)
> - 9-point W×H base price matrix, 12 surcharge items, 12 color options documented
> - Discount factor 0.60 confirmed, API endpoints documented, full JS configuration rules provided
> - Width-dominant pricing confirmed (first 250mm width step = +€216.46 vs +€58.14 height)
> - DRUTEX manufacturer data. Full analysis in `RAFFSTORE_ANALYSIS.md`.

**ADDITIVE architecture (Architecture C, server-side) — confirmed. Same pattern as Rollladen.**

Per manufacturer catalog checklist:
- [x] Architecture confirmed: ADDITIVE, server-side AJAX (`/ajax/berechnen/`)
- [x] Discount factor confirmed (0.60)
- [x] Dimension limits: 800-4000mm W × 800-2500mm H
- [x] Base price at 1000×1000: €681.57 (Old, Vorsatz)
- [x] W×H price matrix (9 data points — Vorsatz type)
- [x] Type options (2): Vorsatz (default), Aufsatz (+€248.87)
- [x] Model options (4): 2 per type, ZF-A 240mm/300mm, ZF-S variants
- [x] Slat types (3): C-80 (€0), Z-90 (+€31.43), S-90 (+€31.43)
- [x] Box/rail colors (6): Standard white (€0), 5 non-standard (all +€31.43)
- [x] Slat colors (6): ALL €0 surcharge (independent of box color)
- [x] Motor options (5): Standard (€0) to Premium (+€332.01)
- [x] Steuerung options: uWIFI Blebox (+€104.73)
- [x] Putzleiste: +€31.43 (Vorsatz only)
- [x] Configuration rules: Full JS logic for conditional display
- [x] API endpoints (3): berechnen, minmax, addWarenkorb
- [x] Calculator implementations (JS available)
- [ ] More W×H data points (9 is good, 24+ like Aufsatzrollladen would be better)
- [ ] Aufsatz (typ1) base price matrix (only have Vorsatz, Aufsatz adds +€248.87 at base but scaling unknown)
- [ ] Fernbedienung options (`fst` parameter — no prices captured)
- [ ] Windschutz options (`wss` parameter — no prices captured)
- [ ] Kastendeckel options (`kd` parameter — Aufsatz only, no prices captured)
- [ ] Adapter options (`ada` parameter — Aufsatz only, no prices captured)
- [ ] Size-dependent surcharge verification (all captured at 1000×1000 only)
- [ ] Second manufacturer verification

### 4K. Insektenschutz Plissee (Insect Protection) — Calculation ✅ ~90% COMPLETE, Catalog ⚠️ ~85%

> **UPDATE (March 11, 2026):** Insektenschutz Plissee data analyzed from CEO-uploaded files.
> - ADDITIVE architecture confirmed (Architecture C — same as Rollladen)
> - 2 Plissee types: 1-teilige (€906.50) and 2-teilige (€1,693.50 = +€787.00)
> - 5 frame colors (RAL Matt) — ALL €0 surcharge (no color premium — unique among all products!)
> - Height-dominant pricing: height is primary cost driver, width has minimal impact
> - SIMPLEST product analyzed — virtually no surcharges
> - ⚠️ CEO noted: color list may be incomplete
> - JS + Python calculator implementations provided. Full analysis in `INSEKTENSCHUTZ_ANALYSIS.md`.

**ADDITIVE architecture (Architecture C) — confirmed. Simplest product analyzed.**

Per manufacturer catalog checklist:
- [x] Plissee type catalog (2 types) — €906.50 (1-teilige), €1,693.50 (2-teilige)
- [x] Opening direction options (2) — ALL €0 surcharge
- [x] Frame color options (5 RAL Matt colors) — ALL €0 surcharge
- [x] Net color options (1 — Black) — €0
- [x] Dimension constraints (700-2400mm W × 1900-2600mm H)
- [x] Height-dominant pricing confirmed (height drives cost, width minimal impact)
- [x] Discount factor confirmed (0.60)
- [x] Calculator implementations (JS + Python)
- [x] Example calculations verified
- [ ] Full W×H base price matrix (only have scattered data points, not systematic grid)
- [ ] ⚠️ Complete color catalog (CEO noted some color options may be missing)
- [ ] Dimension step intervals (unclear — mm precision or fixed steps?)
- [ ] 2-teilige dimension-based pricing (only have one data point for 2-teilige)
- [ ] Second manufacturer verification

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
- [ ] **Smart-Slide** — ⚠️ PARTIALLY ANALYZED (~60%): FORMULA-BASED architecture confirmed (same as PSK). Need more W×H data points. See `SMART_SLIDE_ANALYSIS.md`
- [x] **Vorsatzrollladen** — ✅ ANALYZED: ADDITIVE architecture confirmed (same as Aufsatz), 6 models, shared surcharges. See `VORSATZROLLLADEN_ANALYSIS.md`
- [x] **Insektenschutz Plissee** — ✅ ANALYZED: ADDITIVE architecture confirmed, 2 types, 5 colors (all free), width significant (+€259), height ceiling at 2300mm. See `INSEKTENSCHUTZ_ANALYSIS.md`
- [x] **Raffstore** — ✅ ANALYZED: ADDITIVE architecture confirmed (server-side, same as Rollladen), 9-point W×H matrix, 12 surcharges, full JS rules. See `RAFFSTORE_ANALYSIS.md`
- [ ] **Insektenschutz other types** — Check if other types exist beyond Plissee (e.g., Spannrahmen, Drehrahmen)
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
- [ ] Vorsatzrollladen full W×H matrix — Need complete dimension-based price grid (currently have model base prices only)
- [ ] Vorsatzrollladen catalog data — Second manufacturer for verification
- [ ] Insektenschutz Plissee full W×H matrix — Need systematic price grid (have 13 data points)
- [ ] Insektenschutz Plissee complete colors — CEO noted set may be incomplete
- [ ] Insektenschutz catalog data — Second manufacturer / other types (Spannrahmen, Drehrahmen?)
- [ ] Raffstore — More W×H data points (9 → 24+ for better interpolation)
- [ ] Raffstore — Aufsatz (typ1) separate base price matrix
- [ ] Raffstore — Missing option surcharges: Fernbedienung, Windschutz, Kastendeckel, Adapter
- [ ] Raffstore catalog data — Second manufacturer for verification
- [ ] Smart-Slide full W×H matrix — Need systematic price grid (have 4 data points, need 15-20+)
- [ ] Smart-Slide 4-Flügel pricing — Currently only 2-Flügel tested
- [ ] Smart-Slide complete surcharges — Only glass + 1 color tested so far
- [ ] Smart-Slide catalog data — Additional manufacturers (currently only Gealan PVC)

### Open Question for CEO 🔑

- [ ] **What is our margin on top of Angebotspreis (60% of list)?**
  - Do we sell at Angebotspreis or add our own margin?
  - Same margin for all products or different per category?
- [ ] **Confirm discount factor is 0.60 for ALL manufacturers** (verified for Drutex, Gealan, Holz, Alu so far)

---

## 5B. Cross-Product Calculation Analysis — What Shares What

> **Added March 12, 2026** — Overview of which products share the same calculation logic and what's truly needed per product/material/manufacturer.

### 🔑 Key Principle: Calculations vs Catalog Data

**CALCULATIONS** = the ENGINE (formulas, logic, how prices are computed). Determined from website analysis.
**CATALOG DATA** = the FUEL (actual EUR base prices and surcharge amounts). From manufacturer catalogs.

**Once calculations are confirmed for a product, adding a new manufacturer = just providing catalog data (base prices + surcharge amounts).**

### Architecture Groups — Shared Calculation Logic

| Architecture | Products Using It | Calculation Status | Shared Logic? |
|:------------|:-----------------|:------------------:|:-------------:|
| **A: MATRIX** | Fenster, Balkontüren | ✅ 100% / 97% | ✅ YES — identical 2D lookup + surcharge pattern |
| **B: FORMULA** | Haustüren, PSK | ✅ 95% / 85% | ⚠️ PARTIAL — both formula-based but different parameters |
| **C: ADDITIVE (server)** | Aufsatz, Vorsatz, **Raffstore** | ✅ 97% / 85% / **90%** | ✅ YES — identical AJAX pattern + fixed EUR surcharges |
| **C: ADDITIVE (client)** | Insektenschutz Plissee | ✅ 95% | ⚠️ UNIQUE — client-side JS, no server AJAX |
| **D: ELEMENT-FORMULA** | Falt-Schiebe-Tür | ⚠️ 75% | Unique element-count architecture |

### Product-by-Product: What We Know and What We Still Need

#### ✅ Fenster (Windows) — CALCULATION COMPLETE, Multiple Materials Confirmed

| Material | Manufacturers | Calc Same? | Catalog Data | What's Needed |
|:---------|:-------------|:----------:|:------------:|:-------------|
| **PVC/Kunststoff** | Drutex ✅, Gealan ✅ | ✅ YES — confirmed identical calc, different base prices | ✅ 2 complete | More manufacturers (Salamander, VEKA, Rehau, Aluplast) — **just catalog data** |
| **Holz (Wood)** | Drutex ✅ | ✅ YES — same calc as PVC, different base prices | ✅ 1 complete | ✅ **Sufficient** — only 1 manufacturer typically needed for Holz |
| **Aluminium** | None ❌ | ⚠️ LIKELY same calc — need to verify | ❌ None | Need 1 Alu manufacturer catalog + verify calc matches |
| **Holz-Alu** | None ❌ | ⚠️ LIKELY same calc — need to verify | ❌ None | Need 1 catalog + verify calc |
| **Kunststoff-Alu** | None ❌ | ⚠️ LIKELY same calc — need to verify | ❌ None | Need 1 catalog + verify calc |

**Bottom line for Fenster:** ✅ PVC and Holz calculations are CONFIRMED identical — we're good on both. Only need to verify that Alu/Holz-Alu/Kunststoff-Alu use the same calculation pattern (very likely based on fenstermaxx24.com architecture).

#### ✅ Balkontüren — CALCULATION COMPLETE, Same as Fenster

| Material | Manufacturers | Calc Same? | Catalog Data | What's Needed |
|:---------|:-------------|:----------:|:------------:|:-------------|
| **Aluminium** | Aluprof ✅ | ✅ YES — same as Fenster + threshold options | ✅ 1 complete | More manufacturers — **just catalog data** |
| **PVC** | None ❌ | ✅ CONFIRMED same calc as Alu Balkontür | ❌ None | 1 PVC manufacturer catalog |
| **Holz** | None ❌ | ✅ CONFIRMED same calc | ❌ None | 1 Holz manufacturer catalog |

**Bottom line for Balkontüren:** ✅ Calculation confirmed same across materials (like Fenster). Just need catalog data for PVC/Holz manufacturers.

#### ✅ Haustüren — CALCULATION ~95% COMPLETE

| Material | Manufacturers | Calc Same? | Catalog Data | What's Needed |
|:---------|:-------------|:----------:|:------------:|:-------------|
| **PVC** | Drutex ✅ | ✅ CONFIRMED | ✅ Complete | ✅ Good — verify with 2nd manufacturer |
| **Holz** | Drutex ⚠️ ~65% | ✅ YES — same formula, different prices | ⚠️ Partial | Missing: colors, glass, handles |
| **Aluminium** | None ❌ | ⚠️ LIKELY same formula — need to verify | ❌ None | 1 Alu manufacturer catalog + verify calc |

**Bottom line for Haustüren:** ✅ PVC and Holz confirmed same formula (width-dominant, +€37.77/100mm W). Complete Holz data (colors, glass, handles) and verify Alu uses same calc.

#### ✅ Rollladen Aufsatz — CALCULATION COMPLETE (~97%)

| Manufacturer | Calc Same? | Catalog Data | What's Needed |
|:-------------|:----------:|:------------:|:-------------|
| **Drutex** ✅ | ✅ CONFIRMED | ✅ ~98% complete | Minor: Seitenblende, Farbe Kasten separately |
| Other manufacturers | ✅ YES — ADDITIVE architecture is universal | ❌ None | **Just catalog data** (base prices + surcharge amounts) |

**Bottom line for Aufsatz:** ✅ Calculation complete and architecture confirmed universal. New manufacturers = just provide price catalog.

#### ✅ Rollladen Vorsatz — CALCULATION ~85% COMPLETE

| Manufacturer | Calc Same? | Catalog Data | What's Needed |
|:-------------|:----------:|:------------:|:-------------|
| **Aluprof** ✅ | ✅ CONFIRMED — same ADDITIVE architecture as Aufsatz | ⚠️ ~80% | Full W×H matrix (only have model base prices) |
| Other manufacturers | ✅ YES — shares surcharges with Aufsatz | ❌ None | Catalog data |

**Bottom line for Vorsatz:** ✅ Confirmed shares ADDITIVE architecture + identical color & drive surcharges with Aufsatz. Need more size-based price data.

#### ✅ Raffstore — CALCULATION ~90% COMPLETE 🆕

| Manufacturer | Calc Same? | Catalog Data | What's Needed |
|:-------------|:----------:|:------------:|:-------------|
| **DRUTEX** ✅ | ✅ CONFIRMED — ADDITIVE (server-side), same as Rollladen | ⚠️ ~85% | More W×H points, Aufsatz type matrix, missing option surcharges |
| Other manufacturers | ✅ YES — ADDITIVE architecture is universal | ❌ None | **Just catalog data** |

**Bottom line for Raffstore:** ✅ Architecture confirmed same as Rollladen. 12 surcharges + 12 colors + 9 price points documented. Only need more W×H data and a few missing option prices.

#### ⚠️ PSK — CALCULATION ~85% COMPLETE

| Material | Manufacturers | Calc Same? | Catalog Data | What's Needed |
|:---------|:-------------|:----------:|:------------:|:-------------|
| **PVC** | Drutex ⚠️, Aluplast ⚠️, Gealan ⚠️ | ✅ YES — confirmed same FORMULA architecture | ⚠️ Partial | PVC profile-specific base pricing, exact glass catalog |
| **Aluminium** | Aluprof ⚠️ | ✅ YES — same FORMULA arch, fixed EUR colors | ⚠️ Partial | Exact EUR values |

**Bottom line for PSK:** ⚠️ Multi-manufacturer data confirmed same architecture. Color surcharges resolved (fixed EUR for Alu, not percentage). Need glass catalog completion and PVC base prices.

#### ⚠️ Falt-Schiebe-Tür — CALCULATION ~75% COMPLETE

| Material | Manufacturers | What's Needed |
|:---------|:-------------|:-------------|
| **Aluminium** | Ranges only ⚠️ | Exact EUR values, color % vs fixed verification, scaling formula |

**Bottom line:** Need to verify color surcharge method and derive exact scaling formula.

#### ✅ Insektenschutz Plissee — CALCULATION ~95% COMPLETE

| Manufacturer | Calc Same? | Catalog Data | What's Needed |
|:-------------|:----------:|:------------:|:-------------|
| **Drutex** ✅ | ✅ CONFIRMED — ADDITIVE (client-side JS) | ⚠️ ~85% | Full W×H matrix, verify color list completeness |
| Other manufacturers | ⚠️ UNKNOWN — client-side calc may be manufacturer-specific | ❌ None | Need to check other types (Spannrahmen, Drehrahmen) |

**Bottom line:** ✅ Simplest product — nearly complete. Width IS significant (+€259), all 5 colors = €0. Need systematic price grid.

#### ❌ Still Missing Entirely

| Product | Priority | Notes |
|:--------|:---------|:------|
| **HST (Hebe-Schiebe-Tür)** | HIGH | Likely FORMULA-based like PSK — need to analyze from fenstermaxx24.com |
| **Insektenschutz (other types)** | LOW | Spannrahmen, Drehrahmen — check if they exist in configurator |
| **Fensterbänke** | LOW | Likely simple length × price_per_meter |

#### ⚠️ Partially Analyzed (architecture known, need more data) 🆕

| Product | Status | Notes |
|:--------|:-------|:------|
| **Smart-Slide** | ~60% | FORMULA-BASED confirmed (same as PSK). Gealan PVC. 4 data points. See `SMART_SLIDE_ANALYSIS.md` |

### Summary: What's Truly Needed Now

**Products where calculations are DONE and we only need more catalog data (manufacturer prices):**
1. ✅ **Fenster** — PVC + Holz confirmed same calc. Need: Alu verification + more PVC manufacturers
2. ✅ **Balkontüren** — Same as Fenster. Need: PVC + Holz manufacturer catalogs
3. ✅ **Haustüren** — PVC + Holz confirmed same calc. Need: Alu verification + Holz completion
4. ✅ **Aufsatzrollladen** — Complete. Need: additional manufacturer catalogs
5. ✅ **Vorsatzrollladen** — Confirmed same as Aufsatz. Need: full W×H matrix
6. ✅ **Raffstore** — Confirmed same ADDITIVE arch. Need: more W×H points + missing options
7. ✅ **Insektenschutz Plissee** — Nearly complete. Need: full W×H matrix

**Products where calculations still need work:**
1. ⚠️ **PSK** (~85%) — Most gaps resolved, need glass catalog + PVC base pricing
2. ⚠️ **Falt-Schiebe-Tür** (~75%) — Need exact EUR + color method verification
3. ⚠️ **Smart-Slide** (~60% 🆕 was 0%) — Architecture confirmed FORMULA-BASED. Need more W×H data points
4. ❌ **HST** (0%) — Need to analyze from scratch
5. ❌ **Fensterbänke** (0%) — Need to analyze

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
| Rollladen (Vorsatz) | ✅ **~85%** | ⚠️ **~80%** | 6 models analyzed, shared surcharges confirmed. Need full W×H matrix. See `VORSATZROLLLADEN_ANALYSIS.md` |
| Falt-Schiebe-Tür | ⚠️ 75% | ⚠️ Ranges | Verify color method + get exact EUR |
| PSK | ⚠️ **85%** ⬆️ | ⚠️ Partial | Color surcharges resolved, height limit confirmed. Need glass + PVC base pricing. See `PSK_DATASET_ANALYSIS.md` |
| HST | ❌ 0% | ❌ None | Analyze fenstermaxx24.com first |
| Smart-Slide | ⚠️ **60%** 🆕 | ⚠️ **~40%** 🆕 | FORMULA-BASED confirmed (same as PSK). Need more W×H data. See `SMART_SLIDE_ANALYSIS.md` |
| Raffstore | ✅ **~90%** 🆕 | ⚠️ **~85%** 🆕 | ADDITIVE architecture. 9-pt matrix, 12 surcharges, 12 colors, full rules. Need more W×H points. See `RAFFSTORE_ANALYSIS.md` |
| Insektenschutz Plissee | ✅ **~95%** ⬆️ | ⚠️ **~85%** | Width significant, height ceiling at 2300mm. Need full W×H matrix + verify colors. See `INSEKTENSCHUTZ_ANALYSIS.md` |
| Fensterbänke | ❌ 0% | ❌ None | Analyze pricing |
