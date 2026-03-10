# Phase 2 Step 2 — Dataset Analysis Results

> **Date:** March 10, 2026
> **Status:** ✅ COMPLETE
> **Conclusion:** All 4 manufacturers use the **SAME calculation formula**. One engine serves all — only the data changes.

---

## 🔑 KEY FINDING

**All manufacturers share the same pricing formula:**

```
preisempfehlung = base_price[profile][width][height] + Σ(surcharges)
angebotspreis   = preisempfehlung × 0.6
```

| Aspect | Drutex | Gealan | Holz | Alu | Same? |
|--------|--------|--------|------|-----|-------|
| **Formula** | base × multiplier + surcharges | base + surcharges | base + surcharges | base + surcharges | ✅ YES |
| **Surcharge type** | Fixed EUR additive | Fixed EUR additive | Fixed EUR additive | Fixed EUR additive | ✅ YES |
| **Discount factor** | 0.6 (40% off) | 0.6 (40% off) | 0.6 (40% off) | 0.6 (40% off) | ✅ YES |
| **Negative surcharges** | YES | YES | NO | YES | ✅ Same pattern |
| **Profile handling** | Multipliers (×1.26 etc) | Absolute per-profile matrix | Absolute per-profile matrix | Absolute per-profile matrix | ⚠️ Minor diff |

**What this means:** You do NOT need different calculation engines per manufacturer. The same `priceCalculator.js` engine works for ALL — just feed it different data (price matrices + surcharges).

---

## 📊 Manufacturer Comparison Detail

### 1. Price Matrix Structure

| Manufacturer | Profiles | Width Range | Height Range | Matrix Size | Format |
|---|---|---|---|---|---|
| **Drutex Kunststoff** | 6 (Iglo 5/5C/Energy/EC/Light/EXT) | 400–2400mm (21 steps) | 400–2400mm (21 steps) | 441 per profile | Single p1 matrix × multiplier |
| **Gealan PVC** | 3 (S8000/S9000/LINEAR) | 400–2000mm (15 steps) | 400–2000mm (15 steps) | 225 per profile | Separate matrix per profile |
| **Holz Fenster** | 6 (Softline 68/78/88 × Kiefer/Meranti) | 330–1500mm (7 steps) | 350–2400mm (9 steps) | 63 per profile | Separate matrix per profile |
| **Alu Balkontür** | 4 (MB-45/70/70HI/86SI) | 440–1200mm (8 steps) | 1700–2400mm (varies) | ~36 per profile | Separate matrix per profile |

### 2. Surcharge Categories

| Category | Drutex | Gealan | Holz | Alu |
|----------|--------|--------|------|-----|
| **Profil** | via multiplier | via matrix | via matrix | via matrix |
| **Öffnungsrichtung** | ✅ | ✅ | ✅ | ✅ |
| **Außenfarbe/Dekor** | ✅ | ✅ | ✅ (Holz stain) | ✅ (RAL) |
| **Innenfarbe/Dekor** | ✅ | ✅ | ✅ (Holz stain) | ✅ (RAL) |
| **Verglasung** | ✅ | ✅ | ✅ | ✅ |
| **Schallschutz** | ✅ | ✅ | ✅ | ✅ |
| **Sicherheitsverglasung** | ✅ | ✅ | ✅ | ✅ |
| **Sprossen** | ✅ | ✅ | ✅ | ✅ |
| **Rollladen** | ✅ | ✅ | — | ✅ |
| **Rahmenverbreiterung** | — | ✅ | ✅ | ✅ |
| **Fensterbankanschluss** | — | ✅ | ✅ | — |
| **Fensterfalzlüfter** | — | — | ✅ | ✅ |
| **Ornamentglas** | — | ✅ | ✅ | ✅ |
| **Blendrahmen** | — | ✅ | — | — |
| **Flügel** | — | ✅ | — | — |
| **Kernfarbe** | — | ✅ | — | — |
| **Dichtungsfarbe** | — | ✅ (2×) | — | — |
| **Druckventil** | — | ✅ | — | — |
| **Dünne Schweißnaht** | — | ✅ | — | — |
| **Kämpfer** | — | — | — | ✅ |
| **Trittschwelle** | — | — | — | ✅ |
| **Griffmuschel** | — | — | — | ✅ |
| **Aufbohrschutz** | — | — | ✅ | ✅ |
| **Wetterschenkel** | — | — | ✅ | — |
| **Silikonfarbe** | — | — | ✅ | — |
| **Reedkontakt** | — | — | ✅ | ✅ |
| **Sicherheitsbeschläge** | ✅ | — | — | ✅ |
| **Total categories** | 9 | 22 | 25 | 28 |

