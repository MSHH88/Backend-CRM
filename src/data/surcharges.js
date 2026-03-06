'use strict';

/**
 * ⚠️  DRAFT — Drutex PVC only.
 *
 * Surcharge data extracted from the Drutex konfigurator.
 * The full surcharge tables for Gealan, Holz, and Alu have NOT been
 * analyzed yet — that analysis is scheduled for Phase 2.
 *
 * DO NOT add data for other materials until the dataset analysis is complete.
 *
 * Each surcharge entry: { name, amount }  (amount in EUR; may be negative)
 */

const SURCHARGES = {
  // ── Exterior colours (Außenfarbe) ──────────────────────────────────────
  exteriorColor: {
    fs1_01: { name: 'Weiß',              amount:   0.00 },
    fs1_02: { name: 'Dunkelbraun',       amount:   0.00 },
    fs1_03: { name: 'Nussbaum golden',   amount:  43.68 },
    fs1_04: { name: 'Mahagoni',          amount:  43.68 },
    fs1_05: { name: 'Anthrazit grau',    amount:  43.68 },
    fs1_06: { name: 'Silbergrau',        amount:  43.68 },
    fs1_07: { name: 'Bergkiefer',        amount:  43.68 },
    fs1_08: { name: 'Teak',              amount:  43.68 },
    fs1_09: { name: 'Eiche golden',      amount:  43.68 },
    fs1_10: { name: 'Rosewood',          amount:  43.68 },
    fs1_11: { name: 'Graubeige',         amount:  43.68 },
    fs1_12: { name: 'Mooreiche',         amount:  43.68 },
    fs1_13: { name: 'Winchester',        amount:  43.68 },
    fs1_14: { name: 'Schwarzbraun',      amount:  43.68 },
    fs1_15: { name: 'Cremeweiss',        amount:  43.68 },
    fs1_16: { name: 'Premium Eiche',     amount:  78.48 },
    fs1_17: { name: 'Premium Nussbaum',  amount:  78.48 },
    fs1_18: { name: 'Premium Kirsche',   amount:  78.48 },
    fs1_20: { name: 'Alux Gold',         amount:  83.19 },
    fs1_21: { name: 'Alux Silber',       amount:  83.19 },
    fs1_25: { name: 'Special Premium 1', amount: 104.64 },
    fs1_26: { name: 'Special Premium 2', amount: 104.64 },
  },

  // ── Interior colours (Innenfarbe) ──────────────────────────────────────
  interiorColor: {
    fi1_01: { name: 'Weiß',              amount:   0.00 },
    fi1_02: { name: 'Dunkelbraun',       amount:   0.00 },
    fi1_03: { name: 'Nussbaum golden',   amount:  43.68 },
    fi1_04: { name: 'Mahagoni',          amount:  43.68 },
    fi1_05: { name: 'Anthrazit grau',    amount:  43.68 },
    fi1_06: { name: 'Silbergrau',        amount:  43.68 },
    fi1_07: { name: 'Bergkiefer',        amount:  43.68 },
    fi1_08: { name: 'Teak',              amount:  43.68 },
    fi1_09: { name: 'Eiche golden',      amount:  43.68 },
    fi1_10: { name: 'Rosewood',          amount:  43.68 },
    fi1_11: { name: 'Graubeige',         amount:  43.68 },
    fi1_12: { name: 'Mooreiche',         amount:  43.68 },
    fi1_13: { name: 'Winchester',        amount:  43.68 },
    fi1_14: { name: 'Schwarzbraun',      amount:  43.68 },
    fi1_15: { name: 'Cremeweiss',        amount:  43.68 },
    fi1_16: { name: 'Premium Eiche',     amount:  78.48 },
    fi1_17: { name: 'Premium Nussbaum',  amount:  78.48 },
    fi1_18: { name: 'Premium Kirsche',   amount:  78.48 },
    fi1_20: { name: 'Alux Gold',         amount:  83.19 },
    fi1_21: { name: 'Alux Silber',       amount:  83.19 },
    fi1_25: { name: 'Special Premium 1', amount: 104.64 },
    fi1_26: { name: 'Special Premium 2', amount: 104.64 },
  },

  // ── Glazing (Verglasung) ───────────────────────────────────────────────
  glass: {
    g1: { name: '2-fach Wärmeschutzglas Ug=1.1', amount:   0.00 },
    g2: { name: '2-fach Wärmeschutzglas Ug=1.0', amount:   0.00 },
    g3: { name: '3-fach Wärmeschutzglas Ug=0.7', amount:  39.81 },
    g4: { name: '3-fach Wärmeschutzglas Ug=0.6', amount:  39.81 },
    g7: { name: 'Sandwichplatte',                amount:  99.98 },
    g8: { name: 'Ohne Glasscheibe',              amount: -15.05 },
  },

  // ── Sound protection (Schallschutz) ───────────────────────────────────
  soundProtection: {
    ss1: { name: 'Standard',          amount:  0.00 },
    ss2: { name: 'Schallschutz 33dB', amount: 26.00 },
    ss3: { name: 'Schallschutz 36dB', amount: 45.00 },
    ss4: { name: 'Schallschutz 42dB', amount: 78.00 },
  },

  // ── Safety glazing (Sicherheitsverglasung) ────────────────────────────
  securityGlass: {
    sv0: { name: 'Ohne', amount:  0.00 },
    sv1: { name: 'VSG',  amount: 58.00 },
    sv2: { name: 'ESG',  amount: 38.00 },
  },

  // ── Handle (Griff) ────────────────────────────────────────────────────
  handle: {
    gr1: { name: 'Standard',      amount:  0.00 },
    gr2: { name: 'Secvest',       amount: 25.00 },
    gr3: { name: 'Premium Griff', amount: 45.00 },
  },

  // ── Security (Sicherheit) ─────────────────────────────────────────────
  security: {
    si1: { name: 'Keine',        amount:   0.00 },
    si2: { name: 'RC2 Beschlag', amount:  55.00 },
    si3: { name: 'RC2 Glas',     amount:  95.00 },
    si4: { name: 'RC3 Komplett', amount: 178.00 },
  },

  // ── Sprossen ──────────────────────────────────────────────────────────
  sprossen: {
    sp0: { name: 'Ohne',           amount:  0.00 },
    sp1: { name: 'Wiener Sprosse', amount: 35.00 },
    sp2: { name: 'Echte Sprosse',  amount: 95.00 },
    sp3: { name: 'Kreuzprosse',    amount: 55.00 },
  },

  // ── V-Perfect ─────────────────────────────────────────────────────────
  vPerfect: {
    vp0: { name: 'Ohne',                 amount:  0.00 },
    vp1: { name: 'V-Perfect Abdichtung', amount: 29.00 },
  },
};

