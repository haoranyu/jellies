import Vue from 'vue'
import App from './App.vue'
import Jellies from './index.js'

Vue.config.productionTip = false
Vue.use(Jellies)

new Vue({
  render: h => h(App)
}).$mount('#app')
