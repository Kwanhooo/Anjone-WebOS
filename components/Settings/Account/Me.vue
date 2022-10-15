<template>
  <div class="wrapper">
    <div class="avatar-wrapper">
      <div class="avatar-editor">
        <img
          :src="fileList.length === 0 ? avatarUrl : newAvatarUrl"
          alt="头像"
        />
      </div>
      <div class="change-avatar-btn">
        <div class="change-avatar-text">
          <a-upload
            :file-list="fileList"
            :remove="handleRemove"
            :before-upload="beforeUpload"
            style="max-width: 150px"
            accept="image/*"
          >
            <a-button> <a-icon type="upload" />更改头像</a-button>
          </a-upload>
          <a-button
            v-show="fileList.length !== 0"
            type="primary"
            :disabled="fileList.length === 0"
            :loading="uploading"
            style="margin-left: 10px"
            @click="handleUpload"
          >
            {{ uploading ? '正在上传' : '确认更改' }}
          </a-button>
        </div>
        <input type="file" style="display: none" />
      </div>
    </div>

    <div class="info-editor">
      <span class="info-editor-key">账户昵称</span>
      <input
        v-model="username"
        :class="{
          'info-editor-value': true,
          'info-editor-value-active': active.username,
        }"
        type="text"
        :disabled="!active.username"
      />
    </div>
    <div class="info-editor">
      <span class="info-editor-key">注册手机</span>
      <input
        v-model="phone"
        :class="{
          'info-editor-value': true,
          'info-editor-value-active': active.phone,
        }"
        type="text"
        :disabled="!active.phone"
      />
      <span
        :class="{
          'get-captcha': true,
          'get-captcha-active': active.getCaptcha,
        }"
        @click="onGetCaptchaClicked()"
        >{{ captchaTips }}</span
      >
    </div>
    <div class="info-editor">
      <span class="info-editor-key">登录密码</span>
      <input
        v-model="password"
        :class="{
          'info-editor-value': true,
          'info-editor-value-active': active.password,
        }"
        :type="isShowPassword ? 'text' : 'password'"
        :disabled="!active.password"
      />
      <img
        :src="
          isShowPassword
            ? require('assets/svg/eye-hide.svg')
            : require('assets/svg/eye.svg')
        "
        alt="show"
        :class="{
          'toggle-show-password': true,
          'get-captcha-active': active.password,
        }"
        @click="toggleShowPassword()"
      />
    </div>
    <div class="info-editor">
      <span class="info-editor-key">填验证码</span>
      <input
        v-model="captcha"
        :class="{
          'info-editor-value': true,
          'info-editor-value-active': active.captcha,
        }"
        type="text"
        :disabled="!active.captcha"
      />
    </div>
    <div class="info-editor">
      <span class="info-editor-key">注册时间</span>
      <span class="info-editor-value">{{ registerTime }}</span>
    </div>
    <div class="info-editor">
      <span class="info-editor-key">设备权限</span>
      <span class="info-editor-value">{{ role }}</span>
    </div>
    <div class="info-editor">
      <button class="submit" @click.prevent="onModifyClicked()">
        {{ active.unlock ? '确认修改' : '修改信息' }}
      </button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { isValidPhone } from '@/utils/validate'
import { Status } from '@/utils/magic-numbers'
import { resetAvatar } from '@/api/file'

