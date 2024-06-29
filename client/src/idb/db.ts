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

interface IVehicle {
  id?: number
  brand: string
  model: string
  year: number
  currentKms: number
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
  vehicle: EntityTable<
    IVehicle,
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

db.version(3).stores({
  vehicle: '++id, brand, model, year, currentKms'
})
//Vehicule
async function getVehicule() {
  try {
    const vehicles = await db.vehicle.toArray()
    console.log(vehicles)
    return vehicles
  } catch (err: any) {
    console.error(err)
    return { error: err.message }
  }
}

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

//Create
async function addRecommendedMaintenance(name: string, interval: number, unit: MaintenanceUnit) {
  try {
    await db.recommendedMaintenance.add({ name, interval, unit })
    return { success: true }
  } catch (err: any) {
    console.error(err)
    return { error: err.message }
  }
}

//Update
async function updateRecommendedMaintenance(
  id: number,
  name: string,
  interval: number,
  unit: MaintenanceUnit
) {
  console.log(name)
  console.log(interval)
  console.log(unit)
  try {
    console.log('in the try')
    await db.recommendedMaintenance.update(id, { name, interval, unit })
    return { success: true }
  } catch (err: any) {
    console.log(err)
    return { error: err.message }
  }
}

//Delete
async function deleteRecommendedMaintenance(id: number) {
  try {
    await db.recommendedMaintenance.delete(id)
    return { success: true }
  } catch (err: any) {
    console.log(err)
    return { error: err.message }
  }
}

function getDoneMaintenance() {
  const collection = db.recommendedMaintenance.where('id').above(0)
  return collection
}

export {
  db,
  getVehicule,
  addDoneMaintenance,
  getDoneMaintenance,
  addRecommendedMaintenance,
  updateRecommendedMaintenance,
  deleteRecommendedMaintenance
}
export type { IVehicle }
