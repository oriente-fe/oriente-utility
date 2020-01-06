import getCurrencyOpts from './getCurrencyOpts'
import formatPrice from './formatPrice'

/**
 * Format price with symbol
 *
 * @param {number} amount - price
 * @param {CurrencyOptions} options - definition of currency and fraction digit
 * @returns {string}
 */
const formatPriceWithSymbol = (amount, options = {}) => {
  const number = Number(amount)
  if (isNaN(number)) {
    return amount
  }
  const defaultOptions = getCurrencyOpts(options.currency)
  const { key, symbol, precision } = Object.assign({}, defaultOptions, options)

  const absNumber = Math.abs(number)
  const price = formatPrice(absNumber, key, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  })
  return `${number <= 0 ? '- ' : ''}${symbol}${price}`
}

export default formatPriceWithSymbol
