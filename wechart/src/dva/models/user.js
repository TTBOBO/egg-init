import modelExtend from 'dva-model-extend'
import base from './base'

export default modelExtend(base, {
  namespace: 'user',
  state: {
    userInfo: {},
    loginStatus: false
  },
  effects: {
    *userInfo({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: { userInfo: payload, loginStatus: true }
      })
    }
  }
})
