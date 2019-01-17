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
                <span>{{ props.row.type}}</span>
              </el-form-item>
              <el-form-item
                label="状态">
                <span>{{ props.row.state}}</span>
              </el-form-item>
              <el-form-item label="被点赞：">
                <span>{{ props.row.likes }}次</span>
              </el-form-item>
              <el-form-item label="被浏览：">
                <span>{{ props.row.views }}次</span>
              </el-form-item>
              <el-form-item label="天气：">
                <span>{{ props.row.weather }}</span>
              </el-form-item>
              <el-form-item label="地址：">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="字体颜色：">
                <span class="ft-color" :style="{'background-color': props.row.color }"></span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          min-width = "200px"
          label="图片描述"
          prop="content">
          <template slot-scope="props">
            <vue-markdown>{{props.row.content}}</vue-markdown>
          </template>
        </el-table-column>
        <el-table-column
          min-width = "200px"
          label="图片预览"
          prop="content">
          <template slot-scope="props">
            <span class="pic-container"><img :src="props.row.url"></span>
          </template>
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
          min-width = "150px"
          label="操作">
        <template slot-scope="scope">
          <el-button @click="editPicture(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="deletePicture(scope.row)" type="danger" size="small">删除</el-button>
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
import VueMarkdown from 'vue-markdown'
export default {
  props: ['tableData'],
  components: {
    VueMarkdown
  },
  data () {
    return {

    }
  },
  methods: {
    handleCurrentChange (pageIndex) {
      this.refreshList(pageIndex)
    },
    editPicture (row) {
      this.$router.push({
        name: 'AlbumPublish',
        query: {
          id: row.id
        }
      })
    },
    deletePicture (row) {
      this.$confirm(`是否确认删除相片？`, `提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deletePicture(row.id).then(res => {
          if (res.code === 200 && res.success) {
            this.$message.success(res.message)
            this.refreshList(this.tableData.pageIndex)
          } else {
            this.$message.error(res.message)
          }
        }).catch(err => this.$message.error(err.message))
      })
    },
    formatDate (str) {
      return utils.formatDate(str)
    },
    refreshList (pageIndex) {
      this.$eventhub.$emit('doPictureSearch', pageIndex)
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

      .ft-color{
        width: 25px;
        height: 25px;
        border-radius: 2px;
        display: inline-block;
        vertical-align: middle;
      }
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
    .el-table__body .pic-container{
      width: 100px;
      height: 100px;
      display: inline-block;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
