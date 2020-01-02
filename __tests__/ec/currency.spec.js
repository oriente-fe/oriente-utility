import {
  formatMoney,
  formatNumberWithCommas,
  getCurrencyDefaultOptions
} from '~/ec/currency.js'

describe('formatMoney', () => {
  it('returns formatted string with default options', () => {
    expect(formatMoney(-123)).toBe('- $123')
    expect(formatMoney(-1234)).toBe('- $1,234')
    expect(formatMoney(1)).toBe('$1')
    expect(formatMoney(12)).toBe('$12')
    expect(formatMoney(123)).toBe('$123')
    expect(formatMoney(1234)).toBe('$1,234')
    expect(formatMoney(12345)).toBe('$12,345')
    expect(formatMoney(123456)).toBe('$123,456')
    expect(formatMoney(1234567)).toBe('$1,234,567')
    expect(formatMoney(12345678)).toBe('$12,345,678')
  })
  it('returns formatted string with PH options', () => {
    const options = { currency: 'PHP' }
    expect(formatMoney(-123, options)).toBe('- ₱123.00')
    expect(formatMoney(-1234, options)).toBe('- ₱1,234.00')
    expect(formatMoney(1, options)).toBe('₱1.00')
    expect(formatMoney(12, options)).toBe('₱12.00')
    expect(formatMoney(123, options)).toBe('₱123.00')
    expect(formatMoney(1234, options)).toBe('₱1,234.00')
    expect(formatMoney(12345, options)).toBe('₱12,345.00')
    expect(formatMoney(123456, options)).toBe('₱123,456.00')
    expect(formatMoney(1234567, options)).toBe('₱1,234,567.00')
    expect(formatMoney(12345678, options)).toBe('₱12,345,678.00')
  })
  it('returns formatted string with ID options', () => {
    const options = { currency: 'IDR' }
    expect(formatMoney(-123, options)).toBe('- Rp123')
    expect(formatMoney(-1234, options)).toBe('- Rp1.234')
    expect(formatMoney(1, options)).toBe('Rp1')
    expect(formatMoney(12, options)).toBe('Rp12')
    expect(formatMoney(123, options)).toBe('Rp123')
    expect(formatMoney(1234, options)).toBe('Rp1.234')
    expect(formatMoney(12345, options)).toBe('Rp12.345')
    expect(formatMoney(123456, options)).toBe('Rp123.456')
    expect(formatMoney(1234567, options)).toBe('Rp1.234.567')
    expect(formatMoney(12345678, options)).toBe('Rp12.345.678')
  })
})

describe('formatNumberWithCommas', () => {
  it('success', () => {
    expect(formatNumberWithCommas(0.12)).toBe('0.12')
    expect(formatNumberWithCommas(1)).toBe('1')
    expect(formatNumberWithCommas(12)).toBe('12')
    expect(formatNumberWithCommas(123)).toBe('123')
    expect(formatNumberWithCommas(1234)).toBe('1,234')
    expect(formatNumberWithCommas(12345)).toBe('12,345')
    expect(formatNumberWithCommas(123456)).toBe('123,456')
    expect(formatNumberWithCommas(1234567)).toBe('1,234,567')
    expect(formatNumberWithCommas(12345678)).toBe('12,345,678')
  })
})

describe('getCurrencyDefaultOptions', () => {
  const defaultValue = {
    symbol: '$',
    precision: 0
  }
  const expected = {
    key: 'ID',
    currency: 'IDR',
    symbol: 'Rp',
    precision: 0
  }
  it('success', () => {
    expect(getCurrencyDefaultOptions('ID')).toEqual(expected)
    expect(getCurrencyDefaultOptions('IDR')).toEqual(expected)
    expect(getCurrencyDefaultOptions('USD')).toEqual({
      currency: 'USD',
      ...defaultValue
    })
  })
})
