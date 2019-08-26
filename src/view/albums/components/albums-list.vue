<template>
  <div class="albums-list">
    <Alert show-icon>找到<span class="num-orange">18</span>张相片</Alert>
    <Card class="card-container" dis-hover>
      <Card class="photo-item">
        <div class="photo-bg" :style="{'background-image': 'url('+ defaultCoverImg +')'}" />
      </Card>
      <Card class="photo-item">
        <div class="photo-bg" :style="{'background-image': 'url('+ defaultCoverImg +')'}" />
      </Card>

    </Card>
  </div>
</template>

<script>
import defaultCoverImg from '@/assets/images/default-cover.png'
export default {
  data () {
    return {
      defaultCoverImg,
    }
  },
}
</script>

<style lang="scss">
.albums-list {
  padding: 10px 0;

  .num-orange {
    display: inline-block;
    font-weight: bold;
    margin: 0 2px;
  }

  .card-container .ivu-card-body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .photo-item {
      width: 300px;
      height: 250px;
      margin-right: 10px;
      position: relative;

      .ivu-card-body {
        width: 280px;
        height: 180px;
        left: 10px;
        top: 10px;
        overflow: hidden;
      }

      .photo-bg {
        width: 280px;
        height: 180px;
        left: 0;
        top: 0;
        overflow: hidden;
      }

      .ivu-card-body, .photo-bg {
        position: absolute;
        background-size: cover;
        background-position: center;
        transition: all ease-in-out .3s;
        cursor: pointer;
      }

      .photo-bg:hover {
        transform: scale(1.3) rotate(6deg);
      }
    }
  }
}
</style>