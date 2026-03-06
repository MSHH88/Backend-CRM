'use strict';

/**
 * ⚠️  DRAFT — Drutex PVC only.
 *
 * Price calculation engine.  Currently handles Drutex base prices,
 * profile multipliers, and surcharges.  Will be extended in Phase 2
 * after Gealan/Holz/Alu dataset analysis to support all materials.
 *
 * Discount system: configurable per-product, per-category, or global.
 * Quantity pricing: adjustable tier-based volume discounts.
 * VAT: configurable toggle for German 19% VAT display.
 */

const { getBasePrice }        = require('../data/basePrices');
const { getProfileMultiplier, getProfileName } = require('../data/profileMultipliers');
const { calculateSurcharges } = require('./surchargeCalculator');

const VALID_PROFILES = new Set(['p1', 'p2', 'p3', 'p4', 'p5', 'p7']);
const MIN_DIM = 400;
const MAX_DIM = 2400;

// ── Default discount & pricing configuration ────────────────────────────────
// These defaults are used when no pricing options are passed.
// In production, the CRM will supply these values per request.
const DEFAULT_PRICING_OPTIONS = {
  // Discount rate as a decimal (0.40 = 40%). Set to 0 to disable.
  discountRate: 0,
  // Quantity discount tiers: array of { minQuantity, discountPercent }.
  // Set to empty array or all 0% to disable quantity pricing.
  quantityTiers: [],
  // Quantity being ordered (default 1)
  quantity: 1,
  // Whether to include VAT in the response
  showVat: true,
  // VAT rate as decimal (0.19 = 19% German VAT)
  vatRate: 0.19,
};

/**
 * Round a number to 2 decimal places (monetary rounding).
 * @param {number} n
 * @returns {number}
 */
function round2(n) {
  return Math.round(n * 100) / 100;
}

/**
 * Resolve the effective discount rate from pricing options.
 *
 * Priority (highest to lowest):
 *   1. productDiscount  — discount for this specific product
 *   2. categoryDiscount — discount for the product category
 *   3. globalDiscount   — discount applied to all products
 *   4. discountRate     — simple flat rate (legacy / fallback)
 *
 * All values are decimals: 0.40 = 40% off.
 *
 * @param {object} pricingOptions
 * @returns {number} effective discount rate (0–1)
 */
function resolveDiscountRate(pricingOptions) {
  if (typeof pricingOptions.productDiscount === 'number') {
    return pricingOptions.productDiscount;
  }
  if (typeof pricingOptions.categoryDiscount === 'number') {
    return pricingOptions.categoryDiscount;
  }
  if (typeof pricingOptions.globalDiscount === 'number') {
    return pricingOptions.globalDiscount;
  }
  if (typeof pricingOptions.discountRate === 'number') {
    return pricingOptions.discountRate;
  }
  return 0;
}

/**
 * Calculate volume/quantity discount from tier configuration.
 *
 * Tiers example:
 *   [
 *     { minQuantity: 5,  discountPercent: 5 },
 *     { minQuantity: 10, discountPercent: 7 },
 *     { minQuantity: 20, discountPercent: 10 },
 *   ]
 *
 * Returns the highest tier that applies, or 0 if none apply.
 * To disable, pass an empty array or set all discountPercent to 0.
 *
 * @param {number} quantity
 * @param {Array<{ minQuantity: number, discountPercent: number }>} tiers
 * @returns {number} discount as decimal (e.g. 0.05 for 5%)
 */
function resolveQuantityDiscount(quantity, tiers) {
  if (!Array.isArray(tiers) || tiers.length === 0 || quantity < 1) {
    return 0;
  }

  // Sort descending by minQuantity to find the highest qualifying tier
  const sorted = [...tiers].sort((a, b) => b.minQuantity - a.minQuantity);
  for (const tier of sorted) {
    if (quantity >= tier.minQuantity && tier.discountPercent > 0) {
      return tier.discountPercent / 100;
    }
  }
  return 0;
}

/**
 * Main price calculation engine.
 *
 * Master Formula
 * ──────────────
 * STEP 1  grundpreis         = BasePriceMatrix[width][height]           (p1 basis)
 * STEP 2  profileAdjusted    = grundpreis × profileMultiplier
 * STEP 3  surcharges total   = sum of selected options
 * STEP 4  preisempfehlung    = profileAdjusted + surcharges.total
 * STEP 5  discountRate       = resolved from product/category/global config (NOT hardcoded)
 * STEP 6  ersparnis          = preisempfehlung × discountRate
 * STEP 7  angebotspreis      = preisempfehlung − ersparnis
 * STEP 8  quantityDiscount   = tier-based volume discount (optional)
 * STEP 9  finalPrice         = angebotspreis × (1 − quantityDiscount) × quantity
 * STEP 10 VAT                = finalPrice × vatRate (if showVat)
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
 * @param {object} [pricingOptions={}] - CRM-supplied pricing configuration
 * @param {number} [pricingOptions.discountRate]      - flat discount (0–1), default 0
 * @param {number} [pricingOptions.productDiscount]   - product-level discount (highest priority)
 * @param {number} [pricingOptions.categoryDiscount]  - category-level discount
 * @param {number} [pricingOptions.globalDiscount]     - global discount (lowest priority)
 * @param {number} [pricingOptions.quantity=1]         - number of items
 * @param {Array}  [pricingOptions.quantityTiers=[]]   - volume discount tiers
 * @param {boolean} [pricingOptions.showVat=true]      - include VAT in response
 * @param {number} [pricingOptions.vatRate=0.19]       - VAT rate (default 19%)
 *
 * @returns {object} calculation result
 * @throws {Error} on invalid input
 */
function calculatePrice(objKonfig, pricingOptions = {}) {
  const opts = { ...DEFAULT_PRICING_OPTIONS, ...pricingOptions };

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

  // ── STEP 5–7: Configurable discount ──────────────────────────────────
  const discountRate  = resolveDiscountRate(opts);
  const ersparnis     = round2(preisempfehlung * discountRate);
  const angebotspreis = round2(preisempfehlung - ersparnis);

  // ── STEP 8–9: Quantity pricing ───────────────────────────────────────
  const quantity         = Math.max(1, Math.floor(opts.quantity || 1));
  const quantityDiscount = resolveQuantityDiscount(quantity, opts.quantityTiers);
  const unitPrice        = round2(angebotspreis * (1 - quantityDiscount));
  const totalPrice       = round2(unitPrice * quantity);

  // ── STEP 10: VAT ─────────────────────────────────────────────────────
  const vatRate       = opts.showVat ? (opts.vatRate || 0.19) : 0;
  const vatAmount     = round2(totalPrice * vatRate);
  const totalWithVat  = round2(totalPrice + vatAmount);

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
    discountRate,
    ersparnis,
    angebotspreis,
    quantity,
    quantityDiscount,
    unitPrice,
    totalPrice,
    vatRate,
    vatAmount,
    totalWithVat,
    produktName,
    dimensionen,
  };
}

module.exports = {
  calculatePrice,
  resolveDiscountRate,
  resolveQuantityDiscount,
  DEFAULT_PRICING_OPTIONS,
};
