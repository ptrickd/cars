<template>
  <div class="top-container">
    <div class="grid-item" v-if="props.vehicle.brand">
      <p>{{ props.vehicle.brand }} {{ props.vehicle.model }}</p>
    </div>

    <div class="grid-item">
      <p>{{ props.vehicle.year }}</p>
    </div>
    <div class="grid-item button">
      <p v-if="!showUpdateKmsInput">
        {{ props.vehicle.currentKms }} {{ props.vehicle.selectedUnit }}
      </p>
      <v-inputnumber v-if="showUpdateKmsInput" v-model="currentKmsUpdated" inputId="integeronly" />
      <v-button
        v-if="!props.isCardView && showUpdateKmsInput"
        label="Cancel"
        text
        icon="pi pi-times-circle"
        severity="danger"
        @click="toggleShowUpdateKmsInput()"
      />
      <v-button
        v-if="!props.isCardView"
        label="Update"
        text
        icon="pi pi-user-edit"
        @click="handleUpdateClicked()"
      />
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
import { ref } from 'vue'
import { updateCurrentKms } from '@/idb/db'

/** Types **/
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
  isCardView: boolean
}

const props = defineProps<IProps>()

const currentKmsUpdated = ref(props.vehicle.currentKms)
const showUpdateKmsInput = ref(false)

const handleUpdateClicked = () => {
  if (!showUpdateKmsInput.value) toggleShowUpdateKmsInput()
  else {
    if (props.vehicle.id) {
      updateCurrentKms(props.vehicle.id, currentKmsUpdated.value)
      toggleShowUpdateKmsInput()
    } else console.error('Could not find vehicle id!')
  }
}
const toggleShowUpdateKmsInput = () => {
  showUpdateKmsInput.value = !showUpdateKmsInput.value
}
</script>
