<template>
  <div>
    <van-cell
      size="large"
      class="comment-item"
      clickable
      :border="true"
    >
      <template #icon>
        <van-image
          class="author-avatar"
          round
          fit="cover"
          :src="comment.aut_photo"
        />
      </template>
      <template #title>
        <div class="item-title">
          <div>{{ comment.aut_name }}</div>
          <van-button
            round
            size="mini"
            :loading="loading"
            @click="onCommentLiking"
          >
            <template #icon>
              <van-icon
                :class="{ liked: comment.is_liking }"
                :name="comment.is_liking
                  ? 'good-job'
                  : 'good-job-o'
                "
              />
            </template>
            <span v-if="comment.like_count">{{ comment.like_count }}</span>
          </van-button>
        </div>
      </template>
      <template #label>
        <div class="item-content van-multi-ellipsis--l2">
          {{ comment.content }}
        </div>
        <div class="description">
          <span class="time">
            {{ comment.pubdate | timeFormat('M-D HH:mm') }}
          </span>
          <van-button
            v-if="!targetStatus"
            size="mini"
            round
            @click="$emit('bubble', comment)"
          >
            {{ comment.reply_count }} 回复
          </van-button>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { setCommentLike, removeCommentLike } from '@/api/comments'
import { mapState } from 'vuex'

export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true
    },
    targetStatus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false
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
    async onCommentLiking () {
      if (this.user) {
        this.loading = true
        if (this.comment.is_liking) {
          const { status } = await removeCommentLike(this.comment.com_id)
          if (status === 204) {
            this.comment.is_liking = false
            this.comment.like_count--
          }
        } else {
          const { status } = await setCommentLike(this.comment.com_id)
          if (status === 201) {
            this.comment.is_liking = true
            this.comment.like_count++
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
.author-avatar {
  width: 35px;
  height: 35px;
  margin-right: 13px;
}
.item-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #406599;
  .van-button {
    color: #777777;
    border: none;
    padding: 0 10px;
    .van-icon {
      font-size: 16px;
    }
    .liked {
      color: gold;
    }
  }
}
.item-content {
  color: #333333;
  font-size: 16px;
  padding: 6px 0;
}
.description {
  color: #333333;
  font-size: 10px;
  display: flex;
  align-items: center;
  .time {
    margin-right: 12px;
  }
  .van-button {
    color: inherit;
    border: none;
    padding: 0 6px;
  }
}
</style>
