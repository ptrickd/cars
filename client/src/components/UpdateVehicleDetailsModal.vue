<template>
  <vue-dialog
    v-model:visible="visible"
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
        <label for="year">Testing</label>
        <drop-down
          id="year"
          v-model="chosenYear"
          :options="yearsOptions"
          name="testingInput"
          aria-describedby="testingInput"
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
        <vue-button class="button" @click="visible = false" label="Cancel" severity="danger" />
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
const createYears = () => {
  const arrayOfYears = []
  for (let i = 2024; i >= 1900; i--) arrayOfYears.push(String(i))
  return arrayOfYears
}
const arrayOfYears = createYears()

const date = new Date()
const currentYear = date.getFullYear()

const visible = ref(true)
const brand = ref('')
const model = ref('')
const chosenYear = ref(String(currentYear))
const currentKms = ref(0)
const yearsOptions = ref(arrayOfYears)

const handleUpdateBtnClicked = () => {
  console.log('handle button clicked')
}
</script>
