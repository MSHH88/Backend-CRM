'use strict';

/**
 * ⚠️  DRAFT — Drutex PVC only.
 *
 * Price calculation engine.  Currently handles Drutex base prices,
 * profile multipliers, and surcharges.  Will be extended in Phase 2
 * after Gealan/Holz/Alu dataset analysis to support all materials.
 */

const { getBasePrice }        = require('../data/basePrices');
const { getProfileMultiplier, getProfileName } = require('../data/profileMultipliers');
const { calculateSurcharges } = require('./surchargeCalculator');

const VALID_PROFILES = new Set(['p1', 'p2', 'p3', 'p4', 'p5', 'p7']);
const MIN_DIM = 400;
const MAX_DIM = 2400;

/**
 * Round a number to 2 decimal places (monetary rounding).
 * @param {number} n
 * @returns {number}
 */
function round2(n) {
  return Math.round(n * 100) / 100;
}

/**
 * Main price calculation engine.
 *
 * Master Formula
 * ──────────────
 * STEP 1  grundpreis       = BasePriceMatrix[width][height]          (p1 basis)
 * STEP 2  profileAdjusted  = grundpreis × profileMultiplier
 * STEP 3  surcharges total is summed from selected options
 * STEP 4  preisempfehlung  = profileAdjusted + surcharges.total
 * STEP 5  ersparnis        = preisempfehlung × 0.40
 * STEP 6  angebotspreis    = preisempfehlung × 0.60
 *
 * @param {object} objKonfig
 * @param {number|string} objKonfig.breite   - width in mm
 * @param {number|string} objKonfig.hoehe    - height in mm
 * @param {string}        objKonfig.profil   - profile ID (p1–p7)
 * @param {string}        [objKonfig.hersteller='h1'] - manufacturer ID
 * @param {string}        [objKonfig.verglasung]
 * @param {string}        [objKonfig.aussenfarbe]
 * @param {string}        [objKonfig.innenfarbe]
 * @param {string}        [objKonfig.schallschutz]
 * @param {string}        [objKonfig.sicherheitsverglasung]
 * @param {string}        [objKonfig.griff]
 * @param {string}        [objKonfig.sicherheit]
 * @param {string}        [objKonfig.sprossen]
 * @param {string}        [objKonfig.vperfect]
 *
 * @returns {{
 *   grundpreis: number,
 *   profileMultiplier: number,
 *   profileAdjusted: number,
 *   surcharges: { total: number, items: Array },
 *   preisempfehlung: number,
 *   ersparnis: number,
 *   angebotspreis: number,
 *   produktName: string,
 *   dimensionen: string
 * }}
 * @throws {Error} on invalid input
 */
function calculatePrice(objKonfig) {
  // ── Input validation ──────────────────────────────────────────────────
  const breite = Number(objKonfig.breite);
  const hoehe  = Number(objKonfig.hoehe);
  const profil = String(objKonfig.profil || '').trim();

  if (!Number.isFinite(breite) || breite < MIN_DIM || breite > MAX_DIM) {
    throw new Error(`Breite muss zwischen ${MIN_DIM} und ${MAX_DIM} mm liegen. Erhalten: ${objKonfig.breite}`);
  }
  if (!Number.isFinite(hoehe) || hoehe < MIN_DIM || hoehe > MAX_DIM) {
    throw new Error(`Höhe muss zwischen ${MIN_DIM} und ${MAX_DIM} mm liegen. Erhalten: ${objKonfig.hoehe}`);
  }
  if (!VALID_PROFILES.has(profil)) {
    throw new Error(`Ungültiges Profil "${profil}". Gültige Profile: ${[...VALID_PROFILES].join(', ')}`);
  }

  // ── STEP 1: Base price from matrix ───────────────────────────────────
  const grundpreis = getBasePrice(breite, hoehe);

  // ── STEP 2: Profile multiplier ───────────────────────────────────────
  const profileMultiplier = getProfileMultiplier(profil);
  const profileAdjusted   = round2(grundpreis * profileMultiplier);

  // ── STEP 3: Surcharges ───────────────────────────────────────────────
  const surcharges = calculateSurcharges(objKonfig);

  // ── STEP 4: Preisempfehlung (RRP) ────────────────────────────────────
  const preisempfehlung = round2(profileAdjusted + surcharges.total);

  // ── STEP 5 & 6: Savings and offer price ──────────────────────────────
  const ersparnis    = round2(preisempfehlung * 0.40);
  const angebotspreis = round2(preisempfehlung * 0.60);

  // ── Metadata ─────────────────────────────────────────────────────────
  const profileName = getProfileName(profil);
  const produktName = `Drutex Kunststofffenster – ${profileName}`;
  const dimensionen = `${breite}x${hoehe}mm`;

  return {
    grundpreis,
    profileMultiplier,
    profileAdjusted,
    surcharges,
    preisempfehlung,
    ersparnis,
    angebotspreis,
    produktName,
    dimensionen,
  };
}

module.exports = { calculatePrice };
