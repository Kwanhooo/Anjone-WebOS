<template>
  <div class="wrapper">
    <div class="avatar-editor">
      <img :src="avatarUrl" alt="头像" />
    </div>
    <div class="info-editor">
      <span class="info-editor-key">账户昵称</span>
      <input v-model="username" class="info-editor-value" type="text" />
    </div>
    <div class="info-editor">
      <span class="info-editor-key">注册手机</span>
      <input v-model="phone" class="info-editor-value" type="text" />
    </div>
    <div class="info-editor">
      <span class="info-editor-key">登录密码</span>
      <input v-model="password" class="info-editor-value" type="password" />
    </div>
    <div class="info-editor">
      <span class="info-editor-key">填验证码</span>
      <input v-model="captcha" class="info-editor-value" type="text" />
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
      <button class="submit" @click.prevent="onSubmitClicked()">
        修改信息
      </button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'MyAccount',
  data() {
    return {
      avatarUrl: '',
      username: '',
      phone: '',
      registerTime: '',
      role: '',
      password: '**********',
      captcha: '',
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.avatarUrl = $nuxt.$store.getters['user/avatar']
      this.username = $nuxt.$store.getters['user/username']
      this.phone = $nuxt.$store.getters['user/phone']
      this.registerTime = $nuxt.$store.getters['user/create_time']
      this.role = $nuxt.$store.getters['user/role']
    },
    onSubmitClicked() {},
  },
})
</script>

<style lang="less" scoped>
@import '@/assets/style/global';

@INPUT_BORDER_COLOR: #c4c4c4;

.wrapper {
  margin: 4% 0 0 4%;
  //background: green;

  .avatar-editor {
    height: 100px;
    margin-bottom: 2em;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }

  .info-editor {
    height: 50px;

    .info-editor-key {
      font-family: '黑体', sans-serif;
      font-weight: 600;
    }

    .info-editor-value {
      margin-left: 2.5em;

      &:not(input) {
        font-family: '黑体', sans-serif;
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
      font-family: '黑体', sans-serif;

      &:hover {
        background: #148f4e !important;
      }
    }
  }
}
</style>
