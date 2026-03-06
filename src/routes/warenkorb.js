'use strict';

const express    = require('express');
const { calculatePrice } = require('../engine/priceCalculator');
const { formatJSON }     = require('../utils/responseFormatter');

const router = express.Router();

/**
 * POST /ajax/addWarenkorb/
 * Accepts application/x-www-form-urlencoded with `tmp_obj` (JSON string).
 * Returns a JSON cart-item object.
 */
router.post('/', (req, res) => {
  const raw = req.body && req.body.tmp_obj;

  if (!raw) {
    return res.status(400).json({ success: false, error: 'tmp_obj fehlt in der Anfrage.' });
  }

  let objKonfig;
  try {
    objKonfig = JSON.parse(raw);
  } catch (parseErr) {
    return res.status(400).json({ success: false, error: 'tmp_obj ist kein gültiges JSON.' });
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

    const result   = calculatePrice(objKonfig, pricingOptions);
    const response = formatJSON(result, objKonfig);
    res.status(200).json(response);
  } catch (calcErr) {
    return res.status(400).json({ success: false, error: calcErr.message });
  }
});

module.exports = router;
