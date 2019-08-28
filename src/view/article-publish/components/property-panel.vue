<template>
  <section class="property-panel">
    <Card>
      <p slot="title">
        <Icon type="ios-cog-outline" :size="18" />
        <span class="inline-middle ml5">属性</span>
      </p>
      <Form :model="formModel" :label-width="60">
        <FormItem label="分类：">
          <Select size="small" v-model="formModel.categorys" class="w200">
            <Option v-for="(item, index) in categoryList" :value="item.value" :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="标签：">
          <Select size="small" v-model="formModel.tags" multiple class="w200">
            <Option v-for="(item, index) in tagList" :value="item.value" :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </FormItem>
      </Form>
    </Card>
  </section>
</template>

<script>
export default {
  data () {
    return {
      formModel: {
        categorys: 0,
        tags: [0, 1],
      },
      categoryList: [
        {
          value: 0,
          label: '原创',
        },
        {
          value: 1,
          label: '转载',
        },
        {
          value: 2,
          label: '混撰',
        },
        {
          value: 3,
          label: '翻译',
        }
      ],
      tagList: [
        {
          value: 0,
          label: '标签1',
        },
        {
          value: 1,
          label: '标签2',
        },
        {
          value: 3,
          label: '标签1',
        },
        {
          value: 4,
          label: '标签2',
        },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
</style>