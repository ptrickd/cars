<template>
  <div class="top-container">
    <div v-if="Array.isArray(vehicleList) && !vehicleList.length">
      <p>No vehicle added yet!</p>
    </div>

    <div v-else-if="Array.isArray(vehicleList)">
      <ol>
        <li v-for="vehicle in vehicleList" :key="vehicle.id">
          <div class="grid-item">
            <p class="label">Brand:&nbsp;</p>
            <p>{{ vehicle.brand }}</p>
          </div>
          <div class="grid-item">
            <p class="label">Model:&nbsp;</p>
            <p>{{ vehicle.model }}</p>
          </div>
          <div class="grid-item">
            <p class="label">Year:&nbsp;</p>
            <p>{{ vehicle.year }}</p>
          </div>
          <div class="grid-item">
            <p class="label">Mileage:&nbsp;</p>
            <p>{{ vehicle.currentKms }} kms</p>
          </div>
          <vue-button class="pi pi-arrow-right" @click="$router.push(`/vehicle/${vehicle.id}`)" />
        </li>
      </ol>
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
