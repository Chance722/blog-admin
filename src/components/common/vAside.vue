<template>
  <aside class="_v_aside">
    <el-menu
      :default-active='activeRoutePath'
      class="el-menu-vertical-demo"
      background-color="#212928"
      text-color="#A7A9A9"
      active-text-color="#ffffff"
      :collapse="getAsideCollapse"
      unique-opened
      router
    >
      <template v-for="(item, index) in menus">
        <template v-if="item.subNav.length">
          <el-submenu
            :index="''+index+''"
            :key="index"
          >
            <template slot="title">
              <i :class="item.icon || 'el-icon-more-outline'"></i>
              <span>{{item.navName}}</span>
            </template>
            <el-menu-item v-for="(subNavItem, subNavIndex) in item.subNav" :index="subNavItem.route" :key="subNavIndex">
              <i :class="subNavItem.icon || 'el-icon-more-outline'"></i>
              <span>{{subNavItem.navName}}</span>
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :key="index" :index="item.route">
            <template slot="title">
              <i :class="item.icon || 'el-icon-more-outline'"></i>
              <span>{{item.navName}}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      menus: [],
      activeRoutePath: ''
    }
  },
  computed: {
    ...mapGetters([
      'getAsideCollapse'
    ])
  },
  methods: {
    initMenus () {
      this.axios.get(`${location.origin}/static/sidebar.json`).then(res => {
        this.menus = res.menus
      })
    }
  },
  watch: {
    $route (route) {
      this.activeRoutePath = route.path
    }
  },
  created () {
    this.initMenus()
    let timer = setTimeout(() => {
      clearTimeout(timer)
      this.activeRoutePath = this.$route.path
    }, 200)
  }
}
</script>

<style lang="scss" scoped>
._v_aside{
  width: 250px;
  height: 100%;
  background: #212928;
  position: fixed;
  left: 0;
  top: 75px;
  overflow-x: hidden;
  transition: all 0.5s ease 0.5s;

  .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 250px;
  }

}
</style>
