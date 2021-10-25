import request from '@/utils/request'

export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: 'v1_0/channels'
  })
}

export const appendUserChannels = data => {
  return request({
    method: 'PATCH',
    url: 'v1_0/user/channels',
    data
  })
}

export const removeUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `v1_0/user/channels/${channelId}`
  })
}
