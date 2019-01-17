<template>
  <header class="_v_header">
    <div class="logo-container">
      <span>Chance722</span>
    </div>
    <div class="user-info">
      <el-button type="warning" plain @click="logout">退出登陆</el-button>
      <div class="img">
        <img :src="avator" alt="">
      </div>
      <span class="name">{{ name }}</span>
    </div>
  </header>
</template>

<script>
import utils from '@/utils'
import { BLOGADMIN_DATA, BLOGADMIN_ACCESS_TOKEN } from '@/config/const'
import { mapState, mapMutations } from 'vuex'
import defaultImg from '@/assets/img/logo.png'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState([
      'userData'
    ]),
    name () {
      const data = this.userData || (utils.getItem(BLOGADMIN_DATA) && JSON.parse(utils.getItem(BLOGADMIN_DATA)))
      return data ? data.name : 'chance722'
    },
    avator () {
      const data = this.userData || (utils.getItem(BLOGADMIN_DATA) && JSON.parse(utils.getItem(BLOGADMIN_DATA)))
      return data && data.avator ? data.avator : defaultImg
    }
  },
  methods: {
    ...mapMutations([
      'setIsLogined',
      'setUserData'
    ]),
    logout () {
      this.$confirm(`是否确认退出？`, `提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        utils.removeItem(BLOGADMIN_DATA)
        utils.removeItem(BLOGADMIN_ACCESS_TOKEN)
        this.setIsLogined(false)
        this.setUserData(null)
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

header{
  width: 100%;
  min-width: 1280px;
  height: 75px;
  position: fixed;
  left:0;
  top: 0;
  background-color: $bg-header-color;
  z-index: $z-1000;

  .logo-container{
    position: absolute;
    width: 200px;
    height: 100%;
    left: 50px;
    top: 0;

    span{
      color: $white;
      font-size: 24px;
      line-height: 75px;
      font-family: 'SimHei';
      display: inline-block;
    }

  }

  .user-info{
    float: right;
    margin-right: 20px;
    line-height: 75px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .img{
      width: 40px;
      height: 40px;
      margin: 0 10px 0 20px;
      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: block;
      }
    }
    span.name{
      color: $white;
      display: inline-block;
      vertical-align: middle;
    }
  }

}
</style>
