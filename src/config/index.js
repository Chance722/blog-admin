export default {
  /**
   * @description token 字段名称
   */
  blogAdminAccessToken: 'BLOGADMIN_ACCESS_TOKEN',
  /**
   * @description 七牛域名
   */
  qiniuDomain: `${location.protocol}//px90k98ve.bkt.clouddn.com/`,
  /**
   * @description token过期 字段名称
   */
  blogAdminTokenTime: 'BLOGADMIN_TOKEN_TIME',
  /**
   * @description token过期时间 24h
   */
  expiredTime: 24,
  /**
   * @description 用户信息字段
   */
  blogAdminData: 'BLOGADMIN_DATA',
  /**
   * @description 时间统计类型字段
   */
  dateStatType: {
    RecentWeek: 1,
    RecentMonth: 2,
    RecentThreeMonths: 3,
    RecentHalfYear: 4,
    RecentYear: 5,
  },
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: 'http://localhost:3000',
    pro: 'http://localhost:3000',
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    // 'error-store': {
    //   showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
    //   developmentOff: false // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    // }
  },
}
