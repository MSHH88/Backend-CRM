#!/usr/bin/env python3
"""
Aufsatzrollladen Configurator - Price Calculator
Extracted from: https://www.fenstermaxx24.com/konfigurator/konfigurator-aufsatzrollladen/
"""

# Base price matrix (width in mm, height in mm, price in EUR)
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

# Drive type surcharges (in EUR)
DRIVE_SURCHARGES = {
    "antriebsart_1": 0.00,      # Schwenkgurtwickler 14mm Weiß
    "antriebsart_2": 0.00,      # Schwenkgurtwickler 14mm Braun
    "antriebsart_4": 188.80,    # Getriebe mit Kurbel
    "antriebsart_5": 188.00,    # Getriebe mit abnehmbarer Kurbel
    "antriebsart_6": 246.46,    # Motor mit Schalter
    "antriebsart_7": 369.80,    # Motor mit Schlüsselschalter
    "antriebsart_8": 638.94,    # Motor Rescue
    "antriebsart_9": 576.95,    # Motor Somfy OXIMO
    "antriebsart_10": 769.05,   # Motor Somfy + Fernbedienung
}

# Panel color surcharges (in EUR)
COLOR_SURCHARGES = {
    "farbe_panzer_1": 0.00,     # Silber
    "farbe_panzer_2": 0.00,     # Weiß
    "farbe_panzer_3": 0.00,     # Grau
    "farbe_panzer_4": 0.00,     # Braun
    "farbe_panzer_5": 0.00,     # Dunkelbraun
    "farbe_panzer_6": 27.86,    # Golden Oak
    "farbe_panzer_7": 63.14,    # Nussbaum
    "farbe_panzer_8": 0.00,     # Anthrazit
    "farbe_panzer_9": 0.00,     # Moosgrün
    "farbe_panzer_10": 0.00,    # Braun Metallic
    "farbe_panzer_11": 0.00,    # Grau Aluminium
    "farbe_panzer_12": 0.00,    # Beige
}

# Box height surcharges (in EUR)
BOX_HEIGHT_SURCHARGES = {
    "kastenhoehe_175": 0.00,    # 175 mm (SKS)
    "kastenhoehe_215": -65.01,  # 215 mm (DRUTEX) - DISCOUNT
}

# Model surcharges (in EUR)
MODEL_SURCHARGES = {
    "fn_rollladen_model_1": 0.00,       # Revision von Unten
    "fn_rollladen_model_2": 0.00,       # Revision von der Seite
    "fn_rollladen_model_3": 159.38,     # Revision von Unten + Insektenschutz
    "fn_rollladen_model_4": 159.38,     # Revision von der Seite + Insektenschutz
}

# Plaster carrier surcharges (in EUR)
PLASTER_SURCHARGES = {
    "putztraeger_0": 0.00,      # Without
    "putztraeger_1": 17.57,     # Outside
    "putztraeger_2": 17.57,     # Inside
    "putztraeger_3": 35.14,     # Both sides
}

# Global discount
GLOBAL_DISCOUNT = 0.40  # 40% discount


