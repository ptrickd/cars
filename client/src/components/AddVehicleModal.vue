<template class="main">
  <vue-button label="Add Vehicule" @click="visible = true" />
  <vue-dialog v-model:visible="visible" modal header="Add a new vehicle" :style="{ width: '25rem' }"
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
      <div class="input-group">
        <label for="unit">Unit</label>

        <drop-down
          id="unit"
          :options="distanceUnitValues"
          optionLabel="name"
          v-model="unit"
          name="unit"
          aria-describedby="interval maintenance"
          placeholder="Select a Unit"
        />
        <!-- <inline-message v-if="unitValidationError.length !== 0" severity="error">{{
          unitValidationError
        }}</inline-message> -->
      </div>

      <div class="buttons">
        <vue-button class="button" @click="visible = false" label="Cancel" severity="danger" />
        <vue-button class="button" label="Add" @click="handleAddBtnClicked()" />
      </div></div
  ></vue-dialog>
</template>
<!-- - Brand
- Model
- Year
- Mileage  -->
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
import { addVehicule } from '@/idb/db'
import { MaintenanceUnit } from '@/constants/enum'

const createYears = () => {
  const arrayOfYears = []
  for (let i = 2024; i >= 1900; i--) arrayOfYears.push(String(i))
  return arrayOfYears
}
const arrayOfYears = createYears()

const date = new Date()
const currentYear = date.getFullYear()

const visible = ref(false)
const brand = ref('')
const model = ref('')
const chosenYear = ref(String(currentYear))
const currentKms = ref(0)
const yearsOptions = ref(arrayOfYears)
let unit = ref({ name: '', code: '' })
const handleAddBtnClicked = async () => {
  if (model.value.length !== 0 && brand.value.length !== 0 && unit.value.name.length !== 0) {
    const response = await addVehicule(brand.value, model.value, chosenYear.value, currentKms.value)
    if (response.success) {
      visible.value = false
      brand.value = ''
      model.value = ''
      chosenYear.value = String(currentYear)
      currentKms.value = 0
    }
  } else {
    console.log('missing value')
  }
}
const distanceUnitValues = ref([
  {
    name: 'kms',
    code: MaintenanceUnit.KMS
  }
])
</script>
