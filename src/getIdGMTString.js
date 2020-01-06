import zeroStart from './zeroStart'

/**
 * Get GMT string in ID format
 *
 * @param {Date} iso - date object
 * @returns {string}
 */
const getIdGMTString = iso => {
  if (!iso) return ''
  const locale = 'id'
  const date = new Date(iso)
  if (isNaN(date.getTime())) return iso
  const year = date.toLocaleDateString(locale, { year: 'numeric' })
  const month = date.toLocaleDateString(locale, { month: 'short' })
  const day = date.toLocaleDateString(locale, { day: '2-digit' })
  const hour = zeroStart(date.getHours(), 2)
  const minute = zeroStart(date.getMinutes(), 2)
  return `${day} ${month}, ${year} ${hour}:${minute}`
}

export default getIdGMTString
