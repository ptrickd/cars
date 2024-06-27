<template>
  <div>
    <vue-dialog
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
      <div>
        <h3>Update Maintenance</h3>
        <div>
          <in-place
            ><template #display
              ><div class="display-group">
                <p>{{ newName }}</p>
                <i pi class="pi pi-user-edit"></i></div
            ></template>
            <template #content>
              <div class="input-group">
                <label for="name">Name</label>
                <input-text
                  id="name"
                  v-model="newName"
                  name="name"
                  aria-describedby="name maintenance"
                />
                <!-- <inline-message v-if="nameValidationError.length !== 0" severity="error">{{
        nameValidationError
      }}</inline-message> -->
              </div></template
            ></in-place
          >
        </div>

        <div>
          <in-place
            ><template #display>
              <div class="display-group">
                <p>{{ newInterval }}&nbsp; {{ newUnit.code.toLowerCase() }}</p>
                <i pi class="pi pi-user-edit"></i>
              </div>
            </template>
            <template #content>
              <div class="input-group">
                <label for="interval">Interval</label>

                <input-number
                  id="interval"
                  v-model="newInterval"
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
                  v-model="newUnit"
                  name="unit"
                  aria-describedby="interval maintenance"
                  placeholder="Select a Unit"
                />
                <!-- <inline-message v-if="unitValidationError.length !== 0" severity="error">{{
        unitValidationError
      }}</inline-message> -->
              </div></template
            >
          </in-place>
        </div>
      </div>
      <div class="buttons">
        <vue-button
          class="button"
          @click="$emit('toggleVisible')"
          label="Cancel"
          severity="danger"
        />
        <vue-button
          class="button"
          label="Update"
          @click="handleUpdateButtonClicked(newName, newInterval, newUnit.code)"
        />
      </div>
    </vue-dialog>
  </div>
</template>

<style scoped>
.main {
  padding: 10px;
}
.display-group {
  height: 2rem;
  width: 100%;

  padding: 1.5rem 2rem 1.5rem 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  text-justify: center;

  border: 1px solid var(--highlight-bg);

  border-radius: 6px;
}
.display-group:hover {
  border: 2px solid var(--primary-color);
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
  /* justify-content: flex-end; */
}
.button {
  margin: 5px;
}
</style>

<script setup lang="ts">
//Import
import { ref } from 'vue'
import { MaintenanceUnit } from '@/constants/enum'
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
const handleUpdateButtonClicked = (name: string, interval: number, unit: MaintenanceUnit) => {
  updateRecommendedMaintenance(props.id, name, interval, unit)
  emit('toggleVisible')
}
</script>
