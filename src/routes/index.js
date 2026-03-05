'use strict';

const express    = require('express');
const berechnen  = require('./berechnen');
const warenkorb  = require('./warenkorb');
const options    = require('./options');

const router = express.Router();

router.use('/ajax/berechnen',    berechnen);
router.use('/ajax/addWarenkorb', warenkorb);
router.use('/ajax/getOptions',   options);

// Health-check endpoint
router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
