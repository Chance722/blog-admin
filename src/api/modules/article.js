import axios from '@/utils/axios'

export default {
  /**
   * @param {string} blog_title required
   * @param {string} keywords
   * @param {string} tags
   * @param {string} content required
   * @param {number} status
   * @param {number} open
   * @param {number} category
   * @param {string} thumb
   * @return null
   */
  addArticle ({ blogTitle, keywords, tags, content, status, open, category, thumb, }) {
    return axios.post('/api/article/addArticle', {
      blog_title: blogTitle,
      keywords,
      tags,
      content,
      status,
      open,
      category,
      thumb, })
  },
  /**
   * @param {array} tags required
   * @param {array} category required
   * @param {number} open required
   * @param {number} status required
   * @param {string} blogTitle
   * @param {number} pageIndex required
   * @param {number} pageSize required
   * @return {object} { list, pageIndex, pageSize, total }
   */
  listArticles ({ tags, category, open, status, blogTitle, pageIndex, pageSize, }) {
    return axios.post('/api/article/listArticles', {
      blog_title: blogTitle,
      category,
      open,
      status,
      tags,
      pageIndex,
      pageSize, })
  },
  /**
   * @param {number | string} id required
   * @return null
   */
  deleteArticle (id) {
    return axios.post('/api/article/deleteArticle', { id, })
  },
  /**
   * @param {number} id required
   * @param {string} blog_title
   * @param {string} keywords
   * @param {string} tags
   * @param {string} content
   * @param {number} status
   * @param {number} open
   * @param {number} category
   * @param {string} thumb
   * @return null
   */
  updateArticle ({ id, blogTitle, keywords, tags, content, status, open, category, thumb, }) {
    return axios.post('/api/article/updateArticle', {
      id,
      blog_title: blogTitle,
      keywords,
      tags,
      content,
      status,
      open,
      category,
      thumb, })
  },
  /**
   * @param {number} id required
   * @return {object} data
   */
  getArticle (id) {
    return axios.get(`/api/article/getArticle?id=${id}`)
  },
}
