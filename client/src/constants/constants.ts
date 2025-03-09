export const MaintenanceUnit = {
  KMS: 'kms',
  MILES: 'miles',
  MONTHS: 'months',
  YEARS: 'years'
}

export const DistanceUnit = {
  KMS: 'kms',
  MILES: 'miles'
}

export const RECOMMENDED_MAINTENANCES_AUTO_GENERATED = [
  {
    name: 'Oil Change',
    interval: 5000,
    unit: MaintenanceUnit.KMS
  },
  {
    name: 'Air Filter',
    interval: 2,
    unit: MaintenanceUnit.YEARS
  },
  { name: 'Tire Rotation', interval: 6, unit: MaintenanceUnit.MONTHS },
  {
    name: 'Cabin Filter',
    interval: 2,
    unit: MaintenanceUnit.YEARS
  },
  {
    name: 'Battery Replacement',
    interval: 3,
    unit: MaintenanceUnit.YEARS
  }
]
