import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.prototype.$http = axios
// token Config
const token = localStorage.getItem('token')
// If there is any token then we will simply append default axios authorization
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token
}

Vue.config.productionTip = false
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
