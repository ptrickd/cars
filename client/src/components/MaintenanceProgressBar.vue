<template>
  <v-metergroup :value="fakeValues" labelPosition="start">
    <template #label="{ value }">
      <div class="labels">
        <template v-for="val of value" :key="val.label">
          <v-card v-if="val.label === 'Current' || val.label === 'Remaining'">
            <template #content>
              <div>
                <span :style="{ color: `${val.color}` }">{{ val.label }}</span
                >:&nbsp;
                <span> {{ val.kms }} kms</span>
              </div>
            </template>
          </v-card>
        </template>
      </div>
    </template>
    <template #meter="slotProps">
      <span
        :class="slotProps.class"
        :style="{
          background: slotProps.value.color,
          width: slotProps.size
        }"
      />
    </template>
  </v-metergroup>
</template>
<style scoped>
.labels {
  display: flex;
  flex-direction: row;
}
</style>
<script setup lang="ts">
//Vue
import { ref } from 'vue'

const fakeValues = ref([
  { label: 'Last', value: 10, color: 'var(--p-neutral-800)', kms: 10000 },
  { label: 'Current', value: 30, color: 'var(--p-primary-color)', kms: 30000 },
  { label: 'Remaining', value: 50, color: 'var(--p-lime-800)', kms: 50000 },
  { label: 'Overdue', value: 10, color: 'var(--p-red-800)', kms: 100000 }
])
</script>
