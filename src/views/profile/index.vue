<template>
  <div class="profile-container">
    <van-nav-bar
      title="个人资料"
      class="app-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell
      center
      title="手机号"
      :value="profile.mobile"
    />

    <van-cell
      center
      is-link
      title="头像"
      clickable
      @click="$refs.selectImage.chooseFile()"
    >
      <van-image
        fit="cover"
        round
        class="avatar"
        :src="profile.photo"
      />
    </van-cell>

    <van-cell
      title="昵称"
      center
      is-link
      clickable
      :value="profile.name"
      @click="onEditing('text-edit')"
    />
    <van-cell
      title="性别"
      center
      is-link
      clickable
      :value="genders[profile.gender]"
      @click="onEditing('gender-edit')"
    />
    <van-cell
      title="生日"
      center
      is-link
      clickable
      :value="profile.birthday"
      @click="onEditing('birthday-edit')"
    />
    <van-uploader
      v-show="false"
      ref="selectImage"
      result-type="file"
      :after-read="afterRead"
    />
    <van-popup
      v-model="isEditing"
      position="bottom"
      :round="editComponent !== 'image-edit'"
      :overlay="editComponent !== 'image-edit'"
      :class="{'image-popup': editComponent === 'image-edit'}"
    >
      <component
        :is="editComponent"
        :new-value="oldValue"
        @complete="onSubmit"
      ></component>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, setUserProfile, setUserPhoto } from '@/api/user'
import imageEdit from './components/imageEdit.vue'
import textEdit from './components/textEdit.vue'
import genderEdit from './components/genderEdit.vue'
import birthdayEdit from './components/birthdayEdit.vue'

export default {
  name: 'ProfileIndex',
  components: {
    textEdit,
    genderEdit,
    birthdayEdit,
    imageEdit
  },
  props: {},
  data () {
    return {
      profile: {},
      genders: {
        0: '男',
        1: '女'
      },
      editComponent: 'text-edit',
      oldValue: undefined,
      isEditing: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    async loadUserProfile () {
      const { data: { data }, status } = await getUserProfile()
      if (status === 200) {
        this.profile = data
      }
    },
    onEditing (componentName) {
      switch (componentName) {
        case 'text-edit':
          this.oldValue = this.profile.name
          break
        case 'gender-edit':
          this.oldValue = this.profile.gender
          break
        case 'birthday-edit':
          this.oldValue = this.profile.birthday
          break
      }
      this.editComponent = componentName
      this.isEditing = true
    },
    async onSubmit (newValue) {
      if (newValue !== this.oldValue) {
        const newData = {}
        switch (this.editComponent) {
          case 'text-edit':
            this.profile.name = newValue
            newData.name = newValue
            break
          case 'gender-edit':
            this.profile.gender = newValue
            newData.gender = newValue
            break
          case 'birthday-edit':
            this.profile.birthday = newValue
            newData.birthday = newValue
            break
          case 'image-edit':
            this.profile.photo = window.URL.createObjectURL(newValue)
            newData.photo = newValue
        }
        this.$toast.loading({
          message: '正在修改...',
          forbidClick: true,
          duration: 0
        })
        try {
          if (newData) {
            if (newData.photo) {
              const fd = new FormData()
              fd.append('photo', newData.photo)
              await setUserPhoto(fd)
            } else {
              await setUserProfile(newData)
            }
            this.$toast.success('修改成功')
          }
        } catch (err) {
          if (err && err.response && err.response.status === 409) {
            this.$toast.fail('昵称已存在')
          } else {
            this.$toast.fail('修改失败，请重试')
          }
          this.profile[Object.keys(newData)[0]] = this.oldValue
        }
      } else {
        this.$toast.fail('未作修改')
      }
      this.isEditing = false
    },
    afterRead ({ file }) {
      // 此时可以自行将文件上传至服务器
      this.oldValue = file
      this.onEditing('image-edit')
    }
  }
}
</script>

<style scoped lang="less">
.van-cell {
  height: 44px;
}
.van-cell__value {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.avatar {
  height: 35px;
  width: 35px;
  overflow: visible;
}
.image-popup {
  width: 100%;
  height: 100%;
  background-color: unset;
}
</style>
