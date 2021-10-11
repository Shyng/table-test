import axios from 'axios';
import qs from 'qs';
import Toast from '../component/toast/toast'


// 创建axios实例
const service = axios.create({
  baseURL: '',    // api的base_url
  timeout: 5000,  // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // 在发送请求之前做一些事情

  if (config.type && config.type === "form") {
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    config.data = qs.stringify(config.data);
  } else if (config.type && config.type === "file") {
    config.headers.post['Content-Type'] = 'multipart/form-data';
  } else {
    // 默认 application/json
  }

  return config
}, error => {
  // 请求错误
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * 下面的注释为通过response自定义status来标示请求状态，当status返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */

    // 判断后端状态码
    // let error = ''
    // if (response.data && Number(response.data.status) !== 0) {
    //   switch (Number(response.data.status)) {
    //     case 1:
    //       error = response.data.errMsg || response.data.errmsg || ( response.data.result && response.data.result.errMsg)
    //       break;
    //     case 401:
    //       error = '未登录或登录已过期'
    //       // 临时处理，如果登陆过期，清除token,跳转首页， 后续需要改为弹框提示后跳转
    //       break;
    //     case 403:
    //       error = '无权访问'
    //       window.location.replace('/pageError?type=403')
    //       break;
    //     case 500:
    //       error = '服务器端出错'
    //       break;
    //     default:
    //       error = '网络异常'
    //   }

    //   if (!response.config.noTips) {
    //     Toast.error(error)
    //     return Promise.reject(error, response.data)
    //   } else {
    //     return Promise.reject(response.data)
    //   }
    // }

    return response.data
  },
  error => {
      // 判断HTTP状态码
      switch (error.response && error.response.status) {
          case 400:
              error.message = '错误请求'
              break;
          case 401:
              error.message = '未授权，请重新登录'
              break;
          case 403:
              error.message = '拒绝访问'
              break;
          case 404:
              error.message = '请求错误,未找到该资源'
              break;
          case 405:
              error.message = '请求方法未允许'
              break;
          case 408:
              error.message = '请求超时'
              break;
          case 415:
              error.message = '请求数据格式不正确'
              break;
          case 500:
              error.message = '服务器端出错'
              break;
          case 501:
              error.message = '网络未实现'
              break;
          case 502:
              error.message = '网络错误'
              break;
          case 503:
              error.message = '服务不可用'
              break;
          case 504:
              error.message = '网络超时'
              break;
          case 505:
              error.message = 'http版本不支持该请求'
              break;
          default:
              error.message = '网络异常'
      }
      // todo 错误提示
      Toast.error(error.message)
      return Promise.reject(error.message)
  }
)

const get = (url, params={}, config={}) =>{
  return service({ method: 'GET', url, params, ...config})
}
const post = (url, data={}, config={}) =>{
    // return service.post(url, data, ...config).catch()
  return service({ method: 'POST', url, data, ...config})
}
const put =(url, data={}, config={}) =>{
  return service({ method: 'PUT', url, data, ...config})
}
const del = (url, params={}, config={}) => {
  return service({ method: 'DELETE', url, params, ...config })
}
const patch = (url, data={}, config={}) =>{
  return service({ method: 'PATCH', url, data, ...config})
}

export {
  get,
  post,
  put,
  del,
  patch
}