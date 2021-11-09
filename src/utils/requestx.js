import axios from 'axios'
import store from '@/store/'
import { Toast } from 'vant'
import router from '@/router/'

const refreshRequest = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/app/'
})

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/app/',

  transformResponse: [(data) => {
    if (data) {
      // console.log(data)
      // 文章的art_id,com_id为Number,但数字位数过长，json解析为js数字会损失精度，因此转为字符串
      const rectifiedString = data.replace(
        /(["'](?:art_|com_|aut_)?id["']:\s?)(\d+)(,|\}|\])/ig,
        (_, $1, $2, $3) => `${$1}"${$2}"${$3}`
      )
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

function toLogin () {
  router.replace({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

async function refreshToken (user) {
  try {
    const { data } = await refreshRequest({
      method: 'PUT',
      url: 'v1_0/authorizations',
      headers: {
        Authorization: `Bearer ${user.refresh_token}`
      }
    })
    user.token = data.data.token
    store.commit('setUser', user)
  } catch (error) {
    return error.response.status
  }
}

request.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    const status = error.response.status
    if (status === 401) {
      const { user } = store.state
      if (user && user.token) {
        if (await refreshToken(user)) {
          return toLogin()
        } else {
          return request(error.config)
        }
      } else {
        return toLogin()
      }
    } else if (status === 400) {
      Toast.fail('请求参数错误')
    } else if (status === 403) {
      Toast.fail('没有权限')
    } else if (status > 500) {
      Toast.fail('服务器异常')
    }
    return Promise.reject(error)
  }
)

export default request
