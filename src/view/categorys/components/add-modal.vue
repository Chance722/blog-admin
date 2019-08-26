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
            <FormItem label="标签图标">
              <Select v-model="formModel.iconCls" filterable>
                <Option v-for="(value, key) in iconMap" :value="key" :key="key" :label="value">
                  <span>{{ value }}</span>
                  <span style="float: right;"><Icon :custom="'iconfont ' + key" /></span>
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="预览">
              <Tag :color="formModel.tagBgColor || 'default'" :style="{'height': '24px'}">
                <Icon :custom="'iconfont ' + formModel.iconCls" :size="15" />
                <span class="inline-middle ml5">标签一</span>
              </Tag>
            </FormItem>
          </Col>
        </Row>
      </template>
      <template v-else>
        <FormItem label="封面图" prop="url">
          <Upload
            action="//jsonplaceholder.typicode.com/posts/"
            :before-upload="handleUpload"
            :on-success="handleSuccess">
            <div class="upload-container">
              <Icon type="ios-cloud-upload" size="30"></Icon>
              <span class="inline-middle ml10">上传</span>
            </div>
          </Upload>
        </FormItem>
      </template>
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
    iconMap: {
      type: Object,
      default: () => {}
    },
  },
  data () {
    return {
      iconMap: {},
      formModel: {
        name: '',
        desc: '',
        url: '',
        tagBgColor: '',
        tagColor: '#515a6e',
        iconCls: '',
      },
      formRules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    addCategorys () {
      this.$emit('add-categorys')
    },
    closeModal () {
      this.clearFormModel()
      this.$emit('close-modal')
    },
    updateColor (color) {
      console.log(color)
    },
    clearFormModel () {
      this.formModel = {
        name: '',
        desc: '',
        url: '',
        tagBgColor: '',
        tagColor: '#515a6e',
        iconCls: '',
      }
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