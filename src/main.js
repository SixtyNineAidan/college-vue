/**
 * @Date:   2021-03-15T19:26:35+00:00
 * @Last modified time: 2021-04-18T00:12:58+01:00
 */



import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VuePageTransition from 'vue-page-transition'

Vue.use(VuePageTransition)


Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
