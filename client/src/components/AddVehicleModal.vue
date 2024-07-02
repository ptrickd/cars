<template class="main">
  <vue-button label="Add Vehicule" @click="visible = true" />
  <vue-dialog v-model:visible="visible" modal header="Add a new vehicle" :style="{ width: '25rem' }"
    ><div>
      <div class="input-group">
        <label for="brand">Brand</label>
        <input-text id="brand" v-model="brand" name="brand" aria-describedby="brand" />
      </div>
      <div class="input-group">
        <label for="model">Model</label>
        <input-text id="model" v-model="model" name="model" aria-describedby="model" />
      </div>
      <div class="input-group">
        <label for="year">Year</label>
        <input-text id="year" v-model="year" name="year" aria-describedby="year" />
      </div>
      <div class="input-group">
        <label for="currentKms">Current Mileage</label>
        <input-number
          id="currentKms"
          v-model="currentKms"
          name="currentKms"
          aria-describedby="currentKms"
        />
      </div>
      <div class="buttons">
        <vue-button class="button" @click="visible = false" label="Cancel" severity="danger" />
        <vue-button class="button" label="Add" @click="handleAddBtnClicked()" />
      </div></div
  ></vue-dialog>
</template>
<!-- - Brand
- Model
- Year
- Mileage  -->
<style scoped>
.main {
  padding: 10px;
}
.input-group {
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
  }
}
.buttons {
  display: flex;
  justify-content: flex-end;
}
.button {
  margin: 5px;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { addVehicule } from '@/idb/db'

const visible = ref(false)
const brand = ref('')
const model = ref('')
const year = ref('1900')
const currentKms = ref(0)

const handleAddBtnClicked = async () => {
  if (model.value.length !== 0 && brand.value.length !== 0) {
    const response = await addVehicule(brand.value, model.value, year.value, currentKms.value)
    if (response.success) visible.value = false
  } else {
    console.log('missing value')
  }
}
</script>
