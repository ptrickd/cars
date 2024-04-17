<script setup lang="ts">
import { recommendedData } from './fakeData/data'
import ListRecommended from './components/ListRecommended.vue'
import GridRecommended from './components/GridRecommended.vue'

interface IItem {
  name: string
  currentKms: number
  interval: number
  unit: string
}

function findActualList() {
  const { kms, pastMaintenance, recommendedMaintenance } = recommendedData

  //if pastMaintenance is empty check current mileage against all recommended maintenance
  if (pastMaintenance.length === 0) {
    const formattedData: IItem[] = []
    recommendedMaintenance.forEach((item) => {
      console.log(item)
      if (item.unit === 'kms' && kms > item.interval) {
        console.log('good')
        formattedData.push({
          name: item.name,
          currentKms: kms,
          interval: item.interval,
          unit: item.unit
        })
      }
    })
    console.log(formattedData)
    return formattedData || []
  } else return []
}
</script>

<template>
  <main>
    <div class="top-container">
      <div class="grid-item">
        <p class="label">Brand:&nbsp;</p>
        <p>{{ recommendedData.brand }}</p>
      </div>
      <div class="grid-item">
        <p class="label">Model:&nbsp;</p>
        <p>{{ recommendedData.model }}</p>
      </div>
      <div class="grid-item">
        <p class="label">Year:&nbsp;</p>
        <p>{{ recommendedData.year }}</p>
      </div>
      <div class="grid-item">
        <p class="label">Mileage:&nbsp;</p>
        <p>{{ recommendedData.kms }} km</p>
      </div>
    </div>
    <vue-accordion>
      <vue-accordion-tab header="Actual Maintenance List">
        <!-- <vue-button label="Find" @click="findActualList" /> -->
        <GridRecommended :list="findActualList()" />
      </vue-accordion-tab>
      <vue-accordion-tab header="Recommended Maintenance List">
        <ListRecommended :list="recommendedData.recommendedMaintenance" />
        <vue-button label="Add" />
      </vue-accordion-tab>
    </vue-accordion>
  </main>
</template>

<style scoped>
main {
  min-width: 400px;
}
.top-container {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  gap: 10px 10px;
  margin-bottom: 20px;
}
.grid-item {
  min-width: 100px;
  display: flex;
  align-items: flex-start;
  font-size: 110%;
}
.label {
  color: var(--blue-200);
}
</style>
