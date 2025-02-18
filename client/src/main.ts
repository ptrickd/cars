import { createApp } from 'vue'
import App from './App.vue'

import { router } from './utils/Router'

import PrimeVue from 'primevue/config'
import { definePreset } from '@primevue/themes'

import Aura from '@primevue/themes/aura'

//Import PrimeVue Components
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'

import Breadcrumb from 'primevue/breadcrumb'
import Button from 'primevue/button'
import ButtonGroup from 'primevue/buttongroup'
import Card from 'primevue/card'

import DataView from 'primevue/dataview'

import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import Select from 'primevue/select'
import FloatLabel from 'primevue/floatlabel'

import Message from 'primevue/message'
import Inplace from 'primevue/inplace'

import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Menubar from 'primevue/menubar'
import MeterGroup from 'primevue/metergroup'

//Import Router
import { RouterLink } from 'vue-router'

//ToastService application plugin for primevue
import ToastService from 'primevue/toastservice'

//Import PrimeVue css
import 'primeicons/primeicons.css'

const app = createApp(App)

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{teal.50}',
      100: '{teal.100}',
      200: '{teal.200}',
      300: '{teal.300}',
      400: '{teal.400}',
      500: '{teal.500}',
      600: '{teal.600}',
      700: '{teal.700}',
      800: '{teal.800}',
      900: '{teal.900}',
      950: '{teal.950}'
    }
  }
})

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    ripple: true
  }
})
app.use(ToastService)
app.use(router)

//Add PrimeVue Components
app.component('v-accordion', Accordion)
app.component('v-accordion-panel', AccordionPanel)
app.component('v-accordion-header', AccordionHeader)
app.component('v-accordion-content', AccordionContent)

app.component('bread-crumb', Breadcrumb)
app.component('v-button', Button)
app.component('button-group', ButtonGroup)
app.component('v-card', Card)

app.component('data-view', DataView)
app.component('v-divider', Divider)
app.component('v-dialog', Dialog)
app.component('v-select', Select)
app.component('float-label', FloatLabel)

app.component('v-message', Message)
app.component('in-place', Inplace)
app.component('input-text', InputText)
app.component('input-number', InputNumber)
app.component('menu-bar', Menubar)
app.component('meter-group', MeterGroup)

//Add Router
app.component('router-link', RouterLink)

app.mount('#app')
