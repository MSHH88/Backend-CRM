# Pricing Engine — Complete Data Requirements & Gap Analysis

> **Date:** March 10, 2026  
> **Purpose:** Answer what data we have, what we need, and what the CEO must provide from manufacturer catalogs to build the full pricing engine.

---

## 🔑 EXECUTIVE SUMMARY — ANSWERS TO YOUR QUESTIONS

### Q: What data do we need for the full pricing engine?
**For EACH manufacturer × product type combination, we need:**
1. **Base price matrix** (width × height → EUR price) per profile
2. **Surcharge catalog** (every option with its fixed EUR amount)
3. **Profile list** (available profiles + their multipliers or separate matrices)
4. **Dimension limits** (min/max width and height in mm)
5. **Available options list** (which options are available per product type)

### Q: Do we have data for Doors (balcony and normal)?
**YES — partially:**
| Product | Manufacturer | Data? | Status |
|---------|-------------|-------|--------|
| **Haustüren (Entrance Doors)** | Drutex PVC | ✅ COMPLETE | Full price formula, 25 models, all surcharges |
| **Balkontüren (Balcony Doors)** | Alu (MB-profiles) | ✅ COMPLETE | Full price matrix, 4 profiles, surcharges |
| **Terassentüren (PSK)** | Drutex PVC | ⚠️ PARTIAL | Width/height pricing + profiles, but incomplete surcharges |
| **Haustüren** | Other manufacturers | ❌ MISSING | Need from CEO catalogs |
| **Balkontüren** | PVC/Holz manufacturers | ❌ MISSING | Need from CEO catalogs |

### Q: Do we have enough data to know which surcharges are the same vs different?
**YES — and the answer is clear: surcharges are MANUFACTURER-SPECIFIC.**
- Same option "Anthrazit color": Gealan €6.44 vs Drutex €43.68 vs Alu €69.88 vs Holz €80.50
- Same material (PVC) does NOT mean same surcharges
- Each manufacturer has its own fixed EUR surcharge catalog
- Full comparison in `docs/SURCHARGE_ANALYSIS.md`

