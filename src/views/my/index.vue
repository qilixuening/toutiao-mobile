<template>
  <div class="my-container">
    <van-cell-group
      v-if="user"
      class="my-banner"
    >
    <van-cell
      class="base-info"
      :border="false"
      center
    >
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #icon>
        <van-image
          class="avatar"
          fit="cover"
          :src="admin.photo"
          round
        />
      </template>
      <template #title>
        <span class="nickname">{{ admin.name }}</span>
      </template>
      <template #right-icon>
        <van-button
          type="info"
          size="mini"
          class="user-edit"
          round
          plain
          to="/profile"
        >编辑资料</van-button>
      </template>
    </van-cell>
    <van-cell
        :border="false"
        class="data-info"
      >
      <van-grid
        :border="false"
        :column-num="4"
      >
        <van-grid-item class="data-item" to="/my/articles">
          <template #icon>
            <span class="data-num">{{ admin.art_count }}</span>
          </template>
          <template #text>
            <span class="data-text">头条</span>
          </template>
        </van-grid-item>
        <van-grid-item class="data-item" to="/my/followings">
          <template #icon>
            <span class="data-num">{{ admin.follow_count }}</span>
          </template>
          <template #text>
            <span class="data-text">关注</span>
          </template>
        </van-grid-item>
        <van-grid-item class="data-item" to="/my/followers">
          <template #icon>
            <span class="data-num">{{ admin.fans_count }}</span>
          </template>
          <template #text>
            <span class="data-text">粉丝</span>
          </template>
        </van-grid-item>
        <van-grid-item class="data-item">
          <template #icon>
            <span class="data-num">{{ admin.like_count }}</span>
          </template>
          <template #text>
            <span class="data-text">获赞</span>
          </template>
        </van-grid-item>
      </van-grid>
    </van-cell>
    </van-cell-group>
    <van-cell
      v-else
      class="logout-banner"
      :border="false"
      center
    >
      <div
        class="login-box"
        @click="$router.replace({
          name: 'login',
          query: {
            redirect: '/my'
          }
        })"
      >
        <van-icon
          name="graphic"
          class="login-avatar"
        />
      </div>
      <div class="info">登录/注册</div>
    </van-cell>
    <van-cell-group>
      <van-cell class="data-info">
        <van-grid
          :border="false"
          :column-num="2"
          clickable
        >
          <van-grid-item class="data-item2" :to="routeToCollections">
            <template #icon>
              <van-icon name="star-o" class="data-icon-star"/>
            </template>
            <template #text>
              <span class="data-text">收藏</span>
            </template>
          </van-grid-item>
          <van-grid-item class="data-item2" :to="routeToHistory">
            <template #icon>
              <van-icon name="clock-o" class="data-icon-history"/>
            </template>
            <template #text>
              <span class="data-text">历史</span>
            </template>
          </van-grid-item>
        </van-grid>
      </van-cell>
    </van-cell-group>
    <van-cell-group
      :border="false"
      class="utilities"
    >
      <van-cell v-if="user" title="消息通知" is-link to="" />
      <van-cell title="小智同学" is-link to="/chat" />
    </van-cell-group>
    <van-cell
      v-if="user"
      class="logout"
      title="注销登录"
      to=""
      clickable
      :border="false"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      admin: {},
      routeToCollections: {
        name: 'userArticles',
        params: {
          userIdOrType: 'collections'
        }
      },
      routeToHistory: {
        name: 'userArticles',
        params: {
          userIdOrType: 'history'
        }
      }
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  watch: {},
  created () {
    this.loadUserInfo()
  },
  mounted () {},
  activated () {
    this.loadUserInfo()
  },
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '确认退出',
        message: '退出后需要重新登录'
      }).then(() => {
        this.$store.commit('removeUser')
      }).catch(() => {
      })
    },
    async loadUserInfo () {
      if (this.user) {
        const { data } = await getUserInfo()
        this.admin = data.data
      }
    }
  }
}
</script>

<style scoped lang="less">
.my-banner {
  background-color: rgb(49, 145, 255);
  .van-cell {
    background-color: unset;
    /deep/ .van-grid-item__content {
      background-color: inherit;
    }
  }
}
.logout-banner {
  background-color: rgb(237, 250, 255);
  height: 180px;
  .login-box {
    width: 66px;
    height: 66px;
    background-color: #fff;
    border-radius: 50%;
    margin: 0 auto;
    .login-avatar {
      display: block;
      text-align: center;
      line-height: 66px;
      font-size: 32px;
      color: rgb(49, 145, 255);
    }
  }
  .info {
    color: rgb(49, 145, 255);
    text-align: center;
    font-size: 14px;
    padding-top: 4px;
  }
}
.base-info {
  box-sizing: border-box;
  height: 115px;
  padding-top: 38px;
  padding-bottom: 11px;
  .avatar {
    height: 66px;
    width: 66px;
    border: 1px solid #fff;
    box-sizing: border-box;
  }
  .nickname {
    padding-left: 11px;
    color: #fff;
    font-size: 15px;
  }
  .user-edit {
    width: 58px;
    height: 16px;
    color: #666666;
    font-size: 10px;
  }
}
.data-info {
  padding-top: 0;
  padding-bottom: 0;
  .data-item {
    height: 65px;
    color: #fff;
    .data-num {
      font-size: 18px;
    }
    .data-text {
      font-size: 11px;
    }
  }
  .data-item2 {
    height: 70px;
    font-size: 22px;
    .data-icon-star {
      color: #eb5253;
    }
    .data-icon-history {
      color: #ff9d1d;
    }
    .data-text {
      font-size: 14px;
      color: #333333;
    }
  }
}
.utilities {
  margin-top: 4px;
  margin-bottom: 4px;
}
.logout {
  color: #eb5253;
  text-align: center;
  font-size: 16px;
}
</style>
