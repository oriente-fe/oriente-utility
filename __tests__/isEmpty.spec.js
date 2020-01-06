import isEmpty from '~/isEmpty'

describe('isEmpty', () => {
  it('should return null with invalid input', () => {
    expect(isEmpty(1)).toBe(null)
    expect(isEmpty('foo')).toBe(null)
  })
  it('should return true', () => {
    expect(isEmpty([])).toBe(true)
    expect(isEmpty({})).toBe(true)
  })
  it('should return false', () => {
    expect(isEmpty([1])).toBe(false)
    expect(isEmpty({ a: 1 })).toBe(false)
  })
})
