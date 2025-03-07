<template>
  <nav>
    <v-menubar :model="items"></v-menubar>
  </nav>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => {
      router.push('/')
    }
  },
  {
    label: 'About',
    icon: 'pi pi-info-circle',
    command: () => {
      router.push('/about')
    }
  }
])
</script>
