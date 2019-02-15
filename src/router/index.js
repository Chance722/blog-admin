import Vue from 'vue'
import Router from 'vue-router'
import utils from '@/utils'
import {
  BLOGADMIN_DATA,
  BLOGADMIN_ACCESS_TOKEN,
  BLOGADMIN_TOKEN_TIME,
  EXPIRED_TIME
} from '@/config/const'
const Login = () => import('@/views/login')
const Homepage = () => import('@/views/homepage')
const DashBoard = () => import('@/views/dashBoard')
const ArticleList = () => import('@/views/articleList')
const ArticlePublish = () => import('@/views/articlePublish')
const ArticleCategorys = () => import('@/views/articleCategorys')
const ArticleTags = () => import('@/views/articleTags')
const MusicManage = () => import('@/views/musicManage')
const WordsManage = () => import('@/views/wordsManage')
const AlbumList = () => import('@/views/albumList')
const AlbumPublish = () => import('@/views/albumPublish')
const Settings = () => import('@/views/settings')
const filterNames = ['Login']

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Homepage,
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'DashBoard',
          component: DashBoard
        },
        {
          path: '/articleManage/articleList',
          name: 'ArticleList',
          component: ArticleList
        },
        {
          path: '/articleManage/articlePublish',
          name: 'ArticlePublish',
          component: ArticlePublish
        },
        {
          path: '/propertyManage/articleCategorys',
          name: 'ArticleCategorys',
          component: ArticleCategorys
        },
        {
          path: '/propertyManage/articleTags',
          name: 'ArticleTags',
          component: ArticleTags
        },
        {
          path: '/musicManage',
          name: 'MusicManage',
          component: MusicManage
        },
        {
          path: '/wordsManage',
          name: 'WordsManage',
          component: WordsManage
        },
        {
          path: '/albumManage/albumList',
          name: 'AlbumList',
          component: AlbumList
        },
        {
          path: '/albumManage/albumPublish',
          name: 'AlbumPublish',
          component: AlbumPublish
        },
        {
          path: '/settings',
          name: 'Settings',
          component: Settings
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
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
