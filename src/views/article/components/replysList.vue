<template>
  <div class="replys-list">
    <van-cell>回复列表</van-cell>
    <comment-item
      :comment="comment"
      :target-status="true"
    />
    <comments-list
      :article-id="comment.com_id"
      :is-reply-status="true"
      @update-comment-count="replysCount = $event"
    ></comments-list>
  </div>
</template>

<script>
import CommentsList from './commentsList.vue'
import CommentItem from '@/components/commentItem.vue'

export default {
  name: 'ReplysList',
  components: {
    CommentsList,
    CommentItem
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      replysCount: 0
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
</style>
