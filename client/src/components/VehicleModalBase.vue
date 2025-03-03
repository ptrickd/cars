<template>
  <div>
    <v-dialog
      :visible="$props.visible"
      modal
      :pt="{
        root: 'border-none',
        margin: 0,
        padding: 0,
        mask: {
          style: 'backdrop-filter: blur(2px)'
        }
      }"
      ><template #container="{}">
        <section class="main">
          <h2 class="title">{{ $props.title }}</h2>
          <div class="input-group">
            <label for="brand" class="input-label">Brand</label>
            <v-inputtext
              id="brand"
              v-model="brand"
              name="brand"
              aria-describedby="brand"
              class="input-value"
            />
          </div>
          <div class="input-group">
            <label for="model" class="input-label">Model</label>
            <v-inputtext
              id="model"
              v-model="model"
              name="model"
              aria-describedby="model"
              class="input-value"
            />
          </div>
          <div class="input-group">
            <label for="year" class="input-label">Year</label>
            <v-select
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
            <v-inputnumber
              id="currentKms"
              v-model="currentKms"
              name="currentKms"
              aria-describedby="currentKms"
              class="input-value"
            />
          </div>

          <div class="input-group">
            <label for="unit" class="input-label">Mileage Unit</label>

            <v-select
              id="unit"
              :options="intervalValues"
              optionLabel="name"
              v-model="selectedUnit"
              name="unit"
              aria-describedby="interval maintenance"
              placeholder="Select a Unit"
              class="input-value"
            />
          </div>
          <div class="buttons">
            <v-button
              class="button"
              @click="$emit('toggleVisible')"
              label="Cancel"
              severity="danger"
            />
            <v-button
              class="button"
              @click="actionOnClick(model, brand, chosenYear, currentKms, selectedUnit.name)"
              >{{ buttonActionLabel }}</v-button
            >
          </div>
        </section>
      </template></v-dialog
    >
  </div>
</template>
<style scoped>
.main {
  margin: 20px;
}

.title {
  width: 100%;
  text-align: center;
}

.input-label {
  padding-right: 10px;
  width: 35%;
}

.input-value {
  width: 65%;
}

.input-group {
  width: 100%;

  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.buttons {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.button {
  margin: 5px;
}
</style>
<script setup lang="ts">
import { ref } from 'vue'
import { type IVehicle } from '@/idb/db'

interface IErrorValidation {
  brand: string
  model: string
  year: string
  currentMileage: string
  mileageUnit: string
}

interface IProps {
  visible: boolean
  title: string
  buttonActionLabel: string
  vehicle?: IVehicle
  actionOnClick: (
    model: string,
    brand: string,

    chosenYear: string,
    currentKms: number,
    selectedUnit: string
  ) => Promise<void>

  errorValidation: IErrorValidation
}
const props = defineProps<IProps>()

const emit = defineEmits(['toggleVisible'])

const createYears = () => {
  const arrayOfYears = []
  for (let i = 2024; i >= 1900; i--) arrayOfYears.push(String(i))
  return arrayOfYears
}
const arrayOfYears = createYears()

const date = new Date()
const currentYear = date.getFullYear()

const id = ref(-1)
const brand = ref('')
const model = ref('')
const chosenYear = ref(String(currentYear))
const currentKms = ref(0)
const selectedUnit = ref()
const yearsOptions = ref(arrayOfYears)

if (props?.vehicle?.id) {
  id.value = props.vehicle.id
  brand.value = props.vehicle.brand
  model.value = props.vehicle.model
  chosenYear.value = props.vehicle.year
  currentKms.value = props.vehicle.currentKms
  selectedUnit.value = props.vehicle.selectedUnit
}

let intervalValues = ref([
  {
    name: 'kms',
    code: 'kms'
  },
  {
    name: 'miles',
    code: 'miles'
  }
])
</script>