class RolladenCalculator:
    """Calculator for Aufsatzrollladen configurator pricing"""
    
    def __init__(self):
        self.min_width = 800
        self.max_width = 2500
        self.min_height = 1000
        self.max_height = 1700
    
    def validate_dimensions(self, width, height):
        """Validate width and height are within allowed range"""
        if width < self.min_width or width > self.max_width:
            raise ValueError(f"Width must be between {self.min_width} and {self.max_width} mm")
        if height < self.min_height or height > self.max_height:
            raise ValueError(f"Height must be between {self.min_height} and {self.max_height} mm")
    
    def get_base_price(self, width, height):
        """Get base price for given dimensions"""
        self.validate_dimensions(width, height)
        
        # Find exact match or interpolate
        if (width, height) in BASE_PRICE_MATRIX:
            return BASE_PRICE_MATRIX[(width, height)]
        
        # If exact match not found, raise error
        raise ValueError(f"No price found for {width}x{height} mm. Available sizes: {list(BASE_PRICE_MATRIX.keys())}")
    
    def calculate_total_price(self, width, height, model="fn_rollladen_model_1", 
                             drive="antriebsart_1", color="farbe_panzer_2",
                             box_height="kastenhoehe_175", plaster="putztraeger_0"):
        """
        Calculate total price with all surcharges and discount
        
        Args:
            width: Width in mm
            height: Height in mm
            model: Model ID (default: basic revision from bottom)
            drive: Drive type ID (default: manual belt winder white)
            color: Panel color ID (default: white)
            box_height: Box height ID (default: 175mm)
            plaster: Plaster carrier ID (default: without)
        
        Returns:
            dict with breakdown and final price
        """
        # Validate dimensions
        self.validate_dimensions(width, height)
        
        # Get base price
        base_price = self.get_base_price(width, height)
        
        # Get surcharges
        model_surcharge = MODEL_SURCHARGES.get(model, 0.00)
        drive_surcharge = DRIVE_SURCHARGES.get(drive, 0.00)
        color_surcharge = COLOR_SURCHARGES.get(color, 0.00)
        box_surcharge = BOX_HEIGHT_SURCHARGES.get(box_height, 0.00)
        plaster_surcharge = PLASTER_SURCHARGES.get(plaster, 0.00)
        
        # Calculate totals
        total_surcharges = (model_surcharge + drive_surcharge + color_surcharge + 
                           box_surcharge + plaster_surcharge)
        subtotal = base_price + total_surcharges
        discount_amount = subtotal * GLOBAL_DISCOUNT
        final_price = subtotal - discount_amount
        
        return {
            "dimensions": {
                "width": width,
                "height": height,
            },
            "base_price": base_price,
            "surcharges": {
                "model": model_surcharge,
                "drive": drive_surcharge,
                "color": color_surcharge,
                "box_height": box_surcharge,
                "plaster": plaster_surcharge,
                "total": total_surcharges,
            },
            "subtotal": subtotal,
            "discount": {
                "percentage": GLOBAL_DISCOUNT * 100,
                "amount": discount_amount,
            },
            "final_price": round(final_price, 2),
        }
    
    def weight_calculation(self, width, height, division=1):
        """
        Calculate roll weight
        Formula: rollgewicht = (height * width * 3.6 / 1000000) / division
        
        Args:
            width: Width in mm
            height: Height in mm
            division: Number of divisions (default: 1)
        
        Returns:
            Weight in kg
        """
        if division <= 0:
            raise ValueError("Division must be greater than 0")
        
        weight = (height * width * 3.6 / 1000000) / division
        return round(weight, 2)
    
    def check_weight_limit(self, width, height, division=1, max_weight=12):
        """
        Check if weight exceeds limit
        
        Args:
            width: Width in mm
            height: Height in mm
            division: Number of divisions
            max_weight: Maximum allowed weight (default: 12 kg)
        
        Returns:
            dict with weight and validity
        """
        weight = self.weight_calculation(width, height, division)
        is_valid = weight < max_weight
        
        return {
            "weight": weight,
            "max_weight": max_weight,
            "valid": is_valid,
            "message": f"Weight OK ({weight} kg)" if is_valid else f"Weight exceeds limit ({weight} kg > {max_weight} kg)",
        }


def print_price_breakdown(calculator, width, height, model="fn_rollladen_model_1",
                          drive="antriebsart_1", color="farbe_panzer_2",
                          box_height="kastenhoehe_175", plaster="putztraeger_0"):
    """Pretty print price breakdown"""
    result = calculator.calculate_total_price(width, height, model, drive, color, box_height, plaster)
    
    print(f"\n{'='*60}")
    print(f"PRICE CALCULATION: {width}mm × {height}mm")
    print(f"{'='*60}")
    print(f"Base Price:              €{result['base_price']:.2f}")
    print(f"\nSurcharges:")
    print(f"  Model:                 €{result['surcharges']['model']:.2f}")
    print(f"  Drive:                 €{result['surcharges']['drive']:.2f}")
    print(f"  Color:                 €{result['surcharges']['color']:.2f}")
    print(f"  Box Height:            €{result['surcharges']['box_height']:.2f}")
    print(f"  Plaster:               €{result['surcharges']['plaster']:.2f}")
    print(f"  {'─'*40}")
    print(f"  Total Surcharges:      €{result['surcharges']['total']:.2f}")
    print(f"\nSubtotal:                €{result['subtotal']:.2f}")
    print(f"Discount ({result['discount']['percentage']:.0f}%):        -€{result['discount']['amount']:.2f}")
    print(f"{'─'*60}")
    print(f"FINAL PRICE:             €{result['final_price']:.2f}")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    # Example usage
    calculator = RolladenCalculator()
    
    # Example 1: Basic configuration
    print("EXAMPLE 1: Basic Configuration")
    print_price_breakdown(calculator, 800, 1000)
    
    # Example 2: Premium configuration
    print("EXAMPLE 2: Premium Configuration")
    print_price_breakdown(
        calculator, 2500, 1700,
        model="fn_rollladen_model_3",
        drive="antriebsart_10",
        color="farbe_panzer_7",
        box_height="kastenhoehe_175",
        plaster="putztraeger_3"
    )
    
    # Example 3: Weight check
    print("EXAMPLE 3: Weight Calculation")
    weight_result = calculator.check_weight_limit(2500, 1700, division=1)
    print(f"Weight: {weight_result['weight']} kg")
    print(f"Status: {weight_result['message']}")
