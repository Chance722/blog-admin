<template>
  <div class="user-info">
    <div class="box-item">
      <label class="item_name">原密码</label>
      <el-input type="password" class="box-search-input" size="medium" v-model="old_pwd" placeholder="原密码"></el-input>
    </div>
    <div class="box-item">
      <label class="item_name">新密码</label>
      <el-input type="password" class="box-search-input" size="medium" v-model="new_pwd" placeholder="新密码"></el-input>
    </div>
    <div class="box-item">
      <label class="item_name">确认密码</label>
      <el-input type="password" class="box-search-input" size="medium" v-model="pwd" placeholder="确认密码"></el-input>
    </div>
    <div class="box-item mt-30">
        <el-button size="medium" @click="onSubmit()" type="primary" icon="iconfont icon-baocun"> 保存</el-button>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import utils from '@/utils'
export default {
  data () {
    return {
      old_pwd: '',
      new_pwd: '',
      pwd: ''
    }
  },
  methods: {
    onSubmit () {
      if (utils.isParamsEmpty(
        this.old_pwd,
        this.new_pwd,
        this.pwd)) {
        this.$message.error('参数不能为空')
        return false
      }
      if (this.new_pwd !== this.pwd) {
        this.$message.error('两次密码不一致')
        return false
      }
      api.saveUserPwd({
        oldPwd: this.old_pwd,
        newPwd: this.new_pwd,
        pwd: this.pwd
      }).then(res => {
        if (res.code === 200 && res.success) {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => {
        this.$message.error(err.response.data.message)
      })
    }
  }
}

</script>
<style lang='scss' scoped>
@import '@/assets/css/variables.scss';

.user-info{
  padding: 10px;
  .box-item{
    margin-bottom: 15px;
    padding-bottom: 15px;

    label.item_name{
      display: inline-block;
      vertical-align: middle;
      width: 80px;
    }
    .box-search-input{
      width: 300px;
      margin-right: 50px;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .mt-30{
    margin-top: 30px;
  }
}
</style>
