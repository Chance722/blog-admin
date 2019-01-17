<template>
  <div class="base-info">
    <div class="box-item">
      <label class="item_name">博客名称</label>
      <el-input class="box-search-input" v-model="blog_title" size="medium" placeholder="博客名称"></el-input>
    </div>
    <div class="box-item">
      <label class="item_name">页面标题</label>
      <el-input class="box-search-input" v-model="page_title" size="medium" placeholder="页面标题"></el-input>
    </div>
    <div class="box-item">
      <label class="item_name">关键词</label>
      <el-input class="box-search-input" v-model="keywords" size="medium" placeholder="关键词"></el-input>
    </div>
    <div class="box-item">
      <label class="item_name">博客地址</label>
      <el-input class="box-search-input" v-model="blog_address" size="medium" placeholder="博客地址"></el-input>
    </div>
    <div class="box-item">
      <label class="item_name">站点描述</label>
      <el-input class="box-search-input" v-model="blog_desc"  type="textarea" :rows="3" size="medium" placeholder="站点描述"></el-input>
    </div>
    <div class="box-item">
      <label class="item_name">电子邮件</label>
      <el-input class="box-search-input" v-model="email" size="medium" placeholder="电子邮件"></el-input>
    </div>
    <div class="box-item">
      <label class="item_name">ICP备案号</label>
      <el-input class="box-search-input" v-model="icp_numbers" size="medium" placeholder="博客地址"></el-input>
    </div>
    <div class="box-item mt-30">
        <el-button size="medium" @click="onSubmit()" type="primary" icon="iconfont icon-baocun"> 保存</el-button>
      </div>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      blog_title: '',
      page_title: '',
      keywords: '',
      blog_address: '',
      blog_desc: '',
      email: '',
      icp_numbers: ''
    }
  },
  props: ['settingInfo'],
  methods: {
    onSubmit () {
      api.saveBaseInfo({
        blogTitle: this.blog_title,
        pageTitle: this.page_title,
        keywords: this.keywords,
        blogAddress: this.blog_address,
        blogDesc: this.blog_desc,
        email: this.email,
        icpNumbers: this.icp_numbers
      }).then(res => {
        if (res.code === 200 && res.success) {
          this.$message.success(res.message)
          this.$eventhub.$emit('getSettingInfo')
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => this.$message.error(err.message))
    }
  },
  watch: {
    settingInfo (info) {
      if (info) {
        this.blog_title = info.blog_title
        this.page_title = info.page_title
        this.keywords = info.keywords
        this.blog_address = info.blog_address
        this.blog_desc = info.blog_desc
        this.email = info.email
        this.icp_numbers = info.icp_numbers
      }
    }
  }
}

</script>
<style lang='scss' scoped>
@import '@/assets/css/variables.scss';

.base-info{
  min-height: 520px;
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
