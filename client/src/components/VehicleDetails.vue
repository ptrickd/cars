<template>
  <div v-if="vehicle">
    <h1>Vehicle Details</h1>

    <VehiculeSpecs :vehicle="vehicle" />
    <vue-accordion>
      <vue-accordion-tab header="Recommended Maintenance List">
        <ListRecommended :id="Number($route.params.id)" />

        <AddRecommendedModal :id="Number($route.params.id)" />
      </vue-accordion-tab>
    </vue-accordion>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getVehicleById, type IVehicle } from '@/idb/db'
//add components list
import ListRecommended from './ListRecommended.vue'
import AddRecommendedModal from './AddRecommendedModal.vue'
import VehiculeSpecs from './VehicleSpecs.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const vehicleId = Number(route.params.id)
const vehicle = ref<IVehicle | null>(null)
const vehicleFound = async () => {
  const response = await getVehicleById(vehicleId)
  if (response && !('error' in response)) {
    vehicle.value = response
  }
}
vehicleFound()
</script>
