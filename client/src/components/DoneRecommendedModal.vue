<template>
  <v-dialog
    @handleDoneClick:visible=""
    v-model:visible="visible"
    header="Maintenance Done"
    v-model:showHeader="showHeader"
    :pt="{
      root: 'border-none',
      mask: {
        style: 'backdrop-filter: blur(2px)'
      }
    }"
  >
    <div>
      <span><p>Mark this maintenance as done.</p></span>
      <div class="info">
        <label>Current Kms:</label>&emsp;
        <p>{{ currentKms }} {{ unitKms }}</p>
      </div>

      <div class="info">
        <label>Date:</label>&emsp;
        <p>{{ `${dateInString}` }}</p>
      </div>
      <div class="info">
        <label>Next will be in: </label>&emsp;
        <p>{{ currentKms + 5000 }} {{ unitKms }}</p>
      </div>
    </div>
    <div class="buttons">
      <v-button class="button" @click="$emit('toggleVisible')" label="Cancel" severity="danger" />
      <v-button class="button" label="Done" @click="" />
    </div>
  </v-dialog>
</template>
<style lang="css" scoped>
.container {
  width: 50%;
}

.info {
  display: flex;
  align-items: baseline;
}

.buttons {
  display: flex;
  justify-content: center;
}

.button {
  margin: 5px;
}
</style>
<script setup lang="ts">
import { ref } from 'vue'

//Constants
const today = new Date()

/*
 * Use to hide the header from the modal.
 * Too big, do not fit the modal well.
 */
const showHeader = ref(false)

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
//Variables
let visible = ref(true)
const currentKms = ref(60000)
const unitKms = ref('kms')

const dateInString = `${months[today.getMonth()]} ${today.getDay()}, ${today.getFullYear()}`

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
</script>
