<template>
  <section class="publish-panel">
    <Card>
      <p slot="title">
        <Icon type="ios-paper-plane-outline" :size="18" />
        <span class="inline-middle ml5">发布</span>
      </p>
      <Form :model="formModel" :label-width="60">
        <FormItem label="分类：">
          <Select size="small" v-model="formModel.resource" class="w200">
          </Select>
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
          <Icon type="md-checkmark-circle-outline" :size="12" />
          <span class="inline-middle ml5">一键发布</span>
        </Button>
        <Button @click="back">
          <Icon type="ios-undo-outline" :size="12" />
          <span class="inline-middle ml5">返回</span>
        </Button>
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
    back () {
      this.$router.back(-1)
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