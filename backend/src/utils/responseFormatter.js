'use strict';

/**
 * Format a number as German locale currency string.
 * e.g. 1234.56 → "1.234,56"
 * @param {number} value
 * @returns {string}
 */
function formatGermanNumber(value) {
  return value.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Escape special HTML characters to prevent XSS in generated markup.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Build the surcharge rows HTML.
 * @param {Array<{ category: string, optionId: string, name: string, amount: number }>} items
 * @returns {string}
 */
function buildSurchargeRows(items) {
  if (!items || items.length === 0) {
    return '<tr><td colspan="2">Keine Aufschläge</td></tr>';
  }
  return items
    .map(
      (item) =>
        `<tr>
          <td class="aufschlag-name">${escapeHtml(item.name)}</td>
          <td class="aufschlag-betrag">${formatGermanNumber(item.amount)} EUR</td>
        </tr>`,
    )
    .join('\n      ');
}

/**
 * Format a price calculation result as an HTML fragment.
 *
 * @param {{
 *   preisempfehlung: number,
 *   ersparnis: number,
 *   angebotspreis: number,
 *   produktName: string,
 *   dimensionen: string,
 *   surcharges: { items: Array },
 *   discountRate: number,
 *   quantity: number,
 *   quantityDiscount: number,
 *   unitPrice: number,
 *   totalPrice: number,
 *   vatRate: number,
 *   vatAmount: number,
 *   totalWithVat: number
 * }} result
 * @returns {string} HTML string
 */
function formatHTML(result) {
  const surchargeRows = buildSurchargeRows(result.surcharges.items);
  const discountPct = ((result.discountRate || 0) * 100).toFixed(0);

  let quantityInfo = '';
  if (result.quantity > 1) {
    quantityInfo = `<p class="menge">Menge: ${result.quantity} Stück</p>`;
    if (result.quantityDiscount > 0) {
      quantityInfo += `<p class="mengenrabatt">Mengenrabatt: ${(result.quantityDiscount * 100).toFixed(0)}%</p>`;
    }
  }

  let vatInfo = '';
  if (result.vatRate > 0) {
    vatInfo = `
    <p class="mwst-info">zzgl. ${(result.vatRate * 100).toFixed(0)}% MwSt: ${formatGermanNumber(result.vatAmount)} EUR</p>
    <h3 id="totalWithVat">${formatGermanNumber(result.totalWithVat)} EUR inkl. MwSt.</h3>`;
  }

  return `<div class="kalkulation-ergebnis">
  <div class="preis-empfehlung">
    <span id="topStrokePrice">${formatGermanNumber(result.preisempfehlung)} EUR</span>
    ${result.ersparnis > 0 ? `<p class="ersparnis">Sie sparen <strong>${formatGermanNumber(result.ersparnis)} EUR</strong> (${discountPct}%)</p>` : ''}
  </div>
  <div class="angebots-preis">
    <h2 id="finalPrice">${formatGermanNumber(result.angebotspreis)} EUR</h2>
    ${quantityInfo}
    ${vatInfo}
  </div>
  <div class="preis-details">
    <p class="produkt-name">${escapeHtml(result.produktName)}</p>
    <p class="dimensionen">Maße: ${escapeHtml(result.dimensionen)}</p>
    <table class="aufschlaege">
      <thead>
        <tr>
          <th>Option</th>
          <th>Aufschlag</th>
        </tr>
      </thead>
      <tbody>
        ${surchargeRows}
      </tbody>
    </table>
  </div>
</div>`;
}

/**
 * Format a price calculation result as a JSON-serialisable cart item object.
 *
 * @param {object} result - calculation result from priceCalculator
 * @param {object} [objKonfig={}] original configuration for reference
 * @returns {object}
 */
function formatJSON(result, objKonfig = {}) {
  return {
    success: true,
    item: {
      produktName:       result.produktName,
      dimensionen:       result.dimensionen,
      grundpreis:        result.grundpreis,
      profileMultiplier: result.profileMultiplier,
      profileAdjusted:   result.profileAdjusted,
      surchargesTotal:   result.surcharges.total,
      surchargeItems:    result.surcharges.items,
      preisempfehlung:   result.preisempfehlung,
      discountRate:      result.discountRate,
      ersparnis:         result.ersparnis,
      angebotspreis:     result.angebotspreis,
      quantity:          result.quantity,
      quantityDiscount:  result.quantityDiscount,
      unitPrice:         result.unitPrice,
      totalPrice:        result.totalPrice,
      vatRate:           result.vatRate,
      vatAmount:         result.vatAmount,
      totalWithVat:      result.totalWithVat,
      konfiguration:     objKonfig,
    },
  };
}

module.exports = { formatHTML, formatJSON, formatGermanNumber, escapeHtml };
