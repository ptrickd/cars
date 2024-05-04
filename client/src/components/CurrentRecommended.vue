<script setup lang="ts">
import { MaintenanceUnit } from '@/constants/enum'

interface IItem {
  maintenanceId: number
  name: string
  lastMaintenanceKms: number
  lastMaintenanceDate: Date | null
  currentKms: number
  interval: number
  isOverdue: boolean
  unit: MaintenanceUnit
}
interface IProps {
  list: IItem[]
}
const props = defineProps<IProps>()

const displayValueMeter = (currentKms: number, interval: number, lastMaintenanceKms: number) => {
  const totalSinceLastMaintenance = currentKms - lastMaintenanceKms
  const regular = (interval / totalSinceLastMaintenance) * 100
  const overdue = (1 - regular / 100) * 100
  return [
    { label: 'Regular', color: '#689f38', value: regular, icon: '' },
    { label: 'Overdue', color: '#f44336', value: overdue, icon: '' }
  ]
}
</script>
<!-- 
  props.list is the list from the props pass in the component
  slotProps is the value pass to the tmplate
  v-for iterate trhough the array
-->

<template>
  <data-view :value="props.list" :dataKey="undefined"
    ><template #list="slotProps: { items: IItem[] }">
      <div v-for="item in slotProps.items" :key="item.name">
        <div class="main-container">
          <div class="grid-item">
            <h3>{{ item.name }}</h3>
          </div>
          <div></div>
          <div class="grid-item">
            Recommended interval: {{ item.interval }}&nbsp;{{ item.unit.toLowerCase() }}
          </div>
          <div class="grid-item">
            Last maintenance interval: {{ item.lastMaintenanceKms }}&nbsp;{{
              item.unit.toLowerCase()
            }}
          </div>

          <div class="grid-item" style="color: var(--red-600)">
            Overdue by : {{ item.currentKms - item.lastMaintenanceKms - item.interval }}&nbsp;{{
              item.unit.toLowerCase()
            }}
          </div>
          <div class="grid-item"></div>

          <div class="grid-meter">
            <meter-group
              :value="displayValueMeter(item.currentKms, item.interval, item.lastMaintenanceKms)"
            />
          </div>
          <button-group>
            <vue-button
              icon="pi pi-times"
              @click="console.log('clicked')"
              severity="danger"
              raised
              rounded
            />
            <vue-button
              icon="pi pi-check"
              @click="console.log('clicked')"
              severity="success"
              raised
              rounded
            />
          </button-group>
        </div>

        <hr />
      </div> </template
  ></data-view>
</template>

<style scoped>
div {
  font-size: 105%;
}
hr {
  margin: 30px auto 30px auto;
}
.main-container {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto auto;
  gap: 10px 10px;
}
.grid-item {
  min-width: 100px;
}
.grid-meter {
  min-width: 100px;
  grid-column: 1/3;
  grid-row: 3;
}

.text {
  color: var(--blue-200);
}
</style>
