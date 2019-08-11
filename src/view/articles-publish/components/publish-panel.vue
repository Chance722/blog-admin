<template>
  <section class="publish-panel">
    <Card>
      <p slot="title">
        <Icon type="ios-paper-plane-outline" :size="18" />
        <span class="inline-middle ml5">发布</span>
      </p>
      <Form :model="formModel" :label-width="60">
        <FormItem label="来源：">
          <Select size="small" v-model="formModel.resource" class="w200">
          </Select>
        </FormItem>
        <FormItem label="关键字：">
          <Tag v-for="item in formModel.keywords" :key="item" :name="item" closable @on-close="closeKeyword" color="#2f2f2f">{{ item }}</Tag>
          <Input size="small" v-model="keyword" placeholder="添加关键字" class="mt10">
            <Button slot="append" @click="addKeyword">添加</Button>
          </Input>
        </FormItem>
        <FormItem label="公开度：">
          <RadioGroup v-model="formModel.open">
            <Radio :label="0">公开</Radio>
            <Radio :label="1">私密</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <Divider />
      <div class="btns">
        <Button type="primary">
          <Icon type="md-checkmark-circle" :size="12" />
          <span class="inline-middle ml5">发布</span>
        </Button>
        <Button>存为草稿</Button>
        <Button>预览</Button>
      </div>
    </Card>
  </section>
</template>

<script>
export default {
  data () {
    return {
      keyword: '',
      formModel: {
        resource: 0,
        open: 0,
        keywords: ['关键字1', '关键字2'],
      }
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
.publish-panel {

  .btns .ivu-btn{
    margin-right: 10px;
  }
}
</style>