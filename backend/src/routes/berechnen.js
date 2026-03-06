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
const { formatHTML, escapeHtml } = require('../utils/responseFormatter');

const router = express.Router();

/**
 * POST /ajax/berechnen/
 * Accepts application/x-www-form-urlencoded with `tmp_obj` (JSON string).
 * Returns an HTML fragment with the calculated price.
 */
router.post('/', (req, res) => {
  const raw = req.body && req.body.tmp_obj;

  if (!raw) {
    return res.status(400).send('<p class="error">Fehler: tmp_obj fehlt in der Anfrage.</p>');
  }

  let objKonfig;
  try {
    objKonfig = JSON.parse(raw);
  } catch (parseErr) {
    return res.status(400).send('<p class="error">Fehler: tmp_obj ist kein gültiges JSON.</p>');
  }

  try {
    // Extract pricingOptions from request body or from within the config object.
    // The CRM sends these to control discounts, quantity pricing, and VAT.
    let pricingOptions = {};
    if (req.body.pricing_options) {
      try { pricingOptions = JSON.parse(req.body.pricing_options); } catch (_e) { /* ignore */ }
    } else if (objKonfig.pricingOptions) {
      pricingOptions = objKonfig.pricingOptions;
    }

    const result = calculatePrice(objKonfig, pricingOptions);
    const html   = formatHTML(result);
    res.status(200).send(html);
  } catch (calcErr) {
    return res.status(400).send(`<p class="error">Berechnungsfehler: ${escapeHtml(calcErr.message)}</p>`);
  }
});

module.exports = router;
