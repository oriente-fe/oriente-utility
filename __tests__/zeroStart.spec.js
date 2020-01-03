import zeroStart from '~/zeroStart'

describe('zeroStart', () => {
  it('should return "01"', () => {
    expect(zeroStart(1, 2)).toBe('01')
  })
  it('should return "11"', () => {
    expect(zeroStart(11, 2)).toBe('11')
  })
})
