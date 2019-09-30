<template>
  <div class="pwd-setting">
    <Form ref="pwdForm" :model="formModel" :rules="ruleModel" :label-width="120">
      <FormItem label="原密码" prop="oldPwd">
        <Input type="password" v-model="formModel.oldPwd" class="w300"></Input>
      </FormItem>
      <FormItem label="新密码" prop="newPwd">
        <Input type="password" v-model="formModel.newPwd" class="w300"></Input>
      </FormItem>
      <FormItem label="确认密码" prop="confirmPwd">
        <Input type="password" v-model="formModel.confirmPwd" class="w300"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" class="w100 ml5" @click="savePwd">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formModel: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: '',
      },
      ruleModel: {
        oldPwd: [
          {
            required: true,
            message: '旧密码不能为空',
          },
          {
            pattern: /\w{6,20}/,
            message: '6-20位且只包括数字/字母/下划线',
            trigger: 'blur',
          },
        ],
        newPwd: [
          {
            required: true,
            message: '新密码不能为空',
          },
          {
            pattern: /\w{6,20}/,
            message: '6-20位且只包括数字/字母/下划线',
            trigger: 'blur',
          },
        ],
        confirmPwd: [
          {
            required: true,
            message: '确认密码不能为空',
          },
          {
            pattern: /\w{6,20}/,
            message: '6-20位且只包括数字/字母/下划线',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    async savePwd () {
      this.$refs['pwdForm'].validate(async valid => {
        if (valid) {
          const res = await $api.savePwd({
            newPwd: this.formModel.newPwd,
            oldPwd: this.formModel.oldPwd,
            pwd: this.formModel.confirmPwd,
          })
          console.log(res)
          if (res.code === 200) {
            this.$Message.success('更新成功')
          } else {
            this.$Message.error(res.message)
          }
        }
      })

    },
  },
}
</script>

<style lang="scss" scoped>
.pwd-setting {
  padding-top: 50px;
  margin: 0 auto;
  width: 600px;
}
</style>