import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_SERVER_URL, // 请求的公共地址部分
  timeout: 5000 // 请求超时时间 当请求时间超过5秒还未取得结果时 提示用户请求超时
})
console.log(process.env.VUE_APP_SERVER_URL, 'envv')

// interceptors axios的拦截器对象请求拦截
api.interceptors.request.use(
  (config) => {
    // config 请求的信息
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJuYW1lXCI6XCLkvKDmmbrmlZnogrIrMVwiLFwiaWRcIjpcIjEzNjk1OTQ5NTQ3Mzk4NTk0NThcIixcInVzZXJuYW1lXCI6XCJ4aWFvdHV4aWFuMDAxXCJ9IiwiaWF0IjoxNjY0MDMzMDM1LCJleHAiOjE2NjQyOTIyMzV9.iQTFJseS2u63v0joL8T7UejW9-SO2mPOX_8f31NJATM`
    return config // 将配置完成的config对象返回出去 如果不返回 请求则不会进行
  },
  (err) => {
    // 请求发生错误时的处理 抛出错误
    Promise.reject(err)
  }
)

// 响应拦截
api.interceptors.response.use(
  (res) => {
    // 我们一般在这里处理，请求成功后的错误状态码 例如状态码是500，404，403
    // res 是所有相应的信息
    console.log(res)
    return Promise.resolve(res)
  },
  (err) => {
    // 服务器响应发生错误时的处理
    Promise.reject(err)
  }
)

export default api
