import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {router} from "./router/index.js";
import store from "~/store/index.js";
import permission from "~/directives/permission.js";
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(permission)
import 'virtual:windi.css'
import  "~/permission"
import "nprogress/nprogress.css"

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
