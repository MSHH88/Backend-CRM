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

// ── POST /ajax/berechnen/ ─────────────────────────────────────────────────────
describe('POST /ajax/berechnen/', () => {
  test('returns 200 and HTML for a valid configuration', async () => {
    const res = await request(app)
      .post('/ajax/berechnen/')
      .type('form')
      .send({ tmp_obj: VALID_CONFIG });

    expect(res.status).toBe(200);
    expect(res.text).toContain('kalkulation-ergebnis');
    expect(res.text).toContain('finalPrice');
    expect(res.text).toContain('EUR');
  });

  test('returns 400 when tmp_obj is missing', async () => {
    const res = await request(app)
      .post('/ajax/berechnen/')
      .type('form')
      .send({});

    expect(res.status).toBe(400);
  });

  test('returns 400 for malformed JSON in tmp_obj', async () => {
    const res = await request(app)
      .post('/ajax/berechnen/')
      .type('form')
      .send({ tmp_obj: '{invalid json' });

    expect(res.status).toBe(400);
  });

  test('returns 400 for invalid dimensions', async () => {
    const badConfig = JSON.stringify({ breite: 100, hoehe: 100, profil: 'p1' });
    const res = await request(app)
      .post('/ajax/berechnen/')
      .type('form')
      .send({ tmp_obj: badConfig });

    expect(res.status).toBe(400);
  });

  test('HTML output contains the offer price for 1000x1000 p1 all-defaults (177,26 EUR)', async () => {
    const res = await request(app)
      .post('/ajax/berechnen/')
      .type('form')
      .send({ tmp_obj: VALID_CONFIG });

    expect(res.status).toBe(200);
    // German locale: 177.26 → "177,26"
    expect(res.text).toContain('177,26 EUR');
  });
});

// ── POST /ajax/addWarenkorb/ ──────────────────────────────────────────────────
describe('POST /ajax/addWarenkorb/', () => {
  test('returns 200 and JSON for a valid configuration', async () => {
    const res = await request(app)
      .post('/ajax/addWarenkorb/')
      .type('form')
      .send({ tmp_obj: VALID_CONFIG });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.item).toBeDefined();
    expect(res.body.item.angebotspreis).toBe(177.26);
    expect(res.body.item.grundpreis).toBe(295.44);
  });

  test('returns 400 JSON when tmp_obj is missing', async () => {
    const res = await request(app)
      .post('/ajax/addWarenkorb/')
      .type('form')
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
  });

  test('returns 400 JSON for malformed JSON in tmp_obj', async () => {
    const res = await request(app)
      .post('/ajax/addWarenkorb/')
      .type('form')
      .send({ tmp_obj: 'not-json' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test('JSON response includes konfiguration echo', async () => {
    const res = await request(app)
      .post('/ajax/addWarenkorb/')
      .type('form')
      .send({ tmp_obj: VALID_CONFIG });

    expect(res.body.item.konfiguration).toBeDefined();
    expect(res.body.item.konfiguration.profil).toBe('p1');
  });
});

// ── GET /ajax/getOptions/ ─────────────────────────────────────────────────────
describe('GET /ajax/getOptions/', () => {
  test('returns 200 and JSON', async () => {
    const res = await request(app).get('/ajax/getOptions/');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.options).toBeDefined();
  });

  test('response contains profiles array', async () => {
    const res = await request(app).get('/ajax/getOptions/');

    expect(Array.isArray(res.body.options.profiles)).toBe(true);
    expect(res.body.options.profiles.length).toBeGreaterThan(0);
  });

  test('response contains glass options', async () => {
    const res = await request(app).get('/ajax/getOptions/');

    expect(Array.isArray(res.body.options.verglasung)).toBe(true);
    const g3 = res.body.options.verglasung.find((g) => g.id === 'g3');
    expect(g3).toBeDefined();
    expect(g3.amount).toBe(39.81);
  });

  test('response contains dimensionen constraints', async () => {
    const res = await request(app).get('/ajax/getOptions/');

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
});
