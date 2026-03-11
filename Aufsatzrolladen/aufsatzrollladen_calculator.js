/**
 * Aufsatzrollladen Configurator - Price Calculator
 * Extracted from: https://www.fenstermaxx24.com/konfigurator/konfigurator-aufsatzrollladen/
 */

// Base price matrix (width in mm, height in mm, price in EUR)
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

// Drive type surcharges (in EUR)
const DRIVE_SURCHARGES = {
  "antriebsart_1": 0.00,      // Schwenkgurtwickler 14mm Weiß
  "antriebsart_2": 0.00,      // Schwenkgurtwickler 14mm Braun
  "antriebsart_4": 188.80,    // Getriebe mit Kurbel
  "antriebsart_5": 188.00,    // Getriebe mit abnehmbarer Kurbel
  "antriebsart_6": 246.46,    // Motor mit Schalter
  "antriebsart_7": 369.80,    // Motor mit Schlüsselschalter
  "antriebsart_8": 638.94,    // Motor Rescue
  "antriebsart_9": 576.95,    // Motor Somfy OXIMO
  "antriebsart_10": 769.05,   // Motor Somfy + Fernbedienung
};

// Panel color surcharges (in EUR)
const COLOR_SURCHARGES = {
  "farbe_panzer_1": 0.00,     // Silber
  "farbe_panzer_2": 0.00,     // Weiß
  "farbe_panzer_3": 0.00,     // Grau
  "farbe_panzer_4": 0.00,     // Braun
  "farbe_panzer_5": 0.00,     // Dunkelbraun
  "farbe_panzer_6": 27.86,    // Golden Oak
  "farbe_panzer_7": 63.14,    // Nussbaum
  "farbe_panzer_8": 0.00,     // Anthrazit
  "farbe_panzer_9": 0.00,     // Moosgrün
  "farbe_panzer_10": 0.00,    // Braun Metallic
  "farbe_panzer_11": 0.00,    // Grau Aluminium
  "farbe_panzer_12": 0.00,    // Beige
};

// Box height surcharges (in EUR)
const BOX_HEIGHT_SURCHARGES = {
  "kastenhoehe_175": 0.00,    // 175 mm (SKS)
  "kastenhoehe_215": -65.01,  // 215 mm (DRUTEX) - DISCOUNT
};

// Model surcharges (in EUR)
const MODEL_SURCHARGES = {
  "fn_rollladen_model_1": 0.00,       // Revision von Unten
  "fn_rollladen_model_2": 0.00,       // Revision von der Seite
  "fn_rollladen_model_3": 159.38,     // Revision von Unten + Insektenschutz
  "fn_rollladen_model_4": 159.38,     // Revision von der Seite + Insektenschutz
};

// Plaster carrier surcharges (in EUR)
const PLASTER_SURCHARGES = {
  "putztraeger_0": 0.00,      // Without
  "putztraeger_1": 17.57,     // Outside
  "putztraeger_2": 17.57,     // Inside
  "putztraeger_3": 35.14,     // Both sides
};

// Global discount
const GLOBAL_DISCOUNT = 0.40; // 40% discount


class RolladenCalculator {
  constructor() {
    this.minWidth = 800;
    this.maxWidth = 2500;
    this.minHeight = 1000;
    this.maxHeight = 1700;
  }

  /**
   * Validate width and height are within allowed range
   */
  validateDimensions(width, height) {
    if (width < this.minWidth || width > this.maxWidth) {
      throw new Error(`Width must be between ${this.minWidth} and ${this.maxWidth} mm`);
    }
    if (height < this.minHeight || height > this.maxHeight) {
      throw new Error(`Height must be between ${this.minHeight} and ${this.maxHeight} mm`);
    }
  }

  /**
   * Get base price for given dimensions
   */
  getBasePrice(width, height) {
    this.validateDimensions(width, height);
    
    const key = `${width}_${height}`;
    if (!(key in BASE_PRICE_MATRIX)) {
      throw new Error(`No price found for ${width}x${height} mm`);
    }
    
    return BASE_PRICE_MATRIX[key];
  }

