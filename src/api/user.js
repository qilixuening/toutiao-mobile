import request from '@/utils/requestx'

export const login = data => {
  return request({
    method: 'POST',
    url: 'v1_0/authorizations',
    data
  })
}

export const sendCode = mobile => {
  return request({
    method: 'GET',
    url: `v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: 'v1_0/user'
  })
}

export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: 'v1_0/user/channels'
  })
}

export const addUserFollow = authorId => {
  return request({
    method: 'POST',
    url: 'v1_0/user/followings',
    data: {
      target: authorId
    }
  })
}

export const removeUserFollow = authorId => {
  return request({
    method: 'DELETE',
    url: `v1_0/user/followings/${authorId}`
  })
}

export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: 'v1_0/user/profile'
  })
}

export const setUserProfile = data => {
  return request({
    method: 'PATCH',
    url: 'v1_0/user/profile',
    data
  })
}
export const setUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: 'v1_0/user/photo',
    data
  })
}

export const getUserArticles = params => {
  return request({
    method: 'GET',
    url: 'v1_0/user/articles',
    params
  })
}

export const getTargetArticles = (userId, params) => {
  return request({
    method: 'GET',
    url: `v1_0/users/${userId}/articles`,
    params
  })
}

export const getUserFollowings = params => {
  return request({
    method: 'GET',
    url: 'v1_0/user/followings',
    params
  })
}

export const getUserFollowers = params => {
  return request({
    method: 'GET',
    url: 'v1_0/user/followers',
    params
  })
}

export const getUserCollections = params => {
  return request({
    method: 'GET',
    url: 'v1_0/article/collections',
    params
  })
}

export const getUserHistory = params => {
  return request({
    method: 'GET',
    url: 'v1_0/user/histories',
    params
  })
}

export const getUserNotifications = params => {
  return request({
    method: 'GET',
    url: 'v1_0/user/notify',
    params // page, per_page, type?=1~4
  })
}
