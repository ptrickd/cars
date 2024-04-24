import { expect, test, describe, beforeEach, afterEach, vi } from 'vitest'
import { sortRecommended } from './SortRecommended.ts'

// import { recommendedData } from './fakeData/data'

const PAST_MAINTENANCE = []
const CAR_STATS = {
  currentMileage: 165000,
  unit: 'kms'
}
// const SORTED_DATA = [
//   {
//     id: 4,
//     name: 'Oil Change',
//     interval: 5000,
//     units: 'kms'
//   },
//   {
//     id: 5,
//     name: 'Tire Change',
//     interval: 6,
//     units: 'months'
//   },
//   {
//     id: 6,
//     name: 'Replace Cabin Air Filter',
//     interval: 2,
//     units: 'years'
//   },
//   {
//     id: 7,
//     name: 'Replace Air Filter',
//     interval: 2,
//     units: 'years'
//   }
// ]
const RECOMMENDED_MAINTENANCE_KMS_ONLY = [
  { id: 0, name: 'Oil Change', maintenanceId: 0, interval: 5000, unit: 'kms' }
  //   { id: 1, name: 'Tire Change', interval: 6, unit: 'months' },
  //   { id: 2, name: 'Replace Cabin Air Filter', interval: 2, unit: 'years' },
  //   { id: 3, name: 'Replace Air Filter', interval: 2, unit: 'years' }
]

describe('SortRecommended Function unit testing', () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers()
  })

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers()
  })
  test('pastMaintenance array is empty with Reccommended maintenance only in kms', () => {
    // const sorted = sortRecommended(RECOMMENDED_MAINTENANCE_KMS_ONLY, PAST_MAINTENANCE)
    const date = new Date()
    vi.setSystemTime(date)
    const EXPECTED_CURRENT_MAINTENANCE_KMS_ONLY = [
      {
        maintenanceId: 0,
        name: 'Oil Change',
        lastMaintenanceKms: 0,
        currentKms: 165000,
        interval: 5000,
        overdue: true,
        unit: 'kms',
        date: new Date(date.valueOf())
      }
    ]
    const sorted = sortRecommended(CAR_STATS, RECOMMENDED_MAINTENANCE_KMS_ONLY, PAST_MAINTENANCE)
    expect(sorted).toStrictEqual(EXPECTED_CURRENT_MAINTENANCE_KMS_ONLY)
  })
})
