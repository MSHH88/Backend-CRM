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
    const result   = calculatePrice(objKonfig);
    const response = formatJSON(result, objKonfig);
    res.status(200).json(response);
  } catch (calcErr) {
    return res.status(400).json({ success: false, error: calcErr.message });
  }
});

module.exports = router;
