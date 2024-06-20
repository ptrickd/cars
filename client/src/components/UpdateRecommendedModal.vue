<template>
  <div>
    <vue-dialog
      v-model:visible="$props.visible"
      header="Update"
      closeOnEscape
      closable
      v-model:showHeader="showHeader"
      :pt="{
        root: 'border-none',
        mask: {
          style: 'backdrop-filter: blur(2px)'
        }
      }"
    >
      <RecommendedForm :name="$props.name" :interval="$props.interval" :unit="$props.unit" />

      <div class="buttons">
        <vue-button
          class="button"
          @click="$emit('toggleVisible')"
          label="Cancel"
          severity="danger"
        />
        <vue-button class="button" label="Update" @click="console.log('update butoon clicked')" />
      </div>
    </vue-dialog>
  </div>
</template>

<style scoped>
.buttons {
  display: flex;
  justify-content: flex-end;
}
.button {
  margin: 5px;
}
</style>

<script setup lang="ts">
//Import
import { ref } from 'vue'
// import { MaintenanceUnit } from '@/constants/enum'

//Components
import RecommendedForm from './RecommendedForm.vue'

//Types
interface IProps {
  name: string
  interval: string
  unit: string
  visible: boolean
}

//Declaration
const props = defineProps<IProps>()
const emit = defineEmits(['toggleVisible'])

//Constants
// const visible = ref(true)
const showHeader = ref(false)

//Variables
</script>
