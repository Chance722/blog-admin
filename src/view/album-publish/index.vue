<template>
  <div class="album-publish">
    <div class="left-view">
      <main-panel />
    </div>
    <div class="right-view">
      <publish-panel />
    </div>
  </div>
</template>

<script>
import mainPanel from './components/main-panel'
import publishPanel from './components/publish-panel'
export default {
  components: {
    mainPanel,
    publishPanel,
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>