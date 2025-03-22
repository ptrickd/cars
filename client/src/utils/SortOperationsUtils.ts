import type { IDone, IRecommended, IVehicle } from '@/idb/db'
import type { ISortedDone } from '@/components/ListRecommended.vue'

/*
 * Args: formattedMaintenanceList,
 */

// interface IArgs {
//   doneMaintenance: IDone
//   recommendedMaintenance: IRecommended
// }

// export interface ISortedDone {
//     recommendedMaintenanceId: number
//     lastMaintenanceDoneKms: number
//     intervalUnit: string
//     lastMaintenanceDate: Date
//     remaining: number
//     isOverdue: boolean
//   }

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
    // console.log('*current kms*')
    // console.log(currentKms)
    // console.log('****************')
    // console.log('*maintenance done*')
    // console.log(maintenance)
    // console.log('****************')
    // console.log('*recommended maintenance*')

    // console.log(recommendedMaintenances)
    // console.log('****************')

    const recommendedMaintenance = recommendedMaintenances.find(
      (recommended) => recommended.name === maintenance.name
    )
    if (recommendedMaintenance) {
      /*
       * Remaining is positive when it is overdue.
       * If negative then it is the remaining left before overdue
       */
      //Valid only id unit is a number not a string
      const remaining = currentKms - maintenance.kmsWhenCreated - recommendedMaintenance.interval

      const isOverdue = remaining > 0 ? true : false

      sortedDoneMaintenance.set(maintenance.name, {
        recommendedMaintenanceId: recommendedMaintenance.id,
        lastMaintenanceDoneKms: maintenance.kmsWhenCreated,
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

//sortMaintenanceToBeDoneList=()=>{}
