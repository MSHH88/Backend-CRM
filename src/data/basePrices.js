'use strict';

/**
 * Base price matrix for Drutex Kunststoff windows (Iglo 5 Classic / p1).
 *
 * Keys are dimensions in mm, stepped at 100 mm intervals from 400 to 2400.
 * Reference points (from spec):
 *   400x400  → ~€114.00
 *   600x600  → ~€142.00
 *   800x800  → ~€198.00
 *  1000x1000 →  €295.44  (exact)
 *  1200x1200 → ~€382.00
 *  1400x1400 → ~€489.00
 *  1600x1600 → ~€610.00
 *  1800x1800 → ~€746.00
 *  2000x2000 → ~€897.00
 *  2400x2400 → ~€1250.00
 *
 * Off-diagonal cells are derived via geometric-mean interpolation so that
 * a portrait/landscape window at the same area costs the same as its
 * square equivalent.
 */

// Diagonal reference points: dimension (mm) → price (EUR)
const DIAGONAL_REF = [
  [400,  114.00],
  [600,  142.00],
  [800,  198.00],
  [1000, 295.44],
  [1200, 382.00],
  [1400, 489.00],
  [1600, 610.00],
  [1800, 746.00],
  [2000, 897.00],
  [2200, 1070.00],
  [2400, 1250.00],
];

const STEPS = [];
for (let s = 400; s <= 2400; s += 100) STEPS.push(s);

/**
 * Linearly interpolate along the diagonal reference curve.
 * @param {number} size - effective size (geometric mean of w and h)
 * @returns {number} interpolated price
 */
function interpolateDiagonalPrice(size) {
  if (size <= DIAGONAL_REF[0][0]) return DIAGONAL_REF[0][1];
  const last = DIAGONAL_REF[DIAGONAL_REF.length - 1];
  if (size >= last[0]) return last[1];

  for (let i = 0; i < DIAGONAL_REF.length - 1; i++) {
    const [s0, p0] = DIAGONAL_REF[i];
    const [s1, p1] = DIAGONAL_REF[i + 1];
    if (size >= s0 && size <= s1) {
      const t = (size - s0) / (s1 - s0);
      return p0 + t * (p1 - p0);
    }
  }
  return last[1];
}

/**
 * Compute price for a given (w, h) pair using the geometric-mean approach.
 * @param {number} w width in mm
 * @param {number} h height in mm
 * @returns {number} price rounded to 2 dp
 */
function computePrice(w, h) {
  const geomMean = Math.sqrt(w * h);
  const raw = interpolateDiagonalPrice(geomMean);
  return Math.round(raw * 100) / 100;
}

// Build the full matrix (nested plain object)
const basePriceMatrix = {};
for (const w of STEPS) {
  basePriceMatrix[w] = {};
  for (const h of STEPS) {
    basePriceMatrix[w][h] = computePrice(w, h);
  }
}

/**
 * Snap a raw mm value to the nearest 100 mm grid point within [400, 2400].
 * @param {number} mm
 * @returns {number}
 */
function snapToGrid(mm) {
  const clamped = Math.max(400, Math.min(2400, mm));
  return Math.round(clamped / 100) * 100;
}

/**
 * Look up the base price for a window.
 *
 * @param {number} widthMm   - width in mm (400–2400)
 * @param {number} heightMm  - height in mm (400–2400)
 * @param {string} [manufacturerId='h1'] - manufacturer (reserved for future use)
 * @param {string} [profileId='p1']      - profile base (matrix is always p1-based)
 * @returns {number} base price in EUR (2 dp)
 */
function getBasePrice(widthMm, heightMm, manufacturerId = 'h1', profileId = 'p1') {
  const w = snapToGrid(widthMm);
  const h = snapToGrid(heightMm);
  return basePriceMatrix[w][h];
}

module.exports = { basePriceMatrix, getBasePrice, snapToGrid };
