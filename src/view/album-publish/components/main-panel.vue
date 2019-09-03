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
      <transition name="slide-fade" mode="in-out">
        <div v-show="imageUrls.length" class="photos-container">
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
            <Tabs :value="currentTab" @on-click="handleTabClick">
              <template v-for="(item, index) in imageUrls">
                <TabPane :label="`图${index + 1}`"  :name="index">
                  <Form :model="formModel" :label-width="80">
                    <FormItem label="相片标题">
                      <Input v-model="formModel[index].title" clearable></Input>
                    </FormItem>
                    <FormItem label="相片描述">
                      <Input v-model="formModel[index].desc" :rows="4" type="textarea"></Input>
                    </FormItem>
                    <FormItem label="相片标签">
                      <Select v-model="formModel[index].tag" multiple>
                        <OptionGroup v-for="(tagItem, tagIndex) in tagList" :label="tagItem.category" :key="'tag_item_' + tagIndex">
                            <Option v-for="item in tagItem.list" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </OptionGroup>
                      </Select>
                    </FormItem>
                  </Form>
                </TabPane>
              </template>
            </Tabs>
          </div>
        </div>
      </transition>
      <div v-show="!imageUrls.length">
        <div class="empty-bg" :style="{'background-image': 'url('+ emptyBgImg +')'}">
          <p>Nothing here...</p>
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
        on: {
          slideChange: () => this.currentTab = this.swiper1.activeIndex
        },
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
      },
      currentTab: 0,
    }
  },
  computed: {
    formModel () {
      if (!this.imageUrls.length) return []
      return this.imageUrls.map((item, index) => ({
        title: `图${index + 1}`,
        desc: '',
        tag: '',
        url: item,
      }))
    },
    swiper1 () {
      return this.$refs.swiperTop.swiper
    },
    swiper2 () {
      return this.$refs.swiperThumbs.swiper
    },
    emptyBgImg () {
      let randomIdx = Math.ceil(Math.random() * 3)
      return require(`../../../assets/images/empty${randomIdx}.jpg`)
    },
  },
  mounted () {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.swiper
      const swiperThumbs = this.$refs.swiperThumbs.swiper
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })
  },
  methods: {
    handleTabClick (name) {
      this.swiper1.slideTo(name, 500, false)
      this.swiper2.slideTo(name, 500, false)
    },
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
  width: 600px;

  .ivu-tabs {
    height: 100%;
  }
}
.empty-bg {
  min-width: 1000px;
  width: 100%;
  height: 68vh;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-weight: bold;
    font-size: 30px;
    color: rgba(#fff, .8);
    text-align: center;
  }
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>