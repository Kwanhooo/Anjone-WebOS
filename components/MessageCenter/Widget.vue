<!-- 通知中心 -->
<template>
  <div
    id="message-center-widget-wrapper"
    class="desktop-widget __closable__ glass-style"
  >
    <div class="op-bar">
      <div class="title-wrapper">通知中心</div>
      <div class="op-wrapper">
        <div class="op-item">
          <img
            alt="minimize"
            src="@/assets/svg/delete.svg"
            style="margin-top: 2px"
            @click="onClearClicked()"
          />
        </div>
        <div
          class="op-item"
          style="margin-top: 0.3em; margin-right: 0.5em"
          @click="onCloseClicked()"
        >
          <img alt="minimize" src="@/assets/svg/monitor-close.svg" />
        </div>
      </div>
    </div>
    <div class="main">
      <div v-if="messages.length === 0" class="hint">
        <span>目前无系统消息！</span>
      </div>
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="msg-item-wrapper"
      >
        <div class="title">
          <span
            :class="{
              type: true,
              warn: msg.type === 'Warn',
              error: msg.type === 'Error',
            }"
          >
            {{ msg.title }}
          </span>
          <span class="time">
            {{ msg.create_time }}
          </span>
        </div>
        <hr style="height: 2px; background-color: #cecece; border: none" />
        <div class="content">
          <span>
            {{ msg.content }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { deleteAll, GetNotice } from '@/api/notice'

export default Vue.extend({
  name: 'MessageCenterWidget',
  data() {
    return {
      messages: [],
    }
  },
  mounted() {
    this.startPolling()
    setTimeout(() => {
      document.getElementById('message-center-widget-wrapper').style.opacity =
        '1'
    }, 150)
  },
  methods: {
    onClearClicked() {
      if (this.messages.length === 0) {
        return
      }
      deleteAll().then(() => {
        this.messages = []
      })
    },
    onCloseClicked() {
      $nuxt.$store.commit('sys/SET_IS_MESSAGE_CENTER_ACTIVE', false)
      const vm = this
      document.getElementById('message-center-widget-wrapper').style.opacity =
        '0'
      setTimeout(() => {
        vm.opacityGoing = false
        document.getElementById('message-center-widget-wrapper').remove()
      }, 150)
    },
    startPolling() {
      const vm = this
      GetNotice().then((res) => {
        vm.messages = res.data.data
        setTimeout(() => {
          vm.startPolling()
        }, 30000)
      })
    },
  },
})
</script>

<style lang="less" scoped>
@import 'assets/style/global.less';

@TITLE_COLOR_LIGHT: #cecece;
@TITLE_FONT_COLOR_LIGHT: #6c6c6c;
@DISTANCE_TO_BORDER: 1em;
@HOVER_COLOR: #a4a4a4;

.widget-visible {
  opacity: 0;
}

#message-center-widget-wrapper {
  position: absolute;
  right: 10px;
  top: 60px;
  width: 29em;
  height: calc(100vh - 120px);
  background: rgba(@CONTENT_COLOR_C, 90%);
  transition: all ease-in-out 0.15s;
  opacity: 0;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  z-index: 999999;
  border-radius: 10px;

  .op-bar {
    border-radius: 10px 10px 0 0;
    position: relative;
    top: 0;
    left: 0;
    height: 30px;
    width: 100%;
    background-color: @STRONG_THEME_COLOR_LIGHT;
    display: flex;
    justify-content: space-between;

    .title-wrapper {
      color: white;
      height: 100%;
      position: relative;
      left: @DISTANCE_TO_BORDER;
      padding-top: 0.25em;
      font-size: 1.02em;
    }

    .op-wrapper {
      position: relative;
      right: @DISTANCE_TO_BORDER;
      height: 100%;
      display: flex;
      flex-direction: row;

      .op-item {
        width: 24px;
        height: 24px;
        //padding: 1px;
        margin: 0.2em @DISTANCE_TO_BORDER 0 0.2em;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        transition: all ease-in-out 0.1s;
        cursor: pointer;

        img {
          width: 16px;
          height: 16px;
          //padding-right: 1px;
          //padding-bottom: 2px;
        }

        &:hover {
          background: @HOVER_COLOR;
        }
      }
    }
  }

  .main {
    height: calc(100% - 30px);
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;

    // 滚动条样式重写
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background-color: transparent;
    }

    &::-webkit-scrollbar {
      width: 10px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #555;
    }

    .hint {
      margin: 30px auto 0 auto;
      font-size: 1rem;
      color: #6c6c6c;
    }

    .msg-item-wrapper {
      border: 2px solid @TITLE_COLOR_LIGHT;
      border-radius: 8px;
      margin: 0.4em 1.5em;
      padding: 0.7em;

      &:first-child {
        margin-top: 1.2em !important;
      }

      &:last-child {
        margin-bottom: 3em !important;
      }

      .title {
        font-size: 1.2em;
        display: flex;
        flex-direction: row;

        .type {
          font-family: @GLOBAL_FONT_FAMILY;
          flex: 1;
          font-weight: 600;
          color: @STRONG_THEME_COLOR_LIGHT;
        }

        .time {
          float: right;
          font-size: 0.9em;
        }

        .warn {
          color: #e99d42;
        }

        .error {
          color: #ff7272;
        }
      }

      .content {
        font-size: 1.1em;
      }
    }
  }
}
</style>
