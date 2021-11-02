<template>
  <div class="gender-edit">
    <van-picker
      title="选择性别"
      show-toolbar
      :columns="genders"
      :default-index="newValue"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
export default {
  name: 'GenderEdit',
  components: {},
  props: {
    newValue: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      genders: ['男', '女']
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onCancel () {
      this.$emit('complete', this.newValue)
    },
    onConfirm (value, index) {
      this.$emit('complete', index)
    }
  }
}
</script>

<style scoped lang="less">
</style>
