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
   * @param {string} avator required
   * @return {object} { id, name, token, avator }
   */
  saveUserInfo ({ name, nickname, signature, imageUrl }) {
    return axios.post('/api/admin/saveUserInfo', {
      name,
      nickname,
      signature,
      avator: imageUrl })
  },
  saveUserPwd ({ newPwd, oldPwd, pwd }) {
    return axios.post('/api/admin/saveUserPwd', {
      new_pwd: newPwd,
      old_pwd: oldPwd,
      pwd
    })
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
