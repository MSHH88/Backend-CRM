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
