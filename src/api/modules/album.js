import axios from '@/utils/axios'

export default {

  /**
   * @param {array} tags
   * @param {number} type
   * @param {number} state
   * @param {string} keywords
   * @param {number} pageIndex required
   * @param {number} pageSize required
   */
  listPictures ({ tags, type, state, keywords, pageIndex, pageSize }) {
    return axios.post('/api/album/listPictures', { tags, type, state, keywords, pageIndex, pageSize })
  },
  /**
   * @param {string} url required
   * @param {string} content required
   * @param {number} type required
   * @param {array} tags
   * @param {number} state
   * @param {string} address
   * @param {number} weather
   * @param {string} color
   */
  addPicture ({ url, content, tags, type, state, address, weather, color }) {
    return axios.post('/api/album/addPicture', { url, content, tags, type, state, address, weather, color })
  },
  /**
   * @param {string | number} id
   */
  deletePicture (id) {
    return axios.post('/api/album/deletePicture', { id })
  },
  /**
   * @param {number} id required
   * @param {string} url required
   * @param {string} content required
   * @param {number} type required
   * @param {number} state
   * @param {string} address
   * @param {number} weather
   * @param {string} color
   */
  updatePicture ({ id, url, content, type, tags, state, address, weather, color }) {
    return axios.post('/api/album/updatePicture', { id, url, content, type, tags, state, address, weather, color })
  },

  /**
   * @param {number} id required
   * @return {object} data
   */
  getPicture (id) {
    return axios.get(`/api/album/getPicture?id=${id}`)
  }

}
