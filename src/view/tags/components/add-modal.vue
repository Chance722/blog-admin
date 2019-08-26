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
      <FormItem label="分类：" prop="category">
        <Select v-model="formModel.category">
          <Option v-for="(item, index) in categoryList" :value="item.name" :key="item.id" :label="item.name">
            <span>{{ item.name }}</span>
            <span style="float: right;"></span>
          </Option>
        </Select>
      </FormItem>
      <Row>
        <Col span="11">
          <FormItem label="标签颜色：">
            <ColorPicker @on-active-change="color => formModel.tagBgColor = color" v-model="formModel.tagBgColor" />
          </FormItem>
        </Col>
        <Col span="11">
          <FormItem label="标签图标：">
            <Select v-model="formModel.iconCls" filterable>
              <Option v-for="(value, key) in iconMap" :value="key" :key="key" :label="value">
                <span>{{ value }}</span>
                <span style="float: right;"><Icon :custom="'iconfont ' + key" /></span>
              </Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="11">
          <FormItem label="预览：">
            <Tag :color="formModel.tagBgColor || 'default'" :style="{'height': '24px'}">
              <Icon :custom="'iconfont ' + formModel.iconCls" :size="15" />
              <span class="inline-middle ml5">{{ formModel.name }}</span>
            </Tag>
          </FormItem>
        </Col>
      </Row>
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
      default: '新建标签',
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
        name: '标签1',
        desc: '',
        category: '',
        tagBgColor: '',
        tagColor: '#515a6e',
        iconCls: '',
      },
      formRules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
        ],
      },
      categoryList: [
        {
          name: '工作',
          id: 1,
        },
        {
          name: '生活',
          id: 2,
        },
        {
          name: '娱乐',
          id: 3,
        }
      ],
    }
  },
  methods: {
    addCategorys () {
      this.$emit('add-tags')
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

    &:hover {
      cursor: pointer;
      color: #3399ff;
      border-color: #3399ff;
    }
  }
}
</style>