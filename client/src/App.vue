<template>
  <main class="container">
    <NavBar />
    <Toast />
    <div class="main"><RouterView /></div>

    <FooterPage class="footer" />
  </main>
</template>

<style scoped>
.container {
  margin: 0;
  padding: 0;
  min-width: 400px;
  height: 98vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.main {
  height: 100vh;
}

.footer {
  width: 100%;
}
</style>

<script setup lang="ts">
import Toast from 'primevue/toast'
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterPage from './components/FooterPage.vue'
</script>
