<template>
  <div>
    <vue-dialog
      v-model:visible="visible"
      modal
      :pt="{
        root: 'border-none',
        mask: {
          style: 'backdrop-filter: blur(2px)'
        }
      }"
      ><template #container="{ closeCallback }"
        ><section class="main">
          <h3 class="title">{{ modalTitle }}</h3>
          <div class="input-group">
            <label for="brand" class="input-label">Brand</label>
            <input-text
              id="brand"
              v-model="brand"
              name="brand"
              aria-describedby="brand"
              class="input-value"
            />
          </div>
          <div class="input-group">
            <label for="model" class="input-label">Model</label>
            <input-text
              id="model"
              v-model="model"
              name="model"
              aria-describedby="model"
              class="input-value"
            />
          </div>
          <div class="input-group">
            <label for="year" class="input-label">Year</label>
            <drop-down
              id="year"
              v-model="chosenYear"
              :options="yearsOptions"
              name="year"
              aria-describedby="year"
              placeholder="Select a year"
              class="input-value"
            />
          </div>
          <div class="input-group">
            <label for="currentKms" class="input-label">Current Mileage</label>
            <input-number
              id="currentKms"
              v-model="currentKms"
              name="currentKms"
              aria-describedby="currentKms"
              class="input-value"
            />
          </div>
          <div class="input-group">
            <label for="mileageUnit" class="input-label">Mileage Unit</label>
            <input-text
              id="mileageUnit"
              v-model="mileageUnit"
              name="mileageUnit"
              aria-describedby="mileage unit"
              class="input-value"
            />
          </div>
          <div class="buttons">
            <vue-button class="button" @click="closeCallback" label="Cancel" severity="danger" />
            <vue-button class="button" label="Add" @click="closeCallback" />
          </div>
        </section> </template
    ></vue-dialog>
  </div>
</template>
<style scoped>
.main {
  margin: 20px;
}

.title {
  width: 100%;
}

.input-label {
  padding-right: 10px;
}

.input-value {
  width: 70%;
}

.input-group {
  width: 100%;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
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

const visible = ref(true)

const createYears = () => {
  const arrayOfYears = []
  for (let i = 2024; i >= 1900; i--) arrayOfYears.push(String(i))
  return arrayOfYears
}
const arrayOfYears = createYears()

const brand = ref('Toyota')
const model = ref('Camry')
const chosenYear = ref('2014')
const currentKms = ref(165000)
const yearsOptions = ref(arrayOfYears)
const mileageUnit = ref('kms')

const modalTitle = ref('This a modal test')
</script>
