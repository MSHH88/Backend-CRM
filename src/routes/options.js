'use strict';

const express = require('express');
const { profileMultipliers }  = require('../data/profileMultipliers');
const { getAllSurcharges }     = require('../data/surcharges');

const router = express.Router();

/**
 * GET /ajax/getOptions/
 * Returns all available configuration options as JSON.
 */
router.get('/', (req, res) => {
  const surcharges = getAllSurcharges();

  const profiles = Object.entries(profileMultipliers).map(([id, { name, multiplier }]) => ({
    id,
    name,
    multiplier,
  }));

  const mapCategory = (categoryObj) =>
    Object.entries(categoryObj).map(([id, { name, amount }]) => ({ id, name, amount }));

  res.status(200).json({
    success: true,
    options: {
      profiles,
      dimensionen: {
        minBreite:  400,
        maxBreite:  2400,
        minHoehe:   400,
        maxHoehe:   2400,
        schrittmm:  100,
      },
      verglasung:            mapCategory(surcharges.glass),
      aussenfarbe:           mapCategory(surcharges.exteriorColor),
      innenfarbe:            mapCategory(surcharges.interiorColor),
      schallschutz:          mapCategory(surcharges.soundProtection),
      sicherheitsverglasung: mapCategory(surcharges.securityGlass),
      griff:                 mapCategory(surcharges.handle),
      sicherheit:            mapCategory(surcharges.security),
      sprossen:              mapCategory(surcharges.sprossen),
      vperfect:              mapCategory(surcharges.vPerfect),
    },
  });
});

module.exports = router;
