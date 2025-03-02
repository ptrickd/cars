<template>
  <div class="top-container">
    <div v-if="Array.isArray(vehicleList) && !vehicleList.length">
      <p>No vehicle added yet!</p>
      <span class="button-novehicle">
        <AddVehicleModal />
      </span>
    </div>

    <div class="button-card-container" v-else-if="Array.isArray(vehicleList)">
      <div class="card-container grid-item">
        <span v-for="vehicle in vehicleList" :key="vehicle.id">
          <v-card class="vehicle-card">
            <template #title>
              <span>{{ vehicle.brand }}&nbsp;{{ vehicle.model }}</span>
            </template>
            <template #content>
              <span>
                <VehicleSpecs
                  :vehicle="{
                    brand: null,
                    model: null,
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
  </div>
</template>

<style scoped>
.top-container {
  height: '100%';
}
.button-card-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 0fr;
  gap: 20px;
  justify-content: flex-end;
}

.card-container {
  margin-bottom: auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-around;
}
.grid-item {
  grid-column-start: 1;
  justify-self: center;
}
.vehicle-card {
  margin: 1rem 1rem;
  flex-grow: 1;
  align-self: baseline;
}
.vehicle-card:hover {
  cursor: pointer;
  font-size: 1.1rem;
  @media (prefers-color-scheme: dark) {
    background-color: var(--p-neutral-950);
  }
  @media (prefers-color-scheme: light) {
    background-color: var(--p-neutral-200);
  }
}
.button {
  padding: auto;

  grid-column-start: 1;
  justify-self: left;
}
</style>

<script setup lang="ts">
//Vue
import { useObservable } from '@vueuse/rxjs'

//Idb
import { db, getVehicles, getDoneMaintenance } from '@/idb/db'
import { liveQuery } from 'dexie'

//Component
import AddVehicleModal from './AddVehicleModal.vue'
import VehicleSpecs from './VehicleSpecs.vue'

/*
 * Persistent storage for indexed db
 */
if (navigator.storage && navigator.storage.persist) {
  navigator.storage.persist().then((persistent) => {
    if (persistent) {
      console.log('Storage will not be cleared except by explicit user action')
    } else {
      console.log('Storage may be cleared by the UA under storage pressure.')
    }
  })
}

const vehicleList: any = useObservable(
  // @ts-ignore
  liveQuery(() => {
    console.log(db.vehicle.toArray())

    return db.vehicle.toArray()
  })
)

const workOnIt = async () => {
  const listVehicles = await getVehicles()
  console.log(listVehicles)

  const maintenance = await getDoneMaintenance()
  console.log(maintenance)
}
workOnIt()
</script>
