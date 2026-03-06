# Drutex Kunststoff Fenster — Complete Dataset

These files contain ALL data collected from the live fenstermaxx24.com configurator,
copied from the SUBPAGES-FenTuRo repository (Backend and copilot/analyse-previous-sessions branches).
The processed runtime versions live in `src/data/` and `src/engine/`.

## Source
- **Repository:** github.com/MSHH88/SUBPAGES-FenTuRo
- **Branches:** `Backend` (data files), `copilot/analyse-previous-sessions` (checklists + HTML)
- **Captured:** 2026-03-02/03

## Core Pricing Data (Used by Engine)

| File | Description |
|------|-------------|
| `base_prices.csv` | 21×21 Grundpreis matrix (400–2400mm, 100mm steps) for Iglo 5 Classic (p1) — processed in `src/data/basePrices.js` |
| `drutex_kunststoff_base_prices.csv` | Original 14×14 Preisempfehlung + Angebotspreis + Grundpreis matrices from live site |
| `profile_multipliers.json` | 6 Drutex Iglo profiles with multipliers — processed in `src/data/profileMultipliers.js` |
| `surcharges.json` | Simplified 9-category surcharge data — processed in `src/data/surcharges.js` |
| `drutex_kunststoff_surcharges_full.json` | Full original surcharges with metadata (200+ values, 9 categories) |
| `drutex_kunststoff_options.json` | All 85 configuration properties with allowed values |
| `obj_konfig_schema.json` | Default obj_konfig object (all 85 properties with default values) |

## API & Communication Protocol

| File | Description |
|------|-------------|
| `api_endpoints.json` | All 6 API endpoints: berechnen, addWarenkorb, minmax, minmaxrollladen, getInfo, setExternTOSession |
| `postmessage_protocol.json` | iframe↔parent PostMessage protocol (addWarenkorb, do_continue, do_restart) |

## Business Logic & Rules

| File | Description |
|------|-------------|
| `drutex_kunststoff_rules.js` | Original rules.js (2870 lines, 113KB) — option dependencies, validation, UI state |
| `Backend_Setup_Konfigurator_Technical_Specification.md` | Full technical specification for building the engine |

## Fine-Grained Price Data (10cm Increments)

| File | Description |
|------|-------------|
| `fenster_10cm_prices.csv` | 10×14 matrix of Preisempfehlung at 10cm increments (600-1500mm × 450-1750mm) |
| `fenster_10cm_prices.json` | Same data as JSON array with width/height/preisempfehlung/angebotspreis |

## Product Comparison Data

| File | Description |
|------|-------------|
| `comparison_results.json` | Quick structure verification of 36 products (same API pattern confirmed) |
| `deep_comparison_results.json` | Deep comparison: Balkontüren, Haustüren, PSK, Rollläden vs Fenster baseline |
| `deep_comparison.py` | Python script used to collect comparison data from live API |

## Other Product Calculations

| File | Description |
|------|-------------|
| `haustuer_calculations.json` | Haustüren pricing analysis: dimension formula, profiles, models, colors, security, access systems |
| `haustuer_deep_data.json` | Raw API test data for Haustüren (dimensions, profiles, models, colors, glass, security) |
| `psk_calculations.json` | PSK door pricing: width/height analysis, profiles, opening types, colors, glass |
| `rollladen_calculations.json` | Aufsatzrollläden: separate module, 6-line price breakdown, models, drives, panel colors |

## Checklists & Planning

| File | Description |
|------|-------------|
| `MASTER_DATA_COLLECTION_CHECKLIST.md` | Complete data collection template (Part A: detailed, Part B: quick verify) |
| `KONFIGURATOR_COMPARISON_CHECKLIST.md` | Template for comparing configurator structures across products |

## Price Calculation Formula

```
STEP 1: grundpreis       = BasePriceMatrix[width][height]       (p1 basis)
STEP 2: profileAdjusted  = grundpreis × profileMultiplier
STEP 3: surchargesTotal  = sum of all selected option surcharges
STEP 4: preisempfehlung  = profileAdjusted + surchargesTotal    (RRP)
STEP 5: ersparnis        = preisempfehlung × 0.40               (savings)
STEP 6: angebotspreis    = preisempfehlung × 0.60               (offer price)
```

## Profile Multipliers

| ID | Name | Multiplier | 1000×1000 Price |
|----|------|------------|-----------------|
| p1 | Iglo 5 Classic | 1.0000 | €295.44 |
| p2 | Iglo 5 | 1.0000 | €295.44 |
| p3 | Iglo Energy Classic | 1.2601 | €372.27 |
| p4 | Iglo Energy | 1.2601 | €372.27 |
| p5 | Iglo Light | 0.9532 | €281.60 |
| p7 | Iglo EXT | 1.2886 | €380.72 |

## Product Module Strategy

| Product | Strategy | Key Insight |
|---------|----------|-------------|
| All Kunststoff Fenster | **REUSE** | Same API, same obj_konfig, different price tables per manufacturer |
| Balkontüren | **REUSE** | Same engine, different dimension constraints |
| Haustüren | **EXTEND** | Width 23× more impactful than height, 3 model tiers, electronic access (€912-1142) |
| PSK Doors | **EXTEND** | Different opening types, flat price zones for width 1200-1700mm |
| HST Doors | **EXTEND** | Similar to PSK |
| Rollläden | **SEPARATE** | Server-side session state, 6-line price breakdown, individual AJAX per option |

All 36 products compared showed the **same iframe/API structure**, meaning one
unified backend with manufacturer-specific price tables will work for most products.
