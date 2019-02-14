<template>
  <div class="_category_list">
    <!-- table start -->
    <el-table
      stripe
      :data="tableData.list"
      min-height="500"
      style="width: 100%">
        <el-table-column
          label="名称"
          prop="name">
          <template slot-scope="scope">
            <template v-if="scope.row.edit || editId === scope.row.id">
              <el-input class="box-search-input" v-model="scope.row.name" size="medium" ></el-input>
            </template>
            <template v-else>
              <i class="iconfont icon-fenlei"></i>
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          min-width = "300px"
          label="描述"
          prop="description">
          <template slot-scope="scope">
            <template v-if="scope.row.edit || editId === scope.row.id">
              <el-input class="box-search-input" v-model="scope.row.description" size="medium"></el-input>
            </template>
            <template v-else>
              <i class="iconfont icon-miaoshu"></i>
              <span style="margin-left: 10px">{{ scope.row.description }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="缩略图"
          prop="thumb">
          <template slot-scope="scope">
            <template v-if="scope.row.edit || editId === scope.row.id">
              <el-upload
                  class="avatar-uploader"
                  action="https://upload.qiniup.com/"
                  :before-upload="beforeUpload"
                  :on-progress="handleProgress"
                  :on-success="handleSuccess"
                  :data="qiniu"
                  :show-file-list="false">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </template>
            <template v-else>
              <img v-show="scope.row.thumb" :src="scope.row.thumb" class="avatar">
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="文章"
          prop="article_nums">
        </el-table-column>
        <el-table-column
         min-width = "100px"
          label="操作">
          <template slot-scope="scope">
            <template v-if="scope.row.edit || editId === scope.row.id">
              <el-button @click="saveType(scope.row)" type="primary" size="small">保存</el-button>
              <el-button @click="cancelEdit()" size="small">取消</el-button>
            </template>
            <template v-else>
              <el-button @click="editType(scope.row)" type="warning" size="small">编辑</el-button>
              <el-button @click="deleteType(scope.row)" type="danger" size="small">删除</el-button>
            </template>
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
  </div>
</template>

<script>
import api from '@/api'
import utils from '@/utils'
import { QINIU_DOMAIN } from '@/config/const'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      editId: null,
      imageUrl: '',
      percent: 0,
      qiniu: {
        token: '',
        key: ''
      }
    }
  },
  props: ['tableData', 'typeIndex'],
  computed: {
    ...mapState([
      'uploadToken'
    ])
  },
  methods: {
    handleCurrentChange (pageIndex) {
      this.refreshList(pageIndex)
    },
    editType (row) {
      this.editId = row.id
    },
    cancelEdit () {
      if (this.editId) {
        this.editId = null
      } else {
        this.tableData.list.splice(this.tableData.list.length - 1, 1)
      }
    },
    deleteType (row) {
      this.$confirm(`是否确认删除分类-${row.name}？`, `提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteType(row.id).then(res => {
          if (res.code === 200 && res.success) {
            this.$message.success(res.message)
            this.refreshList(this.tableData.pageIndex)
          } else {
            this.$message.error(res.message)
          }
        }).catch(err => this.$message.error(err.response.data.message))
      })
    },
    saveType (row) {
      if (utils.isParamsEmpty(row.name, row.description)) {
        this.$message.error('分类名称和描述不能为空')
        return false
      } else if (row.id) {
        this.updateType(row)
      } else {
        this.addType(row)
      }
    },
    addType (row) {
      api.addType({
        name: row.name,
        description: row.description,
        thumb: this.imageUrl,
        type: this.typeIndex
      }).then(res => {
        if (res.code === 200 && res.success) {
          this.imageUrl = ''
          this.$message.success(res.message)
          this.refreshList(this.tableData.pageIndex, true)
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => this.$message.error(err.response.data.message))
    },
    updateType (row) {
      api.updateType({
        name: row.name,
        description: row.description,
        thumb: this.imageUrl,
        type: this.typeIndex,
        id: row.id
      }).then(res => {
        if (res.code === 200 && res.success) {
          this.imageUrl = ''
          this.editId = null
          this.$message.success(res.message)
          this.refreshList(this.tableData.pageIndex, true)
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => this.$message.error(err.response.data.message))
    },
    refreshList (pageIndex, isReset) {
      this.$eventhub.$emit('listTypes', {
        pageIndex,
        isReset
      })
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      let fileName = file.name
      if (fileName.length > 10) {
        fileName = fileName.substring(0, 10)
      }
      fileName = fileName.replace(/.png|.jpg|.jpeg/, '') + new Date().getTime()
      this.qiniu.key = isJPG ? fileName + '.jpg' : fileName + '.png'
      const isJPNG = isJPG || isPNG
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isJPNG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return isJPNG && isLt10M
    },
    handleProgress (e) {
      this.percent = Math.floor(e.percent)
    },
    handleSuccess () {
      this.imageUrl = QINIU_DOMAIN + this.qiniu.key
    },
    getUploadToken () {
      if (this.uploadToken) {
        this.qiniu.token = this.uploadToken
        return
      }
      api.getToken().then(res => {
        if (res.code === 200 && res.success) {
          this.qiniu.token = res.data.token
        }
      })
    }
  },
  created () {
    this.getUploadToken()
  }
}

</script>
<style lang='scss' scoped>
@import '@/assets/css/variables.scss';

._category_list{
  .list-pagination{
    padding-top: 30px;
    text-align: center;
  }
  .avatar-uploader{
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-icon:hover {
    border-color: #409EFF!important;
    &::before{
      color: #409EFF!important;
    }
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9!important;
    border-radius: 6px!important;
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>
