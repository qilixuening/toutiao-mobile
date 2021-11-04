<template>
  <div class="birthday-edit">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'BirthdayEdit',
  components: {},
  props: {
    newValue: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: this.newValue ? new Date(this.newValue) : new Date()
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
    onConfirm () {
      this.$emit('complete', dayjs(this.currentDate).format('YYYY-MM-DD'))
    }
  }
}
</script>

<style scoped lang="less">
</style>
