<template>
  <section class="article-categorys">
    <Card class="card-item">
      <div class="add-container" @click="showModal = true">
        <Icon type="md-add-circle" />
        <span class="inline-middle ml10">添加分类</span>
      </div>
    </Card>
    <Modal
      v-model="showModal"
      title="创建文章分类"
      @on-ok="addArticleCategory"
      @on-cancel="showModal = false">
      <Form :model="formModel" :rules="formRules" :label-width="80">
        <FormItem label="名称：" prop="name">
          <Input v-model="formModel.name" placeholder="请填写名称"></Input>
        </FormItem>
        <FormItem label="描述：" v-model="formModel.desc">
          <Input type="textarea" placeholder="请填写描述"></Input>
        </FormItem>
        <FormItem label="封面图：" prop="url">
          <!-- <Input type="hidden" v-model="formModel.url"></Input> -->
          <Upload
            class="upload-container"
            action="//jsonplaceholder.typicode.com/posts/"
            :before-upload="handleUpload"
            :on-success="handleSuccess">
            <Icon type="ios-cloud-upload" size="30"></Icon>
            <span class="inline-middle ml10">上传</span>
          </Upload>
        </FormItem>
      </Form>
    </Modal>
  </section>
</template>

<script>
export default {
  data () {
    return {
      showModal: false,
      formModel: {
        name: '',
        desc: '',
        url: '',
      },
      formRules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    handleSuccess () {},
    handleUpload () {},
  },
}
</script>

<style lang="scss">
.article-categorys {
  display: flex;
  justify-content: space-between;

  .card-item {
    width: 300px;
    height: 150px;
    position: relative;
  }

  .add-container {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #dadada;

    &:hover {
      cursor: pointer;
      border-color: #2d8cf0;
      color: #2d8cf0;
    }
  }
}

.ivu-modal {
  width: 500px!important;

  .upload-container {
    width: 386px;
    height: 150px;
    border: 1px dashed #dadada;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
      color: #3399ff;
      border-color: #3399ff;
    }
  }
}
</style>