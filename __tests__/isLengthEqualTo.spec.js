import isLengthEqualTo from '~/isLengthEqualTo'

describe('isLengthEqualTo', () => {
  const err = 'Input length should be 4'
  it('should return true when equal', () => {
    expect(isLengthEqualTo(4, err)('1234')).toBe(true)
  })
  it('should return error message when not equal', () => {
    expect(isLengthEqualTo(4, err)('123')).toBe(err)
  })
  it('should auto-correct the type of input value', () => {
    expect(isLengthEqualTo(4, err)(1234)).toBe(true)
    expect(isLengthEqualTo(4, err)(123)).toBe(err)
  })
})
