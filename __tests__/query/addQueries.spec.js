import addQueries from '~/query/addQueries'

describe('addQueries', () => {
  beforeAll(() => {
    delete window.location
    window.location = {}
  })

  it('should return {} when window is undefined', () => {
    global.window = undefined
    expect(addQueries([])).toEqual({})
  })

  it('should return {} when add nothing', () => {
    window.location.search = ''
    expect(addQueries([])).toEqual({})
  })

  it('should return query object with empty search', () => {
    window.location.search = ''
    expect(addQueries([{ key: 'foo', value: 'bar' }])).toEqual({
      foo: 'bar'
    })
  })

  it('should return query object with exist search', () => {
    window.location.search = '?foo=bar&bar=baz'
    expect(addQueries([{ key: 'baz', value: 'qux' }])).toEqual({
      foo: 'bar',
      bar: 'baz',
      baz: 'qux'
    })
  })
})
