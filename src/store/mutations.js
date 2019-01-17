import utils from '@/utils'
import { BLOGADMIN_DATA, BLOGADMIN_ACCESS_TOKEN } from '@/config/const'

const mutations = {
  setUserData (state, userData) {
    state.userData = userData
    if (userData) {
      utils.setItem(BLOGADMIN_ACCESS_TOKEN, userData.token || '')
      utils.setItem(BLOGADMIN_DATA, JSON.stringify(userData) || '')
    }
  },
  setIsLogined (state, isLogined) {
    state.isLogined = isLogined
  },
  setUploadToken (state, token) {
    state.uploadToken = token
  },
  setAllCategorys (state, categorys) {
    state.totalCategorys = categorys
  },
  setAllTags (state, tags) {
    state.totalTags = tags
  }
}

export default mutations
