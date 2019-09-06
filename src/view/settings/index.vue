<template>
  <div class="settings">
    <Card>
      <Tabs>
        <TabPane label="用户设置" icon="ios-person">
          <userSetting />
        </TabPane>
        <TabPane label="站点设置" icon="ios-globe">
          <blogSetting />
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
		}
	},
}
</script>

<style lang="scss" scoped>

@import './index.scss';

</style>
