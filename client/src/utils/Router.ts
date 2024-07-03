import { createWebHistory, createRouter } from 'vue-router'

import VehiculeSpecs from '../components/VehiculeSpecs.vue'
import VehicleDetails from '../components/VehicleDetails.vue'
import PageNotFound from '../components/PageNotFound.vue'

const routes = [
  { path: '/', component: VehiculeSpecs },
  { path: '/vehicle/:id', component: VehicleDetails },
  { path: '/notfound/', component: PageNotFound }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
