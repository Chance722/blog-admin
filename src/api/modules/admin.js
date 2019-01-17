import axios from '@/utils/axios'

export default {
  /**
   * @param {string} name
   * @param {string} pwd
   * @return {object} data
   */
  login (name, pwd) {
    return axios.post('/api/admin/login', { name, pwd })
  },
  /**
   * @param {string} name required
   * @param {string} nickname required
   * @param {string} signature required
   * @param {string} old_pwd required
   * @param {string} new_pwd required
   * @param {string} avator required
   * @return {object} { id, name, token, avator }
   */
  saveUserInfo ({ name, nickname, signature, oldPwd, newPwd, pwd, imageUrl }) {
    return axios.post('/api/admin/saveUserInfo', {
      name,
      nickname,
      signature,
      old_pwd: oldPwd,
      new_pwd: newPwd,
      pwd,
      avator: imageUrl })
  },
  saveBaseInfo ({ blogTitle, pageTitle, keywords, blogAddress, blogDesc, email, icpNumbers }) {
    return axios.post('/api/admin/saveBaseInfo', {
      blog_title: blogTitle,
      page_title: pageTitle,
      keywords,
      blog_address: blogAddress,
      blog_desc: blogDesc,
      email,
      icp_numbers: icpNumbers })
  },
  /**
   * @param null
   * @return {object}
   */
  getSettingInfo () {
    return axios.get('/api/admin/getSettingInfo')
  }
}
