import Axios from 'axios'
import request from './api'
const axios = Axios.create({
  timeout: 1300000,
  withCredentials: false
})

axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (Axios.isCancel(error)) {
      return Promise.reject({
        code: -1,
        message: error.message,
        result: null
      })
    }
    // 网络错误,4xx,5xx,统一转化为resolve为对应format{code,errmsg}
    const st = error.response.status
    if (st >= 400 && st < 599 && st != 502) {
      error.response.dataOrigin = error.response.data
      error.response.data = {
        code: -1,
        message: `status error: ${st}`,
        result: null
      }
      return Promise.resolve(error.response)
    } else {
      return Promise.reject(new Error(error))
    }
  }
)
axios.defaults.baseURL =
  process.env.NODE_ENV === 'production' ? 'localhost:7002' : 'localhost:7002'
export const ajaxGet = async (url, params = {}) =>
  await doAjax(url, params, 'get')
export const ajaxPost = async (url, params = {}) =>
  await doAjax(url, params, 'post')
export const ajaxDelete = async (url, params = {}) =>
  await doAjax(url, params, 'delete')
export const ajaxPut = async (url, params = {}) =>
  await doAjax(url, params, 'put')
function doAjax(url, params = {}, type) {
  return axios[type](
    request[url],
    type === 'get'
      ? {
          params
        }
      : params
  )
}
