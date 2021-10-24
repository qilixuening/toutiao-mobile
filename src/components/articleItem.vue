<template>
  <div>
    <van-cell
      size="large"
      class="article-item"
      clickable
      :border="true"
    >
      <template #title>
        <div class="item-title van-multi-ellipsis--l2">
          {{ article.title }}
        </div>
      </template>
      <template #label>
        <div
          v-if="article.cover.type===3"
          class="img-grid"
        >
          <van-image
            v-for="(img, i) in article.cover.images"
            class="three-img"
            cover
            :src="img"
            :key="i"
          />
        </div>
        <div class="description">
          <span class="tag" v-if="article.is_top">
            <van-tag plain type="danger">置顶</van-tag>
          </span>
          <span class="author">
            <van-icon name="contact" />
            {{ article.aut_name }}
          </span>
          <span class="comments">
            <van-icon name="chat-o" />
            {{ article.comment_count }}
          </span>
          <span class="time">
            {{ article.pub_date | relativeTime }}
          </span>
        </div>
      </template>
      <template
        #right-icon
        v-if="article.cover.type===1"
      >
        <van-image
          class="one-img"
          cover
          :src="article.cover.images[0]"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
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
.article-item {
  // background-color: unset;
  // border-top: 2px solid rgb(240, 240, 240);
  margin: 1px 0;
}
.item-title {
  font-size: 16px;
  color: #3a3a3a;
}
.one-img {
  flex: unset;
  margin-left: 12px;
  width: 116px;
  height: 73px;
  :only-child {
    border-radius: 6px;
  }
}
.img-grid {
  margin: 15px -2px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  .three-img {
    margin: 0 2px;
    height: 73px;
    width: 100%;
    &:first-child > :only-child {
      border-radius: 6px 0 0 6px;
    }
    &:last-child > :only-child {
      border-radius: 0 6px 6px 0;
    }
  }
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
</style>
