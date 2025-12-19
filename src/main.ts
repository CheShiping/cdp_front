import '@/styles/app.scss'
import '@/styles/dark.scss'
import '@/styles/transation.scss'
// markstream vue KaTeX 数学公式渲染
import 'katex/dist/katex.min.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 引入 Ant Design Vue 组件库及其样式
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// 预加载 AI Bot
import { bot } from './ai/bot';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)

// 在应用启动时就初始化 bot，进一步提高响应速度
bot.init().then(() => {
  console.log('Bot initialized successfully');
}).catch((error) => {
  console.error('Failed to initialize bot:', error);
});

app.mount('#app')