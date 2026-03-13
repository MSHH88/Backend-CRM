# Phase 2 Step 2 — Surcharge Analysis: Cross-Manufacturer Comparison

> **Date:** March 10, 2026  
> **Status:** ✅ COMPLETE  
> **Key Finding:** Surcharges are **MANUFACTURER-SPECIFIC** — same option = different EUR price per manufacturer.  
> **Implication:** Each manufacturer needs its own surcharge dataset. You cannot share surcharge tables between Drutex PVC and Gealan PVC.

---

## 🔑 EXECUTIVE SUMMARY

### Question: Are surcharges the same across manufacturers?
**NO.** Surcharges are completely different per manufacturer. The same option (e.g., "Anthrazit exterior color") costs:
- Gealan PVC: **€6.44**
- Drutex PVC: **€43.68**
- Alu Balkontür: **€69.88**
- Holz Fenster: **€80.50**

### Question: Do surcharges follow a catalog/scheme pattern?
**YES.** Each manufacturer has a fixed surcharge catalog. Surcharges are:
- **Fixed EUR amounts** (not percentages, not per-sqm)
- **Per-unit flat rates** applied to each window/door unit
- **Catalog-based** — the surcharge for a specific option is always the same EUR value regardless of window size
- **Additive** — multiple surcharges stack (e.g., color + glass + muntins)

### Question: Are Drutex PVC and Gealan PVC surcharges the same?
**NO.** Despite both being PVC window manufacturers, their surcharge prices are completely different. See detailed comparison below.

### What this means for data collection:
- ✅ **Formula is universal** — one pricing engine works for all
- ❌ **Surcharge data is NOT universal** — each manufacturer needs its own surcharge table
- ❌ **Material doesn't determine surcharges** — two PVC manufacturers (Drutex, Gealan) have different prices
- 📋 **You need a surcharge dataset for EVERY manufacturer** you want to support

---

## 📊 DETAILED SURCHARGE COMPARISON

### 1. Glazing / Verglasung (Glass Type)

This is the most critical surcharge category — every window has a glass type.

| Option | Gealan PVC | Drutex PVC | Holz Fenster | Alu Balkontür |
|--------|-----------|-----------|-------------|--------------|
| 2-fach Standard | €0.00 | €0.00 | €0.00 | €0.00 |
| 3-fach Standard | €0.00 | €39.81 | €0.00 | €0.00 |
| 3-fach Premium/Passivhaus | €15.45 | €39.81 | €4.76 | €26.38 |
| 2-fach Solar | €5.09 | €0.00 | €14.24 | €70.77 |
| 3-fach Solar | -€1.46 | €0.00 | €0.00 | €0.00 |

**Finding:** 3-fach Premium ranges from €4.76 (Holz) to €39.81 (Drutex) — a **8× difference** for the same glass upgrade.

---

### 2. Exterior Color / Außenfarbe / Dekorfarbe Außen

| Color | Gealan PVC | Drutex PVC | Holz Fenster | Alu Balkontür |
|-------|-----------|-----------|-------------|--------------|
| Weiß (White/Standard) | €0.00 | €0.00 | €80.50* | €0.00 |
| Anthrazitgrau | €6.44 | €43.68 | €80.50 | €69.88 |
| Cremeweiß | €6.44 | €43.68 | €80.50 | N/A |
| Dunkelbraun | €6.44 | €0.00 | €80.50 | N/A |
| Mahagoni | N/A | €43.68 | €80.50 | N/A |
| Nussbaum golden | N/A | €43.68 | €80.50 | N/A |
| Winchester/Premium | N/A | €104.64 | €80.50 | N/A |

*Holz: All non-raw colors cost a flat €80.50 (both interior and exterior)

**Finding:** Same color "Anthrazit" costs €6.44 (Gealan) vs €43.68 (Drutex) vs €69.88 (Alu) vs €80.50 (Holz). **No consistency at all.**

**Catalog Pattern Identified:**
- **Gealan**: Tiered — Standard colors €6.44, Premium colors €10.74
- **Drutex**: Tiered — Standard €0, Foil colors €43.68, Premium foils €104.64, Specialty up to €117.20
- **Holz**: Flat rate — ALL finishes cost €80.50 each (exterior + interior charged separately)
- **Alu**: Two-tier — White €0, RAL colors €69.88

---

### 3. Interior Color / Innenfarbe / Dekorfarbe Innen

| Color | Gealan PVC | Drutex PVC | Holz Fenster | Alu Balkontür |
|-------|-----------|-----------|-------------|--------------|
| Weiß (Standard) | €0.00 | €0.00 | €80.50* | €0.00 |
| Colored Finishes | €11.50–€19.17 | €43.68–€117.20 | €80.50 | €69.88 |

