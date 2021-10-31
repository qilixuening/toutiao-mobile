<template>
  <div class="comment-create-container">
    <van-form @submit="onCommentSubmit">
      <van-field
        v-model.trim="content"
        rows="2"
        autosize
        type="textarea"
        maxlength="150"
        placeholder="请输入内容"
        show-word-limit
      >
        <template #button>
          <van-button
            :disabled="!content"
          >评论</van-button>
        </template>
      </van-field>
    </van-form>
  </div>
</template>

<script>
import { addComment } from '@/api/comments'
import { mapState } from 'vuex'

export default {
  name: 'CommentCreate',
  components: {},
  props: {
    artId: {
      type: String,
      required: true
    },
    comId: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      content: ''
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
    async onCommentSubmit () {
      this.$toast.loading({
        message: '发送中...',
        forbidClick: true
      })
      const { status, data: { data } } = await addComment({
        target: this.comId ? this.comId : this.artId,
        content: this.content,
        art_id: this.comId ? this.artId : this.comId
      })
      if (status === 201) {
        this.$emit('success', data)
        this.content = ''
        this.$toast.success('评论成功')
      } else if (status === 403) {
        this.$toast.fail('此处禁止评论')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
