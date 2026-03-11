/**
 * Insektenschutz Plissee Configurator - Data & Calculator
 * Source: https://www.fenstermaxx24.com/konfigurator/alu-insektenschutz-plissee/
 * Extraction Date: 2026-03-11
 * Product: Aluminium Insektenschutz-Plissee (Insect Protection Pleated Doors)
 * Manufacturer: Drutex
 */

// ============================================================================
// PLISSEE TYPES
// ============================================================================

const PLISSEE_TYPES = {
  "1-teilige": {
    id: "typ_1",
    name: "1-teilige Plissee Tür",
    description: "Single-part pleated door",
    basePrice: 906.50,
    surcharge: 0.00,
    widthMultiplier: 1.0,
    note: "Single panel pleated door"
  },
  "2-teilige": {
    id: "typ_2",
    name: "2-teilige Plissee Tür",
    description: "Two-part pleated door (split in middle)",
    basePrice: 1693.50,
    surcharge: 787.00,
    widthMultiplier: 2.0,
    note: "Two-panel pleated door, width doubled"
  }
};

// ============================================================================
// OPENING DIRECTIONS
// ============================================================================

const OPENING_DIRECTIONS = {
  "rechts-nach-links": {
    id: "richtung_1",
    name: "Plissee von Rechts nach Links schiebbar",
    description: "Slides from right to left (view from inside)",
    surcharge: 0.00,
    default: true
  },
  "links-nach-rechts": {
    id: "richtung_2",
    name: "Plissee von Links nach Rechts schiebbar",
    description: "Slides from left to right (view from inside)",
    surcharge: 0.00,
    default: false
  }
};

// ============================================================================
// FRAME COLORS (RAL-Farben Matt)
// ============================================================================

const FRAME_COLORS = {
  "weiss-9016": {
    id: "farbe_1",
    name: "Weiß",
    ralCode: "9016",
    surcharge: 0.00,
    default: true
  },
  "anthrazitgrau-7016": {
    id: "farbe_2",
    name: "Anthrazitgrau",
    ralCode: "7016",
    surcharge: 0.00
  },
  "graubraun-8019": {
    id: "farbe_3",
    name: "Graubraun",
    ralCode: "8019",
    surcharge: 0.00
  },
  "tiefschwarz-9005": {
    id: "farbe_4",
    name: "Tiefschwarz",
    ralCode: "9005",
    surcharge: 0.00
  },
  "white-aluminium-9006": {
    id: "farbe_5",
    name: "White aluminium",
    ralCode: "9006",
    surcharge: 0.00
  }
};

// ============================================================================
// NET COLORS
// ============================================================================

const NET_COLORS = {
  "schwarz": {
    id: "netzfarbe_1",
    name: "Schwarz",
    description: "Black mesh",
    surcharge: 0.00,
    default: true
  }
};

// ============================================================================
// DIMENSION CONSTRAINTS
// ============================================================================

const DIMENSION_CONSTRAINTS = {
  width: {
    min: 700,
    max: 2400,
    default: 700,
    unit: "mm"
  },
  height: {
    min: 1900,
    max: 2600,
    default: 1900,
    unit: "mm"
  }
};

// ============================================================================
// GLOBAL SETTINGS
// ============================================================================

const DISCOUNT_RATE = 0.40;
const DISCOUNT_MULTIPLIER = 1 - DISCOUNT_RATE;

// ============================================================================
// INSEKTENSCHUTZ PLISSEE CALCULATOR CLASS
// ============================================================================

class InsektenschutzPlisseeCalculator {
  /**
   * Calculator for Insektenschutz Plissee configurations.
   * 
   * Features:
   * - Price calculation with all surcharges
   * - Dimension validation
   * - Configuration management
   */

  constructor() {
    this.resetConfiguration();
  }

  resetConfiguration() {
    this.config = {
      plisseeType: "1-teilige",
      width: 700,
      height: 1900,
      openingDirection: "rechts-nach-links",
      frameColor: "weiss-9016",
      netColor: "schwarz"
    };
  }

  setPlisseeType(plisseeType) {
    if (!PLISSEE_TYPES[plisseeType]) {
      throw new Error(`Invalid plissee type: ${plisseeType}`);
    }
    this.config.plisseeType = plisseeType;
    return this;
  }

  setDimensions(width, height) {
    const constraints = DIMENSION_CONSTRAINTS;

    if (width < constraints.width.min || width > constraints.width.max) {
      throw new Error(
        `Width must be between ${constraints.width.min} and ${constraints.width.max} mm`
      );
    }

    if (height < constraints.height.min || height > constraints.height.max) {
      throw new Error(
        `Height must be between ${constraints.height.min} and ${constraints.height.max} mm`
      );
    }

    this.config.width = width;
    this.config.height = height;
    return this;
  }

  setOpeningDirection(direction) {
    if (!OPENING_DIRECTIONS[direction]) {
      throw new Error(`Invalid opening direction: ${direction}`);
    }
    this.config.openingDirection = direction;
    return this;
  }

