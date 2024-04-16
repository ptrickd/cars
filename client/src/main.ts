// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'

//Import PrimeVue Components
import Button from 'primevue/button'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'

//Import PrimeVue css
import 'primevue/resources/themes/mdc-dark-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
//import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(PrimeVue)

//Add PrimeVue Components
app.component('vue-button', Button)
app.component('vue-accordion', Accordion)
app.component('vue-accordion-tab', AccordionTab)

app.mount('#app')
