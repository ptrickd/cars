<template>
  <vue-button @click="$props.visible">Add Vehicle</vue-button>
  <VehicleModalBase
    :visible="visible"
    :title="title"
    :buttonActionLabel="label"
    :actionOnClick="handleUpdateBtnClicked"
    @toggleVisible="emit('toggleVisible')"
    :errorValidation="errorValidation"
    :vehicle="$props.vehicle"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VehicleModalBase from './VehicleModalBase.vue'

import { updateVehicle, type IVehicle } from '@/idb/db'

interface IProps {
  vehicle: IVehicle
  visible: boolean
}

const props = defineProps<IProps>()

const emit = defineEmits(['toggleVisible'])

const title = ref('Update New Vehicle')
const label = ref('Update')

const errorValidation = { brand: '', model: '', year: '', currentMileage: '', mileageUnit: '' }

const handleUpdateBtnClicked = async (
  model: string,
  brand: string,
  chosenYear: string,
  currentKms: number,
  selectedUnit: string
) => {
  if (model.length !== 0 && brand.length !== 0 && selectedUnit.length !== 0) {
    const response = await updateVehicle(
      props.vehicle.id || -1,
      brand,
      model,
      chosenYear,
      currentKms,
      selectedUnit
    )

    if (response?.success) {
      emit('toggleVisible')
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
