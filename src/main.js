import 'mdb-vue-ui-kit/css/mdb.dark.min.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router.js'

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app')
