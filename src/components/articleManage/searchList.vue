<template>
  <div class="_search_list">
    <el-card class="box-card">
      <!-- table start -->
      <el-table
      :data="tableData.list"
      max-height="500"
      style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="标签">
                <span>{{ props.row.tags }}</span>
              </el-form-item>
              <el-form-item label="关键字">
                <span>{{ props.row.keywords }}</span>
              </el-form-item>
              <el-form-item label="描述">
                <span>{{ props.row.description }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          min-width = "200px"
          label="文章标题"
          prop="blog_title">
        </el-table-column>
        <el-table-column
          min-width = "100px"
          label="发布日期"
          prop="create_time">
          <template slot-scope="props">
            <span>{{ formatDate(new Date(props.row.create_time)) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="分类"
          prop="categoryInfo.name">
        </el-table-column>
        <el-table-column
          label="公开"
          prop="open">
          <template slot-scope="props">
            <span>{{ props.row.open ? '公开' : '私密' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status">
          <template slot-scope="props">
            <span>{{ props.row.status ? '已发布' : '草稿' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width = "280px"
          label="操作">
        <template slot-scope="scope">
          <el-button @click="editPage(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="deletePage(scope.row)" type="danger" size="small">删除</el-button>
          <el-button @click="setPublishStatus(scope.row)" type="info" size="small"><span>{{ scope.row.open ? '私密' : '公开' }}</span></el-button>
          <el-button @click="setEditStatus(scope.row)" type="info" size="small"><span>{{ scope.row.status ? '草稿' : '已发布' }}</span></el-button>
        </template>
        </el-table-column>
      </el-table>
      <!-- table end -->

      <!-- pagination start -->
      <el-pagination
        class="list-pagination"
        @current-change="handleCurrentChange"
        :current-page.sync="tableData.pageIndex"
        :page-size="tableData.pageSize"
        layout="total, prev, pager, next"
        :total="tableData.total">
      </el-pagination>
      <!-- pagination end -->
    </el-card>
  </div>
</template>

<script>
import utils from '@/utils'
import api from '@/api'
export default {
  data () {
    return {
    }
  },
  props: ['tableData'],
  methods: {
    editPage (row) {
      this.$router.push({
        name: 'ArticlePublish',
        query: {
          id: row.id
        }
      })
    },
    deletePage (row) {
      this.$confirm(`是否确认删除文章-${row.blog_title}？`, `提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteArticle(row.id).then(res => {
          if (res.code === 200 && res.success) {
            this.$message.success(res.message)
            this.refreshList(this.tableData.pageIndex)
          } else {
            this.$message.error(res.message)
          }
        }).catch(err => this.$message.error(err.response.data.message))
      })
    },
    setPublishStatus (row) {
      api.updateArticle({
        id: row.id,
        open: row.open ? 0 : 1
      }).then(res => {
        if (res.code === 200 && res.success) {
          this.$message.success(res.message)
          this.refreshList(this.tableData.pageIndex)
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => this.$message.error(err.response.data.message))
    },
    setEditStatus (row) {
      api.updateArticle({
        id: row.id,
        open: row.status ? 0 : 1
      }).then(res => {
        if (res.code === 200 && res.success) {
          this.$message.success(res.message)
          this.refreshList(this.tableData.pageIndex)
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => this.$message.error(err.response.data.message))
    },
    handleCurrentChange (pageIndex) {
      this.refreshList(pageIndex)
    },
    formatDate (str) {
      return utils.formatDate(str)
    },
    refreshList (pageIndex) {
      this.$eventhub.$emit('doArticleSearch', pageIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

._search_list{
  .box-card{
    width: 98%;
    font-size: $fs-14;
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
    .list-pagination{
      padding-top: 30px;
      text-align: center;
    }
  }
}
</style>
