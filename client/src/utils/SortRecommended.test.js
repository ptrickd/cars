import { expect, test, describe, beforeEach, afterEach, vi } from 'vitest'
import { sortRecommended } from './SortRecommended.ts'

// import { recommendedData } from './fakeData/data'
import {
  PAST_MAINTENANCE_EMPTY,
  CAR_STATS,
  RECOMMENDED_MAINTENANCE_KMS_ONLY
} from '../fakeData/sortRecommended.data.js'

describe('SortRecommended Function Unit Testing', () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers()
  })

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers()
  })
  test('pastMaintenance array is empty with Recommended maintenance only in kms', () => {
    // const sorted = sortRecommended(RECOMMENDED_MAINTENANCE_KMS_ONLY, PAST_MAINTENANCE)
    const date = new Date()
    vi.setSystemTime(date)
    const EXPECTED_CURRENT_MAINTENANCE_KMS_ONLY = [
      {
        maintenanceId: 0,
        name: 'Oil Change',
        lastMaintenanceKms: 0,
        lastMaintenanceDate: null,
        currentKms: 165000,
        interval: 5000,
        overdue: true,
        unit: 'kms',
        date: new Date(date.valueOf())
      }
    ]
    const sorted = sortRecommended(
      CAR_STATS,
      RECOMMENDED_MAINTENANCE_KMS_ONLY,
      PAST_MAINTENANCE_EMPTY
    )
    expect(sorted).toStrictEqual(EXPECTED_CURRENT_MAINTENANCE_KMS_ONLY)
  })

  test('pastMaintenance array is empty with Recommended maintenance only in kms and months', () => {
    // const sorted = sortRecommended(RECOMMENDED_MAINTENANCE_KMS_ONLY, PAST_MAINTENANCE)
    const date = new Date()
    vi.setSystemTime(date)
    const EXPECTED_CURRENT_MAINTENANCE_KMS_ONLY = [
      {
        maintenanceId: 0,
        name: 'Oil Change',
        lastMaintenanceKms: 0,
        lastMaintenanceDate: null,
        currentKms: 165000,
        interval: 5000,
        overdue: true,
        unit: 'kms',
        date: new Date(date.valueOf())
      },
      {
        maintenanceId: 1,
        name: 'Tire Rotation',
        lastMaintenanceKms: 0,
        lastMaintenanceDate: null,
        currentKms: 165000,
        interval: 6,
        overdue: true,
        unit: 'month',
        date: new Date(date.valueOf())
      },
      {
        maintenanceId: 2,
        name: 'Replace Cabin Air Filter',
        lastMaintenanceKms: 0,
        lastMaintenanceDate: null,
        currentKms: 165000,
        interval: 2,
        overdue: true,
        unit: 'years',
        date: new Date(date.valueOf())
      },
      {
        maintenanceId: 3,
        name: 'Replace Air Filter',
        lastMaintenanceKms: 0,
        lastMaintenanceDate: null,
        currentKms: 165000,
        interval: 2,
        overdue: true,
        unit: 'years',
        date: new Date(date.valueOf())
      }
    ]
    const sorted = sortRecommended(
      CAR_STATS,
      RECOMMENDED_MAINTENANCE_KMS_ONLY,
      PAST_MAINTENANCE_EMPTY
    )
    expect(sorted).toStrictEqual(EXPECTED_CURRENT_MAINTENANCE_KMS_ONLY)
  })
})
