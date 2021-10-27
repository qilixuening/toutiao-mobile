<template>
  <div class="search-suggestion-container">
    <van-cell
      v-for="(str, index) in revelantHighlightStringList"
      center
      clickable
      :key="index"
      @click="changeSearchString(index)"
    >
      <template #icon>
        <van-icon name="search" />
      </template>
      <template #default>
        <div
          v-html="str"
        >
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'

export default {
  name: 'SearchSuggestionIndex',
  components: {},
  props: {
    searchString: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      revelantStringList: [],
      debouncer: undefined
    }
  },
  computed: {
    revelantHighlightStringList () {
      let replaceReg, replaceString
      return this.revelantStringList.map(str => {
        const parsedString = this.searchString.replace(/(\+|\||\(|\)|\{|\}|\[|\]|\^|\*|\?|\$|\.|\\)/g, $0 => '\\' + $0)
        replaceReg = new RegExp(parsedString, 'gi')
        replaceString = $0 => `<span class="matched-substring">${$0}</span>`
        return str.replace(replaceReg, replaceString)
      })
    }
  },
  watch: {
    searchString: {
      handler: 'getRevelantstringDeboundced',
      immediate: true
    }
  },
  created () {},
  mounted () {},
  beforeDestroy () {
    if (this.debouncer) {
      clearTimeout(this.debouncer)
    }
  },
  methods: {
    async getRevelantstring (str) {
      const { data: { data } } = await getSearchSuggestion(str)

      this.revelantStringList = data.options.filter(s => s)
    },
    getRevelantstringDeboundced (newStr, oldStr) {
      if (this.debouncer) {
        clearTimeout(this.debouncer)
      }
      if (newStr) {
        this.debouncer = setTimeout(async () => {
          await this.getRevelantstring(newStr)
        }, 500)
      }
    },
    changeSearchString (i) {
      this.$emit('select-search', this.revelantStringList[i])
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .matched-substring {
  color: red;
}
</style>
