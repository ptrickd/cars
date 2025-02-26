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
import { addVehicule, addVehicleData } from '@/idb/db'
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
    const vehicleResponse = await addVehicule(brand, model, chosenYear, currentKms, selectedUnit)

    if (vehicleResponse.id) {
      const dataResponse = await addVehicleData(vehicleResponse.id, selectedUnit, currentKms)
      if (dataResponse.success) {
        store.addVehicleData(vehicleResponse.id, currentKms, selectedUnit)
        brand = ''
        model = ''
        chosenYear = ''
        currentKms = 0
        visible.value = false
      } else {
        console.error('error saving')
        console.error(dataResponse)
      }
    } else {
      console.error('error saving')
      console.error(vehicleResponse)
    }
  } else {
    console.error('missing value')
    console.error('error')
  }
}
</script>
