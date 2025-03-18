<template>
  <v-button @click="visible = true">Add Vehicle</v-button>
  <VehicleModalBase
    :visible="visible"
    :title="title"
    :buttonActionLabel="label"
    :actionOnClick="handleAddBtnClicked"
    @toggleVisible="visible = false"
    :errorValidation="errorValidation"
  />
</template>
<script setup lang="ts">
//Vue
import { ref } from 'vue'

//Component
import VehicleModalBase from './VehicleModalBase.vue'

//Db
import { addVehicle } from '@/idb/db'
import { store } from '@/store/store'

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
  if (model.length !== 0 && brand.length !== 0 && selectedUnit.length !== 0) {
    const vehicleResponse = await addVehicle(brand, model, chosenYear, currentKms, selectedUnit)
  } else {
    console.error('missing value')
    console.error('error')
  }
}
</script>
