<template>
  <div class="user-setting" @blur="blurHandler">
    <section class="user-setting-top">
      <div class="setting-row">
        <div class="empty-img" :style="{'background-image': 'url('+ imageUrls[imageUrls.length - 1] +')'}">
          <Progress v-if="uploadList.length && uploadList[uploadList.length - 1].showProgress" :percent="uploadList[uploadList.length - 1].percentage" :stroke-width="5" hide-info />
        </div>
      </div>
      <div class="setting-row">
        <Upload
          ref="upload"
          class="align-center"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
          :data="qiniu"
          action="https://upload.qiniup.com/">
          <Button type="primary" icon="md-cloud-upload">更换</Button>
        </Upload>
      </div>
      <div class="setting-row">
        <p class="user-name">
          <template v-if="currentEdit === 'nameInput'">
            <Input ref="nameInput" v-model="name" class="w200" @on-blur="blurHandler"></Input>
          </template>
          <template v-else>
            <span class="mr20 inline-middle">{{ name }}</span>
            <Icon type="ios-create-outline" class="inline-middle pointer" @click="editHandler('nameInput')" />
          </template>
        </p>
      </div>
      <div class="setting-row">
        <p class="user-signature">
          <template v-if="currentEdit === 'signInput'">
            <Input ref="signInput" v-model="signature" class="w200" @on-blur="blurHandler"></Input>
          </template>
          <template v-else>
            <span class="mr20 inline-middle">{{ signature }}</span>
            <Icon :size="20" type="ios-create-outline" class="inline-middle pointer" @click="editHandler('signInput')" />
          </template>
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
          <template v-if="currentEdit === 'descInput'">
            <Input ref="descInput" type="textarea" v-model="description" class="w400" :rows="4" @on-blur="blurHandler"></Input>
          </template>
          <template v-else>
          <span>
            {{ description }}
            <Icon :size="20" type="ios-create-outline" class="inline-middle pointer ml5" @click="editHandler('descInput')" />
          </span>
          </template>
        </p>
      </div>
      <div class="setting-row">
        <div class="user-skills">
          <Icon
            type="md-pricetag"
            :size="22"
            color="#24292e"
            class="mr20" />
          <Tag
            v-for="(item, index) in skills"
            :key="'skill_' + index"
            type="border"
            closable
            class="inline-middle"
            @on-close="handleSkillClose(e, item)">{{ item }}</Tag>
          <p class="add-wrapper">
            <Input size="small" v-model="addskill" placeholder="添加技能" class="w150">
              <Button size="small" slot="append" @click="handleAdd('skill')">添加技能</Button>
            </Input>
          </p>
        </div>
      </div>
      <div class="setting-row">
        <div class="user-hobies">
          <Icon
            type="md-heart"
            :size="22"
            color="#f32706"
            class="mr20" />
          <Tag 
            v-for="(item, index) in hobies" 
            :key="'hoby_' + index" 
            type="border" 
            closable
            @on-close="handleHobyClose(e, item)">{{ item }}</Tag>
          <p class="add-wrapper">
            <Input size="small" v-model="addhoby" placeholder="添加爱好" class="w150">
              <Button size="small" slot="append" @click="handleAdd('hoby')">添加爱好</Button>
            </Input>
          </p>
        </div>
      </div>
      <div class="setting-row">
        <p class="user-address">
          <Icon
            type="ios-navigate"
            :size="22"
            color="#f90"
            class="mr20" />
          <template v-if="currentEdit === 'addressInput'">
            <Input ref="addressInput" v-model="address" class="w200" @on-blur="blurHandler"></Input>
          </template>
          <template v-else>
            <span class="mr20 inline-middle">{{ address }}</span>
            <Icon :size="20" type="ios-create-outline" class="inline-middle pointer" @click="editHandler('addressInput')" />
          </template>
        </p>
      </div>
      <div class="setting-row">
        <p class="user-company">
          <Icon
            type="md-contacts"
            :size="22"
            color="#515a6e"
            class="mr20" />
          <template v-if="currentEdit === 'companyInput'">
            <Input ref="companyInput" v-model="company" class="w200" @on-blur="blurHandler"></Input>
          </template>
          <template v-else>
            <span class="mr20 inline-middle">{{ company }}</span>
            <Icon :size="20" type="ios-create-outline" class="inline-middle pointer" @click="editHandler('companyInput')" />
          </template>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import upload from '@/mixins/upload'
import config from '@/config'

export default {
  mixins: [
    upload,
  ],
  data () {
    return {
      uploadList: [],
      name: 'Chance722',
      signature: 'Nothing is impossible.',
      description: '2019 的对于 5G 的讨论比以往来得更猛一些，从中美贸易战再到华为被美国列入实体黑名单，5G 的话题更多走进了我们的生活，5G 时代的渐渐到来可以带来很多方面的变化，上网速度加快是其中一个表现。',
      skills: ['Vuejs', 'Nodejs', 'Angular', 'React', 'Flutter'],
      hobies: ['搬砖', 'K歌', '逆天邪神' , 'lol'],
      address: '广东广州 番禺区',
      company: 'YY Inc',
      currentEdit: '',
      addhoby: '',
      addskill: '',
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  },
  methods: {
    blurHandler () {      
      this.currentEdit = ''
    },
    editHandler (name) {
      this.currentEdit = name
      this.$nextTick(() => {
        this.$refs[name].focus()
      })
    },
    handleSuccess (res, file) {
      if (file && file.status === 'finished') {
        this.imageUrls.push(config.qiniuDomain + res.key)
        console.log(this.imageUrls)
      }
    },
    handleAdd (name) {
      let handleArray = []
      let addTag = ''
      if (name === 'skill') {
        handleArray = this.skills
        addTag = this.addskill
      } else if (name === 'hoby') {
        handleArray = this.hobies
        addTag = this.addhoby
      }

      if (!handleArray.includes(addTag)) handleArray.push(addTag)
    },
    handleSkillClose (event, name) {
      const index = this.skills.indexOf(name)
      if (index !== -1) this.skills.splice(index, 1)
    },
    handleHobyClose (event, name) {
      const index = this.hobies.indexOf(name)
      if (index !== -1) this.hobies.splice(index, 1)
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

    .add-wrapper {
      display: inline-block;
      vertical-align: middle;
    }

    .ivu-tag{
      margin: 6px 2px!important;
    }
    .ivu-input-wrapper {
      margin-top: -1px;
      margin-left: 2px;
    }
  }

  &-top {
    margin-bottom: 30px;
    .empty-img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: #001529;
      background-size: cover;
      display: flex;
      align-items: center;
      justify-content: center;

      .ivu-progress {
        width: 80%;
      }
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