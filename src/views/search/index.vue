<template>
  <div class="search-container">
    <form
      action="/"
    >
      <van-search
        class="search-bar"
        v-model.trim="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="onFocus"
      />
    </form>

    <component
      :is="searchComponentName"
      :search-string="searchText"
      :local-history="localHistory"
      @select-search="onSelectSearch"
      @remove-history="onRemoveHistory"
    >
    </component>
  </div>
</template>

<script>
import SearchSuggestion from './components/searchSuggestion.vue'
import SearchHistory from './components/searchHistory.vue'
import SearchResult from './components/searchResult.vue'
import { getItem, setItem, removeItem } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  props: {},
  data () {
    return {
      searchText: '',
      isSearchReady: false,
      localHistory: getItem('search-history') || []
    }
  },
  computed: {
    isSearchTextValid () {
      return Boolean(this.searchText)
    },
    searchComponentName: {
      get: function () {
        if (this.isSearchTextValid) {
          return this.isSearchReady
            ? 'search-result'
            : 'search-suggestion'
        } else {
          return 'search-history'
        }
      },
      set: function (name) {
        return name
      }
    }
  },
  watch: {
    localHistory (val, oldVal) {
      if (val.length) {
        setItem('search-history', this.localHistory)
      } else {
        removeItem('search-history')
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    onSearch () {
      this.addToHistory()
      this.isSearchReady = true
    },
    onCancel () {
      this.$router.back()
    },
    onFocus () {
      this.isSearchReady = false
    },
    onSelectSearch (selectedString) {
      this.searchText = selectedString
      this.onSearch()
    },
    addToHistory () {
      const searchIndex = this.localHistory.indexOf(this.searchText)
      if (searchIndex >= 0) { // 之前搜索过该词
        this.localHistory.splice(searchIndex, 1)
      }
      this.localHistory.unshift(this.searchText)
    },
    onRemoveHistory (i) {
      if (i >= 0) { // 删除本地单个记录
        this.localHistory.splice(i, 1)
      } else { // 清除本地所有记录
        this.localHistory.splice(0)
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-bar {
  background-color: #3296fa;
  height: 46px;
  padding: 7px 16px;
  .van-search__content {
    height: 100%;
    border-radius: 5px;
  }
  .van-search__action {
    color: #fff;
    padding-right: 0;
  }
}
</style>
