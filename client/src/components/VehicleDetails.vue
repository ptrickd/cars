<template>
  <div v-if="vehicle">
    <header>
      <h1>Vehicle Details</h1>
      <v-button icon="pi pi-user-edit" text @click="handleUpdateClicked()"></v-button>
      <v-button icon="pi pi-trash" text @click="handleDeleteClicked(vehicleId)"></v-button>
    </header>

    <VehiculeSpecs v-if="vehicle" :vehicle="vehicle" :is-card-view="false" />
    <v-accordion>
      <v-accordion-panel value="vehicle.id">
        <v-accordion-header class="accordion-header"
          >Recommended Maintenance List</v-accordion-header
        >
        <v-accordion-content>
          <ListRecommended :id="vehicleId" />

          <AddRecommendedModal :id="vehicleId" />
          <div v-if="!hasRecommendedMaintenance">
            <h3>Or auto generate some for a easy start!</h3>
            <v-button @click="handleGenerateRecommended()">Auto Generate</v-button>
          </div>
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
import { onMounted, onUnmounted, ref, type Ref } from 'vue'
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
import { DistanceUnit, RECOMMENDED_MAINTENANCES_AUTO_GENERATED } from '@/constants/constants'

//Function
import { convertKmToMiles } from '@/utils/converter'

//Db
import { getRecommendedMaintenanceByVehicleId, addRecommendedMaintenance } from '@/idb/db'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const vehicleId = ref(Number(route.params.id))
const visible = ref(false)
const hasRecommendedMaintenance = ref(false)

/*
 * Lifecycle
 */
onUnmounted(() => {
  subscription.unsubscribe()
})

onMounted(async () => {
  const recommendedList = await getRecommendedMaintenanceByVehicleId(vehicleId.value)
  if (Array.isArray(recommendedList) && recommendedList.length > 0) {
    hasRecommendedMaintenance.value = true
  }
})

/*
 * Observable
 */

const vehicle: Ref<IVehicle | undefined> = ref(undefined)

const vehicleObservable = liveQuery(() => {
  console.log(db.vehicle.where('id').equals(vehicleId.value).first())
  const response = db.vehicle.where('id').equals(vehicleId.value).first()
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

const handleGenerateRecommended = () => {
  RECOMMENDED_MAINTENANCES_AUTO_GENERATED.forEach(async (maintenance) => {
    const { name, interval, unit } = maintenance

    await addRecommendedMaintenance(name, interval, unit, vehicleId.value)
    hasRecommendedMaintenance.value = true
  })
}
</script>
