interface IRecommendedMaintenance {
  id: number
  name: string
  interval: number
  unit: string
}

interface IPastMaintenance {
  name: string
  maintenanceId: number
  currentKms: number
  interval: number
  unit: string
}
interface ICarStats {
  currentMileage: number
  unit: string
}

interface ICurrentMaintenance {
  maintenanceId: number
  name: string
  lastMaintenanceKms: number
  currentKms: number
  interval: number
  overdue: boolean
  unit: string
  date: Date
}

// interface IArgs {
//   carStats: ICarStats
//   recommendedMaintenance: IRecommendedMaintenance[]
//   pastMaintenance: IPastMaintenance[]
// }

const currentMaintenance: ICurrentMaintenance[] = []

const createNewEntrie = (
  carStats: ICarStats,
  recommendedItem: IRecommendedMaintenance,
  lastMaintenance: IPastMaintenance | number
) => {
  //Adding lastMaintenance Kms

  let lastMaintenanceKms = 0
  if (typeof lastMaintenance !== 'number') {
    lastMaintenanceKms = lastMaintenance.currentKms
  }

  //Adding overdue

  let overdue = false
  if (carStats.currentMileage - lastMaintenanceKms > recommendedItem.interval) {
    overdue = true
  }

  currentMaintenance.push({
    maintenanceId: recommendedItem.id,
    name: recommendedItem.name,
    lastMaintenanceKms: lastMaintenanceKms,
    currentKms: carStats.currentMileage,
    interval: recommendedItem.interval,
    overdue: overdue,
    unit: carStats.unit,
    date: new Date()
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
