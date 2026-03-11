#!/usr/bin/env python3
"""
Aufsatzrollladen Configurator - Complete Research Data & Calculator
Source: https://www.fenstermaxx24.com/konfigurator/konfigurator-aufsatzrollladen/
Extraction Date: 2026-03-11
"""

# ============================================================================
# COMPLETE BASE PRICE MATRIX (All 24 configurations)
# ============================================================================
BASE_PRICE_MATRIX = {
    (800, 1000): 286.00,
    (800, 1200): 301.66,
    (800, 1400): 318.36,
    (800, 1700): 343.41,
    (1000, 1000): 317.32,
    (1000, 1200): 336.10,
    (1000, 1400): 355.94,
    (1000, 1700): 384.12,
    (1200, 1000): 348.63,
    (1200, 1200): 370.55,
    (1200, 1400): 392.47,
    (1200, 1700): 424.83,
    (1500, 1000): 395.60,
    (1500, 1200): 420.65,
    (1500, 1400): 446.75,
    (1500, 1700): 486.41,
    (2000, 1000): 473.88,
    (2000, 1200): 507.29,
    (2000, 1400): 539.64,
    (2000, 1700): 592.88,
    (2500, 1000): 552.16,
    (2500, 1200): 593.92,
    (2500, 1400): 632.54,
    (2500, 1700): 699.35,
}

# ============================================================================
# ROLLER SHUTTER MODELS (fn_rollladen_model_*)
# ============================================================================
MODELS = {
    "fn_rollladen_model_1": {
        "name": "Aufsatzrollladen mit Revision von Unten",
        "description": "Roller shutter with bottom revision",
        "surcharge": 0.00
    },
    "fn_rollladen_model_2": {
        "name": "Aufsatzrollladen mit Revision von der Seite",
        "description": "Roller shutter with side revision",
        "surcharge": 0.00
    },
    "fn_rollladen_model_3": {
        "name": "Aufsatzrollladen mit Revision von Unten + Insektenschutz",
        "description": "Roller shutter with bottom revision + insect protection",
        "surcharge": 159.38
    },
    "fn_rollladen_model_4": {
        "name": "Aufsatzrollladen mit Revision von der Seite + Insektenschutz",
        "description": "Roller shutter with side revision + insect protection",
        "surcharge": 159.38
    },
}

# ============================================================================
# DRIVE TYPES & MOTORS (antriebsart_*)
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
        "name": "Motor mit Schalter und Hinderniserkennung",
        "description": "Electric Motor with Switch and Obstacle Detection",
        "type": "Electric",
        "surcharge": 246.46
    },
    "antriebsart_7": {
        "name": "Motor mit Schluesselschalter und Hinderniserkennung",
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
        "name": "Motor Somfy OXIMO RS100 iO",
        "description": "Smart Motor Somfy OXIMO RS100 iO",
        "type": "Electric - Smart/IoT",
        "surcharge": 576.95
    },
    "antriebsart_10": {
        "name": "Motor Somfy OXIMO RS100 iO + Fernbedienung",
        "description": "Smart Motor Somfy OXIMO RS100 iO with Remote Control",
        "type": "Electric - Smart/IoT with Remote",
        "surcharge": 769.05
    },
}

# ============================================================================
# PANEL COLORS (farbe_panzer_*)
# ============================================================================
PANEL_COLORS = {
    "farbe_panzer_1": {
        "name": "Silber",
        "description": "Silver",
        "surcharge": 0.00
    },
    "farbe_panzer_2": {
        "name": "Weiss",
        "description": "White",
        "surcharge": 0.00
    },
    "farbe_panzer_3": {
        "name": "Grau",
        "description": "Gray",
        "surcharge": 0.00
    },
    "farbe_panzer_4": {
        "name": "Braun",
        "description": "Brown",
        "surcharge": 0.00
    },
    "farbe_panzer_5": {
        "name": "Dunkelbraun",
        "description": "Dark Brown",
        "surcharge": 0.00
    },
    "farbe_panzer_6": {
        "name": "Golden Oak",
        "description": "Golden Oak (Premium)",
        "surcharge": 27.86
    },
    "farbe_panzer_7": {
        "name": "Nussbaum",
        "description": "Walnut (Premium)",
        "surcharge": 63.14
    },
    "farbe_panzer_8": {
        "name": "Anthrazit",
        "description": "Anthracite",
        "surcharge": 0.00
    },
    "farbe_panzer_9": {
        "name": "Moosgruen",
        "description": "Moss Green",
        "surcharge": 0.00
    },
    "farbe_panzer_10": {
        "name": "Braun Metallic",
        "description": "Brown Metallic",
        "surcharge": 0.00
    },
    "farbe_panzer_11": {
        "name": "Grau Aluminium",
        "description": "Aluminum Gray",
        "surcharge": 0.00
    },
    "farbe_panzer_12": {
        "name": "Beige",
        "description": "Beige",
        "surcharge": 0.00
    },
}

