import type { IDone, IRecommended, IVehicle } from '@/idb/db'
import { MaintenanceUnit } from '@/constants/constants'
/*
 * computeMaintenanceResult()
 * sortDoneMaintenanceList()
 */

export interface ISortedDone {
  lastMaintenanceDoneKms: number
  intervalUnit: string
  dateOfMaintenanceDone: Date
  remaining: number
  isOverdue: boolean
}

interface IError {
  error: string
}
/*
 *  Args: currentKms, doneMaintenance, recommendedMaintenance
 *  Return: {}
 *  If type is distance(kms or miles)
 *  If type is time(years or months)
 *
 */

const computeDistanceNoLastMaintenance = (
  currentKms: number,
  recommendedMaintenance: IRecommended
) => {
  const lastMaintenanceDoneKms = 0
  const dateOfMaintenanceDone = new Date()
  const { intervalUnit, interval } = recommendedMaintenance
  const remaining = interval + lastMaintenanceDoneKms - currentKms
  const isOverdue = remaining <= 0
  return {
    lastMaintenanceDoneKms,
    intervalUnit,
    dateOfMaintenanceDone,
    remaining,
    isOverdue
  }
}

/*
 */

const computeDistanceWithLastMaintenance = (
  currentKms: number,
  doneMaintenance: IDone,
  recommendedMaintenance: IRecommended
) => {
  const lastMaintenanceDoneKms = doneMaintenance.kmsWhenDone
  const { intervalUnit, interval } = recommendedMaintenance
  const dateOfMaintenanceDone = doneMaintenance.dateOfMaintenanceDone
  const remaining = interval + lastMaintenanceDoneKms - currentKms
  const isOverdue = remaining <= 0

  return { lastMaintenanceDoneKms, intervalUnit, dateOfMaintenanceDone, remaining, isOverdue }
}

/*
 */

const computeTimeNoLastMaintenance = () => {}
const computeTimeWithLastMaintenance = () => {}

export const computeMaintenanceResultByOperationType = (
  currentKms: number,
  doneMaintenance: IDone | null,
  recommendedMaintenance: IRecommended
) => {
  let operationType: 'distance' | 'time' = 'distance'

  const { intervalUnit, interval } = recommendedMaintenance

  /*
   * Determine the type of operartion between compute time and distance
   */
  if (intervalUnit === MaintenanceUnit.KMS || intervalUnit === MaintenanceUnit.MILES)
    operationType = 'distance'
  else if (intervalUnit === MaintenanceUnit.YEARS || MaintenanceUnit.MONTHS) operationType = 'time'

  /*
   * Actual functions return the values
   */
  switch (operationType) {
    case 'distance': //Type is distance(kms or miles)
      console.log('distance')
      if (!doneMaintenance)
        return computeDistanceNoLastMaintenance(currentKms, recommendedMaintenance)
      else
        return computeDistanceWithLastMaintenance(
          currentKms,
          doneMaintenance,
          recommendedMaintenance
        )
      break
    case 'time': // Type is months or year
      console.log('time')
      if (!doneMaintenance) return computeTimeNoLastMaintenance()
      else return computeTimeWithLastMaintenance()
      break
  }
}
/*
 *   What we do when there is not previous mainteance; Send back empty array
 */

export const sortDoneMaintenanceList = (
  currentKms: number,
  doneMaintenances: IDone[] | [],
  recommendedMaintenances: IRecommended[] | []
) => {
  // console.log(doneMaintenances)
  //   console.log(recommendedMaintenances)
  const sortedDoneMaintenance = new Map()

  doneMaintenances.map((maintenance) => {
    console.log('*current kms*')
    console.log(currentKms)
    console.log('****************')
    console.log('*maintenance done*')
    console.log(maintenance)
    console.log('****************')
    console.log('*recommended maintenance*')

    console.log(recommendedMaintenances)
    console.log('****************')

    const recommendedMaintenance = recommendedMaintenances.find(
      (recommended) => recommended.name === maintenance.name
    )
    if (recommendedMaintenance) {
      /*
       * Remaining is positive when it is overdue.
       * If negative then it is the remaining left before overdue
       */
      //Valid only id unit is a number not a string
      const remaining = currentKms - maintenance.kmsWhenDone - recommendedMaintenance.interval

      const isOverdue = remaining > 0 ? true : false

      sortedDoneMaintenance.set(maintenance.name, {
        recommendedMaintenanceId: recommendedMaintenance.id,
        lastMaintenanceDoneKms: maintenance.kmsWhenDone,
        intervalUnit: recommendedMaintenance.intervalUnit,
        dateOfMaintenanceDone: maintenance.dateOfMaintenanceDone,
        remaining: remaining,
        isOverdue: isOverdue
      })
    }
  })

  // console.log(sortedDoneMaintenance)

  return sortedDoneMaintenance
}
