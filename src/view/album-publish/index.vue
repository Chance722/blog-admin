<template>
  <div class="album-publish">
    <div class="left-view">
      <main-panel />
    </div>
    <div class="right-view">
      <publish-panel />
      <property-panel />
    </div>
  </div>
</template>

<script>
import mainPanel from './components/main-panel'
import publishPanel from './components/publish-panel'
import propertyPanel from './components/property-panel'
export default {
  components: {
    mainPanel,
    publishPanel,
    propertyPanel,
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>