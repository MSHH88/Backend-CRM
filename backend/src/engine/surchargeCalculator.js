'use strict';

const { SURCHARGES, resolveOptionId } = require('../data/surcharges');

/**
 * Maps each obj_konfig field name to its surcharge category.
 * Fields whose value is a bare option ID (e.g. "g3") are resolved via
 * resolveOptionId(); explicit mappings are used for fields whose IDs might
 * be ambiguous.
 */
const FIELD_TO_CATEGORY = {
  verglasung:            'glass',
  aussenfarbe:           'exteriorColor',
  innenfarbe:            'interiorColor',
  schallschutz:          'soundProtection',
  sicherheitsverglasung: 'securityGlass',
  griff:                 'handle',
  sicherheit:            'security',
  sprossen:              'sprossen',
  vperfect:              'vPerfect',
};

/**
 * Calculate total surcharges for a configuration object.
 *
 * @param {object} objKonfig - the configuration object from the request
 * @returns {{ total: number, items: Array<{ category: string, optionId: string, name: string, amount: number }> }}
 */
function calculateSurcharges(objKonfig) {
  const items = [];

  for (const [field, category] of Object.entries(FIELD_TO_CATEGORY)) {
    const optionId = objKonfig[field];
    if (!optionId) continue;

    const catEntries = SURCHARGES[category];
    if (!catEntries) continue;

    const entry = catEntries[optionId];
    if (!entry) {
      // Unknown option ID within a known category – skip silently
      continue;
    }

    items.push({
      category,
      optionId,
      name:   entry.name,
      amount: entry.amount,
    });
  }

  // Also handle any extra option IDs supplied in an "extras" array
  const extras = Array.isArray(objKonfig.extras) ? objKonfig.extras : [];
  for (const optionId of extras) {
    const resolved = resolveOptionId(String(optionId));
    if (resolved) {
      items.push({
        category: resolved.category,
        optionId,
        name:     resolved.name,
        amount:   resolved.amount,
      });
    }
  }

  const total = Math.round(items.reduce((sum, item) => sum + item.amount, 0) * 100) / 100;

  return { total, items };
}

module.exports = { calculateSurcharges };
