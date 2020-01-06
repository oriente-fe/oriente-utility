import queryString from 'query-string'

/**
 * Get queries from browser
 *
 * @returns {object}
 */
const getQueries = () => {
  if (typeof window !== 'object') return {}
  return queryString.parse(window.location.search)
}

export default getQueries
