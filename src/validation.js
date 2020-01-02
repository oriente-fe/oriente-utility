export const lengthEqualTo = (n = 0, err = '') => value => {
  return String(value).length === n || err
}

export default {
  lengthEqualTo
}
