<template class="main">
  <v-button label="Add" @click="visible = true" />
  <v-dialog
    v-model:visible="visible"
    modal
    header="Add Maintenance"
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
      <v-message v-if="nameValidationError.length !== 0" severity="error">{{
        nameValidationError
      }}</v-message>
    </div>
    <div class="input-group">
      <label for="interval">Interval</label>

      <input-number
        id="interval"
        v-model="interval"
        name="interval"
        aria-describedby="interval maintenance"
      />
      <v-message v-if="intervalValidationError.length !== 0" severity="error">{{
        intervalValidationError
      }}</v-message>
    </div>
    <div class="input-group">
      <label for="unit">Unit</label>

      <v-select
        id="unit"
        :options="maintenanceUnitValues"
        optionLabel="name"
        v-model="unit"
        name="unit"
        aria-describedby="interval maintenance"
        placeholder="Select a Unit"
      />
      <v-message v-if="unitValidationError.length !== 0" severity="error">{{
        unitValidationError
      }}</v-message>
    </div>
    <!--  -->
    <div class="buttons">
      <v-button class="button" @click="visible = false" label="Cancel" severity="danger" />
      <v-button class="button" label="Add" @click="handleAddBtnClicked()" />
    </div>
  </v-dialog>
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

interface IProps {
  id: number
}

const props = defineProps<IProps>()

//Variables
let name = ref('')
let interval = ref(0)
let unit = ref({ name: '', code: '' })
let visible = ref(false)

let intervalValidationError = ref('')
let nameValidationError = ref('')
let unitValidationError = ref('')

const toast = useToast()

const handleAddBtnClicked = async () => {
  const isValidationPassed = handleValidation()
  if (isValidationPassed) {
    const response = await addRecommendedMaintenance(
      name.value,
      interval.value,
      unit.value.code as MaintenanceUnit,
      props.id
    )
    console.log(response)
    if (response.success) {
      console.log('success')
      //send toast confirming the maintenance has benn added
      toast.add({ severity: 'info', detail: 'New Maintenance Saved!' })
      visible.value = false
      //refresh list in UI
      emit('refreshRecommendedList')
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
  if (interval.value === 0) {
    intervalValidationError.value = 'Must be at least 3 characters.'
  } else if (typeof interval.value !== 'number') {
    intervalValidationError.value = 'Must be a number.'
  } else if (interval.value < 1) {
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
  ) {
    return true
  } else return false
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

const emit = defineEmits(['refreshRecommendedList'])
</script>
