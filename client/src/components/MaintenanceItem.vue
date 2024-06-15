<template>
  <div class="main">
    <div class="list">
      <ul>
        <li>{{ props.item.name }}</li>
        <li>{{ props.item.interval }} {{ props.item.unit.toLowerCase() }}</li>
      </ul>
    </div>

    <div>
      <vue-button
        class="button-delete"
        @click="handleDeleteItem()"
        label="Delete"
        severity="danger"
        text
      />
      <vue-button class="button-update" label="Update" text />
    </div>
  </div>
</template>

<style scoped>
.main {
  width: '100%';
  display: flex;
  justify-content: space-between;
}
.list {
  width: '50%';
  margin-right: 10px;
  height: 100px;
}
.buttons {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}
</style>

<script setup lang="ts">
import { deleteRecommendedMaintenance } from '@/idb/db'
interface IProps {
  item: { id: number; name: string; interval: number; unit: string }
}
const props = defineProps<IProps>()

const handleDeleteItem = () => {
  deleteRecommendedMaintenance(props.item.id)
}
</script>
