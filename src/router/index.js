import Vue from 'vue'
import Router from 'vue-router'
import utils from '@/utils'
import { BLOGADMIN_DATA, BLOGADMIN_ACCESS_TOKEN } from '@/config/const'
const Login = () => import('@/views/Login')
const Home = () => import('@/views/Home')
const DashBoard = () => import('@/views/DashBoard')
const ArticleList = () => import('@/views/ArticleList')
const ArticlePublish = () => import('@/views/ArticlePublish')
const ArticleCategorys = () => import('@/views/ArticleCategorys')
const ArticleTags = () => import('@/views/ArticleTags')
const MusicManage = () => import('@/views/MusicManage')
const WordsManage = () => import('@/views/WordsManage')
const AlbumList = () => import('@/views/AlbumList')
const AlbumPublish = () => import('@/views/AlbumPublish')
const Settings = () => import('@/views/Settings')
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
      component: Home,
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
    if ((accessToken && userData)) {
      next()
    } else {
      next('/login')
    }
  }
  next()
})

export default router
