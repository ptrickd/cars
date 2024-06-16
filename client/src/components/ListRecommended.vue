<template>
  <span>
    <div class="main" v-for="item in props.list" :key="item.id">
      <div class="list">
        <ul>
          <li>{{ item.name }}</li>
          <li>{{ item.interval }} {{ item.unit.toLowerCase() }}</li>
        </ul>
      </div>

      <div>
        <vue-button
          class="button-delete"
          @click="handleDeleteItem(item.id)"
          label="Delete"
          severity="danger"
          text
        />
        <vue-button
          class="button-update"
          @click="console.log('update clicked')"
          label="Update"
          text
        />
      </div>
    </div>
  </span>
</template>

<script setup lang="ts">
interface IRecommended {
  id: number
  name: string
  interval: number
  unit: string
}
interface IProps {
  list: IRecommended[]
}

import { deleteRecommendedMaintenance } from '@/idb/db'

const props = defineProps<IProps>()
const emit = defineEmits(['refreshRecommendedList'])

const handleDeleteItem = async (id: number) => {
  await deleteRecommendedMaintenance(id)
  emit('refreshRecommendedList')
}
</script>
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
