import axios from '@/utils/axios'

export default {
  /**
   * @param {string} name required
   * @param {string} email required
   * @param {number} status required
   * @return null
   */
  setUserStatus ({ id, status }) {
    return axios.post(`/api/user/setStatus`, {
      id,
      status
    })
  }
}
