import getQueries from '~/query/getQueries'

describe('getQueries', () => {
  beforeAll(() => {
    delete window.location
    window.location = {}
  })

  it('should return {} when window is undefined', () => {
    global.window = undefined
    expect(getQueries()).toEqual({})
  })

  it('should return {} when no query', () => {
    window.location.search = ''
    expect(getQueries()).toEqual({})
  })

  it('should return query object', () => {
    window.location.search = '?foo=bar&bar=baz'
    expect(getQueries()).toEqual({ foo: 'bar', bar: 'baz' })
  })
})
