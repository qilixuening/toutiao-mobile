<template>
  <div class="chat-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="小智同学"
      class="app-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 聊天内容 -->
    <div class="chat-area">
      <div
        class="chat-list"
        ref="chatList"
      >
        <div
          class="chat-item"
          v-for="(item, index) in history"
          :key="index"
          :class="{
            'chat-my': item.self,
            'chat-other': !item.self
          }"
        >
          <span>{{ item.msg }}</span>
        </div>
      </div>
      <!-- 聊天输入 -->
      <div
        class="input-area"
      >
        <van-field
          v-model.trim="message"
          rows="1"
          type="textarea"
          maxlength="50"
          autosize
          center
          @click-input="updateScroll"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              :disabled="disabled"
              @click="onSendingMessage"
            >
              发送
            </van-button>
          </template>
        </van-field>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapState } from 'vuex'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'ChatIndex',
  components: {},
  props: {},
  data () {
    return {
      message: '',
      socket: undefined,
      history: getItem('chat-history') || []
    }
  },
  computed: {
    ...mapState([
      'user'
    ]),
    disabled () {
      return !this.message
    }
  },
  watch: {
    history (newVal) {
      setItem('chat-history', newVal)
      this.updateScroll()
    }
  },
  created () {
    this.loadSocketClient()
  },
  mounted () {},
  methods: {
    loadSocketClient () {
      const socket = io(
        'http://toutiao.itheima.net', {
          query: {
            token: `Bearer ${this.user.token}`
          },
          transports: ['websocket']
        }
      )
      this.socket = socket
      window.socket = socket
      socket.on('connect', () => {
        console.log('connected')
      })
      socket.on('disconnect', () => {
        console.log('disconnected')
      })
      socket.on('message', data => {
        this.history.push({
          ...data,
          self: false
        })
      })
    },
    onSendingMessage () {
      if (this.message) {
        const currentMessage = {
          msg: this.message,
          timestamp: Date.now(),
          self: true
        }
        this.socket.emit('message', currentMessage)
        this.history.push(currentMessage)
        this.message = ''
      }
    },
    updateScroll () {
      const chatListDOM = this.$refs.chatList
      this.$nextTick(() => {
        chatListDOM.scrollTop = chatListDOM.scrollHeight
      })
    }
  }
}
</script>

<style scoped lang="less">
.app-nav-bar {
  position: sticky;
  top: 0;
}
.chat-area {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 46px;
  bottom: 0;
  left: 0;
  right: 0;
  .chat-list {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: unset;
    .chat-item {
      margin: 8px 16px;
      background-color: #fff;
      max-width: 80%;
      border-radius: 6px;
      padding: 8px;
      font-size: 16px;
      color: rgb(32, 32, 32);
    }
    .chat-my {
      align-self: flex-end;
      background-color: rgb(100, 207, 135);
      color: #fff;
    }
  }
  .input-area {
    flex: unset;
  }
}
</style>
