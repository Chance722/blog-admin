import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'
import axios from './utils/axios'
import VueProgressBar from 'vue-progressbar'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import '@/assets/css/reset.scss'
import '@/assets/css/public.scss'

Vue.use(VueAxios, axios)
Vue.use(VueProgressBar, {
  color: '#409eff',
  failedColor: '#874b4b',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300,
  },
  autoRevert: true,
  location: 'top',
  inverse: false,
})
Vue.use(iView)

Vue.config.productionTip = false
Vue.prototype.$eventhub = new Vue({})

const app = new Vue({
  router,
  store,
  render: h => h(App),
})

export default app.$mount('#app')
