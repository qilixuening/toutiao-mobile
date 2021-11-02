<template>
  <div class="text-edit">
    <van-nav-bar
      title="昵称编辑"
      class="edit-title"
      left-text="取消"
      right-text="确定"
      @click-left="onCancel"
      @click-right="onSubmit"
    />
    <van-field
      v-model.trim="message"
      rows="2"
      type="textarea"
      maxlength="20"
      :placeholder="newValue"
      autosize
      show-word-limit
    />
  </div>
</template>

<script>
export default {
  name: 'TextEdit',
  components: {},
  props: {
    newValue: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onLoadText()
  },
  mounted () {},
  methods: {
    onLoadText () {
      this.message = this.newValue
    },
    onCancel () {
      this.$emit('complete', this.newValue)
      this.message = ''
    },
    onSubmit () {
      this.$emit('complete', this.message)
      this.message = ''
    }
  }
}
</script>

<style scoped lang="less">
</style>
