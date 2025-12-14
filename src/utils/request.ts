import { message } from "ant-design-vue";
import axios, { type Method } from "axios";

const baseURL = import.meta.env.VITE_APP_BASE_API
const instance = axios.create({
  // 基础地址，超时时间
  baseURL,
  timeout: 10000
})

instance.interceptors.request.use(
  config => {
    // 携带token
    return config
  },
  err => Promise.reject(err)
)

instance.interceptors.response.use(
  resp => {
    // 根据实际的API响应结构调整处理逻辑
    const res = resp.data
    // 如果有code字段并且为200，则认为请求成功
    if (res.code === 200) {
      return res
    }
    // 如果没有code字段，但有success字段为true，也认为请求成功
    if (res.success === true) {
      return {
        code: 200,
        data: res.data,
        message: 'success'
      }
    }
    // 其他情况视为请求失败
    message.error(res.message || '请求失败')
    return Promise.reject(res)
  },
  err => {
    // 解决变量名冲突问题
    const { message: errMsg, response } = err
    if(errMsg.indexOf('timeout') != -1) {
      message.error('网络超时！');
    } else if(errMsg == 'Network Error') {
      message.error('网络连接错误！');
    } else {
      if(response && response.data) message.error(response.statusText)
      else message.error('接口路径找不到');
    }
    // 处理401错误
    return Promise.reject(err)
  }
)

type Data<T> = {
  code: number,
  message: string,
  data: T
}

// 导出一个通用的请求工具函数
// const request = (url: string, method: Method = 'GET', submitData?: object) => {
//   return instance.request({
//     url,
//     method,
//     [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
//   })
// }

// 这个需要替换axsio.request默认的响应成功后的结果类型
// 之前是：传 { name: string } 然后res是   res = { data: { name: string } }
// 但现在：在响应拦截器中返回了 res.data  也就是将来响应成功后的结果，和上面的类型一致吗？
// 所以要：request<数据类型，数据类型>() 这样才指定了 res.data 的类型
// 但是呢：后台返回的数据结构相同，所以可以抽取相同的类型
const request = <T>(url: string, method: Method = 'get', submitData?: object) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export {baseURL, instance, request }