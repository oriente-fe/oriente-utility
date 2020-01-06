import getQueries from './getQueries'

/**
 * @typedef {Object} Query
 * @property {string} key - query key
 * @property {string} value - query value
 */

/**
 * Add queries
 *
 * @param {Query[]} queries
 * @returns {object}
 */
const addQueries = queries => {
  const parsed = getQueries()
  return queries.reduce((result, { key, value }) => {
    return Object.assign({}, result, { [key]: value })
  }, parsed)
}

export default addQueries
