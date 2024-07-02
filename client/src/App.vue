<template>
  <main>
    <Toast />
    <RouterView />
    <!-- <VehiculeSpecs /> -->

    <!-- <vue-accordion>
      <vue-accordion-tab header="Recommended Maintenance List">
        <ListRecommended />

        <AddRecommendedModal />
      </vue-accordion-tab>
    </vue-accordion> -->
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
import { RouterView } from 'vue-router'
</script>
