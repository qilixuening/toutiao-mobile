import request from '@/utils/requestx'

export const getSearchSuggestion = q => {
  return request({
    method: 'GET',
    url: 'v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: 'v1_0/search',
    params
  })
}

export const getUserSearchHistory = () => {
  return request({
    method: 'GET',
    url: 'v1_0/search/histories'
  })
}
