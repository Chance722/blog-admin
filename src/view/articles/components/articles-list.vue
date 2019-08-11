<template>
  <div class="articles-list">
    <Alert show-icon>找到<span class="num-orange">18</span>篇文章，共<span class="num-orange">2</span>页</Alert>
    <Card>
      <div class="article-item">
        <div class="article-item-cover"></div>
        <div class="article-item-detail">
          <p class="detail-1">
            <span class="category-pic" />
            <span class="article-title">我所向往的技术团队</span>
          </p>
          <p class="detail-2">
            <Tag>感想</Tag>
            <Tag>团队</Tag>
          </p>
          <p class="detail-3">
            <span class="article-desc">“生命不息，重构不止”，国庆终于完成了博客后端到前端整个的重构</span>
          </p>
          <p class="detail-4">
            <span class="article-info">
              <Tag color="success" :class="'mr10'">已发布</Tag>
              <span class="article-views mr10">
                <Icon type="ios-eye" />
                171
              </span>
              <span class="article-likes mr10">
                <Icon type="md-thumbs-up" />
                11
              </span>
              <span class="article-comments mr10">
                <Icon type="md-text" />
                5
              </span>
            </span>
            <span class="edit-info">
              <span class="publish-time mr10">
                <Icon type="ios-time-outline" />
                2018-10-20 19:20
              </span>
              <span class="update-time mr10">
                <Icon type="md-create" />
                2018-10-22 01:43
              </span>
            </span>
          </p>
        </div>
        <div class="article-item-btns">
          <Tooltip content="下线" placement="top">
            <Button type="warning" shape="circle" icon="ios-trending-down"></Button>
          </Tooltip>
          <Tooltip content="编辑" placement="top">
            <Button type="primary" shape="circle" icon="md-create"></Button>
          </Tooltip>
          <Tooltip content="查看" placement="top">
            <Button shape="circle" icon="ios-search"></Button>
          </Tooltip>
          <Tooltip content="删除" placement="top">
            <Button type="error" shape="circle" icon="ios-trash"></Button>
          </Tooltip>
        </div>
      </div>
    </Card>
    <Page :total="18" :class="'page-container'" />
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.articles-list {
  padding: 10px 0;

  .num-orange {
    display: inline-block;
    font-weight: bold;
    margin: 0 2px;
  }

  .article-item {
    display: flex;

    &-cover {
      width: 200px;
      height: 130px;
      background: #000;
      margin-right: 20px;
    }

    &-detail {
      flex: 1 0 500px;
      padding-top: 5px;
      p:not(:last-child) {
        margin-bottom: 9px;
      }
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .category-pic {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #000;
        margin-right: 10px;
      }
      .article-title {
        font-weight: bold;
      }
      .article-desc {
        color: gray;
      }
      .article-info {
        margin-right: 50px;
      }
    }

    &-btns {
      display: flex;
      justify-content: center;
      align-items: center;

      .ivu-btn {
        margin: 0 5px;
      }
    }
  }
}
</style>