**Finding:** Interior colors follow the same per-manufacturer pattern as exterior colors. Interior ≠ exterior pricing within same manufacturer (Gealan charges more for interior than exterior colors).

---

### 4. Security Glazing / Sicherheitsverglasung

| Option | Gealan PVC | Drutex PVC | Holz Fenster | Alu Balkontür |
|--------|-----------|-----------|-------------|--------------|
| None (Standard) | €0.00 | €0.00 | €0.00 | €0.00 |
| Active/Yes | €6.54 | €54.74–€200.59 | €14.24 | €45.66 |

**Finding:** Security glass ranges from €6.54 (Gealan) to up to €200.59 (Drutex) — a **30× price range**.

---

### 5. Muntins / Sprossen

| Option | Gealan PVC | Drutex PVC | Holz Fenster | Alu Balkontür |
|--------|-----------|-----------|-------------|--------------|
| None | €0.00 | €0.00 | €0.00 | €0.00 |
| Interior (Innenliegend) | €10.22 | €29.37 | €11.78 | €12.52 |
| Applied (Aufliegend) | €0.00 | €122.39 | €11.78 | €0.00 |

**Finding:** Interior muntins are relatively similar (€10–€29), but applied muntins are extreme: Drutex charges €122.39 while others charge €0–€11.78.

---

### 6. Roller Shutters / Rollladen

| Option | Gealan PVC | Drutex PVC | Holz Fenster | Alu Balkontür |
|--------|-----------|-----------|-------------|--------------|
| None | €0.00 | €0.00 | €0.00 | €0.00 |
| Aufsatz (Top-mounted) | €81.21 | €322.63 | N/A | N/A |
| Vorsatz (Applied) | €81.21 | €322.63 | N/A | N/A |

**Finding:** Drutex roller shutters cost **4× more** than Gealan (€322.63 vs €81.21).

---

### 7. Sound Insulation / Schallschutz

| Level | Gealan PVC | Drutex PVC | Holz Fenster | Alu Balkontür |
|-------|-----------|-----------|-------------|--------------|
| Standard | €0.00 | €0.00 | €0.00 | €0.00 |
| Level 2 (dB upgrade) | N/A | €22.68 | €0.00 | €0.00 |
| Level 3 | N/A | €56.92–€149.40 | €0.00 | €0.00 |
| Level 4 | N/A | €175.03 | €0.00 | €0.00 |

**Finding:** Only Drutex has graduated sound protection surcharges. Others include it in the glass type or don't differentiate.

---

### 8. Opening Type / Öffnungsrichtung

| Type | Gealan PVC | Holz Fenster |
|------|-----------|-------------|
| Fest (Fixed) | €0.00 | €0.00 |
| Kipp (Tilt) | €99.04 | €127.90 |
| Dreh (Swing) | €95.04 | €134.63 |
| Drehkipp (Tilt-Turn) | €95.04 | €153.33 |

**Finding:** Opening types vary 30–60% between manufacturers. Holz is consistently more expensive.

---

### 9. Ornamental Glass / Ornamentglas

| Option | Gealan PVC | Drutex PVC | Holz Fenster | Alu Balkontür |
|--------|-----------|-----------|-------------|--------------|
| None | €0.00 | €0.00 | €0.00 | €0.00 |
| Yes/Active | €25.80 | €39.28–€113.50 | €5.96 | €26.03 |

**Finding:** Ornamental glass: Holz cheapest (€5.96), Drutex most expensive (up to €113.50).

---

### 10. Pressure Equalization Valve / Druckausgleichsventil

| Option | Gealan PVC | Drutex PVC |
|--------|-----------|-----------|
| None | €0.00 | €0.00 |
| Yes | €23.17 | €49.93 |

