import { expect, test, describe } from 'vitest'
import { sortRecommended } from './SortRecommended'
import { MaintenanceUnit } from '@/constants/enum'

// @ts-ignore
import {
  PAST_MAINTENANCE_EMPTY,
  CAR_STATS,
  RECOMMENDED_MAINTENANCE_KMS_ONLY,
  RECOMMENDED_MAINTENANCE_KMS_MONTHS_YEARS
} from '../fakeData/sortRecommended'

describe('SortRecommended Function Unit Testing', () => {
  test('pastMaintenance array is empty with Recommended maintenance only in kms', () => {
    const EXPECTED_CURRENT_MAINTENANCE_KMS_ONLY = [
      {
        maintenanceId: 0,
        name: 'Oil Change',
        lastMaintenanceKms: 0,
        lastMaintenanceDate: new Date(CAR_STATS.year),
        currentKms: 165000,
        interval: 5000,
        overdue: true,
        unit: MaintenanceUnit.KMS
      }
    ]
    const sorted1 = sortRecommended(
      CAR_STATS,
      RECOMMENDED_MAINTENANCE_KMS_ONLY,
      PAST_MAINTENANCE_EMPTY
    )

    expect(sorted1).toStrictEqual(EXPECTED_CURRENT_MAINTENANCE_KMS_ONLY)
  })

  test('pastMaintenance array is empty with Recommended maintenance only in kms and months', () => {
    //Data
    const EXPECTED_CURRENT_MAINTENANCE_KMS_MONTHS_YEARS = [
      {
        maintenanceId: 0,
        name: 'Oil Change',
        lastMaintenanceKms: 0,
        lastMaintenanceDate: new Date(CAR_STATS.year),
        currentKms: 165000,
        interval: 5000,
        overdue: true,
        unit: MaintenanceUnit.KMS
      },
      {
        maintenanceId: 1,
        name: 'Tire Rotation',
        lastMaintenanceKms: 0,
        lastMaintenanceDate: new Date(CAR_STATS.year),
        currentKms: 165000,
        interval: 6,
        overdue: true,
        unit: MaintenanceUnit.MONTHS
      },
      {
        maintenanceId: 2,
        name: 'Replace Cabin Air Filter',
        lastMaintenanceKms: 0,
        lastMaintenanceDate: new Date(CAR_STATS.year),
        currentKms: 165000,
        interval: 2,
        overdue: true,
        unit: MaintenanceUnit.YEARS
      },
      {
        maintenanceId: 3,
        name: 'Replace Air Filter',
        lastMaintenanceKms: 0,
        lastMaintenanceDate: new Date(CAR_STATS.year),
        currentKms: 165000,
        interval: 2,
        overdue: true,
        unit: MaintenanceUnit.YEARS
      }
    ]

    //Run function
    const sorted2 = sortRecommended(
      CAR_STATS,
      RECOMMENDED_MAINTENANCE_KMS_MONTHS_YEARS,
      PAST_MAINTENANCE_EMPTY
    )

    //Test output expected

    expect(sorted2).toStrictEqual(EXPECTED_CURRENT_MAINTENANCE_KMS_MONTHS_YEARS)
  })
})
