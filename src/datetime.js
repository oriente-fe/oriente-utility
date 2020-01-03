import { padStart } from './helper/string'

export const toGMTSlicedString = iso => {
  if (!iso) return ''
  const locale = 'id'
  const date = new Date(iso)
  if (isNaN(date.getTime())) return iso
  const year = date.toLocaleDateString(locale, { year: 'numeric' })
  const month = date.toLocaleDateString(locale, { month: 'short' })
  const day = date.toLocaleDateString(locale, { day: '2-digit' })
  const hour = padStart(date.getHours())
  const minute = padStart(date.getMinutes())
  return `${day} ${month}, ${year} ${hour}:${minute}`
}

export default {
  toGMTSlicedString
}
