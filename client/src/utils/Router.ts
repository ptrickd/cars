import { createWebHistory, createRouter } from 'vue-router'

import LandingPage from '../components/LandingPage.vue'
import VehicleDetails from '../components/VehicleDetails.vue'
import PageNotFound from '../components/PageNotFound.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/vehicle/:id', component: VehicleDetails },
  { path: '/notfound/', component: PageNotFound }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
