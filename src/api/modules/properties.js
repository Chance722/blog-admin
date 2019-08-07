import axios from '@/libs/axios'

export default {
  /**
   * @param null
   * @return {array} list
   */
  listAllTags () {
    return axios.get('/api/tag/listAllTags')
  },
  /**
   * @param {number} pageIndex required
   * @param {number} pageSize required
   * @param {string} tagName
   * @return {object} { list, pageIndex, pageSize, total }
   */
  listTags ({ pageIndex, pageSize, tagName, type, }) {
    return axios.post('/api/tag/listTags', { pageIndex, pageSize, tagName, type, })
  },
  /**
   * @param {string} name required
   * @param {string} description required
   * @param {string} thumb
   * @param {number} type required
   * @return null
   */
  addTag ({ name, description, thumb, type, }) {
    return axios.post('/api/tag/addTag', { name, description, thumb, type, })
  },
  /**
   * @param {string} name required
   * @param {string} description required
   * @param {string} thumb
   * @param {number} type required
   * @param {number} id required
   * @return null
   */
  updateTag ({ name, description, thumb, type, id, }) {
    return axios.post('/api/tag/updateTag', { name, description, thumb, type, id, })
  },
  /**
   * @param {number | string} id required
   * @return null
   */
  deleteTag (id) {
    return axios.post('/api/tag/deleteTag', { id, })
  },
  /**
 * @param null
 * @return {array} list
 */
  listAllTypes () {
    return axios.get('/api/category/listAllTypes')
  },
  /**
   * @param {number} pageIndex required
   * @param {number} pageSize required
   * @param {string} typeName
   * @param {number} type required
   * @return {object} { list, pageIndex, pageSize, total }
   */
  listTypes ({ pageIndex, pageSize, typeName, type, }) {
    return axios.post('/api/category/listTypes', { pageIndex, pageSize, typeName, type, })
  },
  /**
   * @param {string} name required
   * @param {string} description required
   * @param {string} thumb
   * @param {number} type required
   * @return null
   */
  addType ({ name, description, thumb, type, }) {
    return axios.post('/api/category/addType', { name, description, thumb, type, })
  },
  /**
   * @param {string} name required
   * @param {string} description required
   * @param {string} thumb
   * @param {number} type required
   * @param {number} id required
   * @return null
   */
  updateType ({ name, description, thumb, type, id, }) {
    return axios.post('/api/category/updateType', { name, description, thumb, type, id, })
  },
  /**
   * @param {number | string} id required
   * @return null
   */
  deleteType (id) {
    return axios.post('/api/category/deleteType', { id, })
  },
}
