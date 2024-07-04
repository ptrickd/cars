<template>
  <div class="top-container">
    <div v-if="Array.isArray(vehicleList) && !vehicleList.length">
      <p>No vehicle added yet!</p>
    </div>

    <div v-else-if="Array.isArray(vehicleList)">
      <span v-for="vehicle in vehicleList" :key="vehicle.id">
        <VehicleSpecs :vehicle="vehicle" />
        <vue-button class="pi pi-arrow-right" @click="$router.push(`/vehicle/${vehicle.id}`)" />
      </span>
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
import AddVehicleModal from './AddVehicleModal.vue'
import VehicleSpecs from './VehicleSpecs.vue'
import { db } from '@/idb/db'
import { liveQuery } from 'dexie'
import { useObservable } from '@vueuse/rxjs'

const vehicleList: any = useObservable(
  // @ts-ignore
  liveQuery(() => {
    return db.vehicle.toArray()
  })
)
</script>
