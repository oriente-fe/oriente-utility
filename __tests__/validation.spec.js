import validation from '~/validation'

const { lengthEqualTo } = validation

describe('lengthEqualTo', () => {
  const err = 'Input length should be 4'
  it('should return true when equal', () => {
    expect(lengthEqualTo(4, err)('1234')).toBe(true)
  })
  it('should return error message when not equal', () => {
    expect(lengthEqualTo(4, err)('123')).toBe(err)
  })
  it('should auto-correct the type of input value', () => {
    expect(lengthEqualTo(4, err)(1234)).toBe(true)
    expect(lengthEqualTo(4, err)(123)).toBe(err)
  })
})
