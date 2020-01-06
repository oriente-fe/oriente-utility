import getParsedCookie from '~/getParsedCookie'

describe('getParsedCookie', () => {
  it('should return empty object', () => {
    expect(getParsedCookie('')).toEqual({})
  })
  it('should return correct object', () => {
    expect(getParsedCookie('foo=bar')).toEqual({ foo: 'bar' })
    expect(getParsedCookie('foo=bar; bar=baz')).toEqual({
      foo: 'bar',
      bar: 'baz'
    })
  })
})
