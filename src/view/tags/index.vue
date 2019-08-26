<template>
  <div class="tags">
    <Card>
      <Tabs>
        <TabPane label="文章标签" icon="ios-paper">
          <article-tags />
        </TabPane>
        <TabPane label="相册标签" icon="md-photos">
          <album-tags />
        </TabPane>
        <span class="tab-extra" slot="extra">
          <Input icon="ios-search" placeholder="检索标签..." @on-click="searchTags()" style="width: 200px; margin-right: 20px;" />
          <Button size="middle" icon="md-add-circle">新建标签</Button>
        </span>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import articleTags from './components/article-tags'
import albumTags from './components/album-tags'
export default {
  components: {
    articleTags,
    albumTags,
  },
  data () {
    return {}
  },
  methods: {
    searchTags () {
      console.log('???')
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';

.tab-extra {
  display: flex;
  align-items: center;
}
</style>