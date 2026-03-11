#!/usr/bin/env python3
"""
Insektenschutz Plissee Configurator - Data & Calculator
Source: https://www.fenstermaxx24.com/konfigurator/alu-insektenschutz-plissee/
Extraction Date: 2026-03-11
Product: Aluminium Insektenschutz-Plissee (Insect Protection Pleated Doors)
Manufacturer: Drutex
"""

# ============================================================================
# PLISSEE TYPES
# ============================================================================

PLISSEE_TYPES = {
    "1-teilige": {
        "id": "typ_1",
        "name": "1-teilige Plissee Tür",
        "description": "Single-part pleated door",
        "base_price": 906.50,
        "surcharge": 0.00,
        "width_multiplier": 1.0,  # Width not doubled
        "note": "Single panel pleated door"
    },
    "2-teilige": {
        "id": "typ_2",
        "name": "2-teilige Plissee Tür",
        "description": "Two-part pleated door (split in middle)",
        "base_price": 1693.50,
        "surcharge": 787.00,  # Compared to 1-teilige
        "width_multiplier": 2.0,  # Width automatically doubled
        "note": "Two-panel pleated door, width doubled"
    }
}

# ============================================================================
# OPENING DIRECTIONS
# ============================================================================

OPENING_DIRECTIONS = {
    "rechts-nach-links": {
        "id": "richtung_1",
        "name": "Plissee von Rechts nach Links schiebbar",
        "description": "Slides from right to left (view from inside)",
        "surcharge": 0.00,
        "default": True
    },
    "links-nach-rechts": {
        "id": "richtung_2",
        "name": "Plissee von Links nach Rechts schiebbar",
        "description": "Slides from left to right (view from inside)",
        "surcharge": 0.00,
        "default": False
    }
}

# ============================================================================
# FRAME COLORS (RAL-Farben Matt)
# ============================================================================

FRAME_COLORS = {
    "weiss-9016": {
        "id": "farbe_1",
        "name": "Weiß",
        "ral_code": "9016",
        "surcharge": 0.00,
        "default": True
    },
    "anthrazitgrau-7016": {
        "id": "farbe_2",
        "name": "Anthrazitgrau",
        "ral_code": "7016",
        "surcharge": 0.00
    },
    "graubraun-8019": {
        "id": "farbe_3",
        "name": "Graubraun",
        "ral_code": "8019",
        "surcharge": 0.00
    },
    "tiefschwarz-9005": {
        "id": "farbe_4",
        "name": "Tiefschwarz",
        "ral_code": "9005",
        "surcharge": 0.00
    },
    "white-aluminium-9006": {
        "id": "farbe_5",
        "name": "White aluminium",
        "ral_code": "9006",
        "surcharge": 0.00
    }
}

# ============================================================================
# NET COLORS
# ============================================================================

NET_COLORS = {
    "schwarz": {
        "id": "netzfarbe_1",
        "name": "Schwarz",
        "description": "Black mesh",
        "surcharge": 0.00,
        "default": True
    }
}

# ============================================================================
# DIMENSION CONSTRAINTS
# ============================================================================

DIMENSION_CONSTRAINTS = {
    "width": {
        "min": 700,
        "max": 2400,  # For 1-teilige; 3600 for 2-teilige
        "default": 700,
        "unit": "mm"
    },
    "height": {
        "min": 1900,
        "max": 2600,
        "default": 1900,
        "unit": "mm"
    }
}

# ============================================================================
# PRICE MATRIX (Size-based pricing)
# ============================================================================

# Extracted from systematic testing with 250mm increments
PRICE_MATRIX = {
    # Format: (width, height, plissee_type) -> base_price
    # 1-teilige Plissee
    (700, 1900, "1-teilige"): 906.50,
    (950, 1900, "1-teilige"): 1050.00,  # Estimated
    (1200, 1900, "1-teilige"): 1155.00,  # Estimated
    
    # 2-teilige Plissee (width is input, actual width is doubled)
    (1025, 1900, "2-teilige"): 1693.50,  # 2050mm displayed
    (1200, 1900, "2-teilige"): 1693.50,  # Same price tier
    (1200, 2050, "2-teilige"): 1855.43,  # Estimated
    (1200, 2300, "2-teilige"): 1904.10,  # Estimated
    (1450, 2300, "2-teilige"): 1904.10,  # Width doesn't change price
}

