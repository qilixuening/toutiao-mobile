import request from '@/utils/request'

export const getChannelArticles = params => {
  return request({
    methods: 'GET',
    url: 'v1_0/articles',
    params
  })
}
