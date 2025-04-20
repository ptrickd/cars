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
      <span class="title" v-if="recommendedMaintenance"
        ><h2>
          <b
            >Mark <u>{{ recommendedMaintenance.name }}</u> as done</b
          >
        </h2></span
      >
      <div class="group-info">
        <div class="info">
          <label>Mileage When Maintenance Occured({{ unitKms }}):</label>&emsp;
          <v-inputnumber v-model="currentKms" />
          <span v-if="isIconWarningShow" class="pi pi-times-circle icon-warning"></span>
        </div>
        <div class="info">
          <label>Date Of Maintenance:</label>&emsp;
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

/* .label {
  width: 100%;
} */

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
import { onMounted, onUpdated, ref } from 'vue'
import type { Ref } from 'vue'

//Db
import { addDoneMaintenance, getRecommendedMaintenanceById } from '@/idb/db'
import type { IRecommended, IResponseRecommended } from '@/idb/db'

// Types
interface IProps {
  id: number
  visible: boolean
  currentKms: number
}

/*
 *  Declaration
 */

//Props
const props = defineProps<IProps>()
const emit = defineEmits(['toggleVisible'])

// Date
const dateObj = new Date()

// The format of the date of the datepicker as no hours, mins, sec, ms
dateObj.setHours(0, 0, 0, 0)
const date = ref(dateObj)

const currentKms = ref(props.currentKms)
const dateInvalidMessage = ref('')
const currentKmsInvalidMessage = ref('')
const unitKms = ref('kms')
const isIconWarningShow = ref(false)

const recommendedMaintenance: Ref<IRecommended | null> = ref(null)

/*
 * Use to hide the header from the modal.
 * Too big, do not fit the modal well.
 */
const showHeader = ref(false)

/*
 * Lifecycle
 */
onMounted(async () => {
  const response: IResponseRecommended | undefined = await getRecommendedMaintenanceById(props.id)

  if (response !== undefined && response.error) {
    console.error(response.error)
  } else if (response !== undefined) {
    const { id, vehicleId, name, interval, intervalUnit } = response
    if (vehicleId && name && interval && intervalUnit) {
      recommendedMaintenance.value = { id, vehicleId, name, interval, intervalUnit }
    }
  }
})

// const convertProxyToObject = (proxy:) => {}

const handleClickedDone = async () => {
  /*
  add timestamp/date when creating a maintenance done

  */
  console.log(recommendedMaintenance.value)
  if (recommendedMaintenance.value) {
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
      name: recommendedMaintenance.value.name,
      kmsWhenDone: currentKms.value,
      interval: recommendedMaintenance.value.interval,
      intervalUnit: recommendedMaintenance.value.intervalUnit,
      dateOfMaintenanceDone: date.value
    })
  }

  emit('toggleVisible')
}
</script>
