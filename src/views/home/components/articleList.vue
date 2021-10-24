<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshing"
      :success-text="refreshInfo"
      :success-duration="1000"
      @refresh="onRefreshingArticles"
    >
      <van-list
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
          />
        </van-skeleton>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getChannelArticles } from '@/api/articles'
import ArticleItem from '@/components/articleItem.vue'

const tmpData = Array.from(
  { length: 10 },
  (_, i) => ({
    art_id: 10 * i,
    aut_name: 'xxxx某',
    title: `标题${i}1描述2描述3描述4描述5描述6延长线5描述6延5描述6延5描述6延5描述6延`,
    content: '一段描述文字',
    cover: {
      type: (i % 3) === 2 ? 3 : (i % 3),
      images: [[], ['https://img01.yzcdn.cn/vant/cat.jpeg'], ['https://img01.yzcdn.cn/vant/cat.jpeg', '', 'https://img01.yzcdn.cn/vant/cat.jpeg']][i % 3]
    },
    is_top: i < 3,
    comment_count: i * 3 + 10,
    like_count: i * 2,
    pub_date: Date.now() - 1e6 * i
  })
)

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
      articles: tmpData,
      loading: false,
      itemLoading: true,
      finished: false,
      initTimestamp: undefined,
      postTimestamp: undefined,
      timestamp: Date.now(),
      isRefreshing: false,
      refreshInfo: '未发现新的新闻'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoadingArticles () {
      // 设定初始加载时间，用于上拉刷新数据与初始数据进行对比
      if (!this.initTimestamp) {
        this.initTimestamp = this.timestamp
      }
      // 异步更新数据
      const { data: { data } } = await getChannelArticles({
        channel_id: this.info.id,
        timestamp: this.timestamp,
        with_top: 1 // 是否包含置顶项
      })

      this.itemLoading = false // 骨架屏首次加载后消失
      this.loading = false // 加载状态结束
      if (!data.results.length) { // 加载完毕
        this.finished = true
      } else { // 写入新加载的内容
        this.articles.push(...data.results)
      }
      this.timestamp = data.pre_timestamp
    },
    async onRefreshingArticles () {
      this.postTimestamp = Date.now()
      const { data: { data } } = await getChannelArticles({
        channel_id: this.info.id,
        timestamp: this.postTimestamp,
        with_top: 1 // 是否包含置顶项
      })

      this.isRefreshing = false
      // 如果下拉刷新返回的下一页最新文章时间比页面加载的
      // 初始时间更早，则只需要部分更新页面
      if (this.initTimestamp > data.pre_timestamp) {
        const newArticleIds = data.results.map(({ art_id: id }) => id)
        const i = this.articles.length
          ? newArticleIds.indexOf(this.articles[0].art_id)
          : -1
        if (i > 0) {
          this.articles.unshift(...data.results.slice(0, i))
          this.refreshInfo = `发现${i}条新闻`
        }
      } else { // 下拉刷新的量超过一页，则直接整个页面重新加载数据
        this.articles = data.results
        this.timestamp = data.pre_timestamp
        this.finished = false
        this.$toast({
          message: '大量新闻已出现，快来一饱眼福',
          position: 'top'
        })
      }
      this.initTimestamp = this.postTimestamp
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
