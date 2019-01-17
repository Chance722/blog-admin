import axios from '@/utils/axios'

export default {
  /**
   * @param null
   * @return {object} token
   */
  getToken () {
    return axios.get('/api/qiniu/getToken')
  }
}
