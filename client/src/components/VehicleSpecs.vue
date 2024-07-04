<template>
  <div class="top-container">
    <div class="grid-item">
      <p class="label">Brand:&nbsp;</p>
      <p>{{ props.vehicle.brand }}</p>
    </div>
    <div class="grid-item">
      <p class="label">Model:&nbsp;</p>
      <p>{{ props.vehicle.model }}</p>
    </div>
    <div class="grid-item">
      <p class="label">Year:&nbsp;</p>
      <p>{{ props.vehicle.year }}</p>
    </div>
    <div class="grid-item">
      <p class="label">Mileage:&nbsp;</p>
      <p>{{ props.vehicle.currentKms }} kms</p>
    </div>
  </div>
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
import type { IVehicle } from '@/idb/db'

interface IProps {
  vehicle: IVehicle
}

const props = defineProps<IProps>()
console.log(props.vehicle)
</script>
