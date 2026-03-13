'use strict';

const { getBasePrice }    = require('../src/data/basePrices');
const { getProfileMultiplier } = require('../src/data/profileMultipliers');
const { getSurcharge }    = require('../src/data/surcharges');
const { calculatePrice, resolveDiscountRate, resolveQuantityDiscount }  = require('../src/engine/priceCalculator');

// ── Base price lookup ─────────────────────────────────────────────────────────
describe('Base price lookup', () => {
  test('1000x1000mm with p1 returns exactly €295.44', () => {
    expect(getBasePrice(1000, 1000)).toBe(295.44);
  });

  test('Returns a positive number for every 100mm grid point', () => {
    for (let w = 400; w <= 2400; w += 100) {
      for (let h = 400; h <= 2400; h += 100) {
        const p = getBasePrice(w, h);
        expect(typeof p).toBe('number');
        expect(p).toBeGreaterThan(0);
      }
    }
  });

  test('Snaps 950mm to 1000mm and 1050mm to 1100mm', () => {
    const p950  = getBasePrice(950, 950);
    const p1000 = getBasePrice(1000, 1000);
    const p1100 = getBasePrice(1100, 1100);
    expect(p950).toBe(p1000);   // snaps to 1000
    expect(getBasePrice(1050, 1050)).toBe(p1100);
  });
});

// ── Profile multipliers ───────────────────────────────────────────────────────
describe('Profile multiplier', () => {
  test('p1 has multiplier 1.0', () => {
    expect(getProfileMultiplier('p1')).toBe(1.0);
  });

  test('p3 has multiplier 1.2601', () => {
    expect(getProfileMultiplier('p3')).toBe(1.2601);
  });

  test('p5 (Iglo Light) has multiplier 0.9532', () => {
    expect(getProfileMultiplier('p5')).toBe(0.9532);
  });

  test('Unknown profile throws', () => {
    expect(() => getProfileMultiplier('p99')).toThrow();
  });
});

// ── Surcharge lookups ─────────────────────────────────────────────────────────
describe('Surcharge lookups', () => {
  test('g3 (3-fach Ug=0.7) = €39.81', () => {
    expect(getSurcharge('glass', 'g3')).toBe(39.81);
  });

  test('g1 (standard 2-fach) = €0.00', () => {
    expect(getSurcharge('glass', 'g1')).toBe(0.00);
  });

  test('g8 (Ohne Glasscheibe) = −€15.05', () => {
    expect(getSurcharge('glass', 'g8')).toBe(-15.05);
  });

  test('fs1_01 (Weiß exterior) = €0.00', () => {
    expect(getSurcharge('exteriorColor', 'fs1_01')).toBe(0.00);
  });

  test('fs1_05 (Anthrazit grau exterior) = €43.68', () => {
    expect(getSurcharge('exteriorColor', 'fs1_05')).toBe(43.68);
  });

  test('Unknown category throws', () => {
    expect(() => getSurcharge('nonexistent', 'x1')).toThrow();
  });

  test('Unknown optionId in valid category throws', () => {
    expect(() => getSurcharge('glass', 'g99')).toThrow();
  });
});

// ── Discount resolution ───────────────────────────────────────────────────────
describe('Discount resolution', () => {
  test('productDiscount takes highest priority', () => {
    expect(resolveDiscountRate({
      productDiscount: 0.30,
      categoryDiscount: 0.20,
      globalDiscount: 0.10,
      discountRate: 0.05,
    })).toBe(0.30);
  });

  test('categoryDiscount is second priority', () => {
    expect(resolveDiscountRate({
      categoryDiscount: 0.25,
      globalDiscount: 0.10,
    })).toBe(0.25);
  });

  test('globalDiscount is third priority', () => {
    expect(resolveDiscountRate({ globalDiscount: 0.15 })).toBe(0.15);
  });

  test('discountRate is fallback', () => {
    expect(resolveDiscountRate({ discountRate: 0.40 })).toBe(0.40);
  });

  test('defaults to 0 when nothing is set', () => {
    expect(resolveDiscountRate({})).toBe(0);
  });

  test('productDiscount of 0 is valid (no discount)', () => {
    expect(resolveDiscountRate({
      productDiscount: 0,
      globalDiscount: 0.10,
    })).toBe(0);
  });
});

