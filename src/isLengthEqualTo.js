/**
 * Validate string length
 *
 * @param {number} n - expected string length
 * @param {string} err - error message
 * @returns {boolean|string}
 */
const isLengthEqualTo = (n = 0, err = '') => value => {
  return String(value).length === n || err
}

export default isLengthEqualTo
