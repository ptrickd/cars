<template>
  <div class="top-container">
    <div class="grid-item" v-if="props.vehicle.brand">
      <p>{{ props.vehicle.brand }}</p>
    </div>
    <div class="grid-item" v-if="props.vehicle.model">
      <p>{{ props.vehicle.model }}</p>
    </div>
    <div class="grid-item">
      <p>{{ props.vehicle.year }}</p>
    </div>
    <div class="grid-item">
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

  align-items: flex-end;
  font-size: 110%;
  text-align: center;
}
.label {
  color: var(--blue-200);
}
</style>

<script setup lang="ts">
interface IVehicle {
  brand: string | null
  model: string | null
  year: string
  currentKms: number
}

interface IProps {
  vehicle: IVehicle
}

const props = defineProps<IProps>()
console.log(props.vehicle)
</script>
