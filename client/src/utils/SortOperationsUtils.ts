import type { IDone, IRecommended, IVehicle } from '@/idb/db'
import { MaintenanceUnit } from '@/constants/constants'
import { diffMonths } from './DateUtils'
/*
 * computeMaintenanceResult()
 * sortDoneMaintenanceList()
 */

export interface ISortedDone {
  lastMaintenanceDoneKms: number
  intervalUnit: string
  dateOfLastMaintenanceDone: Date
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
  vehicleYear: number,
  recommendedMaintenance: IRecommended
) => {
  const lastMaintenanceDoneKms = 0
  const dateOfLastMaintenanceDone = new Date()
  const { intervalUnit, interval } = recommendedMaintenance
  const remaining = interval + lastMaintenanceDoneKms - currentKms
  const isOverdue = remaining <= 0
  return {
    lastMaintenanceDoneKms,
    intervalUnit,
    dateOfLastMaintenanceDone,
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
  const dateOfLastMaintenanceDone = doneMaintenance.dateOfMaintenanceDone
  const remaining = interval + lastMaintenanceDoneKms - currentKms
  const isOverdue = remaining <= 0

  return { lastMaintenanceDoneKms, intervalUnit, dateOfLastMaintenanceDone, remaining, isOverdue }
}

/*
 */

const computeTimeNoLastMaintenance = (
  vehicleYear: number,
  recommendedMaintenance: IRecommended
) => {
  const lastMaintenanceDoneKms = 0
  const { intervalUnit, interval } = recommendedMaintenance
  const dateOfLastMaintenanceDone = vehicleYear
  let intervalAdjusted = interval

  if (intervalUnit === MaintenanceUnit.YEARS) {
    intervalAdjusted = interval * 12 //months
  }

  const today = new Date()

  //In case of no previous maintenance done, use January as month
  const startYear = vehicleYear
  const startMonth = 0

  const endYear = today.getFullYear()
  const endMonth = today.getMonth()
  //
  const diffYear = (endYear - startYear - 1) * 12
  const diffMonth = 12 - startMonth + endMonth + 1

  const diffBetweenMaintenanceAndLastOne = Math.floor(Math.abs(diffYear + diffMonth))

  let remaining = intervalAdjusted - diffBetweenMaintenanceAndLastOne
  const isOverdue = remaining <= 0
  console.log(`endMonth: ${endMonth}`)
  console.log(`startMonth: ${startMonth}`)
  console.log(`remaining: ${remaining}`)
  console.log(`startYear: ${startYear}`)
  console.log(`endYear: ${endYear}`)
  console.log(`diffYear: ${diffYear}`)
  console.log(`diffMonth: ${diffMonth}`)
  console.log(`diffMonth + diffYear: ${diffMonth + diffYear}`)
  if (intervalUnit === MaintenanceUnit.YEARS) remaining = Number((remaining / 12).toFixed(2))

  return { lastMaintenanceDoneKms, intervalUnit, dateOfLastMaintenanceDone, remaining, isOverdue }
}

/*
 */

const computeTimeWithLastMaintenance = (
  doneMaintenance: IDone,
  recommendedMaintenance: IRecommended
) => {
  const lastMaintenanceDoneKms = doneMaintenance.kmsWhenDone
  const { intervalUnit, interval } = recommendedMaintenance
  const dateOfLastMaintenanceDone = doneMaintenance.dateOfMaintenanceDone

  let intervalAdjusted = interval

  if (intervalUnit === MaintenanceUnit.YEARS) intervalAdjusted = interval * 12 //months

  const today = new Date()

  //In case of no previous maintenance done, use January as month
  const startYear = doneMaintenance.dateOfMaintenanceDone.getFullYear()
  const startMonth = doneMaintenance.dateOfMaintenanceDone.getMonth()

  const endYear = today.getFullYear()
  const endMonth = today.getMonth()

  const diffBetweenMaintenanceAndLastOne = (endYear - startYear) * 12 - startMonth + endMonth

  let remaining = intervalAdjusted - diffBetweenMaintenanceAndLastOne

  if (intervalUnit === MaintenanceUnit.YEARS) remaining = Number((remaining / 12).toFixed(2))

  const isOverdue = remaining <= 0

  return { lastMaintenanceDoneKms, intervalUnit, dateOfLastMaintenanceDone, remaining, isOverdue }
}

export const computeMaintenanceResultByOperationType = (
  currentKms: number,
  vehicleYear: number,
  doneMaintenance: IDone | null,
  recommendedMaintenance: IRecommended
) => {
  let operationType: 'distance' | 'time' = 'distance'

  const { intervalUnit } = recommendedMaintenance

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
        return computeDistanceNoLastMaintenance(currentKms, vehicleYear, recommendedMaintenance)
      else
        return computeDistanceWithLastMaintenance(
          currentKms,
          doneMaintenance,
          recommendedMaintenance
        )
      break
    case 'time': // Type is months or year
      console.log('time')
      if (!doneMaintenance) return computeTimeNoLastMaintenance(vehicleYear, recommendedMaintenance)
      else return computeTimeWithLastMaintenance(doneMaintenance, recommendedMaintenance)
      break
  }
}

export const sortingLastestDoneMaintenance = (doneMaintenances: IDone[] | []) => {
  const sortedDoneMaintenance: IDone[] | [] = []
  console.log(doneMaintenances)
  doneMaintenances.forEach((maintenance) => {
    if (maintenance.id) {
      console.log(maintenance)
    }
  })
  // const test = computeMaintenanceResultByOperationType(
  //   currentKms,
  //   vehicleYear,
  //   null,
  //   recommendedMaintenance
  // )
  // console.log(test)
}
/*
 *   What we do when there is not previous mainteance; Send back empty array
 */

export const sortDoneMaintenanceList = (
  currentKms: number,
  vehicleYear: number,
  doneMaintenances: IDone[] | [],
  recommendedMaintenances: IRecommended[] | []
) => {
  // console.log(doneMaintenances)
  //   console.log(recommendedMaintenances)
  const sortedDoneMaintenance = new Map()

  sortingLastestDoneMaintenance(doneMaintenances)

  doneMaintenances.map((maintenance) => {
    //need to inverse loop recommended the find last doen
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
        dateOfLastMaintenanceDone: maintenance.dateOfMaintenanceDone,
        remaining: remaining,
        isOverdue: isOverdue
      })
    }
  })

  return sortedDoneMaintenance
}
