<template>
  <main class="container">
    <NavBar />
    <Toast />
    <RouterView />
    <FooterPage class="footer" />
  </main>
</template>

<style scoped>
.container {
  min-width: 400px;
  max-width: 900px;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>

<script setup lang="ts">
import Toast from 'primevue/toast'
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterPage from './components/FooterPage.vue'
</script>
