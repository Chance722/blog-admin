const PROTOCOL = location.protocol
export const BASE_URL = 'http://localhost:3000'
export const DEVELOP_BASE_URL = 'http://localhost:3000'
export const QINIU_DOMAIN = `${PROTOCOL}//plh0ed9u2.bkt.clouddn.com/`
// token 字段名称
export const BLOGADMIN_ACCESS_TOKEN = 'BLOGADMIN_ACCESS_TOKEN'
// token过期 字段名称
export const BLOGADMIN_TOKEN_TIME = 'BLOGADMIN_TOKEN_TIME'
// token过期时间 24h
export const EXPIRED_TIME = 24
// 用户信息字段
export const BLOGADMIN_DATA = 'BLOGADMIN_DATA'

export const DATE_STAT_TYPE = {
  'RECENT_WEEK': 1,
  'RECENT_MONTH': 2,
  'RECENT_THREE_MONTH': 3,
  'RECENT_HALF_YEAR': 4,
  'RECENT_YEAR': 5
}