// ── Quantity discount ─────────────────────────────────────────────────────────
describe('Quantity discount', () => {
  const tiers = [
    { minQuantity: 5,  discountPercent: 5 },
    { minQuantity: 10, discountPercent: 7 },
    { minQuantity: 20, discountPercent: 10 },
  ];

  test('no discount for quantity below all tiers', () => {
    expect(resolveQuantityDiscount(3, tiers)).toBe(0);
  });

  test('5 pieces gets 5% tier', () => {
    expect(resolveQuantityDiscount(5, tiers)).toBe(0.05);
  });

  test('7 pieces still gets 5% tier', () => {
    expect(resolveQuantityDiscount(7, tiers)).toBe(0.05);
  });

  test('10 pieces gets 7% tier', () => {
    expect(resolveQuantityDiscount(10, tiers)).toBe(0.07);
  });

  test('25 pieces gets 10% tier', () => {
    expect(resolveQuantityDiscount(25, tiers)).toBe(0.10);
  });

  test('empty tiers returns 0', () => {
    expect(resolveQuantityDiscount(10, [])).toBe(0);
  });

  test('quantity 0 returns 0', () => {
    expect(resolveQuantityDiscount(0, tiers)).toBe(0);
  });
});

// ── Full price calculation ────────────────────────────────────────────────────
describe('Full price calculation', () => {
  const baseConfig = {
    breite:   1000,
    hoehe:    1000,
    profil:   'p1',
    verglasung:  'g1',
    aussenfarbe: 'fs1_01',
    innenfarbe:  'fi1_01',
    schallschutz: 'ss1',
    sicherheitsverglasung: 'sv0',
    griff:       'gr1',
    sicherheit:  'si1',
    sprossen:    'sp0',
    vperfect:    'vp0',
  };

  test('grundpreis = €295.44 for 1000x1000 p1', () => {
    const result = calculatePrice(baseConfig);
    expect(result.grundpreis).toBe(295.44);
  });

  test('profileMultiplier = 1.0 for p1', () => {
    const result = calculatePrice(baseConfig);
    expect(result.profileMultiplier).toBe(1.0);
  });

  test('preisempfehlung = €295.44 when no surcharges', () => {
    const result = calculatePrice(baseConfig);
    expect(result.preisempfehlung).toBe(295.44);
  });

  test('default discount is 0 (NOT hardcoded)', () => {
    const result = calculatePrice(baseConfig);
    expect(result.discountRate).toBe(0);
    expect(result.ersparnis).toBe(0);
    expect(result.angebotspreis).toBe(295.44);
  });

  test('40% discount via pricingOptions', () => {
    const result = calculatePrice(baseConfig, { discountRate: 0.40 });
    expect(result.discountRate).toBe(0.40);
    expect(result.ersparnis).toBe(118.18);
    expect(result.angebotspreis).toBe(177.26);
  });

  test('product-level discount overrides global', () => {
    const result = calculatePrice(baseConfig, {
      productDiscount: 0.30,
      globalDiscount: 0.10,
    });
    expect(result.discountRate).toBe(0.30);
    expect(result.ersparnis).toBe(Math.round(295.44 * 0.30 * 100) / 100);
  });

  test('dimensionen string is formatted correctly', () => {
    const result = calculatePrice(baseConfig);
    expect(result.dimensionen).toBe('1000x1000mm');
  });

  test('surcharges total = 0 for all-default config', () => {
    const result = calculatePrice(baseConfig);
    expect(result.surcharges.total).toBe(0);
  });

  test('g3 glass adds €39.81 to preisempfehlung', () => {
    const result = calculatePrice({ ...baseConfig, verglasung: 'g3' });
    expect(result.surcharges.total).toBe(39.81);
    expect(result.preisempfehlung).toBe(Math.round((295.44 + 39.81) * 100) / 100);
  });

  test('p3 profile multiplies grundpreis by 1.2601', () => {
    const result = calculatePrice({ ...baseConfig, profil: 'p3' });
    const expected = Math.round(295.44 * 1.2601 * 100) / 100;
    expect(result.profileAdjusted).toBe(expected);
  });

  test('Invalid breite throws', () => {
    expect(() => calculatePrice({ ...baseConfig, breite: 300 })).toThrow();
    expect(() => calculatePrice({ ...baseConfig, breite: 2500 })).toThrow();
  });

  test('Invalid hoehe throws', () => {
    expect(() => calculatePrice({ ...baseConfig, hoehe: 100 })).toThrow();
  });

  test('Invalid profil throws', () => {
    expect(() => calculatePrice({ ...baseConfig, profil: 'p99' })).toThrow();
  });

  test('Calculation is deterministic', () => {
    const r1 = calculatePrice(baseConfig);
    const r2 = calculatePrice(baseConfig);
    expect(r1).toEqual(r2);
  });
});

