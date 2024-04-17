<script setup lang="ts">
import { ref } from 'vue'
interface IItem {
  name: string
  currentKms: number
  interval: number
  unit: string
}
interface IProps {
  list: IItem[]
}
const props = defineProps<IProps>()
const value = ref([
  { label: 'Regular', color: '#689f38', value: 5, icon: '' },
  { label: 'Overdue', color: '#f44336', value: 95, icon: '' }
])
// console.log(props.list)
</script>
<!-- 
  props.list is the list from the props pass in the component
  slotProps is the value pass to the tmplate
  v-for iterate trhough the array
-->
<template>
  <data-view :value="props.list" :dataKey="undefined"
    ><template #list="slotProps">
      <div v-for="item in slotProps.items" :key="item.name">
        <div class="main-container">
          <div class="grid-item">{{ item.name }}</div>
          <div class="grid-item">Interval: {{ item.interval }}&nbsp;{{ item.unit }}</div>
          <div class="grid-item"></div>
          <div class="grid-item" style="color: var(--red-600)">Overdue :5000 {{ item.unit }}</div>
          <div class="grid-meter">
            <meter-group :value="value" />
          </div>
          <vue-button icon="pi pi-check" />
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
