<template>
  <div class="top-container">
    <div class="grid-item" v-if="props.vehicle.brand">
      <p>{{ props.vehicle.brand }} {{ props.vehicle.model }}</p>
    </div>

    <div class="grid-item">
      <p>{{ props.vehicle.year }}</p>
    </div>
    <div class="grid-item">
      <p>{{ props.vehicle.currentKms }} {{ props.vehicle.selectedUnit }}</p>
    </div>
  </div>
</template>

<style scoped>
.top-container {
  display: grid;

  grid-template-columns: auto;
  grid-template-rows: auto auto;
  gap: 10px 10px;
  margin-left: auto;
  margin-bottom: auto;
}
.grid-item {
  min-width: 100px;
  display: flex;

  align-items: flex-end;
  font-size: 110%;
  text-align: center;
}
.label {
  color: var(--blue-200);
}
</style>

<script setup lang="ts">
import { onMounted } from 'vue'

interface IVehicle {
  id?: number
  brand: string | null
  model: string | null
  year: string
  currentKms: number
  selectedUnit: string
}

interface IProps {
  vehicle: IVehicle
}

const props = defineProps<IProps>()
onMounted(() => {
  console.log(props.vehicle)
})
</script>
