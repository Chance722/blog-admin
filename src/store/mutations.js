import utils from '@/utils'
import {
  BLOGADMIN_DATA,
  BLOGADMIN_ACCESS_TOKEN,
  BLOGADMIN_TOKEN_TIME,
} from '@/common/const'

const mutations = {
  setUserData (state, payload) {
    state.userData = payload
    if (payload) {
      utils.setItem(BLOGADMIN_ACCESS_TOKEN, payload.token || '')
      utils.setItem(BLOGADMIN_DATA, JSON.stringify(payload) || '')
      utils.setItem(BLOGADMIN_TOKEN_TIME, new Date().getTime())
    }
  },
  setIsLogined (state, payload) {
    state.isLogined = payload
  },
  setUploadToken (state, payload) {
    state.uploadToken = payload
  },
  setAllCategorys (state, payload) {
    state.totalCategorys = payload
  },
  setAllTags (state, payload) {
    state.totalTags = payload
  },
}

export default mutations
