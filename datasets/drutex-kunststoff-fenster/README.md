# Drutex Kunststoff Fenster — Reference Datasets

These files contain the raw reference data for Drutex Kunststoff (PVC) windows,
extracted from the live fenstermaxx24.com configurator. The processed versions
live in `src/data/` and are used by the pricing engine at runtime.

## Files

| File | Description | Source |
|------|-------------|--------|
| `base_prices.csv` | 21×21 price matrix (400–2400 mm, 100 mm steps) for Iglo 5 Classic (p1) | Extracted from live site; processed in `src/data/basePrices.js` |
| `profile_multipliers.json` | 6 Drutex Iglo profiles with price multipliers | Verified against live site |
| `surcharges.json` | All 9 surcharge categories (colors, glass, handles, security, etc.) | Verified against live site |

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

## Surcharge Categories

| Category | Options | Range |
|----------|---------|-------|
| Exterior Color | 22 options | €0 – €104.64 |
| Interior Color | 22 options | €0 – €104.64 |
| Glass | 6 types | -€15.05 – €99.98 |
| Sound Protection | 4 levels | €0 – €78.00 |
| Security Glass | 3 types | €0 – €58.00 |
| Handle | 3 types | €0 – €45.00 |
| Security | 4 levels | €0 – €178.00 |
| Sprossen | 4 types | €0 – €95.00 |
| V-Perfect | 2 options | €0 – €29.00 |

## Other Product Data (Not Yet in Datasets)

The following data was collected in the SUBPAGES-FenTuRo repo (now inaccessible)
and documented in the Backend Development Plan:

- **Gealan PVC** — Profile multipliers extracted, base prices need collection
- **Aluplast PVC** — Profile multipliers extracted
- **Salamander PVC** — Profile multipliers extracted
- **Veka PVC** — Profile multipliers extracted
- **Schüco** — Profile multipliers extracted
- **Haustüren** — Different dimension formula (width 23× more impactful than height)
- **PSK Doors** — Partial data, awaiting complete collection
- **Rollläden** — Different API pattern, needs separate module
- **Balkontüren** — Same engine as Fenster, different price tables

All 36 products compared showed the **same iframe/API structure**, meaning one
unified backend with manufacturer-specific price tables will work for most products.
