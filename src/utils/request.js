import axios from 'axios'

const request = axios.create({
  baseURL: 'api-toutiao-web.itheima.net/'
})

export default request
