<script setup lang="ts">
import { data } from './fakeData/data'

import ListRecommended from './components/ListRecommended.vue'
</script>

<template>
  <main class="main">
    <ul>
      <li>Brand: {{ data.brand }}</li>
      <li>Model: {{ data.model }}</li>
      <li>Model: {{ data.year }}</li>
      <li>Mileage: {{ data.kms }} km</li>
    </ul>
    <ListRecommended :list="data.recommendedMaintenance" />
  </main>
</template>

<style scoped></style>
