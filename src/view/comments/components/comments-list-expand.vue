<template>
  <div>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">分类： </span>
        <span class="expand-value">{{ row.category }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">状态： </span>
        <span class="expand-value">{{ row.status }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">操作系统： </span>
        <span class="expand-value">{{ row.system }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">浏览器版本： </span>
        <span class="expand-value">{{ row.browser }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">国家： </span>
        <span class="expand-value">{{ row.country }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">地区： </span>
        <span class="expand-value">{{ `${row.province} ${row.region}` }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">被点赞： </span>
        <span class="expand-value">{{ row.praise }}</span>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  props: {
    row: Object,
  },
}
</script>

<style lang="scss" scoped>
.expand-row:not(:last-child) {
  margin-bottom: 16px;
}

.expand-key {
  font-weight: bold;
}
</style>