<template>
  <vue-button @click="visible = true" />
  <VehicleModalBase :visible="visible" @close="visible = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VehicleModalBase from './VehicleModalBase.vue'

const visible = ref(false)
</script>
