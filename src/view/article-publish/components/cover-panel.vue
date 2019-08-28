<template>
  <section class="cover-panel">
    <Card>
      <p slot="title">
        <Icon type="ios-image-outline" :size="18" />
        <span class="inline-middle ml5">封面</span>
      </p>
      <Upload
      slot="extra"
      :before-upload="handleUpload"
      :on-success="handleSuccess"
      action="//jsonplaceholder.typicode.com/posts/">
        <Button type="primary" size="small" icon="md-cloud-upload">更换</Button>
      </Upload>
      <div class="cover-container">
        <span class="img" v-if="imageUrl" :style="{'background-image': 'url('+ imageUrl +')'}"></span>
        <Icon v-else type="ios-image" :size="40" :color="'#dadada'" />
      </div>
    </Card>
  </section>
</template>

<script>
import defaultCoverImg from '@/assets/images/default-cover.png'
export default {
  data () {
    return {
      imageUrl: defaultCoverImg,
    }
  },
  methods: {
    handleUpload () {},
    handleSuccess () {},
  },
}
</script>

<style lang="scss">

.cover-panel {

  .cover-container {
    margin: 0 auto;
    width: 250px;
    height: 150px;
    border: 1px dashed #dadada;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    span.img {
      @include absolute-block;
      background-size: cover;
      background-position: center;
    }
  }
}
</style>