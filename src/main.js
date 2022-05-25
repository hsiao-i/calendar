import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

import decimal from '@/methods/filters.js'

const app = createApp(App)
app.config.globalProperties.$filters = decimal
app.use(VueAxios, axios)
app.mount('#app')
