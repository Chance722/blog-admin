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
  savePwd ({ newPwd, oldPwd, pwd, }) {
    return axios.post('/api/admin/savePwd', {
      new_pwd: newPwd,
      old_pwd: oldPwd,
      pwd,
    })
  },
  /**
   * @description 保存站点基本信息
   * @param {object} params 任意保存入参
   */
  updateInfo (params) {
    return axios.post('/api/admin/updateInfo', params)
  },
  /**
   * @description 获取设置信息
   */
  getInfo () {
    return axios.get('/api/admin/getInfo')
  },
}
