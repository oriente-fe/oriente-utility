import formatPrice from '~/formatPrice'

describe('formatPrice', () => {
  it('success', () => {
    expect(formatPrice(0.12)).toBe('0.12')
    expect(formatPrice(1)).toBe('1')
    expect(formatPrice(12)).toBe('12')
    expect(formatPrice(123)).toBe('123')
    expect(formatPrice(1234)).toBe('1,234')
    expect(formatPrice(12345)).toBe('12,345')
    expect(formatPrice(123456)).toBe('123,456')
    expect(formatPrice(1234567)).toBe('1,234,567')
    expect(formatPrice(12345678)).toBe('12,345,678')
  })
})
