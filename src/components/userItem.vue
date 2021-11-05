<template>
  <div>
    <van-cell
      size="large"
      class="user-item"
      clickable
      center
      :border="true"
    >
      <template #icon>
        <van-image
          class="avatar"
          cover
          round
          :src="user.photo"
        />
      </template>
      <template #title>
        <div class="item-title">
          {{ user.name }}
        </div>
      </template>
      <template #label>
        <div class="description">
          <span class="tag" v-if="user.mutual_follow">
            <van-tag plain type="danger">互关</van-tag>
          </span>
          <span class="comments">
            <van-icon name="friends-o" />
            {{ user.fans_count }}
          </span>
        </div>
      </template>
      <template #right-icon>
        <van-button
          class="follow-button"
          :type="follow ? 'default' : 'info'"
          size="small"
          round
          :loading="loading"
          @click="toggleFollow"
        >
          <template #icon>
            <van-icon
              v-if="!follow"
              name="plus"
            />
          </template>
          {{ follow ? '取消关注' : '关注' }}
        </van-button>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { addUserFollow, removeUserFollow } from '@/api/user'

export default {
  name: 'UserItem',
  components: {},
  props: {
    user: {
      type: Object,
      required: true
    },
    following: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      loading: false,
      follow: this.following
    }
  },
  computed: {
    // routeToUser () {
    //   return {
    //     name: 'followingUser',
    //     params: {
    //       UserId: this.user.id
    //     }
    //   }
    // }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async toggleFollow () {
      // 关注列表取关，互关为假
      this.loading = true
      if (this.following) {
        await removeUserFollow(this.user.id)
      } else { // 粉丝列表关注，互关为真
        await addUserFollow(this.user.id)
      }
      this.loading = false
      this.follow = !this.follow
      this.$emit('follow-change', this.following)
    }
  }
}
</script>

<style scoped lang="less">
.user-item {
  height: 60px;
}
.avatar {
  width: 36px;
  height: 36px;
  margin-right: 10px;
}
.item-title {
  font-size: 16px;
  color: #3a3a3a;
}
.description {
  color: #b4b4b4;
  font-size: 11px;
  span {
    margin-right: 12px;
  }
  span:last-child {
    margin-right: 0;
  }
  .van-tag {
    font-size: 11px;
  }
}

.follow-button {
  width: 85px;
  height: 29px;
}
</style>
