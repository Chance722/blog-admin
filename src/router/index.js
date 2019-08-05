import Vue from 'vue'
import Router from 'vue-router'
import utils from '@/utils'
import {
  BLOGADMIN_DATA,
  BLOGADMIN_ACCESS_TOKEN,
  BLOGADMIN_TOKEN_TIME,
  EXPIRED_TIME,
} from '@/common/const'
import Loading from '@/components/Loading'
import Home from '@/views/home'

Vue.use(Router)

const filterNames = [
  'login',
]

const AsyncLoad = compName => new Promise(resolve => {
  const load = () => ({
    component: import(/* webpackChunkName: "[request]" */ `@/views/${compName}`),
    loading: Loading,
  })
  resolve({
    functional: true,
    name: 'AsyncLoad',
    render: h => h(load),
  })
})

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => AsyncLoad('dashboard'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => AsyncLoad('login'),
  },
]

const router = new Router({
  routes,
  linkActiveClass: 'nav-active',
})

router.beforeEach((to, from, next) => {
  if (!filterNames.includes(to.name)) {
    let accessToken = utils.getItem(BLOGADMIN_ACCESS_TOKEN)
    let userData = utils.getItem(BLOGADMIN_DATA)
    let tokenTime = utils.getItem(BLOGADMIN_TOKEN_TIME)
    let now = new Date().getTime()
    let isExpired = now - parseInt(tokenTime) >= EXPIRED_TIME * 60 * 60 * 1000
    if ((accessToken && userData && !isExpired)) {
      next()
    } else {
      // 身份已过期
      next('/login')
    }
  }
  next()
})

export default router
