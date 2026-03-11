#!/usr/bin/env python3
"""
Vorsatzrollladen Configurator - Complete Research Data & Calculator
Source: https://www.fenstermaxx24.com/konfigurator/konfigurator-vorsatzrollladen/
Extraction Date: 2026-03-11
Product Type: Vorsatzrollladen (Roller Shutters - Surface Mount)

This module provides complete pricing data and calculation functions
for the Vorsatzrollladen configurator.
"""

# ============================================================================
# MODELS (fn_rollladen_model_*)
# ============================================================================
MODELS = {
    "fn_rollladen_model_1": {
        "name": "Aluprof SK 45 Grad",
        "description": "Aluminum profile SK 45 degree",
        "base_price": 171.98,
        "surcharge": 0.00,
        "has_insect_protection": False
    },
    "fn_rollladen_model_2": {
        "name": "Aluprof SKO-P Rund",
        "description": "Aluminum profile SKO-P Round",
        "base_price": 342.79,
        "surcharge": 170.81,
        "has_insect_protection": False
    },
    "fn_rollladen_model_3": {
        "name": "Aluprof SP-E 90 Grad Unterputz",
        "description": "Aluminum profile SP-E 90 degree Recessed",
        "base_price": 239.54,
        "surcharge": 67.56,
        "has_insect_protection": False
    },
    "fn_rollladen_model_4": {
        "name": "Aluprof SK 45 Grad + Insektenschutz",
        "description": "Aluminum profile SK 45 degree + Insect Protection",
        "base_price": 403.19,
        "surcharge": 231.21,
        "has_insect_protection": True
    },
    "fn_rollladen_model_5": {
        "name": "Aluprof SKO-P Rund + Insektenschutz",
        "description": "Aluminum profile SKO-P Round + Insect Protection",
        "base_price": 502.17,
        "surcharge": 330.19,
        "has_insect_protection": True
    },
    "fn_rollladen_model_6": {
        "name": "Aluprof SP-E 90 Grad Unterputz + Insektenschutz",
        "description": "Aluminum profile SP-E 90 degree Recessed + Insect Protection",
        "base_price": 331.36,
        "surcharge": 159.38,
        "has_insect_protection": True
    },
}

# ============================================================================
# BOX HEIGHT OPTIONS (kastenhoehe_*)
# ============================================================================
BOX_HEIGHTS = {
    "kastenhoehe_137": {
        "height_mm": 137,
        "description": "Standard box height",
        "surcharge": 0.00
    },
    "kastenhoehe_165": {
        "height_mm": 165,
        "description": "Medium box height",
        "surcharge": 0.00
    },
    "kastenhoehe_180": {
        "height_mm": 180,
        "description": "Large box height",
        "surcharge": 0.00
    },
}

# ============================================================================
# LAMELLA WIDTH (lamellenbreite_*)
# ============================================================================
LAMELLA_WIDTHS = {
    "lamellenbreite_39": {
        "width_mm": 39,
        "description": "Standard lamella width",
        "surcharge": 0.00
    },
}

# ============================================================================
# RAIL OPTIONS (schiene_*)
# ============================================================================
RAILS = {
    "schiene_1": {
        "name": "Standard Rails",
        "description": "Standard aluminum rails",
        "surcharge": 0.00
    },
    "schiene_2": {
        "name": "Premium Rails",
        "description": "Premium aluminum rails",
        "surcharge": 0.00
    },
}

# ============================================================================
# PANEL COLORS (farbe_panzer_*)
# ============================================================================
PANEL_COLORS = {
    "farbe_panzer_1": {
        "name": "Silber",
        "description": "Silver",
        "surcharge": 0.00,
        "premium": False
    },
    "farbe_panzer_2": {
        "name": "Weiss",
        "description": "White (Default)",
        "surcharge": 0.00,
        "premium": False
    },
    "farbe_panzer_3": {
        "name": "Grau",
        "description": "Gray",
        "surcharge": 0.00,
        "premium": False
    },
    "farbe_panzer_4": {
        "name": "Braun",
        "description": "Brown",
        "surcharge": 0.00,
        "premium": False
    },
    "farbe_panzer_5": {
        "name": "Dunkelbraun",
        "description": "Dark Brown",
        "surcharge": 0.00,
        "premium": False
    },
    "farbe_panzer_6": {
        "name": "Golden Oak",
        "description": "Golden Oak (Premium)",
        "surcharge": 27.86,
        "premium": True
    },
    "farbe_panzer_7": {
        "name": "Nussbaum",
        "description": "Walnut (Premium)",
        "surcharge": 63.14,
        "premium": True
    },
    "farbe_panzer_8": {
        "name": "Anthrazit",
        "description": "Anthracite",
        "surcharge": 0.00,
        "premium": False
    },
    "farbe_panzer_9": {
        "name": "Moosgruen",
        "description": "Moss Green",
        "surcharge": 0.00,
        "premium": False
    },
    "farbe_panzer_10": {
        "name": "Braun Metallic",
        "description": "Brown Metallic",
        "surcharge": 0.00,
        "premium": False
    },
    "farbe_panzer_11": {
        "name": "Grau Aluminium",
        "description": "Aluminum Gray",
        "surcharge": 0.00,
        "premium": False
    },
    "farbe_panzer_12": {
        "name": "Beige",
        "description": "Beige",
        "surcharge": 0.00,
        "premium": False
    },
}

