<template>
  <aside class="v-aside">
    <Row>
      <Col span="8">
        <Menu :theme="theme" class="dark-theme">
          <Submenu v-for="(subItem, subIndex) in menus" :key="'sub-item-' + subIndex" :name="`${subIndex}`">
            <template slot="title">
              <Icon :type="subItem.icon" />
              {{ subItem.navName }}
            </template>
            <MenuItem
              v-for="(menuItem, menuIndex) in subItem.subNav"
              :key="'menu-item-' + menuIndex"
              :name="`${subIndex}-${menuIndex}`">
              <Icon :type="menuItem.icon" />
              {{ menuItem.navName }}
            </MenuItem>
          </Submenu>
        </Menu>
      </Col>
    </Row>
  </aside>
</template>
<script>
export default {
  data () {
    return {
      theme: 'dark',
      menus: [],
      activeRoutePath: '',
    }
  },
  watch: {
    $route (route) {
      this.activeRoutePath = route.path
    },
  },
  created () {
    this.initMenus()
    let timer = setTimeout(() => {
      clearTimeout(timer)
      this.activeRoutePath = this.$route.path
    }, 200)
  },
  methods: {
    initMenus () {
      this.axios.get(`${location.origin}/sidebar.json`).then(res => {
        console.log(res)
        this.menus = res.menus
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.v-aside {
  position: fixed;
  left: 0;
  top: 75px;
  width: 250px;
  height: 100%;

  .ivu-row {
    height: 100%!important;
    background: $bg-header-color;
  }

  .dark-theme {
    width: 250px!important;
  }
}
</style>
