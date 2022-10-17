<template>
  <div class="login-wrapper">
    <input
      v-model="phone"
      type="text"
      class="input-username"
      placeholder="请输入用户名"
    />
    <input
      v-model="password"
      type="password"
      class="input-password"
      placeholder="请输入密码"
    />
    <button class="login-btn-submit" @click.prevent="handleLogin()">
      登录
    </button>
    <div class="more-op-wrapper">
      <span>忘记密码</span>
      <span @click="goToReg()">注册</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Status } from '@/utils/magic-numbers'

export default Vue.extend({
  name: 'Login',
  data() {
    return {
      phone: '',
      password: '',
    }
  },
  mounted() {
    this.$message.info('Mock用户：手机号：18888888888    密码：000000', 10)
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        this.handleLogin()
      }
    })
  },
  beforeMount() {
    document.title = '登录 - 安居佑'
  },
  methods: {
    goToReg() {
      this.$router.push('/auth/reg')
    },
    handleLogin() {
      const vm = this
      this.$store
        .dispatch('user/Login', {
          phone: this.phone,
          password: this.password,
        })
        .then((data) => {
          if (data.code === Status.OK) {
            vm.$message.success('欢迎回来，' + vm.$store.state.user.username, 5)
            if (vm.$store.state.user.devs.length === 0) {
              vm.$message.warn('您还没有绑定设备，请在此绑定！', 5)
              vm.$router.push('/auth/bind')
            } else {
              vm.$router.push('/desktop')
            }
          } else {
            vm.$message.error(data.message, 5)
          }
        })
    },
  },
})
</script>

<style lang="less" scoped>
@import '@/assets/style/global';

@INPUT_WIDTH: 14rem;
@INPUT_HEIGHT: 2rem;
@INPUT_BORDER_RADIUS: 15px;
@LOGIN_FONT_SIZE: 0.8rem;
@INPUT_FONT_FAMILY: 'Microsoft Yahei', system-ui;

.login-wrapper {
  display: flex;
  flex-direction: column;

  input,
  button {
    margin: 0.45rem 0;
    width: @INPUT_WIDTH;
    height: @INPUT_HEIGHT;
    border-radius: @INPUT_BORDER_RADIUS;
    font-family: @GLOBAL_FONT_FAMILY;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 40%);
    transition: all ease-in-out 0.15s;
  }

  input:hover,
  input:focus {
    outline: none;
    border: 1px solid @STRONG_THEME_COLOR_LIGHT;
  }

  .input-username {
    background: rgba(@CONTENT_COLOR_C, 40%);
    color: @CONTENT_COLOR_B;
    font-size: @LOGIN_FONT_SIZE;
    text-align: center;
    border: 1px solid @CONTENT_COLOR_A;
  }

  .input-password {
    .input-username;
  }

  .login-btn-submit {
    border: 1px solid @STRONG_THEME_COLOR_LIGHT;
    background-color: @STRONG_THEME_COLOR_LIGHT;
    color: white;
    font-size: calc(@LOGIN_FONT_SIZE + 2px);
    text-align: center;
    cursor: pointer;
    pointer-events: auto;

    &:hover {
      background: transparent;
      color: @STRONG_THEME_COLOR_LIGHT;
    }
  }

  .more-op-wrapper {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: row;

    justify-content: space-between;

    span {
      border-bottom: 1px solid @LINK_COLOR;
      padding-bottom: 1px;
      margin: 0 5px;
      color: @LINK_COLOR;
      cursor: pointer;
      pointer-events: auto;
      transition: border-bottom-color ease-in-out 0.3s;
      font-size: @LOGIN_FONT_SIZE;
    }

    span:hover {
      color: black;
      border-bottom: 1px solid black;
    }
  }
}
</style>
