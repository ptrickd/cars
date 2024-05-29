import Dexie, { type EntityTable } from 'dexie'

import { MaintenanceUnit } from '@/constants/enum'

interface IDone {
  id: number
  name: string
  lastMaintenanceKms: number
  lastMaintenanceDate: Date | null
  currentKms: number
  interval: number
  isOverdue: boolean
  unit: MaintenanceUnit
}

interface IRecommended {
  id: number
  name: string
  interval: number
  unit: MaintenanceUnit
}

const db = new Dexie('MaintenanceDB') as Dexie & {
  doneMaintenance: EntityTable<
    IDone,
    'id' // primary key "id" (for the typings only)
  >
  recommendedMaintenance: EntityTable<
    IRecommended,
    'id' // primary key "id" (for the typings only)
  >
}

// Schema declaration:
db.version(1).stores({
  doneMaintenance:
    '++id, name, lastMaintenanceKms, lastMaintenanceDate, currentKms, interval, isOverdue, unit' // primary key "id" (for the runtime!)
})

db.version(2).stores({
  recommendedMaintenance: '++id, name, interval, unit'
})

//Done Maintenance
async function addDoneMaintenance({
  name,
  lastMaintenanceKms,
  lastMaintenanceDate,
  currentKms,
  interval,
  isOverdue,
  unit
}: IDone) {
  try {
    await db.doneMaintenance.add({
      name,
      lastMaintenanceKms,
      lastMaintenanceDate,
      currentKms,
      interval,
      isOverdue,
      unit
    })
  } catch (err: any) {
    console.error(err)
  }
}

async function addRecommendedMaintenance(name: string, interval: number, unit: MaintenanceUnit) {
  console.log(name)
  console.log(interval)
  console.log(unit)
  try {
    await db.recommendedMaintenance.add({ name, interval, unit })
  } catch (err: any) {
    console.error(err)
  }
}

function getDoneMaintenance() {
  const collection = db.recommendedMaintenance.where('id').above(0)
  return collection
}

// export type { Friend }
export { db, addDoneMaintenance, getDoneMaintenance, addRecommendedMaintenance }
