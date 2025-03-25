import { expect, test, describe } from 'vitest'
import {
  sortDoneMaintenanceList,
  computeMaintenanceResultByOperationType
} from './SortOperationsUtils'
import { MaintenanceUnit } from '@/constants/constants'
// @ts-ignore
import {
  PAST_MAINTENANCE_DONE_EMPTY,
  PAST_MAINTENANCE_DONE_ONE_KMS,
  PAST_MAINTENANCE_KMS_MONTHS_YEARS_OVERDUE,
  PAST_MAINTENANCE_KMS_MONTHS_YEARS_1_OVERDUE,
  CAR_STATS,
  RECOMMENDED_MAINTENANCE_KMS_ONLY,
  RECOMMENDED_MAINTENANCE_KMS_MONTHS_YEARS
} from '../fakeData/SortOperationsUtils'
/*
nterface IDone {
  id?: number
  recommendedMaintenanceId: number
  name: string
  kmsWhenDone: number
  interval: number
  intervalUnit: string
  dateOfMaintenanceDone: Date
}

interface IRecommended {
  id?: number
  vehicleId: number
  name: string
  interval: number
  intervalUnit: string
}

interface IVehicle {
  id?: number
  brand: string
  model: string
  year: string
  kmsWhenCreated: number
  currentKms: number
  selectedUnit: string
  lastUpdateCurrentKms: Date
  dateCreated: Date
}

*/

/*
 * Test for computeMaintenanceResultByOperationType() function
 *
 * */

describe('computeMaintenanceResultByOperationType().', () => {
  test('operationTime === distance, doneMaintenance is null.', () => {
    const computed1 = computeMaintenanceResultByOperationType(80000, null, {
      id: 1,
      vehicleId: 1,
      name: 'Oil Change',
      interval: 5000,
      intervalUnit: MaintenanceUnit.KMS
    })

    expect(computed1).toStrictEqual({
      lastMaintenanceDoneKms: 0,
      intervalUnit: MaintenanceUnit.KMS,
      dateOfMaintenanceDone: new Date(),
      remaining: -75000,
      isOverdue: true
    })
  })
  test('operationTime === distance, doneMaintenance is null.', () => {
    const date = new Date('2024-08-01')
    const computed2 = computeMaintenanceResultByOperationType(
      80000,
      {
        id: 1,
        recommendedMaintenanceId: 1,
        name: 'Oil Change',
        kmsWhenDone: 74000,
        interval: 5000,
        intervalUnit: MaintenanceUnit.KMS,
        dateOfMaintenanceDone: date
      },
      {
        id: 1,
        vehicleId: 1,
        name: 'Oil Change',
        interval: 5000,
        intervalUnit: MaintenanceUnit.KMS
      }
    )
    expect(computed2).toStrictEqual({
      lastMaintenanceDoneKms: 74000,
      intervalUnit: MaintenanceUnit.KMS,
      dateOfMaintenanceDone: date,
      remaining: -1000,
      isOverdue: true
    })
  })
})

/*
 * Test for sortDoneMaintenanceList() function
 *
 * */

describe('sortDoneMaintenanceList()', () => {
  test('pastMaintenance array is empty', () => {
    const EXPECTED_CURRENT_MAINTENANCE_EMPTY = new Map()
    const CURRENT_KMS = 165000
    const sorted1 = sortDoneMaintenanceList(
      CURRENT_KMS,
      PAST_MAINTENANCE_DONE_EMPTY,
      RECOMMENDED_MAINTENANCE_KMS_ONLY
    )

    expect(sorted1).toStrictEqual(EXPECTED_CURRENT_MAINTENANCE_EMPTY)
  })

  test('pastMaintenance array got 1 maintenance done, overdue by 1000kms', () => {
    const EXPECTED_CURRENT_MAINTENANCE_KMS_ONLY = new Map()

    EXPECTED_CURRENT_MAINTENANCE_KMS_ONLY.set('Oil Change', {
      recommendedMaintenanceId: 0,
      lastMaintenanceDoneKms: 159000,
      intervalUnit: MaintenanceUnit.KMS,
      dateOfMaintenanceDone: new Date('2024-12-01'),
      remaining: 1000,
      isOverdue: true
    })

    const CURRENT_KMS = 165000
    const sorted2 = sortDoneMaintenanceList(
      CURRENT_KMS,
      PAST_MAINTENANCE_DONE_ONE_KMS,
      RECOMMENDED_MAINTENANCE_KMS_ONLY
    )

    expect(sorted2).toStrictEqual(EXPECTED_CURRENT_MAINTENANCE_KMS_ONLY)
  })
})