# ============================================================================
# BOX HEIGHT OPTIONS (kastenhoehe_*)
# ============================================================================
BOX_HEIGHTS = {
    "kastenhoehe_175": {
        "height_mm": 175,
        "model": "SKS",
        "description": "Standard Size",
        "surcharge": 0.00
    },
    "kastenhoehe_215": {
        "height_mm": 215,
        "model": "DRUTEX",
        "description": "Larger Size",
        "surcharge": -65.01
    },
}

# ============================================================================
# PLASTER CARRIER & TRIM OPTIONS (putztraeger_*)
# ============================================================================
PLASTER_OPTIONS = {
    "putztraeger_0": {
        "name": "Ohne Putztraeger und -leiste",
        "description": "Without Plaster Carrier",
        "surcharge": 0.00
    },
    "putztraeger_1": {
        "name": "Putztraeger und -leiste aussen",
        "description": "Plaster Carrier Outside Only",
        "surcharge": 17.57
    },
    "putztraeger_2": {
        "name": "Putztraeger und -leiste innen",
        "description": "Plaster Carrier Inside Only",
        "surcharge": 17.57
    },
    "putztraeger_3": {
        "name": "Putztraeger und -leiste beidseitig",
        "description": "Plaster Carrier Both Sides",
        "surcharge": 35.14
    },
}

# ============================================================================
# GLOBAL SETTINGS
# ============================================================================
GLOBAL_DISCOUNT = 0.40  # 40% discount
MIN_WIDTH = 800
MAX_WIDTH = 2500
MIN_HEIGHT = 1000
MAX_HEIGHT = 1700
MAX_WEIGHT = 12  # kg

# ============================================================================
# PRICE CALCULATOR CLASS
# ============================================================================
class RolladenCalculator:
    """Complete Aufsatzrollladen configurator price calculator"""
    
    def __init__(self):
        self.min_width = MIN_WIDTH
        self.max_width = MAX_WIDTH
        self.min_height = MIN_HEIGHT
        self.max_height = MAX_HEIGHT
        self.max_weight = MAX_WEIGHT
        self.global_discount = GLOBAL_DISCOUNT
    
    def validate_dimensions(self, width, height):
        """Validate width and height are within allowed range"""
        if width < self.min_width or width > self.max_width:
            raise ValueError(f"Width must be between {self.min_width} and {self.max_width} mm")
        if height < self.min_height or height > self.max_height:
            raise ValueError(f"Height must be between {self.min_height} and {self.max_height} mm")
    
    def get_base_price(self, width, height):
        """Get base price for given dimensions"""
        self.validate_dimensions(width, height)
        
        if (width, height) not in BASE_PRICE_MATRIX:
            raise ValueError(f"No price found for {width}x{height} mm")
        
        return BASE_PRICE_MATRIX[(width, height)]
    
    def calculate_price(self, width, height, model="fn_rollladen_model_1", 
                       drive="antriebsart_1", color="farbe_panzer_2",
                       box_height="kastenhoehe_175", plaster="putztraeger_0"):
        """
        Calculate total price with all surcharges and discount
        
        Args:
            width: Width in mm
            height: Height in mm
            model: Model ID
            drive: Drive type ID
            color: Panel color ID
            box_height: Box height ID
            plaster: Plaster option ID
        
        Returns:
            dict with complete price breakdown
        """
        self.validate_dimensions(width, height)
        
        # Get base price
        base_price = self.get_base_price(width, height)
        
        # Get surcharges
        model_surcharge = MODELS.get(model, {}).get("surcharge", 0.00)
        drive_surcharge = DRIVE_TYPES.get(drive, {}).get("surcharge", 0.00)
        color_surcharge = PANEL_COLORS.get(color, {}).get("surcharge", 0.00)
        box_surcharge = BOX_HEIGHTS.get(box_height, {}).get("surcharge", 0.00)
        plaster_surcharge = PLASTER_OPTIONS.get(plaster, {}).get("surcharge", 0.00)
        
        # Calculate totals
        total_surcharges = (model_surcharge + drive_surcharge + color_surcharge + 
                           box_surcharge + plaster_surcharge)
        subtotal = base_price + total_surcharges
        discount_amount = subtotal * self.global_discount
        final_price = subtotal - discount_amount
        
        return {
            "dimensions": {"width": width, "height": height},
            "base_price": round(base_price, 2),
            "surcharges": {
                "model": round(model_surcharge, 2),
                "drive": round(drive_surcharge, 2),
                "color": round(color_surcharge, 2),
                "box_height": round(box_surcharge, 2),
                "plaster": round(plaster_surcharge, 2),
                "total": round(total_surcharges, 2),
            },
            "subtotal": round(subtotal, 2),
            "discount": {
                "percentage": self.global_discount * 100,
                "amount": round(discount_amount, 2),
            },
            "final_price": round(final_price, 2),
        }
    
    def calculate_weight(self, width, height, division=1):
        """
        Calculate roll weight
        Formula: rollgewicht = (height * width * 3.6 / 1000000) / division
        """
        if division <= 0:
            raise ValueError("Division must be greater than 0")
        
        weight = (height * width * 3.6 / 1000000) / division
        return round(weight, 2)
    
    def check_weight_limit(self, width, height, division=1):
        """Check if weight exceeds limit"""
        weight = self.calculate_weight(width, height, division)
        is_valid = weight < self.max_weight
        
        return {
            "weight": weight,
            "max_weight": self.max_weight,
            "valid": is_valid,
            "message": f"Weight OK ({weight} kg)" if is_valid else f"Weight exceeds limit ({weight} kg > {self.max_weight} kg)",
        }
    
    def get_available_dimensions(self):
        """Get all available width x height combinations"""
        return sorted(list(BASE_PRICE_MATRIX.keys()))
    
    def get_price_range_by_width(self, width):
        """Get min/max/avg price for given width"""
        prices = [price for (w, h), price in BASE_PRICE_MATRIX.items() if w == width]
        
        if not prices:
            raise ValueError(f"No prices found for width {width} mm")
        
        return {
            "width": width,
            "min": min(prices),
            "max": max(prices),
            "average": round(sum(prices) / len(prices), 2),
            "count": len(prices),
        }


