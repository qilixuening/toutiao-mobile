<template>
  <div class="search-history-container">
    <van-cell
      class="history-head"
      title="历史记录"
      icon="bars"
      center
    >
      <template #default>
        <van-button
          v-if="localHistory.length && isEditMode"
          class="borderless-button"
          type="default"
          size="small"
          round
          @click="clearSearchHistory"
        >清空本地记录</van-button>
      </template>
      <template #right-icon>
        <van-button
          v-if="localHistory.length"
          type="default"
          size="small"
          class="borderless-button"
          round
          @click="isEditMode = !isEditMode"
        >
          <template #default v-if="isEditMode">
            <van-icon
              name="success"
              color="#07c160"
            />
          </template>
          <template #icon v-else>
            <van-icon
              name="delete-o"
              color="#3296fa"
            />
          </template>
        </van-button>
      </template>
    </van-cell>
    <van-cell
      class="history-item"
      v-for="(item, index) in searchHistory"
      center
      :clickable="!isEditMode"
      :key="index"
      @click="changeSearchString(index)"
    >
      <template #icon>
        <div class="history-title van-ellipsis">
          <van-icon
            v-if="index < onlineHistory.length"
            name="user-circle-o"
          />
          <span>
            {{ item }}
          </span>
        </div>
        <van-button
          v-if="isEditMode && localHistory.indexOf(item) >= 0"
          class="history-remove borderless-button"
          type="default"
          icon="cross"
          size="small"
          round
          @click="removeSearchString(item)"
        ></van-button>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getUserSearchHistory } from '@/api/search'
import { mapState } from 'vuex'

export default {
  name: 'SearchHistoryIndex',
  components: {},
  props: {
    localHistory: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isEditMode: false,
      onlineHistory: []
    }
  },
  computed: {
    ...mapState([
      'user'
    ]),
    searchHistory () {
      return this.localHistory.reduce((li, s) => {
        if (li.indexOf(s) === -1) li.push(s)
        return li
      }, [...this.onlineHistory])
    }
  },
  watch: {},
  created () {
    this.loadUserOnlineHistory()
  },
  mounted () {},
  methods: {
    async loadUserOnlineHistory () {
      if (this.user) {
        const { data: { data } } = await getUserSearchHistory()
        this.onlineHistory = data.keywords
      }
    },
    changeSearchString (i) {
      if (!this.isEditMode) {
        this.$emit('select-search', this.searchHistory[i])
      }
    },
    removeSearchString (str) {
      const index = this.localHistory.indexOf(str)
      this.$emit('remove-history', index)
    },
    clearSearchHistory () {
      this.$emit('remove-history', -1)
    }
  }
}
</script>

<style scoped lang="less">
.history-head {
  height: 42px;
  color: gray;
}
.borderless-button {
  border: none;
  font-size: 14px;
  color: gray;
}
.history-item {
  height: 42px;
  justify-content: space-between;
  color: gray;
  .history-title {
    flex: 1;
  }
  .history-remove {
    flex: unset;
  }
}
</style>
