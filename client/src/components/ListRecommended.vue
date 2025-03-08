<template>
  <span>
    <div class="main" v-for="item in maintenanceList" :key="item.id">
      <div class="list">
        <ul>
          <li>{{ item.name }}</li>
          <li>{{ item.intervalKms }} {{ item.unit.toLowerCase() }}</li>
        </ul>
      </div>

      <div>
        <v-button
          @click="toggleDoneVisible()"
          label="Done"
          icon="pi pi-check-circle"
          severity="primary"
          text
        />

        <v-button
          class="button-update"
          @click="toggleUpdateVisible()"
          label="Update"
          icon="pi pi-user-edit"
          severity="secondary"
          text
        />

        <v-button
          v-if="item.id"
          class="button-delete"
          @click="handleDeleteItem(item.id)"
          label="Delete"
          icon="pi pi-times"
          severity="danger"
          text
        />
        <UpdateRecommendedModal
          v-if="item.id"
          :id="item.id"
          :name="item.name"
          :interval="item.intervalKms"
          :unit="item.unit"
          :visible="updateVisible"
          @toggleVisible="toggleUpdateVisible()"
        />
        <DoneRecommendedModal
          v-if="item.id"
          :id="item.id"
          :name="item.name"
          :interval="item.intervalKms"
          :unit="item.unit"
          :visible="doneVisible"
          @toggleVisible="toggleDoneVisible()"
        />
      </div>
    </div>

    <div v-if="maintenanceList && Boolean(maintenanceList.length)"><v-divider /></div>
    <div v-else class="empty-list">
      <h3>Click on the button to add your first maintenance.</h3>
      <p>
        You can start by a
        <b
          ><i><u>Oil Change</u></i></b
        >
        Every
        <b
          ><i><u>5000 kms</u></i></b
        >.
      </p>
    </div>
  </span>
</template>

<style scoped>
.main {
  width: '100%';
  display: flex;
  margin: 0;
  justify-content: space-between;
}
.list {
  width: '50%';
  margin-right: 10px;
  /* height: 100px; */
}
.buttons {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}
.empty-list {
  padding: 1rem;
}
</style>

<script setup lang="ts">
//Vue
import { onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'

//Idb
import { db, deleteRecommendedMaintenance } from '@/idb/db'
import type { IRecommended } from '@/idb/db'
import { liveQuery } from 'dexie'
import { useObservable } from '@vueuse/rxjs'

//Component
import UpdateRecommendedModal from './UpdateRecommendedModal.vue'
import DoneRecommendedModal from './DoneRecommendedModal.vue'
import { MaintenanceUnit } from '@/constants/constants'
import { convertKmToMiles } from '@/utils/converter'

interface IProps {
  id: number
}

/*
 * Lifecycle
 *
 */

onUnmounted(() => {
  subscription.unsubscribe()
})

/*
 * Observable
 */
const maintenanceObservable = liveQuery(() => {
  return db.recommendedMaintenance.where({ vehicleId: props.id }).toArray()
})

let doneVisible = ref(false)
let updateVisible = ref(false)
const maintenanceList: Ref<IRecommended[] | []> = ref([])

const props = defineProps<IProps>()

//Function
const handleDeleteItem = async (id: number) => {
  await deleteRecommendedMaintenance(id)
}

const toggleDoneVisible = () => {
  doneVisible.value = !doneVisible.value
}
const toggleUpdateVisible = () => {
  updateVisible.value = !updateVisible.value
}

const formattedMaintenanceList = (maintenances: IRecommended[] | []) => {
  const newMaintenances = maintenances.map((maintenance) => {
    if (maintenance.unit === MaintenanceUnit.MILES) {
      return { ...maintenance, intervalKms: convertKmToMiles(maintenance.intervalKms) }
    } else return maintenance
  })
  return newMaintenances
}

const subscription = maintenanceObservable.subscribe({
  next: (maintenances) => (maintenanceList.value = formattedMaintenanceList(maintenances)),
  error: (error) => console.error(error)
})
</script>
