<template>
  <div class="replys-list">
    <van-cell class="comment-title">回复列表</van-cell>
    <!-- 当前评论区域 -->
    <comment-item
      :comment="comment"
      :target-status="true"
    />
    <!-- 回复区域 -->
    <div
      class="reply-body"
    >
      <comments-list
        :article-id="comment.com_id"
        :is-reply-status="true"
        :update-comments="updateReplys"
        @reset-update="resetUpdate"
        @update-comment-count="replysCount = $event"
      ></comments-list>
    </div>
    <!-- 下方回复按钮 -->
    <van-cell
      class="reply-button"
      center
    >
      <van-button
        type="info"
        size="small"
        block
        plain
        round
        @click="showReplyForm"
      >
        回复该评论
      </van-button>
    </van-cell>
    <!-- 回复编辑界面弹出层 -->
    <van-popup
      v-model="isReplying"
      position="bottom"
    >
      <comment-create
        :art-id="articleId"
        :com-id="comment.com_id"
        @success="onReplycreated"
      ></comment-create>
    </van-popup>
  </div>
</template>

<script>
import CommentsList from './commentsList.vue'
import CommentItem from '@/components/commentItem.vue'
import CommentCreate from './commentCreate.vue'
import { mapState } from 'vuex'

export default {
  name: 'ReplysList',
  components: {
    CommentsList,
    CommentItem,
    CommentCreate
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      replysCount: 0,
      isReplying: false,
      updateReplys: false
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    showReplyForm () {
      if (this.user) {
        this.isReplying = true
      } else {
        this.$router.push('/login')
      }
    },
    onReplycreated (comment) {
      this.isReplying = false
      this.updateReplys = true
    },
    resetUpdate () {
      this.updateReplys = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-title {
  position: sticky;
  top: 0;
  height: 46px;
  text-align: center;
}
.reply-body {
  // position: fixed;
  // top: 46px;
  // bottom: 46px;
  // left: 0;
  // right: 0;
  overflow-y: auto;
}
.reply-button {
  position: sticky;
  bottom: 0;
  height: 46px;
}
</style>
