# MISSING DATA CHECKLIST

> **Updated:** March 10, 2026
> **Full analysis:** See `docs/PRICING_ENGINE_DATA_REQUIREMENTS.md`

## Daten die wir HABEN (Complete)

### Fenster
- [x] Kunststoff - Drutex (base_prices.csv, surcharges.json, options.json, rules.js) — **INTEGRATED IN CODE**
- [x] Kunststoff - Gealan (gealan_pvc_complete_data.json, aufpreise.csv) — **Ready to integrate**
- [x] Holz (holz_complete_data.json, holz_aufpreise.json, aufpreise.csv) — **Ready to integrate**

### Balkontüren
- [x] Alu (alu_balkontuer_complete_data.json, aufpreise.csv) — **Ready to integrate**

### Haustüren
- [x] Kunststoff (PVC) - Drutex (haustuer_calculations.json, haustuer_deep_data.json) — **Ready to integrate**

### Terassentüren
- [x] PSK - Drutex PVC (psk_calculations.json) — **PARTIAL: needs complete surcharge catalog**

### Rollladen
- [x] Aufsatzrollladen - Drutex (rollladen_calculations.json) — **Ready to integrate**

---

## Daten die wir BRAUCHEN

### FENSTER

Kunststoff:
- [x] ~~Gealan (base_prices, surcharges)~~ ✅ HAVE IT
- [ ] Salamander (base_prices, surcharges)
- [ ] Aluplast (base_prices, surcharges)
- [ ] Rehau (base_prices, surcharges)
- [ ] Schuco (base_prices, surcharges)

Kunststoff-Alu:
- [ ] Drutex (base_prices, surcharges)
- [ ] Andere Hersteller

Alu:
- [ ] Alu Fenster - Alle Hersteller (base_prices, surcharges) — **Note: We have Alu Balkontür only**

Holz:
- [x] ~~Holz Fenster (base_prices, surcharges)~~ ✅ HAVE IT
- [ ] Additional Holz manufacturers

Holz-Alu:
- [ ] Alle Hersteller (base_prices, surcharges)

Schiebefenster:
- [ ] Alle Hersteller (base_prices, surcharges)


### BALKONTUEREN

Kunststoff:
- [ ] Alle Hersteller (evtl. gleiche Daten wie Fenster)

Kunststoff-Alu:
- [ ] Alle Hersteller

Alu:
- [ ] Alle Hersteller

Holz:
- [ ] Alle Hersteller

Holz-Alu:
- [ ] Alle Hersteller


### TERASSENTUEREN

PSK (Parallel-Schiebe-Kipp):
- [ ] Komplette Daten (psk_calculations.json ist partial)

Smart-Slide:
- [ ] Alle Hersteller

HST (Hebe-Schiebe-Tur):
- [ ] Alle Hersteller

Falt-Schiebe:
- [ ] Alle Hersteller


### HAUSTUEREN

Kunststoff:
- [x] Drutex (COMPLETE)

Alu:
- [ ] Alle Hersteller

Holz:
- [ ] Alle Hersteller


### NEBENEINGANGSTUEREN

Kunststoff:
- [ ] Alle Hersteller

Alu:
- [ ] Alle Hersteller

Holz:
- [ ] Alle Hersteller


### ROLLLADEN

Aufsatzrollladen:
- [x] Drutex (COMPLETE)

Styropor-Aufsatzrollladen:
- [ ] Alle Hersteller

Vorsatzrollladen:
- [ ] Alle Hersteller

Raffstore:
- [ ] Alle Hersteller

Insektenschutz-Plissee:
- [ ] Alle Hersteller

---

## CALCULATION PATTERN ANALYSIS

### FENSTER (Kunststoff Drutex)
```
Grundpreis = Base_Price_Matrix[width][height]
Profile_Adjusted = Grundpreis x Profile_Multiplier
Preisempfehlung = Profile_Adjusted + V_Perfect + Color_Ext + Color_Int + Glass + Accessories
Angebotspreis = Preisempfehlung x 0.60 (40% Rabatt)
```

### HAUSTUREN (Kunststoff Drutex)
```
Same ADDITIVE pattern
BasePriceForModel(width, height) + ProfileSurcharge + ColorSurcharge + GlassSurcharge + SecuritySurcharge
Angebotspreis = Preisempfehlung x 0.60 (40% Rabatt)
```
Key Difference: Width has 23x more impact than height (opposite of Fenster)

### ROLLLADEN (Aufsatzrollladen)
```
Same ADDITIVE pattern
Gesamtpreis = Grundpreis + Farbe_Kasten + Panzerfarbe + Antriebsart + Seitenblende + Putztrager
Angebotspreis = Gesamtpreis x 0.60 (40% Rabatt)
```

### PSK (Partial Data)
```
Price increases with width (non-linear pattern above 1700mm)
Formula not fully extracted yet
```

---

## CONCLUSION: Same Calculation Logic

YES - All products use SAME calculation pattern:
1. Base price from dimension matrix (width x height)
2. ADD surcharges for each option selected
3. MULTIPLY by discount (0.60 for 40% off)

DIFFERENCES are only:
- Different base price matrices per product/material
- Different surcharge amounts per option
- Different available options per product type

NO NEED for separate calculation engines per product type.
ONE engine with different data tables.

---

## PRIORITY DATA COLLECTION

High Priority (to expand the engine):
1. [x] ~~Fenster Kunststoff - Gealan (verify same pattern as Drutex)~~ ✅ DONE - Same pattern confirmed
2. [x] ~~Balkontüren Alu (verify same as Fenster)~~ ✅ DONE - Same pattern confirmed
3. [x] ~~Fenster Holz (verify pattern for different material)~~ ✅ DONE - Same pattern confirmed
4. [ ] Complete PSK Terassentür surcharge catalog
5. [ ] Fenster Kunststoff - Salamander, VEKA, Rehau, Schüco

Medium Priority:
6. [ ] Haustür Alu - any manufacturer
7. [ ] Balkontür PVC - any manufacturer
8. [ ] Additional Rollladen types (Vorsatz, Raffstore)

Low Priority (after system works):
9. [ ] Remaining manufacturers
10. [ ] Remaining materials (Holz-Alu, Kunststoff-Alu)
11. [ ] Remaining product types (HST, Smart-Slide, Falt-Schiebe, Nebeneingangstüren)
