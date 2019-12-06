import Taro from '@tarojs/taro'
import modelExtend from 'dva-model-extend'
import base from './base'

export default modelExtend(base, {
  namespace: 'router',
  state: {
    authList: {
      'pages/order/index': false
    },
    tabbarSelected: 0
  },
  effects: {
    *navigateTo({ payload }, { select }) {
      let { url, params = {} } = payload
      let str = ''
      Object.keys(params).map((item, index) => {
        index != 0 && (str += '&')
        str += `${item}= ${encodeURIComponent(params[index])}`
      })
      url = `${url}?${str}`
      const status = Taro.getStorageSync('userinfo')
      const { authList } = yield select(state => state.router)
      if (!status && authList[url]) {
        Taro.switchTab({ url: '/pages/index/index' })
      } else {
        Taro.navigateTo({ url })
      }
    },

    *redirectTo({ payload }, {}) {
      let { url, params = {} } = payload
      let str = ''
      Object.keys(params).map((key, index) => {
        index !== 0 && (str += '&')
        str += `${key}=${encodeURIComponent(params[key])}`
      })
      url = `${url}?${str}`
      Taro.redirectTo({ url })
    },
    *changeSelected({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          tabbarSelected: payload
        }
      })
    }
  }
})
