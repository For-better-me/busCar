import Vue from 'vue'
import App from './App.vue'
import {Router} from './router/router'
import routerConfig from './router/routerConfig'
Vue.config.productionTip = false

Vue.prototype.$route = Router
Vue.prototype.$rConfig = routerConfig
new App().$mount()
