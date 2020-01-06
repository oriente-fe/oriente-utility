/**
 * Left padding with zero
 *
 * @param {number} n - origin number
 * @param {number} length - expected length
 * @returns {string}
 */
const zeroStart = (n, length) => n.toString().padStart(length, '0')

export default zeroStart
