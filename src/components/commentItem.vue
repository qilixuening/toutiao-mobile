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
          <van-button>
            <template #icon>
              <van-icon
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
          {{ comment.conetent }}
        </div>
        <div class="description">
          <span class="time">
            {{ comment.pubdate | relativeTime }}
          </span>
          <van-button>
            {{ comemnt.reply_count }}回复
          </van-button>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  components: {},
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.author-avatar {
  width: 35px;
  height: 35px;
  margin-right: 8px;
}
.item-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.van-cell__title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .item-title {
    font-size: 16px;
    color: #3a3a3a;
  }
  .description {
    color: #b4b4b4;
    font-size: 11px;
    span {
      margin-right: 12px;
    }
    span:last-child {
      margin-right: 0;
    }
    .van-tag {
      font-size: 11px;
    }
  }
}
</style>
