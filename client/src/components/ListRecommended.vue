<template>
  <span>
    <div v-for="item in maintenanceList" :key="item.id">
      <div class="main">
        <div class="list">
          <ul>
            <li>{{ item.name }}</li>
            <li>Every {{ item.interval }} {{ item.intervalUnit.toLowerCase() }}</li>
            <li v-if="!doneSortedMaintenanceList.get(`${item.name}`)">
              <span class="text-warning">No Previous Maintenance Recorded</span>
            </li>
            <span v-if="doneSortedMaintenanceList.get(`${item.name}`)">
              <li>
                Last Maintenance Done Km:<v-tag
                  >{{ doneSortedMaintenanceList.get(`${item.name}`).lastMaintenanceDoneKms }} kms
                </v-tag>
              </li>
              <li>
                Last Maintenance Done On:<v-tag>{{
                  displayDate(doneSortedMaintenanceList.get(`${item.name}`).dateOfMaintenanceDone)
                }}</v-tag>
              </li>
              <li v-if="doneSortedMaintenanceList.get(`${item.name}`).isOverdue === false">
                Remaining:
                <v-tag
                  >{{ doneSortedMaintenanceList.get(`${item.name}`).remaining }}
                  {{ item.intervalUnit.toLocaleLowerCase() }}</v-tag
                >
              </li>
              <li v-if="doneSortedMaintenanceList.get(`${item.name}`).isOverdue">
                Overdue:
                <v-tag severity="danger"
                  >{{ Math.abs(doneSortedMaintenanceList.get(`${item.name}`).remaining) }}
                  {{ item.intervalUnit.toLocaleLowerCase() }}</v-tag
                >
              </li>
            </span>
            <li
              v-if="
                doneSortedMaintenanceList.get(`${item.name}`) &&
                doneSortedMaintenanceList.get(`${item.name}`).isOverdue === false
              "
            >
              Status: <v-tag>Ok</v-tag>
            </li>
            <li
              v-if="
                doneSortedMaintenanceList.get(`${item.name}`) &&
                doneSortedMaintenanceList.get(`${item.name}`).isOverdue
              "
            >
              Status:
              <v-tag severity="danger">Overdue</v-tag>
            </li>
            <li v-if="!doneSortedMaintenanceList.get(`${item.name}`)">
              Status:
              <v-tag severity="warn" value="Undefined"></v-tag>
            </li>
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
            :unit="item.intervalUnit"
            :visible="updateVisible"
            @toggleVisible="toggleUpdateVisible()"
          />
          <DoneRecommendedModal
            v-if="item.id"
            :id="item.id"
            :name="item.name"
            :interval="item.interval"
            :unit="item.intervalUnit"
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

.text-warning {
  color: var(--p-amber-500);
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
import type { IRecommended, IDone, IVehicle } from '@/idb/db'
import { liveQuery } from 'dexie'

//Component
import UpdateRecommendedModal from './UpdateRecommendedModal.vue'
import DoneRecommendedModal from './DoneRecommendedModal.vue'
import MaintenanceProgressBar from './MaintenanceProgressBar.vue'

//Constant
import { MaintenanceUnit } from '@/constants/constants'

//Function
import { convertKmToMiles } from '@/utils/converter'
import { sortDoneMaintenanceList } from '@/utils/SortOperationsUtils'
import { displayDate } from '@/utils/DateUtils'

/*
 * Types
 */
//Vehicle Id
interface IProps {
  id: number
}

export interface ISortedDone {
  lastMaintenanceDoneKms: number
  intervalUnit: string
  lastMaintenanceDate: Date
  remaining: number
  isOverdue: boolean
}

/*
 *  Reactivity
 *
 */

// Object
let vehicle: Ref<IVehicle | null> = ref(null)

// Map()
let doneSortedMaintenanceList = ref(new Map())

// Boolean
let doneVisible = ref(false)
let updateVisible = ref(false)

// Array
const maintenanceList: Ref<IRecommended[] | []> = ref([])
// const doneMaintenanceList: Ref<IDone[] | []> = ref([])

/*
 * Lifecycle
 *
 */

onUnmounted(() => {
  subscription.unsubscribe()
  subscriptionDone.unsubscribe()
  subscriptionVehicle.unsubscribe()
})

/*
 * Props
 */
const props = defineProps<IProps>()
/***************************/

doneSortedMaintenanceList.value.clear()

const pastMaintenancesList = [
  {
    recommendedMaintenanceId: 0,
    name: 'Oil Change',
    kmsWhenCreated: 159000,
    interval: 5000,
    intervalUnit: MaintenanceUnit.KMS,
    dateOfMaintenanceDone: new Date('2024-12-01')
  }
]

const copySortedMaintenanceList = () => {
  if (vehicle.value) {
    sortDoneMaintenanceList(
      vehicle.value.currentKms,
      pastMaintenancesList,
      maintenanceList.value
    ).forEach((values, key) => {
      doneSortedMaintenanceList.value.set(key, values)
      console.log(key)
      console.log(values)
    })
  }
}
/***************************/

/*
 * Functions
 */
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
    if (maintenance.intervalUnit === MaintenanceUnit.MILES) {
      return { ...maintenance, intervalKms: convertKmToMiles(maintenance.interval) }
    } else return maintenance
  })
  return newMaintenances
}

/*
 * Observable Live Query
 */
const maintenanceObservable = liveQuery(() => {
  return db.recommendedMaintenance.where({ vehicleId: props.id }).toArray()
})

const maintenanceDoneObservable = liveQuery(() => {
  return db.doneMaintenance.toArray()
})

const vehicleObservable = liveQuery(() => {
  return db.vehicle.where('id').equals(props.id).first()
})

/*
 * Observable Subscription
 */

const subscription = maintenanceObservable.subscribe({
  next: (maintenances) => (maintenanceList.value = formattedMaintenanceList(maintenances)),
  error: (error) => console.error(error)
})

const subscriptionDone = maintenanceDoneObservable.subscribe({
  next: (maintenance) => {
    console.log(maintenance)
    copySortedMaintenanceList()
  },

  error: (error) => console.error(error)
})

const subscriptionVehicle = vehicleObservable.subscribe({
  next: (vehicleObs) => (vehicle.value = vehicleObs ? vehicleObs : null),
  error: (error) => console.error(error)
})
</script>
