<template>
  <main>
    <Toast />
    <RouterView />
  </main>
</template>

<style scoped>
main {
  min-width: 400px;
  max-width: 1000px;
}
</style>

<script setup lang="ts">
import Toast from 'primevue/toast'
import { RouterView } from 'vue-router'
</script>
