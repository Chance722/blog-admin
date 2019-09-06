<template>
  <div class="users-list">
    <Alert show-icon>找到<span class="num-orange">18</span>个用户，共<span class="num-orange">2</span>页</Alert>
    <Card>
      <Table :data="listData" :columns="columnData">
        <template slot-scope="{ row, index }" slot="action">
          <Button class="ml10">
            <Icon type="ios-checkmark-circle-outline" :size="12" />
            <span class="inline-middle ml5">解禁</span>
          </Button>
          <Button type="error" class="ml10">
            <Icon type="ios-remove-circle-outline" :size="12" />
            <span class="inline-middle ml5">禁言</span>
          </Button>
        </template>
      </Table>
      <Page :total="18" :class="'page-container'" />
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      listData: [
        {
          name: 'chance722',
          email: 'handsomelong722@163.com',
          network: 'https://chance722.me',
          zone: '广东广州',
          date: '2019-09-06 16:40',
        },
        {
          name: 'chance722',
          email: 'handsomelong722@163.com',
          network: 'https://chance722.me',
          zone: '广东广州',
          date: '2019-09-06 16:40',
        },
      ],
      columnData: [
        {
          title: '用户',
          key: 'name',
          align: 'center',
        },
        {
          title: '邮箱',
          key: 'email',
          align: 'center',
        },
        {
          title: '站点',
          key: 'network',
          align: 'center',
        },
        {
          title: '地区',
          key: 'zone',
          align: 'center',
        },
        {
          title: '创建日期',
          key: 'date',
          align: 'center',
        },
        {
          title: '操作',
          slot: 'action',
          width: 300,
          align: 'center',
        },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.users-list {
  padding: 10px 0;
}
</style>