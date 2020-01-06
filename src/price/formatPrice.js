/**
 * Format price
 *
 * @param {number} number - price
 * @param {string} currency - PH, ID
 * @returns {string}
 */
const formatPrice = (number, currency, options = {}) => {
  const localeOptions = Object.assign(
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 20
    },
    options
  )
  return Number(number).toLocaleString(currency, localeOptions)
}

export default formatPrice
