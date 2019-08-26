<template>
  <section class="album-categorys">
    <Card class="card-item">
      <div class="add-container" @click="showModal = true">
        <Icon type="md-add-circle" />
        <span class="inline-middle ml10">添加分类</span>
      </div>
    </Card>
    <Card class="card-item">
      <p slot="title">
        YY点滴
      </p>
      <span slot="extra" class="card-item-cover" :style="{'background-image': 'url('+ defaultImg +')'}"></span>
      <div class="card-item-content">
        <div class="desc">记录在YY的生活点滴</div>
        <div class="articles-num">
          <p>照片</p>
          <p>8</p>
        </div>
      </div>
      <div class="card-item-footer">
        <span class="footer-item">
          <Icon type="ios-create-outline" :size="24" />
        </span>
        <Divider type="vertical" />
        <span class="footer-item">
          <Icon type="ios-trash-outline" :size="24" />
        </span>
      </div>
    </Card>
    <Card class="card-item">
      <p slot="title">
        生活点滴
      </p>
      <span slot="extra" class="card-item-cover" :style="{'background-image': 'url('+ defaultImg +')'}"></span>
      <div class="card-item-content">
        <div class="desc">记录生活点滴</div>
        <div class="articles-num">
          <p>照片</p>
          <p>8</p>
        </div>
      </div>
      <div class="card-item-footer">
        <span class="footer-item">
          <Icon type="ios-create-outline" :size="24" />
        </span>
        <Divider type="vertical" />
        <span class="footer-item">
          <Icon type="ios-trash-outline" :size="24" />
        </span>
      </div>
    </Card>
    <addModal
      :isShowModal="showModal"
      :title="'创建相册分类'"
      @close-modal="showModal = false"
      @add-categorys="addCategorys" />
  </section>
</template>

<script>
import defaultImg from '@/assets/images/logo-min.png'
import addModal from './add-modal'
export default {
  components: {
    addModal,
  },
  data () {
    return {
      showModal: false,
      defaultImg,
    }
  },
  methods: {
    handleSuccess () {},
    handleUpload () {},
    addCategorys () {
      console.log('??')
      this.showModal = false
    },
  },
}
</script>

<style lang="scss">
.album-categorys {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  .card-item {
    width: 380px;
    height: 220px;
    position: relative;
    margin-right: 15px;
    margin-bottom: 15px;

    &-cover {
      display: inline-block;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
    }

    &-content {
      color: gray;
      display: flex;
      height: 110px;
      border-bottom: 1px solid #e8eaec;

      .desc {
        flex: 5;
      }

      .articles-num {
        flex: 1;
        text-align: center;

        p:nth-child(2) {
          font-weight: bold;
          font-size: 30px;
          color:#2d8cf0;
        }
      }
    }

    &-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;

      .footer-item {
        flex: 1;
        text-align: center;
        cursor: pointer;
      }

    }
  }

  .add-container {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #dadada;

    &:hover {
      cursor: pointer;
      border-color: #2d8cf0;
      color: #2d8cf0;
    }
  }
}

</style>