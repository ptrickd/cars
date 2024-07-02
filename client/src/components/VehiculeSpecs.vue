<template>
  <div class="top-container">
    <div v-if="Array.isArray(vehicleList) && !vehicleList.length">
      <p>No vehicle added yet!</p>
    </div>

    <div v-else>
      <div class="grid-item">
        <p class="label">Brand:&nbsp;</p>
        <p>{{ CAR_STATS.brand }}</p>
      </div>
      <div class="grid-item">
        <p class="label">Model:&nbsp;</p>
        <p>{{ CAR_STATS.model }}</p>
      </div>
      <div class="grid-item">
        <p class="label">Year:&nbsp;</p>
        <p>{{ CAR_STATS.year }}</p>
      </div>
      <div class="grid-item">
        <p class="label">Mileage:&nbsp;</p>
        <p>{{ CAR_STATS.currentKms }} kms</p>
      </div>
    </div>
  </div>

  <AddVehicleModal />
</template>

<style scoped>
.top-container {
  display: grid;

  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  gap: 10px 10px;
  margin-left: auto;
  margin-bottom: auto;
}
.grid-item {
  min-width: 100px;
  display: flex;
  align-items: flex-start;
  font-size: 110%;
  text-align: center;
}
.label {
  color: var(--blue-200);
}
</style>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CAR_STATS } from '../fakeData/sortRecommended'
import AddVehicleModal from './AddVehicleModal.vue'
import { getVehicule } from '@/idb/db'
import type { IVehicle } from '@/idb/db'

interface IError {
  error: string
}
interface IList {
  value?: IVehicle[] | [] | IError
}
let vehicleList = ref<IList | null | IVehicle[] | IError>()

onMounted(async () => {
  const response = await getVehicule()
  console.log(response)
  if (response) vehicleList.value = response
})
</script>
