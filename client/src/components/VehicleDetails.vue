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
  <UpdateVehicleDetailsModal />
</template>
<style scoped>
header {
  display: flex;
}
</style>
<script setup lang="ts">
import { ref } from 'vue'
import { getVehicleById, type IVehicle } from '@/idb/db'
//add components list
import ListRecommended from './ListRecommended.vue'
import AddRecommendedModal from './AddRecommendedModal.vue'
import VehiculeSpecs from './VehicleSpecs.vue'
import UpdateVehicleDetailsModal from './UpdateVehicleDetailsModal.vue'
import { useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
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

const handleUpdateClicked = () => {
  toast.add({ severity: 'info', detail: 'Feature coming soon' })
}
</script>
