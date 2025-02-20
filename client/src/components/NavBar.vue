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
    lable: 'Home',
    icon: 'pi pi-home',
    command: () => {
      router.push('/')
    }
  }
])
</script>
