import { reactive } from 'vue'

/*
 * vehicle id: updatedKms, selectUnit
 */

const map = new Map()

export const store = reactive({
  vehicles: map,
  addVehicleData(vehicleId: number, updatedKms: number, unit: string) {
    this.vehicles.set(vehicleId, { updatedKms, unit })
  }
})