export default Vue.extend({
  name: 'Me',
  data() {
    return {
      // view
      avatarUrl: '',
      newAvatarUrl: '',
      fileList: [],
      uploading: false,
      username: '',
      phone: '',
      registerTime: '',
      role: '',
      password: '',
      captcha: '',
      // logic effect
      active: {
        unlock: false,
        username: false,
        phone: false,
        getCaptcha: false,
        password: false,
        captcha: false,
      },
      isShowPassword: false,
      captchaTips: '获取验证码',
      timer: null,
      countDown: 10,
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload(file) {
      const vm = this
      this.fileList = []
      this.fileList = [...this.fileList, file]
      if (/^image/.test(file.type)) {
        // 创建一个reader
        const reader = new FileReader()
        // 将图片将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = function () {
          vm.newAvatarUrl = this.result
        }
      }
      return false
    },
    handleUpload() {
      const { fileList } = this
      const avatarFormData = new FormData()
      avatarFormData.append('avatar', fileList[0])
      this.uploading = true
      resetAvatar(avatarFormData)
        .then((res) => {
          if (res.data.code === Status.OK) {
            this.fileList = []
            this.uploading = false
            this.$message.success('头像更改成功！')
          } else {
            this.uploading = false
            this.$message.error('头像更改失败！')
          }
        })
        .catch(() => {
          this.uploading = false
          this.$message.error('头像上传失败，请检查网络后再试！')
        })
    },
    toggleShowPassword() {
      this.isShowPassword = !this.isShowPassword
    },
    onGetCaptchaClicked() {
      if (!this.active.getCaptcha) return
      if (this.timer != null) {
        this.$message.error(
          '验证码已发送，请过' + this.countDown + 's后再试...'
        )
        return
      }
      if (!this.active.captcha) {
        // 校验手机号的合法性
        const oldPhone = $nuxt.$store.state.user.phone
        if (this.phone === oldPhone) {
          this.$message.error('请输入新的手机号！')
          return
        }
        if (isValidPhone(this.phone)) {
          const vm = this
          $nuxt.$store.dispatch('user/GetCaptcha', this.phone).then((res) => {
            vm.$message.success('验证码已发送至您的新手机号！')
            vm.active.captcha = true
            vm.timer = setInterval(() => {
              vm.countDown--
              vm.captchaTips = vm.countDown + 's后重发'
              if (vm.countDown <= 0) {
                clearInterval(vm.timer)
                vm.timer = null
                vm.captchaTips = '重新获取'
                vm.countDown = 10
              }
            }, 1000)
          })
        } else {
          $nuxt.$message.error('请输入正确的手机号！')
        }
      }
    },
    initData() {
      this.avatarUrl = $nuxt.$store.state.user.avatar
      this.username = $nuxt.$store.state.user.username
      this.phone = $nuxt.$store.state.user.phone
      this.registerTime = $nuxt.$store.state.user.create_time
      this.role = $nuxt.$store.state.user.role
    },
    onModifyClicked() {
      if (!this.active.unlock) {
        this.active.unlock = true
        this.active.username = true
        this.active.phone = true
        this.active.getCaptcha = true
        this.active.password = true
        this.active.captcha = false
      } else {
        if (
          this.phone !== '' &&
          this.phone !== $nuxt.$store.state.user.phone &&
          this.code === ''
        ) {
          this.$message.error('修改手机号须接收并输入验证码！')
          return
        }
        const infoObject = {
          username: this.username,
          password: this.password,
          phone: this.phone,
          code: this.captcha,
        }
        $nuxt.$store.dispatch('user/ResetInfo', infoObject).then((res) => {
          if (res.code === Status.OK) {
            $nuxt.$message.success('修改成功！')
            this.active.unlock = false
            this.active.username = false
            this.active.phone = false
            this.active.getCaptcha = false
            this.active.password = false
            this.active.captcha = false
            this.initData()
            this.password = ''
            this.captcha = ''
          }
        })
      }
    },
  },
})
</script>

<style lang="less" scoped>
@import 'assets/style/global.less';

@INPUT_BORDER_COLOR: #c4c4c4;

.wrapper {
  margin: 4% 0 0 5%;

  .avatar-wrapper {
    display: inline-flex;
    flex-direction: row;
    align-items: flex-end;

    .avatar-editor {
      height: 100px;
      width: 100px;
      margin-bottom: 2em;
      background-color: #dfdfdf;
      border-radius: 50%;

      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }

    .change-avatar-btn {
      display: inline-block;
      padding-left: 2.5em;
      padding-bottom: 2.2em;
      width: 15em;

      cursor: pointer;
      pointer-events: auto;

      .change-avatar-text {
        padding: 0.2em 0.5em;
        border-radius: 8px;
        transition: all ease-in-out 0.1s;
        display: flex;
        flex-direction: row;

        //&:hover {
        //  background-color: #b7b4b4;
        //}
      }
    }
  }

  .info-editor {
    height: 50px;

    .info-editor-key {
      font-family: @GLOBAL_FONT_FAMILY;
      font-weight: 600;
    }

    .info-editor-value {
      cursor: not-allowed !important;
      margin-left: 2.5em;

      &:not(input) {
        font-family: @GLOBAL_FONT_FAMILY;
        font-weight: 600;
      }

      &:not(span) {
        border: 1px solid @INPUT_BORDER_COLOR;
        border-radius: 8px;
        outline: none;
        background: transparent;
        padding: 0.1em 0 0.1em 0.7em;
      }
    }

    .info-editor-value-active {
      background: white !important;
      cursor: auto !important;
    }

    .submit {
      background: @STRONG_THEME_COLOR_LIGHT;
      margin-top: 0.5em;
      padding: 0.5em 1.2em;
      border: none;
      color: white;
      border-radius: 8px;
      transition: all ease-in-out 0.15s;
      cursor: pointer;
      pointer-events: auto;
      font-family: @GLOBAL_FONT_FAMILY;
      outline: none;

      &:hover {
        background: #4f98fd !important;
      }
    }

    .get-captcha {
      margin-left: 1em;
      font-size: 0.9em;
      border-radius: 8px;
      transition: all ease-in-out 0.1s;
      padding: 0.2em 0.7em 0.3em 0.7em;
      cursor: not-allowed;
      pointer-events: auto;

      &:hover {
        background-color: #b7b4b4;
      }
    }

    .get-captcha-active {
      cursor: pointer !important;
    }

    .toggle-show-password {
      margin-left: 1.2em;
      cursor: not-allowed;
      pointer-events: auto;
      border-radius: 8px;
      transition: all ease-in-out 0.1s;
      padding: 0.2em 0.5em 0.3em 0.5em;

      &:hover {
        background-color: #b7b4b4;
      }
    }
  }
}
</style>
