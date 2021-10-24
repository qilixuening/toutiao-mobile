<template>
  <div class="channel-container">
    <van-cell center :border="false">
      <template #title>
        <span class="channel-title">我的频道</span>
      </template>
      <template #default>
        <van-button
          class="edit-button"
          type='danger'
          size="mini"
          plain
          round
        >编辑</van-button>
      </template>
    </van-cell>
    <van-cell :border="false">
      <div
        class="channel-grid"
      >
        <div
          class="channel-item on"
          :class="{
            default: channel.id === '0',
            active: channel.id === channelThis,
          }"
          v-for="channel in channelsOn"
          :key="channel.id"
        >
          {{ channel.name }}
        </div>
      </div>
    </van-cell>

    <van-cell center :border="false">
      <template #title>
        <span class="channel-title">我的频道</span>
      </template>
    </van-cell>
    <van-cell :border="false">
      <div
        class="channel-grid"
      >
        <div
          class="channel-item off"
          v-for="i in 54"
          :key="i*2+1"
        >
          多一个{{ i*2+1 }}hahahahha
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    channelsOn: {
      type: Array,
      required: true
    },
    channelThis: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.channel-container {
  margin-top: 54px;
}
.channel-title {
  font-size: 16px;
  color: #333333;
}
.edit-button {
  font-size: 14px;
  padding: 0 10px;
}
.channel-grid {
  overflow: scroll;
  max-height: 200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 9px;
  .channel-item {
    width: 79px;
    height: 43px;
    box-sizing: border-box;
    border-radius: 4px;
    text-align: center;
    line-height: 43px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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
