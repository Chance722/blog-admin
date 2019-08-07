import axios from '@/libs/axios'

export default {
  /**
   * @description 登录
   * @param {string} name 账户
   * @param {string} pwd 密码
   */
  login (name, pwd) {
    return axios.post('/api/admin/login', { name, pwd, })
  },
  /**
   * @description 保存用户信息
   * @param {string} name 名字
   * @param {string} nickname 昵称
   * @param {string} signature 签名
   * @param {string} avator 头像
   */
  saveUserInfo ({ name, nickname, signature, imageUrl, }) {
    return axios.post('/api/admin/saveUserInfo', {
      name,
      nickname,
      signature,
      avator: imageUrl, })
  },
  /**
   * @description 保存修改用户密码
   * @param {string} newPwd 新密码
   * @param {string} oldPwd 旧密码
   * @param {string} pwd 确认密码
   */
  saveUserPwd ({ newPwd, oldPwd, pwd, }) {
    return axios.post('/api/admin/saveUserPwd', {
      new_pwd: newPwd,
      old_pwd: oldPwd,
      pwd,
    })
  },
  /**
   * @description 保存站点基本信息
   * @param {string} blogTitle 博客标题
   * @param {string} pageTitle 页面标题
   * @param {string} keywords 关键字
   * @param {string} blogAddress 博客地址
   * @param {string} blogDesc 博客描述
   * @param {string} email 邮箱
   * @param {string} icpNumbers 备案号
   */
  saveBaseInfo ({ blogTitle, pageTitle, keywords, blogAddress, blogDesc, email, icpNumbers, }) {
    return axios.post('/api/admin/saveBaseInfo', {
      blog_title: blogTitle,
      page_title: pageTitle,
      keywords,
      blog_address: blogAddress,
      blog_desc: blogDesc,
      email,
      icp_numbers: icpNumbers, })
  },
  /**
   * @description 获取设置信息
   */
  getSettingInfo () {
    return axios.get('/api/admin/getSettingInfo')
  },
}
