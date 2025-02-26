import Dexie, { type EntityTable } from 'dexie'

import { MaintenanceUnit } from '@/constants/enum'

interface IDone {
  id?: number
  name: string
  currentKms: number
  interval: number
  unit: MaintenanceUnit
  date: Date
}

interface IRecommended {
  id?: number
  name: string
  interval: number
  unit: MaintenanceUnit
  vehicleId: number
}

interface IVehicle {
  id?: number
  brand: string
  model: string
  year: string
  currentKms: number
  selectedUnit: string
}

interface IVehicleData {
  id?: number
  vehicleId: number
  selectedUnit: string
  updatedKms: number
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
  vehicleData: EntityTable<IVehicleData, 'id'>
}

/**/
/************  SCHEMA  ****************/
/**/

// Schema declaration:
db.version(1).stores({
  doneMaintenance: '++id, name, currentKms, interval, unit, date' // primary key "id" (for the runtime!)
})

db.version(2).stores({
  recommendedMaintenance: '++id, name, interval, unit, vehicleId'
})

db.version(3).stores({
  vehicle: '++id, brand, model, year, kms, selectedUnit'
})

db.version(4).stores({
  vehicleData: '++id, vehicleId, selectedUnit, updatedKms'
})

/**/
/************  VEHICLE  ****************/
/**/

//Vehicule get list
async function getVehicules() {
  try {
    const vehicles = await db.vehicle.toArray()
    console.log(vehicles)
    return vehicles
  } catch (err: any) {
    console.error(err)
    return { error: err.message }
  }
}

//Get vehicle by id
async function getVehicleById(id: number) {
  try {
    const vehicle = await db.vehicle.get({ id: id })
    return vehicle
  } catch (err: any) {
    console.error(err)
    return { error: err.message }
  }
}

//Vehicle add
async function addVehicule(
  brand: string,
  model: string,
  year: string,
  currentKms: number,
  selectedUnit: string
) {
  try {
    const id = await db.vehicle.add({ brand, model, year, currentKms, selectedUnit })

    return { success: true, id }
  } catch (err: any) {
    console.error(err)
    return { error: err.message }
  }
}

//Vehcile update
async function updateVehicle(
  id: number,
  brand: string,
  model: string,
  year: string,
  currentKms: number,
  selectedUnit: string
) {
  try {
    await db.vehicle.update(id, { brand, model, year, currentKms, selectedUnit })

    return { success: true }
  } catch (err: any) {
    console.error(err)
    return { error: err.message }
  }
}

//Vehicle Delete
async function deleteVehicle(id: number) {
  try {
    const vehicle = await db.vehicle.where('id').equals(id).delete()

    console.log(vehicle)
    return { success: true }
  } catch (err: any) {
    console.error(err)
    return { error: err.message }
  }
}

/**/
/************  DONE MAINTENANCE  ****************/
/**/

//Create Done Maintenance
async function addDoneMaintenance({ name, currentKms, interval, unit, date }: IDone) {
  try {
    await db.doneMaintenance.add({
      name,
      currentKms,
      interval,
      unit,
      date
    })
  } catch (err: any) {
    console.error(err)
  }
}

/**/
/************  RECOMMENDED MAINTENANCE  ****************/
/**/

// Get done maintenance
function getDoneMaintenance() {
  const collection = db.recommendedMaintenance.where('id').above(0)
  return collection
}

//Create
async function addRecommendedMaintenance(
  name: string,
  interval: number,
  unit: MaintenanceUnit,
  vehicleId: number
) {
  try {
    await db.recommendedMaintenance.add({ name, interval, unit, vehicleId })
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

/**/
/************  VEHICLES DATA  ****************/
/*  This is the data that will change with time.   */
/*  The kms will change has the vehicle age.   */
/*  The kms will be updated every time a maintenance is done on the vehicle */
/*  The maintenance unit is specific to the vehicle. It will probably not change but give the possibility anyway */
/**/

// Get
async function getVehicleDataById(id: number) {
  const vehicleData = db.vehicleData.where('id').equals(id)
  return vehicleData
}

async function getAllVehicleData() {
  const vehicleData = db.vehicleData.toArray()
  return vehicleData
}

// Create
async function addVehicleData(vehicleId: number, selectedUnit: string, updatedKms: number) {
  try {
    await db.vehicleData.add({ vehicleId, selectedUnit, updatedKms })
    return { success: true }
  } catch (err: any) {
    console.error(err)
    return { error: err.message }
  }
}

/**/
/************  EXPORT  ****************/
/**/

export {
  db,
  getVehicules,
  getVehicleById,
  addVehicule,
  updateVehicle,
  deleteVehicle,
  addDoneMaintenance,
  getDoneMaintenance,
  addRecommendedMaintenance,
  updateRecommendedMaintenance,
  deleteRecommendedMaintenance,
  getVehicleDataById,
  getAllVehicleData,
  addVehicleData
}
export type { IVehicle }
