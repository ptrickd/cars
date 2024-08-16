<template>
  <vue-dialog
    v-model:visible="isVisible"
    modal
    header="Update Vehicle Information"
    :pt="{
      root: 'border-none',
      mask: {
        style: 'backdrop-filter: blur(2px)'
      }
    }"
    ><div>
      <div class="input-group">
        <label for="brand">Brand</label>
        <input-text id="brand" v-model="brand" name="brand" aria-describedby="brand" />
      </div>
      <div class="input-group">
        <label for="model">Model</label>
        <input-text id="model" v-model="model" name="model" aria-describedby="model" />
      </div>
      <div class="input-group">
        <label for="year">Year</label>
        <drop-down
          id="year"
          v-model="chosenYear"
          :options="yearsOptions"
          name="year"
          aria-describedby="year"
          placeholder="Select a year"
        />
      </div>
      <div class="input-group">
        <label for="currentKms">Current Mileage</label>
        <input-number
          id="currentKms"
          v-model="currentKms"
          name="currentKms"
          aria-describedby="currentKms"
        />
      </div>

      <div class="buttons">
        <vue-button class="button" @click="handleCancelClicked" label="Cancel" severity="danger" />
        <vue-button class="button" label="Add" @click="handleUpdateBtnClicked()" />
      </div></div
  ></vue-dialog>
</template>
<style scoped>
.main {
  padding: 10px;
}
.input-group {
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
  }
}
.buttons {
  display: flex;
  justify-content: flex-end;
}
.button {
  margin: 5px;
}
</style>
<script setup lang="ts">
import { ref } from 'vue'

interface IVehicle {
  brand: string
  model: string
  year: string
  currentKms: number
}

interface IProps {
  vehicle: IVehicle | null
  visible: boolean
}

const props = defineProps<IProps>()

const createYears = () => {
  const arrayOfYears = []
  for (let i = 2024; i >= 1900; i--) arrayOfYears.push(String(i))
  return arrayOfYears
}
const arrayOfYears = createYears()
const isVisible = ref(props.visible)
const brand = ref(props?.vehicle?.brand || '')
const model = ref(props?.vehicle?.model || '')
const chosenYear = ref(props?.vehicle?.year || '')
const currentKms = ref(props?.vehicle?.currentKms || 0)
const yearsOptions = ref(arrayOfYears)

const handleUpdateBtnClicked = () => {
  console.log('handle button clicked')
}

const handleCancelClicked = () => console.log('Cancel has been clicked')
</script>
