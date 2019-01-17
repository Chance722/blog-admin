<template>
  <div class="_v_main">
    <v-breadcrumb></v-breadcrumb>
    <div class="_v_main_content">
      <slot name="router-view"></slot>
    </div>
  </div>
</template>

<script>
import vBreadcrumb from '@/components/common/vBreadcrumb'
export default {
  components: {
    vBreadcrumb
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
._v_main{
  padding-top: 95px;
  margin-left: 270px;

  ._v_main_content{
    padding-top: 10px;
  }

}
</style>
