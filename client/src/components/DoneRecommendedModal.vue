/* Modal use to check done a recommended maintenance*/
<template>
  <v-dialog
    @update:visible="$emit('toggleVisible')"
    v-model:visible="$props.visible"
    header="Maintenance Done"
    v-model:showHeader="showHeader"
    :pt="{
      root: 'border-none',
      mask: {
        style: 'backdrop-filter: blur(2px)'
      }
    }"
  >
    <div class="container">
      <span class="title"
        ><h2>
          <b
            >Mark <u>{{ name }}</u> as done</b
          >
        </h2></span
      >
      <div class="group-info">
        <div class="info">
          <label>Current mileage({{ unitKms }}):</label>&emsp;
          <v-inputnumber v-model="currentKms" />
          <span v-if="isIconWarningShow" class="pi pi-times-circle icon-warning"></span>
        </div>

        <div class="info">
          <label>Date:</label>&emsp;
          <v-datepicker v-model="date" dateFormat="M dd yy" />
          <span v-if="isIconWarningShow" class="pi pi-times-circle icon-warning"></span>
        </div>
      </div>
    </div>
    <div class="buttons">
      <v-button class="button" @click="$emit('toggleVisible')" label="Cancel" severity="danger" />
      <v-button class="button" label="Done" @click="handleClickedDone()" />
    </div>
  </v-dialog>
</template>
<style lang="css" scoped>
label {
  font-size: large;
}

.container {
  width: 100%;
}

.icon-warning {
  color: var(--p-red-500);
}

.title {
  width: 100%;
  text-align: center;
}

.group-info {
  display: flex;
  flex-direction: column;
  align-content: space-between;
}

.info {
  padding: 1.1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  align-items: baseline;
}

.buttons {
  padding: 1.1rem;
  display: flex;
  justify-content: right;
}

.button {
  margin: 5px;
}
</style>
<script setup lang="ts">
//Vue
import { ref } from 'vue'

//Db
import { addDoneMaintenance } from '@/idb/db'

import type { MaintenanceUnit } from '@/constants/constants'

//Constants
const dateObj = new Date()

// The format of the date of the datepicker as no hours, mins, sec, ms
dateObj.setHours(0, 0, 0, 0)

const date = ref(dateObj)

const currentKms = ref(100000)
const dateInvalidMessage = ref('')
const currentKmsInvalidMessage = ref('')
/*
 * Use to hide the header from the modal.
 * Too big, do not fit the modal well.
 */
const showHeader = ref(false)

const unitKms = ref('kms')
const isIconWarningShow = ref(false)

// Types
interface IProps {
  id: number
  name: string
  interval: number
  unit: string
  visible: boolean
}

//Declaration
const props = defineProps<IProps>()
const emit = defineEmits(['toggleVisible'])

const handleClickedDone = async () => {
  /*
  add timestamp/date when creating a maintenance done 
  
  */
  dateInvalidMessage.value = ''
  currentKmsInvalidMessage.value = ''
  console.log('done clicked')
  if (!date.value) {
    dateInvalidMessage.value = 'Mandatory!'
  }

  if (!currentKms) {
    currentKmsInvalidMessage.value = 'Mandatory!'
  }
  console.log(dateInvalidMessage.value)
  console.log(date)
  console.log(currentKms)

  const response = await addDoneMaintenance({
    recommendedMaintenanceId: props.id,
    name: props.name,
    kmsWhenCreated: 0,
    interval: props.interval,
    intervalUnit: props.unit,
    dateOfMaintenanceDone: date.value
  })

  emit('toggleVisible')
}
</script>
