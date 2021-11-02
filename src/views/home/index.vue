<template>
  <div class="home-container">
    <van-nav-bar
      class="app-nav-bar"
    >
      <template #left>
        <span class="logo">显式™</span>
      </template>
      <template #right>
        <van-button
          class="search"
          icon="search"
          type="info"
          size="mini"
          to="/search"
          round
          plain
        >搜索</van-button>
      </template>
    </van-nav-bar>

    <van-tabs
      v-model="activeChannel"
      color="#3296fa"
      title-active-color="#3296fa"
      title-inactive-color="gray"
      :line-width="lineWidth"
      sticky
      ref="channelTabs"
      @rendered="domReady=true"
    >
      <van-tab
        v-for="channel in userChannels"
        :key="channel.id"
        :title="channel.name"
        :name="channel.id"
      >
        <article-list
          :info="channel"
        >
        </article-list>
      </van-tab>
      <template #nav-right>
        <div
          class="popup-container"
          @click="isPopuping = true"
        >
          <van-icon name="wap-nav" />
        </div>
      </template>
    </van-tabs>

    <van-popup
      v-model="isPopuping"
      position="bottom"
      get-container="body"
      close-icon-position="top-left"
      closeable
      round
      :style="{ height: '100%' }"
    >
      <channel-edit
        :channels-on="userChannels"
        :channel-this="activeChannel"
        @set-active-channel="onActivateChannel"
        @remove-channel="onRemoveChannel"
        @append-channel="onAppendChannel"
      >
      </channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import { mapState } from 'vuex'
import { getItem, setItem } from '@/utils/storage'
import ArticleList from './components/articleList.vue'
import ChannelEdit from './components/channelEdit.vue'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      userChannels: [],
      activeChannel: 0,
      isPopuping: false,
      domReady: false
    }
  },
  computed: {
    ...mapState([
      'user'
    ]),
    lineWidth () {
      if (!this.domReady) {
        return 52
      }
      if (this.activeChannel || this.userChannels.length) {
        const tabs = this.$refs.channelTabs
        const tab = tabs.$refs.titles[tabs.currentIndex]
        return tab.$el.offsetWidth
      } else {
        return 52
      }
    }
  },
  watch: {},
  created () {
    this.loadUserChannels()
  },
  mounted () {},
  methods: {
    async loadUserChannels () {
      let channels
      if (this.user) {
        const { data: { data } } = await getUserChannels()
        channels = data.channels.map(({ id, name }) => ({ id: +id, name }))
      } else {
        channels = getItem('local-channels')
        if (!channels) {
          const { data: { data } } = await getUserChannels()
          channels = data.channels.map(({ id, name }) => ({ id: +id, name }))
          setItem('local-channels', channels)
        }
      }
      this.userChannels = channels
    },
    onActivateChannel (id) {
      this.activeChannel = id
      this.isPopuping = false
    },
    onRemoveChannel (i) {
      if (this.userChannels[i].id === this.activeChannel) {
        this.activeChannel = 0
      }
      this.userChannels.splice(i, 1)
    },
    onAppendChannel (channel) {
      this.userChannels.push(channel)
    }
  }
}
</script>

<style scoped lang="less">
.logo {
  color: #fff;
  font-size: 24px;
}
.search {
  opacity: 0.8;
  width: 180px;
  height: 32px;
  color: #3296fa;
  border: none;
  font-size: 14px;
  /deep/ .van-icon {
    color: inherit;
    font-size: 16px;
  }
}
/deep/ .van-tabs__wrap {
  height: 44px;
  .van-tabs__nav {
    padding-right: 0;
  }
}
.popup-container {
  position: sticky;
  right: 0;
  padding-right: 8px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: -4px 0px 4px #fff;
  .van-icon {
    text-align: right;
    line-height: 44px;
  }
}
</style>
