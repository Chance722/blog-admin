import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import iView from 'iview'
import { canTurnTo, } from '@/libs/util'
import { getItem, } from '@/libs/tools'
import config from '@/config'
const { homeName, } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history',
})
const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'error_401', }) // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()

  const accessToken = getItem(config.blogAdminAccessToken)
  const userData = getItem(config.blogAdminData)
  const tokenTime = getItem(config.blogAdminTokenTime)
  const now = new Date().getTime()
  const isExpired = now - parseInt(tokenTime) >= config.expiredTime * 60 * 60 * 1000
  const isLogined = accessToken && userData && !isExpired

  if (!isLogined && to.name !== LOGIN_PAGE_NAME) {
    next({
      name: LOGIN_PAGE_NAME,
    })
  } else if (isLogined && to.name === LOGIN_PAGE_NAME) {
    next({
      name: homeName,
    })
  } else {
    next()
  }
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
