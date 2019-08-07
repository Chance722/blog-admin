/**
 * http请求拦截器
 */
import axios from 'axios'
import { getItem } from '@/libs/tools'
import { Message } from 'iview'

const config = app.$config

axios.defaults.baseURL = Object.is(process.env, 'production') ? config.baseUrl.pro : config.baseUrl.dev

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 设置 30s 超时
    if (!config.timeout) config.timeout = 30000
    config.headers.Authorization = getItem(config.blogAdminAccessToken)
    return config
  },
  err => {
    Message.error(err.message)
    return Promise.reject(err)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  res => {
    res = res && res.data
    return res
  },
  err => {
    Message.error(err.message)
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
