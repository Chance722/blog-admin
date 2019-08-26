<template>
  <div class="tags">
    <Card>
      <Tabs>
        <TabPane label="文章标签" icon="ios-paper">
          <article-tags :isSimple="isSimple" />
        </TabPane>
        <TabPane label="相册标签" icon="md-photos">
          <album-tags :isSimple="isSimple" />
        </TabPane>
        <span class="tab-extra" slot="extra">
          <i-switch class="mr20" size="large" v-model="isSimple" @on-change="changeMode">
            <span slot="open">精简</span>
            <span slot="close">默认</span>
          </i-switch>
          <Input icon="ios-search" placeholder="检索标签..." @on-click="searchTags()" style="width: 200px; margin-right: 20px;" />
          <Button size="middle" icon="md-add-circle" @click="showModal = true">新建标签</Button>
        </span>
      </Tabs>
    </Card>
    <addModal
      :isShowModal="showModal"
      :title="'新建标签'"
      :iconMap="iconMap"
      @close-modal="showModal = false"
      @add-tags="addTags" />
  </div>
</template>

<script>
import addModal from './components/add-modal'
import articleTags from './components/article-tags'
import albumTags from './components/album-tags'
import axios from 'axios'
export default {
  components: {
    articleTags,
    albumTags,
    addModal,
  },
  data () {
    return {
      showModal: false,
      isSimple: false,
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.initIconMap()
    },
    async initIconMap () {
      const res = await axios.get('iconfont.json')
      if (res.status === 200) this.iconMap = res.data
    },
    searchTags () {
      console.log('???')
    },
    changeMode (status) {
      this.isSimple = status
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