import axios from '@/libs/axios'

export default {

  /**
   * @param {number} post_id required
   * @param {number} pid required
   * @param {string} content required
   * @param {string} author_name required
   * @param {string} author_email required
   * @param {string} homepage
   */
  leaveComment ({ postId, pid, content, authorName, authorEmail, homepage, }) {
    return axios.post('/api/comment/leaveComment', {
      post_id: postId,
      pid,
      content,
      author_name: authorName,
      author_email: authorEmail,
      homepage,
    })
  },

  /**
   * @param {number} type requried 0: 留言 1: 文章评论 2: 所有
   * @param {number} state required 0: 不通过 1: 通过
   * @param {string} keywords
   * @param {number} pageIndex
   * @param {number} pageSize
   * @return {object} { list, pageIndex, pageSize, total }
   */
  listComments ({ type, state, keywords, pageIndex, pageSize, }) {
    return axios.post('/api/comment/listComments', { type, state, keywords, pageIndex, pageSize, })
  },
  /**
   * @param {number} id required
   * @param {number} state required
   * @return null
   */
  setState ({ id, state, }) {
    return axios.patch('/api/comment/setState', { id, state, })
  },
}
