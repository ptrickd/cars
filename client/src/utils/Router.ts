import { createWebHistory, createRouter } from 'vue-router'

import VehiculeSpecs from '../components/VehiculeSpecs.vue'
import PageNotFound from '../components/PageNotFound.vue'

const routes = [
  { path: '/', component: VehiculeSpecs },
  { path: '/notfound/', component: PageNotFound }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
