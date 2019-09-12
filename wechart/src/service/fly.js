import Taro from '@tarojs/taro'
import Fly from 'flyio/dist/npm/wx'
import * as constants from './constants'

const api = constants.api

const fly = new Fly()
fly.config.baseURL = constants.BASEURL
fly.config.headers = {
  'Content-Type': 'application/json; charset=utf-8'
}

fly.interceptors.request.use(async request => {
  return request
})

fly.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    const {
      response: { data: error }
    } = err
    const errorText = error && error[0].message
    Taro.showToast({ title: errorText, icon: 'none' })
    return error
  }
)

const ajaxGet = async (url, params) => {
  return await fly.get(api[url], params)
}

const ajaxPost = async (url, params) => {
  return await fly.post(api[url], params)
}

export { ajaxGet, ajaxPost }
