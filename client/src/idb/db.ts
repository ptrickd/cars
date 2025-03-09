import Dexie, { type EntityTable } from 'dexie'

import { MaintenanceUnit, DistanceUnit } from '@/constants/constants'
import { convertKmToMiles, convertMilesToKm } from '@/utils/converter'

interface IDone {
  id?: number
  recommendedMaintenanceId: number
  name: string
  currentKms: number
  intervalKms: number
  unit: string
  dateOfMaintenanceDone: Date
}

interface IRecommended {
  id?: number
  vehicleId: number
  name: string
  interval: number
  unit: string
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
  lastUpdatedKmsDate: Date
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
  doneMaintenance:
    '++id, recommendedMaintenanceId, name, currentKms, intervalKms, unit, dateOfMaintenanceDone' // primary key "id" (for the runtime!)
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
async function getVehicles() {
  try {
    const vehicles = await db.vehicle.toArray()
    const newVehicles = vehicles.map((vehicle) => {
      console.log(vehicle)
      if (vehicle.selectedUnit === DistanceUnit.MILES) {
        const inMiles = convertKmToMiles(vehicle.currentKms)
        return { ...vehicle, currentKms: inMiles }
      } else return vehicle
    })
    console.log(vehicles)
    return newVehicles
  } catch (err: any) {
    console.error(err)
    return { error: err.message }
  }
}

//Get vehicle by id
async function getVehicleById(id: number) {
  try {
    const vehicle = await db.vehicle.get({ id: id })

    if (vehicle && vehicle.selectedUnit === DistanceUnit.MILES) {
      const inMiles = convertKmToMiles(vehicle.currentKms)
      return { ...vehicle, currentKms: inMiles }
    } else return vehicle
    return vehicle
  } catch (err: any) {
    console.error(err)
    return { error: err.message }
  }
}

//Vehicle add
async function addVehicle(
  brand: string,
  model: string,
  year: string,
  currentKms: number,
  selectedUnit: string
) {
  try {
    let convertedIfNeededKms = 0
    if (selectedUnit === DistanceUnit.MILES) convertedIfNeededKms = convertMilesToKm(currentKms)
    else convertedIfNeededKms = currentKms

    const id = await db.vehicle.add({
      brand,
      model,
      year,
      currentKms: convertedIfNeededKms,
      selectedUnit
    })

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
    let convertedIfNeededKms = 0
    if (selectedUnit === DistanceUnit.MILES) convertedIfNeededKms = convertMilesToKm(currentKms)
    else convertedIfNeededKms = currentKms

    await db.vehicle.update(id, {
      brand,
      model,
      year,
      currentKms: convertedIfNeededKms,
      selectedUnit
    })

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

// Get done maintenance
async function getDoneMaintenance() {
  let formattedCollection: [] | IDone[] = []

  const collection = await db.doneMaintenance.toArray()

  if (collection) {
    formattedCollection = collection.map((maintenance) => {
      console.log(maintenance)
      if (maintenance.unit === DistanceUnit.MILES) {
        return { ...maintenance, currentKms: convertKmToMiles(maintenance.currentKms) }
      } else return maintenance
    })
  }

  return formattedCollection
}

//Create Done Maintenance
async function addDoneMaintenance({
  recommendedMaintenanceId,
  name,
  currentKms,
  intervalKms,
  unit,
  dateOfMaintenanceDone
}: IDone) {
  try {
    let convertedIfNeededKms = 0
    if (unit === DistanceUnit.MILES) convertedIfNeededKms = convertMilesToKm(currentKms)
    else convertedIfNeededKms = currentKms

    await db.doneMaintenance.add({
      recommendedMaintenanceId,
      name,
      currentKms: convertedIfNeededKms,
      intervalKms,
      unit,
      dateOfMaintenanceDone
    })
  } catch (err: any) {
    console.error(err)
  }
}

/**/
/************  RECOMMENDED MAINTENANCE  ****************/
/**/

//Create
async function addRecommendedMaintenance(
  name: string,
  interval: number,
  unit: string,
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
  unit: string
) {
  try {
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
  const vehicleData = await db.vehicleData.where('id').equals(id).first()

  console.log(vehicleData)
  if (vehicleData?.selectedUnit === DistanceUnit.MILES) {
    const miles = convertKmToMiles(vehicleData.updatedKms)
    return { ...vehicleData, updatedKms: miles }
  }
  return vehicleData
}

async function getAllVehicleData() {
  const vehicleData = await db.vehicleData.toArray()
  const formattedData = vehicleData.map((vehicle) => {
    if (vehicle.selectedUnit === DistanceUnit.MILES) {
      const miles = convertKmToMiles(vehicle.updatedKms)
      return { ...vehicle, updatedKms: miles }
    } else return vehicle
  })

  return formattedData
}

// Create
async function addVehicleData(
  vehicleId: number,
  selectedUnit: string,
  updatedKms: number,
  lastUpdatedKmsDate: Date
) {
  try {
    if (selectedUnit === DistanceUnit.MILES) {
      await db.vehicleData.add({
        vehicleId,
        selectedUnit,
        updatedKms: convertMilesToKm(updatedKms),
        lastUpdatedKmsDate
      })
    } else await db.vehicleData.add({ vehicleId, selectedUnit, updatedKms, lastUpdatedKmsDate })
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
  getVehicles,
  getVehicleById,
  addVehicle,
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
export type { IVehicle, IRecommended }
