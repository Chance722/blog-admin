/**
 * http请求拦截器
 */
import axios from 'axios'
import {
  BASE_URL,
  DEVELOP_BASE_URL,
  BLOGADMIN_ACCESS_TOKEN,
} from '@/common/const'
import utils from '@/utils/'
import app from '../main'

axios.defaults.baseURL = Object.is(process.env, 'production') ? BASE_URL : DEVELOP_BASE_URL

// 请求拦截器
axios.interceptors.request.use(
  config => {
    app.$Progress.start()
    // 设置 30s 超时
    if (!config.timeout) config.timeout = 30000
    config.headers.Authorization = utils.getItem(BLOGADMIN_ACCESS_TOKEN)
    return config
  },
  err => {
    app.$Message.error(err.message)
    return Promise.reject(err)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  res => {
    app.$Progress.finish()
    res = res && res.data
    return res
  },
  err => {
    app.$Progress.finish()
    app.$Message.error(err.message)
    console.log(err.response)
    let code = err.response && err.response.data.code
    if (code === 401) {
      localStorage.clear()
      location.hash = '#/login'
    }
    return Promise.reject(err)
  }
)

export default axios
