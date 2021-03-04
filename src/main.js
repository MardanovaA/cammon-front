import Vue from 'vue'
import App from './App.vue'
import router from './router'


import VueKonva from 'vue-konva'
Vue.use(VueKonva)

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { NavbarPlugin, IconsPlugin } from 'bootstrap-vue'
Vue.use(NavbarPlugin)
Vue.use(IconsPlugin)


import VueProgress from 'vue-progress-path'
Vue.use(VueProgress)
import 'vue-progress-path/dist/vue-progress-path.css'

Vue.config.productionTip = false
new Vue({
  router,
  render: function (h) { return h(App) },
}).$mount('#app')
