<!-- 注册页 -->
<template>
  <div class="reg-wrapper">
    <input
      v-model="phone"
      type="text"
      class="input-phone"
      placeholder="请输入手机号码"
    />
    <div class="captcha-wrapper">
      <input
        v-model="captcha"
        type="text"
        class="input-captcha"
        placeholder="请输入验证码"
      />
      <button class="button-captcha" @click.prevent="handleGetCaptcha()">
        {{ captchaTips }}
      </button>
    </div>
    <button class="btn-submit" @click.prevent="handleReg()">下一步</button>
    <div class="more-op-wrapper">
      <span @click="backToLogin()">返回登录</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Status } from '@/utils/magic-numbers'
import { isValidPhone } from '@/utils/validate'

export default Vue.extend({
  name: 'Reg',
  data() {
    return {
      phone: '',
      captcha: '',
      captchaTips: '获取验证码',
      timer: null,
      countDown: 60,
    }
  },
  mounted() {
    document.title = '注册 - 安居佑'
  },
  methods: {
    backToLogin() {
      this.$router.back()
    },
    handleGetCaptcha() {
      if (this.phone === '' || isValidPhone(this.phone) === false) {
        this.$message.error('请输入正确的手机号码！')
        return
      }
      if (this.timer != null) {
        this.$message.error(
          '验证码已发送，请过' + this.countDown + 's后再试...'
        )
      }
      const vm = this
      this.$store
        .dispatch('user/GetCaptcha', { phone: this.phone })
        .then((res) => {
          vm.timer = setInterval(() => {
            vm.countDown--
            vm.captchaTips = vm.countDown + 's后重发'
            if (vm.countDown <= 0) {
              clearInterval(vm.timer)
              vm.timer = null
              vm.captchaTips = '重新获取'
              vm.countDown = 60
            }
          }, 1000)
        })
    },
    handleReg() {
      if (this.phone === '' || isValidPhone(this.phone) === false) {
        this.$message.error('请输入正确的手机号码！')
        return
      }
      if (this.captcha.length !== 4) {
        this.$message.error('请输入4位验证码！')
        return
      }
      const vm = this
      this.$store
        .dispatch('user/Reg', { phone: this.phone, code: this.captcha })
        .then((res) => {
          if (res.code === Status.OK) {
            this.$message.success(res.message, 5)
            this.$router.push('/auth/pwd')
          } else {
            vm.$message.error(res.message, 5)
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
@REG_FONT_SIZE: 0.8rem;
@INPUT_FONT_FAMILY: 'Microsoft Yahei', system-ui;

.reg-wrapper {
  display: flex;
  flex-direction: column;
  font-size: @REG_FONT_SIZE;

  input,
  button {
    margin: 0.45rem 0;
    border-radius: @INPUT_BORDER_RADIUS;
    font-family: @GLOBAL_FONT_FAMILY;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 40%);
    transition: all ease-in-out 0.15s;
  }

  button {
    border: 1px solid @STRONG_THEME_COLOR_LIGHT;
    background-color: @STRONG_THEME_COLOR_LIGHT;
    color: white;
    text-align: center;
    cursor: pointer;
    pointer-events: auto;

    &:hover {
      background: transparent;
      color: @STRONG_THEME_COLOR_LIGHT;
    }
  }

  input:hover,
  input:focus {
    outline: none;
    border: 1px solid @STRONG_THEME_COLOR_LIGHT;
  }

  .input-phone {
    width: @INPUT_WIDTH;
    height: @INPUT_HEIGHT;
    background: rgba(@CONTENT_COLOR_C, 40%);
    color: @CONTENT_COLOR_B;
    text-align: center;
    border: 1px solid @CONTENT_COLOR_A;
  }

  .captcha-wrapper {
    display: flex;
    flex-direction: row;

    .input-captcha {
      .input-phone;
      width: calc(@INPUT_WIDTH / 2 - 0.25rem);
      margin-right: 0.25rem;
      height: @INPUT_HEIGHT;
      flex: 1;
    }

    .button-captcha {
      background: transparent;
      color: @STRONG_THEME_COLOR_LIGHT;
      width: calc(@INPUT_WIDTH / 2 - 0.25rem);
      margin-left: 0.25rem;
      height: @INPUT_HEIGHT;
      flex: 1;
    }
  }

  .btn-submit {
    width: @INPUT_WIDTH;
    height: @INPUT_HEIGHT;

    font-size: calc(@REG_FONT_SIZE + 2px);
  }

  .more-op-wrapper {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: row;

    justify-content: center;

    span {
      border-bottom: 1px solid @LINK_COLOR;
      padding-bottom: 1px;
      margin: 0 5px;
      color: @LINK_COLOR;
      cursor: pointer;
      pointer-events: auto;
      transition: border-bottom-color ease-in-out 0.3s;
    }

    span:hover {
      color: black;
      border-bottom: 1px solid black;
    }
  }
}
</style>
