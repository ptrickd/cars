import { MaintenanceUnit } from '@/constants/constants'

export const PAST_MAINTENANCE_DONE_EMPTY = []
export const CAR_STATS = {
  brand: 'Toyota',
  model: 'Rav4',
  currentKms: 165000,
  year: '2014',
  unit: MaintenanceUnit.KMS
}

export const RECOMMENDED_MAINTENANCE_KMS_ONLY = [
  { id: 0, vehicleId: 0, name: 'Oil Change', interval: 5000, intervalUnit: MaintenanceUnit.KMS }
]

export const RECOMMENDED_MAINTENANCE_KMS_MONTHS_YEARS = [
  { id: 0, vehicleId: 0, name: 'Oil Change', interval: 5000, unit: MaintenanceUnit.KMS },
  { id: 1, vehicleId: 0, name: 'Tire Rotation', interval: 6, unit: MaintenanceUnit.MONTHS },
  {
    id: 2,
    vehicleId: 0,
    name: 'Replace Cabin Air Filter',
    interval: 2,
    unit: MaintenanceUnit.YEARS
  },
  { id: 3, vehicleId: 0, name: 'Replace Air Filter', interval: 2, unit: MaintenanceUnit.YEARS }
]

export const PAST_MAINTENANCE_DONE_ONE_KMS = [
  {
    recommendedMaintenanceId: 0,
    name: 'Oil Change',
    kmsWhenCreated: 159000,
    interval: 5000,
    intervalUnit: MaintenanceUnit.KMS,
    dateOfMaintenanceDone: new Date('2024-12-01')
  }
]

export const PAST_MAINTENANCE_KMS_MONTHS_YEARS_OVERDUE = [
  {
    maintenanceId: 0,
    name: 'Oil Change',
    maintenanceKms: 40000,
    maintenanceDate: new Date('2017'),
    unit: MaintenanceUnit.KMS
  },
  {
    maintenanceId: 1,
    name: 'Tire Rotation',
    maintenanceKms: 40000,
    maintenanceDate: new Date('2017'),
    unit: MaintenanceUnit.KMS
  },
  {
    maintenanceId: 2,
    name: 'Replace Cabin Air Filter',
    maintenanceKms: 40000,
    maintenanceDate: new Date('2017'),
    unit: MaintenanceUnit.KMS
  },
  {
    maintenanceId: 3,
    name: 'Replace Air Filter',
    maintenanceKms: 40000,
    maintenanceDate: new Date('2017'),
    unit: MaintenanceUnit.KMS
  }
]

export const PAST_MAINTENANCE_KMS_MONTHS_YEARS_1_OVERDUE = [
  {
    maintenanceId: 0,
    name: 'Oil Change',
    maintenanceKms: 159000,
    maintenanceDate: new Date('2024'),
    unit: MaintenanceUnit.KMS
  },
  {
    maintenanceId: 1,
    name: 'Tire Rotation',
    maintenanceKms: 159000,
    maintenanceDate: new Date('2024'),
    unit: MaintenanceUnit.KMS
  },
  {
    maintenanceId: 2,
    name: 'Replace Cabin Air Filter',
    maintenanceKms: 159000,
    maintenanceDate: new Date('2024'),
    unit: MaintenanceUnit.KMS
  },
  {
    maintenanceId: 3,
    name: 'Replace Air Filter',
    maintenanceKms: 159000,
    maintenanceDate: new Date('2024'),
    unit: MaintenanceUnit.KMS
  }
]
