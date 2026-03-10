# CEO Data Checklist — What We Need to Build the Full Pricing Engine

> **Last Updated:** March 10, 2026
> **Status:** Active — waiting for catalog data from CEO

---

## Quick Summary

We have analyzed all existing datasets and can confirm:
- **Universal formula** works across ALL manufacturers (same 10-step calculation)
- **Surcharges are manufacturer-specific** (same option = different price per manufacturer)
- **Discount factor is 0.60 for ALL** manufacturers analyzed so far (40% off list price)
- We have **complete data for 6 product/manufacturer combos**, partial for 1, and **need data for ~30+ more**

---

## SECTION 1: What Data We Already Have ✅

| # | Product | Manufacturer | Material | Base Prices | Surcharges | Size Matrix | Status |
|---|---------|-------------|----------|-------------|-----------|-------------|--------|
| 1 | Fenster (Window) | Drutex | PVC/Kunststoff | ✅ 140 points | ✅ 9 categories | ✅ 600-1500mm W × 450-1750mm H | **INTEGRATED** |
| 2 | Fenster (Window) | Gealan | PVC/Kunststoff | ✅ Per-profile | ✅ 22 categories | ✅ ~400-2000mm | **Ready** |
| 3 | Fenster (Window) | Drutex | Holz (Wood) | ✅ 378 points | ✅ 25 categories | ✅ 330-1500mm W × 350-2400mm H | **Ready** |
| 4 | Balkontür (Balcony Door) | Aluprof | Aluminium | ✅ 288 points | ✅ 27 categories | ✅ 440-1200mm W × 1700-2400mm H | **Ready** |
| 5 | Haustür (Front Door) | Drutex | PVC/Kunststoff | ✅ Formula-based | ✅ Full | ✅ Linear formula | **Ready** |
| 6 | Rollladen (Roller Shutter) | Drutex | Generic | ✅ Additive | ✅ Full | ✅ Per-model | **Ready** |
| 7 | PSK (Terrace Sliding Door) | Drutex | PVC/Kunststoff | ⚠️ Partial | ⚠️ Partial | ⚠️ Anomalies | **PARTIAL** |

---

## SECTION 2: Exactly What the CEO Must Provide

### 2A. FENSTER (Windows) — Typically 3-6 Manufacturers × 3-6 Materials

**We have:** Drutex PVC, Gealan PVC, Drutex Holz (3 combos)
**We need catalogs for each remaining manufacturer × material combo:**

| Manufacturer | PVC/Kunststoff | Holz (Wood) | Holz-Alu | Kunststoff-Alu | Alu |
|-------------|:-:|:-:|:-:|:-:|:-:|
| **Drutex** | ✅ HAVE | ✅ HAVE | ❌ NEED | ❌ NEED | ❌ NEED |
| **Gealan** | ✅ HAVE | — | — | — | — |
| **Salamander** | ❌ NEED | — | — | — | — |
| **VEKA** | ❌ NEED | — | — | — | — |
| **Rehau** | ❌ NEED | — | — | — | — |
| **Schüco** | — | — | ❌ NEED | ❌ NEED | ❌ NEED |
| **Aluplast** | ❌ NEED | — | — | — | — |
| **Other** | ❌ NEED | ❌ NEED | ❌ NEED | ❌ NEED | ❌ NEED |

> **For each combo above, we need:**
> 1. **Base Price Catalog** (Preisempfehlung) — price per size, per profile/system
> 2. **Profile/System List** — which profiles are offered (e.g., S8000, S9000) with price differences
> 3. **Surcharge Catalog** (Aufpreise) — every option with its fixed EUR price
> 4. **Size Range** — min/max width and height supported
> 5. **Discount Factor** — what % off list price (we expect 0.60 = 40% off for all)

### 2B. HAUSTÜREN (Front Doors) — Typically 1-4 Manufacturers × 2-4 Materials

**We have:** Drutex PVC (1 combo)
**We need:**

