'use strict';

const express    = require('express');
const { calculatePrice } = require('../engine/priceCalculator');
const { formatHTML }     = require('../utils/responseFormatter');

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
    const result = calculatePrice(objKonfig);
    const html   = formatHTML(result);
    res.status(200).send(html);
  } catch (calcErr) {
    return res.status(400).send(`<p class="error">Berechnungsfehler: ${calcErr.message}</p>`);
  }
});

module.exports = router;
