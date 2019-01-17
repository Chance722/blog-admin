<template>
  <section class="album_publish">
    <el-card class="box-card">
      <div class="box-item">
        <label class="item-title">图片</label>
        <div class="upload-container">
          <el-upload
            class="avatar-uploader"
            action="https://upload.qiniup.com/"
            :before-upload="beforeUpload"
            :on-progress="handleProgress"
            :on-success="handleSuccess"
            :data="qiniu"
            :show-file-list="false">
            <img v-if="albumValues.url" :src="albumValues.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-progress :percentage="percent" v-if="percent !== 0 && percent !== 100"></el-progress>
        </div>
      </div>
      <div class="box-item">
        <label class="item-title">标签</label>
        <el-select v-model="albumValues.tags" multiple placeholder="请选择">
          <el-option
            v-for="item in tags"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="box-item">
        <label class="item-title">分类</label>
        <el-select v-model="albumValues.type" placeholder="请选择">
          <el-option
            v-for="item in types"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="box-item">
        <label class="item-title">公开</label>
        <el-radio v-model="albumValues.state" :label="1">公开</el-radio>
        <el-radio v-model="albumValues.state" :label="0">私密</el-radio>
      </div>
      <div class="box-item">
        <label class="item-title">地点</label>
        <el-input  v-model="albumValues.address" class="box-item-input" size="medium"></el-input>
      </div>
      <div class="box-item">
        <label class="item-title">天气</label>
        <el-select v-model="albumValues.weather" placeholder="请选择">
          <el-option
            v-for="item in weathers"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="box-item">
        <label class="item-title">字体颜色</label>
        <el-color-picker  v-model="albumValues.color" show-alpha></el-color-picker>
      </div>
      <div class="box-item">
        <label class="item-title">相片描述</label>
        <div class="editor-container">
          <mavon-editor ref="md" @imgAdd="addEditorImage" v-model="albumValues.content"/>
        </div>
      </div>
      <div class="box-item mt-30">
        <el-button size="medium" @click="onSubmit()" type="primary">保存</el-button>
      </div>
    </el-card>
  </section>
</template>

<script>
import Vue from 'vue'
import api from '@/api'
import utils from '@/utils'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { QINIU_DOMAIN } from '@/config/const'
import { mapState, mapMutations } from 'vuex'
Vue.use(mavonEditor)
export default {
  data () {
    return {
      weathers: [
        { id: 1, name: '晴' },
        { id: 2, name: '阴天' },
        { id: 3, name: '雨' }
      ],
      tags: [],
      types: [],
      tagsIndex: [],
      albumValues: {
        tags: [],
        color: null,
        content: '',
        url: '',
        type: '',
        state: 1,
        address: '',
        weather: 1
      },
      percent: 0,
      qiniu: {
        token: '',
        key: ''
      },
      editId: this.$route.query.id,
      editData: null
    }
  },
  computed: {
    ...mapState([
      'totalCategorys',
      'totalTags'
    ])
  },
  created () {
    this.totalTags.length ? this.tags = this.totalTags.filter(item => item.type === 2) : this.listAllTags()
    this.totalCategorys.length ? this.types = this.totalCategorys.filter(item => item.type === 2) : this.listAllTypes()
    this.getUploadToken()
    if (this.editId) this.initPicture()
  },
  watch: {
    types (types) {
      if (types.length) this.albumValues.type = types[0].id
    }
  },
  methods: {
    ...mapMutations([
      'setAllCategorys',
      'setAllTags'
    ]),
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      let fileName = file.name
      if (fileName.length > 10) fileName = fileName.substring(0, 10)
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
      this.albumValues.url = QINIU_DOMAIN + this.qiniu.key
    },
    getUploadToken () {
      api.getToken().then(res => {
        if (res.code === 200 && res.success) {
          this.qiniu.token = res.data.token
        }
      })
    },
    addEditorImage (pos, $file) {
      const isJPG = $file.type === 'image/jpeg'
      const fileName = $file.name.replace(/.png|.jpg|.jpeg/, '') + new Date().getTime()
      this.qiniu.key = isJPG ? fileName + '.jpg' : fileName + '.png'
      const formdata = new FormData()
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      formdata.append('file', $file)
      formdata.append('key', this.qiniu.key)
      formdata.append('token', this.qiniu.token)
      this.axios.post('https://upload.qiniup.com/', formdata, config).then(res => {
        const filePath = QINIU_DOMAIN + res.key
        this.$refs.md.$img2Url(pos, filePath)
      })
    },
    onSubmit () {
      if (utils.isParamsEmpty(this.albumValues.url, this.albumValues.content)) {
        this.$message.error('相片跟描述不能为空')
        return false
      }
      if (this.editId) {
        this.albumValues = Object.assign(this.albumValues, {
          id: this.editId
        })
        this.updatePicture()
      } else {
        this.addPicture()
      }
    },
    addPicture () {
      api.addPicture(this.albumValues).then(res => {
        if (res.code === 200 && res.success) {
          this.$message.success(res.message)
          this.$router.push({
            name: 'AlbumList'
          })
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => this.$message.error(err.message))
    },
    updatePicture () {
      api.updatePicture(this.albumValues).then(res => {
        if (res.code === 200 && res.success) {
          this.$message.success(res.message)
          this.$router.push({
            name: 'AlbumList'
          })
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => this.$message.error(err.message))
    },
    initPicture () {
      api.getPicture(this.editId).then(res => {
        if (res.code === 200 && res.success) {
          this.albumValues = Object.assign({}, {
            address: res.data.address,
            color: res.data.color,
            content: res.data.content,
            state: res.data.state,
            type: res.data.type,
            url: res.data.url,
            weather: res.data.weather
          })
        }
      })
    },
    listAllTags () {
      api.listAllTags().then(res => {
        if (res.code === 200 && res.success) {
          this.tags = res.data.list.filter(item => item.type === 2)
          this.setAllTags(this.tags)
        }
      })
    },
    listAllTypes () {
      api.listAllTypes().then(res => {
        if (res.code === 200 && res.success) {
          this.types = res.data.list.filter(item => item.type === 2)
          this.setAllCategorys(this.types)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.album_publish{
  .box-card{
    width: 98%;
    font-size: $fs-14;
    margin-bottom: 30px;
    .box-item{
      margin-bottom: 15px;
      label.item-title{
        width: 80px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
      }
      .box-item-input{
        width: 300px;
      }
      .el-tag{
        cursor: pointer;
        margin-right: 15px;

        &.active{
          color: $white;
          background-color: $bg-tag-color;
        }
      }
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
      .editor-container{
        padding-top: 15px;
        min-width: 920px;
        width: 90%;
        .markdown-body{
          height: 700px;
          z-index: 2000;
        }
        .fullscreen{
          height: auto;
        }
      }
      .el-color-picker{
        display: inline-block;
        vertical-align: middle;
        margin-left: 50px;
      }
    }
    .mt-30{
      margin-top: 30px;
    }
  }
}
</style>
