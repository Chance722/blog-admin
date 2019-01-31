import admin from './modules/admin'
import properties from './modules/properties'
import qiniu from './modules/qiniu'
import article from './modules/article'
import comment from './modules/comment'
import album from './modules/album'
import user from './modules/user'
import statistics from './modules/statistics'

export default {
  ...admin,
  ...properties,
  ...qiniu,
  ...article,
  ...comment,
  ...album,
  ...user,
  ...statistics
}
