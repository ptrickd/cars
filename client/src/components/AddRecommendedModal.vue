<script setup lang="ts">
import { ref } from 'vue'
import { MaintenanceUnit } from '@/constants/enum'
import { addRecommendedMaintenance } from '@/idb/db'
/*
    name,
   interval,
    unit
    */

//Variables
let name = ref('')
let interval = ref('')
let unit = ref({ name: '', code: '' })
let visible = ref(false)
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
<template>
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
    <!-- Need to add validation -->
    <!-- Need to add spaing between input to better see label -->
    <float-label
      ><label for="name">Name</label>
      <input-text id="name" v-model="name" name="name" aria-describedby="name maintenance" />
    </float-label>
    <float-label>
      <label for="interval">Interval</label>

      <input-text
        id="interval"
        v-model="interval"
        name="interval"
        aria-describedby="interval maintenance"
    /></float-label>
    <float-label>
      <!-- <label for="unit">Unit</label> -->

      <drop-down
        id="unit"
        :options="maintenanceUnitValues"
        optionLabel="name"
        v-model="unit"
        name="unit"
        aria-describedby="interval maintenance"
        placeholder="Select a Unit"
      />
    </float-label>
    <!--  -->
    <vue-button @click="visible = false">Cancel</vue-button>
    <vue-button
      @click="addRecommendedMaintenance(name, Number(interval), unit.code as MaintenanceUnit)"
      >Add</vue-button
    >
  </vue-dialog>
</template>
