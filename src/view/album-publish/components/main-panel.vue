<template>
  <section class="main-panel">
    <Card dis-hover>
      <div class="upload-container">
        <Upload
            multiple
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :on-success="handleSuccess"
            :data="qiniu"
            action="https://upload.qiniup.com/">
            <Button> <Icon type="ios-cloud-upload-outline" size="20" /><span class="inline-middle ml5">选择相片</span></Button>
        </Upload>
      </div>
      <Divider />
      <div class="photos-container">
        <Card>
          <div class="swiper-container">
            <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
              <template v-for="(item, index) in imageUrls">
                <swiper-slide :key="'slide-top-' + index" :style="{'background-image': 'url('+ item +')'}" class="slide"></swiper-slide>
              </template>
              <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
              <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            </swiper>
            <!-- swiper2 Thumbs -->
            <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
              <template v-for="(item, index) in imageUrls">
                <swiper-slide :key="'slide-thumb-' + index" :style="{'background-image': 'url('+ item +')'}" class="slide"></swiper-slide>
              </template>
            </swiper>
          </div>
        </Card>

        <div class="form-container">
          <Form :model="formModel" :label-width="80">
            <FormItem label="相片标题">
              <Input v-model="formModel.title" clearable></Input>
            </FormItem>
            <FormItem label="相片描述">
              <Input v-model="formModel.desc" :rows="4" type="textarea"></Input>
            </FormItem>
            <FormItem label="相片标签">
              <Select v-model="formModel.tag" multiple>
                <OptionGroup v-for="(tagItem, tagIndex) in tagList" :label="tagItem.category" :key="'tag_item_' + tagIndex">
                    <Option v-for="item in tagItem.list" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </OptionGroup>
              </Select>
            </FormItem>
          </Form>
        </div>
      </div>
    </Card>
  </section>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import upload from '@/mixins/upload'

export default {
  components: {
    swiper,
    swiperSlide,
  },
  mixins: [
    upload,
  ],
  data () {
    return {
      formModel: {
        title: '',
        desc: '',
        tag: '',
      },
      tagList: [
        {
          category: '工作',
          list: [
            {
              value: 1,
              label: 'yy',
            },
            {
              value: 2,
              label: 'gomo',
            }
          ],
        },
        {
          category: '生活',
          list: [
            {
              value: 3,
              label: '搞笑',
            },
            {
              value: 4,
              label: '装逼',
            },
            {
              value: 5,
              label: '回忆',
            }
          ],
        }
      ],
      swiperOptionTop: {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
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
.photos-container {
  display: flex;
}
.upload-container {
  padding-left: 10px;
}
.swiper-container {
  width: 600px;
  height: 500px;
  // margin: 0 auto;

  .slide {
    // background-image: url('~@/assets/images/default-cover.png');
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
.form-container {
  margin: 20px 50px;
  width: 400px;
}
</style>