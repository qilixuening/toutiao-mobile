<template>
  <div class="my-articles">
    <van-nav-bar
      :title="title"
      class="app-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <van-list
      v-if="itemLoading || articles.length"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoadingArticles"
    >
      <van-skeleton
        animate
        title
        avatar
        avatar-shape="square"
        avatar-size="60px"
        :row="5"
        :loading="itemLoading"
      >
        <article-item
          v-for="(item, index) in articles"
          :key="index"
          :article="item"
          :show-author="false"
        />
      </van-skeleton>
    </van-list>
    <van-empty
      v-else
      description="暂无内容"
    />
  </div>
</template>

<script>
import {
  getUserArticles,
  getTargetArticles,
  getUserCollections,
  getUserHistory
} from '@/api/user'
import ArticleItem from '@/components/articleItem.vue'

export default {
  name: 'MyArticles',
  components: {
    ArticleItem
  },
  props: {
    userIdOrType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      articles: [],
      loading: false,
      itemLoading: true,
      finished: false,
      page: 1,
      perPage: 10,
      totalCount: 0
    }
  },
  computed: {
    title () {
      const tail = this.totalCount > 99 ? '99+' : this.totalCount
      switch (this.userIdOrType) {
        case 'collections':
          return `我的收藏(${tail})`
        case 'history':
          return `浏览历史(${tail})`
        case '':
          return `我的头条(${tail})`
        default:
          return `${this.userIdOrType}的头条${tail}`
      }
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoadingArticles () {
      let ret
      const params = {
        page: this.page,
        per_page: this.perPage
      }
      switch (this.userIdOrType) {
        case 'collections':
          ret = await getUserCollections(params)
          break
        case 'history':
          ret = await getUserHistory(params)
          break
        case '':
          ret = await getUserArticles(this.userIdOrType, params)
          break
        default:
          ret = await getTargetArticles(params)
      }
      const { data: { data, message } } = ret
      if (message === 'OK') {
        this.itemLoading = false // 一旦有数据获取到，骨架屏消失
        this.totalCount = data.total_count
        this.articles.push(...data.results) // 写入新加载的内容
      }
      this.loading = false // 加载状态结束
      this.page++
      if (!data.results.length) { // 加载完毕
        this.finished = true
        this.itemLoading = false // 如果没有数据，骨架屏强制消失
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow: auto;
}
.van-skeleton__row {
  background-color: #ebedf0;
}
</style>
