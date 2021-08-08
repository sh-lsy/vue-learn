import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'
const app = createApp(App)
import 'ant-design-vue/dist/antd.css';
import Antd from './plugins/Ant'
app.use(Antd)
app.use(store)
app.mount('#app')

