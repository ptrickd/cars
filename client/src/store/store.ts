import { reactive } from 'vue'

/*
 * vehicle id: updatedKms, selectUnit
 */

const map = new Map()

export const store = reactive({
  vehicles: map
})
