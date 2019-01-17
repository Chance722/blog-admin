<template>
  <section class="_v_breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>我的面板</el-breadcrumb-item>
      <template v-for="(item, index) in routeNames">
        <el-breadcrumb-item :key="index"><a v-if="routeInfo[item].path" :href="routeInfo[item].path"></a>{{routeInfo[item].name}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </section>
</template>

<script>
export default {
  data () {
    return {
      routePath: '',
      routeInfo: {
        articleManage: {
          name: '文章管理',
          path: ''
        },
        articleList: {
          name: '文章列表',
          path: '/articleManage/articleList'
        },
        articlePublish: {
          name: '发布文章',
          path: '/articleManage/publish'
        },
        dashboard: {
          name: '分析统计',
          path: '/dashboard'
        },
        propertyManage: {
          name: '属性管理',
          path: ''
        },
        articleCategorys: {
          name: '分类',
          path: '/propertyManage/articleCategorys'
        },
        articleTags: {
          name: '标签',
          path: '/propertyManage/articleTags'
        },
        musicManage: {
          name: '音乐管理',
          path: '/musicManage'
        },
        wordsManage: {
          name: '评论管理',
          path: '/wordsManage'
        },
        albumManage: {
          name: '相册管理',
          path: ''
        },
        albumList: {
          name: '相册列表',
          path: '/albumManage/albumList'
        },
        albumPublish: {
          name: '相册上传',
          path: '/albumManage/albumPublish'
        },
        settings: {
          name: '全局设置',
          path: '/settings'
        }
      }
    }
  },
  computed: {
    routeNames () {
      if (this.routePath.length) {
        return this.routePath.substring(1, this.routePath.length).split('/')
      } else {
        return []
      }
    }
  },
  watch: {
    $route (route) {
      this.routePath = route.path
    }
  }
}
</script>

<style lang="scss" scoped>
._v_breadcrumb{
  margin-bottom: 20px;
}
</style>
