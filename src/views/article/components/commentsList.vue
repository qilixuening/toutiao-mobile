<template>
  <div class="comments-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoadingArticleComments"
    >
      <comment-item
        v-for="comment in comments"
        :key="comment.com_id"
        :comment="comment"
      />
    </van-list>
  </div>
</template>

<script>
import { getArticleComments } from '@/api/articles'
import CommentItem from '@/components/commentItem.vue'

export default {
  name: 'CommentsList',
  components: {
    CommentItem
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      comments: [],
      loading: false,
      finished: false,
      offset: undefined
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoadingArticleComments () {
      // 该函数用于requestx.js接口的加载更多
      // 该接口的timestamp与页码形式类似，因此只要timestamp存在，则证明下一页内容存在
      // 异步更新数据
      const { data: { data } } = await getArticleComments({
        type: 'a',
        source: this.articleId,
        offset: this.offset,
        limit: 10
      })

      this.loading = false // 加载状态结束
      this.comments.push(...data.results) // 写入新加载的内容
      if (!data.pre_timestamp) { // 加载完毕
        this.finished = true
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