| Manufacturer | PVC/Kunststoff | Holz (Wood) | Aluminium | Holz-Alu |
|-------------|:-:|:-:|:-:|:-:|
| **Drutex** | ✅ HAVE | ❌ NEED | ❌ NEED | — |
| **Schüco** | — | — | ❌ NEED | — |
| **Hörmann** | ❌ NEED | ❌ NEED | ❌ NEED | — |
| **Other** | ❌ NEED | ❌ NEED | ❌ NEED | ❌ NEED |

> **For each door combo, we need:**
> 1. **Model Catalog** — all available door models with base prices
> 2. **Profile/System List** — e.g., Iglo 5, Iglo Energy, etc.
> 3. **Surcharge Catalog** — colors, glazing, security, handles, electronic access
> 4. **Size Options** — available dimensions (doors may have fixed sizes)
> 5. **Discount Factor** — typically 0.60

### 2C. BALKONTÜREN (Balcony Doors) — Typically 1-4 Manufacturers × 3-5 Materials

**We have:** Aluprof Aluminium (1 combo)
**We need:**

| Manufacturer | PVC/Kunststoff | Holz (Wood) | Aluminium | Holz-Alu | Kunststoff-Alu |
|-------------|:-:|:-:|:-:|:-:|:-:|
| **Aluprof** | — | — | ✅ HAVE | — | — |
| **Drutex** | ❌ NEED | ❌ NEED | — | — | ❌ NEED |
| **Schüco** | — | — | ❌ NEED | ❌ NEED | — |
| **Other** | ❌ NEED | ❌ NEED | ❌ NEED | ❌ NEED | ❌ NEED |

> **Same data needed as Haustüren (model catalog, profiles, surcharges, sizes, discount)**

### 2D. TERRASSENTÜREN / PSK / HST / Smart-Slide — Typically 1-3 Manufacturers

**We have:** Drutex PSK ⚠️ PARTIAL
**We need COMPLETE:**

| Type | Manufacturer | Status |
|------|-------------|--------|
| PSK (Parallel-Schiebe-Kipp) | Drutex | ⚠️ PARTIAL — need full surcharge catalog |
| PSK | Other manufacturers | ❌ NEED |
| HST (Hebe-Schiebe-Tür) | All manufacturers | ❌ NEED |
| Smart-Slide | All manufacturers | ❌ NEED |
| Falt-Schiebe-Tür | All manufacturers | ❌ NEED |

### 2E. ROLLLADEN / SONNENSCHUTZ — Typically 1-3 Manufacturers

**We have:** Drutex Rollladen (1 combo — integrated)
**We need:**

| Type | Status |
|------|--------|
| Aufsatzrollladen (integrated) | ✅ HAVE (Drutex) |
| Vorsatzrollladen (external mount) | ❌ NEED |
| Raffstore (external blinds) | ❌ NEED |
| Insect screens (standalone) | ❌ NEED (have as option only) |

> **For each roller shutter type, we need:**
> 1. **Model List** — variants (with/without revision, with/without insect screen)
> 2. **Drive Options** — manual, electric, smart home prices
> 3. **Size Pricing** — how price changes with width × height
> 4. **Color Options** with prices

---

## SECTION 3: Calculation Structure — What's the Same Across ALL Manufacturers

### ✅ CONFIRMED SAME FOR ALL (Proven with 4 Manufacturers)

| Aspect | Detail | Confidence |
|--------|--------|------------|
| **Master Formula** | `angebotspreis = (base_price + surcharges) × discount_factor` | 100% — verified across all 4 |
| **Discount Factor** | 0.60 (40% off Preisempfehlung) for ALL | 100% — identical across Drutex, Gealan, Holz, Alu |
| **Surcharge Method** | Additive fixed EUR amounts (not percentages) | 100% — all surcharges are fixed € |
| **Surcharge Independence** | Surcharges do NOT depend on window size | 100% — same €6.44 for Anthrazit regardless of 500mm or 2000mm |
| **VAT** | Always 19% MwSt added at end | 100% |
| **Preisempfehlung** | Always = base_price + all_surcharges | 100% |
| **Ersparnis** | Always = Preisempfehlung × 0.40 | 100% |

