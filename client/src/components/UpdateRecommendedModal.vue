<template>
  <div>
    <v-dialog
      @update:visible="$emit('toggleVisible')"
      v-model:visible="$props.visible"
      header="Update"
      v-model:showHeader="showHeader"
      :pt="{
        root: 'border-none',
        mask: {
          style: 'backdrop-filter: blur(2px)'
        }
      }"
    >
      <div class="main">
        <h3>Update Maintenance</h3>
        <div>
          <v-inplace
            ><template #display
              ><div class="display-group">
                <span class="display-item"
                  ><p>{{ newName }}</p></span
                >
                <span class="display-item"><i pi class="pi pi-user-edit"></i></span></div
            ></template>
            <template #content>
              <div class="input-group">
                <label for="name">Name</label>
                <v-inputtext
                  id="name"
                  v-model="newName"
                  name="name"
                  aria-describedby="name maintenance"
                />
                <!-- <v-message v-if="nameValidationError.length !== 0" severity="error">{{
                  nameValidationError
                }}</v-message> -->
              </div></template
            ></v-inplace
          >
        </div>

        <div>
          <v-inplace
            ><template #display>
              <div class="display-group">
                <p class="display-item">{{ newInterval }}&nbsp; {{ newUnit.code.toLowerCase() }}</p>
                <i pi class="pi pi-user-edit display-item`"></i>
              </div>
            </template>
            <template #content>
              <div class="input-group">
                <label for="interval">Interval</label>

                <v-inputnumber
                  id="interval"
                  v-model="newInterval"
                  name="interval"
                  aria-describedby="interval maintenance"
                />
                <!-- <v-message v-if="intervalValidationError.length !== 0" severity="error">{{
                  intervalValidationError
                }}</v-message> -->
              </div>
              <div class="input-group">
                <label for="unit">Unit</label>

                <v-select
                  id="unit"
                  :options="maintenanceUnitValues"
                  optionLabel="name"
                  v-model="newUnit"
                  name="unit"
                  aria-describedby="interval maintenance"
                  placeholder="Select a Unit"
                />
                <!-- <v-message v-if="unitValidationError.length !== 0" severity="error">{{
                  unitValidationError
                }}</v-message> -->
              </div></template
            >
          </v-inplace>
        </div>
      </div>
      <div class="buttons">
        <v-button class="button" @click="$emit('toggleVisible')" label="Cancel" severity="danger" />
        <v-button
          class="button"
          label="Update"
          @click="handleUpdateButtonClicked(newName, newInterval, newUnit.code)"
        />
      </div>
    </v-dialog>
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  padding: 10px;
  text-align: center;
}

.display-group {
  height: 2rem;
  width: 100%;
  padding: 1.5rem 2.5rem 1.5rem 2.5rem;

  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;

  border: 1px solid var(--highlight-bg);
  border-radius: 6px;
}

.display-group:hover {
  border: 2px solid var(--primary-color);
}

.display-item {
  align-self: center;
  flex-grow: 1;
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
  justify-content: center;
}

.button {
  margin: 5px;
}
</style>

<script setup lang="ts">
//Import
import { ref } from 'vue'
import { MaintenanceUnit } from '@/constants/constants'
import { updateRecommendedMaintenance } from '@/idb/db'

//Types
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

//Constants

const showHeader = ref(false)

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

let newName = ref(props.name)
let newInterval = ref(props.interval)
let newUnit = ref({ name: props.unit, code: MaintenanceUnit.KMS })
// let newUnit = ref(props.unit)
// let newInterval = onMounted(() => {})

//Function
const handleUpdateButtonClicked = (name: string, interval: number, unit: string) => {
  updateRecommendedMaintenance(props.id, name, interval, unit)
  emit('toggleVisible')
}
</script>
