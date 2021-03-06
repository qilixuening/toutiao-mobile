<template>
  <div class="article-list" ref="list">
    <van-pull-refresh
      v-model="isRefreshing"
      :success-text="refreshInfo"
      :success-duration="1000"
      @refresh="onRefreshingArticles"
    >
      <van-list
        v-model="loading"
        finished-text="没有更多了"
        :finished="finished"
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
          />
        </van-skeleton>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getChannelArticles } from '@/api/articles'
import ArticleItem from '@/components/articleItem.vue'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articles: [],
      loading: false,
      itemLoading: true,
      finished: false,
      initTimestamp: undefined,
      timestamp: Date.now(),
      isRefreshing: false,
      refreshInfo: '未发现新的新闻',
      throttle: undefined,
      scrollTop: 0
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    const articleList = this.$refs.list
    articleList.onscroll = () => {
      if (!this.throttle) {
        this.throttle = setTimeout(() => {
          this.scrollTop = articleList.scrollTop
          this.throttle = undefined
        }, 300)
      }
    }
  },
  activated () {
    this.$refs.list.scrollTop = this.scrollTop
    clearTimeout(this.throttle)
  },
  methods: {
    async onLoadingArticles () {
      // 该函数用于requestx.js接口的加载更多
      // 该接口的timestamp与页码形式类似，因此只要timestamp存在，则证明下一页内容存在
      // 异步更新数据
      const { data: { data } } = await getChannelArticles({
        channel_id: this.info.id,
        timestamp: this.timestamp,
        with_top: 1 // 1:包含置顶文章，0:不含置顶文章
      })
      // 第一次请求时会返回第一页最新数据的timestamp,存为initTimestamp用于上拉刷新
      if (!this.initTimestamp) {
        this.initTimestamp = data.pre_timestamp
      }
      if (data.results.length) {
        this.itemLoading = false // 一旦有数据获取到，骨架屏消失
      }
      this.loading = false // 加载状态结束
      this.articles.push(...data.results) // 写入新加载的内容
      if (!data.pre_timestamp) { // 加载完毕
        this.finished = true
        this.itemLoading = false // 如果该频道没有数据，骨架屏强制消失
      }
      this.timestamp = data.pre_timestamp
    },
    async onRefreshingArticles () {
      // 该函数用于request.js接口的下拉刷新
      const { data: { data } } = await getChannelArticles({
        channel_id: this.info.id,
        timestamp: this.initTimestamp,
        with_top: 1 // 1:包含置顶文章，0:不含置顶文章
      })
      this.loading = false // 加载状态结束
      if (!data.results.length) { // 该频道没有数据
        this.refreshInfo = '该频道没有新闻'
        // console.log(this.initTimestamp, data.results.length)
      } else {
        const oldIndex = data.results.findIndex(function (art) {
          return art.art_id === this.art_id
        }, this.articles[0])
        if (oldIndex > 0) {
          this.articles.splice(-oldIndex, oldIndex)
          this.articles.unshift(...data.results.slice(0, oldIndex))
          this.refreshInfo = `已刷新${oldIndex}条新闻`
        } else if (oldIndex === 0) {
          this.refreshInfo = '暂无更新'
        } else {
          this.articles = data.results
          this.timestamp = data.pre_timestamp
          this.$toast({
            message: '出现大量新闻，已刷新页面',
            position: 'top'
          })
        }
      }
      this.isRefreshing = false
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
