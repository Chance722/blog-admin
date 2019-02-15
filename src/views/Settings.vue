<template>
  <section class="settings">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane name="base">
        <span slot="label"><i class="iconfont icon-rili" /> 基本信息</span>
        <base-info :settingInfo="settingInfo"></base-info>
      </el-tab-pane>
      <el-tab-pane name="user">
        <span slot="label"><i class="iconfont icon-fensi" /> 用户信息</span>
        <user-info :settingInfo="settingInfo"></user-info>
      </el-tab-pane>
      <el-tab-pane name="pwd">
        <span slot="label"><i class="iconfont icon-caozuo" /> 修改密码</span>
        <pwd-info />
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import api from '@/api'
import baseInfo from '@/components/settings/baseInfo'
import userInfo from '@/components/settings/userInfo'
import pwdInfo from '@/components/settings/pwdInfo'
export default {
  components: {
    baseInfo,
    userInfo,
    pwdInfo
  },
  data () {
    return {
      activeName: 'base',
      settingInfo: null
    }
  },
  methods: {
    getSettingInfo () {
      api.getSettingInfo().then(res => {
        if (res.code === 200 && res.success) {
          this.settingInfo = res.data
        }
      })
    }
  },
  created () {
    this.getSettingInfo()
    this.$eventhub.$on('getSettingInfo', () => this.getSettingInfo())
  },
  destroyed () {
    this.$eventhub.$off('getSettingInfo')
  }
}

</script>
<style lang='scss' scoped>
@import '@/assets/css/variables.scss';

.settings{
  width: 98%;
  font-size: $fs-14;
  min-height: 600px;
  margin-bottom: 30px;
}
</style>
