/**
 * Aufsatzrollladen Configurator - Complete Research Data & Calculator
 * Source: https://www.fenstermaxx24.com/konfigurator/konfigurator-aufsatzrollladen/
 * Extraction Date: 2026-03-11
 */

// ============================================================================
// COMPLETE BASE PRICE MATRIX (All 24 configurations)
// ============================================================================
const BASE_PRICE_MATRIX = {
  "800_1000": 286.00,
  "800_1200": 301.66,
  "800_1400": 318.36,
  "800_1700": 343.41,
  "1000_1000": 317.32,
  "1000_1200": 336.10,
  "1000_1400": 355.94,
  "1000_1700": 384.12,
  "1200_1000": 348.63,
  "1200_1200": 370.55,
  "1200_1400": 392.47,
  "1200_1700": 424.83,
  "1500_1000": 395.60,
  "1500_1200": 420.65,
  "1500_1400": 446.75,
  "1500_1700": 486.41,
  "2000_1000": 473.88,
  "2000_1200": 507.29,
  "2000_1400": 539.64,
  "2000_1700": 592.88,
  "2500_1000": 552.16,
  "2500_1200": 593.92,
  "2500_1400": 632.54,
  "2500_1700": 699.35,
};

// ============================================================================
// ROLLER SHUTTER MODELS (fn_rollladen_model_*)
// ============================================================================
const MODELS = {
  "fn_rollladen_model_1": {
    name: "Aufsatzrollladen mit Revision von Unten",
    description: "Roller shutter with bottom revision",
    surcharge: 0.00
  },
  "fn_rollladen_model_2": {
    name: "Aufsatzrollladen mit Revision von der Seite",
    description: "Roller shutter with side revision",
    surcharge: 0.00
  },
  "fn_rollladen_model_3": {
    name: "Aufsatzrollladen mit Revision von Unten + Insektenschutz",
    description: "Roller shutter with bottom revision + insect protection",
    surcharge: 159.38
  },
  "fn_rollladen_model_4": {
    name: "Aufsatzrollladen mit Revision von der Seite + Insektenschutz",
    description: "Roller shutter with side revision + insect protection",
    surcharge: 159.38
  },
};

// ============================================================================
// DRIVE TYPES & MOTORS (antriebsart_*)
// ============================================================================
const DRIVE_TYPES = {
  "antriebsart_1": {
    name: "Schwenkgurtwickler 14mm Weiss",
    description: "Manual Belt Winder - White",
    type: "Manual",
    surcharge: 0.00
  },
  "antriebsart_2": {
    name: "Schwenkgurtwickler 14mm Braun",
    description: "Manual Belt Winder - Brown",
    type: "Manual",
    surcharge: 0.00
  },
  "antriebsart_4": {
    name: "Getriebe mit Kurbel",
    description: "Manual Gearbox with Crank",
    type: "Manual",
    surcharge: 188.80
  },
  "antriebsart_5": {
    name: "Getriebe mit abnehmbarer Kurbel",
    description: "Manual Gearbox with Removable Crank",
    type: "Manual",
    surcharge: 188.00
  },
  "antriebsart_6": {
    name: "Motor mit Schalter und Hinderniserkennung",
    description: "Electric Motor with Switch and Obstacle Detection",
    type: "Electric",
    surcharge: 246.46
  },
  "antriebsart_7": {
    name: "Motor mit Schluesselschalter und Hinderniserkennung",
    description: "Electric Motor with Key Switch and Obstacle Detection",
    type: "Electric",
    surcharge: 369.80
  },
  "antriebsart_8": {
    name: "Motor Rescue fuer Flucht und Rettungsweg",
    description: "Electric Rescue Motor for Emergency Routes",
    type: "Electric - Emergency",
    surcharge: 638.94
  },
  "antriebsart_9": {
    name: "Motor Somfy OXIMO RS100 iO",
    description: "Smart Motor Somfy OXIMO RS100 iO",
    type: "Electric - Smart/IoT",
    surcharge: 576.95
  },
  "antriebsart_10": {
    name: "Motor Somfy OXIMO RS100 iO + Fernbedienung",
    description: "Smart Motor Somfy OXIMO RS100 iO with Remote Control",
    type: "Electric - Smart/IoT with Remote",
    surcharge: 769.05
  },
};