### Q: Do we have data for how size pricing works? Do sizes differ by manufacturer/material?
**YES — we have size pricing data. Key findings:**
- Size pricing uses a **2D matrix** (width × height) — same concept for ALL manufacturers
- The **matrix values differ** per manufacturer and material (different EUR amounts)
- The **matrix dimensions differ** (some have finer steps, some coarser)
- Drutex uses a single matrix × profile multiplier; others use separate matrix per profile
- **We CAN build a size pricing engine from existing data** — no need for external sources
- See [Size Pricing Details](#-size-pricing-analysis) below

### Q: Can we get size pricing from the Drutex site or do we already have the data?
**We already have the data.** For Drutex windows we have 140 price points (600–1500mm × 450–1750mm). For other manufacturers we have complete matrices from their configurators. No external scraping needed — the extracted datasets are sufficient.

---

## 📦 WHAT WE HAVE — Complete Inventory

### Product Type Coverage

| Product Type | Manufacturer | Material | Base Prices | Surcharges | Size Matrix | Status |
|---|---|---|---|---|---|---|
| **Fenster** | Drutex | PVC | ✅ 441 cells per profile | ✅ 9 categories, ~60 options | ✅ 400–2400mm | ✅ INTEGRATED in code |
| **Fenster** | Gealan | PVC | ✅ 225 cells per profile | ✅ 22 categories, ~80 options | ✅ 400–2000mm | ✅ Ready to integrate |
| **Fenster** | Holz | Holz | ✅ 63 cells per profile | ✅ 25 categories, ~100 options | ✅ 330–1500mm × 350–2400mm | ✅ Ready to integrate |
| **Balkontür** | Alu | Alu | ✅ ~36 cells per profile | ✅ 28 categories, ~90 options | ✅ 440–1200mm × 1700–2400mm | ✅ Ready to integrate |
| **Haustür** | Drutex | PVC | ✅ Width/height formula | ✅ 8+ categories, 25 models | ✅ 700–1200mm × 1800–2400mm | ✅ Ready to integrate |
| **Rollladen** | Generic | — | ✅ Dimension-based | ✅ 6 components | ✅ 750–2500mm × 500–1700mm | ✅ Ready to integrate |
| **PSK (Terassentür)** | Drutex | PVC | ⚠️ Width/height data | ⚠️ Profiles + openings | ⚠️ 1200–3100mm × 1800–2500mm | ⚠️ PARTIAL |

### Dataset Files

| File | Location | Lines | Content |
|---|---|---|---|
| `drutex_kunststoff_surcharges_full.json` | datasets/drutex-kunststoff-fenster/ | 350 | Full Drutex PVC surcharge catalog |
| `drutex_kunststoff_options.json` | datasets/drutex-kunststoff-fenster/ | 524 | All Drutex options |
| `fenster_10cm_prices.json` | datasets/drutex-kunststoff-fenster/ | 981 | Drutex 10cm-step price grid |
| `haustuer_calculations.json` | datasets/drutex-kunststoff-fenster/ | 152 | Door pricing formula |
| `haustuer_deep_data.json` | datasets/drutex-kunststoff-fenster/ | 642 | 25 door models tested |
| `rollladen_calculations.json` | datasets/drutex-kunststoff-fenster/ | 102 | Roller shutter pricing |
| `psk_calculations.json` | datasets/drutex-kunststoff-fenster/ | 237 | PSK terrace door pricing |
| `gealan_pvc_complete_data.json` | Gealen-Kunstoff-PM/ | 890 | Gealan complete dataset |
| `holz_complete_data.json` | Holz-Fenster-PM/ | 1,370 | Wood window complete |
| `holz_aufpreise.json` | Holz-Fenster-PM/ | 663 | Wood surcharges detail |
| `alu_balkontuer_complete_data.json` | Balkon-Alu-PM/ | 1,175 | Alu balcony door complete |

---

## 📐 SIZE PRICING ANALYSIS

### How Size Pricing Works (ALL products use the same concept)

**Every product uses a base price matrix: width × height → EUR price.**

The matrix is looked up based on the selected dimensions. If the exact size isn't in the matrix, interpolation or rounding to nearest step is used.

### Size Pricing Per Manufacturer

| Manufacturer | Product | Width Steps | Height Steps | Matrix Type | Step Size |
|---|---|---|---|---|---|
| **Drutex PVC** | Fenster | 400–2400mm (21 steps) | 400–2400mm (21 steps) | Single matrix × profile multiplier | 100mm |
| **Gealan PVC** | Fenster | 400–2000mm (15 steps) | 400–2000mm (15 steps) | Separate matrix per profile | ~100mm |
| **Holz** | Fenster | 330–1500mm (7 steps) | 350–2400mm (9 steps) | Separate matrix per profile | Irregular (170–250mm) |
| **Alu** | Balkontür | 440–1200mm (8 steps) | 1700–2400mm (varies) | Separate matrix per profile | ~100mm |
| **Drutex PVC** | Haustür | 700–1200mm (linear) | 1800–2400mm (linear) | Formula: ~€37.77 per 100mm width | Continuous |
| **Generic** | Rollladen | 750–2500mm | 500–1700mm | Grundpreis = f(w, h, model, kastenhoehe) | ~100mm |
| **Drutex PVC** | PSK | 1200–3100mm | 1800–2500mm | Non-linear steps | ~100mm |

### Does Size Pricing Differ by Manufacturer and Material?

**YES — but the CONCEPT is the same.** Differences:
1. **Matrix dimensions** — Drutex has 21×21 cells, Holz has 7×9 cells
2. **EUR values** — completely different per manufacturer (Drutex 1000×1000 = €295.44, Holz = €250.57)
3. **Step sizes** — Drutex uses regular 100mm steps, Holz uses irregular steps (330, 500, 700, 900...)
4. **Profile handling** — Drutex multiplies a single matrix, others have separate matrices
5. **The formula is ALWAYS the same**: look up width × height in the matrix, apply surcharges

### Size Pricing Example: Same Size, Different Manufacturers

For a ~1000mm × 1000mm window (closest available):

| Manufacturer | Profile | Base Price | Note |
|---|---|---|---|
| Drutex PVC | Iglo 5 Classic | €295.44 | From multiplier matrix |
| Holz | Softline-68 Kiefer | €250.57 | Direct lookup (p1, 900×1050) |
| Gealan PVC | S8000 | ~€47.48* | *At 500×500 reference, scales up |

**Conclusion:** Size pricing is the SAME concept but with DIFFERENT data tables per manufacturer. One engine works for all — just different data.

---

## 📊 SURCHARGE STRUCTURE — What the CEO Needs to Provide

### Surcharges Are Catalog-Based (Fixed EUR Per Option)

Every surcharge is a **fixed EUR amount** from the manufacturer's price catalog. It does NOT change with window size. The CEO needs to provide the surcharge catalog for each manufacturer.

### Surcharge Categories by Product Type

#### FENSTER (Windows) — Biggest Configurator

| Category | Example Options | Drutex EUR | Gealan EUR | Holz EUR |
|---|---|---|---|---|
| **Profil** | Iglo5, S8000, Softline-68 | via multiplier | via matrix | via matrix |
| **Öffnungsrichtung** | Fest, Kipp, Dreh, DrehKipp | varies | €0–€99 | €0–€153 |
| **Außenfarbe** | Weiß, Anthrazit, RAL | €0–€105 | €0–€11 | €0–€81 |
| **Innenfarbe** | Weiß, Anthrazit, RAL | €0–€117 | €0–€19 | €0–€81 |
| **Verglasung** | 2-fach, 3-fach, Solar | €0–€100 | -€1–€15 | €0–€14 |
| **Schallschutz** | dB levels | €0–€175 | €0 | €0 |
| **Sicherheitsverglasung** | ESG, VSG | €0–€201 | €0–€7 | €0–€14 |
| **Sprossen** | Innenliegend, Aufliegend | €0–€122 | €0–€10 | €0–€12 |
| **Rollladen** | Aufsatz, Vorsatz | €0–€323 | €0–€81 | N/A |
| **Griff** | Standard, Druckknopf | €0–€54 | — | — |
| **Sicherheitsbeschläge** | RC1, RC2 | €0–€144 | — | — |
| **Rahmenverbreiterung** | 20mm, 40mm extensions | — | €0–€9 | €0–€15 |
| **Ornamentglas** | Decorative glass | €0–€114 | €0–€26 | €0–€6 |
| **+ more** | Varies per manufacturer | ... | ... | ... |

**Total categories:** Drutex=9, Gealan=22, Holz=25, Alu=28

#### HAUSTÜREN (Entrance Doors) — Drutex PVC Data Available

| Category | Options | EUR Range |
|---|---|---|
| **Profil** | p2 (base), p4 (Iglo Energy) | €0–€75 |
| **Modell** | 25 models (m1_l through m10_r) | €0–€361 (3 tiers) |
| **Farbe** | 5 tiers (Weiß to Premium) | €0–€349 |
| **Verglasung** | 6 types | -€31 to €28 |
| **Sicherheit** | RC2, Pilzkopf, Schließblech | €0–€100 |
| **Zutrittssystem** | Electronic, Fingerprint | €0–€1,142 |
| **Türband** | Hinge types | €0–€97 |

#### ROLLLADEN (Roller Shutters) — Generic Data Available

| Category | Options | EUR Range |
|---|---|---|
| **Modell** | 4 models (Revision types) | via Grundpreis |
| **Panzerfarbe** | 11 slat colors | €0–€82 |
| **Antriebsart** | 6 drive types (manual to motor) | €0–€370 |
| **Kastenfarbe** | Box color | varies |
| **Seitenblende** | Side panel | €0–€35 |
| **Putzträger** | Plaster support | €0–€35 |

#### PSK / TERASSENTÜREN — Partial Data

| Category | Options | EUR Range |
|---|---|---|
| **Profil** | 5 profiles (p1–p5) | varies |
| **Öffnungsart** | 4 types (psk_ks_fest, etc.) | varies |
| **Farbe** | Multiple tiers | varies |
| **Verglasung** | Multiple types | varies |

---

## ❌ WHAT'S MISSING — Data the CEO Must Provide

### Priority 1: Windows (Fenster) — Additional Manufacturers

For each NEW window manufacturer the CEO wants to add:

```
NEEDED PER MANUFACTURER:
├── Base price matrix (width × height → EUR) for EACH profile
├── Complete surcharge catalog:
│   ├── Every color option + EUR price
│   ├── Every glass type + EUR price
│   ├── Every security option + EUR price
│   ├── Every opening type + EUR price
│   └── Every other option + EUR price
├── Profile list (name, ID, multiplier or own matrix)
├── Dimension limits (min/max width, min/max height)
└── Discount factor (we assume 0.6 / 40% unless told otherwise)
```

**Known PVC manufacturers still missing:**
- [ ] Salamander
- [ ] Aluplast
- [ ] Rehau
- [ ] Schüco
- [ ] VEKA

**Known materials still missing for windows:**
- [ ] Kunststoff-Alu (any manufacturer)
- [ ] Holz-Alu (any manufacturer)
- [ ] Pure Alu windows (we have Alu Balkontür only)

### Priority 2: Doors — Additional Manufacturers

| Product | We Have | We Need |
|---|---|---|
| **Haustüren PVC** | ✅ Drutex | ❌ Other PVC manufacturers |
| **Haustüren Alu** | ❌ Nothing | ❌ Any Alu door manufacturer |
| **Haustüren Holz** | ❌ Nothing | ❌ Any Holz door manufacturer |
| **Balkontüren PVC** | ❌ Nothing | ❌ Any PVC balcony door manufacturer |
| **Balkontüren Alu** | ✅ Alu MB profiles | ❌ Additional manufacturers |
| **Balkontüren Holz** | ❌ Nothing | ❌ Any Holz balcony door manufacturer |
| **Nebeneingangstüren** | ❌ Nothing | ❌ All types/manufacturers |

### Priority 3: Terrace Doors & Roller Shutters

| Product | We Have | We Need |
|---|---|---|
| **PSK Terassentür** | ⚠️ Partial (Drutex) | ❌ Complete surcharge catalog + other manufacturers |
| **HST (Hebe-Schiebe-Tür)** | ❌ Nothing | ❌ All manufacturers |
| **Smart-Slide** | ❌ Nothing | ❌ All manufacturers |
| **Falt-Schiebe** | ❌ Nothing | ❌ All manufacturers |
| **Aufsatzrollladen** | ✅ Complete (generic) | ❌ Additional types/manufacturers |
| **Vorsatzrollladen** | ❌ Nothing | ❌ All manufacturers |
| **Raffstore** | ❌ Nothing | ❌ All manufacturers |

---

## 📋 WHAT THE CEO SHOULD PROVIDE (Catalog Checklist)

### For Each Manufacturer Catalog, We Need:

#### 1. Product Catalog (Grundpreise)
- [ ] Base price list for each product type (Fenster, Tür, etc.)
- [ ] Price per size grid (e.g., 500×500=€X, 600×600=€Y, etc.)
- [ ] All available profiles with their pricing
- [ ] All available models (for doors: door designs with prices)

#### 2. Surcharge/Extra Catalog (Aufpreise)
- [ ] Color catalog: all available colors with EUR surcharge each
- [ ] Glass catalog: all glass types with EUR surcharge each
- [ ] Security catalog: all security options with EUR surcharge each
- [ ] Handle catalog: all handle types with EUR surcharge each
- [ ] Accessories catalog: all extras with EUR surcharge each
- [ ] Opening types: all options with EUR surcharge each

#### 3. Size/Dimension Information
- [ ] Minimum and maximum dimensions per product type
- [ ] Available size steps (e.g., every 100mm or custom)
- [ ] How dimension pricing scales (we can derive this from the price matrix)

#### 4. Discount Structure
- [ ] Standard discount percentage (we assume 40% unless told otherwise)
- [ ] Any volume discounts
- [ ] Any special pricing tiers

### Ideal Format for Catalog Data

The easiest format for us to process:

```
OPTION: Surcharge Catalog (CSV format)
category,option_id,option_name,eur_price
Außenfarbe,f01,Weiß,0.00
Außenfarbe,f02,Anthrazit,43.68
Außenfarbe,f03,Mahagoni,43.68
Verglasung,g01,2-fach Standard,0.00
Verglasung,g02,3-fach Wärme,39.81
...etc
```

```
OPTION: Price Matrix (CSV format)
profile,width,height,base_price
p1,400,400,114.00
p1,500,400,125.50
p1,500,500,135.00
...etc
```

**Alternative:** PDF/Excel catalogs from manufacturers work too — we can extract the data.

---

## 🔧 CAN WE BUILD THE ENGINE WITH CURRENT DATA?

### YES — For These Products/Manufacturers:

| Product | Can Build Now | Coverage |
|---|---|---|
| **Fenster Drutex PVC** | ✅ YES | Already integrated in code |
| **Fenster Gealan PVC** | ✅ YES | Data ready, needs code integration |
| **Fenster Holz** | ✅ YES | Data ready, needs code integration |
| **Balkontür Alu** | ✅ YES | Data ready, needs code integration |
| **Haustür Drutex PVC** | ✅ YES | Data ready, needs code integration |
| **Rollladen** | ✅ YES | Data ready, needs code integration |

### PARTIALLY — Needs Completion:

| Product | What's Missing |
|---|---|
| **PSK Terassentür** | Complete surcharge catalog; some price data seems corrupted (€73.91 for 3100mm width) |

### CANNOT BUILD — No Data Yet:

| Product | What the CEO Needs to Provide |
|---|---|
| **Fenster** (Salamander, VEKA, Rehau, etc.) | Full catalog per manufacturer |
| **Haustüren** (Alu, Holz manufacturers) | Full catalog per manufacturer |
| **Balkontüren** (PVC, Holz manufacturers) | Full catalog per manufacturer |
| **HST, Smart-Slide, Falt-Schiebe** | Full catalog per type + manufacturer |
| **Nebeneingangstüren** | Full catalog per manufacturer |
| **Vorsatzrollladen, Raffstore** | Full catalog per type |

---

## 🏗️ ENGINE ARCHITECTURE — How It All Fits Together

### One Engine, Multiple Data Tables

```
pricing_engine.calculate({
  product_type: "fenster",        // fenster | haustuer | balkontuer | psk | rollladen
  manufacturer: "drutex",         // drutex | gealan | holz | alu | ...
  material: "pvc",                // pvc | holz | alu | holz-alu | ...
  profile: "p1",                  // Manufacturer-specific profile ID
  width: 1000,                    // mm
  height: 1000,                   // mm
  options: {
    aussenfarbe: "anthrazit",     // Option IDs from surcharge catalog
    verglasung: "3fach_premium",
    sicherheit: "rc2",
    // ...more options
  },
  discount_factor: 0.6,           // Custom margin (default 0.6 = 40% off)
  quantity: 1
})

// Returns:
{
  grundpreis: 295.44,             // From size matrix
  surcharges_total: 183.49,       // Sum of all selected surcharges
  preisempfehlung: 478.93,        // grundpreis + surcharges
  angebotspreis: 287.36,          // preisempfehlung × discount_factor
  surcharges_breakdown: [...]      // Itemized surcharges
}
```

### Data Structure Per Manufacturer

```
data/
├── manufacturers/
│   ├── drutex_pvc/
│   │   ├── fenster/
│   │   │   ├── basePrices.js        // Price matrix (width × height)
│   │   │   ├── surcharges.js        // Surcharge catalog
│   │   │   └── profiles.js          // Profile multipliers
│   │   ├── haustuer/
│   │   │   ├── basePrices.js
│   │   │   ├── surcharges.js
│   │   │   └── models.js            // Door model catalog
│   │   └── psk/
│   │       └── ...
│   ├── gealan_pvc/
│   │   └── fenster/
│   │       ├── basePrices.js        // Separate matrix per profile
│   │       └── surcharges.js
│   ├── holz/
│   │   └── fenster/
│   │       ├── basePrices.js
│   │       └── surcharges.js
│   └── alu/
│       └── balkontuer/
│           ├── basePrices.js
│           └── surcharges.js
└── rollladen/
    ├── basePrices.js
    └── surcharges.js
```

---

## ✅ SUMMARY — Action Items

### What We Know:
1. ✅ **Same formula for all** — `base_price + surcharges = preisempfehlung × 0.6 = angebotspreis`
2. ✅ **Surcharges are manufacturer-specific** — Drutex PVC ≠ Gealan PVC
3. ✅ **Surcharges are catalog-based** — Fixed EUR per option, not size-dependent
4. ✅ **Size pricing uses matrices** — Same concept but different data per manufacturer
5. ✅ **We have enough data for 6 product/manufacturer combinations** to build the engine now
6. ✅ **Different product types (Türen, Rolladen, etc.) have different surcharge catalogs**

### What the CEO Needs to Provide:
1. 📋 **Manufacturer price catalogs** (Grundpreislisten) for each new manufacturer
2. 📋 **Surcharge/extra catalogs** (Aufpreislisten) for each new manufacturer
3. 📋 **Door design catalogs** with model prices for each door manufacturer
4. 📋 **Complete PSK data** to finish terrace door support
5. 📋 **Any additional product types** (HST, Smart-Slide, etc.)

### Next Engineering Steps:
1. 🔧 Integrate Gealan PVC, Holz, and Alu data into the pricing engine
2. 🔧 Add manufacturer routing (`manufacturer` parameter in API)
3. 🔧 Add Haustür and Rollladen as product types
4. 🔧 Build admin interface for loading new manufacturer catalogs
5. 🔧 Add margin/markup configuration per product per manufacturer
