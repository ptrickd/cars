<template>
  <div>
    <div class="input-group">
      <label for="name">Name</label>
      <input-text id="name" v-model="$props.name" name="name" aria-describedby="name maintenance" />
      <!-- <inline-message v-if="nameValidationError.length !== 0" severity="error">{{
        nameValidationError
      }}</inline-message> -->
    </div>
    <div class="input-group">
      <label for="interval">Interval</label>

      <input-text
        id="interval"
        v-model="$props.interval"
        name="interval"
        aria-describedby="interval maintenance"
      />
      <!-- <inline-message v-if="intervalValidationError.length !== 0" severity="error">{{
        intervalValidationError
      }}</inline-message> -->
    </div>
    <div class="input-group">
      <label for="unit">Unit</label>

      <drop-down
        id="unit"
        :options="maintenanceUnitValues"
        optionLabel="name"
        v-model="unit1"
        name="unit"
        aria-describedby="interval maintenance"
        placeholder="Select a Unit"
      />
      <!-- <inline-message v-if="unitValidationError.length !== 0" severity="error">{{
        unitValidationError
      }}</inline-message> -->
    </div>
  </div>
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
//Import
import { ref } from 'vue'
import { MaintenanceUnit } from '@/constants/enum'
//Types
interface IProps {
  name: string
  interval: string
  unit: string
}

//Props
const props = defineProps<IProps>()

//Variables
let maintenanceUnitValues = ref([
  {
    name: 'kms',
    code: MaintenanceUnit.KMS
  },
  {
    name: 'months',
    code: MaintenanceUnit.MONTHS
  },
  {
    name: 'years',
    code: MaintenanceUnit.YEARS
  }
])
let unit1 = ref({ name: props.unit, code: '' })
</script>
