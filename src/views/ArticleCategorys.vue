<template>
  <section class="article_categorys">
    <el-card class="box-card">
      <div class="top-panel">
        <span class="left"><el-button size="medium" @click="newTypes()">新增分类</el-button></span>
        <span class="right">
          <el-select size="medium" v-model="typeIndex" @change="listTypes()">
            <el-option
              v-for="item in types"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-input @blur="listTypes()" suffix-icon="el-icon-search" class="box-search-input" v-model="typeName" size="medium" placeholder="分类名称"></el-input>
        </span>
      </div>
      <category-list :typeIndex="typeIndex" :tableData="tableData"></category-list>
    </el-card>
  </section>
</template>

<script>
import api from '@/api'
import categoryList from '@/components/properties/categoryList'
import { mapMutations } from 'vuex'
export default {
  components: {
    categoryList
  },
  data () {
    return {
      pageSize: 10,
      pageIndex: 1,
      total: 0,
      typeName: '',
      list: [],
      typeIndex: 1,
      types: [
        {
          id: 1,
          name: '文章分类'
        },
        {
          id: 2,
          name: '相册分类'
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
  created () {
    this.listTypes()
    this.$eventhub.$on('listTypes', data => {
      this.pageIndex = data.pageIndex
      this.listTypes()
      if (data.isReset) this.resetAllTypes()
    })
  },
  destroyed () {
    this.$eventhub.$off('listTypes')
  },
  methods: {
    ...mapMutations([
      'setAllCategorys'
    ]),
    newTypes () {
      this.list.push({
        name: '',
        desc: '',
        article: 0,
        edit: true
      })
    },
    listTypes () {
      api.listTypes({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        typeName: this.typeName,
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
        console.warn(err)
      })
    },
    resetAllTypes () {
      api.listAllTypes().then(res => {
        if (res.code === 200 && res.success) {
          this.setAllCategorys(res.data.list)
        }
      })
    }
  }
}

</script>
<style lang='scss' scoped>
@import '@/assets/css/variables.scss';

.article_categorys{
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
