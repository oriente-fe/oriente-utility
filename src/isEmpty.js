/**
 * Validate input value is empty or not
 *
 * @param {object|Array} val - input value
 * @returns {boolean|null}
 */
const isEmpty = val => {
  if (typeof val !== 'object') {
    return null
  }
  return Object.keys(val).length === 0
}

export default isEmpty
