<template>
  <div class="search-history-container">
    <van-cell
      title="历史记录"
      center
    >
      <template #default v-if="isEditMode">
        <van-button
          type="default"
          size="small"
          round
        >全部删除</van-button>
      </template>
      <template #right-icon>
        <van-button
          type="default"
          size="small"
          round
          @click="isEditMode = !isEditMode"
        >
          <template #default v-if="isEditMode">确定</template>
          <template #icon v-else>
            <van-icon name="delete-o" />
          </template>
        </van-button>
      </template>
    </van-cell>
    <van-cell
      v-for="(item, index) in 4"
      center
      clickable
      :key="index"
    >
      <template #default>
        <div>
          {{ item }}
        </div>
      </template>
      <template #right-icon v-if="isEditMode">
        <van-button
          type="default"
          icon="close"
          size="mini"
          round
        ></van-button>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistoryIndex',
  components: {},
  props: {},
  data () {
    return {
      isEditMode: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
