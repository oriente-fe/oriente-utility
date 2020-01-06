/**
 * Get parsed cookie
 *
 * @param {string} cookie - cookie string
 * @returns {object}
 */
const getParsedCookie = cookie => {
  if (!cookie) return {}
  const match = cookie.match(/[^\s]+?=([^;\s]+)/g)
  const obj = {}
  for (const str of match) {
    const m = str.match(/(.+)=(.+)/)
    obj[m[1]] = m[2]
  }
  return obj
}

export default getParsedCookie
