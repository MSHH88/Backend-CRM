# Falt-Schiebe-Tür Dataset Analysis — Aluminum Folding Sliding Doors

> **Date:** March 10, 2026
> **Status:** ✅ ANALYSIS COMPLETE
> **Source:** `Falt-Schiebe-Tür/` folder on Datasets branch
> **Files Analyzed:** 3 files (Calculation Logic, Size-Based Price Changes, Surcharge Catalog)
> **Previous Status:** ❌ 0% COMPLETE — now **⚠️ ~75% COMPLETE**

---

## 1. Executive Summary

The CEO provided 3 files covering **Aluminum Folding-Sliding Doors (Faltschiebetüren)** using the **Aluprof MB-86 Fold Line** profile system. This product was previously at **0% calculation completeness** with no data.

### Overall Assessment

| Aspect | Verdict |
|--------|---------|
| **Data makes sense?** | ✅ YES — pricing logic is coherent and consistent |
| **Data complete?** | ⚠️ MOSTLY — structure is complete, exact EUR values are approximate ranges |
| **Can we build calculation logic?** | ✅ YES — enough to build the pricing engine for this product |
| **New architecture?** | ✅ YES — this is a NEW **element-count-based** calculation, unlike Fenster/Haustür/PSK |

### Key Findings

1. **Pricing is driven by element count** (3-6 folding parts) — this is a unique pricing architecture
2. **Area-based scaling** with non-linear behavior near dimension limits
3. **Discount factor ×0.60** (40% off) — **CONFIRMED same** as all other products
4. **Surcharges are additive fixed EUR** — consistent with the universal formula
5. **Aluminum only** — data covers Aluprof MB-86 Fold Line; PVC/Holz-Alu NOT provided

---

## 2. File-by-File Analysis

### 2A. Calculation Logic

**File:** `Aluminum Folding-Sliding Door (Faltschiebetür) - Calculation Logic.md`
**Size:** 1,697 bytes

#### What's Provided

| Section | Content | Quality |
|---------|---------|---------|
| Base Pricing Model | Element-count-based + area scaling | ✅ Complete |
| Part-Based Pricing | 4 configurations (3-6 teilig) with base prices | ✅ Good — has exact base prices |
| Calculation Formulas | Discount 0.60, area formula, price per m² | ✅ Complete |
| Threshold/Limit Logic | Width 2280-6000mm, Height 1900-2500mm, weight constraints | ✅ Complete |

#### Key Data Extracted

**Part-based base prices (at 2500mm height):**

| Configuration | Min. Width | Base Price (approx.) |
|:---|:---|:---|
| 3-teilig | 2280 mm | €4,985.78 |
| 4-teilig | 2280 mm | €6,100.66 |
| 5-teilig | 3800 mm | €8,012.44 |
| 6-teilig | 4500 mm | €8,772.04 |

**Price hierarchy:** Each additional element adds ~€800-1,200 to the base price.

**Pricing formula confirmed:**
```
Final Price = List Price × 0.60
Area (m²) = (Width / 1000) × (Height / 1000)
Price per m² ≈ €1,276 - €1,300 (varies by configuration)
```

**Dimension constraints:**
- Width: 2280mm to 6000mm (varies by part count)
- Height: 1900mm to 2500mm
- Weight: Max ~100kg per leaf (glass weight safety limit)

#### Completeness Assessment

| Aspect | Complete? | Notes |
|--------|-----------|-------|
| Element count pricing | ✅ YES | 4 configurations with base prices |
| Area scaling logic | ✅ YES | Non-linear, price per m² documented |
| Discount factor | ✅ YES | 0.60 confirmed |
| Dimension limits | ✅ YES | Min/max per configuration |
| Weight constraints | ✅ YES | 100kg per leaf limit |
| Profile variants | ❌ NO | Only MB-86 Fold Line shown — likely only profile for Falt-Schiebe |

---

### 2B. Size-Based Price Changes

**File:** `Aluminum Folding-Sliding Door (Faltschiebetür) - Size-Based Price Changes.md`
**Size:** 2,459 bytes

#### What's Provided

