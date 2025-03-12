<template>
  <span>
    <div v-for="item in maintenanceList" :key="item.id">
      <div class="main">
        <div class="list">
          <ul>
            <li>{{ item.name }}</li>
            <li>Every {{ item.interval }} {{ item.unit.toLowerCase() }}</li>
            <li>Last Maintenance Done: 80000 km</li>
            <li>Remaining 1000 {{ item.unit.toLocaleLowerCase() }}</li>
            <li>Status: OK</li>
          </ul>
        </div>

        <div class="buttons">
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
            :interval="item.interval"
            :unit="item.unit"
            :visible="updateVisible"
            @toggleVisible="toggleUpdateVisible()"
          />
          <DoneRecommendedModal
            v-if="item.id"
            :id="item.id"
            :name="item.name"
            :interval="item.interval"
            :unit="item.unit"
            :visible="doneVisible"
            @toggleVisible="toggleDoneVisible()"
          />
        </div>
      </div>
      <MaintenanceProgressBar />
      <v-divider />
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
  margin: 0;
  display: flex;

  justify-content: space-between;
}

.list {
  width: '50%';
  margin-right: 10px;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  align-self: center;
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

//Component
import UpdateRecommendedModal from './UpdateRecommendedModal.vue'
import DoneRecommendedModal from './DoneRecommendedModal.vue'
import MaintenanceProgressBar from './MaintenanceProgressBar.vue'

//Constant
import { MaintenanceUnit } from '@/constants/constants'

//Function
import { convertKmToMiles } from '@/utils/converter'

/*
 * Types
 */
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
      return { ...maintenance, intervalKms: convertKmToMiles(maintenance.interval) }
    } else return maintenance
  })
  return newMaintenances
}

const subscription = maintenanceObservable.subscribe({
  next: (maintenances) => (maintenanceList.value = formattedMaintenanceList(maintenances)),
  error: (error) => console.error(error)
})
</script>
