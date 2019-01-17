<template>
  <div class="_search_panel">
    <el-card class="box-card">
      <div class="box-item">
        <label class="search_name">标签</label>
        <el-select v-model="tagsIndex" multiple placeholder="请选择">
          <el-option
            v-for="item in tags"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="box-item">
        <label class="search_name">分类</label>
          <el-tag size="medium" @click.native="clickTagsHandler()" :class="{'active': isTagSelected()}" type="info">全部</el-tag>
          <template v-for="(item,index) in category">
          <el-tag size="medium" :key="index" @click.native="clickTagsHandler(item.id)" :class="{'active': isTagSelected(item.id)}"  type="info">{{item.name}}</el-tag>
        </template>
      </div>
      <div class="box-item">
        <label class="search_name">公开</label>
          <template v-for="(item,index) in open">
          <el-tag size="medium" :key="index" @click.native="activeOpenIndex = item.id" :class="{'active': activeOpenIndex === item.id}" type="info">{{item.name}}</el-tag>
        </template>
      </div>
      <div class="box-item">
        <label class="search_name">状态</label>
          <template v-for="(item,index) in status">
          <el-tag size="medium" :key="index" @click.native="activeStatusIndex = item.id" :class="{'active': activeStatusIndex === item.id}" type="info">{{item.name}}</el-tag>
        </template>
      </div>
      <div class="box-item mt-30">
         <label class="search_name">搜索</label>
         <el-input class="box-search-input" v-model="blogTitle" size="medium" placeholder="标题,描述"></el-input>
         <el-button @click="doSearch()" size="medium" type="primary" icon="el-icon-search">查询</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import api from '@/api'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      tags: [],
      category: [],
      open: [
        {id: 0, name: '私密'},
        {id: 1, name: '公开'}
      ],
      status: [
        {id: 0, name: '草稿'},
        {id: 1, name: '已发布'}
      ],
      tagsIndex: [],
      categorysIndex: [],
      activeOpenIndex: 1,
      activeStatusIndex: 1,
      blogTitle: ''
    }
  },
  computed: {
    ...mapState([
      'totalCategorys',
      'totalTags'
    ])
  },
  created () {
    this.totalCategorys.length ? this.category = this.totalCategorys.filter(item => item.type === 1) : this.listAllTypes()
    this.totalTags.length ? this.tags = this.totalTags.filter(item => item.type === 1) : this.listAllTags()
    this.$eventhub.$on('doArticleSearch', pageIndex => {
      this.doSearch(pageIndex)
    })
  },
  destroyed () {
    this.$eventhub.$off('doArticleSearch')
  },
  methods: {
    ...mapMutations([
      'setAllCategorys',
      'setAllTags'
    ]),
    clickTagsHandler (id) {
      if (!id) {
        this.categorysIndex = []
        return
      }
      let tagIndex = this.categorysIndex.indexOf(id)
      if (tagIndex === -1) {
        this.categorysIndex.push(id)
      } else {
        this.categorysIndex.splice(tagIndex, 1)
      }
    },
    isTagSelected (index) {
      if (index) {
        return this.categorysIndex.includes(index)
      } else if (this.categorysIndex.length === 0) {
        return true
      }
    },
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
          this.category = res.data.list.filter(item => item.type === 1)
          this.setAllCategorys(this.category)
        }
      })
    },
    doSearch (pageIndex) {
      let params = {
        tags: this.tagsIndex,
        category: this.categorysIndex,
        open: this.activeOpenIndex,
        status: this.activeStatusIndex,
        blogTitle: this.blogTitle
      }
      if (pageIndex) params = Object.assign(params, { pageIndex })
      this.$eventhub.$emit('listArticles', params)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
._search_panel{
  margin-bottom: 10px;
  .box-card{
    width: 98%;
    font-size: $fs-14;
    margin-bottom: 30px;

    .box-item{
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px dashed #e7e7e7;
      label.search_name{
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
      }
      .el-tag{
        margin-left: 15px;
        cursor: pointer;

        &.active{
          color: $white;
          background-color: $bg-tag-color;
        }
      }
      .box-search-input{
        width: 300px;
        margin-right: 50px;
      }
    }
    .box-item:last-child{
      border-bottom: none;
    }
    .mt-30{
      margin-top: 30px;
    }
  }

}
</style>
