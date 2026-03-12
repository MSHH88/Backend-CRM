# PSK (Parallel-Schiebe-Kipptür) — Dataset Analysis

> **Date:** March 12, 2026
> **Status:** ✅ ANALYSIS COMPLETE
> **Source:** `PSK-Data/` folder on Datasets branch
> **Files Analyzed:** 5 files (Color Data, Deep Dive Data, Price and Size Data, Surcharge Data, Alu Surcharge and Pricing Catalog)

---

## 1. Executive Summary

The CEO uploaded 5 files addressing PSK calculation gaps identified in `CALCULATION_STATUS.md` (previously at ~70%). These files provide **multi-manufacturer** data across Aluminium (Aluprof) and Kunststoff (Aluplast, Gealan) profiles.

| Data Area | Gap Before | Data Provided | Gap Status |
|-----------|-----------|---------------|------------|
| **Height anomaly (2500mm+)** | Unknown pricing above 2400mm | ✅ Resolved: 2400mm is HARD LIMIT, not anomaly | ✅ CLOSED |
| **Color surcharges (Alu)** | "15-25%" percentage unknown | ✅ Fixed EUR amounts per category | ✅ CLOSED |
| **Color surcharges (PVC)** | Not documented | ✅ 4-tier structure (€0 to €350) | ✅ CLOSED |
| **Glass surcharges** | 6 types partially known | ✅ Extended with warm edge variants + VSG | ⚠️ IMPROVED |
| **Full surcharge catalog** | 5 items from 7B data | ✅ 11+ surcharge items now documented | ⚠️ IMPROVED |
| **Size constraints by mfg** | Only Drutex PVC known | ✅ 3 manufacturers × dimension limits | ✅ CLOSED |
| **Alu profile models** | 4 profiles from 7B | ✅ Confirmed + pricing confirmed | ✅ CONFIRMED |

### Overall Assessment

**PSK calculation completeness: ~70% → ~85%**

The data significantly advances PSK understanding. Key remaining gaps:
1. **Exact EUR surcharge amounts** — some values still approximate (e.g., glass surcharges use "example" labels)
2. **PVC profile-specific pricing** — Aluplast/Gealan base prices not fully documented
3. **Complete glass catalog** — ESG, VSG, ornament exact prices still approximate

---

## 2. File-by-File Analysis

### 2A. PSK Color Data

**File:** `PSK (Parallel-Schiebe-Kipptür) Color Data.md`
**Size:** 1,734 bytes

#### What's New

**MAJOR FINDING — Aluminum (Aluprof) color surcharges are FIXED EUR, NOT percentage-based:**

| Color Category | Surcharge (EUR) | Notes |
|:--------------|:---------------:|:------|
| **RAL Standard** (Verkehrsweiß 9016, Anthrazitgrau 7016, etc.) | **€299.53** | Fixed flat-rate |
| **Wood Effect** (ADEC Eiche, Nussbaum, Mahagoni) | **€599.05** | Fixed flat-rate |
| **Metallic Effect** (ADEC series) | **€1,198.10** | Fixed flat-rate |

**Critical discovery:** For Aluminum, surcharges are **per side** (Innen/Außen). Selecting a color for both sides = **double surcharge** (e.g., €599.05 × 2 = €1,198.10 for Wood Effect on both sides).

**PVC (Aluplast/Gealan) color surcharges:**

| Color Category | Surcharge (EUR) |
|:--------------|:---------------:|
| Standard White | €0.00 |
| Standard Decor (1-seitig) | ~€150.00 |
| Standard Decor (2-seitig) | ~€250.00 |
| Special Decor | ~€350.00 |

#### Impact on Calculations

This **corrects the previous assumption** from 7B analysis that Alu colors use "15-25% surcharges." They are in fact **fixed EUR amounts per category**, consistent with the established pattern across all products. The "per-side" doubling for Alu is a new wrinkle specific to PSK aluminum.

---

### 2B. PSK Deep Dive Data

