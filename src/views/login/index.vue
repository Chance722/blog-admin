<template>
  <div class="login-view">
    <ParticleCanvas />
    <div class="login-container">
      <h3>Manager Login</h3>
      <Form :model="formItems" :rules="formRules">
        <FormItem prop="user">
          <Input type="text" v-model="formItems.user" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formItems.password" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem class="submit-item">
          <Button type="primary" long @click="handleSubmit()">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import utils from '@/utils'
import ParticleCanvas from '@/components/Particle'
export default {
  components: {
    ParticleCanvas,
  },
  data () {
    return {
      formItems: {
        user: '',
        password: '',
      },
      formRules: {
        user: [
          { required: true, message: '请输入账户名称', trigger: 'blur', },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur', },
          { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur', },
        ],
      },
    }
  },
  methods: {
    async handleSubmit () {
      if (utils.isParamsEmpty(this.formItems.user, this.formItems.password)) {
        this.$Message.error('账号或密码不能为空')
        return
      }
      const res = await $api.login(this.formItems.user, this.formItems.password)
      if (res.code === 200 && res.success) {
        this.$store.commit('setIsLogin', true)
        this.$store.commit('setUserData', res.data)
        this.$Message.success('登录成功')
        this.$router.push({
          name: 'dashboard',
        })
      } else {
        this.$Message.error(res.message)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.login-view {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: $bg-login-color;

  .login-container {
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

    .submit-item {
      text-align: center;
      padding-top: 30px;
    }
  }
}
</style>