# ============================================================================
# DRIVE TYPES (antriebsart_*)
# ============================================================================
DRIVE_TYPES = {
    "antriebsart_1": {
        "name": "Schwenkgurtwickler 14mm Weiss",
        "description": "Manual Belt Winder - White",
        "type": "Manual",
        "surcharge": 0.00
    },
    "antriebsart_2": {
        "name": "Schwenkgurtwickler 14mm Braun",
        "description": "Manual Belt Winder - Brown",
        "type": "Manual",
        "surcharge": 0.00
    },
    "antriebsart_4": {
        "name": "Getriebe mit Kurbel",
        "description": "Manual Gearbox with Crank",
        "type": "Manual",
        "surcharge": 188.80
    },
    "antriebsart_5": {
        "name": "Getriebe mit abnehmbarer Kurbel",
        "description": "Manual Gearbox with Removable Crank",
        "type": "Manual",
        "surcharge": 188.00
    },
    "antriebsart_6": {
        "name": "Motor mit Schalter und Hinderniserkennung (Somfy Gruppe)",
        "description": "Electric Motor with Switch and Obstacle Detection",
        "type": "Electric",
        "surcharge": 246.46
    },
    "antriebsart_7": {
        "name": "Motor mit Schluesselschalter und Hinderniserkennung (Somfy Gruppe)",
        "description": "Electric Motor with Key Switch and Obstacle Detection",
        "type": "Electric",
        "surcharge": 369.80
    },
    "antriebsart_8": {
        "name": "Motor Rescue fuer Flucht und Rettungsweg",
        "description": "Electric Rescue Motor for Emergency Routes",
        "type": "Electric - Emergency",
        "surcharge": 638.94
    },
    "antriebsart_9": {
        "name": "Motor Somfy OXIMO RS100 iO mit Hinderniserkennung (Funk-System)",
        "description": "Smart Motor Somfy OXIMO RS100 iO with Obstacle Detection",
        "type": "Electric - Smart/IoT",
        "surcharge": 576.95
    },
    "antriebsart_10": {
        "name": "Motor Somfy OXIMO RS100 iO mit Hinderniserkennung (Funk-System + Situo 1 pure Fernbedienung)",
        "description": "Smart Motor Somfy OXIMO RS100 iO with Remote Control",
        "type": "Electric - Smart/IoT with Remote",
        "surcharge": 769.05
    },
}

# ============================================================================
# DRIVE SIDE (antriebsseite_*)
# ============================================================================
DRIVE_SIDES = {
    "antriebsseite_0": {
        "name": "Links",
        "description": "Left side (view from inside)",
        "surcharge": 0.00
    },
    "antriebsseite_1": {
        "name": "Rechts",
        "description": "Right side (view from inside)",
        "surcharge": 0.00
    },
}

# ============================================================================
# DIMENSION CONSTRAINTS
# ============================================================================
DIMENSION_CONSTRAINTS = {
    "width": {
        "min": 800,
        "max": 2600,
        "unit": "mm"
    },
    "height": {
        "min": 1000,
        "max": 1300,
        "unit": "mm"
    }
}

# ============================================================================
# GLOBAL SETTINGS
# ============================================================================
GLOBAL_DISCOUNT = 0.40  # 40% discount
DISCOUNT_MULTIPLIER = 1 - GLOBAL_DISCOUNT  # 0.60