**File:** `PSK (Parallel-Schiebe-Kipptür) Deep Dive Data.md`
**Size:** 3,056 bytes

#### What's New

**Height anomaly RESOLVED:**

| Manufacturer | Profile | Max Height | Behavior at 2500mm+ |
|:------------|:--------|:----------:|:---------------------|
| Aluprof | MB-70 / MB-86 SI | **2400mm** | Error, no price calculation |
| Aluplast | IDEAL Neo AD 76mm | **2400mm** | Error, no price calculation |
| Gealan | S8000 / S9000 | **2400mm** | Error, no price calculation |

**Conclusion:** 2400mm is a **hard-coded constraint** across ALL manufacturers. There is no special "extreme height pricing" — the system simply refuses heights above 2400mm.

**Extended surcharge catalog (Aluprof Alu):**

| Category | Option | Surcharge |
|----------|--------|-----------|
| Rahmenverbreiterung | 25mm | €50.00 |
| Rahmenverbreiterung | 50mm | €100.00 |
| Rahmenverbreiterung | 100mm | €200.00 |
| Sprossen | Innenliegend 8mm | €150.00 |
| Sprossen | Innenliegend 18mm | €200.00 |
| Sprossen | Innenliegend 26mm | €250.00 |
| Rollladen | Aufsatzrollladen | €500.00+ (varies) |
| Sonstiges | Fensterbankanschluss | €30.00 |
| Sonstiges | Griffolive abschließbar | €50.00 |
| Sonstiges | RC 2 (WK 2) Beschläge | €150.00 |

---

### 2C. PSK Price and Size Data

**File:** `PSK (Parallel-Schiebe-Kipptür) Price and Size Data.md`
**Size:** 1,556 bytes

#### What's New — Multi-Manufacturer Size Constraints

| Material | Manufacturer | Min Width | Max Width | Min Height | Max Height |
|:---------|:------------|:---------:|:---------:|:----------:|:----------:|
| **Aluminium** | Aluprof (MB-70/86) | 1500mm | 3000mm | 1700mm | 2400mm |
| **Kunststoff** | Aluplast (Neo AD) | 1400mm | 3000mm | 800mm | 2400mm |
| **Kunststoff** | Gealan (S8000/9000) | 1800mm | 4100mm | 1900mm | 2400mm |

**Key observations:**
- Gealan has the **widest max width** (4100mm) — nearly double Aluprof
- Aluplast has the **lowest min height** (800mm) — unusually low for a sliding door
- All three share 2400mm max height — universal hardware limit
- Width ranges vary significantly by manufacturer (engine needs per-manufacturer validation)

**Base pricing examples (Aluprof MB-70, standard config, 40% discount applied):**

| Width | Height | Price (after 40% discount) |
|:-----:|:------:|:--------------------------:|
| 1500mm | 1700mm | €2,396.21 |
| 2000mm | 2000mm | ~€2,850.00 |
| 3000mm | 2400mm | ~€3,500.00 |

---

### 2D. PSK Surcharge Data

**File:** `PSK (Parallel-Schiebe-Kipptür) Surcharge Data.md`
**Size:** 1,952 bytes

#### What's New — Extended Glass and Hardware Catalogs

**Glass surcharges (Aluprof Alu):**

| Glass Type | Surcharge |
|:-----------|:---------:|
| 2-fach Thermo-Verglasung (Standard) | €0.00 |
| 2-fach Thermo-Verglasung (warme Kante) | €45.00 |
| 3-fach Thermo-Verglasung | €180.44 |
| 3-fach Thermo-Verglasung (warme Kante) | €225.00 |
| Sicherheitsglas (VSG) | ~€250.00 |
| Ornamentglas | ~€150.00 |

**Additional hardware surcharges (new items):**

| Option | Surcharge |
|:-------|:---------:|
| Reedkontakt (Verschlussüberwachung) | €80.00 |
| Automatisches Getriebe UP | €120.00 |

