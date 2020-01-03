import formatSymbolPrice from '~/formatSymbolPrice'

describe('formatSymbolPrice', () => {
  it('returns formatted string with default options', () => {
    expect(formatSymbolPrice(-123)).toBe('- $123')
    expect(formatSymbolPrice(-1234)).toBe('- $1,234')
    expect(formatSymbolPrice(1)).toBe('$1')
    expect(formatSymbolPrice(12)).toBe('$12')
    expect(formatSymbolPrice(123)).toBe('$123')
    expect(formatSymbolPrice(1234)).toBe('$1,234')
    expect(formatSymbolPrice(12345)).toBe('$12,345')
    expect(formatSymbolPrice(123456)).toBe('$123,456')
    expect(formatSymbolPrice(1234567)).toBe('$1,234,567')
    expect(formatSymbolPrice(12345678)).toBe('$12,345,678')
  })
  it('returns formatted string with PH options', () => {
    const options = { currency: 'PHP' }
    expect(formatSymbolPrice(-123, options)).toBe('- ₱123.00')
    expect(formatSymbolPrice(-1234, options)).toBe('- ₱1,234.00')
    expect(formatSymbolPrice(1, options)).toBe('₱1.00')
    expect(formatSymbolPrice(12, options)).toBe('₱12.00')
    expect(formatSymbolPrice(123, options)).toBe('₱123.00')
    expect(formatSymbolPrice(1234, options)).toBe('₱1,234.00')
    expect(formatSymbolPrice(12345, options)).toBe('₱12,345.00')
    expect(formatSymbolPrice(123456, options)).toBe('₱123,456.00')
    expect(formatSymbolPrice(1234567, options)).toBe('₱1,234,567.00')
    expect(formatSymbolPrice(12345678, options)).toBe('₱12,345,678.00')
  })
  it('returns formatted string with ID options', () => {
    const options = { currency: 'IDR' }
    expect(formatSymbolPrice(-123, options)).toBe('- Rp123')
    expect(formatSymbolPrice(-1234, options)).toBe('- Rp1.234')
    expect(formatSymbolPrice(1, options)).toBe('Rp1')
    expect(formatSymbolPrice(12, options)).toBe('Rp12')
    expect(formatSymbolPrice(123, options)).toBe('Rp123')
    expect(formatSymbolPrice(1234, options)).toBe('Rp1.234')
    expect(formatSymbolPrice(12345, options)).toBe('Rp12.345')
    expect(formatSymbolPrice(123456, options)).toBe('Rp123.456')
    expect(formatSymbolPrice(1234567, options)).toBe('Rp1.234.567')
    expect(formatSymbolPrice(12345678, options)).toBe('Rp12.345.678')
  })
})
