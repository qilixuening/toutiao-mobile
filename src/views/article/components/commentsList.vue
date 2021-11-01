<template>
  <div class="comments-list">
    <van-cell>全部{{ isReplyStatus ? '回复' : '评论'}}({{ commentsCount }}条)</van-cell>
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
        :target-status="isReplyStatus"
        @bubble="$emit('bubble', $event)"
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
    },
    updateComments: {
      type: Boolean,
      default: false
    },
    isReplyStatus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      offset: undefined,
      commentsCount: 0,
      comments: []
    }
  },
  computed: {},
  watch: {
    updateComments (val, oldVal) {
      if (val) {
        this.comments = []
        this.finished = false
        this.offset = undefined

        this.$emit('reset-update')
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    async onLoadingArticleComments () {
      const { data: { data } } = await getArticleComments({
        type: this.isReplyStatus ? 'c' : 'a',
        source: this.articleId,
        offset: this.offset,
        limit: 10
      })
      this.commentsCount = data.total_count
      this.$emit('update-comment-count', this.commentsCount)
      this.loading = false // 加载状态结束
      this.comments.push(...data.results) // 写入新加载的内容

      this.offset = data.last_id // 更新页码
      if (data.end_id === data.last_id) { // 加载完毕
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
</style>
