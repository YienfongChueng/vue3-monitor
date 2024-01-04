import { createApp } from 'vue'
import './style.css'
import '@/assets/font/iconfont.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from '@/router'
import pinia from '@/store'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')

// 全局注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
