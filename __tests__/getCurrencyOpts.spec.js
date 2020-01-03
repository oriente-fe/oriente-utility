import getCurrencyOpts from '~/getCurrencyOpts'

describe('getCurrencyOpts', () => {
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
    expect(getCurrencyOpts('ID')).toEqual(expected)
    expect(getCurrencyOpts('IDR')).toEqual(expected)
    expect(getCurrencyOpts('USD')).toEqual({
      currency: 'USD',
      ...defaultValue
    })
  })
})
