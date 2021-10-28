<template>
  <div class="article-container">
    <van-nav-bar
      title="文章详情"
      class="app-nav-bar"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="ellipsis" />
      </template>
    </van-nav-bar>
    <div class="article-page">
      <van-cell
        :border="false"
      >
        <h2 class="article-title">{{ article.title }}</h2>
      </van-cell>
      <van-cell
        class="author-panel"
        center
      >
        <template #icon>
          <van-image
            class="author-avatar"
            round
            fit="cover"
            :src="article.aut_photo"
          />
        </template>
        <template #title>
          <span class="author-name">{{ article.aut_name }}</span>
        </template>
        <template #label>
          <span class="author-pubdate">{{ article.pubdate | relativeTime }}</span>
        </template>
        <template #default>
          <van-button
            class="author-follow"
            :type="!article.is_followed ? 'info' : 'default'"
            size="small"
            round
          >
            <template #icon>
              <van-icon
                v-if="!article.is_followed"
                name="plus"
              />
            </template>
            {{ article.is_followed ? '已关注' : '关注' }}
          </van-button>
        </template>
      </van-cell>

      <div
        class="markdown-body"
        v-html="article.content"
      >
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleContent } from '@/api/articles'

// 加载正文css样式
import './github-markdown.css'

export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      article: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onClickRight () {
      console.log('onClickRight')
    },
    async loadArticle () {
      const { data: { data } } = await getArticleContent(this.articleId)
      this.article = data
      // console.log(data)
    }
  }
}
</script>

<style scoped lang="less">
.article-page {
  position: fixed;
  top: 46px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  .author-panel {
    position: sticky;
    top: 0;
    .article-title {
      color: #333333;
      font-size: 20px;
    }
    .author-avatar {
      width: 35px;
      height: 35px;
      margin-right: 8px;
    }
    .author-name {
      font-size: 12px;
      color: #333333;
    }
    .author-pubdate {
      font-size: 11px;
      color: #b4b4b4;
    }
    .author-follow {
      width: 85px;
      height: 29px;
    }
  }
}

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}
@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}

</style>
