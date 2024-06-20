<template>
  <main>
    <Toast />
    <div class="top-container">
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
    <vue-accordion>
      <!-- <vue-accordion-tab header="Current Maintenance List">
        <CurrentRecommended
          :list="
            sortRecommended(
              CAR_STATS,
              RECOMMENDED_MAINTENANCE_KMS_MONTHS_YEARS,
              PAST_MAINTENANCE_KMS_MONTHS_YEARS_1_OVERDUE
            )
          "
        />
      </vue-accordion-tab> -->
      <vue-accordion-tab header="Recommended Maintenance List">
        <ListRecommended :list="list" @refreshRecommendedList="getList()" />

        <AddRecommendedModal @refreshRecommendedList="getList()" />
      </vue-accordion-tab>
    </vue-accordion>
  </main>
</template>

<style scoped>
main {
  min-width: 400px;
}
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
//Imports Lib
import { onMounted, ref } from 'vue'
// import { liveQuery } from 'dexie'
// import { useObservable } from '@vueuse/rxjs'
//Fake data
import {
  CAR_STATS
  // RECOMMENDED_MAINTENANCE_KMS_MONTHS_YEARS
  // PAST_MAINTENANCE_KMS_MONTHS_YEARS_1_OVERDUE
} from './fakeData/sortRecommended'
import Toast from 'primevue/toast'
//Import Function
// import { sortRecommended } from './utils/SortRecommended'

//Components
import ListRecommended from './components/ListRecommended.vue'
// import CurrentRecommended from './components/CurrentRecommended.vue'
import AddRecommendedModal from './components/AddRecommendedModal.vue'
// import UpdateRecommendedModal from './components/UpdateRecommendedModal.vue'

//Database
import { db } from './idb/db'

//Types
import type { IRecommended } from 'types/types'

//Lifecycle
onMounted(() => {
  getList()
})
//Variable
let list = ref<IRecommended[]>([])
//Functions

const getList = async () => {
  list.value = await db.recommendedMaintenance.toArray()
}

// console.log(list())
</script>
