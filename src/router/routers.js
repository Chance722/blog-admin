import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true,
    },
    component: () => import('@/view/login'),
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true,
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home',
        },
        component: () => import('@/view/home'),
      },
    ],
  },
  {
    path: '',
    name: 'articles',
    meta: {
      hideInBread: true,
    },
    component: Main,
    children: [
      {
        path: '/articles',
        name:'articles-page',
        meta: {
          title: '文章管理',
          icon: 'ios-paper',
        },
        component: () => import('@/view/articles/')
      },
      {
        path: '/articles-publish',
        name:'articles-publish',
        meta: {
          title: '发布文章',
          hideInMenu: true,
        },
        component: () => import('@/view/articles-publish/')
      }
    ],
  },
  {
    path: '',
    name: 'categorys',
    meta: {
      hideInBread: true,
    },
    component: Main,
    children: [
      {
        path: '/categorys',
        name:'categorys-page',
        meta: {
          title: '分类管理',
          icon: 'md-apps',
        },
        component: () => import('@/view/categorys/')
      }
    ],
  },
  {
    path: '',
    name: 'tags',
    meta: {
      hideInBread: true,
    },
    component: Main,
    children: [
      {
        path: '/tags',
        name:'tags-page',
        meta: {
          title: '标签管理',
          icon: 'md-pricetag',
        },
        component: () => import('@/view/tags/')
      }
    ],
  },
  {
    path: '',
    name: 'albums',
    meta: {
      hideInBread: true,
    },
    component: Main,
    children: [
      {
        path: '/albums',
        name:'albums-page',
        meta: {
          title: '相册管理',
          icon: 'md-photos',
        },
        component: () => import('@/view/albums/')
      }
    ],
  },
  {
    path: '',
    name: 'comments',
    meta: {
      hideInBread: true,
    },
    component: Main,
    children: [
      {
        path: '/comments',
        name:'comments-page',
        meta: {
          title: '评论管理',
          icon: 'ios-text',
        },
        component: () => import('@/view/comments/')
      }
    ],
  },
  {
    path: '',
    name: 'musics',
    meta: {
      hideInBread: true,
    },
    component: Main,
    children: [
      {
        path: '/muscis',
        name:'musics-page',
        meta: {
          title: '音乐管理',
          icon: 'ios-musical-notes',
        },
        component: () => import('@/view/musics/')
      }
    ],
  },
  {
    path: '',
    name: 'settings',
    meta: {
      hideInBread: true,
    },
    component: Main,
    children: [
      {
        path: '/settings',
        name:'settings-page',
        meta: {
          title: '全局设置',
          icon: 'md-settings',
        },
        component: () => import('@/view/settings/')
      }
    ],
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true,
    },
    component: () => import('@/view/error-page/401.vue'),
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true,
    },
    component: () => import('@/view/error-page/500.vue'),
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true,
    },
    component: () => import('@/view/error-page/404.vue'),
  },
]
