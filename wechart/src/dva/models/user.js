import modelExtend from 'dva-model-extend'
import base from './base'

export default modelExtend(base, {
  namespace: 'user',
  state: {
    userInfo: {},
    loginStatus: false
  },
  effect: {}
})
