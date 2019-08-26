<template>
  <section class="article-tags">
    <Divider orientation="left">工作</Divider>
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
    <Card class="card-item color" style="background-color: #2d2d2d">
      <div class="card-item-content">
        <Icon custom="iconfont icon-game" :size="40" />
        <p class="card-item-content-title"><span class="title">游戏</span>相关</p>
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
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.article-tags {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  .card-item {
    width: 300px;
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
</style>