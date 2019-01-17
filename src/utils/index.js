const UTILS = {
  /**
  * [getParam ]
  * @param  {String} name
  * @param  {String} url   [default:location.href]
  * @return {String|Boolean}
  */
  getParam (name, url) {
    if (typeof name !== 'string') return false
    if (!url) url = window.location.href
    // 当遇到name[xx]时，对方括号做一下转义为 name\[xxx\]，因为下面还需要使用name做正则
    name = name.replace(/[[\]]/g, '\\$&')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    var results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  },

  /**
  * html转义（用于所有innerHTML操作）
  * @param html [string] html字符串片段
  * return 对所有非img标签（emoji）转义后的片段
  */
  htmlEncode (html) {
    return html.replace(/<(?!img class="emoji")(.+?)>/g, function (match, $1) {
      return '&lt;' + $1 + '&gt;'
    })
  },

  /**
  * val转义（用于对发送前IM文本转义）
  * @param val [string] 字符串片段
  * return 对< > " '转义后的片段
  */
  xssEncode (val) {
    val = val.replace(/[<]/g, '&lt;')
    val = val.replace(/[>]/g, '&gt;')
    // val = val.replace(/"/g, '&quot;') // im消息对象将所有"转化为&quot; 如果这里再转会破坏对象结构
    val = val.replace(/'/g, '&#039;')
    return val
  },

  /**
  * 获取ls item值
  * @param  {String} key 必须
  * @return {String} value
  */
  getItem (key) {
    let k = key
    let v = ''
    try {
      k = window.btoa(key)
    } catch (e) {
    }
    v = window.localStorage.getItem(k) || '' // atob(null) => 'ée' => JSON.parse('ée') => ERROR
    try {
      v = window.atob(v)
    } catch (e) {
      console.log(e)
    }
    return v
  },

  /**
  * 设置ls item值
  * @param  {String} key 必须
  * @param  {String} value 必须
  * @return undefined
  */
  setItem (key, value) {
    let k = key
    let v = value
    try {
      k = window.btoa(key)
      v = window.btoa(value)
    } catch (e) {
    }
    window.localStorage.removeItem(k) // ios bug,需先remove再set
    window.localStorage.setItem(k, v)
  },

  /**
  * 清除ls item值
  * @param  {String} key 必须
  * @param  {String} value 必须
  * @return undefined
  */
  removeItem (key) {
    let k = key
    try {
      k = window.btoa(key)
    } catch (e) {
    }
    window.localStorage.removeItem(k)
  },

  /**
  * 账号密码正则
  * @param  {string} 账号密码 必须
  * @return {boolern} 是否匹配
  */
  verifyPasscode (passcode) {
    return /^\S{6,20}$/.test(passcode)
  },

  /**
   * 格式化时间戳
   * @param {string} 时间戳字符串
   * @return {object} 时间信息
   */
  formatDate (dateStr) {
    let time = new Date(Number(dateStr))
    let y = time.getFullYear() // 年
    let m = time.getMonth() + 1 // 月
    m = m >= 10 ? m : '0' + m
    let d = time.getDate() // 日
    d = d >= 10 ? d : '0' + d
    let h = time.getHours() // 时
    h = h >= 10 ? h : '0' + h
    let mm = time.getMinutes() // 分
    mm = mm >= 10 ? mm : '0' + mm
    let s = time.getSeconds() // 秒
    s = s >= 10 ? s : '0' + s
    return `${y}-${m}-${d} ${h}:${mm}:${s}`
    // return {
    //   year: y,
    //   month: m,
    //   day: d,
    //   hour: h,
    //   minute: mm,
    //   second: s
    // }
  },
  /**
   * 判断参数是否为空
   * @param {...any} args
   * @return {boolean} isEmpty
   */
  isParamsEmpty (...args) {
    let isEmpty = false
    for (const arg of args) {
      if (arg === null || arg === undefined || arg === '') {
        isEmpty = true
        break
      }
    }
    return isEmpty
  },
  /**
  * 谷歌事件统计
  * @param  {String} eventCategory
  * @param  {String} eventAction
  * @param  {String} eventLabel
  * @return undefined
  */
  ga (eventCategory, eventAction, eventLabel) {
    try {
      window.ga('send', 'event', eventCategory, eventAction, eventLabel)
    } catch (e) { }
  },

  /**
  * 谷歌事件统计出站统计
  * @param  {String} eventCategory
  * @param  {String} eventAction
  * @param  {String} eventLabel
  * @return undefined
  */
  gaBeacon (eventCategory, eventAction, eventLabel, url) {
    try {
      window.ga('send', 'event', eventCategory, eventAction, eventLabel, {
        'transport': 'beacon',
        'hitCallback': function () { document.location = url }
      })
    } catch (e) { }
  }
}
export default UTILS
