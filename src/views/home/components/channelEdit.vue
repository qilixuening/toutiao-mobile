<template>
  <div class="channel-container">
    <van-cell center :border="false">
      <template #title>
        <span class="channel-title">我的频道</span>
        <span class="channel-title-info">点击添加更多频道</span>
      </template>

      <template #right-icon>
        <span class="channel-switch-info">{{ channelStatus }}</span>
        <van-switch
          class="channel-switch"
          v-model="channelStatus"
          active-value="编辑模式"
          inactive-value="选择模式"
        />
      </template>
    </van-cell>
    <van-cell :border="false">
      <div
        class="channel-grid"
      >
        <div
          class="channel-item on"
          :class="{
            default: channel.id === 0,
            active: channel.id === channelThis,
          }"
          v-for="(channel, index) in channelsOn"
          :key="channel.id"
          @click="operateChannel(index, channel.id)"
        >
          <van-icon
            v-if="channel.id !== 0"
            v-show="channelStatus === '编辑模式'"
            class="channel-remove"
            name="cross"
          />
          <div class="van-ellipsis">{{ channel.name }}</div>
        </div>
      </div>
    </van-cell>

    <van-cell center :border="false">
      <template #title>
        <span class="channel-title">可选频道</span>
      </template>
    </van-cell>
    <van-cell :border="false">
      <div
        class="channel-grid"
      >
        <div
          class="channel-item off"
          v-for="channel in channelsOff"
          :key="channel.id"
          @click="appendChannel(channel)"
        >
          {{ channel.name }}
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import {
  getAllChannels,
  appendUserChannels,
  removeUserChannel
} from '@/api/channels'
import { setItem } from '@/utils/storage'
import { mapState } from 'vuex'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    channelThis: {
      type: Number,
      default: 0
    },
    channelsOn: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      channelsAll: [],
      channelStatus: '切换模式'
    }
  },
  computed: {
    ...mapState([
      'user'
    ]),
    channelsOff () {
      const idOnList = this.channelsOn.map(ch => ch.id)
      return this.channelsAll.filter(ch => idOnList.indexOf(ch.id) === -1)
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      const { data: { data } } = await getAllChannels()
      this.channelsAll = data.channels
        .sort((a, b) => a.id - b.id)
        .map(({ id, name }) => ({ id: +id, name }))
    },
    async appendChannel (channel) {
      this.$emit('append-channel', channel)
      if (this.user) {
        await appendUserChannels({
          channels: [{
            id: channel.id,
            seq: this.channelsOn.length
          }]
        })
      } else {
        setItem('local-channels', this.channelsOn)
      }
    },
    operateChannel (i, id) {
      if (this.channelStatus === '编辑模式') {
        this.removeChannel(i, id)
      } else {
        this.setActiveChannel(id)
      }
    },
    setActiveChannel (id) {
      this.$emit('set-active-channel', id)
    },
    async removeChannel (i, id) {
      if (id) {
        this.$emit('remove-channel', i)
        if (this.user) {
          await removeUserChannel(id)
        } else {
          setItem('local-channels', this.channelsOn)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-container {
  margin-top: 54px;
}
.channel-title {
  padding-right: 12px;
  font-size: 16px;
  color: #333333;
}
.channel-title-info {
  font-size: 14px;
  color: #b3b3b3;
}
.channel-switch-info {
  font-size: 14px;
  padding: 0 10px;
}
.channel-switch {
  font-size: 18px;
}
.channel-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 9px;
  .channel-item {
    position: relative;
    width: 79px;
    height: 43px;
    box-sizing: border-box;
    border-radius: 4px;
    text-align: center;
    line-height: 43px;
    .channel-remove {
      position: absolute;
      right: 0px;
      top: 0px;
      padding: 1px;
      border-radius: 0 4px;
      color: #fff;
      background-color: #3296fa;
      font-size: 12px;
    }
  }
  .on {
    border: 1px solid rgb(245, 245, 245);
  }
  .default {
    background-color: rgb(245, 245, 245);
  }
  .on.active {
    color: #3296fa;
    border: 1px solid #3296fa;
  }
  .off {
    color:gray;
    border: 1px solid rgb(245, 245, 245);
  }
}
</style>
