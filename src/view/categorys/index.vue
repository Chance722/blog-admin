<template>
  <div class="categorys">
    <Card>
      <Tabs>
        <TabPane label="文章分类" icon="ios-paper">
          <article-categorys />
        </TabPane>
        <TabPane label="相册分类" icon="md-photos">
          <album-categorys />
        </TabPane>
        <TabPane label="标签分类" icon="md-pricetag">
          <tag-categorys />
        </TabPane>
        <Input slot="extra" icon="ios-search" placeholder="检索分类..." @on-click="searchCategorys()" />
      </Tabs>
    </Card>
  </div>
</template>

<script>
import articleCategorys from './components/article-categorys'
import albumCategorys from './components/album-categorys'
import tagCategorys from './components/tag-categorys'
export default {
  components: {
    articleCategorys,
    albumCategorys,
    tagCategorys,
  },
  data () {
    return {}
  },
  methods: {
    searchCategorys () {
      console.log('???')
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>