  /**
   * Calculate total price with all surcharges and discount
   */
  calculateTotalPrice(width, height, options = {}) {
    const {
      model = "fn_rollladen_model_1",
      drive = "antriebsart_1",
      color = "farbe_panzer_2",
      boxHeight = "kastenhoehe_175",
      plaster = "putztraeger_0"
    } = options;

    // Validate dimensions
    this.validateDimensions(width, height);

    // Get base price
    const basePrice = this.getBasePrice(width, height);

    // Get surcharges
    const modelSurcharge = MODEL_SURCHARGES[model] || 0.00;
    const driveSurcharge = DRIVE_SURCHARGES[drive] || 0.00;
    const colorSurcharge = COLOR_SURCHARGES[color] || 0.00;
    const boxSurcharge = BOX_HEIGHT_SURCHARGES[boxHeight] || 0.00;
    const plasterSurcharge = PLASTER_SURCHARGES[plaster] || 0.00;

    // Calculate totals
    const totalSurcharges = modelSurcharge + driveSurcharge + colorSurcharge + 
                           boxSurcharge + plasterSurcharge;
    const subtotal = basePrice + totalSurcharges;
    const discountAmount = subtotal * GLOBAL_DISCOUNT;
    const finalPrice = subtotal - discountAmount;

    return {
      dimensions: {
        width,
        height,
      },
      basePrice,
      surcharges: {
        model: modelSurcharge,
        drive: driveSurcharge,
        color: colorSurcharge,
        boxHeight: boxSurcharge,
        plaster: plasterSurcharge,
        total: totalSurcharges,
      },
      subtotal,
      discount: {
        percentage: GLOBAL_DISCOUNT * 100,
        amount: discountAmount,
      },
      finalPrice: Math.round(finalPrice * 100) / 100,
    };
  }

  /**
   * Calculate roll weight
   * Formula: rollgewicht = (height * width * 3.6 / 1000000) / division
   */
  weightCalculation(width, height, division = 1) {
    if (division <= 0) {
      throw new Error("Division must be greater than 0");
    }

    const weight = (height * width * 3.6 / 1000000) / division;
    return Math.round(weight * 100) / 100;
  }

  /**
   * Check if weight exceeds limit
   */
  checkWeightLimit(width, height, division = 1, maxWeight = 12) {
    const weight = this.weightCalculation(width, height, division);
    const isValid = weight < maxWeight;

    return {
      weight,
      maxWeight,
      valid: isValid,
      message: isValid 
        ? `Weight OK (${weight} kg)` 
        : `Weight exceeds limit (${weight} kg > ${maxWeight} kg)`,
    };
  }

  /**
   * Get all available dimensions
   */
  getAvailableDimensions() {
    const dimensions = new Set();
    
    Object.keys(BASE_PRICE_MATRIX).forEach(key => {
      const [width, height] = key.split('_').map(Number);
      dimensions.add(JSON.stringify({ width, height }));
    });

    return Array.from(dimensions).map(d => JSON.parse(d));
  }

  /**
   * Get price range for given width
   */
  getPriceRangeByWidth(width) {
    const prices = [];
    
    Object.entries(BASE_PRICE_MATRIX).forEach(([key, price]) => {
      const [w] = key.split('_').map(Number);
      if (w === width) {
        prices.push(price);
      }
    });

    if (prices.length === 0) {
      throw new Error(`No prices found for width ${width} mm`);
    }

    return {
      width,
      min: Math.min(...prices),
      max: Math.max(...prices),
      average: prices.reduce((a, b) => a + b) / prices.length,
    };
  }
}


// Export for Node.js/CommonJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    RolladenCalculator,
    BASE_PRICE_MATRIX,
    DRIVE_SURCHARGES,
    COLOR_SURCHARGES,
    BOX_HEIGHT_SURCHARGES,
    MODEL_SURCHARGES,
    PLASTER_SURCHARGES,
    GLOBAL_DISCOUNT,
  };
}


// Example usage
if (typeof require !== 'undefined' && require.main === module) {
  const calculator = new RolladenCalculator();

  console.log("\n=== EXAMPLE 1: Basic Configuration ===");
  const result1 = calculator.calculateTotalPrice(800, 1000);
  console.log(JSON.stringify(result1, null, 2));

  console.log("\n=== EXAMPLE 2: Premium Configuration ===");
  const result2 = calculator.calculateTotalPrice(2500, 1700, {
    model: "fn_rollladen_model_3",
    drive: "antriebsart_10",
    color: "farbe_panzer_7",
    boxHeight: "kastenhoehe_175",
    plaster: "putztraeger_3",
  });
  console.log(JSON.stringify(result2, null, 2));

  console.log("\n=== EXAMPLE 3: Weight Calculation ===");
  const weightResult = calculator.checkWeightLimit(2500, 1700, 1);
  console.log(JSON.stringify(weightResult, null, 2));

  console.log("\n=== EXAMPLE 4: Available Dimensions ===");
  const dimensions = calculator.getAvailableDimensions();
  console.log(`Total available configurations: ${dimensions.length}`);
  console.log("Sample dimensions:", dimensions.slice(0, 5));
}
