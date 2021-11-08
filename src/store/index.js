import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem, removeItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao_user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY),
    cachePages: ['LayoutIndex']
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem(USER_KEY, state.user)
    },
    removeUser (state) {
      state.user = undefined
      removeItem(USER_KEY)
    },
    setCachePages (state, componentName) {
      if (!state.cachePages.includes(componentName)) {
        state.cachePages.push(componentName)
      }
    },
    removeCachePages (state, componentName) {
      const index = state.cachePages.indexOf(componentName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