# ============================================================================
# VORSATZROLLLADEN CALCULATOR CLASS
# ============================================================================
class VorsatzrollladenCalculator:
    """
    Calculator for Vorsatzrollladen (surface mount roller shutters) pricing.
    
    This class provides methods to calculate prices based on configuration options,
    validate dimensions, and retrieve pricing information.
    """
    
    def __init__(self):
        """Initialize the calculator with all pricing data."""
        self.models = MODELS
        self.box_heights = BOX_HEIGHTS
        self.lamella_widths = LAMELLA_WIDTHS
        self.rails = RAILS
        self.colors = PANEL_COLORS
        self.drives = DRIVE_TYPES
        self.drive_sides = DRIVE_SIDES
        self.constraints = DIMENSION_CONSTRAINTS
        self.discount = GLOBAL_DISCOUNT
    
    def validate_dimensions(self, width_mm, height_mm):
        """
        Validate that dimensions are within acceptable ranges.
        
        Args:
            width_mm (int): Width in millimeters
            height_mm (int): Height in millimeters
        
        Returns:
            tuple: (is_valid, error_message)
        """
        width_min = self.constraints["width"]["min"]
        width_max = self.constraints["width"]["max"]
        height_min = self.constraints["height"]["min"]
        height_max = self.constraints["height"]["max"]
        
        if width_mm < width_min or width_mm > width_max:
            return False, f"Width must be between {width_min}mm and {width_max}mm"
        
        if height_mm < height_min or height_mm > height_max:
            return False, f"Height must be between {height_min}mm and {height_max}mm"
        
        return True, "OK"
    
    def calculate_price(self, model_id, width_mm, height_mm, color_id, drive_id,
                       box_height_id="kastenhoehe_137", rail_id="schiene_1",
                       drive_side_id="antriebsseite_0"):
        """
        Calculate the final price for a configuration.
        
        Args:
            model_id (str): Model ID (e.g., "fn_rollladen_model_1")
            width_mm (int): Width in millimeters
            height_mm (int): Height in millimeters
            color_id (str): Color ID (e.g., "farbe_panzer_2")
            drive_id (str): Drive type ID (e.g., "antriebsart_1")
            box_height_id (str): Box height ID (default: "kastenhoehe_137")
            rail_id (str): Rail ID (default: "schiene_1")
            drive_side_id (str): Drive side ID (default: "antriebsseite_0")
        
        Returns:
            dict: Detailed price breakdown
        """
        # Validate dimensions
        is_valid, error_msg = self.validate_dimensions(width_mm, height_mm)
        if not is_valid:
            return {"error": error_msg}
        
        # Get base price from model
        if model_id not in self.models:
            return {"error": f"Invalid model ID: {model_id}"}
        
        model = self.models[model_id]
        base_price = model["base_price"]
        
        # Add surcharges
        total_surcharge = 0.0
        surcharge_breakdown = {}
        
        # Model surcharge
        if model["surcharge"] > 0:
            surcharge_breakdown["model"] = model["surcharge"]
            total_surcharge += model["surcharge"]
        
        # Color surcharge
        if color_id in self.colors:
            color_surcharge = self.colors[color_id]["surcharge"]
            if color_surcharge > 0:
                surcharge_breakdown["color"] = color_surcharge
                total_surcharge += color_surcharge
        
        # Drive surcharge
        if drive_id in self.drives:
            drive_surcharge = self.drives[drive_id]["surcharge"]
            if drive_surcharge > 0:
                surcharge_breakdown["drive"] = drive_surcharge
                total_surcharge += drive_surcharge
        
        # Box height surcharge (typically 0)
        if box_height_id in self.box_heights:
            bh_surcharge = self.box_heights[box_height_id]["surcharge"]
            if bh_surcharge > 0:
                surcharge_breakdown["box_height"] = bh_surcharge
                total_surcharge += bh_surcharge
        
        # Rail surcharge (typically 0)
        if rail_id in self.rails:
            rail_surcharge = self.rails[rail_id]["surcharge"]
            if rail_surcharge > 0:
                surcharge_breakdown["rail"] = rail_surcharge
                total_surcharge += rail_surcharge
        
        # Drive side surcharge (typically 0)
        if drive_side_id in self.drive_sides:
            ds_surcharge = self.drive_sides[drive_side_id]["surcharge"]
            if ds_surcharge > 0:
                surcharge_breakdown["drive_side"] = ds_surcharge
                total_surcharge += ds_surcharge
        
        # Calculate final price
        price_before_discount = base_price + total_surcharge
        final_price = price_before_discount * DISCOUNT_MULTIPLIER
        
        return {
            "success": True,
            "base_price": round(base_price, 2),
            "surcharges": surcharge_breakdown,
            "total_surcharge": round(total_surcharge, 2),
            "price_before_discount": round(price_before_discount, 2),
            "discount_rate": f"{int(self.discount * 100)}%",
            "discount_amount": round(price_before_discount * self.discount, 2),
            "final_price": round(final_price, 2),
            "currency": "EUR"
        }
    
    def get_model_info(self, model_id):
        """Get information about a specific model."""
        if model_id in self.models:
            return self.models[model_id]
        return None
    
    def get_color_info(self, color_id):
        """Get information about a specific color."""
        if color_id in self.colors:
            return self.colors[color_id]
        return None
    
    def get_drive_info(self, drive_id):
        """Get information about a specific drive type."""
        if drive_id in self.drives:
            return self.drives[drive_id]
        return None
    
    def get_all_models(self):
        """Get list of all available models."""
        return [(k, v["name"]) for k, v in self.models.items()]
    
    def get_all_colors(self):
        """Get list of all available colors."""
        return [(k, v["name"]) for k, v in self.colors.items()]
    
    def get_all_drives(self):
        """Get list of all available drive types."""
        return [(k, v["name"]) for k, v in self.drives.items()]
    
    def get_premium_colors(self):
        """Get list of premium colors with surcharges."""
        return [(k, v["name"], v["surcharge"]) for k, v in self.colors.items() if v["premium"]]
    
    def get_electric_drives(self):
        """Get list of electric drive options."""
        return [(k, v["name"], v["surcharge"]) for k, v in self.drives.items() if "Electric" in v["type"]]


