<template>
  <div>
    <vue-dialog
      v-model:visible="$props.visible"
      modal
      :pt="{
        root: 'border-none',
        mask: {
          style: 'backdrop-filter: blur(2px)'
        }
      }"
      ><template #container="{ closeCallback }"
        ><section class="main">
          <h2 class="title">{{ modalTitle }}</h2>
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
            <label for="unit" class="input-label">Mileage Unit</label>

            <drop-down
              id="unit"
              :options="mileageValues"
              optionLabel="name"
              mileageUnit
              name="unit"
              aria-describedby="interval maintenance"
              placeholder="Select a Unit"
              class="input-value"
            />
          </div>
          <div class="buttons">
            <vue-button
              class="button"
              @click="$emit('close', true)"
              label="Cancel"
              severity="danger"
            />
            <vue-button class="button" label="${buttonActionText}" @click="closeCallback" />
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

interface IProps {
  visible: boolean
}
const props = defineProps<IProps>()

const emit = defineEmits<{ close: [close: boolean] }>()

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

const modalTitle = ref('This a modal test')

let mileageValues = ref([
  {
    name: 'kms',
    code: 'kms'
  },
  {
    name: 'miles',
    code: 'miles'
  }
])

const buttonActionText = ref('Add')
</script>