/**
 * Ordered list of (prefix → category) mappings used to auto-resolve a raw
 * option ID such as "fs1_05" or "g3" to its category.
 * More-specific prefixes MUST come before shorter ones.
 */
const ID_PREFIX_TO_CATEGORY = [
  { prefix: 'fs1_', category: 'exteriorColor' },
  { prefix: 'fi1_', category: 'interiorColor' },
  { prefix: 'ss',   category: 'soundProtection' },
  { prefix: 'sv',   category: 'securityGlass' },
  { prefix: 'gr',   category: 'handle' },
  { prefix: 'si',   category: 'security' },
  { prefix: 'sp',   category: 'sprossen' },
  { prefix: 'vp',   category: 'vPerfect' },
  { prefix: 'g',    category: 'glass' },
];

/**
 * Return the surcharge amount for a known category + optionId pair.
 *
 * @param {string} category - e.g. 'glass', 'exteriorColor'
 * @param {string} optionId - e.g. 'g3', 'fs1_05'
 * @returns {number} amount in EUR
 * @throws {Error} if category or optionId is unknown
 */
function getSurcharge(category, optionId) {
  const cat = SURCHARGES[category];
  if (!cat) {
    throw new Error(`Unknown surcharge category: "${category}"`);
  }
  const entry = cat[optionId];
  if (entry === undefined) {
    throw new Error(`Unknown option ID "${optionId}" in category "${category}"`);
  }
  return entry.amount;
}

/**
 * Resolve a raw option ID to its { category, name, amount } entry.
 *
 * @param {string} optionId
 * @returns {{ category: string, name: string, amount: number } | null}
 */
function resolveOptionId(optionId) {
  for (const { prefix, category } of ID_PREFIX_TO_CATEGORY) {
    if (optionId.startsWith(prefix)) {
      const entry = SURCHARGES[category][optionId];
      if (entry) return { category, name: entry.name, amount: entry.amount };
    }
  }
  return null;
}

/**
 * Returns the full surcharge table.
 * @returns {object}
 */
function getAllSurcharges() {
  return SURCHARGES;
}

module.exports = { SURCHARGES, getSurcharge, getAllSurcharges, resolveOptionId, ID_PREFIX_TO_CATEGORY };
