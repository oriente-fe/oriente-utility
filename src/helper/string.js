const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join('').toLowerCase() : rest.join(''))

const padStart = n => n.toString().padStart(2, '0')

export default {
  capitalize,
  padStart
}
