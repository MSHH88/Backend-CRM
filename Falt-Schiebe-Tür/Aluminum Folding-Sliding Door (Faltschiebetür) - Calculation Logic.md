# Aluminum Folding-Sliding Door (Faltschiebetür) - Calculation Logic

## 1. Base Pricing Model
The pricing for the **MB-86 Fold Line** aluminum folding-sliding door is primarily driven by the number of folding elements (parts) and the total surface area (m²).

### Base Price Components:
*   **System Base**: A fixed cost for the MB-86 aluminum profile system.
*   **Element Multiplier**: Each additional folding part (from 3 to 6) significantly increases the base price.
*   **Area-Based Scaling**: The price scales with width and height, but not linearly. Larger dimensions often trigger higher material requirements for stability.

## 2. Part-Based Base Pricing (at 2500mm Height)
| Configuration | Min. Width | Base Price (approx. at 2500mm Height) |
| :--- | :--- | :--- |
| **3-teilig** | 2280 mm | € 4,985.78 |
| **4-teilig** | 2280 mm | € 6,100.66 |
| **5-teilig** | 3800 mm | € 8,012.44 |
| **6-teilig** | 4500 mm | € 8,772.04 |

## 3. Calculation Formulas (Inferred)
*   **Discount Logic**: The website currently applies a **40% Spring Discount** (Frühlings-Rabatt).
    *   `Final Price = List Price * 0.60`
*   **Area Calculation**: `Area (m²) = (Width in mm / 1000) * (Height in mm / 1000)`
*   **Price per m²**: Varies by configuration. For a 3-part door (2280x1900), the list price is approx. € 1,276 per m². For a 6-part door (4500x2500), it is approx. € 1,300 per m².

## 4. Threshold & Limit Logic
*   **Width Limits**: 2280 mm to 6000 mm (depending on parts).
*   **Height Limits**: 1900 mm to 2500 mm.
*   **Weight Constraints**: The system automatically limits dimensions if the glass weight per element exceeds safety standards (typically 100kg per leaf).