**Business rule:** Automatisches Getriebe UP is recommended for widths >2200mm and **essential** above 2700mm.

---

### 2E. PSK Tür Aluminium — Surcharge and Pricing Catalog

**File:** `PSK Tür Aluminium - Surcharge and Pricing Catalog.md`
**Size:** 1,787 bytes

#### What's New — Alu-Specific Profile Details

**Profile models (Aluprof MB Series):**

| Profile | Description | Base Price (from) |
|:--------|:-----------|:-----------------:|
| MB-70 | Standard Aluminum | €2,396.21 (1500×1700mm) |
| MB-70 HI | High Insulation | + surcharge applies |
| MB-86 SI | Optimal Insulation | + surcharge applies |
| MB-79N SI | New Generation SI | + surcharge applies |

**Opening directions confirmed:**
- Kipp-Schiebe + Fest nach rechts öffnend (sliding left to right)
- Fest + Kipp-Schiebe nach links öffnend (sliding right to left)

**Extreme size pricing:** Non-linear scaling as dimensions approach 3000×2400mm limit. Auto ESG/VSG surcharges when glass area exceeds threshold.

**Glass & color surcharge notes:**
- Standard colors (RAL 9016, 7016): €0.00 surcharge
- Special RAL: One-sided or double-sided, approx. 15-25% (this conflicts with the fixed EUR data in the Color Data file — **fixed EUR is likely correct** for the base RAL categories, percentage may apply to special/custom colors)
- Triple glazing: ~€40-60 per m² surcharge

---

## 3. Cross-Reference with Existing Data

### What Was Already Known (from psk_calculations.json + 7B analysis)

| Data | Source | Status |
|------|--------|--------|
| Drutex PVC width pricing (1200-3200mm) | `psk_calculations.json` | ✅ Had |
| Drutex PVC height pricing (1800-2400mm) | `psk_calculations.json` | ✅ Had |
| 5 Drutex PVC profile multipliers | `psk_calculations.json` | ✅ Had |
| 4 opening types | `psk_calculations.json` | ✅ Had |
| 5 Alu surcharges (7B) | `7B_DATASET_ANALYSIS.md` | ✅ Had |
| 4 Alu profiles (7B) | `7B_DATASET_ANALYSIS.md` | ✅ Had |

### What Is NEW from This Dataset

| Data | New? | Impact |
|------|:----:|--------|
| **Alu color surcharges as fixed EUR** (€299.53 / €599.05 / €1,198.10) | ✅ NEW | Corrects "15-25%" assumption → fixed EUR pattern confirmed |
| **Per-side color doubling for Alu** | ✅ NEW | New calculation rule for aluminum PSK |
| **PVC color surcharge tiers** (€0-350) | ✅ NEW | First PVC color data for PSK |
| **2400mm height hard limit** (all manufacturers) | ✅ NEW | Closes height anomaly question definitively |
| **Multi-manufacturer size constraints** (3 manufacturers) | ✅ NEW | Engine needs per-manufacturer validation rules |
| **Extended surcharge catalog** (11+ items vs 5) | ✅ NEW | Sprossen, Fensterbankanschluss, Griffolive added |
| **Glass warm-edge variants** (€45/€225) | ✅ NEW | More glass options documented |
| **Aluprof base pricing** (€2,396.21 at 1500×1700mm) | ✅ CONFIRMED | Matches 7B data exactly |
| **Automatisches Getriebe business rule** | ✅ NEW | Width-dependent hardware recommendation |

---

## 4. Updated PSK Calculation Status

### Before This Dataset: ~70%

| Aspect | Status |
|--------|--------|
| Base price logic | ⚠️ PARTIAL |
| Height pricing | ⚠️ PARTIAL (anomaly unresolved) |
| Color surcharges | ⚠️ PARTIAL ("15-25%" unclear) |
| Glass surcharges | ⚠️ PARTIAL |
| Surcharge catalog | ⚠️ PARTIAL (5 items) |

