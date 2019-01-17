<template>
  <div class="user-info">
    <div class="box-item">
      <label class="item_name">头像</label>
      <div class="upload-container">
        <el-upload
            class="avatar-uploader"
            action="https://upload.qiniup.com/"
            :before-upload="beforeUpload"
            :on-progress="handleProgress"
            :on-success="handleSuccess"
            :data="qiniu"
            :show-file-list="false">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
    <div class="box-item">
      <label class="item_name">昵称</label>
      <el-input class="box-search-input" size="medium" v-model="nickname" placeholder="昵称"></el-input>
    </div>
    <div class="box-item">
      <label class="item_name">姓名</label>
      <el-input class="box-search-input" size="medium" v-model="name" placeholder="姓名"></el-input>
    </div>
    <div class="box-item">
      <label class="item_name">个性签名</label>
      <el-input class="box-search-input" size="medium" v-model="signature" placeholder="个性签名"></el-input>
    </div>
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
import { QINIU_DOMAIN } from '@/config/const'
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      name: '',
      nickname: '',
      signature: '',
      old_pwd: '',
      new_pwd: '',
      pwd: '',
      imageUrl: '',
      percent: 0,
      qiniu: {
        token: '',
        key: ''
      }
    }
  },
  props: ['settingInfo'],
  computed: {
    ...mapState([
      'uploadToken'
    ])
  },
  watch: {
    settingInfo (info) {
      if (info) {
        this.name = info.name
        this.nickname = info.nickname
        this.signature = info.signature
        this.imageUrl = info.avator
      }
    }
  },
  methods: {
    ...mapMutations([
      'setUserData'
    ]),
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      let fileName = file.name
      if (fileName.length > 10) {
        fileName = fileName.substring(0, 10)
      }
      fileName = fileName.replace(/.png|.jpg|.jpeg/, '') + new Date().getTime()
      this.qiniu.key = isJPG ? fileName + '.jpg' : fileName + '.png'
      const isJPNG = isJPG || isPNG
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isJPNG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return isJPNG && isLt10M
    },
    handleProgress (e) {
      this.percent = Math.floor(e.percent)
    },
    handleSuccess () {
      this.imageUrl = QINIU_DOMAIN + this.qiniu.key
    },
    onSubmit () {
      if (utils.isParamsEmpty(
        this.name,
        this.nickname,
        this.signature,
        this.old_pwd,
        this.new_pwd,
        this.pwd,
        this.imageUrl)) {
        this.$message.error('参数不能为空')
        return false
      }
      if (this.new_pwd !== this.pwd) {
        this.$message.error('两次密码不一致')
        return false
      }
      api.saveUserInfo({
        name: this.name,
        nickname: this.nickname,
        signature: this.signature,
        oldPwd: this.old_pwd,
        newPwd: this.new_pwd,
        pwd: this.pwd,
        imageUrl: this.imageUrl
      }).then(res => {
        if (res.code === 200 && res.success) {
          this.$message.success(res.message)
          this.$eventhub.$emit('getSettingInfo')
          this.setUserData(res.data)
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => this.$message.error(err.message))
    },
    getUploadToken () {
      if (this.uploadToken) {
        this.qiniu.token = this.uploadToken
        return
      }
      api.getToken().then(res => {
        if (res.code === 200 && res.success) {
          this.qiniu.token = res.data.token
        }
      })
    }
  },
  created () {
    this.getUploadToken()
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

    .upload-container{
      display: inline-block;
      vertical-align: middle;
      position: relative;
        .avatar-uploader{
          text-align: center;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader-icon:hover {
          border-color: #409EFF!important;
          &::before{
            color: #409EFF!important;
          }
        }
        .avatar-uploader-icon {
          border: 1px dashed #d9d9d9!important;
          border-radius: 6px!important;
          font-size: 28px;
          color: #8c939d;
          width: 150px;
          height: 150px;
          line-height: 150px;
          text-align: center;
        }
        .avatar {
          width: 150px;
          height: 150px;
          display: block;
        }
    }

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
