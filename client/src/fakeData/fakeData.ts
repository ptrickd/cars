export const recommendedData = {
  brand: 'Toyota',
  model: 'Rav4',
  year: 2014,
  kms: 165000,

  recommendedMaintenance: [
    { id: 0, name: 'Oil Change', interval: 5000, unit: MaintenanceUnit.KMS },
    { id: 1, name: 'Tire Change', interval: 6, unit: MaintenanceUnit.MONTHS },
    { id: 2, name: 'Replace Cabin Air Filter', interval: 2, unit: MaintenanceUnit.YEARS },
    { id: 3, name: 'Replace Air Filter', interval: 2, unit: MaintenanceUnit.YEARS }
  ],
  pastMaintenance: []
}
