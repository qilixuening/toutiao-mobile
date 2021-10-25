import axios from 'axios'
import store from '@/store/'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/',

  transformResponse: [(data) => {
    if (data) {
      // const rectifiedString = data.replace(/("id":\s)(\d+)(,\s+)/ig, (_, $1, $2, $3) => `${$1}"${$2}"${$3}`)
      return JSON.parse(data)
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
