<template>
  <div class="comments-list">
     <Alert show-icon>找到<span class="num-orange">18</span>条留言，共<span class="num-orange">2</span>页</Alert>
    <Card>
      <Table :data="listData" :columns="expandData">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="success">
            <Icon type="md-checkmark-circle-outline" :size="12" />
            <span class="inline-middle ml5">通过</span>
          </Button>
          <Button type="error" class="ml10">
            <Icon type="ios-trash-outline" :size="12" />
            <span class="inline-middle ml5">删除</span>
          </Button>
          <Button class="ml10">
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
import expandRow from './comments-list-expand.vue'
export default {
  components: {
    expandRow,
  },
  data () {
    return {
      expandData: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
              return h(expandRow, {
                  props: {
                      row: params.row,
                  }
              })
          },
        },
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
          title: '留言内容',
          key: 'content',
          align: 'center',
        },
        {
          title: '发布日期',
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
      listData: [
        {
          name: 'Chance722',
          email: 'handsomelong722@163.com',
          content: 'hahaha',
          date: '2019-08-31 21:08',
          category: '留言墙',
          status: '待审核',
          system: 'Windows 10',
          browser: "Chrome 65",
          country: '中国',
          province: '广州',
          region: '番禺区',
          praise: 10,
        },
        {
          name: 'Chance722',
          email: 'handsomelong722@163.com',
          content: 'hahaha',
          date: '2019-08-31 21:08',
          category: '留言墙',
          status: '待审核',
          system: 'Windows 10',
          browser: "Chrome 65",
          country: '中国',
          province: '广州',
          region: '番禺区',
          praise: 10,
        }
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.comments-list {
  padding: 10px 0;
}
</style>