### ✅ CONFIRMED SAME STRUCTURE, DIFFERENT VALUES

| Aspect | Same | Different |
|--------|------|-----------|
| **Base Price Lookup** | All use dimension-based pricing | Matrix sizes differ (7×9 to 21×21) |
| **Profile Systems** | All have 3-6 profiles per manufacturer | Profile names, multipliers, price gaps differ |
| **Color Surcharges** | All offer RAL colors + foil colors | Price differs: Anthrazit = €6.44 (Gealan) vs €43.68 (Drutex) vs €69.88 (Alu) vs €80.50 (Holz) |
| **Glazing Surcharges** | All offer 2-fach and 3-fach glass | Price differs: 3-fach Premium = €4.76 (Gealan) vs €39.81 (Alu) |
| **Security Options** | All offer RC1/RC2 security | Prices vary per manufacturer |
| **Opening Types** | All offer Dreh, Kipp, Dreh-Kipp | Some manufacturers charge extra, some include |
| **Surcharge Categories** | Same concept: option → fixed EUR | Count differs: 9 (Drutex) to 28 (Alu) categories |

### ❌ CONFIRMED DIFFERENT Between Manufacturers

| Aspect | How It Differs |
|--------|---------------|
| **Surcharge Prices** | EVERY manufacturer has DIFFERENT prices for the same option name |
| **Surcharge Count** | Drutex: 9 categories, Gealan: 22, Holz: 25, Alu: 28 |
| **Profile Multiplier Method** | Drutex: multiplicative (×0.95-1.29), Others: absolute per-profile price matrix |
| **Dimension Range** | Each manufacturer supports different min/max sizes |
| **Dimension Step Size** | Drutex: 100mm steps, Holz: irregular steps (330,530,680...) |
| **Product-Specific Logic** | Haustüren: width-dominant pricing (+23× height), Fenster: balanced W×H |

### ❓ UNKNOWN — Need More Data to Confirm

| Question | Current Knowledge | Need |
|----------|-------------------|------|
| Is discount factor ALWAYS 0.60? | Yes for all 4 analyzed | Confirm with CEO for new manufacturers |
| Do Holz-Alu windows use same formula? | Unknown | Need first Holz-Alu dataset |
| Are Schüco surcharges additive EUR too? | Assume yes | Confirm with first Schüco catalog |
| Do non-Drutex doors use formula-based pricing? | Unknown | Need second door manufacturer |
| Is Rollladen pricing universal? | Only have Drutex data | Need second Rollladen manufacturer |

---

## SECTION 4: Size/Price Calculation — Deep Dive

### How Size Pricing Works (Three Methods Found)

#### Method 1: 2D Matrix Lookup (Most Common — Windows, Balcony Doors)
```
Used by: Drutex Fenster, Holz Fenster, Alu Balkontür

price = matrix[width_index][height_index]

Example (Drutex Fenster):
  Width steps:  600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500 (10 steps)
  Height steps: 450, 550, 650, 750, 850, 950, 1050, 1150, 1250, 1350, 1450, 1550, 1650, 1750 (14 steps)
  Total:        140 price points per profile
  
  Then apply profile multiplier:
    final_base = matrix_price × profile_multiplier
```

**Key differences between manufacturers:**

| Manufacturer | Width Range | Height Range | Steps | Points per Profile |
|-------------|------------|-------------|-------|-------------------|
| Drutex PVC | 600-1500mm | 450-1750mm | 10×14 | 140 |
| Gealan PVC | ~400-2000mm | ~400-2000mm | ~15×15 | ~225 |
| Holz | 330-1500mm | 350-2400mm | 7×9 | 63 |
| Alu Balkontür | 440-1200mm | 1700-2400mm | 9×8 | 72 |

**Between-step interpolation:** Currently using nearest step (round to closest). May need linear interpolation for custom sizes.

#### Method 2: Formula-Based (Doors)
```
Used by: Drutex Haustür

price = base_price + (width_surcharge × width_factor) + (height_surcharge × height_factor) + model_surcharge

Example:
  Base: €1,277.75
  Width: +€37.77 per 100mm over standard
  Height: +€1.64 per 100mm over standard (23× less than width!)
  Model tier: m1=€0, m2-3=+€75.36, m4-10=+€361.37
```

