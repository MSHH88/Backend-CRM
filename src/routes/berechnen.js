'use strict';

/**
 * ⚠️  DRAFT — Drutex PVC only.
 *
 * Pricing calculation endpoint.  Currently uses Drutex base prices,
 * profile multipliers, and surcharges only.  Will be extended in Phase 2
 * after Gealan/Holz/Alu dataset analysis to support all materials.
 */

const express    = require('express');
const { calculatePrice } = require('../engine/priceCalculator');
const { formatHTML, formatJSON, escapeHtml } = require('../utils/responseFormatter');

const router = express.Router();

/**
 * POST /ajax/berechnen/
 * Accepts:
 *   1. application/x-www-form-urlencoded with `tmp_obj` (JSON string)  — legacy
 *   2. application/json with the config object directly                — modern
 *   3. application/json with `tmp_obj` (JSON string) in the body       — hybrid
 * Returns an HTML fragment by default, or JSON when `?format=json` is
 * specified or the `Accept` header prefers `application/json`.
 */
router.post('/', (req, res) => {
  const wantJSON = req.query.format === 'json'
    || (req.get('Accept') || '').includes('application/json');

  let objKonfig;

  if (req.body && req.body.tmp_obj) {
    // Legacy format: tmp_obj is a JSON string (form-urlencoded or JSON body)
    const raw = req.body.tmp_obj;
    try {
      objKonfig = typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch (parseErr) {
      if (wantJSON) {
        return res.status(400).json({ success: false, error: 'tmp_obj ist kein gültiges JSON.' });
      }
      return res.status(400).send('<p class="error">Fehler: tmp_obj ist kein gültiges JSON.</p>');
    }
  } else if (req.body && req.body.breite && req.body.hoehe) {
    // Modern format: config object sent directly as JSON body
    objKonfig = req.body;
  } else {
    if (wantJSON) {
      return res.status(400).json({ success: false, error: 'Anfrage enthält keine gültigen Konfigurationsdaten (tmp_obj oder breite/hoehe erforderlich).' });
    }
    return res.status(400).send('<p class="error">Fehler: Anfrage enthält keine gültigen Konfigurationsdaten (tmp_obj oder breite/hoehe erforderlich).</p>');
  }

  try {
    // Extract pricingOptions from request body or from within the config object.
    // The CRM sends these to control discounts, quantity pricing, and VAT.
    let pricingOptions = {};
    if (req.body.pricing_options) {
      const po = req.body.pricing_options;
      try { pricingOptions = typeof po === 'string' ? JSON.parse(po) : po; } catch (_e) { /* ignore */ }
    } else if (objKonfig.pricingOptions) {
      pricingOptions = objKonfig.pricingOptions;
    }

    const result = calculatePrice(objKonfig, pricingOptions);

    if (wantJSON) {
      return res.status(200).json(formatJSON(result, objKonfig));
    }

    const html = formatHTML(result);
    res.status(200).send(html);
  } catch (calcErr) {
    if (wantJSON) {
      return res.status(400).json({ success: false, error: calcErr.message });
    }
    return res.status(400).send(`<p class="error">Berechnungsfehler: ${escapeHtml(calcErr.message)}</p>`);
  }
});

module.exports = router;