// ============================================================================
// PANEL COLORS (farbe_panzer_*)
// ============================================================================
const PANEL_COLORS = {
  "farbe_panzer_1": {
    name: "Silber",
    description: "Silver",
    surcharge: 0.00
  },
  "farbe_panzer_2": {
    name: "Weiss",
    description: "White",
    surcharge: 0.00
  },
  "farbe_panzer_3": {
    name: "Grau",
    description: "Gray",
    surcharge: 0.00
  },
  "farbe_panzer_4": {
    name: "Braun",
    description: "Brown",
    surcharge: 0.00
  },
  "farbe_panzer_5": {
    name: "Dunkelbraun",
    description: "Dark Brown",
    surcharge: 0.00
  },
  "farbe_panzer_6": {
    name: "Golden Oak",
    description: "Golden Oak (Premium)",
    surcharge: 27.86
  },
  "farbe_panzer_7": {
    name: "Nussbaum",
    description: "Walnut (Premium)",
    surcharge: 63.14
  },
  "farbe_panzer_8": {
    name: "Anthrazit",
    description: "Anthracite",
    surcharge: 0.00
  },
  "farbe_panzer_9": {
    name: "Moosgruen",
    description: "Moss Green",
    surcharge: 0.00
  },
  "farbe_panzer_10": {
    name: "Braun Metallic",
    description: "Brown Metallic",
    surcharge: 0.00
  },
  "farbe_panzer_11": {
    name: "Grau Aluminium",
    description: "Aluminum Gray",
    surcharge: 0.00
  },
  "farbe_panzer_12": {
    name: "Beige",
    description: "Beige",
    surcharge: 0.00
  },
};

// ============================================================================
// BOX HEIGHT OPTIONS (kastenhoehe_*)
// ============================================================================
const BOX_HEIGHTS = {
  "kastenhoehe_175": {
    height_mm: 175,
    model: "SKS",
    description: "Standard Size",
    surcharge: 0.00
  },
  "kastenhoehe_215": {
    height_mm: 215,
    model: "DRUTEX",
    description: "Larger Size",
    surcharge: -65.01
  },
};

// ============================================================================
// PLASTER CARRIER & TRIM OPTIONS (putztraeger_*)
// ============================================================================
const PLASTER_OPTIONS = {
  "putztraeger_0": {
    name: "Ohne Putztraeger und -leiste",
    description: "Without Plaster Carrier",
    surcharge: 0.00
  },
  "putztraeger_1": {
    name: "Putztraeger und -leiste aussen",
    description: "Plaster Carrier Outside Only",
    surcharge: 17.57
  },
  "putztraeger_2": {
    name: "Putztraeger und -leiste innen",
    description: "Plaster Carrier Inside Only",
    surcharge: 17.57
  },
  "putztraeger_3": {
    name: "Putztraeger und -leiste beidseitig",
    description: "Plaster Carrier Both Sides",
    surcharge: 35.14
  },
};

// ============================================================================
// GLOBAL SETTINGS
// ============================================================================
const GLOBAL_DISCOUNT = 0.40;
const MIN_WIDTH = 800;
const MAX_WIDTH = 2500;
const MIN_HEIGHT = 1000;
const MAX_HEIGHT = 1700;
const MAX_WEIGHT = 12;

// ============================================================================
// PRICE CALCULATOR CLASS
// ============================================================================
class RolladenCalculator {
  constructor() {
    this.minWidth = MIN_WIDTH;
    this.maxWidth = MAX_WIDTH;
    this.minHeight = MIN_HEIGHT;
    this.maxHeight = MAX_HEIGHT;
    this.maxWeight = MAX_WEIGHT;
    this.globalDiscount = GLOBAL_DISCOUNT;
  }

