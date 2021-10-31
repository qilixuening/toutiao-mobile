import request from '@/utils/requestx'

export const setCommentLike = commentId => {
  return request({
    method: 'POST',
    url: 'v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}

export const removeCommentLike = commentId => {
  return request({
    method: 'DELETE',
    url: `v1_0/comment/likings/${commentId}`
  })
}

export const addComment = data => {
  return request({
    method: 'POST',
    url: 'v1_0/comments',
    data
  })
}
