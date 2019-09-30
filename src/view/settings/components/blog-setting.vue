<template>
  <div class="blog-settings">
    <Form :model="formModel" :label-width="120">
      <FormItem label="站点标题" prop="name">
        <Input v-model="formModel.name" class="w400"></Input>
      </FormItem>
      <FormItem label="站点描述" prop="description">
        <Input v-model="formModel.description" type="textarea" class="w400"></Input>
      </FormItem>
      <FormItem label="关键词" prop="keywords">
        <Tag v-for="item in formModel.keywords" :key="item" :name="item" closable @on-close="closeKeyword" color="#2f2f2f">{{ item }}</Tag>
        <Input v-model="keyword" placeholder="添加关键字" class="mt10 w300">
          <Button slot="append" @click="addKeyword">添加</Button>
        </Input>
      </FormItem>
      <FormItem label="电子邮件" prop="email">
        <Input v-model="formModel.email" class="w400"></Input>
      </FormItem>
      <FormItem label="ICP备案号" prop="icp">
        <Input v-model="formModel.icp" class="w400"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" class="w100">保存</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  props: {
    settingInfo: {
      type: Object,
      default: () => {},
    },
  },
  data () {
    return {
      keywords: '',
      formModel: {
        name: this.settingInfo.blog_title || 'YOUR BLOG TITLE',
        description: this.settingInfo.blog_description || 'YOUR BLOG DESCRIPTION',
        keywords: this.settingInfo.blog_keywords ? this.settingInfo.blog_keywords.split(',') : [],
        email: this.settingInfo.email || '',
        icp: this.settingInfo.icp_numbers || '',
      },
    }
  },
  methods: {
    addKeyword () {
      if (this.keyword) this.formModel.keywords.push(this.keyword)
    },
    closeKeyword (e, name) {
      const index = this.formModel.keywords.indexOf(name)
      this.formModel.keywords.splice(index, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.blog-settings {
  padding-top: 50px;
  margin: 0 auto;
  width: 600px;
}
</style>