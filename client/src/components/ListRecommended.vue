<script setup lang="ts">
import MaintenanceItem from './MaintenanceItem.vue'

interface IRecommended {
  id: number
  name: string
  interval: number
  unit: string
}
interface IProps {
  list: IRecommended[]
}
const props = defineProps<IProps>()
</script>

<template>
  <h4>Recommended Maintenance List:</h4>
  <MaintenanceItem v-for="item in props.list" :item="item" :key="item.id" />
</template>
