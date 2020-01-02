import { capitalize } from '~/helper/string'

describe('capitalize', () => {
  it('success', () => {
    expect(capitalize('COMPLETED')).toBe('COMPLETED')
    expect(capitalize('cOMPLETED')).toBe('COMPLETED')
    expect(capitalize('completed')).toBe('Completed')
    expect(capitalize('Completed')).toBe('Completed')
  })
  it('enable lower rest', () => {
    expect(capitalize('COMPLETED', true)).toBe('Completed')
    expect(capitalize('cOMPLETED', true)).toBe('Completed')
    expect(capitalize('completed', true)).toBe('Completed')
    expect(capitalize('Completed', true)).toBe('Completed')
  })
})
