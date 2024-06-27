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
          icon="pi pi-times"
          severity="danger"
          text
        />
        <vue-button
          class="button-update"
          @click="toggleVisible()"
          label="Update"
          icon="pi pi-user-edit"
          text
        />
        <UpdateRecommendedModal
          :id="item.id"
          :name="item.name"
          :interval="item.interval"
          :unit="item.unit"
          :visible="visible"
          @toggleVisible="toggleVisible()"
        />
      </div>
    </div>
    <div><vue-divider /></div>
  </span>
</template>

<script setup lang="ts">
//Import
import { ref } from 'vue'
import { deleteRecommendedMaintenance } from '@/idb/db'
import UpdateRecommendedModal from './UpdateRecommendedModal.vue'

//Types
interface IRecommended {
  id: number
  name: string
  interval: number
  unit: string
}
interface IProps {
  list: IRecommended[]
}

//Declarations
const props = defineProps<IProps>()
const emit = defineEmits(['refreshRecommendedList'])
let visible = ref(false)

//Function
const handleDeleteItem = async (id: number) => {
  await deleteRecommendedMaintenance(id)
  emit('refreshRecommendedList')
}

const toggleVisible = () => {
  visible.value = !visible.value
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
