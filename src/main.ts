import '@/styles/app.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 引入 Ant Design Vue 组件库及其样式
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')