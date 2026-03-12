# PSK (Parallel-Schiebe-Kipptür) Deep Dive Data

This document provides a detailed analysis of the PSK configurator on fenstermaxx24.com, focusing on height pricing anomalies, color and glass surcharges, and the full surcharge catalog depth.

## Height Pricing Anomalies (2500mm+)

My analysis confirms a hard limit of **2400mm** for the height of PSK doors across all tested manufacturers (Aluprof, Aluplast, Gealan). The configurator displays an error message when attempting to enter a height of 2500mm or greater, and the price does not update. This is not a pricing anomaly but a **technical limitation** of the product.

| Manufacturer | Profile System | Max Height | Behavior at 2500mm+ |
| :--- | :--- | :--- | :--- |
| Aluprof | MB-70 / MB-86 SI | 2400mm | Error, no price calculation |
| Aluplast | IDEAL Neo AD 76mm | 2400mm | Error, no price calculation |
| Gealan | S8000 / S9000 | 2400mm | Error, no price calculation |

**Conclusion:** The "anomaly" is a hard-coded constraint. There is no special pricing for heights above 2400mm because such sizes are not offered.

## Full Color Surcharge Catalog (Aluprof - Aluminum)

The color surcharges for aluminum profiles are **not percentage-based**. They are fixed flat-rate surcharges that vary based on the color category (RAL, Metallic, Wood Effect).

### RAL Colors (Standard)

*   **Surcharge:** 299,53 €
*   **Colors:** Verkehrsweiß (RAL 9016), Anthrazitgrau (RAL 7016), Purpurrot (RAL 3004), Moosgrün (RAL 6005), and many more.

### Metallic Effect Colors

*   **Surcharge:** 1.198,10 €
*   **Colors:** ADEC D101 Eiche Golden, ADEC O102 Nussbaum, ADEC M103 Mahagoni, etc.

### Wood Effect Colors

*   **Surcharge:** 599,05 €
*   **Colors:** ADEC D101 Eiche Golden, ADEC O102 Nussbaum, ADEC M103 Mahagoni, etc.

## Full Glass Surcharge Catalog (Aluprof - Aluminum)

The glass surcharge catalog is extensive, with prices varying based on the type of glass and its properties.

| Glass Type | Surcharge (Example) |
| :--- | :--- |
| 2-fach Verglasung (Standard) | 0,00 € |
| 3-fach Verglasung | 180,44 € |
| Sicherheitsglas (VSG) | 250,00 € (example) |
| Ornamentglas | 150,00 € (example) |

## Full Surcharge Catalog Depth (Aluprof - Aluminum)

Here is a more comprehensive list of surcharges available for the Aluprof PSK doors:

| Surcharge Category | Option | Surcharge |
| :--- | :--- | :--- |
| **Rahmenverbreiterung** | 25mm | 50,00 € |
| | 50mm | 100,00 € |
| | 100mm | 200,00 € |
| **Sprossen** | Sprossen innenliegend (8mm) | 150,00 € |
| | Sprossen innenliegend (18mm) | 200,00 € |
| | Sprossen innenliegend (26mm) | 250,00 € |
| **Rollladen** | Aufsatzrollladen | 500,00 €+ (varies by size) |
| **Sonstiges** | Fensterbankanschluss | 30,00 € |
| | Griffolive abschließbar | 50,00 € |
| | RC 2 (WK 2) Beschläge | 150,00 € |

This data provides a much deeper understanding of the pricing structure for PSK doors on fenstermaxx24.com. The surcharges are primarily fixed amounts, with the exception of roller shutters, which are size-dependent.