# ============================================================================
# GLOBAL SETTINGS
# ============================================================================

DISCOUNT_RATE = 0.40  # 40% discount
DISCOUNT_MULTIPLIER = 1 - DISCOUNT_RATE  # 0.60

# ============================================================================
# INSEKTENSCHUTZ PLISSEE CALCULATOR CLASS
# ============================================================================

class InsektenschutzPlisseeCalculator:
    """
    Calculator for Insektenschutz Plissee configurations.
    
    Features:
    - Price calculation with all surcharges
    - Dimension validation
    - Configuration management
    """
    
    def __init__(self):
        self.reset_configuration()
    
    def reset_configuration(self):
        """Reset to default configuration."""
        self.config = {
            "plissee_type": "1-teilige",
            "width": 700,
            "height": 1900,
            "opening_direction": "rechts-nach-links",
            "frame_color": "weiss-9016",
            "net_color": "schwarz"
        }
    
    def set_plissee_type(self, plissee_type):
        """Set plissee type (1-teilige or 2-teilige)."""
        if plissee_type not in PLISSEE_TYPES:
            raise ValueError(f"Invalid plissee type: {plissee_type}")
        self.config["plissee_type"] = plissee_type
        return self
    
    def set_dimensions(self, width, height):
        """Set width and height with validation."""
        constraints = DIMENSION_CONSTRAINTS
        
        if width < constraints["width"]["min"] or width > constraints["width"]["max"]:
            raise ValueError(
                f"Width must be between {constraints['width']['min']} "
                f"and {constraints['width']['max']} mm"
            )
        
        if height < constraints["height"]["min"] or height > constraints["height"]["max"]:
            raise ValueError(
                f"Height must be between {constraints['height']['min']} "
                f"and {constraints['height']['max']} mm"
            )
        
        self.config["width"] = width
        self.config["height"] = height
        return self
    
    def set_opening_direction(self, direction):
        """Set opening direction."""
        if direction not in OPENING_DIRECTIONS:
            raise ValueError(f"Invalid opening direction: {direction}")
        self.config["opening_direction"] = direction
        return self
    
    def set_frame_color(self, color):
        """Set frame color."""
        if color not in FRAME_COLORS:
            raise ValueError(f"Invalid frame color: {color}")
        self.config["frame_color"] = color
        return self
    
    def set_net_color(self, color):
        """Set net color."""
        if color not in NET_COLORS:
            raise ValueError(f"Invalid net color: {color}")
        self.config["net_color"] = color
        return self
    
    def get_base_price(self):
        """Get base price for current plissee type."""
        plissee_type = self.config["plissee_type"]
        return PLISSEE_TYPES[plissee_type]["base_price"]
    
    def calculate_surcharges(self):
        """Calculate total surcharges."""
        surcharges = {}
        
        # Plissee type surcharge
        plissee_type = self.config["plissee_type"]
        surcharges["plissee_type"] = PLISSEE_TYPES[plissee_type]["surcharge"]
        
        # Opening direction surcharge (always 0)
        direction = self.config["opening_direction"]
        surcharges["opening_direction"] = OPENING_DIRECTIONS[direction]["surcharge"]
        
        # Frame color surcharge (always 0)
        color = self.config["frame_color"]
        surcharges["frame_color"] = FRAME_COLORS[color]["surcharge"]
        
        # Net color surcharge (always 0)
        net_color = self.config["net_color"]
        surcharges["net_color"] = NET_COLORS[net_color]["surcharge"]
        
        return surcharges
    
    def calculate_total_surcharge(self):
        """Calculate total surcharge amount."""
        surcharges = self.calculate_surcharges()
        return sum(surcharges.values())
    
    def calculate_price(self):
        """
        Calculate final price with discount.
        
        Formula: (Base Price + Surcharges) × (1 - Discount Rate)
        """
        base_price = self.get_base_price()
        total_surcharge = self.calculate_total_surcharge()
        
        price_before_discount = base_price + total_surcharge
        final_price = price_before_discount * DISCOUNT_MULTIPLIER
        
        return {
            "base_price": base_price,
            "surcharges": self.calculate_surcharges(),
            "total_surcharge": total_surcharge,
            "price_before_discount": price_before_discount,
            "discount_rate": DISCOUNT_RATE,
            "discount_amount": price_before_discount * DISCOUNT_RATE,
            "final_price": round(final_price, 2),
            "savings": round(price_before_discount * DISCOUNT_RATE, 2)
        }
    
    def calculate_area(self):
        """Calculate area in m²."""
        width = self.config["width"]
        height = self.config["height"]
        
        # For 2-teilige, display width is doubled but area is based on actual width
        if self.config["plissee_type"] == "2-teilige":
            actual_width = width * 2
        else:
            actual_width = width
        
        area_mm2 = actual_width * height
        area_m2 = area_mm2 / 1_000_000
        
        return round(area_m2, 2)
    
    def get_configuration(self):
        """Get current configuration."""
        return self.config.copy()
    
    def get_price_breakdown(self):
        """Get detailed price breakdown."""
        price_info = self.calculate_price()
        
        return {
            "configuration": self.get_configuration(),
            "area_m2": self.calculate_area(),
            "price_info": price_info,
            "price_per_m2": round(price_info["final_price"] / self.calculate_area(), 2)
        }
    
    def list_plissee_types(self):
        """List all available plissee types."""
        return PLISSEE_TYPES
    
    def list_opening_directions(self):
        """List all available opening directions."""
        return OPENING_DIRECTIONS
    
    def list_frame_colors(self):
        """List all available frame colors."""
        return FRAME_COLORS
    
    def list_net_colors(self):
        """List all available net colors."""
        return NET_COLORS


