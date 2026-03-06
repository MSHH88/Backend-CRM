'use strict';

const request = require('supertest');
const app     = require('../src/app');

const VALID_CONFIG = JSON.stringify({
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
});

// ── POST /api/v1/berechnen/ (standardized route) ─────────────────────────────
describe('POST /api/v1/berechnen/', () => {
  test('returns 200 and HTML for a valid configuration', async () => {
    const res = await request(app)
      .post('/api/v1/berechnen/')
      .type('form')
      .send({ tmp_obj: VALID_CONFIG });

    expect(res.status).toBe(200);
    expect(res.text).toContain('kalkulation-ergebnis');
    expect(res.text).toContain('finalPrice');
    expect(res.text).toContain('EUR');
  });

  test('returns 400 when tmp_obj is missing', async () => {
    const res = await request(app)
      .post('/api/v1/berechnen/')
      .type('form')
      .send({});

    expect(res.status).toBe(400);
  });

  test('returns 400 for malformed JSON in tmp_obj', async () => {
    const res = await request(app)
      .post('/api/v1/berechnen/')
      .type('form')
      .send({ tmp_obj: '{invalid json' });

    expect(res.status).toBe(400);
  });

  test('returns 400 for invalid dimensions', async () => {
    const badConfig = JSON.stringify({ breite: 100, hoehe: 100, profil: 'p1' });
    const res = await request(app)
      .post('/api/v1/berechnen/')
      .type('form')
      .send({ tmp_obj: badConfig });

    expect(res.status).toBe(400);
  });

  test('HTML output shows price with no discount by default (295,44 EUR)', async () => {
    const res = await request(app)
      .post('/api/v1/berechnen/')
      .type('form')
      .send({ tmp_obj: VALID_CONFIG });

    expect(res.status).toBe(200);
    // No hardcoded discount: angebotspreis = preisempfehlung = 295.44
    expect(res.text).toContain('295,44 EUR');
  });

  test('HTML output includes VAT info by default', async () => {
    const res = await request(app)
      .post('/api/v1/berechnen/')
      .type('form')
      .send({ tmp_obj: VALID_CONFIG });

    expect(res.status).toBe(200);
    expect(res.text).toContain('MwSt');
  });

  test('accepts pricing_options as separate body field with discount', async () => {
    const pricingOptions = JSON.stringify({ discountRate: 0.40 });
    const res = await request(app)
      .post('/api/v1/berechnen/')
      .type('form')
      .send({ tmp_obj: VALID_CONFIG, pricing_options: pricingOptions });

    expect(res.status).toBe(200);
    // With 40% discount on 295.44: angebotspreis = 177.26
    expect(res.text).toContain('177,26 EUR');
    expect(res.text).toContain('sparen');
  });

  test('accepts pricingOptions embedded in tmp_obj JSON', async () => {
    const configWithPricing = JSON.stringify({
      breite: 1000, hoehe: 1000, profil: 'p1',
      verglasung: 'g1', aussenfarbe: 'fs1_01', innenfarbe: 'fi1_01',
      schallschutz: 'ss1', sicherheitsverglasung: 'sv0',
      griff: 'gr1', sicherheit: 'si1', sprossen: 'sp0', vperfect: 'vp0',
      pricingOptions: { discountRate: 0.40 },
    });
    const res = await request(app)
      .post('/api/v1/berechnen/')
      .type('form')
      .send({ tmp_obj: configWithPricing });

    expect(res.status).toBe(200);
    expect(res.text).toContain('177,26 EUR');
  });

  test('accepts direct JSON body (modern format)', async () => {
    const res = await request(app)
      .post('/api/v1/berechnen/')
      .send({
        breite: 1000, hoehe: 1000, profil: 'p1',
        verglasung: 'g1', aussenfarbe: 'fs1_01', innenfarbe: 'fi1_01',
        schallschutz: 'ss1', sicherheitsverglasung: 'sv0',
        griff: 'gr1', sicherheit: 'si1', sprossen: 'sp0', vperfect: 'vp0',
      });

    expect(res.status).toBe(200);
    expect(res.text).toContain('kalkulation-ergebnis');
    expect(res.text).toContain('295,44 EUR');
  });

  test('accepts direct JSON body with embedded pricingOptions', async () => {
    const res = await request(app)
      .post('/api/v1/berechnen/')
      .send({
        breite: 1000, hoehe: 1000, profil: 'p1',
        verglasung: 'g1', aussenfarbe: 'fs1_01', innenfarbe: 'fi1_01',
        schallschutz: 'ss1', sicherheitsverglasung: 'sv0',
        griff: 'gr1', sicherheit: 'si1', sprossen: 'sp0', vperfect: 'vp0',
        pricingOptions: { discountRate: 0.40 },
      });

    expect(res.status).toBe(200);
    expect(res.text).toContain('177,26 EUR');
  });
});

