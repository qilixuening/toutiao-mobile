<template>
  <div>
    <van-cell
      size="large"
      class="article-item"
      clickable
    >
      <template #title>
        <div class="item-title van-multi-ellipsis--l2">
          {{ article.title }}
        </div>
      </template>
      <template #label>
        <van-grid
          v-if="article.cover.type===3"
          class="three-image"
          :border="false"
          :column-num="3"
        >
          <van-grid-item
            v-for="(img, i) in article.cover.images"
            :key="i"
          >
            <van-image
              class="three-img"
              cover
              :src="img"
            />
          </van-grid-item>
        </van-grid>
        <div class="description">
          <van-icon name="contact" />
          <span>{{ article.aut_name }}</span>
          <van-icon name="chat-o" />
          <span>{{ article.comment_count }}</span>
          <span>{{ article.pub_date }}</span>
        </div>
      </template>
      <template
        #right-icon
        v-if="article.cover.type===1"
      >
        <van-image
          cover
          :src="article.cover.images[0]"
          class="one-img"
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
.item-title {
  font-size: 16px;
  color: #3a3a3a;
}
.one-img {
  flex: unset;
  margin-left: 12px;
  width: 116px;
  height: 73px;
}
/deep/ .van-grid-item__content {
  padding: 0;
  .three-img {
    height: 73px;
    width: 110px;
  }
}

</style>