### After This Dataset: ~85%

| Aspect | Status | Change |
|--------|--------|--------|
| Base price logic | ⚠️ PARTIAL → same | Need more size×price data points |
| Height pricing | ✅ RESOLVED | 2400mm hard limit confirmed |
| Color surcharges (Alu) | ✅ COMPLETE | Fixed EUR: €299.53/€599.05/€1,198.10 per side |
| Color surcharges (PVC) | ⚠️ PARTIAL | 4 tiers known (€0-350), exact per-color not documented |
| Glass surcharges | ⚠️ IMPROVED | 6 types now (was 4), warm-edge variants added |
| Surcharge catalog | ⚠️ IMPROVED | 11+ items (was 5), Sprossen/Griffolive/Fensterbank added |
| Size constraints (multi-mfg) | ✅ COMPLETE | 3 manufacturers documented |
| Opening directions | ✅ COMPLETE | 2 directions confirmed |

### What Still Needs Doing (~15% remaining)

1. **Exact glass surcharge amounts** — VSG (€250) and Ornamentglas (€150) marked as "example" prices
2. **PVC manufacturer base pricing** — Aluplast and Gealan base prices not documented (only Aluprof €2,396.21 known)
3. **Profile surcharges** — MB-70 HI, MB-86 SI, MB-79N SI surcharge amounts not documented
4. **Complete PVC color catalog** — Exact per-decor surcharges for Aluplast/Gealan
5. **Width×Height pricing matrix** — More data points needed for formula reverse-engineering

---

## 5. Impact on Pricing Engine

### New Rules to Implement

1. **Per-side color surcharges (Alu only):** When customer selects a non-standard color, ask if inside, outside, or both sides. Both sides = 2× surcharge.
2. **Manufacturer-specific dimension validation:** Each manufacturer has different min/max width and height limits.
3. **Width-dependent hardware rule:** Recommend Automatisches Getriebe UP for width >2200mm, require it for >2700mm.
4. **Height hard cap:** 2400mm for ALL manufacturers — no need to handle heights above this.

### Pricing Architecture Confirmation

PSK uses **Architecture B (FORMULA-based)** — confirmed by this data:
- Base price scales with width × height (non-linearly)
- Fixed EUR surcharges for options (colors, glass, hardware)
- Universal 40% discount (×0.60) applied last
- Same pattern as Haustüren but with sliding door-specific options

---

## 6. Data Quality Assessment

| Criterion | Rating | Notes |
|-----------|:------:|-------|
| **Completeness** | ⭐⭐⭐⭐ | Major gaps closed (height anomaly, color surcharges) |
| **Accuracy** | ⭐⭐⭐ | Some prices marked "approx." or "example" |
| **Engine-readiness** | ⭐⭐⭐ | Color surcharges ready; glass/hardware need exact verification |
| **Multi-manufacturer** | ⭐⭐⭐⭐ | 3 manufacturers covered (Aluprof, Aluplast, Gealan) |
| **Consistency** | ⭐⭐⭐ | Fixed EUR matches established pattern; one file still mentions "15-25%" |

---

## 7. Recommendations

### Immediate (can implement now)
- ✅ Add per-manufacturer dimension validation to engine
- ✅ Implement Alu color surcharge tiers (€299.53/€599.05/€1,198.10)
- ✅ Implement per-side color doubling logic for Alu
- ✅ Set 2400mm hard height cap for all PSK manufacturers
- ✅ Add extended surcharge catalog (11+ items)

### Needs More Data
- ⬜ Exact glass surcharges (VSG, Ornament) — verify on live configurator
- ⬜ Aluplast/Gealan base pricing at reference sizes
- ⬜ Profile upgrade surcharges (MB-70 HI, MB-86 SI, MB-79N SI deltas)
- ⬜ PVC per-decor color surcharges (exact EUR per Aluplast/Gealan decor)

---

*End of PSK Dataset Analysis*