// ── Legacy /ajax/ routes still work ──────────────────────────────────────────
describe('Legacy /ajax/ routes', () => {
  test('POST /ajax/berechnen/ still works', async () => {
    const res = await request(app)
      .post('/ajax/berechnen/')
      .type('form')
      .send({ tmp_obj: VALID_CONFIG });

    expect(res.status).toBe(200);
    expect(res.text).toContain('kalkulation-ergebnis');
  });

  test('POST /ajax/addWarenkorb/ still works', async () => {
    const res = await request(app)
      .post('/ajax/addWarenkorb/')
      .type('form')
      .send({ tmp_obj: VALID_CONFIG });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test('GET /ajax/getOptions/ still works', async () => {
    const res = await request(app).get('/ajax/getOptions/');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

// ── POST /api/v1/warenkorb/ ──────────────────────────────────────────────────
describe('POST /api/v1/warenkorb/', () => {
  test('returns 200 and JSON for a valid configuration', async () => {
    const res = await request(app)
      .post('/api/v1/warenkorb/')
      .type('form')
      .send({ tmp_obj: VALID_CONFIG });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.item).toBeDefined();
    // No hardcoded discount: angebotspreis = preisempfehlung = grundpreis
    expect(res.body.item.angebotspreis).toBe(295.44);
    expect(res.body.item.grundpreis).toBe(295.44);
    expect(res.body.item.discountRate).toBe(0);
  });

  test('returns 400 JSON when tmp_obj is missing', async () => {
    const res = await request(app)
      .post('/api/v1/warenkorb/')
      .type('form')
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
  });

  test('returns 400 JSON for malformed JSON in tmp_obj', async () => {
    const res = await request(app)
      .post('/api/v1/warenkorb/')
      .type('form')
      .send({ tmp_obj: 'not-json' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test('JSON response includes konfiguration echo', async () => {
    const res = await request(app)
      .post('/api/v1/warenkorb/')
      .type('form')
      .send({ tmp_obj: VALID_CONFIG });

    expect(res.body.item.konfiguration).toBeDefined();
    expect(res.body.item.konfiguration.profil).toBe('p1');
  });

  test('JSON response includes VAT fields', async () => {
    const res = await request(app)
      .post('/api/v1/warenkorb/')
      .type('form')
      .send({ tmp_obj: VALID_CONFIG });

    expect(res.body.item.vatRate).toBe(0.19);
    expect(res.body.item.vatAmount).toBeGreaterThan(0);
    expect(res.body.item.totalWithVat).toBeGreaterThan(res.body.item.totalPrice);
  });

  test('JSON response includes quantity fields', async () => {
    const res = await request(app)
      .post('/api/v1/warenkorb/')
      .type('form')
      .send({ tmp_obj: VALID_CONFIG });

    expect(res.body.item.quantity).toBe(1);
    expect(res.body.item.quantityDiscount).toBe(0);
  });

  test('accepts pricing_options with discount via separate field', async () => {
    const pricingOptions = JSON.stringify({ discountRate: 0.40 });
    const res = await request(app)
      .post('/api/v1/warenkorb/')
      .type('form')
      .send({ tmp_obj: VALID_CONFIG, pricing_options: pricingOptions });

    expect(res.status).toBe(200);
    expect(res.body.item.discountRate).toBe(0.40);
    expect(res.body.item.angebotspreis).toBe(177.26);
  });

  test('accepts pricingOptions embedded in tmp_obj for quantity + discount', async () => {
    const configWithPricing = JSON.stringify({
      breite: 1000, hoehe: 1000, profil: 'p1',
      verglasung: 'g1', aussenfarbe: 'fs1_01', innenfarbe: 'fi1_01',
      schallschutz: 'ss1', sicherheitsverglasung: 'sv0',
      griff: 'gr1', sicherheit: 'si1', sprossen: 'sp0', vperfect: 'vp0',
      pricingOptions: {
        productDiscount: 0.30,
        quantity: 5,
        quantityTiers: [{ minQuantity: 5, discountPercent: 5 }],
      },
    });
    const res = await request(app)
      .post('/api/v1/warenkorb/')
      .type('form')
      .send({ tmp_obj: configWithPricing });

    expect(res.status).toBe(200);
    expect(res.body.item.discountRate).toBe(0.30);
    expect(res.body.item.quantity).toBe(5);
    expect(res.body.item.quantityDiscount).toBe(0.05);
  });
});

// ── GET /api/v1/options/ ─────────────────────────────────────────────────────
describe('GET /api/v1/options/', () => {
  test('returns 200 and JSON', async () => {
    const res = await request(app).get('/api/v1/options/');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.options).toBeDefined();
  });

  test('response contains profiles array', async () => {
    const res = await request(app).get('/api/v1/options/');

    expect(Array.isArray(res.body.options.profiles)).toBe(true);
    expect(res.body.options.profiles.length).toBeGreaterThan(0);
  });

  test('response contains glass options', async () => {
    const res = await request(app).get('/api/v1/options/');

    expect(Array.isArray(res.body.options.verglasung)).toBe(true);
    const g3 = res.body.options.verglasung.find((g) => g.id === 'g3');
    expect(g3).toBeDefined();
    expect(g3.amount).toBe(39.81);
  });

  test('response contains dimensionen constraints', async () => {
    const res = await request(app).get('/api/v1/options/');

    expect(res.body.options.dimensionen.minBreite).toBe(400);
    expect(res.body.options.dimensionen.maxBreite).toBe(2400);
  });
});

// ── Health check ──────────────────────────────────────────────────────────────
describe('GET /health', () => {
  test('returns 200 and status ok', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('includes database status field', async () => {
    const res = await request(app).get('/health');

    expect(res.body.database).toBeDefined();
  });
});

// ── Swagger docs ──────────────────────────────────────────────────────────────
describe('GET /api-docs', () => {
  test('returns 200 (Swagger UI)', async () => {
    const res = await request(app).get('/api-docs/').redirects(1);
    expect(res.status).toBe(200);
  });
});
