import { setItem } from '@/libs/tools'
import config from '@/config'

export default {
  state: {
    access: '',
    isLogined: false,
    userData: null,
  },
  mutations: {
    setAccess (state, access) {
      state.access = access
    },
    setUserData (state, data) {
      state.userData = data
      console.log('setUserData: ', data)
      if (data) {
        setItem(config.blogAdminAccessToken, data.token || '')
        setItem(config.blogAdminData, JSON.stringify(data))
        setItem(config.blogAdminTokenTime, new Date().getTime())
      }
    },
    setIsLogin (state, status) {
      state.isLogined = status
    },
  },
  actions: {
  },
}
