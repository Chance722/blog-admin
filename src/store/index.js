import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import createLogger from 'vuex/dist/logger'

const isDev = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    state: {
      userData: null,
      uploadToken: null,
      isLogined: false, // 登录状态
      asideCollapse: false, // 侧边栏状态
      totalCategorys: [], // 文章/相册 所有分类
      totalTags: [] // 文章/相册 所有标签
    },
    actions,
    mutations,
    getters,
    strict: isDev,
    plugins: isDev ? [createLogger()] : []
  })
}
