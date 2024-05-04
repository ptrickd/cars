// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'

//Import PrimeVue Components
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Button from 'primevue/button'
import ButtonGroup from 'primevue/buttongroup'

import Card from 'primevue/card'

import DataView from 'primevue/dataview'
import MeterGroup from 'primevue/metergroup'

//Import PrimeVue css
import 'primevue/resources/themes/mdc-dark-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(PrimeVue)

//Add PrimeVue Components
app.component('vue-accordion', Accordion)
app.component('vue-accordion-tab', AccordionTab)
app.component('vue-button', Button)
app.component('button-group', ButtonGroup)
app.component('vue-card', Card)
app.component('data-view', DataView)
app.component('meter-group', MeterGroup)

app.mount('#app')
