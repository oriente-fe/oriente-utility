import getCurrencyOpts from '~/price/getCurrencyOpts'

describe('getCurrencyOpts', () => {
  it('should return PH option', () => {
    const expected = {
      key: 'PH',
      currency: 'PHP',
      symbol: '₱',
      precision: 2
    }
    expect(getCurrencyOpts('PH')).toEqual(expected)
    expect(getCurrencyOpts('PHP')).toEqual(expected)
  })
  it('should return ID option', () => {
    const expected = {
      key: 'ID',
      currency: 'IDR',
      symbol: 'Rp',
      precision: 0
    }
    expect(getCurrencyOpts('ID')).toEqual(expected)
    expect(getCurrencyOpts('IDR')).toEqual(expected)
  })
  it('should return default option', () => {
    expect(getCurrencyOpts('USD')).toEqual({
      currency: 'USD',
      symbol: '$',
      precision: 0
    })
  })
})
