<template>
  <header class="v-header">
    <div class="v-header--logo">
      <img src="../../../assets/img/logo3.png">
    </div>
    <div class="v-header--info"></div>
  </header>
</template>

<script>
import utils from '@/utils'
import {
  BLOGADMIN_DATA,
  BLOGADMIN_ACCESS_TOKEN,
} from '@/common/const'
import {
  mapGetters,
} from 'vuex'
import defaultImg from '@/assets/img/default.png'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'userData',
    ]),
    uData () {
      return this.userData || (utils.getItem(BLOGADMIN_DATA) && JSON.parse(utils.getItem(BLOGADMIN_DATA)))
    },
    name () {
      return this.uData ? this.uData.name : '外星人'
    },
    avator () {
      return this.uData && this.uData.avator ? this.uData.avator : defaultImg
    },
  },
  methods: {
    logout () {
      this.$Modal.warning({
        title: '提示',
        content: '是否确认退出？',
        onOk: () => {
          utils.removeItem(BLOGADMIN_DATA)
          utils.removeItem(BLOGADMIN_ACCESS_TOKEN)
          this.$store.commit('setIsLogined', false)
          this.$store.commit('setUserData', null)
          this.$router.push('/login')
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.v-header {
  width: 100%;
  min-width: 1280px;
  height: 75px;
  position: fixed;
  left:0;
  top: 0;
  background-color: $bg-header-color;
  z-index: $z-1000;

  &--logo {
    position: absolute;
    width: 294px;
    height: 60px;
    left: 0;
    top: 5px;
    transform: scale(.7);

    img {
      width: 100%;
      height: 100%;
    }
  }

  &--info {

  }
}
</style>