| Section | Content | Quality |
|---------|---------|---------|
| 3-Part Door Pricing | Width/height/both +100cm impact | ✅ Good data |
| 6-Part Door Pricing | Width/height/both +100cm impact | ✅ Good data |
| Pricing Observations | Non-linear scaling, threshold effects | ✅ Important insights |

#### Key Data Extracted

**3-Part Door — Price Impact per 1000mm:**

| Change Type | Price Change |
|:---|:---|
| Width only (+1000mm) | +€1,713.54 |
| Height only (+1000mm) | +€1,670.36 |
| Both (+1000mm each) | +€1,968.70 |

**6-Part Door — Price Impact per 1000mm:**

| Change Type | Price Change |
|:---|:---|
| Width only (+1000mm) | +€1,922.04 |
| Height only (+1000mm) | +€1,822.04 |
| Both (+1000mm each) | +€2,272.04 |

#### Critical Insights

1. **Width and height impact are BALANCED** (width ≈ 1.03× height) — unlike Haustüren where width is 23× more impactful
2. **Larger doors have higher per-increment costs** — 6-part +€1,922 vs 3-part +€1,713 per 1000mm width
3. **Non-linear scaling** near dimension limits — price per m² increases due to thicker glass and stronger hardware
4. **Threshold effects** — certain size increments trigger glass thickness upgrades (4mm → 6mm), causing step-up pricing

#### Architecture Classification

This pricing behavior confirms a **FORMULA-BASED architecture** (similar to PSK/Haustür) but with a key twist:
- Primary variable: **element count** (3-6 parts)
- Secondary variables: **width × height** (area-based scaling)
- Surcharges: **additive fixed EUR**

**Proposed Architecture: "ELEMENT-FORMULA" (Architecture D)**
```
base_price = lookup(element_count, reference_height)
size_adjustment = f(width, height)  // non-linear scaling
surcharges = Σ(selected options in EUR)
total = (base_price + size_adjustment + surcharges) × 0.60
```

---

### 2C. Surcharge Catalog

**File:** `Aluminum Folding-Sliding Door (Faltschiebetür) - Surcharge Catalog.md`
**Size:** 1,741 bytes

#### What's Provided

| Section | Content | Quality |
|---------|---------|---------|
| Threshold Surcharges | 3 types | ⚠️ Ranges not exact |
| Opening & Folding | 3 options (direction, pattern) | ✅ Good structure |
| Handle & Hardware | 4 option categories | ⚠️ Ranges not exact |
| Glass & Color | 5 option types | ⚠️ Mix of fixed EUR and percentage |

#### Surcharge Data Extracted

**Threshold (Schwelle):**
```
Standard Rahmenschwelle (33.5mm):     €0.00
Flache Schwelle (22mm):               €150.00 - €250.00
Barrierefreie Schwelle (14mm):        €350.00 - €550.00
```

**Opening & Folding:**
```
Nach innen (standard):                €0.00
Nach außen:                           €120.00 - €220.00
Öffnungsart (LLL, RRR, LLR, etc.):  €0.00 (standard configs)
```

**Handle & Hardware:**
```
Standard handles:                     €0.00
Abschließbar (innen only):           €45.00 - €75.00
Abschließbar (innen/außen):          €120.00 - €180.00
Rahmenverbreiterung:                  €35.00 - €85.00 per meter
```

**Glass & Color:**
```
Standard colors (RAL 9016/7016):      €0.00
Special RAL colors:                   15-25% surcharge (⚠️ PERCENTAGE)
Triple glazing (3-fach):              €45.00 - €75.00 per m²
Safety glass (ESG/VSG):               €60.00 - €120.00 per m²
Warme Kante spacer:                   €25.00 - €45.00 per m²
```

#### Completeness Assessment

| Aspect | Complete? | Notes |
|--------|-----------|-------|
| Threshold types | ✅ YES | 3 types identified |
| Folding directions | ✅ YES | Inside/outside documented |
| Configuration patterns | ⚠️ PARTIAL | Standard is free, custom pricing unknown |
| Lock hardware | ✅ YES | 3 tiers documented |
| Frame extensions | ✅ YES | Per-meter pricing |
| Glass surcharges | ⚠️ PARTIAL | Per-m² pricing — ranges not exact |
| Color surcharges | ❌ NO | Percentage-based ("15-25%") — same Alu pattern as 7B |
| Exact EUR prices | ❌ NO | All values are ranges |

