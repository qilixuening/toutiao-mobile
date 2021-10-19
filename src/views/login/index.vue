<template>
  <div class="login-container">
    <van-nav-bar
      title="标题"
      class="app-nav-bar"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        left-icon="manager-o"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="user.code"
        clearable
        left-icon="certificate"
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button
            size="small"
            color="#3296fa"
            plain
            round
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div class="login-button">
      <van-button
        size="normal"
        type="info"
        color="#3296fa"
        block
      >
        登录/注册
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onClickLeft () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.login-button {
  padding: 26px 16px;
}
</style>
