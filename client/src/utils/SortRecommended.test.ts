import { expect, test, describe } from 'vitest'
import { sortRecommended } from './SortRecommended'
import { MaintenanceUnit } from '@/constants/constants'

// @ts-ignore
import {
  PAST_MAINTENANCE_EMPTY,
  PAST_MAINTENANCE_ONE_KMS,
  PAST_MAINTENANCE_KMS_MONTHS_YEARS_OVERDUE,
  PAST_MAINTENANCE_KMS_MONTHS_YEARS_1_OVERDUE,
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
        isOverdue: true,
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

  test('pastMaintenance array is empty with Recommended maintenance in kms, months and years', () => {
    //Data
    const EXPECTED_CURRENT_MAINTENANCE_KMS_MONTHS_YEARS = [
      {
        maintenanceId: 0,
        name: 'Oil Change',
        lastMaintenanceKms: 0,
        lastMaintenanceDate: new Date(CAR_STATS.year),
        currentKms: 165000,
        interval: 5000,
        isOverdue: true,
        unit: MaintenanceUnit.KMS
      },
      {
        maintenanceId: 1,
        name: 'Tire Rotation',
        lastMaintenanceKms: 0,
        lastMaintenanceDate: new Date(CAR_STATS.year),
        currentKms: 165000,
        interval: 6,
        isOverdue: true,
        unit: MaintenanceUnit.MONTHS
      },
      {
        maintenanceId: 2,
        name: 'Replace Cabin Air Filter',
        lastMaintenanceKms: 0,
        lastMaintenanceDate: new Date(CAR_STATS.year),
        currentKms: 165000,
        interval: 2,
        isOverdue: true,
        unit: MaintenanceUnit.YEARS
      },
      {
        maintenanceId: 3,
        name: 'Replace Air Filter',
        lastMaintenanceKms: 0,
        lastMaintenanceDate: new Date(CAR_STATS.year),
        currentKms: 165000,
        interval: 2,
        isOverdue: true,
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

  test('pastMaintenance array has one entry with Recommended maintenance in kms only', () => {
    //Data

    const EXPECTED_CURRENT_MAINTENANCE_KMS = [
      {
        maintenanceId: 0,
        name: 'Oil Change',
        lastMaintenanceKms: 40000,
        lastMaintenanceDate: new Date('2017'),
        currentKms: 165000,
        interval: 5000,
        isOverdue: true,
        unit: MaintenanceUnit.KMS
      }
    ]

    //Run function
    const sorted = sortRecommended(
      CAR_STATS,
      RECOMMENDED_MAINTENANCE_KMS_ONLY,
      PAST_MAINTENANCE_ONE_KMS
    )

    //Test output expected

    expect(sorted).toStrictEqual(EXPECTED_CURRENT_MAINTENANCE_KMS)
  })

  test('pastMaintenance array has 4 entries with Recommended maintenance in kms, months and years', () => {
    //Data

    const EXPECTED_CURRENT_MAINTENANCE_KMS_MONTHS_YEARS = [
      {
        maintenanceId: 0,
        name: 'Oil Change',
        lastMaintenanceKms: 40000,
        lastMaintenanceDate: new Date('2017'),
        currentKms: 165000,
        interval: 5000,
        isOverdue: true,
        unit: MaintenanceUnit.KMS
      },
      {
        maintenanceId: 1,
        name: 'Tire Rotation',
        lastMaintenanceKms: 40000,
        lastMaintenanceDate: new Date('2017'),
        currentKms: 165000,
        interval: 6,
        isOverdue: true,
        unit: MaintenanceUnit.MONTHS
      },
      {
        maintenanceId: 2,
        name: 'Replace Cabin Air Filter',
        lastMaintenanceKms: 40000,
        lastMaintenanceDate: new Date('2017'),
        currentKms: 165000,
        interval: 2,
        isOverdue: true,
        unit: MaintenanceUnit.YEARS
      },
      {
        maintenanceId: 3,
        name: 'Replace Air Filter',
        lastMaintenanceKms: 40000,
        lastMaintenanceDate: new Date('2017'),
        currentKms: 165000,
        interval: 2,
        isOverdue: true,
        unit: MaintenanceUnit.YEARS
      }
    ]

    //Run function
    const sorted = sortRecommended(
      CAR_STATS,
      RECOMMENDED_MAINTENANCE_KMS_MONTHS_YEARS,
      PAST_MAINTENANCE_KMS_MONTHS_YEARS_OVERDUE
    )

    //Test output expected

    expect(sorted).toStrictEqual(EXPECTED_CURRENT_MAINTENANCE_KMS_MONTHS_YEARS)
  })
  test('pastMaintenance array has 4 entries with Recommended maintenance in kms, months and years but some are not overdue', () => {
    //Data

    const EXPECTED_CURRENT_MAINTENANCE_KMS_MONTHS_YEARS = [
      {
        maintenanceId: 0,
        name: 'Oil Change',
        lastMaintenanceKms: 159000,
        lastMaintenanceDate: new Date('2024'),
        currentKms: 165000,
        interval: 5000,
        isOverdue: true,
        unit: MaintenanceUnit.KMS
      }
    ]

    //Run function
    const sorted = sortRecommended(
      CAR_STATS,
      RECOMMENDED_MAINTENANCE_KMS_MONTHS_YEARS,
      PAST_MAINTENANCE_KMS_MONTHS_YEARS_1_OVERDUE
    )

    //Test output expected
    expect(sorted).toStrictEqual(EXPECTED_CURRENT_MAINTENANCE_KMS_MONTHS_YEARS)
  })
})
