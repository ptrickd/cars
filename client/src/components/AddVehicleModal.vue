<template>
  <vue-button @click="visible = true">Add Vehicle</vue-button>
  <VehicleModalBase :visible="visible" :title="title" :buttonActionLabel="label" :actionOnClick="handleAddBtnClicked"
    @toggleVisible="visible = false" :errorValidation="errorValidation" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import VehicleModalBase from './VehicleModalBase.vue'

import { addVehicule } from '@/idb/db'

const visible = ref(false)
const title = ref('Add New Vehicle')
const label = ref('Add')

const errorValidation = { brand: '', model: '', year: '', currentMileage: '', mileageUnit: '' }

const handleAddBtnClicked = async (
  model: string,
  brand: string,
  chosenYear: string,
  currentKms: number,
  selectedUnit: string

) => {
  console.log(model,
    brand,
    chosenYear,
    currentKms,
    selectedUnit)
  if (model.length !== 0 && brand.length !== 0 && selectedUnit.length !== 0) {
    const response = await addVehicule(brand, model, chosenYear, currentKms, selectedUnit)

    if (response.success) {
      visible.value = false
      brand = ''
      model = ''
      chosenYear = String(chosenYear)
      currentKms = 0
    } else {
      console.log('error saving')
      console.log(response)
    }
  } else {
    console.log('missing value')
    console.log('error')
  }
}
</script>

<!-- <script setup lang="ts">
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
  if (model.length !== 0 && brand.length !== 0 && unit.name.length !== 0) {
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
</script> -->