**Finding:** Only PVC manufacturers offer this (makes sense — wood/alu don't need it). Drutex charges 2× more.

---

### 11. Safety Hardware / Sicherheitsbeschläge

| Option | Drutex PVC | Alu Balkontür |
|--------|-----------|--------------|
| None | €0.00 | €0.00 |
| RC1 | €65.88 | €0.00 |
| RC2 | €144.44 | €0.00 |

**Finding:** Only Drutex charges for security hardware upgrades.

---

### 12. Frame Widening / Rahmenverbreiterung

| Position | Holz Fenster | Alu Balkontür | Gealan PVC |
|----------|-------------|--------------|-----------|
| Standard | €0.00 | €0.00 | €0.00 |
| 20mm extension | N/A | €0.00 | €4.80 |
| 40mm extension | €14.50 | €0.00 | €9.49 |

---

## 🏭 MANUFACTURER-SPECIFIC SURCHARGE COUNTS

| Manufacturer | Material | Total Surcharge Categories | Total Options | Price Range |
|---|---|---|---|---|
| **Drutex** | PVC (Kunststoff) | 9 | ~60 | €0–€322.63 |
| **Gealan** | PVC (Kunststoff) | 22 | ~80 | €0–€99.04 |
| **Holz Fenster** | Wood (Holz) | 25 | ~100 | €0–€153.33 |
| **Alu Balkontür** | Aluminum | 28 | ~90 | €0–€70.77 |

---

## 🔍 CATALOG/SCHEME PATTERN ANALYSIS

### Are surcharges from a fixed catalog?
**YES.** Each manufacturer uses a fixed surcharge catalog where:

1. **Each option has ONE fixed EUR price** — not dependent on window size
2. **Prices are predetermined** — they come from the manufacturer's price list
3. **Catalog tiers exist within manufacturers:**
   - Drutex: Standard (€0), Basic foil (~€44), Premium foil (~€105), Specialty (~€117)
   - Gealan: Standard (€0), Color foil (~€6), Premium (~€11–19)
   - Holz: Standard (€0), Any finish (flat €80.50)
   - Alu: Standard (€0), RAL color (~€70)

### Pattern: Surcharges are organized by MANUFACTURER, not by MATERIAL

Even though Drutex and Gealan are both PVC:
- Drutex uses **higher individual surcharges** with **fewer categories** (9)
- Gealan uses **lower individual surcharges** with **more categories** (22)
- The EUR amounts are completely different

This means the surcharge catalog is a **per-manufacturer dataset**, not a per-material dataset.

---

## 📋 CROSS-MANUFACTURER PRICE COMPARISON (Same Option, All Manufacturers)

### "Anthrazit exterior color"
| Manufacturer | Material | EUR |
|---|---|---|
| Gealan | PVC | €6.44 |
| Drutex | PVC | €43.68 |
| Alu | Aluminium | €69.88 |
| Holz | Holz | €80.50 |

### "3-fach Premium Glass"
| Manufacturer | Material | EUR |
|---|---|---|
| Holz | Holz | €4.76 |
| Gealan | PVC | €15.45 |
| Alu | Aluminium | €26.38 |
| Drutex | PVC | €39.81 |

### "Interior Muntins"
| Manufacturer | Material | EUR |
|---|---|---|
| Gealan | PVC | €10.22 |
| Holz | Holz | €11.78 |
| Alu | Aluminium | €12.52 |
| Drutex | PVC | €29.37 |

### "Roller Shutters"
| Manufacturer | Material | EUR |
|---|---|---|
| Gealan | PVC | €81.21 |
| Drutex | PVC | €322.63 |
| Holz | Holz | N/A |
| Alu | Aluminium | N/A |

---

## ✅ CONCLUSIONS

### 1. Surcharges are MANUFACTURER-SPECIFIC
- Same material (PVC) does NOT mean same surcharges
- Drutex PVC ≠ Gealan PVC in any surcharge category
- Each manufacturer has its own price catalog

### 2. Surcharges follow a CATALOG/SCHEME pattern
- Fixed EUR amounts per option (not size-dependent)
- Organized in tiers within each manufacturer
- Some manufacturers have more categories than others

### 3. What you need for each new manufacturer:
- ✅ Base price matrix (width × height × profile)
- ✅ Complete surcharge catalog (all categories with EUR amounts)
- ✅ Profile list with multipliers or separate matrices
- ✅ Available options per category

### 4. Product types (Türen, Rolladen, Terrassentüren) will have different surcharges
- Windows are the biggest configurator (most options, most surcharges)
- Doors, roller shutters, terrace doors = different product types with their own surcharge catalogs
- Door designs, handles, etc. are product-specific surcharges from the manufacturer catalog
- The formula remains the same: `base_price + surcharges = recommended_price × discount`

### 5. Data collection priority:
Since each manufacturer needs its own dataset:
1. **Windows** — highest priority (biggest configurator, most manufacturers)
2. **Terrace doors** — second priority (similar to windows but with different base prices)
3. **Entrance doors** — third priority (design-based pricing from catalog)
4. **Roller shutters** — can be added as a surcharge or standalone product

---

## 📁 Available Surcharge Data Files

| Manufacturer | Surcharge File | Rows/Options | Status |
|---|---|---|---|
| **Drutex** | `datasets/drutex-kunststoff-fenster/drutex_kunststoff_surcharges_full.json` | ~60 options | ✅ Complete |
| **Gealan** | `Gealen-Kunstoff-PM/gealan_pvc_aufpreise.csv` + complete JSON | 81 rows | ✅ Complete |
| **Holz** | `Holz-Fenster-PM/holz_aufpreise.csv` + complete JSON | 103 rows | ✅ Complete |
| **Alu** | `Balkon-Alu-PM/alu_balkontuer_aufpreise.csv` + complete JSON | 92 rows | ✅ Complete |
