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
      />
    </form>

    <component :is="searchComponentName" :search-string="searchText"></component>
  </div>
</template>

<script>
import SearchSuggestion from './components/searchSuggestion.vue'
import SearchHistory from './components/searchHistory.vue'
import SearchResult from './components/searchResult.vue'

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
      searchComponentName: 'search-history',
      art: [1, 2, 3]
    }
  },
  computed: {},
  watch: {
    searchText (newText, oldText) {
      if (newText) {
        this.searchComponentName = 'search-suggestion'
      } else {
        this.searchComponentName = 'search-history'
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    onSearch (val) {
      if (val) {
        this.searchComponentName = 'search-result'
      }
    },
    onCancel () {
      this.$router.back()
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
