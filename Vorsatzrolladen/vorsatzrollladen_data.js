/**
 * Vorsatzrollladen Configurator - Complete Research Data & Calculator
 * Source: https://www.fenstermaxx24.com/konfigurator/konfigurator-vorsatzrollladen/
 * Extraction Date: 2026-03-11
 * Product Type: Vorsatzrollladen (Roller Shutters - Surface Mount)
 * 
 * This module provides complete pricing data and calculation functions
 * for the Vorsatzrollladen configurator.
 */

// ============================================================================
// MODELS (fn_rollladen_model_*)
// ============================================================================
const MODELS = {
  fn_rollladen_model_1: {
    name: "Aluprof SK 45 Grad",
    description: "Aluminum profile SK 45 degree",
    basePrice: 171.98,
    surcharge: 0.00,
    hasInsectProtection: false
  },
  fn_rollladen_model_2: {
    name: "Aluprof SKO-P Rund",
    description: "Aluminum profile SKO-P Round",
    basePrice: 342.79,
    surcharge: 170.81,
    hasInsectProtection: false
  },
  fn_rollladen_model_3: {
    name: "Aluprof SP-E 90 Grad Unterputz",
    description: "Aluminum profile SP-E 90 degree Recessed",
    basePrice: 239.54,
    surcharge: 67.56,
    hasInsectProtection: false
  },
  fn_rollladen_model_4: {
    name: "Aluprof SK 45 Grad + Insektenschutz",
    description: "Aluminum profile SK 45 degree + Insect Protection",
    basePrice: 403.19,
    surcharge: 231.21,
    hasInsectProtection: true
  },
  fn_rollladen_model_5: {
    name: "Aluprof SKO-P Rund + Insektenschutz",
    description: "Aluminum profile SKO-P Round + Insect Protection",
    basePrice: 502.17,
    surcharge: 330.19,
    hasInsectProtection: true
  },
  fn_rollladen_model_6: {
    name: "Aluprof SP-E 90 Grad Unterputz + Insektenschutz",
    description: "Aluminum profile SP-E 90 degree Recessed + Insect Protection",
    basePrice: 331.36,
    surcharge: 159.38,
    hasInsectProtection: true
  }
};

// ============================================================================
// BOX HEIGHT OPTIONS (kastenhoehe_*)
// ============================================================================
const BOX_HEIGHTS = {
  kastenhoehe_137: {
    heightMm: 137,
    description: "Standard box height",
    surcharge: 0.00
  },
  kastenhoehe_165: {
    heightMm: 165,
    description: "Medium box height",
    surcharge: 0.00
  },
  kastenhoehe_180: {
    heightMm: 180,
    description: "Large box height",
    surcharge: 0.00
  }
};

// ============================================================================
// LAMELLA WIDTH (lamellenbreite_*)
// ============================================================================
const LAMELLA_WIDTHS = {
  lamellenbreite_39: {
    widthMm: 39,
    description: "Standard lamella width",
    surcharge: 0.00
  }
};

// ============================================================================
// RAIL OPTIONS (schiene_*)
// ============================================================================
const RAILS = {
  schiene_1: {
    name: "Standard Rails",
    description: "Standard aluminum rails",
    surcharge: 0.00
  },
  schiene_2: {
    name: "Premium Rails",
    description: "Premium aluminum rails",
    surcharge: 0.00
  }
};

// ============================================================================
// PANEL COLORS (farbe_panzer_*)
// ============================================================================
const PANEL_COLORS = {
  farbe_panzer_1: {
    name: "Silber",
    description: "Silver",
    surcharge: 0.00,
    premium: false
  },
  farbe_panzer_2: {
    name: "Weiss",
    description: "White (Default)",
    surcharge: 0.00,
    premium: false
  },
  farbe_panzer_3: {
    name: "Grau",
    description: "Gray",
    surcharge: 0.00,
    premium: false
  },
  farbe_panzer_4: {
    name: "Braun",
    description: "Brown",
    surcharge: 0.00,
    premium: false
  },
  farbe_panzer_5: {
    name: "Dunkelbraun",
    description: "Dark Brown",
    surcharge: 0.00,
    premium: false
  },
  farbe_panzer_6: {
    name: "Golden Oak",
    description: "Golden Oak (Premium)",
    surcharge: 27.86,
    premium: true
  },
  farbe_panzer_7: {
    name: "Nussbaum",
    description: "Walnut (Premium)",
    surcharge: 63.14,
    premium: true
  },
  farbe_panzer_8: {
    name: "Anthrazit",
    description: "Anthracite",
    surcharge: 0.00,
    premium: false
  },
  farbe_panzer_9: {
    name: "Moosgruen",
    description: "Moss Green",
    surcharge: 0.00,
    premium: false
  },
  farbe_panzer_10: {
    name: "Braun Metallic",
    description: "Brown Metallic",
    surcharge: 0.00,
    premium: false
  },
  farbe_panzer_11: {
    name: "Grau Aluminium",
    description: "Aluminum Gray",
    surcharge: 0.00,
    premium: false
  },
  farbe_panzer_12: {
    name: "Beige",
    description: "Beige",
    surcharge: 0.00,
    premium: false
  }
};

