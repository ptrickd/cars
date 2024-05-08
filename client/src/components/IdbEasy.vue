<script setup lang="ts">
import { ref } from 'vue'
import { Idb } from '@/idb/Idb'
const db = ref(new Idb())
const objectStoreName = ref('')
const keyPath = ref('')
</script>
<template>
  <div>
    <h3>Connection</h3>
    <vue-button @click="db.connect()">Connect</vue-button>
    <h3>Object Store</h3>
    <div>
      <label for="objectStore-name">Name:</label>
      <input-text v-model="objectStoreName" id="objectStore-name" />
    </div>
    <div>
      <label for="objectStore-keyPath">Key Path:</label>
      <input-text v-model="keyPath" id="objectStore-keyPath" />
    </div>

    <vue-button @click="db.createObjectStore(objectStoreName, keyPath)">Create</vue-button>
    <vue-button @click="db.deleteDB">Delete DB</vue-button>
    <vue-button @click="db.isIdbSupported">Check Support</vue-button>
  </div>
</template>
