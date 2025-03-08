import { diffMonths } from './DateUtils'
import { MaintenanceUnit } from '@/constants/constants'
interface IRecommendedMaintenance {
  id: number
  name: string
  interval: number
  unit: string
}

interface IPastMaintenance {
  maintenanceId: number
  name: string
  maintenanceKms: number
  maintenanceDate: Date
  unit: string
}
interface ICarStats {
  currentKms: number
  year: string
  unit: string
}

interface ICurrentMaintenance {
  maintenanceId: number
  name: string
  lastMaintenanceKms: number
  lastMaintenanceDate: Date | null
  currentKms: number
  interval: number
  isOverdue: boolean
  unit: string
}

const createNewEntrie = (
  carStats: ICarStats,
  recommendedItem: IRecommendedMaintenance,
  lastMaintenance: IPastMaintenance | null //if null, no pas maintenance
) => {
  //Handling if interval is in kms, month or years

  //Adding lastMaintenance Kms
  let lastMaintenanceKms = 0
  let lastMaintenanceDate: Date | null = null

  const todayDate = new Date()
  //Adding overdue
  let isOverdue = false
  const TWO_YEAR_IN_MONTHS = 24

  switch (recommendedItem.unit) {
    case MaintenanceUnit.KMS:
      if (lastMaintenance !== null) {
        lastMaintenanceKms = lastMaintenance.maintenanceKms
        lastMaintenanceDate = lastMaintenance.maintenanceDate
      } else {
        lastMaintenanceKms = 0
        lastMaintenanceDate = new Date(carStats.year)
      }
      if (carStats.currentKms - lastMaintenanceKms > recommendedItem.interval) isOverdue = true

      break
    case MaintenanceUnit.MONTHS:
      if (lastMaintenance !== null) {
        lastMaintenanceKms = lastMaintenance.maintenanceKms
        lastMaintenanceDate = lastMaintenance.maintenanceDate
      } else {
        lastMaintenanceKms = 0
        lastMaintenanceDate = new Date(carStats.year)
      }

      if (diffMonths(todayDate, lastMaintenanceDate) > recommendedItem.interval) {
        isOverdue = true
      }

      break
    case MaintenanceUnit.YEARS:
      if (lastMaintenance !== null) {
        lastMaintenanceKms = lastMaintenance.maintenanceKms
        lastMaintenanceDate = lastMaintenance.maintenanceDate
      } else {
        lastMaintenanceKms = 0
        lastMaintenanceDate = new Date(carStats.year)
      }

      if (
        diffMonths(todayDate, lastMaintenanceDate) >
        recommendedItem.interval * TWO_YEAR_IN_MONTHS
      ) {
        isOverdue = true
      }
      break
    default:
      console.log('Case not expected')
  }

  if (
    typeof recommendedItem.id === 'number' &&
    typeof recommendedItem.name === 'string' &&
    typeof lastMaintenanceKms === 'number' &&
    typeof lastMaintenanceDate === 'object' &&
    typeof carStats.currentKms === 'number' &&
    typeof recommendedItem.interval === 'number' &&
    typeof isOverdue === 'boolean' &&
    typeof recommendedItem.unit === 'string' &&
    isOverdue
  ) {
    return {
      maintenanceId: recommendedItem.id,
      name: recommendedItem.name,
      lastMaintenanceKms: lastMaintenanceKms,
      lastMaintenanceDate: lastMaintenanceDate,
      currentKms: carStats.currentKms,
      interval: recommendedItem.interval,
      isOverdue: isOverdue,
      unit: recommendedItem.unit
    }
  } else return null
}

export const sortRecommended = (
  carStats: ICarStats,
  recommendedMaintenance: IRecommendedMaintenance[],
  pastMaintenance: IPastMaintenance[]
) => {
  /*
  Need to find the newer object from each recommended maintenance
  Find id on recommendedMaintenance object
  Find data
  If other object lastMaintenance list has same id compare date
  Whatever date is the earliest goes on the object

  */
  const currentMaintenance: ICurrentMaintenance[] = []
  recommendedMaintenance.forEach((recommendedItem) => {
    const NOT_FOUND = -1
    const index = pastMaintenance.findIndex(
      (maintenance) => maintenance.maintenanceId === recommendedItem.id
    )
    if (index === NOT_FOUND) {
      const newEntrie = createNewEntrie(carStats, recommendedItem, null)

      if (newEntrie) currentMaintenance.push(newEntrie)
    } else {
      const newEntrie = createNewEntrie(carStats, recommendedItem, pastMaintenance[index])
      if (newEntrie) currentMaintenance.push(newEntrie)
    }
  })

  return currentMaintenance
}
