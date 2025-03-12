<template>
  <div class="top-container">
    <div class="grid-item" v-if="props.vehicle.brand">
      <p>{{ props.vehicle.brand }} {{ props.vehicle.model }}</p>
    </div>

    <div class="grid-item">
      <p>{{ props.vehicle.year }}</p>
    </div>
    <div class="grid-item button">
      <p>{{ props.vehicle.currentKms }} {{ props.vehicle.selectedUnit }}</p>
      <v-button label="Update" text icon="pi pi-user-edit" />
    </div>
  </div>
</template>

<style scoped>
.top-container {
  margin-left: auto;
  margin-bottom: auto;

  display: grid;

  grid-template-columns: auto;
  grid-template-rows: auto auto;
  gap: 20px 20px;
}
.grid-item {
  min-width: 100px;
  padding-left: 20px;

  display: flex;
  align-items: flex-end;

  font-size: 110%;
  text-align: center;
}

.button {
  display: flex;
  align-items: baseline;
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
