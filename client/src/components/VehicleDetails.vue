<template>
  <div v-if="vehicle">
    <header>
      <h1>Vehicle Details</h1>
      <v-button icon="pi pi-user-edit" text @click="handleUpdateClicked()"></v-button>
      <v-button
        icon="pi pi-trash"
        text
        @click="handleDeleteClicked(Number($route.params.id))"
      ></v-button>
    </header>

    <VehiculeSpecs v-if="vehicle" :vehicle="vehicle" />
    <v-accordion>
      <v-accordion-panel value="vehicle.id">
        <v-accordion-header class="accordion-header"
          >Recommended Maintenance List</v-accordion-header
        >
        <v-accordion-content>
          <ListRecommended :id="Number($route.params.id)" />

          <AddRecommendedModal :id="Number($route.params.id)" />
        </v-accordion-content>
      </v-accordion-panel>
    </v-accordion>
  </div>
  <UpdateVehicleDetailsModal
    v-if="vehicle"
    :visible="visible"
    :vehicle="vehicle"
    @toggle-visible="visible = false"
  />
</template>
<style scoped>
header {
  display: flex;
}
.accordion-header {
  font-size: 1.5rem;
}
</style>
<script setup lang="ts">
import { onUnmounted, ref, type Ref } from 'vue'
import { db, deleteVehicle, type IVehicle } from '@/idb/db'
import { useRoute, useRouter } from 'vue-router'

//Primevue
import { useToast } from 'primevue'

//add components list
import ListRecommended from './ListRecommended.vue'
import AddRecommendedModal from './AddRecommendedModal.vue'
import VehiculeSpecs from './VehicleSpecs.vue'
import UpdateVehicleDetailsModal from './UpdateVehicleDetailsModal.vue'

//Dexie
import { liveQuery } from 'dexie'

import { DistanceUnit } from '@/constants/constants'
import { convertKmToMiles } from '@/utils/converter'

/*
 * Lifecycle
 */
onUnmounted(() => {
  subscription.unsubscribe()
})

/*
 * Observable
 */

const route = useRoute()
const router = useRouter()
const toast = useToast()

const vehicleId = Number(route.params.id)
const visible = ref(false)

const vehicle: Ref<IVehicle | undefined> = ref(undefined)

const vehicleObservable = liveQuery(() => {
  console.log(db.vehicle.where('id').equals(vehicleId).first())
  const response = db.vehicle.where('id').equals(vehicleId).first()
  if (!response) throw Error('Vehicle do not exist')
  return response
})

const formattedVehicle = (vehicle: IVehicle | undefined) => {
  if (vehicle?.selectedUnit === DistanceUnit.MILES)
    return { ...vehicle, currentKms: convertKmToMiles(vehicle.currentKms) }
  else return vehicle
}

const subscription = vehicleObservable.subscribe({
  next: (ogVehicle) => (vehicle.value = formattedVehicle(ogVehicle)),
  error: (error) => console.error(error)
})

const handleUpdateClicked = () => {
  visible.value = true
}

const handleDeleteClicked = async (id: number) => {
  const response = await deleteVehicle(id)
  console.log(response)
  if (response.success) router.push('/')
  else if (response.error) {
    toast.add({
      severity: 'error',
      detail: 'Oups. Error',
      life: 3000
    })
  }
}
</script>
