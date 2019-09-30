<template>
  <div class="settings">
    <Card>
      <Tabs>
        <TabPane label="用户设置" icon="ios-person">
          <userSetting :settingInfo="settingInfo" />
        </TabPane>
        <TabPane label="站点设置" icon="ios-globe">
          <blogSetting :settingInfo="settingInfo" />
        </TabPane>
        <TabPane label="修改密码" icon="ios-key">
          <pwdSetting />
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import userSetting from './components/user-setting'
import blogSetting from './components/blog-setting'
import pwdSetting from './components/pwd-setting'
export default {
	components: {
    userSetting,
    blogSetting,
    pwdSetting,
	},
	data () {
		return {
      settingInfo: {},
		}
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.initSettingInfo()
    },
    async initSettingInfo () {
      const res = await $api.getInfo()
      if (res.code === 200) this.settingInfo = res.data
    },
  },
}
</script>

<style lang="scss" scoped>

@import './index.scss';

</style>