// ============================================================================
// DRIVE TYPES (antriebsart_*)
// ============================================================================
const DRIVE_TYPES = {
  antriebsart_1: {
    name: "Schwenkgurtwickler 14mm Weiss",
    description: "Manual Belt Winder - White",
    type: "Manual",
    surcharge: 0.00
  },
  antriebsart_2: {
    name: "Schwenkgurtwickler 14mm Braun",
    description: "Manual Belt Winder - Brown",
    type: "Manual",
    surcharge: 0.00
  },
  antriebsart_4: {
    name: "Getriebe mit Kurbel",
    description: "Manual Gearbox with Crank",
    type: "Manual",
    surcharge: 188.80
  },
  antriebsart_5: {
    name: "Getriebe mit abnehmbarer Kurbel",
    description: "Manual Gearbox with Removable Crank",
    type: "Manual",
    surcharge: 188.00
  },
  antriebsart_6: {
    name: "Motor mit Schalter und Hinderniserkennung (Somfy Gruppe)",
    description: "Electric Motor with Switch and Obstacle Detection",
    type: "Electric",
    surcharge: 246.46
  },
  antriebsart_7: {
    name: "Motor mit Schluesselschalter und Hinderniserkennung (Somfy Gruppe)",
    description: "Electric Motor with Key Switch and Obstacle Detection",
    type: "Electric",
    surcharge: 369.80
  },
  antriebsart_8: {
    name: "Motor Rescue fuer Flucht und Rettungsweg",
    description: "Electric Rescue Motor for Emergency Routes",
    type: "Electric - Emergency",
    surcharge: 638.94
  },
  antriebsart_9: {
    name: "Motor Somfy OXIMO RS100 iO mit Hinderniserkennung (Funk-System)",
    description: "Smart Motor Somfy OXIMO RS100 iO with Obstacle Detection",
    type: "Electric - Smart/IoT",
    surcharge: 576.95
  },
  antriebsart_10: {
    name: "Motor Somfy OXIMO RS100 iO mit Hinderniserkennung (Funk-System + Situo 1 pure Fernbedienung)",
    description: "Smart Motor Somfy OXIMO RS100 iO with Remote Control",
    type: "Electric - Smart/IoT with Remote",
    surcharge: 769.05
  }
};

// ============================================================================
// DRIVE SIDE (antriebsseite_*)
// ============================================================================
const DRIVE_SIDES = {
  antriebsseite_0: {
    name: "Links",
    description: "Left side (view from inside)",
    surcharge: 0.00
  },
  antriebsseite_1: {
    name: "Rechts",
    description: "Right side (view from inside)",
    surcharge: 0.00
  }
};

// ============================================================================
// DIMENSION CONSTRAINTS
// ============================================================================
const DIMENSION_CONSTRAINTS = {
  width: {
    min: 800,
    max: 2600,
    unit: "mm"
  },
  height: {
    min: 1000,
    max: 1300,
    unit: "mm"
  }
};

// ============================================================================
// GLOBAL SETTINGS
// ============================================================================
const GLOBAL_DISCOUNT = 0.40; // 40% discount
const DISCOUNT_MULTIPLIER = 1 - GLOBAL_DISCOUNT; // 0.60

