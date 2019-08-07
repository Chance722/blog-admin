<template>
  <div class="login">
    <particle-bg />
    <div class="login-logo" />
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import ParticleBg from '_c/particle-bg'
import { isParamsEmpty } from '@/libs/tools'

export default {
  components: {
    LoginForm,
    ParticleBg,
  },
  methods: {
    async handleSubmit ({ userName, password, }) {
     this.$router.push({ name: this.$config.homeName })
      const res = await $api.login(userName, password)
      if (res.code === 200) {
        console.log(res)
        this.$store.commit('setIsLogin', true)
        this.$store.commit('setUserData', res.data)
        this.$Message.success('登录成功')
        this.$router.push({ name: this.$config.homeName })
      } else {
        this.$Message.error(res.message)
      }
    },
  },
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
