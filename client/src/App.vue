<template>
  <main>
    <Toast />
    <VehiculeSpecs />

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
        <ListRecommended />

        <AddRecommendedModal />
      </vue-accordion-tab>
    </vue-accordion>
  </main>
</template>

<style scoped>
main {
  min-width: 400px;
  max-width: 1000px;
  /* display: flex; */
}
</style>

<script setup lang="ts">
//Imports Lib

import Toast from 'primevue/toast'

//Components
import ListRecommended from './components/ListRecommended.vue'

import AddRecommendedModal from './components/AddRecommendedModal.vue'
import VehiculeSpecs from './components/VehiculeSpecs.vue'
</script>
