import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import createLogger from 'vuex/dist/logger'

const isDev = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    strict: isDev,
    plugins: isDev ? [
      createLogger(),
    ] : [],
  })
}
