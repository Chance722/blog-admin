<template>
  <div class="albums-list">
    <Alert show-icon>找到<span class="num-orange">18</span>张相片</Alert>
    <Card class="card-container" dis-hover>
      <Card class="photo-item">
        <div class="photo-cate">
          工作
        </div>
        <div class="bg-wrapper">
          <div class="photo-bg" :style="{'background-image': 'url('+ defaultCoverImg +')'}">
            <span class="photo-info-date">2019.09.27</span>
          </div>
          <div class="edit-cover">
            <Button type="primary" shape="circle" icon="md-create" class="mr20"></Button>
            <Button type="error" shape="circle" icon="ios-trash" @click="confirmDelete"></Button>
          </div>
        </div>
        <div class="photo-info">
          <p class="photo-info-name">我和她</p>
          <p class="photo-info-desc">犹记当年金戈铁马 我与你携手桃李之下</p>
          <p class="photo-info-tag">
            <Tag :color="'#2D8cF0'">标签一</Tag>
            <Tag :color="'#52c41a'">标签二</Tag>
          </p>
        </div>
      </Card>
      <Card class="photo-item">
        <div class="photo-cate">
          生活
        </div>
        <div class="bg-wrapper">
          <div class="photo-bg" :style="{'background-image': 'url('+ defaultCoverImg +')'}">
            <span class="photo-info-date">2019.09.27</span>
          </div>
          <div class="edit-cover">
            <Button type="primary" shape="circle" icon="md-create" class="mr20"></Button>
            <Button type="error" shape="circle" icon="ios-trash"></Button>
          </div>
        </div>
        <div class="photo-info">
          <p class="photo-info-name">我和她</p>
          <p class="photo-info-desc">犹记当年金戈铁马 我与你携手桃李之下</p>
        </div>
      </Card>
            <Card class="photo-item">
        <div class="photo-cate">
          生活
        </div>
        <div class="bg-wrapper">
          <div class="photo-bg" :style="{'background-image': 'url('+ defaultCoverImg +')'}">
            <span class="photo-info-date">2019.09.27</span>
          </div>
          <div class="edit-cover">
            <Button type="primary" shape="circle" icon="md-create" class="mr20"></Button>
            <Button type="error" shape="circle" icon="ios-trash"></Button>
          </div>
        </div>
        <div class="photo-info">
          <p class="photo-info-name">我和她</p>
          <p class="photo-info-desc">犹记当年金戈铁马 我与你携手桃李之下</p>
        </div>
      </Card>
            <Card class="photo-item">
        <div class="photo-cate">
          生活
        </div>
        <div class="bg-wrapper">
          <div class="photo-bg" :style="{'background-image': 'url('+ defaultCoverImg +')'}">
            <span class="photo-info-date">2019.09.27</span>
          </div>
          <div class="edit-cover">
            <Button type="primary" shape="circle" icon="md-create" class="mr20"></Button>
            <Button type="error" shape="circle" icon="ios-trash"></Button>
          </div>
        </div>
        <div class="photo-info">
          <p class="photo-info-name">我和她</p>
          <p class="photo-info-desc">犹记当年金戈铁马 我与你携手桃李之下</p>
        </div>
      </Card>
            <Card class="photo-item">
        <div class="photo-cate">
          生活
        </div>
        <div class="bg-wrapper">
          <div class="photo-bg" :style="{'background-image': 'url('+ defaultCoverImg +')'}">
            <span class="photo-info-date">2019.09.27</span>
          </div>
          <div class="edit-cover">
            <Button type="primary" shape="circle" icon="md-create" class="mr20"></Button>
            <Button type="error" shape="circle" icon="ios-trash"></Button>
          </div>
        </div>
        <div class="photo-info">
          <p class="photo-info-name">我和她</p>
          <p class="photo-info-desc">犹记当年金戈铁马 我与你携手桃李之下</p>
        </div>
      </Card>
            <Card class="photo-item">
        <div class="photo-cate">
          生活
        </div>
        <div class="bg-wrapper">
          <div class="photo-bg" :style="{'background-image': 'url('+ defaultCoverImg +')'}">
            <span class="photo-info-date">2019.09.27</span>
          </div>
          <div class="edit-cover">
            <Button type="primary" shape="circle" icon="md-create" class="mr20"></Button>
            <Button type="error" shape="circle" icon="ios-trash"></Button>
          </div>
        </div>
        <div class="photo-info">
          <p class="photo-info-name">我和她</p>
          <p class="photo-info-desc">犹记当年金戈铁马 我与你携手桃李之下</p>
        </div>
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
  methods: {
    confirmDelete () {
      this.$Modal.confirm({
        title: '温馨提示',
        content: '<p>确定删除该相片？</p>',
        onOk: () => {
            this.$Message.info('Clicked ok');
        },
        onCancel: () => {
            this.$Message.info('Clicked cancel');
        }
      })
    },
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
    overflow: hidden;

    span {
      display: inline-block;
      vertical-align: middle;
    }

    .photo-item {
      width: 300px;
      height: 280px;
      margin-right: 15px;
      margin-bottom: 15px;
      position: relative;

      .photo-cate {
        position: absolute;
        padding: 2px;
        background-color: #b52f2f;
        width: 97px;
        z-index: 100;
        color: #fff;
        text-align: center;
        left: 0;
        top: 0;
        transform: rotate(-45deg) translateZ(0);
        transform-origin: 56px 47px;
        box-shadow: 0px 1px 1px 0 grey;
      }

      .ivu-card-body {
        width: 100%;
        height: 100%;
      }

      .bg-wrapper {
        width: 280px;
        height: 180px;
        position: absolute;
        left: 10px;
        top: 10px;
        overflow: hidden;
      }

      .photo-bg, .edit-cover {
        width: 280px;
        height: 180px;
        left: 0;
        top: 0;
      }


      .edit-cover {
        background: rgba(0, 0, 0, 0.4);
        position: absolute;
        opacity: 0;
        transition: all ease .2s;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99;
      }

      .photo-info {
        position: absolute;
        width: 100%;
        height: 80px;
        left: 0;
        bottom: 0;
        padding: 0 20px;

        &-name {
          font-weight: bold;
          font-size: 14px;
        }

        &-desc {
          width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: wrap;
          color: #b3b3b3;
          font-size: 12px;
        }

        &-tag {
          position: absolute;
          right: 10px;
          bottom: 10px;
          .ivu-tag {
            line-height: 23px;
          }
        }

        &-date {
          display: inline-block;
          position: absolute;
          right: 20px;
          bottom: 10px;
          font-size: 10px;
          font-family: fantasy;
          // transform: rotate(6deg);
          text-decoration: underline;
        }
      }

      .ivu-card-body, .photo-bg {
        position: absolute;
        background-size: cover;
        background-position: center;
        transition: all ease-in-out .3s;
        cursor: pointer;
      }

      .bg-wrapper:hover {
        .photo-bg {
          transform: scale(1.3) rotate(6deg);
        }
        .edit-cover {
          opacity: 1;
        }
      }
    }
  }
}
</style>