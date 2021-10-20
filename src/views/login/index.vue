<template>
  <div class="login-container">
    <van-nav-bar
      title="登录/注册"
      class="app-nav-bar"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="userForm"
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-cell-group inset>
        <van-field
          v-model="user.mobile"
          left-icon="manager-o"
          placeholder="请输入手机号"
          name="mobile"
          :rules="userLoginRules.mobile"
        />
        <van-field
          v-model="user.code"
          clearable
          left-icon="certificate"
          placeholder="请输入验证码"
          name="code"
          :rules="userLoginRules.code"
        >
          <template #button>
            <van-button
              size="small"
              color="#3296fa"
              plain
              round
              native-type="button"
              @click="onGettingCode"
            >
              获取验证码
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
          native-type="submit"
        >
          登录/注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userLoginRules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'onChange' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'onChange' },
          { pattern: /\d{6}$/, message: '验证码格式错误' }
        ]
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
    },
    async onLogin () {
      this.$toast.loading({
        message: '登录中...',
        duration: 0,
        forbidClick: true
      })
      try {
        const { data } = await login(this.user)
        console.log(data)
        this.$toast.success('登录成功')
      } catch (error) {
        this.$toast.fail('登录失败')
      }
    },
    onFailed (info) {
      const err = info.errors[0]
      if (err) {
        this.$toast({
          message: err.message,
          position: 'top'
        })
      }
    },
    async onGettingCode () {
      try {
        await this.$refs.userForm.validate('mobile')

        const res = await sendCode(this.user.mobile)
        if (res.status === 200) {
          this.$toast({
            message: '验证码已发送，请注意查收',
            position: 'top'
          })
        }
      } catch (err) {
        console.dir(err)
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败的错误提示
          message = '请勿频繁获取验证码~'
        } else if (err.name === 'mobile') {
          // 表单验证失败的错误提示
          message = err.message
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }

        // 提示用户
        this.$toast({
          message,
          position: 'top'
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-button {
  padding: 26px 16px;
}
</style>
