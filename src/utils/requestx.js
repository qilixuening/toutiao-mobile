import axios from 'axios'
import store from '@/store/'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/app/',

  transformResponse: [(data) => {
    if (data) {
      // 文章的art_id为Number,但数字位数过长，json解析为js数字会损失精度，因此转为字符串
      const rectifiedString = data.replace(/("art_id":\s)(\d+)(,\s+)/ig, (_, $1, $2, $3) => `${$1}"${$2}"${$3}`)
      return JSON.parse(rectifiedString)
    } else {
      return data
    }
  }]
})

request.interceptors.request.use(
  function (config) {
    const { user } = store.state
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default request
