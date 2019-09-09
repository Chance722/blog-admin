<template>
  <div class="pwd-setting">
    <Form :model="formModel" :label-width="120">
      <FormItem label="原密码" prop="oldPwd">
        <Input type="password" v-model="formModel.oldpwd" class="w300"></Input>
      </FormItem>
      <FormItem label="新密码" prop="newPwd">
        <Input type="password" v-model="formModel.oldpwd" class="w300"></Input>
      </FormItem>
      <FormItem label="确认密码" prop="confirmPwd">
        <Input type="password" v-model="formModel.oldpwd" class="w300"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" class="w100">保存</Button>
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
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pwd-setting {
  padding-top: 50px;
  margin: 0 auto;
  width: 600px;
}
</style>