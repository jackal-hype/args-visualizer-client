import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)
Vue.config.productionTip = false

window.EventBus = new Vue()     // we'll use Vuex next time..

window.vm1 = new Vue({
  router,
  store,
  render: h => h(App)
})
window.vm1.$mount('#app')
