<template>
  <div class="search-suggestion-container">
    <van-cell
      v-for="(str, index) in revelantHighlightStringList"
      center
      :key="index"
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
import { getSearchSuggestion } from '@/api/searchx'

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
        replaceReg = new RegExp(this.searchString, 'gi')
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
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .matched-substring {
  color: red;
}
</style>
