'use strict';

/**
 * ⚠️  DRAFT — Drutex PVC only.
 *
 * Profile multipliers for Drutex Kunststoff window profiles.
 * Will be extended in Phase 2 with Gealan/Holz/Alu profile data
 * after dataset analysis.
 *
 * Multiply the base price (p1 = Iglo 5 Classic) by the factor to get
 * the adjusted price for the selected profile.
 */
const profileMultipliers = {
  p1: { name: 'Iglo 5 Classic',      multiplier: 1.0000 },
  p2: { name: 'Iglo 5',              multiplier: 1.0000 },
  p3: { name: 'Iglo Energy Classic', multiplier: 1.2601 },
  p4: { name: 'Iglo Energy',         multiplier: 1.2601 },
  p5: { name: 'Iglo Light',          multiplier: 0.9532 },
  p7: { name: 'Iglo EXT',            multiplier: 1.2886 },
};

/**
 * Returns the multiplier for a given profile ID.
 * @param {string} profileId - e.g. 'p1', 'p3'
 * @returns {number} multiplier value
 * @throws {Error} if profileId is not recognised
 */
function getProfileMultiplier(profileId) {
  const profile = profileMultipliers[profileId];
  if (!profile) {
    throw new Error(`Unknown profile ID: "${profileId}". Valid IDs: ${Object.keys(profileMultipliers).join(', ')}`);
  }
  return profile.multiplier;
}

/**
 * Returns the human-readable name for a given profile ID.
 * @param {string} profileId
 * @returns {string}
 */
function getProfileName(profileId) {
  const profile = profileMultipliers[profileId];
  return profile ? profile.name : profileId;
}

module.exports = { profileMultipliers, getProfileMultiplier, getProfileName };
