<template>
  <div class="my-followings">
    <van-nav-bar
      :title="`我的关注(${totalCount > 99 ? '99+' : totalCount})`"
      class="app-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <van-list
      class="user-list"
      v-if="itemLoading || users.length"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoadingFollowings"
    >
      <van-skeleton
        animate
        title
        avatar
        avatar-shape="square"
        avatar-size="60px"
        :row="5"
        :loading="itemLoading"
      >
        <user-item
          v-for="(item, index) in users"
          :key="index"
          :user="item"
          :following="true"
          @follow-change="onFollow(index, $event)"
        />
      </van-skeleton>
    </van-list>
    <van-empty
      v-else
      description="暂无内容"
    />
  </div>
</template>

<script>
import { getUserFollowings } from '@/api/user'
import UserItem from '@/components/userItem.vue'

export default {
  name: 'MyFollowings',
  components: {
    UserItem
  },
  props: {},
  data () {
    return {
      users: [],
      loading: false,
      itemLoading: true,
      finished: false,
      page: 1,
      perPage: 10,
      totalCount: 0
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoadingFollowings () {
      const { data: { data, message } } = await getUserFollowings({
        page: this.page,
        per_page: this.perPage
      })
      if (message === 'OK') {
        this.itemLoading = false // 一旦有数据获取到，骨架屏消失
        this.totalCount = data.total_count
        this.users.push(...data.results) // 写入新加载的内容
      }
      this.loading = false // 加载状态结束
      this.page++
      if (!data.results.length) { // 加载完毕
        this.finished = true
        this.itemLoading = false // 如果没有数据，骨架屏强制消失
      }
    },
    onFollow (i, following) {
      this.users.splice(i, 1)
    }
  }
}
</script>

<style scoped lang="less">
.user-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 0px;
  overflow-y: auto;
}
.van-skeleton__row {
  background-color: #ebedf0;
}
</style>
