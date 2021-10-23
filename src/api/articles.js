import request from '@/utils/request'

export const getChannelArticles = params => {
  return request({
    methods: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