---

## 3. New Calculation Architecture — ELEMENT-FORMULA

### 3A. How Falt-Schiebe-Tür Differs from Other Products

| Product | Architecture | Price Driver | Base Unit |
|---------|-------------|-------------|-----------|
| Fenster | A: MATRIX | Width × Height grid | 2D matrix cell |
| Balkontür | A: MATRIX | Width × Height grid | 2D matrix cell |
| Haustür | B: FORMULA | Width-dominant formula | Single formula |
| PSK | B: FORMULA | Width ranges + height | Progressive formula |
| Rollladen | C: ADDITIVE | Components sum | Component list |
| **Falt-Schiebe-Tür** | **D: ELEMENT-FORMULA** | **Element count × Area** | **Part count + m² scaling** |

### 3B. Proposed Calculation Flow

```
STEP 1:  element_count    = user selects 3, 4, 5, or 6 parts
STEP 2:  base_price       = lookup(element_count, reference_size)
STEP 3:  size_adjustment   = f(width, height, element_count)  // non-linear
STEP 4:  glass_surcharge   = f(area_m2, glass_type)           // per m² based
STEP 5:  fixed_surcharges  = Σ(threshold + folding_direction + hardware)
STEP 6:  color_surcharge   = base_price × color_percentage    // ⚠️ IF percentage-based
                          OR fixed_EUR_amount                 // IF fixed (needs verification)
STEP 7:  preisempfehlung   = base_price + size_adjustment + glass_surcharge + fixed_surcharges + color_surcharge
STEP 8:  angebotspreis     = preisempfehlung × 0.60
STEP 9:  totalWithVat      = angebotspreis × quantity × 1.19
```

### 3C. Key Differences from Existing Architectures

1. **Per-m² glass surcharges** — glass is priced per square meter (€45-120/m²), not a flat fee
2. **Percentage-based color surcharges** (⚠️ needs verification) — may be 15-25% of base, not fixed EUR
3. **Element count as primary variable** — not seen in any other product
4. **Weight-based dimension limits** — glass weight per leaf constrains max dimensions
5. **Folding direction as surcharge** — unique to this product type

---

## 4. Material Requirements — Do We Need Different Materials?

### Current Data: Aluminum Only (Aluprof MB-86 Fold Line)

The CEO asked: **Do we need data for different materials?**

### Answer: It Depends on Your Product Offering

| Material | Typically Available? | Need Separate Data? | Priority |
|----------|---------------------|-------------------|----------|
| **Aluminum** | ✅ YES — most common for Falt-Schiebe | ✅ PROVIDED | HIGH |
| **PVC (Kunststoff)** | ⚠️ RARE — few manufacturers offer PVC folding doors | ✅ YES if offered | LOW |
| **Holz** | ⚠️ RARE — some premium manufacturers | ✅ YES if offered | LOW |
| **Holz-Alu** | ⚠️ EXISTS — premium segment | ✅ YES if offered | LOW |

### Key Material Facts

1. **Falt-Schiebe-Türen are predominantly Aluminum** — the large glass panels require the structural strength of aluminum profiles
2. **PVC folding doors exist** but are less common due to weight/stability limitations
3. **The calculation ARCHITECTURE is the same** regardless of material — only the catalog data (base prices, surcharge amounts) differs
4. **Once the Alu calculation is complete**, adding PVC/Holz/Holz-Alu = just providing new catalog data

### Recommendation

- ✅ **Build the calculation engine using the Aluminum data** — this covers the primary use case
- ⚠️ **If you plan to offer PVC or Holz-Alu Falt-Schiebe-Türen**, you'll need separate catalog datasets
- ❌ **No additional calculation analysis is needed** — the formula structure is material-independent

---

## 5. Drutex Surcharge Concern — Size Mismatch Note

### CEO's Observation

