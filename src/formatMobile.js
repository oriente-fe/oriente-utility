/**
 * Format mobile numbers
 *
 * @example
 * formatMobile('+62-1234567890') // +62 1234567890
 * formatMobile('+886-987654321') // +886 987654321
 *
 * @param {string} mobile - mobile numbers
 * @returns {string}
 */
const formatMobile = mobile => {
  const match = mobile.match(/^(\+\d{2,3})-(\d+)$/)
  if (!match) return mobile
  return `${match[1]} ${match[2]}`
}

export default formatMobile
