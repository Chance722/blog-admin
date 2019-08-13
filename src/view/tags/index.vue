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
        <Input slot="extra" icon="ios-search" placeholder="检索标签..." @on-click="searchTags()" />
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
</style>