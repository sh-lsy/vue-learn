import { createApp } from 'vue'
import App from './App.vue'

import store from './store/index'
import router from './router/index'

import 'ant-design-vue/dist/antd.css';
import Antd from './plugins/Ant'

const app = createApp(App)
app.use(router)
app.use(Antd)
app.use(store)
app.mount('#app')

