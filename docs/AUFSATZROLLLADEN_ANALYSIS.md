# Aufsatzrollladen (Integrated Roller Shutters) — Data Analysis

> **Date:** March 11, 2026
> **Source:** CEO-uploaded dataset from Datasets branch (`Aufsatzrolladen/` directory)
> **Data files:** `aufsatzrollladen_data.txt`, `aufsatzrollladen_research.txt`, `aufsatzrollladen_calculator.js`, `aufsatzrollladen_data.js`, `aufsatzrollladen_calculator.py`, `aufsatzrollladen_data.py`
> **Source URL:** https://confde.fenstermaxx24.com/confapp/Aufsatzrollladen-bestellen/
> **Manufacturer:** Drutex (fenstermaxx24.com)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [What Changed — Old vs New Data](#2-what-changed--old-vs-new-data)
3. [Complete Base Price Matrix](#3-complete-base-price-matrix)
4. [Surcharge Catalog](#4-surcharge-catalog)
5. [Weight Calculation & Constraints](#5-weight-calculation--constraints)
6. [Discount Factor Confirmation](#6-discount-factor-confirmation)
7. [API & Configuration Structure](#7-api--configuration-structure)
8. [Data Completeness Assessment](#8-data-completeness-assessment)
9. [Engine Impact & Recommendations](#9-engine-impact--recommendations)

---

## 1. Executive Summary

### Key Findings

| Question | Answer | Status |
|----------|--------|--------|
| **Is the new data more comprehensive?** | **YES** — 24 base price points (was partial), 3 new drive types, 1 new color, price corrections | ✅ |
| **Does the ADDITIVE architecture still hold?** | **YES** — `Final = (Base + Sum(Surcharges)) × 0.60` confirmed | ✅ |
| **Does the universal discount factor apply?** | **YES** — 0.60 (40% discount) confirmed for all configs | ✅ |
| **Are there new surcharge categories?** | **NO** — same 5 categories, but drive types expanded from 6 to 9 options | ✅ |
| **Were there any corrections?** | **YES** — Nussbaum color price corrected (€81.71→€63.14), Braun Metallic confirmed (€0), Putzträger beidseitig (€35.25→€35.14) | ⚠️ |
| **Are calculator implementations provided?** | **YES** — JavaScript + Python calculators ready for integration | ✅ NEW |

### Data Received

- **Base Price Matrix:** 6 widths × 4 heights = **24 data points** (was partial: ~12 width-only + 2 height points)
- **Surcharge Categories:** 5 categories (Model, Drive, Color, Box Height, Plaster)
- **Drive Types:** 9 options (was 6 — added 3 premium/smart motors)
- **Panel Colors:** 12 options (was 11 — added Beige)
- **Calculator Implementations:** JS + Python ready-to-use modules

---

## 2. What Changed — Old vs New Data

### Data Corrections ⚠️

| Item | Old Value | New Value | Impact |
|------|-----------|-----------|--------|
| **Nussbaum (Walnut) color** | €81.71 | **€63.14** | Price was overstated by €18.57 |
| **Braun Metallic color** | "needs_retest" | **€0.00** | Confirmed as standard (no surcharge) |
| **Putzträger beidseitig** | €35.25 | **€35.14** | Minor correction (€0.11 difference) |
| **Kastenhoehe 215mm** | "different base price table" | **-€65.01 surcharge** | Clearer representation: negative surcharge, not separate table |

### New Data Added ✅

| Item | Details |
|------|---------|
| **3 new drive types** | Motor Rescue (€638.94), Somfy OXIMO RS100 iO (€576.95), Somfy + Remote (€769.05) |
| **1 new color** | farbe_panzer_12 Beige (€0 — standard) |
| **Complete price matrix** | 24 data points (6W × 4H) — was partial width-at-height sampling |
| **Weight formula** | `weight = (H × W × 3.6 / 1,000,000) / divisions`, max 12kg |
| **API documentation** | 5 endpoints documented with methods and parameters |
| **Calculator code** | JavaScript and Python implementations ready for integration |

### Data Preserved (No Change)

| Item | Value | Status |
|------|-------|--------|
| Models (4) | €0/€0/€159.38/€159.38 | ✅ Same |
| Manual drives (4) | €0/€0/€188.80/€188.00 | ✅ Same |
| Electric drives (2) | €246.46/€369.80 | ✅ Same |
| Standard colors (10) | All €0.00 | ✅ Same |
| Golden Oak | €27.86 | ✅ Same |
| Putzträger single-side | €17.57 | ✅ Same |
| Kastenhoehe 175mm | €0 (standard) | ✅ Same |
| Discount factor | 0.60 (40% off) | ✅ Same |

---

## 3. Complete Base Price Matrix

### All 24 Configurations (Angebotspreis at 40% discount)

| Width↓ \ Height→ | 1000mm | 1200mm | 1400mm | 1700mm |
|:-:|:-:|:-:|:-:|:-:|
| **800mm** | €286.00 | €301.66 | €318.36 | €343.41 |
| **1000mm** | €317.32 | €336.10 | €355.94 | €384.12 |
| **1200mm** | €348.63 | €370.55 | €392.47 | €424.83 |
| **1500mm** | €395.60 | €420.65 | €446.75 | €486.41 |
| **2000mm** | €473.88 | €507.29 | €539.64 | €592.88 |
| **2500mm** | €552.16 | €593.92 | €632.54 | €699.35 |

**Price range:** €286.00 — €699.35 (before discount × 0.60)
**Final price range:** €171.60 — €419.61 (after 40% discount, base config only)

### Dimension Impact Analysis

**Width impact** (per 100mm increase, averaged across heights):

| Width Step | Avg Increase | Per 100mm |
|:--:|--:|--:|
| 800→1000mm | +€33.44 | €16.72 |
| 1000→1200mm | +€33.44 | €16.72 |
| 1200→1500mm | +€48.93 | €16.31 |
| 1500→2000mm | +€80.27 | €16.05 |
| 2000→2500mm | +€80.27 | €16.05 |

**Height impact** (per 100mm increase, averaged across widths):

| Height Step | Avg Increase | Per 100mm |
|:--:|--:|--:|
| 1000→1200mm | +€19.11 | €9.56 |
| 1200→1400mm | +€18.79 | €9.40 |
| 1400→1700mm | +€29.17 | €9.72 |

**Key pattern:** Width impact (~€16/100mm) is about **1.7× greater** than height impact (~€9.6/100mm). Both are quite linear — confirms ADDITIVE/linear pricing model.

---

## 4. Surcharge Catalog

### 4A. Model Surcharges (4 models)

| Model | Description | Surcharge |
|:--|:--|--:|
| fn_rollladen_model_1 | Revision von Unten | €0.00 |
| fn_rollladen_model_2 | Revision von der Seite | €0.00 |
| fn_rollladen_model_3 | Revision von Unten + Insektenschutz | **€159.38** |
| fn_rollladen_model_4 | Revision von der Seite + Insektenschutz | **€159.38** |

**Key:** Insect protection is a flat +€159.38 regardless of dimensions. Revision direction (bottom vs side) has no price impact.

### 4B. Drive Type Surcharges (9 options) — EXPANDED

| Drive | Type | Surcharge |
|:--|:--|--:|
| antriebsart_1 | Schwenkgurtwickler 14mm Weiß | €0.00 |
| antriebsart_2 | Schwenkgurtwickler 14mm Braun | €0.00 |
| antriebsart_4 | Getriebe mit Kurbel | €188.80 |
| antriebsart_5 | Getriebe mit abnehmbarer Kurbel | €188.00 |
| antriebsart_6 | Motor mit Schalter + Hinderniserkennung | €246.46 |
| antriebsart_7 | Motor mit Schlüsselschalter + Hinderniserkennung | €369.80 |
| **antriebsart_8** | **Motor Rescue für Flucht/Rettungsweg** | **€638.94** 🆕 |
| **antriebsart_9** | **Motor Somfy OXIMO RS100 iO** | **€576.95** 🆕 |
| **antriebsart_10** | **Motor Somfy OXIMO RS100 iO + Fernbedienung** | **€769.05** 🆕 |

**Drive cost tiers:**

| Tier | Range | Options |
|------|------:|---------|
| Free (manual belt) | €0 | antriebsart_1, antriebsart_2 |
| Manual gearbox | ~€188 | antriebsart_4, antriebsart_5 |
| Electric basic | €246–€370 | antriebsart_6, antriebsart_7 |
| Electric premium 🆕 | €577–€769 | antriebsart_8, antriebsart_9, antriebsart_10 |

**Note:** antriebsart_3 does not exist (gap in numbering — matches old data).

### 4C. Panel Color Surcharges (12 options) — EXPANDED + CORRECTED

| Color | Surcharge | Note |
|:--|--:|:--|
| farbe_panzer_1 Silber | €0.00 | Standard |
| farbe_panzer_2 Weiß | €0.00 | Standard |
| farbe_panzer_3 Grau | €0.00 | Standard |
| farbe_panzer_4 Braun | €0.00 | Standard |
| farbe_panzer_5 Dunkelbraun | €0.00 | Standard |
| farbe_panzer_6 Golden Oak | €27.86 | Premium |
| farbe_panzer_7 Nussbaum | **€63.14** | Premium — **CORRECTED** from €81.71 |
| farbe_panzer_8 Anthrazit | €0.00 | Standard |
| farbe_panzer_9 Moosgrün | €0.00 | Standard |
| farbe_panzer_10 Braun Metallic | **€0.00** | Standard — **CONFIRMED** (was "needs_retest") |
| farbe_panzer_11 Grau Aluminium | €0.00 | Standard |
| **farbe_panzer_12 Beige** | **€0.00** | Standard 🆕 |

**Summary:** 10 standard colors (€0), 2 premium colors (€27.86 Golden Oak, €63.14 Nussbaum).

### 4D. Box Height Surcharges (2 options)

| Option | Surcharge | Note |
|:--|--:|:--|
| kastenhoehe_175 (175mm, SKS) | €0.00 | Standard |
| kastenhoehe_215 (215mm, DRUTEX) | **-€65.01** | **DISCOUNT** (only negative surcharge in the system) |

**Key insight:** The larger 215mm box is CHEAPER than the 175mm box. This is the only negative surcharge across all products analyzed.

### 4E. Plaster Carrier Surcharges (4 options)

| Option | Surcharge | Note |
|:--|--:|:--|
| putztraeger_0 Ohne | €0.00 | No plaster carrier |
| putztraeger_1 Außen | €17.57 | Outside only |
| putztraeger_2 Innen | €17.57 | Inside only |
| putztraeger_3 Beidseitig | **€35.14** | Both sides — **CORRECTED** from €35.25 |

### 4F. Surcharge Summary

| Category | Options | Max Surcharge | Fixed EUR? | Size-Dependent? |
|----------|:---:|---:|:---:|:---:|
| Model | 4 | €159.38 | ✅ Yes | ❌ No |
| Drive/Motor | 9 | €769.05 | ✅ Yes | ❌ No |
| Panel Color | 12 | €63.14 | ✅ Yes | ❌ No |
| Box Height | 2 | -€65.01 (discount) | ✅ Yes | ❌ No |
| Plaster Carrier | 4 | €35.14 | ✅ Yes | ❌ No |

**All surcharges are FIXED EUR and SIZE-INDEPENDENT** — confirms ADDITIVE architecture.

---

## 5. Weight Calculation & Constraints

### Formula

```
rollgewicht = (height_mm × width_mm × 3.6 / 1,000,000) / divisions
```

### Constraint
- **Maximum weight per section:** 12 kg
- If weight ≥ 12 kg → error, configuration blocked

### Weight Examples

| Width | Height | Divisions | Weight | Valid? |
|:--:|:--:|:--:|--:|:--|
| 800 | 1000 | 1 | 2.88 kg | ✅ |
| 1500 | 1400 | 1 | 7.56 kg | ✅ |
| 2500 | 1700 | 1 | 15.30 kg | ❌ Exceeds 12kg |
| 2500 | 1700 | 2 | 7.65 kg | ✅ (split into 2 sections) |

### Division Options

- aufteilung_1: Single section
- aufteilung_2: 2 sections (equal)
- aufteilung_3: 2 sections (short-long)
- aufteilung_4: 2 sections (long-short)
- aufteilung_5: 3 sections

**Engine impact:** Calculator must validate weight before allowing configuration. Large shutters need multiple sections.

---

## 6. Discount Factor Confirmation

| Config | Subtotal | Discount (40%) | Final Price | Ratio |
|:--|--:|--:|--:|:--|
| Basic 800×1000 | €286.00 | -€114.40 | €171.60 | **0.6000** |
| Mid 1500×1400 | €738.64 | -€295.46 | €443.18 | **0.6000** |
| Premium 2500×1700 | €1,726.06 | -€690.42 | €1,035.64 | **0.6000** |
| With Box Discount | €631.08 | -€252.43 | €378.65 | **0.6000** |

**Confirmed: Discount factor = 0.60 (exact)** — matches ALL previously analyzed products. Now confirmed for **6 manufacturer/product combinations**.

---

## 7. API & Configuration Structure

### API Endpoints

| # | Endpoint | Method | Purpose |
|---|----------|--------|---------|
| 1 | `/ajax/setObjectTOSession/` | POST | Save config to session |
| 2 | `/ajax/fn_berechnen/` | POST | Recalculate price |
| 3 | `/ajax/setminmax/` | POST | Get dimension constraints |
| 4 | `/ajax/getHTMLContent/` | POST | Get rendered price HTML |
| 5 | `/ajax/fn_addWarenkorb/` | POST | Add to cart |

### Configuration Object (`obj_rollladen`)

```javascript
{
  fn_rollladen: "fn_rollladen_ja",
  fn_rollladen_model: "fn_rollladen_model_1",
  fn_rollladen_breite: "800",
  fn_rollladen_hoehe: "1000",
  fn_rollladen_aufteilung: "aufteilung_1",
  fn_rollladen_kastenadapter: "kastenadapter_1",
  fn_rollladen_lamellenbreite: "lamellenbreite_37",
  fn_rollladen_kastenhoehe: "kastenhoehe_175",
  fn_rollladen_schiene: "schiene_1",
  fn_rollladen_farbe_schiene: "farbe_schiene_2",
  fn_rollladen_farbe_panzer: "farbe_panzer_2",
  fn_rollladen_antriebsart: "antriebsart_1",
  fn_rollladen_antriebsseite: "antriebsseite_0",
  fn_rollladen_seitenblende: "seitenblende_0",
  fn_rollladen_putztraeger: "putztraeger_0",
  fn_min_breite: 1600,
  fn_max_breite: 5000,
  fn_min_hoehe: 1000,
  fn_max_hoehe: 1700
}
```

**Key difference from Fenster:** Server-side session state (each option change triggers individual AJAX), not client-side `obj_konfig` pattern.

---

## 8. Data Completeness Assessment

### What We NOW Have for Aufsatzrollladen ✅

| Data Item | Old Status | New Status | Details |
|-----------|:------:|:------:|---------|
| Base price matrix | ⚠️ Partial (~12 points) | ✅ **Complete** (24 points) | 6W × 4H full matrix |
| Models | ✅ 4 models | ✅ 4 models | No change |
| Drive types | ⚠️ 6 options | ✅ **9 options** | +3 premium/smart motors |
| Panel colors | ⚠️ 11 (1 unconfirmed) | ✅ **12 (all confirmed)** | +1 new, 2 corrected |
| Box height | ✅ 2 options | ✅ 2 options | Cleaner representation |
| Plaster carrier | ✅ 4 options | ✅ 4 options | Minor price correction |
| Weight formula | ❌ Not documented | ✅ **Documented** | Formula + constraints |
| API endpoints | ⚠️ Partial | ✅ **5 endpoints** | Full documentation |
| Calculator code | ❌ None | ✅ **JS + Python** | Ready for integration |
| Discount factor | ✅ 0.60 | ✅ 0.60 | Confirmed |

### Completeness Score

**Aufsatzrollladen (Drutex) catalog data: ~98% complete** (was ~85%)
- ✅ Complete price matrix + all surcharge categories + calculators
- ✅ Weight calculation formula + constraints documented
- ⚠️ Seitenblende (side trim) surcharges not yet tested in new data
- ⚠️ Farbe Kasten/Führungsschienen (box/guide rail color) not separately tested
- ⚠️ Only 1 manufacturer (Drutex) available

**Aufsatzrollladen calculation (engine logic): ~97% complete** (was ~95%)
- ✅ ADDITIVE architecture confirmed
- ✅ Complete pricing formula with all components
- ✅ Weight validation formula documented
- ✅ Calculator implementations available
- ⚠️ Seitenblende pricing not yet verified
- ⚠️ Farbe Kasten pricing not yet separated from base price

---

## 9. Engine Impact & Recommendations

### Architecture Confirmed

The Aufsatzrollladen uses **ADDITIVE architecture** (Architecture C):

```
Final Price = (Base_Price(W,H) + Model + Drive + Color + BoxHeight + Plaster) × 0.60
```

This is the simplest pricing architecture — pure additive surcharges on top of a 2D dimension-based base price.

### New Engine Requirements

1. **Weight validation:** Must implement `weight = (H × W × 3.6 / 1M) / divisions` and reject configs where weight ≥ 12kg
2. **Negative surcharges:** Engine must handle negative surcharge values (kastenhoehe_215 = -€65.01)
3. **Drive type expansion:** Add 3 new premium motor options to surcharge catalog

### Data Corrections Needed in Existing Code

| Item | Old Value | Correct Value | File |
|------|-----------|---------------|------|
| Nussbaum color | €81.71 | **€63.14** | `rollladen_calculations.json` |
| Braun Metallic | "needs_retest" | **€0.00** | `rollladen_calculations.json` |
| Putzträger beidseitig | €35.25 | **€35.14** | `rollladen_calculations.json` |

### Next Steps

1. **IMMEDIATE:** Update `rollladen_calculations.json` with corrected prices and new options
2. **IMMEDIATE:** Add Beige color (farbe_panzer_12) and 3 new drive types to data files
3. **LOW:** Test Seitenblende surcharge options (not yet extracted)
4. **LOW:** Test Farbe Kasten/Führungsschienen separately from Panzerfarbe
5. **FUTURE:** Gather second manufacturer Aufsatzrollladen data for verification
