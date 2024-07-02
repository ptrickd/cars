import { createMemoryHistory, createRouter } from 'vue-router'

import VehiculeSpecs from '../components/VehiculeSpecs.vue'

const routes = [{ path: '/', component: VehiculeSpecs }]

export const router = createRouter({
  history: createMemoryHistory(),
  routes
})
