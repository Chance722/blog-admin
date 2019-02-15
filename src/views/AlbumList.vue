<template>
  <section class="album_manage">
    <album-search-panel></album-search-panel>
    <album-search-list :tableData="tableData"></album-search-list>
  </section>
</template>

<script>
import albumSearchPanel from '@/components/album_manage/albumSearchPanel'
import albumSearchList from '@/components/album_manage/albumSearchList'
import api from '@/api'
export default {
  components: {
    albumSearchPanel,
    albumSearchList
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
    listPictures (data) {
      const params = Object.assign({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }, data)
      api.listPictures(params).then(res => {
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
    this.listPictures({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      state: 1
    })
    this.$eventhub.$on('listPictures', data => this.listPictures(data))

    // api.leaveComment({
    //   postId: 0,
    //   pid: 0,
    //   content: 'haha',
    //   authorName: 'chance',
    //   authorEmail: 'handsomelong722@163.com',
    //   homepage: 'https://chance722.me'
    // }).then(res => {
    //   console.log(res)
    // })
  }
}
</script>

<style lang="scss" scoped>
</style>
