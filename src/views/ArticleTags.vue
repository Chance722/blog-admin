<template>
  <section class="article_tags">
    <el-card class="box-card">
      <div class="top-panel">
        <span class="left"><el-button size="medium" @click="newTags()">新增标签</el-button></span>
        <span class="right">
          <el-select size="medium" v-model="typeIndex" @change="listTags()">
            <el-option
              v-for="item in types"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-input @blur="listTags()" suffix-icon="el-icon-search" class="box-search-input" v-model="tagName" size="medium" placeholder="标签名称"></el-input>
        </span>
      </div>
      <tags-list :typeIndex="typeIndex" :tableData="tableData"></tags-list>
    </el-card>
  </section>
</template>

<script>
import api from '@/api'
import tagsList from '@/components/properties/tagsList'
import { mapMutations } from 'vuex'
export default {
  components: {
    tagsList
  },
  data () {
    return {
      pageSize: 10,
      pageIndex: 1,
      total: 0,
      tagName: '',
      list: [],
      typeIndex: 1,
      types: [
        {
          id: 1,
          name: '文章标签'
        },
        {
          id: 2,
          name: '相册标签'
        }
      ]
    }
  },
  computed: {
    tableData () {
      return {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        list: this.list,
        total: this.total
      }
    }
  },
  methods: {
    ...mapMutations([
      'setAllTags'
    ]),
    newTags () {
      this.list.push({
        name: '',
        desc: '',
        thumb: '',
        article: 0,
        edit: true
      })
    },
    listTags () {
      api.listTags({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        tagName: this.tagName,
        type: this.typeIndex
      }).then(res => {
        if (res.code === 200 && res.success) {
          if (res.data.list && res.data.list.length) {
            this.total = res.data.total
            this.list = res.data.list
          } else {
            this.list = []
          }
        }
      }).catch(err => {
        this.$message.error(err.response.data.message)
      })
    },
    resetAllTags () {
      api.listAllTags().then(res => {
        if (res.code === 200 && res.success) {
          this.setAllTags(res.data.list)
        }
      })
    }
  },
  created () {
    this.listTags()
    this.$eventhub.$on('listTags', data => {
      this.pageIndex = data.pageIndex
      this.listTags()
      if (data.isReset) this.resetAllTags()
    })
  },
  destroyed () {
    this.$eventhub.$off('listTags')
  }
}

</script>
<style lang='scss' scoped>
@import '@/assets/css/variables.scss';

.article_tags{
  .box-card{
    width: 98%;
    font-size: $fs-14;
    margin-bottom: 30px;

    .top-panel{
      padding-bottom: 50px;
      span{
        display: inline-block;
        vertical-align: middle;
      }
      span.left{
        float: left;
      }
      span.right{
        float: right;
        .box-search-input{
          width: 300px;
        }
      }
    }
  }
}
</style>
