<template>
  <div class="_search_panel">
    <el-card class="box-card">
      <div class="box-item">
        <label class="search_name">分类</label>
        <el-select v-model="typeIndex" placeholder="请选择">
          <el-option
            v-for="item in types"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="box-item">
        <label class="search_name">状态</label>
        <el-select v-model="statusIndex" placeholder="请选择">
          <el-option
            v-for="item in status"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="box-item mt-30">
         <label class="search_name">搜索</label>
         <el-input class="box-search-input" v-model="keywords" size="medium" placeholder="关键字"></el-input>
         <el-button @click="doSearch()" size="medium" type="primary" icon="el-icon-search">查询</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// import api from '@/api'
export default {
  data () {
    return {
      types: [
        { id: 2, name: '全部' },
        { id: 0, name: '留言墙' },
        { id: 1, name: '文章评论' }
      ],
      status: [
        { id: 0, name: '不通过' },
        { id: 1, name: '通过' }
      ],
      typeIndex: 2,
      statusIndex: 1,
      keywords: ''
    }
  },
  methods: {
    doSearch (pageIndex) {
      let params = {
        type: this.typeIndex,
        state: this.statusIndex
      }
      if (pageIndex) params = Object.assign(params, { pageIndex })
      this.$eventhub.$emit('listComments', params)
    }
  },
  created () {
    this.$eventhub.$on('doCommentSearch', pageIndex => {
      this.doSearch(pageIndex)
    })
  },
  destroyed () {
    this.$eventhub.$off('doCommentSearch')
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
