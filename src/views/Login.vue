<template>
  <div class="_login_view">
    <div id="particles-js" class="bg-canvas"></div>
    <div class="login_container">
      <h3>管理登录</h3>
      <el-form ref="form">
        <el-form-item label="账号">
          <el-input placeholder="账户名称" v-model="form.name" @keyup.native.enter="onSubmit"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" placeholder="账号密码" v-model="form.pwd" @keyup.native.enter="onSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import 'particles.js'
import api from '@/api'
import utils from '@/utils'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      form: {
        name: '',
        pwd: ''
      }
    }
  },
  methods: {
    ...mapMutations([
      'setIsLogined',
      'setUserData'
    ]),
    onSubmit () {
      if (utils.isParamsEmpty(this.form.name, this.form.pwd)) {
        this.$message.error('账号或密码不能为空')
        return
      }
      api.login(this.form.name, this.form.pwd).then(res => {
        if (res.code === 200 && res.success) {
          this.setIsLogined(true)
          this.setUserData(res.data)
          this.$message.success('登录成功')
          this.$router.push({
            name: 'DashBoard'
          })
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => {
        this.$message.error(err.response.data.message)
      })
    }
  },
  mounted () {
    window.particlesJS.load('particles-js', '/static/particle.json')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

._login_view{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: $bg-login-color;
  .bg-canvas{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .login_container{
    width: 360px;
    height: 400px;
    padding: 40px 20px;
    background-color: #fff;
    box-shadow: 0 0 10px #fff;
    border-radius: 2px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    h3{
      font-size: $fs-24;
      text-align: center;
      padding-bottom: 50px;
    }
    .el-button{
      width: 100%;
    }
  }
}
</style>
