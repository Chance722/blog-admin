<template>
  <section class="article_list">
    <search-panel></search-panel>
    <search-list :tableData="tableData"></search-list>
  </section>
</template>

<script>
import searchPanel from '@/components/article_manage/searchPanel'
import searchList from '@/components/article_manage/searchList'
import api from '@/api'
export default {
  components: {
    searchPanel,
    searchList
  },
  data () {
    return {
      pageIndex: 1,
      pageSize: 10,
      list: [],
      total: 0
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
    listArticles (data) {
      const params = Object.assign({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }, data)
      api.listArticles(params).then(res => {
        if (res.data && res.data.list) {
          this.total = res.data.total
          this.list = res.data.list
        } else {
          this.list = []
        }
      }).catch(err => this.$message.error(err.message))
    }
  },
  created () {
    this.listArticles({
      tags: [],
      category: [],
      open: 1,
      status: 1,
      blogTitle: ''
    })
    this.$eventhub.$on('listArticles', data => this.listArticles(data))
  }
}
</script>

<style lang="scss" scoped>
</style>
