import { expect, test, describe } from 'vitest'
import { diffMonths } from './DateUtils.ts'

describe('DateUtils.ts Function Unit Testing', () => {
  test('Return difference in months between 2 dates: 2 months Same date', () => {
    const date1 = new Date('04/24/2024')
    const date2 = new Date('02/24/2024')
    const expected = 2 //months
    expect(diffMonths(date1, date2)).toBe(expected)
  })
  test('Return difference in months between 2 dates: 2months Different date', () => {
    const date1 = new Date('04/26/2024')
    const date2 = new Date('02/24/2024')
    const expected = 2 //months
    expect(diffMonths(date1, date2)).toBe(expected)
  })
  test('Return difference in months between 2 dates: 1months Different date', () => {
    const date1 = new Date('04/16/2024')
    const date2 = new Date('02/24/2024')
    const expected = 1 //months
    expect(diffMonths(date1, date2)).toBe(expected)
  })
})
