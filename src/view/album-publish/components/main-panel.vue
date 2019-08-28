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
          <div class="swiper-container">
            <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
              <swiper-slide class="slide"></swiper-slide>
              <swiper-slide class="slide"></swiper-slide>
              <swiper-slide class="slide"></swiper-slide>
              <swiper-slide class="slide"></swiper-slide>
              <swiper-slide class="slide"></swiper-slide>
              <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
              <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            </swiper>
            <!-- swiper2 Thumbs -->
            <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
              <swiper-slide class="slide"></swiper-slide>
              <swiper-slide class="slide"></swiper-slide>
              <swiper-slide class="slide"></swiper-slide>
              <swiper-slide class="slide"></swiper-slide>
              <swiper-slide class="slide"></swiper-slide>
            </swiper>
          </div>
        </Card>
      </div>
    </Card>
  </section>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    swiper,
    swiperSlide,
  },
  data () {
    return {
      swiperOptionTop: {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
      },
    }
  },
  mounted () {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.swiper
      const swiperThumbs = this.$refs.swiperThumbs.swiper
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })
  },
}
</script>

<style lang="scss" scoped>
.upload-container {
  padding-left: 10px;
}
.swiper-container {
  width: 600px;
  height: 500px;
  margin: 0 auto;

  .slide {
    background-image: url('~@/assets/images/default-cover.png');
    background-position: center;
    background-size: cover;
  }

  .gallery-top {
    height: 75%!important;
    width: 100%;
  }

  .gallery-thumbs {
    height: 25%!important;
    box-sizing: border-box;
    padding: 10px 0;
  }

  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }

  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }

}
</style>