**IMPORTANT:** Door pricing is WIDTH-DOMINANT (opposite of windows where width and height are balanced)

#### Method 3: Additive Components (Roller Shutters)
```
Used by: Drutex Rollladen

price = grundpreis + component1 + component2 + ... + component6

Components:
  - Revision type pricing
  - Insect screen option
  - Drive type (manual/electric/smart)
  - Kastenhoehe (box height) — changes entire price table
```

### Does Size Pricing Differ Per Manufacturer and Material?

**YES — Each manufacturer has its own size/price matrix.** The structure is the same (lookup base price by size), but:
- Different dimension ranges supported
- Different number of price points
- Different actual prices at each size
- Different step sizes (some irregular)

**NO — The FORMULA is always the same:** `base_price_at_size + surcharges = preisempfehlung × 0.60`

### Can We Get Size Pricing from Drutex Site?

We ALREADY extracted Drutex pricing from their configurator API. The datasets in `datasets/drutex-kunststoff-fenster/` were captured from the Drutex online konfigurator. For other manufacturers, we would need similar data extraction or the CEO's wholesale catalogs.

---

## SECTION 5: Exact Format We Need for Each Catalog

When the CEO provides catalogs, we need to extract the following for EACH manufacturer × material × product combo:

### 5A. Base Price Data (Required)
```
Format needed per manufacturer:
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
        "600x600": 105.20,
        "700x700": 122.80,
        ...more size×price entries...
      }
    }
  ]
}
```

### 5B. Surcharge Catalog (Required)
```
Format needed per manufacturer:
{
  "manufacturer": "Salamander",
  "surcharges": {
    "verglasung": [
      { "name": "2-fach Standard", "price": 0.00 },
      { "name": "3-fach Premium", "price": 12.50 }
    ],
    "aussenfarbe": [
      { "name": "Weiß", "price": 0.00 },
      { "name": "Anthrazit", "price": 35.00 },
      { "name": "Mooreiche", "price": 85.00 }
    ],
    ...more categories...
  }
}
```

### 5C. Discount/Margin Info (Required)
```
- Einkaufspreis (our purchase price) OR
- Discount factor (e.g., 0.60 = we pay 60% of list price)
- Any volume discount tiers
```

### 5D. Optional but Helpful
```
- Min/Max dimensions per product
- Available color RAL codes
- Glass specification options (Ug values)
- Security rating options (RC1, RC2, etc.)
- Any product-specific options unique to this manufacturer
```

---

## SECTION 6: Priority Order for Data Collection

### Phase 1 — Build Engine for Most Popular Products (Highest Priority)

| Priority | Product × Manufacturer | Why |
|----------|----------------------|-----|
| **P1** | ✅ Fenster × Drutex PVC | DONE — already integrated |
| **P2** | Fenster × Gealan PVC | Ready — just needs coding |
| **P3** | Fenster × Holz (Drutex) | Ready — just needs coding |
| **P4** | Balkontür × Alu (Aluprof) | Ready — just needs coding |
| **P5** | Haustür × Drutex PVC | Ready — just needs coding |
| **P6** | Rollladen × Drutex | Ready — just needs coding |

### Phase 2 — Expand to Additional Manufacturers (High Priority)

| Priority | What We Need | Expected Data |
|----------|-------------|---------------|
| **P7** | Fenster × Salamander PVC | Price matrix + surcharges |
| **P8** | Fenster × VEKA PVC | Price matrix + surcharges |
| **P9** | Fenster × Rehau PVC | Price matrix + surcharges |
| **P10** | Balkontür × Drutex PVC | Price matrix + surcharges |
| **P11** | Haustür × Second manufacturer | Price formula/matrix + surcharges |

### Phase 3 — Premium Materials (Medium Priority)

| Priority | What We Need |
|----------|-------------|
| **P12** | Fenster × Holz-Alu (any manufacturer) |
| **P13** | Fenster × Kunststoff-Alu (any manufacturer) |
| **P14** | Fenster × Alu (Schüco or similar) |
| **P15** | Haustür × Aluminium |
| **P16** | Balkontür × Holz-Alu |

