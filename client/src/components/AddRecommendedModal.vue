<template class="main">
  <vue-button label="Add" @click="visible = true" />
  <vue-dialog
    v-model:visible="visible"
    modal
    header="Edit Profile"
    :pt="{
      root: 'border-none',
      mask: {
        style: 'backdrop-filter: blur(2px)'
      }
    }"
  >
    <h3>Adding New Recommended Maintenance</h3>
    <div class="input-group">
      <label for="name">Name</label>
      <input-text id="name" v-model="name" name="name" aria-describedby="name maintenance" />
      <inline-message v-if="nameValidationError.length !== 0" severity="error">{{
        nameValidationError
      }}</inline-message>
    </div>
    <div class="input-group">
      <label for="interval">Interval</label>

      <input-text
        id="interval"
        v-model="interval"
        name="interval"
        aria-describedby="interval maintenance"
      />
      <inline-message v-if="intervalValidationError.length !== 0" severity="error">{{
        intervalValidationError
      }}</inline-message>
    </div>
    <div class="input-group">
      <label for="unit">Unit</label>

      <drop-down
        id="unit"
        :options="maintenanceUnitValues"
        optionLabel="name"
        v-model="unit"
        name="unit"
        aria-describedby="interval maintenance"
        placeholder="Select a Unit"
      />
      <inline-message v-if="unitValidationError.length !== 0" severity="error">{{
        unitValidationError
      }}</inline-message>
    </div>
    <!--  -->
    <div class="buttons">
      <vue-button class="button" @click="visible = false" label="Cancel" severity="danger" />
      <vue-button class="button" label="Add" @click="handleAddBtnClicked()" />
    </div>
  </vue-dialog>
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
import { ref } from 'vue'
import { MaintenanceUnit } from '@/constants/enum'
import { addRecommendedMaintenance } from '@/idb/db'
import { useToast } from 'primevue/usetoast'

//Variables
let name = ref('')
let interval = ref('')
let unit = ref({ name: '', code: '' })
let visible = ref(false)

let intervalValidationError = ref('')
let nameValidationError = ref('')
let unitValidationError = ref('')

const toast = useToast()
// toast.add({ severity: 'info', detail: 'Recommended Maintenance Saved!' })
const handleAddBtnClicked = async () => {
  const isValidationPassed = handleValidation()
  if (isValidationPassed) {
    const response = await addRecommendedMaintenance(
      name.value,
      parseInt(interval.value),
      unit.value.code as MaintenanceUnit
    )
    console.log(response)
    if (response.success) {
      console.log('success')
      //send toast confirming the maintenance has benn added
      toast.add({ severity: 'info', detail: 'New Maintenance Saved!' })
      visible.value = false
      //refresh list in UI
    } else if (response.error) {
      toast.add({ severity: 'error', detail: 'Something Went Wrong!' })
      visible.value = false
    }
  }
  //
}

const handleValidation = () => {
  //handle validation for name
  if (name.value.length === 0) {
    nameValidationError.value = 'Must be at least 3 characters.'
  } else {
    nameValidationError.value = ''
  }

  //handle validation for interval
  //must have a value
  //must be number
  //must be positive
  if (interval.value.length === 0) {
    intervalValidationError.value = 'Must be at least 3 characters.'
  } else if (typeof parseInt(interval.value) !== 'number') {
    intervalValidationError.value = 'Must be a number.'
  } else if (parseInt(interval.value) < 1) {
    intervalValidationError.value = 'Must be greater than 0.'
  } else {
    intervalValidationError.value = ''
  }

  //handle validation unit selection
  if (unit.value.code === '') {
    unitValidationError.value = 'You must select a value.'
  } else {
    unitValidationError.value = ''
  }
  if (
    nameValidationError.value === '' &&
    intervalValidationError.value === '' &&
    unitValidationError.value === ''
  )
    return true
  else return false
}
const maintenanceUnitValues = ref([
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

// const emit = defineEmits(['modalClosed'])
</script>
