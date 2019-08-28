<template>
  <section class="main-panel">
    <Card dis-hover>
      <div class="upload-container">
        <Upload
            multiple
            :show-upload-list="false"
            action="//jsonplaceholder.typicode.com/posts/">
            <Button> <Icon type="ios-cloud-upload-outline" size="20" /><span class="inline-middle ml5">选择相片</span></Button>
        </Upload>
      </div>
      <Divider />
      <div class="photos-container">
        <Card>
          <div class="photos-item"></div>
        </Card>
      </div>
    </Card>
  </section>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-container {
  padding-left: 10px;
}
.photos-container {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  .photos-item {
    width: 150px;
    height: 100px;
  }
}
</style>