### Phase 4 — Remaining Products (Lower Priority)

| Priority | What We Need |
|----------|-------------|
| **P17** | PSK complete surcharge catalog |
| **P18** | HST (Hebe-Schiebe-Tür) — any manufacturer |
| **P19** | Vorsatzrollladen catalog |
| **P20** | Raffstore catalog |
| **P21** | Smart-Slide doors |

---

## SECTION 7: Summary of What We Know vs What We Need

### ✅ We KNOW (Confirmed Facts):
1. **Same formula everywhere:** `(base + surcharges) × 0.60 = price`
2. **Surcharges are fixed EUR** amounts per option, NOT percentages
3. **Surcharges do NOT change with size** — same €6.44 for Anthrazit on 500mm or 2000mm window
4. **Each manufacturer has its OWN surcharge prices** — cannot reuse between manufacturers
5. **Discount factor is 0.60** across all analyzed manufacturers (40% off list)
6. **Three pricing architectures exist:** Matrix (windows), Formula (doors), Additive (shutters)
7. **Profile multipliers vary:** Drutex uses ×multiplier, others use separate price tables per profile

### ❌ We NEED (Data Gaps):
1. **Catalogs for additional PVC manufacturers** (Salamander, VEKA, Rehau, Aluplast, Schüco)
2. **Catalogs for Holz-Alu and Kunststoff-Alu** windows (any manufacturer)
3. **Additional door manufacturers** beyond Drutex
4. **Additional balcony door manufacturers** beyond Aluprof
5. **Complete PSK data** and other terrace door types
6. **Confirm discount factor** is 0.60 for ALL new manufacturers
7. **Our purchase price or margin** for each manufacturer (to calculate website selling price)
8. **Vorsatzrollladen and Raffstore** catalogs

### 🔑 Critical Question for CEO:
**What is our margin on top of the Angebotspreis (60% of list)?**
- The Angebotspreis (offer price) = what the customer sees as "discounted"
- We need to know: Do we sell at Angebotspreis, or do we add our own margin?
- If we add margin: What percentage? Same for all products or different per category?

---

## SECTION 8: Quick Reference — Catalog Data Per Product Type

### For Each FENSTER (Window) Manufacturer Catalog, We Need:
- [ ] Profile systems list (3-6 systems with names and Uw values)
- [ ] Base price per profile per size (matrix of width × height prices)
- [ ] Verglasung options + prices (glazing types)
- [ ] Außenfarbe options + prices (exterior colors)
- [ ] Innenfarbe options + prices (interior colors)
- [ ] Sicherheitsverglasung options + prices (security glass)
- [ ] Sprossen options + prices (muntins/grilles)
- [ ] Schallschutz options + prices (sound insulation)
- [ ] Griff options + prices (handles)
- [ ] Öffnungsart options + prices (opening types)
- [ ] Ornamentglas options + prices
- [ ] Any manufacturer-specific extras

### For Each HAUSTÜR (Front Door) Manufacturer Catalog, We Need:
- [ ] Model list with base prices (grouped by tier if applicable)
- [ ] Profile systems + price differences
- [ ] Size pricing formula or matrix
- [ ] Color options + prices (exterior and interior separately)
- [ ] Glazing options + prices
- [ ] Security options + prices (RC2, electronic access, etc.)
- [ ] Handle options + prices
- [ ] Threshold options + prices

### For Each BALKONTÜR (Balcony Door) Manufacturer Catalog, We Need:
- [ ] Profile systems with thermal ratings
- [ ] Base price per profile per size
- [ ] All surcharge options (same categories as windows + door-specific)
- [ ] Opening direction options

### For Each ROLLLADEN Manufacturer Catalog, We Need:
- [ ] Variant list (revision type, insect screen options)
- [ ] Drive options + prices (manual, electric, smart)
- [ ] Size-based pricing table
- [ ] Color options + prices
- [ ] Kastenhoehe options (box height)