# ============================================================================
# EXAMPLE USAGE
# ============================================================================

if __name__ == "__main__":
    print("=" * 80)
    print("INSEKTENSCHUTZ PLISSEE CONFIGURATOR - EXAMPLES")
    print("=" * 80)
    
    # Example 1: Default configuration (1-teilige, 700×1900mm, White, Right-to-Left)
    print("\n[EXAMPLE 1] Default Configuration")
    print("-" * 80)
    calc = InsektenschutzPlisseeCalculator()
    breakdown = calc.get_price_breakdown()
    
    print(f"Plissee Type: {breakdown['configuration']['plissee_type']}")
    print(f"Dimensions: {breakdown['configuration']['width']}×{breakdown['configuration']['height']}mm")
    print(f"Area: {breakdown['area_m2']} m²")
    print(f"Base Price: {breakdown['price_info']['base_price']:.2f} EUR")
    print(f"Total Surcharge: {breakdown['price_info']['total_surcharge']:.2f} EUR")
    print(f"Price Before Discount: {breakdown['price_info']['price_before_discount']:.2f} EUR")
    print(f"Discount (40%): -{breakdown['price_info']['discount_amount']:.2f} EUR")
    print(f"FINAL PRICE: {breakdown['price_info']['final_price']:.2f} EUR")
    print(f"Price per m²: {breakdown['price_per_m2']:.2f} EUR/m²")
    
    # Example 2: 2-teilige Plissee
    print("\n[EXAMPLE 2] 2-teilige Plissee (2050×1900mm)")
    print("-" * 80)
    calc2 = InsektenschutzPlisseeCalculator()
    calc2.set_plissee_type("2-teilige")
    calc2.set_dimensions(1025, 1900)  # Input 1025, displays as 2050
    breakdown2 = calc2.get_price_breakdown()
    
    print(f"Plissee Type: {breakdown2['configuration']['plissee_type']}")
    print(f"Input Dimensions: {breakdown2['configuration']['width']}×{breakdown2['configuration']['height']}mm")
    print(f"Displayed Width: {breakdown2['configuration']['width'] * 2}mm (doubled)")
    print(f"Area: {breakdown2['area_m2']} m²")
    print(f"Base Price: {breakdown2['price_info']['base_price']:.2f} EUR")
    print(f"Total Surcharge: {breakdown2['price_info']['total_surcharge']:.2f} EUR")
    print(f"Price Before Discount: {breakdown2['price_info']['price_before_discount']:.2f} EUR")
    print(f"Discount (40%): -{breakdown2['price_info']['discount_amount']:.2f} EUR")
    print(f"FINAL PRICE: {breakdown2['price_info']['final_price']:.2f} EUR")
    print(f"Price per m²: {breakdown2['price_per_m2']:.2f} EUR/m²")
    
    # Example 3: Custom configuration with Anthrazitgrau color
    print("\n[EXAMPLE 3] Custom: 1200×2300mm, Anthrazitgrau, Left-to-Right")
    print("-" * 80)
    calc3 = InsektenschutzPlisseeCalculator()
    calc3.set_plissee_type("1-teilige")
    calc3.set_dimensions(1200, 2300)
    calc3.set_opening_direction("links-nach-rechts")
    calc3.set_frame_color("anthrazitgrau-7016")
    breakdown3 = calc3.get_price_breakdown()
    
    print(f"Plissee Type: {breakdown3['configuration']['plissee_type']}")
    print(f"Dimensions: {breakdown3['configuration']['width']}×{breakdown3['configuration']['height']}mm")
    print(f"Frame Color: {breakdown3['configuration']['frame_color']}")
    print(f"Opening Direction: {breakdown3['configuration']['opening_direction']}")
    print(f"Area: {breakdown3['area_m2']} m²")
    print(f"Base Price: {breakdown3['price_info']['base_price']:.2f} EUR")
    print(f"Total Surcharge: {breakdown3['price_info']['total_surcharge']:.2f} EUR")
    print(f"Price Before Discount: {breakdown3['price_info']['price_before_discount']:.2f} EUR")
    print(f"Discount (40%): -{breakdown3['price_info']['discount_amount']:.2f} EUR")
    print(f"FINAL PRICE: {breakdown3['price_info']['final_price']:.2f} EUR")
    print(f"Price per m²: {breakdown3['price_per_m2']:.2f} EUR/m²")
    
    # Example 4: Size comparison (height impact)
    print("\n[EXAMPLE 4] Size Comparison - Height Impact")
    print("-" * 80)
    heights = [1900, 2050, 2300]
    for h in heights:
        calc_h = InsektenschutzPlisseeCalculator()
        calc_h.set_plissee_type("1-teilige")
        calc_h.set_dimensions(1200, h)
        breakdown_h = calc_h.get_price_breakdown()
        print(f"1200×{h}mm: {breakdown_h['price_info']['final_price']:.2f} EUR "
              f"({breakdown_h['area_m2']} m², {breakdown_h['price_per_m2']:.2f} EUR/m²)")
    
    # Example 5: Available options
    print("\n[EXAMPLE 5] Available Options")
    print("-" * 80)
    calc5 = InsektenschutzPlisseeCalculator()
    
    print("Plissee Types:")
    for key, value in calc5.list_plissee_types().items():
        print(f"  - {value['name']}: {value['base_price']:.2f} EUR "
              f"(+{value['surcharge']:.2f} EUR surcharge)")
    
    print("\nFrame Colors (all 0.00 EUR surcharge):")
    for key, value in calc5.list_frame_colors().items():
        print(f"  - {value['name']} (RAL {value['ral_code']})")
    
    print("\nOpening Directions (all 0.00 EUR surcharge):")
    for key, value in calc5.list_opening_directions().items():
        print(f"  - {value['name']}")
    
    print("\nNet Colors (all 0.00 EUR surcharge):")
    for key, value in calc5.list_net_colors().items():
        print(f"  - {value['name']}")
    
    print("\n" + "=" * 80)
    print("END OF EXAMPLES")
    print("=" * 80)
