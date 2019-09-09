<template>
  <div class="user-setting">
    <section class="user-setting-top">
      <div class="setting-row">
        <div class="empty-img" />
      </div>
      <div class="setting-row">
        <Upload
          class="align-center"
          action="https://upload.qiniup.com/">
          <Button type="primary" icon="md-cloud-upload">更换</Button>
        </Upload>
      </div>
      <div class="setting-row">
        <p class="user-name">
          <template v-if="currentEdit === 'name'">
            <Input v-model="name" class="w200" @on-blur="blurHandler"></Input>
          </template>
          <template v-else>
            <span class="mr20 inline-middle">{{ name }}</span>
            <Icon type="ios-create-outline" class="inline-middle pointer" @click="currentEdit = 'name'" />
          </template>
        </p>
      </div>
      <div class="setting-row">
        <p class="user-signature">
          <span class="mr20 inline-middle">{{ signature }}</span>
          <Icon :size="20" type="ios-create-outline" class="inline-middle pointer" />
        </p>
      </div>
    </section>
    <section class="user-setting-bottom">
      <div class="setting-row">
        <p class="user-description">
          <Icon
            type="md-person"
            :size="22"
            color="#42a0f8"
            class="mr20" />
          <span>2019 的对于 5G 的讨论比以往来得更猛一些，从中美贸易战再到华为被美国列入实体黑名单，5G 的话题更多走进了我们的生活，5G 时代的渐渐到来可以带来很多方面的变化，上网速度加快是其中一个表现。</span>
        </p>
      </div>
      <div class="setting-row">
        <p class="user-skills">
          <Icon
            type="md-pricetag"
            :size="22"
            color="#24292e"
            class="mr20" />
          <Tag type="border" closable>Vuejs</Tag>
          <Tag type="border" closable>Nodejs</Tag>
          <Tag type="border" closable>Angular</Tag>
          <Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加技能</Button>
        </p>
      </div>
      <div class="setting-row">
        <p class="user-hobies">
          <Icon
            type="md-heart"
            :size="22"
            color="#f32706"
            class="mr20" />
          <Tag type="border" closable>搬砖</Tag>
          <Tag type="border" closable>K歌</Tag>
          <Tag type="border" closable>逆天邪神</Tag>
          <Tag type="border" closable>LOL</Tag>
          <Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加爱好</Button>
        </p>
      </div>
      <div class="setting-row">
        <p class="user-address">
          <Icon
            type="ios-navigate"
            :size="22"
            color="#f90"
            class="mr20" />
          <span class="mr20 inline-middle">{{ address }}</span>
          <Icon :size="20" type="ios-create-outline" class="inline-middle pointer" />
        </p>
      </div>
      <div class="setting-row">
        <p class="user-company">
          <Icon
            type="md-contacts"
            :size="22"
            color="#515a6e"
            class="mr20" />
          <span class="mr20 inline-middle">{{ company }}</span>
          <Icon :size="20" type="ios-create-outline" class="inline-middle pointer" />
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'Chance722',
      signature: 'Nothing is impossible.',
      address: '广东广州 番禺区',
      company: 'YY Inc',
      currentEdit: '',
    }
  },
  methods: {
    blurHandler (name) {
      this.currentEdit = ''
      console.log(this.$refs)
      // this.$nextTick(() => {
      //   this.$refs[name].focus()
      // })
    },
  },
}
</script>

<style lang="scss" scoped>
.user-setting {
  padding-top: 20px;

  .setting-row {
    margin: 0 auto;
    width: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 15px;
  }

  &-top {
    margin-bottom: 30px;
    .empty-img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: #001529;
    }

    .user-name {
      font-size: 20px;
      font-weight: bold;
    }

    .user-signature {
      font-size: 16px;
      color: gray;
    }
  }

  &-bottom {
    .user-description {
      color: #2b2b2b;
      font-size: 14px;
      display: flex;
    }
  }
}
</style>