  setFrameColor(color) {
    if (!FRAME_COLORS[color]) {
      throw new Error(`Invalid frame color: ${color}`);
    }
    this.config.frameColor = color;
    return this;
  }

  setNetColor(color) {
    if (!NET_COLORS[color]) {
      throw new Error(`Invalid net color: ${color}`);
    }
    this.config.netColor = color;
    return this;
  }

  getBasePrice() {
    return PLISSEE_TYPES[this.config.plisseeType].basePrice;
  }

  calculateSurcharges() {
    const surcharges = {};

    surcharges.plisseeType = PLISSEE_TYPES[this.config.plisseeType].surcharge;
    surcharges.openingDirection = OPENING_DIRECTIONS[this.config.openingDirection].surcharge;
    surcharges.frameColor = FRAME_COLORS[this.config.frameColor].surcharge;
    surcharges.netColor = NET_COLORS[this.config.netColor].surcharge;

    return surcharges;
  }

  calculateTotalSurcharge() {
    const surcharges = this.calculateSurcharges();
    return Object.values(surcharges).reduce((sum, val) => sum + val, 0);
  }

  calculatePrice() {
    const basePrice = this.getBasePrice();
    const totalSurcharge = this.calculateTotalSurcharge();

    const priceBeforeDiscount = basePrice + totalSurcharge;
    const finalPrice = priceBeforeDiscount * DISCOUNT_MULTIPLIER;
    const discountAmount = priceBeforeDiscount * DISCOUNT_RATE;

    return {
      basePrice: basePrice,
      surcharges: this.calculateSurcharges(),
      totalSurcharge: totalSurcharge,
      priceBeforeDiscount: priceBeforeDiscount,
      discountRate: DISCOUNT_RATE,
      discountAmount: Math.round(discountAmount * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100,
      savings: Math.round(discountAmount * 100) / 100
    };
  }

  calculateArea() {
    let width = this.config.width;
    const height = this.config.height;

    if (this.config.plisseeType === "2-teilige") {
      width = width * 2;
    }

    const areaMm2 = width * height;
    const areaM2 = areaMm2 / 1_000_000;

    return Math.round(areaM2 * 100) / 100;
  }

  getConfiguration() {
    return { ...this.config };
  }

  getPriceBreakdown() {
    const priceInfo = this.calculatePrice();
    const area = this.calculateArea();

    return {
      configuration: this.getConfiguration(),
      areaM2: area,
      priceInfo: priceInfo,
      pricePerM2: Math.round((priceInfo.finalPrice / area) * 100) / 100
    };
  }

  listPlisseeTypes() {
    return PLISSEE_TYPES;
  }

  listOpeningDirections() {
    return OPENING_DIRECTIONS;
  }

  listFrameColors() {
    return FRAME_COLORS;
  }

  listNetColors() {
    return NET_COLORS;
  }
}

// ============================================================================
// EXAMPLE USAGE (for Node.js)
// ============================================================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    InsektenschutzPlisseeCalculator,
    PLISSEE_TYPES,
    OPENING_DIRECTIONS,
    FRAME_COLORS,
    NET_COLORS,
    DIMENSION_CONSTRAINTS,
    DISCOUNT_RATE,
    DISCOUNT_MULTIPLIER
  };

  // Run examples if executed directly
  if (require.main === module) {
    console.log("================================================================================");
    console.log("INSEKTENSCHUTZ PLISSEE CONFIGURATOR - EXAMPLES");
    console.log("================================================================================");

    // Example 1: Default configuration
    console.log("\n[EXAMPLE 1] Default Configuration");
    console.log("-".repeat(80));
    const calc = new InsektenschutzPlisseeCalculator();
    const breakdown = calc.getPriceBreakdown();

    console.log(`Plissee Type: ${breakdown.configuration.plisseeType}`);
    console.log(`Dimensions: ${breakdown.configuration.width}×${breakdown.configuration.height}mm`);
    console.log(`Area: ${breakdown.areaM2} m²`);
    console.log(`Base Price: ${breakdown.priceInfo.basePrice.toFixed(2)} EUR`);
    console.log(`Total Surcharge: ${breakdown.priceInfo.totalSurcharge.toFixed(2)} EUR`);
    console.log(`Price Before Discount: ${breakdown.priceInfo.priceBeforeDiscount.toFixed(2)} EUR`);
    console.log(`Discount (40%): -${breakdown.priceInfo.discountAmount.toFixed(2)} EUR`);
    console.log(`FINAL PRICE: ${breakdown.priceInfo.finalPrice.toFixed(2)} EUR`);
    console.log(`Price per m²: ${breakdown.pricePerM2.toFixed(2)} EUR/m²`);

    // Example 2: 2-teilige Plissee
    console.log("\n[EXAMPLE 2] 2-teilige Plissee (2050×1900mm)");
    console.log("-".repeat(80));
    const calc2 = new InsektenschutzPlisseeCalculator();
    calc2.setPlisseeType("2-teilige");
    calc2.setDimensions(1025, 1900);
    const breakdown2 = calc2.getPriceBreakdown();

    console.log(`Plissee Type: ${breakdown2.configuration.plisseeType}`);
    console.log(`Input Dimensions: ${breakdown2.configuration.width}×${breakdown2.configuration.height}mm`);
    console.log(`Displayed Width: ${breakdown2.configuration.width * 2}mm (doubled)`);
    console.log(`Area: ${breakdown2.areaM2} m²`);
    console.log(`Base Price: ${breakdown2.priceInfo.basePrice.toFixed(2)} EUR`);
    console.log(`Total Surcharge: ${breakdown2.priceInfo.totalSurcharge.toFixed(2)} EUR`);
    console.log(`Price Before Discount: ${breakdown2.priceInfo.priceBeforeDiscount.toFixed(2)} EUR`);
    console.log(`Discount (40%): -${breakdown2.priceInfo.discountAmount.toFixed(2)} EUR`);
    console.log(`FINAL PRICE: ${breakdown2.priceInfo.finalPrice.toFixed(2)} EUR`);
    console.log(`Price per m²: ${breakdown2.pricePerM2.toFixed(2)} EUR/m²`);

    // Example 3: Custom configuration
    console.log("\n[EXAMPLE 3] Custom: 1200×2300mm, Anthrazitgrau, Left-to-Right");
    console.log("-".repeat(80));
    const calc3 = new InsektenschutzPlisseeCalculator();
    calc3.setPlisseeType("1-teilige");
    calc3.setDimensions(1200, 2300);
    calc3.setOpeningDirection("links-nach-rechts");
    calc3.setFrameColor("anthrazitgrau-7016");
    const breakdown3 = calc3.getPriceBreakdown();

    console.log(`Plissee Type: ${breakdown3.configuration.plisseeType}`);
    console.log(`Dimensions: ${breakdown3.configuration.width}×${breakdown3.configuration.height}mm`);
    console.log(`Frame Color: ${breakdown3.configuration.frameColor}`);
    console.log(`Opening Direction: ${breakdown3.configuration.openingDirection}`);
    console.log(`Area: ${breakdown3.areaM2} m²`);
    console.log(`Base Price: ${breakdown3.priceInfo.basePrice.toFixed(2)} EUR`);
    console.log(`Total Surcharge: ${breakdown3.priceInfo.totalSurcharge.toFixed(2)} EUR`);
    console.log(`Price Before Discount: ${breakdown3.priceInfo.priceBeforeDiscount.toFixed(2)} EUR`);
    console.log(`Discount (40%): -${breakdown3.priceInfo.discountAmount.toFixed(2)} EUR`);
    console.log(`FINAL PRICE: ${breakdown3.priceInfo.finalPrice.toFixed(2)} EUR`);
    console.log(`Price per m²: ${breakdown3.pricePerM2.toFixed(2)} EUR/m²`);

    // Example 4: Size comparison
    console.log("\n[EXAMPLE 4] Size Comparison - Height Impact");
    console.log("-".repeat(80));
    const heights = [1900, 2050, 2300];
    heights.forEach(h => {
      const calcH = new InsektenschutzPlisseeCalculator();
      calcH.setPlisseeType("1-teilige");
      calcH.setDimensions(1200, h);
      const breakdownH = calcH.getPriceBreakdown();
      console.log(
        `1200×${h}mm: ${breakdownH.priceInfo.finalPrice.toFixed(2)} EUR ` +
        `(${breakdownH.areaM2} m², ${breakdownH.pricePerM2.toFixed(2)} EUR/m²)`
      );
    });

    // Example 5: Available options
    console.log("\n[EXAMPLE 5] Available Options");
    console.log("-".repeat(80));
    const calc5 = new InsektenschutzPlisseeCalculator();

    console.log("Plissee Types:");
    Object.entries(calc5.listPlisseeTypes()).forEach(([key, value]) => {
      console.log(
        `  - ${value.name}: ${value.basePrice.toFixed(2)} EUR ` +
        `(+${value.surcharge.toFixed(2)} EUR surcharge)`
      );
    });

    console.log("\nFrame Colors (all 0.00 EUR surcharge):");
    Object.entries(calc5.listFrameColors()).forEach(([key, value]) => {
      console.log(`  - ${value.name} (RAL ${value.ralCode})`);
    });

    console.log("\nOpening Directions (all 0.00 EUR surcharge):");
    Object.entries(calc5.listOpeningDirections()).forEach(([key, value]) => {
      console.log(`  - ${value.name}`);
    });

    console.log("\nNet Colors (all 0.00 EUR surcharge):");
    Object.entries(calc5.listNetColors()).forEach(([key, value]) => {
      console.log(`  - ${value.name}`);
    });

    console.log("\n" + "=".repeat(80));
    console.log("END OF EXAMPLES");
    console.log("=".repeat(80));
  }
}
