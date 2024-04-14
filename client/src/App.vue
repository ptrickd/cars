<script setup lang="ts">
import { ref } from 'vue'
import MaintenanceItem from './components/MaintenanceItem.vue'

const data = ref({
  brand: 'Toyota',
  model: 'Rav4',
  year: 2014,
  kms: 165000,
  recommendedMaintenance: [{ id: 0, name: 'Oil Change', interval: 5000, unit: 'km' }],
  pastMaintenance: []
})
</script>

<template>
  <header></header>
  <body>
    <ul>
      <li>Brand: {{ data.brand }}</li>
      <li>Model: {{ data.model }}</li>
      <li>Model: {{ data.year }}</li>
      <li>Mileage: {{ data.kms }} km</li>
    </ul>
    <MaintenanceItem
      v-for="item in data.recommendedMaintenance"
      :item="item"
      :key="item.id"
    ></MaintenanceItem>
  </body>
</template>

<style scoped></style>
