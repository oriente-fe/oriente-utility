import formatMobile from '~/formatMobile'

it('formatMobile', () => {
  expect(formatMobile('+62-1234567890')).toBe('+62 1234567890')
  expect(formatMobile('+886-987654321')).toBe('+886 987654321')
  expect(formatMobile('+44-1534-123456')).toBe('+44-1534-123456')
})