# ============================================================================
# EXAMPLE USAGE
# ============================================================================
if __name__ == "__main__":
    calc = RolladenCalculator()
    
    print("\n" + "="*70)
    print("EXAMPLE 1: Basic Configuration (800x1000mm)")
    print("="*70)
    result1 = calc.calculate_price(800, 1000)
    print(f"Base Price: {result1['base_price']}")
    print(f"Total Surcharges: {result1['surcharges']['total']}")
    print(f"Subtotal: {result1['subtotal']}")
    print(f"Discount (40%): -{result1['discount']['amount']}")
    print(f"FINAL PRICE: {result1['final_price']}")
    
    print("\n" + "="*70)
    print("EXAMPLE 2: Premium Configuration (2500x1700mm)")
    print("="*70)
    result2 = calc.calculate_price(
        2500, 1700,
        model="fn_rollladen_model_3",
        drive="antriebsart_10",
        color="farbe_panzer_7",
        plaster="putztraeger_3"
    )
    print(f"Base Price: {result2['base_price']}")
    print(f"Model Surcharge: {result2['surcharges']['model']}")
    print(f"Drive Surcharge: {result2['surcharges']['drive']}")
    print(f"Color Surcharge: {result2['surcharges']['color']}")
    print(f"Plaster Surcharge: {result2['surcharges']['plaster']}")
    print(f"Total Surcharges: {result2['surcharges']['total']}")
    print(f"Subtotal: {result2['subtotal']}")
    print(f"Discount (40%): -{result2['discount']['amount']}")
    print(f"FINAL PRICE: {result2['final_price']}")
    
    print("\n" + "="*70)
    print("EXAMPLE 3: Weight Calculation")
    print("="*70)
    weight = calc.check_weight_limit(2500, 1700, division=1)
    print(f"Weight: {weight['weight']} kg")
    print(f"Status: {weight['message']}")
    
    print("\n" + "="*70)
    print("EXAMPLE 4: Available Dimensions")
    print("="*70)
    dims = calc.get_available_dimensions()
    print(f"Total configurations: {len(dims)}")
    print(f"Sample: {dims[:5]}")
    
    print("\n" + "="*70)
    print("EXAMPLE 5: Price Range by Width")
    print("="*70)
    price_range = calc.get_price_range_by_width(2500)
    print(f"Width: {price_range['width']} mm")
    print(f"Min Price: {price_range['min']}")
    print(f"Max Price: {price_range['max']}")
    print(f"Average: {price_range['average']}")