# ============================================================================
# EXAMPLE USAGE
# ============================================================================
if __name__ == "__main__":
    # Initialize calculator
    calc = VorsatzrollladenCalculator()
    
    print("=" * 80)
    print("VORSATZROLLLADEN CONFIGURATOR - CALCULATOR EXAMPLES")
    print("=" * 80)
    
    # Example 1: Basic configuration (Model 1, White, Manual)
    print("\n1. BASIC CONFIGURATION (Model 1, White, Manual)")
    print("-" * 80)
    result = calc.calculate_price(
        model_id="fn_rollladen_model_1",
        width_mm=800,
        height_mm=1000,
        color_id="farbe_panzer_2",
        drive_id="antriebsart_1"
    )
    for key, value in result.items():
        print(f"  {key}: {value}")
    
    # Example 2: Premium configuration (Model 2, Walnut, Electric Motor)
    print("\n2. PREMIUM CONFIGURATION (Model 2, Walnut, Electric Motor)")
    print("-" * 80)
    result = calc.calculate_price(
        model_id="fn_rollladen_model_2",
        width_mm=1300,
        height_mm=1000,
        color_id="farbe_panzer_7",
        drive_id="antriebsart_6"
    )
    for key, value in result.items():
        print(f"  {key}: {value}")
    
    # Example 3: Insect protection with Smart Motor
    print("\n3. INSECT PROTECTION WITH SMART MOTOR (Model 5)")
    print("-" * 80)
    result = calc.calculate_price(
        model_id="fn_rollladen_model_5",
        width_mm=1550,
        height_mm=1000,
        color_id="farbe_panzer_6",
        drive_id="antriebsart_10"
    )
    for key, value in result.items():
        print(f"  {key}: {value}")
    
    # Example 4: Large dimensions
    print("\n4. LARGE DIMENSIONS (1800mm x 1000mm)")
    print("-" * 80)
    result = calc.calculate_price(
        model_id="fn_rollladen_model_1",
        width_mm=1800,
        height_mm=1000,
        color_id="farbe_panzer_2",
        drive_id="antriebsart_1"
    )
    for key, value in result.items():
        print(f"  {key}: {value}")
    
    # Example 5: Invalid dimensions
    print("\n5. INVALID DIMENSIONS TEST (2700mm width - exceeds max)")
    print("-" * 80)
    result = calc.calculate_price(
        model_id="fn_rollladen_model_1",
        width_mm=2700,
        height_mm=1000,
        color_id="farbe_panzer_2",
        drive_id="antriebsart_1"
    )
    for key, value in result.items():
        print(f"  {key}: {value}")
    
    # List all available options
    print("\n" + "=" * 80)
    print("AVAILABLE OPTIONS")
    print("=" * 80)
    
    print("\nModels:")
    for model_id, name in calc.get_all_models():
        print(f"  - {model_id}: {name}")
    
    print("\nPremium Colors (with surcharge):")
    for color_id, name, surcharge in calc.get_premium_colors():
        print(f"  - {color_id}: {name} (+{surcharge} EUR)")
    
    print("\nElectric Drives:")
    for drive_id, name, surcharge in calc.get_electric_drives():
        print(f"  - {drive_id}: {name} (+{surcharge} EUR)")
    
    print("\nDimension Constraints:")
    print(f"  Width: {calc.constraints['width']['min']} - {calc.constraints['width']['max']} mm")
    print(f"  Height: {calc.constraints['height']['min']} - {calc.constraints['height']['max']} mm")
    
    print("\n" + "=" * 80)