// ============================================================================
// VORSATZROLLLADEN CALCULATOR CLASS
// ============================================================================
class VorsatzrollladenCalculator {
  /**
   * Initialize the calculator with all pricing data.
   */
  constructor() {
    this.models = MODELS;
    this.boxHeights = BOX_HEIGHTS;
    this.lamellaWidths = LAMELLA_WIDTHS;
    this.rails = RAILS;
    this.colors = PANEL_COLORS;
    this.drives = DRIVE_TYPES;
    this.driveSides = DRIVE_SIDES;
    this.constraints = DIMENSION_CONSTRAINTS;
    this.discount = GLOBAL_DISCOUNT;
  }

  /**
   * Validate that dimensions are within acceptable ranges.
   * @param {number} widthMm - Width in millimeters
   * @param {number} heightMm - Height in millimeters
   * @returns {object} {isValid: boolean, errorMessage: string}
   */
  validateDimensions(widthMm, heightMm) {
    const widthMin = this.constraints.width.min;
    const widthMax = this.constraints.width.max;
    const heightMin = this.constraints.height.min;
    const heightMax = this.constraints.height.max;

    if (widthMm < widthMin || widthMm > widthMax) {
      return {
        isValid: false,
        errorMessage: `Width must be between ${widthMin}mm and ${widthMax}mm`
      };
    }

    if (heightMm < heightMin || heightMm > heightMax) {
      return {
        isValid: false,
        errorMessage: `Height must be between ${heightMin}mm and ${heightMax}mm`
      };
    }

    return { isValid: true, errorMessage: "OK" };
  }

