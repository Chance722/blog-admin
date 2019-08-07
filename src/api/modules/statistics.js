import axios from '@/utils/axios'

export default {
  /**
   * @param {string} name
   * @param {number} type
   * @return {object} list
   */
  getDataByDate (type, name) {
    return axios.post('/api/statistics/getDataByDate', {
      name, type,
    })
  },
}