// ── VAT calculation ───────────────────────────────────────────────────────────
describe('VAT calculation', () => {
  const baseConfig = {
    breite: 1000, hoehe: 1000, profil: 'p1',
    verglasung: 'g1', aussenfarbe: 'fs1_01', innenfarbe: 'fi1_01',
    schallschutz: 'ss1', sicherheitsverglasung: 'sv0',
    griff: 'gr1', sicherheit: 'si1', sprossen: 'sp0', vperfect: 'vp0',
  };

  test('VAT is included by default (19%)', () => {
    const result = calculatePrice(baseConfig);
    expect(result.vatRate).toBe(0.19);
    expect(result.vatAmount).toBeGreaterThan(0);
    expect(result.totalWithVat).toBeGreaterThan(result.totalPrice);
  });

  test('VAT can be disabled', () => {
    const result = calculatePrice(baseConfig, { showVat: false });
    expect(result.vatRate).toBe(0);
    expect(result.vatAmount).toBe(0);
    expect(result.totalWithVat).toBe(result.totalPrice);
  });

  test('Custom VAT rate (7%)', () => {
    const result = calculatePrice(baseConfig, { vatRate: 0.07 });
    expect(result.vatRate).toBe(0.07);
    const expectedVat = Math.round(result.totalPrice * 0.07 * 100) / 100;
    expect(result.vatAmount).toBe(expectedVat);
  });
});

// ── Quantity pricing ──────────────────────────────────────────────────────────
describe('Quantity pricing integration', () => {
  const baseConfig = {
    breite: 1000, hoehe: 1000, profil: 'p1',
    verglasung: 'g1', aussenfarbe: 'fs1_01', innenfarbe: 'fi1_01',
    schallschutz: 'ss1', sicherheitsverglasung: 'sv0',
    griff: 'gr1', sicherheit: 'si1', sprossen: 'sp0', vperfect: 'vp0',
  };

  const tiers = [
    { minQuantity: 5, discountPercent: 5 },
    { minQuantity: 10, discountPercent: 7 },
  ];

  test('single item has no quantity discount', () => {
    const result = calculatePrice(baseConfig, { quantity: 1, quantityTiers: tiers });
    expect(result.quantity).toBe(1);
    expect(result.quantityDiscount).toBe(0);
    expect(result.unitPrice).toBe(result.angebotspreis);
    expect(result.totalPrice).toBe(result.unitPrice);
  });

  test('5 items gets 5% volume discount', () => {
    const result = calculatePrice(baseConfig, { quantity: 5, quantityTiers: tiers });
    expect(result.quantity).toBe(5);
    expect(result.quantityDiscount).toBe(0.05);
    expect(result.unitPrice).toBe(Math.round(result.angebotspreis * 0.95 * 100) / 100);
    expect(result.totalPrice).toBe(Math.round(result.unitPrice * 5 * 100) / 100);
  });

  test('10 items gets 7% volume discount', () => {
    const result = calculatePrice(baseConfig, { quantity: 10, quantityTiers: tiers });
    expect(result.quantityDiscount).toBe(0.07);
  });

  test('quantity tiers disabled (empty array) means no volume discount', () => {
    const result = calculatePrice(baseConfig, { quantity: 10, quantityTiers: [] });
    expect(result.quantityDiscount).toBe(0);
    expect(result.unitPrice).toBe(result.angebotspreis);
  });

  test('combined: discount + quantity + VAT', () => {
    const result = calculatePrice(baseConfig, {
      discountRate: 0.40,
      quantity: 5,
      quantityTiers: tiers,
      showVat: true,
      vatRate: 0.19,
    });
    // 295.44 RRP, 40% discount = 177.26 offer, 5% volume = 168.40 unit
    expect(result.discountRate).toBe(0.40);
    expect(result.angebotspreis).toBe(177.26);
    expect(result.quantityDiscount).toBe(0.05);
    expect(result.quantity).toBe(5);
    expect(result.unitPrice).toBe(Math.round(177.26 * 0.95 * 100) / 100);
    expect(result.totalPrice).toBe(Math.round(result.unitPrice * 5 * 100) / 100);
    expect(result.vatAmount).toBe(Math.round(result.totalPrice * 0.19 * 100) / 100);
    expect(result.totalWithVat).toBe(Math.round((result.totalPrice + result.vatAmount) * 100) / 100);
  });
});
