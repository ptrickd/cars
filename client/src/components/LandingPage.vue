<template>
  <div class="top-container">
    <div v-if="Array.isArray(vehicleList) && !vehicleList.length">
      <p>No vehicle added yet!</p>
    </div>

    <div class="card-container" v-else-if="Array.isArray(vehicleList)">
      <span v-for="vehicle in vehicleList" :key="vehicle.id">
        <v-card class="vehicle-card">
          <template #title
            ><span>{{ vehicle.brand }}&nbsp;{{ vehicle.model }}</span></template
          >
          <template #content>
            <span>
              <VehicleSpecs
                :vehicle="{
                  brand: vehicle.brand,
                  model: vehicle.model,
                  year: vehicle.year,
                  currentKms: vehicle.currentKms,
                  selectedUnit: vehicle.selectedUnit
                }"
                @click="$router.push(`/vehicle/${vehicle.id}`)"
              />
            </span>
          </template>
        </v-card>
      </span>
    </div>
    <span class="button">
      <AddVehicleModal />
    </span>
  </div>
</template>

<style scoped>
.top-container {
  height: '100%';
}

.card-container {
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
  margin-left: auto;
  margin-bottom: auto;
}

.vehicle-card {
  margin: 1rem 1rem;
}
.vehicle-card:hover {
  cursor: pointer;
  font-size: 1.3rem;
}
.button {
  /* float: left; */
  margin-left: 20%;
  padding: auto;
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
    console.log(db.vehicle.toArray())
    return db.vehicle.toArray()
  })
)
</script>
