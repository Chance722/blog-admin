<template>
  <div id="app">
    <router-view />
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'getIsLogined'
    ])
  },
  mounted () {
    this.$Progress.finish()
  },
  created () {
    this.$Progress.start()
    this.initRouterProgress()
  },
  methods: {
    initRouterProgress () {
      this.$router.beforeEach((to, from, next) => {
        if (to.meta.progress !== undefined) {
          let meta = to.meta.progress
          this.$Progress.parseMeta(meta)
        }
        this.$Progress.start()
        next()
      })
      this.$router.afterEach((to, from) => {
        this.$Progress.finish()
      })
    }
  }
}
</script>

<style lang='scss'>
#app {
  height: 100%;
}
</style>
