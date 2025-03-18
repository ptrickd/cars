import Dexie, { type EntityTable } from 'dexie'

//Change name MaintenanceUnit to IntervalUnit
import { MaintenanceUnit, DistanceUnit } from '@/constants/constants'
import { convertKmToMiles, convertMilesToKm } from '@/utils/converter'

/*
 * distanceUnit: miles or kms
 * intervalUnit: miles | kms | years | months
 */
interface IDone {
  id?: number
  recommendedMaintenanceId: number
  name: string
  kmsWhenCreated: number
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

/**/
/************  SCHEMA  ****************/
/**/

// Schema declaration:
db.version(1).stores({
  doneMaintenance:
    '++id, recommendedMaintenanceId, name, kms, interval, unit, dateOfMaintenanceDone' // primary key "id" (for the runtime!)
})

db.version(2).stores({
  recommendedMaintenance: '++id, name, interval, unit, vehicleId'
})

db.version(3).stores({
  vehicle: '++id, brand, model, year, kmsWhenCreated, currentKms, selectedUnit'
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
    const date = new Date()
    const today = date
    if (selectedUnit === DistanceUnit.MILES) convertedIfNeededKms = convertMilesToKm(currentKms)
    else convertedIfNeededKms = currentKms

    const id = await db.vehicle.add({
      brand,
      model,
      year,
      kmsWhenCreated: convertedIfNeededKms,
      currentKms: convertedIfNeededKms,
      selectedUnit,
      lastUpdateCurrentKms: new Date(),
      dateCreated: new Date()
    })

    return { success: true, id }
  } catch (err: any) {
    console.error(err)
    return { error: err.message }
  }
}

/* add update currentkms to vehicle
   is updatevehicle needed - selectedUnit change ??
*/

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

//Update current kms
async function updateCurrentKms(id: number, currentKms: number) {
  try {
    await db.vehicle.update(id, { currentKms })
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
      if (maintenance.intervalUnit === DistanceUnit.MILES) {
        return { ...maintenance, currentKms: convertKmToMiles(maintenance.interval) }
      } else return maintenance
    })
  }

  return formattedCollection
}

//Create Done Maintenance
async function addDoneMaintenance({
  recommendedMaintenanceId,
  name,
  kmsWhenCreated,
  interval,
  intervalUnit,
  dateOfMaintenanceDone
}: IDone) {
  try {
    //what if interval is yaer or months
    //Function for **kmsWhenCreated**
    let convertedIfNeededKms = 0
    if (intervalUnit === DistanceUnit.MILES) convertedIfNeededKms = convertMilesToKm(kmsWhenCreated)
    else convertedIfNeededKms = kmsWhenCreated

    await db.doneMaintenance.add({
      recommendedMaintenanceId,
      name,
      kmsWhenCreated: convertedIfNeededKms,
      interval,
      intervalUnit,
      dateOfMaintenanceDone
    })
  } catch (err: any) {
    console.error(err)
  }
}

/**/
/************  RECOMMENDED MAINTENANCE  ****************/
/**/

//Get By Id
async function getRecommendedMaintenanceByVehicleId(id: number) {
  try {
    const response = await db.recommendedMaintenance.where('vehicleId').equals(id).toArray()
    return response
  } catch (err: any) {
    console.log(err)
    return { error: err.message }
  }
}

//Create
async function addRecommendedMaintenance(
  name: string,
  interval: number,
  intervalUnit: string,
  vehicleId: number
) {
  try {
    await db.recommendedMaintenance.add({ name, interval, intervalUnit, vehicleId })
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
  intervalUnit: string
) {
  try {
    await db.recommendedMaintenance.update(id, { name, interval, intervalUnit })
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

/**/
/************  EXPORT  ****************/
/**/

export {
  db,
  getVehicles,
  getVehicleById,
  addVehicle,
  updateVehicle,
  updateCurrentKms,
  deleteVehicle,
  addDoneMaintenance,
  getDoneMaintenance,
  getRecommendedMaintenanceByVehicleId,
  addRecommendedMaintenance,
  updateRecommendedMaintenance,
  deleteRecommendedMaintenance
}
export type { IVehicle, IRecommended, IDone }
