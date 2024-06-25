<template>
  <div>
    <h3>Update Maintenance</h3>
    <div>
      <in-place
        ><template #display
          ><div class="display-group">
            <p>{{ name }}</p>
            <i pi class="pi pi-user-edit"></i></div
        ></template>
        <template #content>
          <div class="input-group">
            <label for="name">Name</label>
            <input-text
              id="name"
              v-model="$props.name"
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
            <p>{{ interval }}&nbsp; {{ unit1.code.toLowerCase() }}</p>
            <i pi class="pi pi-user-edit"></i>
          </div>
        </template>
        <template #content>
          <div class="input-group">
            <label for="interval">Interval</label>

            <input-number
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
              optionValue="code"
              v-model="unit1"
              name="unit"
              aria-describedby="interval maintenance"
              placeholder="Select a Unit"
              :change="console.log(unit1.name)"
            />
            <!-- <inline-message v-if="unitValidationError.length !== 0" severity="error">{{
        unitValidationError
      }}</inline-message> -->
          </div></template
        >
      </in-place>
    </div>
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
  interval: number
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
let unit1 = ref({ name: props.unit, code: MaintenanceUnit.KMS })

//Function
const handleUnitChange = (e: any) => {
  console.log(e)
  console.log('hello')
}
</script>