### 3. Profile Pricing Approach

**Drutex (Multiplier-based):**
```
profile_price = base_matrix_p1[width][height] × multiplier
Example: 1000×1000 p3 = €295.44 × 1.2601 = €372.27
```

| Profile | Multiplier | 1000×1000 Price |
|---------|-----------|-----------------|
| Iglo 5 Classic (p1) | 1.0000 | €295.44 |
| Iglo 5 (p2) | 1.0000 | €295.44 |
| Iglo Energy Classic (p3) | 1.2601 | €372.27 |
| Iglo Energy (p4) | 1.2601 | €372.27 |
| Iglo Light (p5) | 0.9532 | €281.60 |
| Iglo EXT (p7) | 1.2886 | €380.72 |

**Gealan, Holz, Alu (Absolute per-profile matrix):**
```
profile_price = profile_matrix[profile_id][width][height]
Example: Gealan S9000 500×500 = €72.34 (direct lookup)
```

**Engine impact:** The pricing engine already supports both approaches — it just needs to detect whether a manufacturer uses multipliers or direct lookup. This is trivial to implement: if `profileMultiplier` exists → multiply, otherwise → direct lookup from profile-specific matrix.

### 4. Discount Factor

**IDENTICAL across all manufacturers: 0.6 (40% off)**

| Manufacturer | discount_factor | discount_percent |
|---|---|---|
| Drutex | 0.6 | 40% |
| Gealan | 0.6 | 40% |
| Holz | 0.6 | 40% |
| Alu | 0.6 | 40% |

---

## 📐 The Unified Calculation (10-Step Master Formula)

```
STEP 1:  grundpreis         = lookup base price for profile + dimensions
STEP 2:  profileAdjusted    = grundpreis × multiplier (or skip if absolute)
STEP 3:  surchargesTotal    = Σ(all selected option surcharges in EUR)
STEP 4:  preisempfehlung    = profileAdjusted + surchargesTotal
STEP 5:  discountRate       = resolve from product/category/global config
STEP 6:  ersparnis          = preisempfehlung × discountRate
STEP 7:  angebotspreis      = preisempfehlung − ersparnis
STEP 8:  quantityDiscount   = tier-based volume discount
STEP 9:  unitPrice          = angebotspreis × (1 − quantityDiscount)
STEP 10: totalWithVat       = unitPrice × quantity × (1 + vatRate)
```

**This formula works for ALL 4 manufacturers without modification.**

---

## 📁 Data Files Available Per Manufacturer

| Manufacturer | Price Matrix CSV | Surcharges CSV | Complete JSON | Ready? |
|---|---|---|---|---|
| **Drutex** | `datasets/drutex.../base_prices.csv` | `datasets/drutex.../surcharges.json` | Multiple files | ✅ Integrated |
| **Gealan** | `Gealen-Kunstoff-PM/gealan_pvc_alle_profile_preismatrix.csv` (676 rows) | `Gealen-Kunstoff-PM/gealan_pvc_aufpreise.csv` (81 rows) | `gealan_pvc_complete_data.json` | ✅ Ready |
| **Holz** | `Holz-Fenster-PM/holz_alle_profile_preismatrix.csv` (379 rows) | `Holz-Fenster-PM/holz_aufpreise.csv` (103 rows) | `holz_complete_data.json` | ✅ Ready |
| **Alu** | `Balkon-Alu-PM/alu_balkontuer_alle_profile_preismatrix.csv` (289 rows) | `Balkon-Alu-PM/alu_balkontuer_aufpreise.csv` (92 rows) | `alu_balkontuer_complete_data.json` | ✅ Ready |

---

## ✅ Conclusion & Next Steps

### What we learned:
1. **Same formula, different data** — One engine handles all manufacturers
2. **All surcharges are additive EUR** — No manufacturer uses percentage-based surcharges
3. **Discount factor is universal (0.6)** — Configurable per request, but default is 40% off for all
4. **No additional datasets needed** — All 4 manufacturer datasets are already fully extracted

### What to do next (Phase 2 Steps 2–4):
1. **Extend `basePrices.js`** — Add Gealan/Holz/Alu price matrices (per-profile lookup)
2. **Extend `surcharges.js`** — Add manufacturer-specific surcharge categories
3. **Update `priceCalculator.js`** — Add `manufacturer` parameter, route to correct data
4. **Add manufacturer validation** — Ensure valid manufacturer + profile combinations
5. **Update API endpoints** — Accept `hersteller` (manufacturer) in request body
6. **Add tests** — Per-manufacturer price verification tests

### Data collection status:
- ❌ No additional datasets needed for calculation analysis
- ✅ All extracted data is sufficient to implement multi-manufacturer pricing
