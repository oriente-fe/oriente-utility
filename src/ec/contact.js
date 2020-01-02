export const formatMobileNumber = mobile => {
  const match = mobile.match(/^(\+\d{2,3})-(\d+)$/)
  if (!match) return mobile
  return `${match[1]} ${match[2]}`
}

export default {
  formatMobileNumber
}
