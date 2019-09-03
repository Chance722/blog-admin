import { mapState } from 'vuex'
import config from '../config'

export default {
  data () {
    return {
      imageUrls: [],
      percent: 0,
      qiniu: {
        token: '',
        // key: '',
      },
      fileNames: [],
    }
  },
  computed: {
    ...mapState([
      'uploadToken',
    ]),
  },
  created () {
    this.getUploadToken()
  },
  methods: {
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      let fileName = file.name
      if (fileName.length > 10) {
        fileName = fileName.substring(0, 10)
      }
      fileName = fileName.replace(/.png|.jpg|.jpeg/, '') + new Date().getTime()
      // this.qiniu.key = isJPG ? fileName + '.jpg' : fileName + '.png'
      this.fileNames.push(isJPG ? fileName + '.jpg' : fileName + '.png')
      const isJPNG = isJPG || isPNG
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isJPNG) {
        this.$Message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt10M) {
        this.$Message.error('上传图片大小不能超过 10MB!')
      }
      return isJPNG && isLt10M
    },
    handleFormatError () {
      this.$Message.error('上传图片只能是 jpg/png 格式!')
      return
    },
    handleMaxSize (size) {
      const maxsize = size || 1024
      this.$Message.error(`上传图片大小不能超过 ${maxsize * 10 / 1024}MB!`)
    },
    handleProgress (e) {
      this.percent = Math.floor(e.percent)
    },
    handleSuccess (res, file) {
      if (file && file.status === 'finished') {
        this.imageUrls.push(config.qiniuDomain + res.key)
        console.log(this.imageUrls)
      }
    },
    async getUploadToken () {
      if (this.uploadToken) {
        this.qiniu.token = this.uploadToken
        return
      }
      const res = await $api.getToken()
      if (res.code === 200 && res.success) this.qiniu.token = res.data.token
    },
  },
}