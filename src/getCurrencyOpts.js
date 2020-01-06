/**
 * @typedef {Object} CurrencyOptions
 * @property {string} key - PH, ID
 * @property {string} currency - PHP, IDR
 * @property {string} symbol - ₱, Rp, $
 * @property {number} precision - fraction digits
 */

/**
 * Get currency options
 *
 * @param {string} currency - PH, ID
 * @returns {CurrencyOptions}
 */
const getCurrencyOpts = currency => {
  switch (currency) {
    case 'PH':
    case 'PHP':
      return {
        key: 'PH',
        currency: 'PHP',
        symbol: '₱',
        precision: 2
      }
    case 'ID':
    case 'IDR':
      return {
        key: 'ID',
        currency: 'IDR',
        symbol: 'Rp',
        precision: 0
      }
    default:
      return {
        currency,
        symbol: '$',
        precision: 0
      }
  }
}

export default getCurrencyOpts
