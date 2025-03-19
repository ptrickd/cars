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
//     lastMaintenanceDoneOn: Date
//     remaining: number
//     isOverdue: boolean
//   }

/*
 *   What we do when there is not previous mainteance; Send back empty array
 */

export const sortDoneMaintenanceList = (
  currentKms: number,
  doneMaintenances: IDone[],
  recommendedMaintenances: IRecommended[]
) => {
  //   console.log(doneMaintenances)
  //   console.log(recommendedMaintenances)
  const sortedDoneMaintenance = new Map()

  doneMaintenances.map((maintenance) => console.log(maintenance))

  return sortedDoneMaintenance
}
