<template>
  <div class="article-publish">
    <div class="left-view">
      <main-panel />
    </div>
    <div class="right-view">
      <publish-panel />
      <property-panel />
      <cover-panel />
    </div>
  </div>
</template>

<script>
import mainPanel from './components/main-panel'
import publishPanel from './components/publish-panel'
import propertyPanel from './components/property-panel'
import coverPanel from './components/cover-panel'
export default {
  components: {
    mainPanel,
    publishPanel,
    propertyPanel,
    coverPanel,
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>