  validateDimensions(width, height) {
    if (width < this.minWidth || width > this.maxWidth) {
      throw new Error(`Width must be between ${this.minWidth} and ${this.maxWidth} mm`);
    }
    if (height < this.minHeight || height > this.maxHeight) {
      throw new Error(`Height must be between ${this.minHeight} and ${this.maxHeight} mm`);
    }
  }

  getBasePrice(width, height) {
    this.validateDimensions(width, height);
    const key = `${width}_${height}`;
    
    if (!(key in BASE_PRICE_MATRIX)) {
      throw new Error(`No price found for ${width}x${height} mm`);
    }
    
    return BASE_PRICE_MATRIX[key];
  }

  calculatePrice(width, height, options = {}) {
    const {
      model = "fn_rollladen_model_1",
      drive = "antriebsart_1",
      color = "farbe_panzer_2",
      boxHeight = "kastenhoehe_175",
      plaster = "putztraeger_0"
    } = options;

    this.validateDimensions(width, height);

    const basePrice = this.getBasePrice(width, height);

    const modelSurcharge = MODELS[model]?.surcharge || 0.00;
    const driveSurcharge = DRIVE_TYPES[drive]?.surcharge || 0.00;
    const colorSurcharge = PANEL_COLORS[color]?.surcharge || 0.00;
    const boxSurcharge = BOX_HEIGHTS[boxHeight]?.surcharge || 0.00;
    const plasterSurcharge = PLASTER_OPTIONS[plaster]?.surcharge || 0.00;

    const totalSurcharges = modelSurcharge + driveSurcharge + colorSurcharge + 
                           boxSurcharge + plasterSurcharge;
    const subtotal = basePrice + totalSurcharges;
    const discountAmount = subtotal * this.globalDiscount;
    const finalPrice = subtotal - discountAmount;

    return {
      dimensions: { width, height },
      basePrice: Math.round(basePrice * 100) / 100,
      surcharges: {
        model: Math.round(modelSurcharge * 100) / 100,
        drive: Math.round(driveSurcharge * 100) / 100,
        color: Math.round(colorSurcharge * 100) / 100,
        boxHeight: Math.round(boxSurcharge * 100) / 100,
        plaster: Math.round(plasterSurcharge * 100) / 100,
        total: Math.round(totalSurcharges * 100) / 100,
      },
      subtotal: Math.round(subtotal * 100) / 100,
      discount: {
        percentage: this.globalDiscount * 100,
        amount: Math.round(discountAmount * 100) / 100,
      },
      finalPrice: Math.round(finalPrice * 100) / 100,
    };
  }

  calculateWeight(width, height, division = 1) {
    if (division <= 0) {
      throw new Error("Division must be greater than 0");
    }

    const weight = (height * width * 3.6 / 1000000) / division;
    return Math.round(weight * 100) / 100;
  }

  checkWeightLimit(width, height, division = 1) {
    const weight = this.calculateWeight(width, height, division);
    const isValid = weight < this.maxWeight;

    return {
      weight,
      maxWeight: this.maxWeight,
      valid: isValid,
      message: isValid 
        ? `Weight OK (${weight} kg)` 
        : `Weight exceeds limit (${weight} kg > ${this.maxWeight} kg)`,
    };
  }

  getAvailableDimensions() {
    const dimensions = [];
    for (const key in BASE_PRICE_MATRIX) {
      const [width, height] = key.split('_').map(Number);
      dimensions.push({ width, height });
    }
    return dimensions.sort((a, b) => a.width - b.width || a.height - b.height);
  }

