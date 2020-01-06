import removeQueries from '~/query/removeQueries'

describe('removeQueries', () => {
  beforeAll(() => {
    delete window.location
    window.location = {}
  })

  it('should return {} when window is undefined', () => {
    global.window = undefined
    expect(removeQueries([])).toEqual({})
  })

  it('should return {} when remove nothing', () => {
    window.location.search = '?foo=bar&bar=baz'
    expect(removeQueries([])).toEqual({
      foo: 'bar',
      bar: 'baz'
    })
  })

  it('should return query object with undefined key', () => {
    window.location.search = '?foo=bar&bar=baz'
    expect(removeQueries(['baz'])).toEqual({
      foo: 'bar',
      bar: 'baz'
    })
  })

  it('should return query object with existed key', () => {
    window.location.search = '?foo=bar&bar=baz'
    expect(removeQueries(['foo'])).toEqual({
      bar: 'baz'
    })
  })
})
