<template>
  <section class="article_publish">
    <el-card class="box-card">
      <div class="box-item">
        <label class="item-title">文章标题</label>
        <el-input v-model="articleValues.blogTitle" class="box-item-input" size="medium"></el-input>
      </div>
      <div class="box-item">
        <label class="item-title">关键字</label>
        <el-input  v-model="articleValues.keywords" class="box-item-input" size="medium"></el-input>
      </div>
      <div class="box-item">
        <label class="item-title">标签</label>
        <!-- <template v-for="(item,index) in tags">
          <el-tag size="medium" :key="index" @click.native="clickTagsHandler(item.id)" :class="{'active': isTagSelected(item.id)}" type="info">{{item.name}}</el-tag>
        </template> -->
        <el-select v-model="articleValues.tags" multiple placeholder="请选择">
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
        <el-select v-model="articleValues.category" placeholder="请选择">
          <el-option
            v-for="item in categorys"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="box-item">
        <label class="item-title">状态</label>
        <el-radio v-model="articleValues.status" :label="1">发布</el-radio>
        <el-radio v-model="articleValues.status" :label="2">草稿</el-radio>
      </div>
      <div class="box-item">
        <label class="item-title">公开</label>
        <el-radio v-model="articleValues.open" :label="1">公开</el-radio>
        <el-radio v-model="articleValues.open" :label="2">私密</el-radio>
      </div>
      <div class="box-item">
        <label class="item-title">缩略图</label>
        <div class="upload-container">
          <el-upload
            class="avatar-uploader"
            action="https://upload.qiniup.com/"
            :before-upload="beforeUpload"
            :on-progress="handleProgress"
            :on-success="handleSuccess"
            :data="qiniu"
            :show-file-list="false">
            <img v-if="articleValues.thumb" :src="articleValues.thumb" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-progress :percentage="percent" v-if="percent !== 0 && percent !== 100"></el-progress>
        </div>
      </div>
      <div class="box-item">
        <label class="item-title">文章内容</label>
        <div class="editor-container">
          <mavon-editor ref="md" @imgAdd="addEditorImage" v-model="articleValues.content"/>
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
      tags: [],
      categorys: [],
      articleValues: {
        blogTitle: '',
        keywords: '',
        tags: [],
        open: 1,
        status: 1,
        category: '',
        content: '',
        thumb: ''
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
    this.totalTags.length ? this.tags = this.totalTags.filter(item => item.type === 1) : this.listAllTags()
    this.totalCategorys.length ? this.categorys = this.totalCategorys.filter(item => item.type === 1) : this.listAllTypes()
    this.getUploadToken()
    if (this.editId) this.initArticle()
  },
  methods: {
    ...mapMutations([
      'setAllCategorys',
      'setAllTags'
    ]),
    listAllTags () {
      api.listAllTags().then(res => {
        if (res.code === 200 && res.success) {
          this.tags = res.data.list.filter(item => item.type === 1)
          this.setAllTags(this.tags)
        }
      })
    },
    listAllTypes () {
      api.listAllTypes().then(res => {
        if (res.code === 200 && res.success) {
          this.categorys = res.data.list.filter(item => item.type === 1)
          this.setAllCategorys(this.types)
        }
      })
    },
    clickTagsHandler (id) {
      let tagIndex = this.articleValues.tags.indexOf(id)
      if (tagIndex === -1) {
        this.articleValues.tags.push(id)
      } else {
        this.articleValues.tags.splice(tagIndex, 1)
      }
    },
    isTagSelected (index) {
      return this.articleValues.tags.includes(index)
    },
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
      this.articleValues.thumb = QINIU_DOMAIN + this.qiniu.key
    },
    getUploadToken () {
      api.getToken().then(res => {
        if (res.code === 200 && res.success) {
          this.qiniu.token = res.data.token
        }
      })
    },
    onSubmit () {
      if (utils.isParamsEmpty(this.articleValues.blogTitle, this.articleValues.content)) {
        this.$message.error('标题跟内容不能为空')
        return false
      }
      if (utils.isParamsEmpty(this.articleValues.category)) {
        this.$message.error('请选择文章分类')
        return false
      }
      if (this.editId) {
        this.articleValues = Object.assign(this.articleValues, {
          id: this.editId
        })
        this.updateArticle()
      } else {
        this.addArticle()
      }
    },
    addArticle () {
      api.addArticle(this.articleValues).then(res => {
        if (res.code === 200 && res.success) {
          this.$message.success(res.message)
          this.$router.push({
            name: 'ArticleList'
          })
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => this.$message.error(err.message))
    },
    updateArticle () {
      api.updateArticle(this.articleValues).then(res => {
        if (res.code === 200 && res.success) {
          this.$message.success(res.message)
          this.$router.push({
            name: 'ArticleList'
          })
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => this.$message.error(err.message))
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
    initArticle () {
      api.getArticle(this.editId).then(res => {
        if (res.code === 200 && res.success) {
          this.articleValues.blogTitle = res.data.blog_title
          this.articleValues.keywords = res.data.keywords
          this.articleValues.tags = res.data.tags.split(',').map(tag => parseInt(tag))
          this.articleValues.category = res.data.category
          this.articleValues.open = res.data.open
          this.articleValues.status = res.data.status
          this.articleValues.content = res.data.content
          this.articleValues.thumb = res.data.thumb
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.article_publish{
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

    }
    .mt-30{
      margin-top: 30px;
    }
  }
}
</style>
