<!-- 设备绑定页 -->
<template>
  <div class="bind-wrapper">
    <input
      v-model="SN"
      type="text"
      class="input-sn"
      placeholder="请输入设备序列号"
    />
    <button class="button-bind" @click.prevent="handleBind()">绑定设备</button>
    <div class="more-op-wrapper">
      <span @click="backToLogin()">返回登录</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Status } from '@/utils/magic-numbers'

export default Vue.extend({
  name: 'Bind',
  data() {
    return {
      SN: '',
    }
  },
  beforeMount() {
    document.title = '设备绑定 - 安居佑'
  },
  methods: {
    backToLogin() {
      sessionStorage.clear()
      this.$router.back()
    },
    handleBind() {
      const vm = this
      this.$store.dispatch('user/Bind', { serialNo: this.SN }).then((data) => {
        if (data.code === Status.OK) {
          vm.$message.success(data.message, 5)
          vm.$router.push('/desktop')
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
@BIND_FONT_SIZE: 0.8rem;
@INPUT_FONT_FAMILY: 'Microsoft Yahei', system-ui;

.bind-wrapper {
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

  .input-sn {
    background: rgba(@CONTENT_COLOR_C, 40%);
    color: @CONTENT_COLOR_B;
    font-size: @BIND_FONT_SIZE;
    text-align: center;
    border: 1px solid @CONTENT_COLOR_A;
  }

  .button-bind {
    border: 1px solid @STRONG_THEME_COLOR_LIGHT;
    background-color: @STRONG_THEME_COLOR_LIGHT;
    color: white;
    font-size: calc(@BIND_FONT_SIZE + 2px);
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

    justify-content: center;

    span {
      border-bottom: 1px solid @LINK_COLOR;
      padding-bottom: 1px;
      margin: 0 5px;
      color: @LINK_COLOR;
      cursor: pointer;
      pointer-events: auto;
      transition: border-bottom-color ease-in-out 0.3s;
      font-size: @BIND_FONT_SIZE;
    }

    span:hover {
      color: black;
      border-bottom: 1px solid black;
    }
  }
}
</style>
