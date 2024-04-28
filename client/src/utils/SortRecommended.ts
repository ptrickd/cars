import { diffMonths } from './DateUtils'
import { MaintenanceUnit } from '@/constants/enum'
interface IRecommendedMaintenance {
  id: number
  name: string
  interval: number
  unit: MaintenanceUnit
}

interface IPastMaintenance {
  name: string
  maintenanceId: number
  currentKms: number
  currentDate: Date
  interval: number
  unit: MaintenanceUnit
}
interface ICarStats {
  currentMileage: number
  unit: MaintenanceUnit
}

interface ICurrentMaintenance {
  maintenanceId: number
  name: string
  lastMaintenanceKms: number
  lastMaintenanceDate: Date | null
  currentKms: number
  interval: number
  overdue: boolean
  unit: MaintenanceUnit
}

const currentMaintenance: ICurrentMaintenance[] = []

const createNewEntrie = (
  carStats: ICarStats,
  recommendedItem: IRecommendedMaintenance,
  lastMaintenance: IPastMaintenance | number
) => {
  //Handling if interval is in kms, month or years

  //Adding lastMaintenance Kms
  let lastMaintenanceKms = 0
  let lastMaintenanceDate: Date | null = null
  const todayDate = new Date()
  //Adding overdue
  let overdue = false
  if (recommendedItem.unit === MaintenanceUnit.KMS) {
    if (typeof lastMaintenance !== 'number') {
      lastMaintenanceKms = lastMaintenance.currentKms
      lastMaintenanceDate = lastMaintenance.currentDate
    }
    if (carStats.currentMileage - lastMaintenanceKms > recommendedItem.interval) {
      overdue = true
    }
  } else if (recommendedItem.unit === MaintenanceUnit.MONTHS) {
    if (typeof lastMaintenance !== 'number') {
      lastMaintenanceKms = lastMaintenance.currentKms
      lastMaintenanceDate = lastMaintenance.currentDate
    }
    if (lastMaintenanceDate == null) {
      lastMaintenanceDate = new Date(0)
    }
    if (diffMonths(todayDate, lastMaintenanceDate) >= recommendedItem.interval) {
      overdue = true
    }
  } else if (recommendedItem.unit === MaintenanceUnit.YEARS) console.log('year')

  currentMaintenance.push({
    maintenanceId: recommendedItem.id,
    name: recommendedItem.name,
    lastMaintenanceKms: lastMaintenanceKms,
    lastMaintenanceDate: lastMaintenanceDate,
    currentKms: carStats.currentMileage,
    interval: recommendedItem.interval,
    overdue: overdue,
    unit: carStats.unit
  })
}

export const sortRecommended = (
  carStats: ICarStats,
  recommendedMaintenance: IRecommendedMaintenance[],
  pastMaintenance: IPastMaintenance[]
) => {
  // console.log(recommendedMaintenance)
  // console.log(pastMaintenance)
  /*
  Need to find the newer object from each recommended maintenance
  Find id on recommendedMaintenance object
  Find data
  If other object lastMaintenance list has same id compare date
  Whatever date is the earliest goes on the object

  */

  // const lastMaintenanceList = [] //

  recommendedMaintenance.forEach((recommendedItem) => {
    const index = pastMaintenance.findIndex(
      (maintenance) => maintenance.maintenanceId === recommendedItem.id
    )
    console.log(recommendedItem)
    console.log(index)
    //if index  = -1 then just aadd object
    if (index === -1) {
      createNewEntrie(carStats, recommendedItem, 0)
    }
    //else then remove the object with the maintenanceId  matching
    //then adding the new object
  })
  // console.log(Object.fromEntries(tempMap))

  return currentMaintenance
}
