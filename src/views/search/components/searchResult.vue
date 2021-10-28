<template>
  <div class="search-result-container">
    <van-divider v-if="totalCount">发现{{ totalCount }}篇相关文章</van-divider>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="已展示所有搜索结果"
      @load="onLoadSearchResult"
    >
      <van-cell
        v-for="article in revelantArticles"
        :key="article.art_id"
        clickable
        center
        :to="routeToArticle(article.art_id)"
      >
        <template #icon>
          <div class="channel-title van-ellipsis">
            {{ article.title }}
          </div>
          <div
            class="channel-tag"
          >
            {{ articleChannel[article.ch_id] }}
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import { getAllChannels } from '@/api/channels'

export default {
  name: 'SearchResultIndex',
  components: {},
  props: {
    searchString: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      revelantArticles: [],
      articleChannel: {},
      loading: false,
      finished: false,
      page: 0,
      perPage: 10,
      totalCount: 0
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticleChannel()
  },
  mounted () {},
  methods: {
    async loadArticleChannel () {
      const { data: { data } } = await getAllChannels()
      this.articleChannel = data.channels.reduce((pre, { id, name }) => ({ ...pre, [id]: name }), {})
    },
    async onLoadSearchResult () {
      const { data: { data } } = await getSearchResult({
        page: ++this.page,
        per_page: this.perPage,
        q: this.searchString
      })

      this.revelantArticles.push(...data.results)
      this.totalCount = data.total_count

      this.loading = false

      if (this.totalCount <= this.page * this.perPage) {
        this.finished = true
      }
    },
    routeToArticle (id) {
      return {
        name: 'article',
        params: {
          articleId: id
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-result-container {
  .van-divider {
    margin: 0;
    color: rgb(211, 211, 211);
  }
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  .van-cell {
    justify-content: space-between;
    height: 42px;
    .channel-tag {
      padding: 0 5px;
      font-size: 10px;
      line-height: 12px;
      color: #3296fa;
      border: 1px solid #3296fa;
      border-radius: 4px;
      flex: unset;
    }
    .channel-title {
      flex: 1;
    }
  }
}
</style>
