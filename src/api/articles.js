import request from '@/utils/requestx'

export const getChannelArticles = params => {
  return request({
    methods: 'GET',
    url: 'v1_1/articles',
    params
  })
}

// requestx.js => http://api-toutiao-web.itheima.net/app/ 获取不到首页新闻内容，因此采用另一接口
// request.js => http://toutiao.itheima.net/ 来替代此功能
// requestx.js获取到的文章art_id为数字，request.js获取到的文章art_id为字符串

export const getArticleContent = articleId => {
  return request({
    methods: 'GET',
    url: `v1_0/articles/${articleId}`
  })
}
