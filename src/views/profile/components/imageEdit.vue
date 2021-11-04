<template>
  <div class="image-edit">
    <img
      class="image"
      ref="img"
      :src="url"
    />
    <van-cell
      class="bar title-bar"
      title="编辑头像"
      center
      :border="false"
    />
    <van-cell
      class="bar operate-bar"
      center
    >
      <template #title>
        <van-button
          type="default"
          size="small"
          round
          @click="onCancel"
        >
          取消
        </van-button>
      </template>
      <template #default>
        <van-button
          type="info"
          size="small"
          round
          @click="onSubmit"
        >
          确定
        </van-button>
      </template>
    </van-cell>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default {
  name: 'ImageEdit',
  components: {},
  props: {
    newValue: {
      type: File,
      required: true
    }
  },
  data () {
    return {
      cropper: undefined
    }
  },
  computed: {
    url () {
      return window.URL.createObjectURL(this.newValue)
    }
  },
  watch: {
    newValue () {
      this.loadCropper()
    }
  },
  created () {},
  mounted () {
    this.loadCropper()
  },
  methods: {
    loadCropper () {
      if (this.cropper) {
        this.cropper.replace(this.url)
      } else {
        this.cropper = new Cropper(this.$refs.img, {
          viewMode: 1,
          dragMode: 'move',
          initialAspectRatio: 1,
          background: false,
          highlight: false,
          autoCropArea: 0.9,
          guides: false,
          rotatable: false,
          cropBoxMovable: false,
          cropBoxResizable: false,
          toggleDragModeOnDblclick: false
        })
      }
    },
    onCancel () {
      this.$emit('complete', this.newValue)
    },
    async onSubmit () {
      this.$emit('complete', await this.getCroppedBlob())
    },
    getCroppedBlob () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas({
          imageSmoothingQuality: 'high'
        }).toBlob(blob => resolve(blob))
      })
    }
  }
}
</script>

<style scoped lang="less">
.image-edit {
  height: 100%;
  width: 100%;
  max-width: 100%;
  background: unset;
  .bar {
    background-color: unset;
    position: fixed;
    height: 46px;
  }
  .title-bar {
    top: 0;
    color: lightgray;
    text-align: right;
  }
  .operate-bar {
    bottom: 0;
    .van-button {
      padding: 0 15px;
    }
  }
  .img {
    object-fit: contain;
  }
}
</style>
