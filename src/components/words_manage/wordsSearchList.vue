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
              <el-form-item
                label="分类">
                <span>{{ props.row.post_id ? '文章评论' : '留言墙' }}</span>
              </el-form-item>
              <el-form-item
                label="状态">
                <span>{{ props.row.state ? '通过' : '不通过' }}</span>
              </el-form-item>
              <el-form-item label="被点赞：">
                <span>{{ props.row.likes }}</span>
              </el-form-item>
              <el-form-item label="浏览器版本：">
                <span v-html="UAParse(props.row.agent)"></span>
              </el-form-item>
              <el-form-item label="操作系统：">
                <span v-html="OSParse(props.row.agent)"></span>
              </el-form-item>
              <el-form-item label="国家：">
                <span>{{ props.row.region }}</span>
              </el-form-item>
              <el-form-item label="地区：">
                <span>{{ props.row.region }}</span>
              </el-form-item>
              <el-form-item v-if="props.row.post_id" label="文章链接:">
                <span>http://chance722.com/article/{{ props.row.post_id }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="用户"
          prop="user.name">
        </el-table-column>
        <el-table-column
          label="邮箱"
          min-width = "200px"
          prop="user.email">
        </el-table-column>
        <el-table-column
          min-width = "200px"
          label="留言内容"
          prop="content">
        </el-table-column>
        <el-table-column
          min-width = "150px"
          label="发布日期"
          prop="create_time">
          <template slot-scope="props">
            <span>{{ formatDate(new Date(props.row.create_time)) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          min-width = "180px"
          label="操作">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.state" @click="setState(scope.row.id, 1)" type="primary" size="small">恢复</el-button>
          <el-button v-if="scope.row.state" @click="setState(scope.row.id, 0)" type="danger" size="small">删除</el-button>
          <el-button v-if="scope.row.user.status" @click="setUserStatus(scope.row)" size="small">禁言</el-button>
          <el-button v-else @click="setUserStatus(scope.row)" type="primary" size="small">解除禁言</el-button>
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
import { UAParse, OSParse } from '@/utils/ua'
import api from '@/api'

export default {
  data () {
    return {
    }
  },
  props: ['tableData'],
  methods: {
    UAParse (agent) {
      return UAParse(agent)
    },
    OSParse (agent) {
      return OSParse(agent)
    },
    setState (id, state) {
      api.setState({ id, state }).then(res => {
        if (res.code === 200 && res.success) {
          this.$message.success(res.message)
          this.refreshList(this.tableData.pageIndex)
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => this.$message.error(err.message))
    },
    setUserStatus (row) {
      console.log(row)
      api.setUserStatus({
        id: row.user.id,
        status: Math.abs(row.user.status - 1)
      }).then(res => {
        console.log(res)
      })
    },
    handleCurrentChange (pageIndex) {
      this.refreshList(pageIndex)
    },
    formatDate (str) {
      return utils.formatDate(str)
    },
    refreshList (pageIndex) {
      this.$eventhub.$emit('doCommentSearch', pageIndex)
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
