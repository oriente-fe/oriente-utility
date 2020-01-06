/**
 * Uppercase the first character of string
 *
 * @param {string} input - string
 * @param {boolean} lowerRest - lowercase the rest characters
 * @returns {string}
 */
const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join('').toLowerCase() : rest.join(''))

export default capitalize