  getPriceRangeByWidth(width) {
    const prices = [];
    for (const key in BASE_PRICE_MATRIX) {
      const [w] = key.split('_').map(Number);
      if (w === width) {
        prices.push(BASE_PRICE_MATRIX[key]);
      }
    }

    if (prices.length === 0) {
      throw new Error(`No prices found for width ${width} mm`);
    }

    const sum = prices.reduce((a, b) => a + b, 0);
    return {
      width,
      min: Math.min(...prices),
      max: Math.max(...prices),
      average: Math.round((sum / prices.length) * 100) / 100,
      count: prices.length,
    };
  }
}

// ============================================================================
// EXPORT FOR NODE.JS/COMMONJS
// ============================================================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    RolladenCalculator,
    BASE_PRICE_MATRIX,
    MODELS,
    DRIVE_TYPES,
    PANEL_COLORS,
    BOX_HEIGHTS,
    PLASTER_OPTIONS,
    GLOBAL_DISCOUNT,
    MIN_WIDTH,
    MAX_WIDTH,
    MIN_HEIGHT,
    MAX_HEIGHT,
    MAX_WEIGHT,
  };
}

// ============================================================================
// EXAMPLE USAGE
// ============================================================================
if (typeof require !== 'undefined' && require.main === module) {
  const calc = new RolladenCalculator();

  console.log("\n" + "=".repeat(70));
  console.log("EXAMPLE 1: Basic Configuration (800x1000mm)");
  console.log("=".repeat(70));
  const result1 = calc.calculatePrice(800, 1000);
  console.log(`Base Price: ${result1.basePrice}`);
  console.log(`Total Surcharges: ${result1.surcharges.total}`);
  console.log(`Subtotal: ${result1.subtotal}`);
  console.log(`Discount (40%): -${result1.discount.amount}`);
  console.log(`FINAL PRICE: ${result1.finalPrice}`);

  console.log("\n" + "=".repeat(70));
  console.log("EXAMPLE 2: Premium Configuration (2500x1700mm)");
  console.log("=".repeat(70));
  const result2 = calc.calculatePrice(2500, 1700, {
    model: "fn_rollladen_model_3",
    drive: "antriebsart_10",
    color: "farbe_panzer_7",
    plaster: "putztraeger_3"
  });
  console.log(`Base Price: ${result2.basePrice}`);
  console.log(`Model Surcharge: ${result2.surcharges.model}`);
  console.log(`Drive Surcharge: ${result2.surcharges.drive}`);
  console.log(`Color Surcharge: ${result2.surcharges.color}`);
  console.log(`Plaster Surcharge: ${result2.surcharges.plaster}`);
  console.log(`Total Surcharges: ${result2.surcharges.total}`);
  console.log(`Subtotal: ${result2.subtotal}`);
  console.log(`Discount (40%): -${result2.discount.amount}`);
  console.log(`FINAL PRICE: ${result2.finalPrice}`);

  console.log("\n" + "=".repeat(70));
  console.log("EXAMPLE 3: Weight Calculation");
  console.log("=".repeat(70));
  const weight = calc.checkWeightLimit(2500, 1700, 1);
  console.log(`Weight: ${weight.weight} kg`);
  console.log(`Status: ${weight.message}`);

  console.log("\n" + "=".repeat(70));
  console.log("EXAMPLE 4: Available Dimensions");
  console.log("=".repeat(70));
  const dims = calc.getAvailableDimensions();
  console.log(`Total configurations: ${dims.length}`);
  console.log(`Sample: ${JSON.stringify(dims.slice(0, 5))}`);

  console.log("\n" + "=".repeat(70));
  console.log("EXAMPLE 5: Price Range by Width");
  console.log("=".repeat(70));
  const priceRange = calc.getPriceRangeByWidth(2500);
  console.log(`Width: ${priceRange.width} mm`);
  console.log(`Min Price: ${priceRange.min}`);
  console.log(`Max Price: ${priceRange.max}`);
  console.log(`Average: ${priceRange.average}`);
}
