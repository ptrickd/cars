import { expect, test, describe } from 'vitest'
import { diffMonths } from './DateUtils.ts'

describe('DateUtils.ts Function Unit Testing', () => {
  test('Return difference in months between 2 dates: Same date', () => {
    const date1 = new Date('04/24/2024')
    const date2 = new Date('02/24/2024')
    const expected = 2 //months
    expect(diffMonths(date1, date2)).toBe(expected)
  })
  test('Return difference in months between 2 dates: Different date', () => {
    const date1 = new Date('04/24/2024')
    const date2 = new Date('02/24/2024')
    const expected = 2 //months
    expect(diffMonths(date1, date2)).toBe(expected)
  })
})
