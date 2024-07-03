<template>
  <h1>Vehicle Details</h1>
  <h3>Id:{{ $route.params.id }}</h3>
  <h6>Vehicle specs</h6>
  <vue-accordion>
    <vue-accordion-tab header="Recommended Maintenance List">
      <ListRecommended :id="Number($route.params.id)" />

      <AddRecommendedModal :id="Number($route.params.id)" />
    </vue-accordion-tab>
  </vue-accordion>
</template>
<script setup lang="ts">
//add components list
import ListRecommended from './ListRecommended.vue'
import AddRecommendedModal from './AddRecommendedModal.vue'
</script>
