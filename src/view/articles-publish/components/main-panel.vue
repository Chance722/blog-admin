<template>
  <section class="main-panel">
    <Card>
      <Form :model="formModel" :label-width="80">
        <FormItem label="文章标题">
          <Input v-model="formModel.title" clearable></Input>
        </FormItem>
        <FormItem label="文章简介">
          <Input v-model="formModel.desc" type="textarea"></Input>
        </FormItem>
      </Form>
      <markdown />
    </Card>
  </section>
</template>

<script>
import markdown from '_c/markdown'
export default {
  components: {
    markdown,
  },
  data () {
    return {
      formModel: {
        title: '',
        desc: '',
      },
    }
  }
}
</script>

<style lang="scss" scoped>

</style>