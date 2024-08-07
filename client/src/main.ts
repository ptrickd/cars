import { createApp } from 'vue'
import App from './App.vue'

import { router } from './utils/Router'

import PrimeVue from 'primevue/config'

//Import PrimeVue Components
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Breadcrumb from 'primevue/breadcrumb'
import Button from 'primevue/button'
import ButtonGroup from 'primevue/buttongroup'
import Card from 'primevue/card'

import DataView from 'primevue/dataview'

import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import Dropdown from 'primevue/dropdown'
import FloatLabel from 'primevue/floatlabel'

import InlineMessage from 'primevue/inlinemessage'
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

import 'primevue/resources/themes/lara-dark-cyan/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)
app.use(router)

//Add PrimeVue Components
app.component('vue-accordion', Accordion)
app.component('vue-accordion-tab', AccordionTab)
app.component('bread-crumb', Breadcrumb)
app.component('vue-button', Button)
app.component('button-group', ButtonGroup)
app.component('vue-card', Card)

app.component('data-view', DataView)
app.component('vue-divider', Divider)
app.component('vue-dialog', Dialog)
app.component('drop-down', Dropdown)
app.component('float-label', FloatLabel)

app.component('inline-message', InlineMessage)
app.component('in-place', Inplace)
app.component('input-text', InputText)
app.component('input-number', InputNumber)
app.component('menu-bar', Menubar)
app.component('meter-group', MeterGroup)

//Add Router
app.component('router-link', RouterLink)

app.mount('#app')