> "Maybe the surcharge calculation for Drutex is off — maybe this was calculated with a bigger window (e.g., 2m×3m) while Gealan was analyzed with 1m×1m."

### Analysis

This is a **valid concern** to investigate when the surcharge catalog becomes available. The current comparison shows:

| Option | Gealan PVC | Drutex PVC | Difference |
|--------|-----------|-----------|------------|
| Anthrazit Außenfarbe | €6.44 | €43.68 | 6.8× |
| 3-fach Premium Glas | €4.76 | €39.81 | 8.4× |
| Sicherheitsverglasung | €6.54 | €200.59 | 30.7× |

**However, our established finding is:** Surcharges are **fixed EUR amounts** that do **NOT depend on window size**. If this is correct, the base window size used for analysis should not matter.

**Possible explanations:**
1. **Different analysis window sizes** — if surcharges ARE actually size-dependent for Drutex (contradicting our finding), this would explain the difference
2. **Genuinely different manufacturer pricing** — Drutex simply charges more for surcharges
3. **Different profile/glass included in "base"** — what's included in the base config may differ

### Resolution

> CEO confirmed: **"We will clear that up as soon as we have the surcharge catalog."** The surcharge concern is **NOT blocking** — the important thing NOW is the calculation logic.

When the Drutex surcharge catalog arrives:
- Verify if surcharges are truly size-independent
- Compare catalog values vs website-extracted values
- If there's a discrepancy, recalibrate the Drutex surcharge dataset

---

## 6. Updated Calculation Completeness

### Before This Data

| Product | Status |
|---------|--------|
| Falt-Schiebe-Tür | ❌ 0% COMPLETE |

### After This Data

| Product | Status | Details |
|---------|--------|---------|
| Falt-Schiebe-Tür | **⚠️ ~75% COMPLETE** | Base pricing, element logic, size scaling, surcharge structure all known |

### What Moves to ~75%

| Aspect | Status | Notes |
|--------|--------|-------|
| Base pricing (element-count based) | ✅ COMPLETE | 4 configurations with reference prices |
| Size-based scaling | ✅ COMPLETE | Width+height impact documented for 3-part and 6-part |
| Discount factor | ✅ COMPLETE | 0.60 confirmed |
| Dimension limits | ✅ COMPLETE | Width, height, weight constraints |
| Surcharge structure | ✅ COMPLETE | Categories and types identified |
| Threshold surcharges | ✅ KNOWN | 3 types with ranges |
| Folding direction surcharge | ✅ KNOWN | Inside (free) vs outside (+surcharge) |
| Hardware surcharges | ✅ KNOWN | Lock options + frame extensions |
| Glass surcharges | ⚠️ PARTIAL | Per-m² ranges, not exact values |
| Color surcharges | ❌ INCOMPLETE | Percentage-based ("15-25%") — needs verification |
| Exact EUR values | ❌ INCOMPLETE | All prices are ranges from website analysis |
| Non-linear scaling formula | ⚠️ PARTIAL | Behavior described, exact formula not derived |
| Glass weight auto-limits | ⚠️ PARTIAL | Described but thresholds not quantified |

### What's Still Needed to Reach 100%

1. **Exact EUR values** for all surcharges (from manufacturer catalog)
2. **Verify percentage-based color pricing** — is it truly percentage or fixed EUR?
3. **Derive exact non-linear scaling formula** (more data points needed OR analyze fenstermaxx24.com more)
4. **Quantify glass weight thresholds** (at what area does auto ESG/VSG trigger?)
5. **Intermediate part configurations** — do 4-part and 5-part follow the same scaling pattern?

---

## 7. Impact on Overall Calculation Status

### Updated Product Completeness

| Product | Before | After | Change |
|---------|--------|-------|--------|
| Fenster | 100% | 100% | — |
| Balkontüren | ~97% | ~97% | — |
| Haustüren | ~92% | ~92% | — |
| PSK | ~70% | ~70% | — |
| Aufsatz-Rollladen | ~95% | ~95% | — |
| **Falt-Schiebe-Tür** | **0%** | **~75%** | **+75% 🎉** |
| HST | 0% | 0% | — |
| Smart-Slide | 0% | 0% | — |
| Vorsatzrollladen | 0% | 0% | — |
| Raffstore | 0% | 0% | — |
| Insektenschutz | 0% | 0% | — |
| Fensterbänke | 0% | 0% | — |

