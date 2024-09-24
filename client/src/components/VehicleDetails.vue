<template>
  <div v-if="vehicle">
    <header>
      <h1>Vehicle Details</h1>
      <vue-button icon="pi pi-user-edit" text @click="handleUpdateClicked()"></vue-button>
    </header>

    <VehiculeSpecs :vehicle="vehicle" />
    <vue-accordion>
      <vue-accordion-tab header="Recommended Maintenance List">
        <ListRecommended :id="Number($route.params.id)" />

        <AddRecommendedModal :id="Number($route.params.id)" />
      </vue-accordion-tab>
    </vue-accordion>
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
</style>
<script setup lang="ts">
import { ref } from 'vue'
import { db } from '@/idb/db'
//add components list
import ListRecommended from './ListRecommended.vue'
import AddRecommendedModal from './AddRecommendedModal.vue'
import VehiculeSpecs from './VehicleSpecs.vue'
import UpdateVehicleDetailsModal from './UpdateVehicleDetailsModal.vue'
import { useRoute } from 'vue-router'

import { liveQuery } from 'dexie'
import { useObservable } from '@vueuse/rxjs'

const route = useRoute()
const vehicleId = Number(route.params.id)

const visible = ref(false)

const vehicle: any = useObservable(
  // @ts-ignore
  liveQuery(() => {
    console.log(db.vehicle.where('id').equals(vehicleId).first())
    return db.vehicle.where('id').equals(vehicleId).first()
  })
)
const handleUpdateClicked = () => {
  visible.value = true

  // toast.add({ severity: 'info', detail: 'Feature coming soon' })
}
</script>
