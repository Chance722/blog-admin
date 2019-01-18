// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'
import VueAxios from 'vue-axios'
import axios from './utils/axios'
import VueProgressBar from 'vue-progressbar'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.scss'
import '@/assets/css/element-reset.scss'
import '@/assets/css/public.scss'
import '@/assets/font/blog-font/iconfont.css'

Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(VueProgressBar, {
  color: '#409eff',
  failedColor: '#874b4b',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
})

Vue.config.productionTip = false
Vue.prototype.$eventhub = new Vue({})

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

export default app.$mount('#app')