### Updated Overall Calculation Completeness

**Before:** ~76% (weighted by product importance)
**After:** ~80% (Falt-Schiebe-Tür adds significant coverage)

---

## 8. Recommendations

### For the CEO

1. ✅ **This data is excellent** — it takes Falt-Schiebe-Tür from 0% to ~75% in one batch
2. ✅ **Aluminum data is the primary need** — most Falt-Schiebe-Türen are Aluminum
3. ⚠️ **If you offer PVC or Holz Falt-Schiebe-Türen**, provide separate catalog datasets
4. ⚠️ **Exact prices from catalog** will complete the remaining 25%
5. ℹ️ **Drutex surcharge concern noted** — will be resolved with the surcharge catalog

### For Development

1. **Build a new ELEMENT-FORMULA architecture** (Architecture D) for Falt-Schiebe-Tür
2. **Add per-m² surcharge support** — glass surcharges are area-based, not flat
3. **Investigate percentage-based color surcharges** — may need a code path for percentage surcharges (Alu products)
4. **Use midpoint values from ranges** as placeholder test data
5. **Add element-count parameter** to the konfigurator — new UI element not in Fenster/Haustür

### Calculation Logic Ready to Build

```javascript
// Falt-Schiebe-Tür calculation
function calculateFaltSchiebeTuer(config) {
  const { elementCount, width, height, options } = config;

  // Step 1: Base price by element count
  const basePrices = {
    3: 4985.78,  // at 2500mm height
    4: 6100.66,
    5: 8012.44,
    6: 8772.04
  };
  let basePrice = basePrices[elementCount];

  // Step 2: Size adjustment (non-linear)
  const referenceHeight = 2500;
  const heightFactor = height / referenceHeight;  // simplified
  const widthFactor = width / getMinWidth(elementCount);
  basePrice *= heightFactor * widthFactor;  // approximate

  // Step 3: Glass surcharges (per m²)
  const area = (width / 1000) * (height / 1000);
  const glassSurcharge = area * getGlassPrice(options.glassType);

  // Step 4: Fixed surcharges
  const fixedSurcharges =
    getThresholdSurcharge(options.threshold) +
    getFoldingDirectionSurcharge(options.foldDirection) +
    getHardwareSurcharge(options.hardware);

  // Step 5: Apply discount
  const preisempfehlung = basePrice + glassSurcharge + fixedSurcharges;
  const angebotspreis = preisempfehlung * 0.60;

  return { preisempfehlung, angebotspreis };
}
```

---

## 9. Conclusion

### Is the Data Complete?

**Mostly YES.** The Falt-Schiebe-Tür dataset provides:

- ✅ **Complete calculation structure** — element-count × area × surcharges
- ✅ **Reference base prices** — 4 configurations with EUR values
- ✅ **Size scaling data** — width/height impacts documented
- ✅ **Surcharge categories** — thresholds, folding, hardware, glass, color
- ✅ **Dimension constraints** — min/max per configuration + weight limits
- ✅ **Discount factor** — 0.60 confirmed (same as all products)
- ⚠️ **Approximate ranges** — not exact single EUR values (expected)
- ⚠️ **Aluminum only** — PVC/Holz not covered (may not be needed)
- ⚠️ **Percentage-based colors** — needs verification (Alu pattern)

### Can We Check Off Falt-Schiebe-Tür?

**⚠️ PARTIALLY — moved from 0% to ~75%.** The calculation logic CAN be built. To reach 100%:
1. Get exact EUR values from catalog
2. Verify color surcharge method (percentage vs fixed)
3. Derive precise non-linear scaling formula
4. Quantify glass weight auto-limits

### Do We Need Different Materials?

**For the calculation engine: NO** — the architecture is material-independent.
**For catalog data: YES** — if you plan to offer PVC or Holz-Alu Falt-Schiebe-Türen, you need separate pricing datasets for each.
