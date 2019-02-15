<template>
  <div class="_home_view">
    <v-header></v-header>
    <v-aside></v-aside>
    <v-main>
      <router-view slot="router-view" />
    </v-main>
  </div>
</template>

<script>
import api from '@/api'
import vHeader from '@/components/common/vHeader'
import vAside from '@/components/common/vAside'
import vMain from '@/components/common/vMain'
import { mapMutations } from 'vuex'
export default {
  components: {
    vHeader,
    vAside,
    vMain
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations([
      'setUploadToken'
    ]),
    getUploadToken () {
      api.getToken().then(res => {
        if (res.code === 200 && res.success) {
          this.setUploadToken(res.data.token)
        }
      })
    }
  },
  created () {
    this.getUploadToken()
  }
}
</script>
<style lang='scss' scoped>
</style>
