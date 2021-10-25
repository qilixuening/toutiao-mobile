<template>
  <div class="search-container">
    <form
      action="/"
    >
      <van-search
        class="search-bar"
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchIndex',
  components: {},
  props: {},
  data () {
    return {
      searchText: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearch (val) {

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
