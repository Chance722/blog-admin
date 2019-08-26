<template>
  <section class="album-tags">
    <div class="cate-container">
      <Divider orientation="left">工作</Divider>
      <transition name="slide-fade" mode="out-in">
        <tempalte v-if="isSimple">
          <Poptip trigger="hover" placement="right" :width="'100px'">
            <Tag type="dot" :color="'#3dc16c'">
              <Icon custom="iconfont icon-vuejs" :size="15" />
              <span>vuejs</span>
            </Tag>
            <div slot="content">
              <Button type="primary" shape="circle" icon="md-create" class="mr10"></Button>
              <Button type="error" shape="circle" icon="ios-trash"></Button>
            </div>
          </Poptip>
        </tempalte>
        <template v-else>
          <Card class="card-item color" style="background-color: #3dc16c">
            <div class="card-item-content">
              <Icon custom="iconfont icon-vuejs" :size="40" />
              <p class="card-item-content-title"><span class="title">Vuejs</span>相关</p>
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
        </template>
      </transition>
    </div>
    <div class="cate-container">
      <Divider orientation="left">生活</Divider>
      <transition name="slide-fade" mode="out-in">
        <tempalte v-if="isSimple">
          <Tag type="dot" color="default">default</Tag>
        </tempalte>
        <template v-else>
        <Card class="card-item">
          <div class="card-item-content">
            <Icon custom="iconfont icon-vuejs" :size="40" />
            <p class="card-item-content-title"><span class="title">Vuejs</span>相关</p>
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
        </template>
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    isSimple: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
    }
  },
  methods: {
    addTags () {
      console.log('??')
      this.showModal = false
    },
  },
}
</script>

<style lang="scss">
.album-tags {

  .cate-container {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }

  .ivu-divider-inner-text {
    font-weight: bold;
  }

  .ivu-poptip-popper {
    min-width: 100px;
  }

  .card-item {
    width: 350px;
    height: 150px;
    position: relative;
    margin-right: 15px;
    margin-bottom: 15px;
    text-align: center;
  }

  .card-item-content {
    padding: 10px 0 20px;
    border-bottom: 1px solid #e8eaec;
    color: #515a6e;
    &-title .title {
      color: #2d8cf0;
      font-weight: bold;
      margin-right: 5px;
    }
  }

  .color .card-item-content {
    color: rgba(#fff, .8);
    border-bottom: 1px solid rgba(#fff, .8);
    &-title .title {
      color: #fff;
    }
  }

  .card-item-footer {
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

  .color .card-item-footer {
    color: rgba(#fff, .8);
    
    .ivu-divider {
      background: rgba(#fff, .8);
    }
  }
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all .2s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>