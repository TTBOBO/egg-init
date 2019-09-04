/*
 * @Author:    涂爱波
 * @Created:   2018-09-29
 */

let util = {
  str: {
    /**
     * 动态创建 <script>
     */
    async createScript(url) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = url + '?_=' + new Date().getTime()
        script.onload = () => {
          resolve()
        }
        script.onerror = e => {
          reject(e)
        }
        document.body.appendChild(script)
      })
    },
    /**
     * HTML 实体字符转义
     */
    htmlEncode(str) {
      let s = ''
      if (str.length === 0) {
        return ''
      }
      s = str.replace(/&/g, '&amp;')
      s = str.replace(/>/g, '&gt;')
      s = str.replace(/</g, '&lt;')
      s = str.replace(/\s/g, '&nbsp;')
      // s = str.replace(/\'/g, '&#39;')
      // s = str.replace(/\"/g, '&quot;')
      s = str.replace(/\n/g, '<br>')
      return s
    },
    /**
     * 如何优雅的实现金钱格式化
     * 1234567890 --> 1,234,567,890
     * @return {[type]}       [description]
     */
    formatMoney(str = '1234567890') {
      return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',') // 1,234,567,890

      // return str.split('').reverse().reduce((prev, next, index) => {
      // return ((index % 3) ? next : (next + ',')) + prev
      // })
    }
  },
  time: {
    /**
     * 获取当前时间
     * 2017-08-11 22:52:13 星期六
     * @param  {Boolean} hasDay  是否需要年月日
     * @param  {Boolean} hasHour 是否需要十分秒
     * @param  {Boolean} hasWeek 是否需要星期
     * @param  {String} sign1 分隔符
     * @param  {String} sign2 分隔符
     */
    getNowDate(
      hasDay = true,
      hasHour = true,
      hasWeek = false,
      sign1 = '-',
      sign2 = ':'
    ) {
      let date = new Date()
      let year = date.getFullYear()
      let month = (date.getMonth() + 1).toString().padStart(2, '0')
      let day = date
        .getDate()
        .toString()
        .padStart(2, '0')
      let hour = date
        .getHours()
        .toString()
        .padStart(2, '0')
      let minutes = date
        .getMinutes()
        .toString()
        .padStart(2, '0')
      let seconds = date
        .getSeconds()
        .toString()
        .padStart(2, '0')
      let weekArr = [
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
        '星期天'
      ]
      let week = weekArr[date.getDay()]

      let time1 = hasDay ? `${year}${sign1}${month}${sign1}${day}` : ''
      let time2 = hasHour ? `${hour}${sign2}${minutes}${sign2}${seconds}` : ''
      let time3 = hasWeek ? `${week}` : ''

      return `${time1} ${time2} ${time3}`.replace(/(^\s*)|(\s*$)/g, '')
    },

    /**
     * 格式化时间戳 (分:秒)
     * 61 -> 01:01
     * @param  {Number} timestamp 时间戳
     * @param  {String} sign      分隔符，默认 :
     * @return {[type]}           [description]
     */
    format(timestamp, sign = ':') {
      timestamp = Math.floor(timestamp)

      let minute = Math.floor(timestamp / 60)
        .toString()
        .padStart(2, '0')
      let second = (timestamp % 60).toString().padStart(2, '0')
      return `${minute}${sign}${second}`
    },

    /**
     * 倒计时
     * countDown('2017-8-11 24:0:0') -> 剩余0天0小时54分钟41秒
     * @param  {Date} endTime 结束时间
     * @return {[type]}         [description]
     */
    countDown(endTime) {
      let start = new Date()
      let end = new Date(endTime)
      let dif = end.getTime() - start.getTime()

      let d = 0
      let h = 0
      let m = 0
      let s = 0

      if (dif >= 0) {
        d = Math.floor(dif / 1000 / 3600 / 24)
        h = Math.floor((dif / 1000 / 60 / 60) % 24)
        m = Math.floor((dif / 1000 / 60) % 60)
        s = Math.floor((dif / 1000) % 60)
      }

      return `仅剩${d}天${h}小时${m}分钟${s}秒`
    },
    /**
     *
     * @param {type} num
     * @param {type} preNum
     * @returns {Number}向下取整获取百分比
     */
    fixNumber: function(num, preNum) {
      if (num <= 0) {
        return preNum
      }
      return Math.ceil(num / preNum) * preNum
    },
    /**
     * 转换为日期对象
     */
    toDate: function(str) {
      if (typeof str === 'number') {
        return new Date(str)
      } else if (typeof str === 'string') {
        var date = new Date(str.replace(/-/g, '/'))
        return date
      } else {
        return str
      }
    },
    /**
     * 根据时间戳转时间
     */
    getNowTime: function(timeStr, statu = false, str = '-') {
      if (!timeStr) {
        return '' //请传入时间
      }
      // var time = new Date(time * 1000);
      var time = new Date(timeStr)
      let month =
        time.getMonth() + 1 < 10
          ? '0' + (time.getMonth() + 1)
          : time.getMonth() + 1
      let data = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
      let getMilliseconds =
        time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
      let getMinutes =
        time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
      let getHours =
        time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
      if (statu) {
        time =
          time.getFullYear() +
          '' +
          month +
          '' +
          data +
          '' +
          getHours +
          '' +
          getMinutes +
          '' +
          getMilliseconds
        // time = (time.getFullYear() + "-" + month + "-" + data + " " + getHours + ":" + getMinutes + ":" + getMilliseconds);
      } else {
        time =
          time.getFullYear() +
          str +
          month +
          str +
          data +
          ' ' +
          getHours +
          ':' +
          getMinutes +
          ':' +
          getMilliseconds
      }
      return time
    },
    getStartTime: function() {
      let start = new Date()
      start.setHours(0)
      start.setMinutes(0)
      start.setSeconds(0)
      start.setMilliseconds(0)
      return Date.parse(start) / 1000
    },
    /**
     * 根据时间转时间戳
     */
    getTime: function(time, statu) {
      if (statu) {
        return parseInt(time / 1000)
      } else {
        time = time
          .split('-')
          .reverse()
          .join('-')
        return parseInt(new Date(time) / 1000)
      }
    },
    /**
     * @param {type} date
     * @returns {String}日期格式化
     */
    toDateString: function(date) {
      var it = this
      var hdate = it.formatDate(it.toDate(date), 'M月d日')
      var btDate =
        Number(it.formatDate(it.toDate(date), 'yyyyMMdd')) -
        Number(it.formatDate(new Date(), 'yyyyMMdd'))
      if (btDate === 0) {
        hdate = '今天 ' + hdate
      } else if (btDate === 1) {
        hdate = '明天 ' + hdate
      } else if (btDate === 2) {
        hdate = '后天 ' + hdate
      } else if (btDate === -1) {
        hdate = '昨天 ' + hdate
      } else if (btDate === -2) {
        hdate = '前天 ' + hdate
      } else {
        hdate = it.formatDate(it.toDate(date), 'EE M月d日')
      }
      return hdate
    },
    /**
     * 根据毫秒计算年月日时分秒毫秒
     * @param {type} time1
     * @returns {String|Number}
     */
    timeLeft: function(time1, fixedTime, formtStr) {
      var it = this
      if (!formtStr) {
        formtStr = 'hh:mm:ss.S'
      }
      if (Number(time1) <= 0) {
        return -1
      }
      var time = Number(time1) - new Date().getTime() + fixedTime
      if (time > 0) {
        time = time - 1000 * 60 * 60 * 8
        var dateTime = new Date(time)
        var d = Math.floor(time / (24 * 60 * 60 * 1000))
        var timeStr = it.formatDate(dateTime, formtStr)
        if (d > 0) {
          timeStr = d + '天' + timeStr
        }
        return timeStr
      } else {
        return 0
      }
    }
  },
  version: function() {
    var userAgent = navigator.userAgent //取得浏览器的userAgent字符串
    var isIE =
      userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1
    console.log(isIE)
  },
  setCookie: function(name, value, day) {
    var Days = day ? day : 30 //默认30天
    var exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie =
      name + '=' + escape(value) + ';path=/;expires=' + exp.toGMTString()
  },
  getCookie: function(name) {
    var arrstr = document.cookie.split('; ')
    for (var i = 0; i < arrstr.length; i++) {
      var temp = arrstr[i].split('=')
      if (temp[0] == name) return unescape(temp[1])
    }
  },
  delCookie: function(name) {
    var it = this
    var date = new Date()
    date.setTime(date.getTime() - 10000)
    var cval = it.getCookie(name)
    if (cval != null)
      document.cookie = name + '=' + cval + '; expires=' + date.toGMTString()
  },
  setLocalStorage: function(name, value) {
    localStorage.setItem(name, value)
  },
  setLocalStorage_mul: function(option) {
    for (var i in option) {
      localStorage.setItem(i, option[i])
    }
  },
  getLocalStorage: function(name) {
    return localStorage.getItem(name)
  },
  delLocalStorage: function(name) {
    localStorage.removeItem(name)
  },
  clearLocalStorage: function() {
    localStorage.clear()
  },
  setSessionStorage: function(name, vlaue) {
    localStorage.setItem(name, vlaue)
    // sessionStorage.setItem(name, vlaue);
  },
  getSessionStorage: function(name) {
    // console.log(localStorage.getItem(name))
    return localStorage.getItem(name)
    // return sessionStorage.getItem(name);
  },
  clearSessionStorage: function() {
    localStorage.clear()
  },
  delSessionStorage: function(name) {
    sessionStorage.removeItem(name)
  },
  //清楚obj属性值   登录注册 操作后需清空
  clearObj: function(obj) {
    let _obj = JSON.parse(JSON.stringify(obj))
    for (var i in _obj) {
      _obj[i] = ''
    }
    return _obj
  },
  //传入节点   复制
  copy(el) {
    var range = document.createRange()
    var end = el.childNodes.length
    range.setStart(el, 0)
    range.setEnd(el, end)
    var selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
    document.execCommand('copy', false, null)
    selection.removeRange(range)
  },
  /**
   *
   * @param {*Promise} Arr
   * 根据form表单组合的validate 全部true  返回true  反之 返回false
   */
  getAllStatus(Arr) {
    return new Promise((resolve, reject) => {
      Promise.all(Arr).then(res => {
        res.filter(item => item).length != res.length
          ? reject('部分必填项没有输入！')
          : resolve(true)
      })
    })
  },
  initValidate(option) {
    var obj = {}
    var validateNum = ''
    var verifyArr = {
      password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'], //密码
      tel: [
        /^1[3|4|5|8][0-9]\d{4,8}$/,
        '不是完整的11位手机号或者正确的手机号前七位'
      ], //手机号
      gtNum: [/^\d+$/, '请填写非负数'], //非负数
      pInt: [/^[0-9]*[1-9][0-9]*$/, '请填写正整数'], //正整数
      stre: [/^[A-Za-z]+$/, '请填写英文'], //英文
      streB: [/^[A-Z]+$/, '请填写大写英文'], //大写英文
      streS: [/^[a-z]+$/, '请填写小写英文'], //小写英文
      email: [/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, '请填写正确的邮箱'], //邮箱
      url: [/[a-zA-z]+:\/\/[^\s]* /, '请填写正确的url地址'], //url
      qq: [/^\d{5,10}$/, '请填写正确的qq'], //qq
      idCard: [/\d{15}|\d{18}/, '请填写正确的身份证'], //身份证
      // idCard: [/\d+\.\d+\.\d+\.\d+ /, "请填写正确的ip"], //ip地址
      mzero: [/^[1-9]\d*(\.\d+)?$/, '请输入大于零的数'], //大于零包含小数
      yzCode: [/^\d{6}$/, '请输入6位数字验证码'] ///挺大的
    }
    if (!option.valideDate) {
      return false
    }
    option.valideDate.forEach(item => {
      // 例如  validate 传入 自定义 [/^[A-Za-z]+$/, "请填写英文"]   或者传入  verifyArr里面的某个属性时
      if (verifyArr[item.validate] || typeof item.validate == 'object') {
        let varify =
          typeof item.validate == 'object'
            ? item.validate
            : verifyArr[item.validate]
        validateNum = (rule, value, callback) => {
          !varify[0].test(value)
            ? callback(new Error(item.msg ? item.msg : varify[1]))
            : callback() //返回验证错误信息
        }
        obj[item.field] = [
          {
            required: true,
            validator: validateNum,
            trigger: item.blur || 'blur' //默认设置 blur
          }
        ]
      } else if (item.validate == 'required' || item.validate == 'json') {
        if (
          !item.multiple &&
          item.type != 'upload' &&
          item.type != 'checkbox' &&
          item.validate != 'json'
        ) {
          //单选下拉是字符串
          validateNum = (rule, value, callback) => {
            value === undefined || value === null || value === ''
              ? callback(new Error('不能为空!'))
              : callback()
          }
          obj[item.field] = [
            {
              required: true,
              validator: validateNum,
              message:
                item.msg ||
                (item.type == 'input' || !item.type ? '请填写' : '请选择') +
                  item.title,
              trigger:
                item.blur || item.type == 'select' || item.type == 'checkbox'
                  ? 'change'
                  : 'blur'
            }
          ]
        } else if (item.validate == 'json') {
          validateNum = (rule, value, callback) => {
            try {
              typeof JSON.parse(value) === 'object'
                ? callback()
                : callback(new Error('请输入json字符串数据!'))
            } catch (err) {
              callback(new Error('请输入json字符串数据!'))
            }
          }
          obj[item.field] = [
            {
              required: true,
              validator: validateNum,
              type: item.validate,
              trigger:
                item.type == 'select' || item.type == 'checkbox'
                  ? 'change'
                  : 'blur'
            }
          ]
        } else if (
          item.type == 'upload' ||
          (item.type == 'select' && item.multiple) ||
          item.type == 'checkbox'
        ) {
          //单选下拉是字符串
          validateNum = (rule, value, callback) => {
            value.length ? callback() : callback(new Error('不能为空!'))
          }

          obj[item.field] = [
            {
              required: true,
              validator: validateNum,
              message: item.msg || '请选择' + item.title,
              trigger:
                item.type == 'select' || item.type == 'checkbox'
                  ? 'change'
                  : 'blur'
            }
          ]
        }
      } else {
        if (item.validate) {
          obj[item.field] = [
            {
              required: true,
              type: item.validate,
              message: item.msg || '请选择' + item.title,
              trigger:
                item.type == 'select' || item.type == 'checkbox'
                  ? 'change'
                  : 'blur'
            }
          ]
        }
      }
      //加入自定义组件
      if (option.CustomValidata[item.field]) {
        if (!obj[item.field]) {
          obj[item.field] = []
          obj[item.field].push(option.CustomValidata[item.field])
        } else {
          obj[item.field].push(option.CustomValidata[item.field])
        }
      }
    })
    return obj
  },
  //status 1 option:{0:"测试",1:"测试1"}   转化成  [{value:0,label:'测试'},{value:1,label:'测试1'}]
  //status 2 ["bolansu","hytondeng"]  转化成  [{value:'bolansu',label:'bolansu'},{value:"hytondeng",label:'hytondeng'}]
  //status 3 {Abnormal: {label: "异常", value: "Abnormal"},Deleting: {label: "删除中", value: "Deleting"}} 转化成  [{value:'Abnormal',label:'异常'},{value:"Deleting",label:'删除中'}]
  //status 4 [{name:"张三",id:1}] 转化成 [{label:"张三",value:1}]
  getSelectOpt(data = [], status, params = {}) {
    let optArr = []
    console.log(data)
    const { colKey, colName } = params
    for (var i in data) {
      optArr.push({
        value: status == 2 ? data[i] : status == 4 ? data[i][colKey] : i,
        label:
          status == 1 || status == 2
            ? data[i]
            : status == 4
            ? data[i][colName]
            : data[i].label
      })
    }
    optArr.forEach((item, index) => {
      if (item.label == '全部') {
        optArr.splice(index, 1)
        optArr.unshift(item)
        return false
      }
    })
    console.log(optArr)
    return optArr
  },
  getSelectReverse(data = []) {
    let obj = {}
    data.forEach(item => {
      obj[item.value] = item.label
    })
    return obj
  },
  get_node_env() {
    return process.env.NODE_ENV !== 'development'
  },
  copyObj(params) {
    if (!params || typeof params !== 'object') {
      throw new Error('err arguments')
    }
    const arget = Array.isArray(params) ? [] : {}
    for (var i in params) {
      if (params.hasOwnProperty(i)) {
        if (params[i] && typeof params[i] === 'object') {
          arget[i] = util.copyObj(params[i])
        } else {
          arget[i] = params[i]
        }
      }
    }
    return arget
  },
  throttle(func, wait, mustRun) {
    var timeout,
      startTime = new Date()
    return function() {
      var context = this,
        args = arguments,
        curTime = new Date()

      clearTimeout(timeout)
      // 如果达到了规定的触发时间间隔，触发 handler
      if (curTime - startTime >= mustRun) {
        func.apply(context, args)
        startTime = curTime
        // 没达到触发间隔，重新设定定时器
      } else {
        timeout = setTimeout(func, wait)
      }
    }
  },
  debounce(method, delay) {
    var timer = null
    return function() {
      var context = this,
        args = arguments
      clearTimeout(timer)
      timer = setTimeout(function() {
        method.apply(context, args)
      }, delay)
    }
  },
  getStartIndex(parentData, code) {
    let obj = {},
      str = ''
    parentData.reduce(
      (cur, res, index) => {
        if (index == 0) {
          str = res[code]
          return cur
        } else {
          if (res[code] != str) {
            if (index == parentData.length - 1) {
              obj[index] = [index, index]
            }
            obj[cur[0]] = [cur[0], index - 1]
            str = res[code]
            return [index]
          } else {
            if (index == parentData.length - 1) {
              obj[cur[0]] = [cur[0], index]
            }
            return cur
          }
        }
      },
      [0]
    )
    return obj
  },
  async createJs(regexp, jsUrl) {
    let script = [...document.getElementsByTagName('script')]
    let creat_status = script.some(item => {
      return item.src.indexOf(regexp) != -1
    })
    if (!creat_status) {
      await util.str.createScript(jsUrl)
    }
  }
}

export default util

export const successCode = 200
