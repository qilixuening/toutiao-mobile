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
            :loading="loading"
            @click="toggleUserFollow"
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
        ref="articleContentHTML"
        v-html="article.content"
      >
      </div>
    </div>
    <van-cell
      center
      class="article-operation"
    >
      <template #title>
        <van-button
          round
          class="comment-button"
          size="mini"
          type="default"
        >写评论...</van-button>
      </template>
      <template #default>
        <van-button
          round
          class="operate-button"
          size="small"
          type="default"
        >
          <van-badge max="99">
            <van-icon name="star-o" />
            <template #content>
              <span class="icon-badge">
                20
              </span>
            </template>
          </van-badge>
        </van-button>
        <van-button
          round
          class="operate-button"
          size="small"
          type="default"
          @click="toggleArticleCollect"
        >
          <van-icon
            :color="article.is_collected ? 'orange': '#777777'"
            :name="article.is_collected ? 'star' : 'star-o'"
          />
        </van-button>
        <van-button
          round
          class="operate-button"
          size="small"
          type="default"
          @click="toggleArticleLike"
        >
          <van-icon
            :color="article.attitude === 1 ? 'gold': '#777777'"
            :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
          />
        </van-button>
        <van-button
          round
          class="operate-button"
          size="small"
          type="default"
        >
          <van-icon
            color="#777777"
            name="share"
          />
        </van-button>
      </template>
    </van-cell>
    <van-image-preview
      v-model="isPreviewImage"
      :images="previewImages"
      :start-position="page"
      :loop="false"
      :closeable="true"
    >
    </van-image-preview>
  </div>
</template>

<script>
import {
  getArticleContent,
  setArticleCollect,
  removeArticleCollect,
  setArticleLike,
  removeArticleLike
} from '@/api/articles'
import { addUserFollow, removeUserFollow } from '@/api/user'
import { ImagePreview } from 'vant'
import { mapState } from 'vuex'

// 加载正文css样式
import './github-markdown.css'

export default {
  name: 'ArticleIndex',
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      article: {},
      isPreviewImage: false,
      previewImages: [],
      page: undefined,
      loading: false,
      comments: []
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
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
      this.$nextTick(this.getContentImages)
    },
    getContentImages () {
      const imgs = [...this.$refs.articleContentHTML.getElementsByTagName('img')]
      this.previewImages = imgs.map((img, index) => {
        img.onclick = () => {
          this.page = index
          this.isPreviewImage = true
        }
        return img.src
      })
    },
    async toggleUserFollow () {
      if (this.user) {
        this.loading = true
        if (this.article.is_followed) {
          const { status } = await removeUserFollow(this.article.aut_id)
          if (status === 204) {
            this.article.is_followed = !this.article.is_followed
          }
        } else {
          const { status } = await addUserFollow(this.article.aut_id)
          if (status === 201) {
            this.article.is_followed = !this.article.is_followed
          }
        }
        this.loading = false
      } else {
        this.$router.push('/login')
      }
    },
    async toggleArticleCollect () {
      if (this.user) {
        this.$toast.loading({
          message: '操作中...',
          forbidClick: true
        })
        if (this.article.is_collected) {
          const { status } = await removeArticleCollect(this.articleId)
          if (status === 204) {
            this.article.is_collected = !this.article.is_collected
            this.$toast.success('已取消收藏')
          } else {
            this.$toast.fail('操作失败，请重试')
          }
        } else {
          const { status } = await setArticleCollect(this.articleId)
          if (status === 201) {
            this.article.is_collected = !this.article.is_collected
            this.$toast.success('收藏成功')
          } else {
            this.$toast.fail('操作失败，请重试')
          }
        }
      } else {
        this.$router.push('/login')
      }
    },
    async toggleArticleLike () {
      if (this.user) {
        this.$toast.loading({
          message: '操作中...',
          forbidClick: true
        })
        if (this.article.attitude === 1) {
          const { status } = await removeArticleLike(this.articleId)
          if (status === 204) {
            this.article.attitude = 0
            this.$toast.success('已取消点赞')
          } else {
            this.$toast.fail('操作失败，请重试')
          }
        } else {
          const { status } = await setArticleLike(this.articleId)
          if (status === 201) {
            this.article.attitude = 1
            this.$toast.success('点赞成功')
          } else {
            this.$toast.fail('操作失败，请重试')
          }
        }
        this.loading = false
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-page {
  position: fixed;
  top: 46px;
  bottom: 46px;
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

.article-operation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 46px;
  .van-cell__title {
    .comment-button {
      width: 100%;
      line-height: 100%;
      font-size: 16px;
      color: gray;
    }
  }
  .van-cell__value {
    flex: unset;
    overflow: visible;
    .operate-button {
      border: none;
      font-size: 16px;
      // color: lightblue;
      margin-left: 16px;
      /deep/ .van-badge {
        font-size: 10px;
      }
    }
  }
}
</style>
