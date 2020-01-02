import { formatMobileNumber } from '~/ec/contact'

it('formatMobileNumber', () => {
  expect(formatMobileNumber('+62-1234567890')).toBe('+62 1234567890')
  expect(formatMobileNumber('+886-987654321')).toBe('+886 987654321')
  expect(formatMobileNumber('+44-1534-123456')).toBe('+44-1534-123456')
})
