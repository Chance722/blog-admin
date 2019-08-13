<template>
  <Modal
    v-model="isShowModal"
    :title="title"
    @on-ok="addCategorys"
    @on-cancel="closeModal">
    <Form :model="formModel" :rules="formRules" :label-width="80">
      <FormItem label="名称：" prop="name">
        <Input v-model="formModel.name" placeholder="请填写名称"></Input>
      </FormItem>
      <FormItem label="描述：" v-model="formModel.desc">
        <Input type="textarea" placeholder="请填写描述"></Input>
      </FormItem>
      <!-- 标签 -->
      <template v-if="type === 'tags'">
        <Row>
          <Col span="11">
            <FormItem label="标签颜色">
              <ColorPicker @on-active-change="color => formModel.tagBgColor = color" v-model="formModel.tagBgColor" />
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="预览">
              <Tag :color="formModel.tagBgColor || 'default'" :style="{'height': '24px'}">
                <Icon type="logo-nodejs" :size="15" />
                <span class="inline-middle ml5">标签一</span>
              </Tag>
            </FormItem>
          </Col>
        </Row>
      </template>
      <FormItem :label="uploadTitle" prop="url">
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          :before-upload="handleUpload"
          :on-success="handleSuccess">
          <div class="upload-container" :class="{'thumbnail': uploadTitle === uploadType.thumbnail}">
            <Icon type="ios-cloud-upload" size="30"></Icon>
            <span v-show="uploadTitle !== uploadType.thumbnail" class="inline-middle ml10">上传</span>
          </div>
        </Upload>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
export default {
  props: {
    isShowModal: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '创建分类',
    },
    type: {
      type: String,
      default: 'common',
    },
  },
  data () {
    return {
       formModel: {
        name: '',
        desc: '',
        url: '',
        tagBgColor: '',
        tagColor: '#515a6e',
      },
      formRules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
        ],
      },
      uploadType: {
        cover: '封面图',
        thumbnail: '缩略图',
      },
    }
  },
  computed: {
    uploadTitle () {
      if (this.type === 'tags') return this.uploadType.thumbnail
      if (this.type === 'common')  return this.uploadType.cover
    }
  },
  methods: {
    addCategorys () {
      this.$emit('add-categorys')
    },
    closeModal () {
      this.$emit('close-modal')
    },
    updateColor (color) {
      console.log(color)
    },
  },
}
</script>>

<style lang="scss">
.ivu-modal {
  width: 500px!important;

  .upload-container {
    width: 386px;
    height: 150px;
    border: 1px dashed #dadada;
    display: flex;
    justify-content: center;
    align-items: center;

    &.thumbnail {
      width: 50px;
      height: 50px;
    }

    &:hover {
      cursor: pointer;
      color: #3399ff;
      border-color: #3399ff;
    }
  }
}
</style>