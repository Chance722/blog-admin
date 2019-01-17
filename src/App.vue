<template>
  <div id="app">
    <router-view />
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
  }
}
</script>

<style lang='scss'>
#app {
  height: 100%;
}
</style>
