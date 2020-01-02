import { toGMTSlicedString } from '~/datetime'

describe('toGTMSlicedString', () => {
  it('success', () => {
    expect(toGMTSlicedString('2019-10-24T10:15:57Z')).toBe('24 Okt, 2019 18:15')
  })
  it('invalid input', () => {
    expect(toGMTSlicedString('2019-10-2410:15:57Z')).toBe('2019-10-2410:15:57Z')
  })
})
