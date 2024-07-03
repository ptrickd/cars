<template>
  <div>
    <bread-crumb :home="home" :model="items"
      ><template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="[item.icon, 'text-color']" />
            <span class="text-primary font-semibold">{{ item.label }}</span>
          </a></router-link
        >
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span class="text-color">{{ item.label }}</span>
        </a>
      </template></bread-crumb
    >
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const home = ref({ icon: 'pi pi-home', route: '/' })

const items = ref([{ label: 'Vehicle Details' }])
</script>
