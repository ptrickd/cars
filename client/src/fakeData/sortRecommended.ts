import { MaintenanceUnit } from '@/constants/enum'

export const PAST_MAINTENANCE_EMPTY = []
export const CAR_STATS = {
  currentMileage: 165000,
  unit: MaintenanceUnit.KMS
}

export const RECOMMENDED_MAINTENANCE_KMS_ONLY = [
  { id: 0, name: 'Oil Change', maintenanceId: 0, interval: 5000, unit: MaintenanceUnit.KMS }
  //   { id: 1, name: 'Tire Change', interval: 6, unit: 'months' },
  //   { id: 2, name: 'Replace Cabin Air Filter', interval: 2, unit: 'years' },
  //   { id: 3, name: 'Replace Air Filter', interval: 2, unit: 'years' }
]

export const RECOMMENDED_MAINTENANCE_KMS_MONTHS_YEARS = [
  { id: 0, name: 'Oil Change', maintenanceId: 0, interval: 5000, unit: MaintenanceUnit.KMS },
  { id: 1, name: 'Tire Rotation', interval: 6, unit: MaintenanceUnit.MONTHS },
  { id: 2, name: 'Replace Cabin Air Filter', interval: 2, unit: MaintenanceUnit.YEARS },
  { id: 3, name: 'Replace Air Filter', interval: 2, unit: MaintenanceUnit.YEARS }
]
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
