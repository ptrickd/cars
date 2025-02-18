<template>
  <span>
    <div class="main" v-for="item in maintenanceList" :key="item.id">
      <div class="list">
        <ul>
          <li>{{ item.name }}</li>
          <li>{{ item.interval }} {{ item.unit.toLowerCase() }}</li>
        </ul>
      </div>

      <div>
        <v-button
          class="button-delete"
          @click="handleDeleteItem(item.id)"
          label="Delete"
          icon="pi pi-times"
          severity="danger"
          text
        />
        <v-button
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
    <div v-if="maintenanceList && Boolean(maintenanceList.length)"><v-divider /></div>
    <div v-else>
      <h4>Click on the button to add your for first maintenance.</h4>
      <p>
        You can start by a <b><i>Oil Change</i></b> Every <b><i>5000 kms</i></b>
      </p>
    </div>
  </span>
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
//Import
import { ref } from 'vue'
import { deleteRecommendedMaintenance } from '@/idb/db'
import UpdateRecommendedModal from './UpdateRecommendedModal.vue'
import { liveQuery } from 'dexie'
import { useObservable } from '@vueuse/rxjs'
import { db } from '../idb/db'

interface IProps {
  id: number
}

let visible = ref(false)

const props = defineProps<IProps>()

//Function
const handleDeleteItem = async (id: number) => {
  await deleteRecommendedMaintenance(id)
}

const toggleVisible = () => {
  visible.value = !visible.value
}
const maintenanceList: any = useObservable(
  // @ts-ignore
  liveQuery(() => {
    return db.recommendedMaintenance.where({ vehicleId: props.id }).toArray()
  })
)
</script>