  /**
   * Calculate the final price for a configuration.
   * @param {object} config - Configuration object
   * @returns {object} Detailed price breakdown
   */
  calculatePrice(config) {
    const {
      modelId,
      widthMm,
      heightMm,
      colorId,
      driveId,
      boxHeightId = "kastenhoehe_137",
      railId = "schiene_1",
      driveSideId = "antriebsseite_0"
    } = config;

    // Validate dimensions
    const validation = this.validateDimensions(widthMm, heightMm);
    if (!validation.isValid) {
      return { error: validation.errorMessage };
    }

    // Get base price from model
    if (!this.models[modelId]) {
      return { error: `Invalid model ID: ${modelId}` };
    }

    const model = this.models[modelId];
    const basePrice = model.basePrice;

    // Add surcharges
    let totalSurcharge = 0;
    const surchargeBreakdown = {};

    // Model surcharge
    if (model.surcharge > 0) {
      surchargeBreakdown.model = model.surcharge;
      totalSurcharge += model.surcharge;
    }

    // Color surcharge
    if (this.colors[colorId]) {
      const colorSurcharge = this.colors[colorId].surcharge;
      if (colorSurcharge > 0) {
        surchargeBreakdown.color = colorSurcharge;
        totalSurcharge += colorSurcharge;
      }
    }

    // Drive surcharge
    if (this.drives[driveId]) {
      const driveSurcharge = this.drives[driveId].surcharge;
      if (driveSurcharge > 0) {
        surchargeBreakdown.drive = driveSurcharge;
        totalSurcharge += driveSurcharge;
      }
    }

    // Box height surcharge (typically 0)
    if (this.boxHeights[boxHeightId]) {
      const bhSurcharge = this.boxHeights[boxHeightId].surcharge;
      if (bhSurcharge > 0) {
        surchargeBreakdown.boxHeight = bhSurcharge;
        totalSurcharge += bhSurcharge;
      }
    }

    // Rail surcharge (typically 0)
    if (this.rails[railId]) {
      const railSurcharge = this.rails[railId].surcharge;
      if (railSurcharge > 0) {
        surchargeBreakdown.rail = railSurcharge;
        totalSurcharge += railSurcharge;
      }
    }

    // Drive side surcharge (typically 0)
    if (this.driveSides[driveSideId]) {
      const dsSurcharge = this.driveSides[driveSideId].surcharge;
      if (dsSurcharge > 0) {
        surchargeBreakdown.driveSide = dsSurcharge;
        totalSurcharge += dsSurcharge;
      }
    }

    // Calculate final price
    const priceBeforeDiscount = basePrice + totalSurcharge;
    const finalPrice = priceBeforeDiscount * DISCOUNT_MULTIPLIER;

    return {
      success: true,
      basePrice: Math.round(basePrice * 100) / 100,
      surcharges: surchargeBreakdown,
      totalSurcharge: Math.round(totalSurcharge * 100) / 100,
      priceBeforeDiscount: Math.round(priceBeforeDiscount * 100) / 100,
      discountRate: `${Math.round(this.discount * 100)}%`,
      discountAmount: Math.round(priceBeforeDiscount * this.discount * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100,
      currency: "EUR"
    };
  }

  /**
   * Get information about a specific model.
   */
  getModelInfo(modelId) {
    return this.models[modelId] || null;
  }

  /**
   * Get information about a specific color.
   */
  getColorInfo(colorId) {
    return this.colors[colorId] || null;
  }

  /**
   * Get information about a specific drive type.
   */
  getDriveInfo(driveId) {
    return this.drives[driveId] || null;
  }

  /**
   * Get list of all available models.
   */
  getAllModels() {
    return Object.entries(this.models).map(([id, model]) => ({
      id,
      name: model.name
    }));
  }

  /**
   * Get list of all available colors.
   */
  getAllColors() {
    return Object.entries(this.colors).map(([id, color]) => ({
      id,
      name: color.name
    }));
  }

  /**
   * Get list of all available drive types.
   */
  getAllDrives() {
    return Object.entries(this.drives).map(([id, drive]) => ({
      id,
      name: drive.name
    }));
  }

  /**
   * Get list of premium colors with surcharges.
   */
  getPremiumColors() {
    return Object.entries(this.colors)
      .filter(([_, color]) => color.premium)
      .map(([id, color]) => ({
        id,
        name: color.name,
        surcharge: color.surcharge
      }));
  }

  /**
   * Get list of electric drive options.
   */
  getElectricDrives() {
    return Object.entries(this.drives)
      .filter(([_, drive]) => drive.type.includes("Electric"))
      .map(([id, drive]) => ({
        id,
        name: drive.name,
        surcharge: drive.surcharge
      }));
  }
}

// ============================================================================
// EXAMPLE USAGE (Node.js)
// ============================================================================
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    VorsatzrollladenCalculator,
    MODELS,
    BOX_HEIGHTS,
    LAMELLA_WIDTHS,
    RAILS,
    PANEL_COLORS,
    DRIVE_TYPES,
    DRIVE_SIDES,
    DIMENSION_CONSTRAINTS,
    GLOBAL_DISCOUNT,
    DISCOUNT_MULTIPLIER
  };

  // Example usage
  if (require.main === module) {
    const calc = new VorsatzrollladenCalculator();

    console.log("=".repeat(80));
    console.log("VORSATZROLLLADEN CONFIGURATOR - CALCULATOR EXAMPLES");
    console.log("=".repeat(80));

    // Example 1: Basic configuration
    console.log("\n1. BASIC CONFIGURATION (Model 1, White, Manual)");
    console.log("-".repeat(80));
    const result1 = calc.calculatePrice({
      modelId: "fn_rollladen_model_1",
      widthMm: 800,
      heightMm: 1000,
      colorId: "farbe_panzer_2",
      driveId: "antriebsart_1"
    });
    console.log(JSON.stringify(result1, null, 2));

    // Example 2: Premium configuration
    console.log("\n2. PREMIUM CONFIGURATION (Model 2, Walnut, Electric Motor)");
    console.log("-".repeat(80));
    const result2 = calc.calculatePrice({
      modelId: "fn_rollladen_model_2",
      widthMm: 1300,
      heightMm: 1000,
      colorId: "farbe_panzer_7",
      driveId: "antriebsart_6"
    });
    console.log(JSON.stringify(result2, null, 2));

    // Example 3: Insect protection with Smart Motor
    console.log("\n3. INSECT PROTECTION WITH SMART MOTOR (Model 5)");
    console.log("-".repeat(80));
    const result3 = calc.calculatePrice({
      modelId: "fn_rollladen_model_5",
      widthMm: 1550,
      heightMm: 1000,
      colorId: "farbe_panzer_6",
      driveId: "antriebsart_10"
    });
    console.log(JSON.stringify(result3, null, 2));

    // Example 4: Invalid dimensions
    console.log("\n4. INVALID DIMENSIONS TEST (2700mm width - exceeds max)");
    console.log("-".repeat(80));
    const result4 = calc.calculatePrice({
      modelId: "fn_rollladen_model_1",
      widthMm: 2700,
      heightMm: 1000,
      colorId: "farbe_panzer_2",
      driveId: "antriebsart_1"
    });
    console.log(JSON.stringify(result4, null, 2));

    console.log("\n" + "=".repeat(80));
  }
}
