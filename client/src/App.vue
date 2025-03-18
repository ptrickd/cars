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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main {
  flex-grow: 2;
}

.footer {
  width: 100%;
}
</style>

<script setup lang="ts">
//Vue
import { RouterView } from 'vue-router'

//Primevue
import Toast from 'primevue/toast'

//State
import { store } from './store/store'

//Idb

//Component
import NavBar from './components/NavBar.vue'
import FooterPage from './components/FooterPage.vue'
</script>
