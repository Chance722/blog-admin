<template>
  <section class="album_manage">
    <search-panel></search-panel>
    <search-list :tableData="tableData"></search-list>
  </section>
</template>

<script>
import searchPanel from '@/components/albumManage/searchPanel'
import searchList from '@/components/albumManage/searchList'
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

    // api.addPicture({
    //   url: 'http://pjpumy8at.bkt.clouddn.com/14742160465531545236321302.jpg',
    //   content: 'Nothing to say but pei.',
    //   type: 1,
    //   state: 1,
    //   address: 'GZ',
    //   weather: 1
    // })
  }
}
</script>

<style lang="scss" scoped>
</style>
