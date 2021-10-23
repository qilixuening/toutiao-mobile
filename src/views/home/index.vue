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
      :line-width="activeLineWidth"
      sticky
      ref="channelTabs"
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
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/articleList.vue'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      userChannels: [],
      activeChannel: '0',
      activeLineWidth: 52
    }
  },
  computed: {},
  watch: {
    activeChannel (oldCh, newCh) {
      this.setActiveLineWidth()
    }
  },
  created () {
    this.loadUserChannels()
  },
  mounted () {},
  methods: {
    async loadUserChannels () {
      const { data } = await getUserChannels()
      this.userChannels = data.data.channels
    },
    setActiveLineWidth () {
      const tabs = this.$refs.channelTabs
      const tab = tabs.$refs.titles[tabs.currentIndex]
      this.activeLineWidth = tab.$el.offsetWidth
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
</style>
