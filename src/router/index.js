import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/'
import { Dialog } from 'vant'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/'),
    meta: { auth: false }
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/'),
        meta: { auth: false }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/'),
        meta: { auth: false }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/'),
        meta: { auth: false }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/'),
        meta: { auth: false }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/'),
    meta: { auth: false }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    props: true,
    component: () => import('@/views/article/'),
    meta: { auth: false }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile/'),
    meta: { auth: true }
  },
  {
    path: '/my/articles',
    name: 'articles',
    component: () => import('@/views/articles/'),
    meta: { auth: true }
  },
  {
    path: '/my/articles/:userIdOrType',
    name: 'userArticles',
    props: true,
    component: () => import('@/views/articles/'),
    meta: { auth: true }
  },
  {
    path: '/my/followings',
    name: 'followings',
    component: () => import('@/views/followings/'),
    meta: { auth: true }
  },
  {
    path: '/my/followers',
    name: 'followers',
    component: () => import('@/views/followers/'),
    meta: { auth: true }
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/chat/'),
    meta: { auth: true }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login' || !to.meta.auth) {
    return next()
  }
  if (store.state.user) {
    return next()
  }

  Dialog.confirm({
    title: '需要登录，是否继续？'
  }).then(() => {
    next({
      name: 'login',
      query: {
        redirect: from.fullPath
      }
    })
  }).catch(() => {
    next(false)
  })
})

export default router
