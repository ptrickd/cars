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

    <VehiculeSpecs :vehicle="vehicle" />
    <v-accordion>
      <v-accordion-panel value="vehicle.id">
        <v-accordion-content header="Recommended Maintenance List">
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
</style>
<script setup lang="ts">
import { ref } from 'vue'
import { db, deleteVehicle } from '@/idb/db'
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
import { useObservable } from '@vueuse/rxjs'

const route = useRoute()
const router = useRouter()
const toast = useToast()

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
