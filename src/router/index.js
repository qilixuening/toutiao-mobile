import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    props: true,
    component: () => import('@/views/article/')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile/')
  },
  {
    path: '/my/articles',
    name: 'articles',
    component: () => import('@/views/articles/')
  },
  {
    path: '/my/articles/:userIdOrType',
    name: 'userArticles',
    props: true,
    component: () => import('@/views/articles/')
  },
  {
    path: '/my/followings',
    name: 'followings',
    component: () => import('@/views/followings/')
  },
  {
    path: '/my/followers',
    name: 'followers',
    component: () => import('@/views/followers/')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/chat/')
  }
]

const router = new VueRouter({
  routes
})

export default router
