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
        <el-select v-model="stateIndex" placeholder="请选择">
          <el-option
            v-for="item in state"
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
import api from '@/api'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      tags: [],
      types: [],
      state: [
        { id: 0, name: '私密' },
        { id: 1, name: '公开' }
      ],
      typeIndex: '',
      stateIndex: 1,
      keywords: '',
      tagsIndex: []
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
    this.$eventhub.$on('doPictureSearch', pageIndex => {
      this.doSearch(pageIndex)
    })
  },
  destroyed () {
    this.$eventhub.$off('doPictureSearch')
  },
  methods: {
    ...mapMutations([
      'setAllCategorys',
      'setAllTags'
    ]),
    doSearch (pageIndex) {
      let params = {
        type: this.typeIndex,
        tags: this.tagsIndex,
        state: this.stateIndex
      }
      if (pageIndex) params = Object.assign(params, { pageIndex })
      this.$eventhub.$emit('listPictures', params)
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
