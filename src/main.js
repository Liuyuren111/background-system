import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import './assets/css/iconfont.css'
import './assets/scss/login-reg.scss'

createApp(App).use(createPinia()).use(ElementPlus, { locale }).use(router).mount('#app')
