import getQueries from './getQueries'

/**
 * Remove queries
 *
 * @param {string[]} keys - query key names
 * @returns {object}
 */
const removeQueries = keys => {
  const parsed = getQueries()
  keys.forEach(key => delete parsed[key])
  return parsed
}

export default removeQueries
