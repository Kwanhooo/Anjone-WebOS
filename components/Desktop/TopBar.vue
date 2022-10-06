<template>
  <div id="top-bar-wrapper">
    <div id="center-switch-wrapper">
      <div class="center-switch">
        <img alt="nas" src="@/assets/svg/nas.svg" class="switch-logo" />
        <span>创业团队数据中心</span>
        <img alt="list" src="@/assets/svg/list.svg" class="list-logo" />
      </div>
    </div>
    <div id="env-monitor-wrapper">
      <span class="env-key">温度：</span><span class="env-value">26℃</span>
      <span class="env-key">湿度：</span><span class="env-value">56%</span>
      <span class="env-key">PM2.5：</span><span class="env-value">10</span>
      <span class="env-key">VOC：</span><span class="env-value">10</span>
      <span class="env-key">甲醛：</span><span class="env-value">0.1</span>
      <span class="env-key">CO2：</span><span class="env-value">低</span>
      <img
        alt="separator"
        src="@/assets/svg/separator.svg"
        style="height: 30px; width: auto"
      />
    </div>
    <div id="inet-monitor-wrapper">
      <img
        alt="separator"
        src="@/assets/svg/internet.svg"
        style="margin-right: 0.8em"
      />
      <span>互联网访问</span>
    </div>
    <div id="header-right-wrapper">
      <div id="user-op-wrapper">
        <img
          alt="user"
          src="@/assets/svg/user.svg"
          style="margin-right: 0.5em"
        />
        <span>{{ getUsername() }}</span>
        <img alt="list" src="@/assets/svg/list.svg" class="list-logo" />
        <img
          alt="separator"
          src="@/assets/svg/separator.svg"
          style="height: 30px; width: auto"
        />
      </div>
      <div id="sys-op-wrapper">
        <img
          :class="{ active: isTodoListActive }"
          alt="todo-list"
          src="@/assets/svg/todo.svg"
          style="margin-right: 2em"
        />
        <img
          :class="{ active: isMessageCenterActive }"
          alt="message"
          src="@/assets/svg/message.svg"
          style="margin-right: 2em"
        />
        <img
          :class="{ active: isMonitorActive }"
          alt="monitor"
          src="@/assets/svg/computer.svg"
          style="margin-right: 2em"
          @click="openMonitorWidget()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import MonitorWidget from '@/components/Monitor/Widget'

export default Vue.extend({
  name: 'TopBar',
  data() {
    return {
      isTodoListActive: false,
      isMessageCenterActive: false,
      isMonitorActive: false,
    }
  },
  methods: {
    getUsername() {
      return this.$store.getters['user/username']
    },
    openMonitorWidget() {
      if (document.getElementById('monitor-widget-wrapper') !== null) {
        this.isTodoListActive = false
        return
      }
      this.isTodoListActive = true
      const MonitorWidgetVueComponent = Vue.extend(MonitorWidget)
      const settingsWrapper = document.createElement('div')
      document.getElementById('desktop-wrapper').appendChild(settingsWrapper)
      this.dialog = new MonitorWidgetVueComponent().$mount(settingsWrapper)
    },
  },
})
</script>

<style lang="less" scoped>
@import 'assets/style/global.less';

@TOP_BAR_HEIGHT: 50px;
@HEADER_FONT_SIZE: 14px;
@HEADER_FONT_COLOR: #4f4f4f;

#top-bar-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  line-height: 20px;
  background-color: rgba(@CONTENT_COLOR_C, 80%);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 40%);
  display: inline-flex;
  flex-direction: row;

  .header-top-bar-item {
    height: 32px;
    margin-top: 9px;
    background: transparent;
    font-size: @HEADER_FONT_SIZE;
    display: inline-flex;
    align-items: center;
    justify-items: center;
    flex-direction: row;
    color: @HEADER_FONT_COLOR;
    font-family: sans-serif;
  }

  #center-switch-wrapper {
    .header-top-bar-item;

    width: 200px;
    margin-left: 1rem;

    .center-switch {
      padding-left: @HEADER_FONT_SIZE;
      display: inline-flex;
      align-items: center;
      justify-items: center;
      flex-direction: row;
      width: 100%;
      height: 100%;
      border-radius: 16px;
      background: transparent;
      border: 1px solid rgba(@CONTENT_COLOR_A, 0.5);

      .switch-logo {
        margin-right: 1em;
      }

      .list-logo {
        display: block;
        position: relative;
        right: 0;
        margin: 0 auto;
      }
    }
  }

  #env-monitor-wrapper {
    .header-top-bar-item;
    margin-left: 1rem;

    .env-value {
      color: @STRONG_THEME_COLOR_LIGHT;
      margin-right: 1em;
    }
  }

  #inet-monitor-wrapper {
    margin-left: 1rem;
    .header-top-bar-item;
  }

  #header-right-wrapper {
    position: relative;
    right: 0;
    margin: 0 0 0 auto;
    padding-right: 1em;

    #user-op-wrapper {
      .header-top-bar-item;

      width: 10em;

      .list-logo {
        display: block;
        position: relative;
        right: 0;
        margin: 0 auto;
      }
    }

    #sys-op-wrapper {
      .header-top-bar-item;
      margin-left: 0.5em;
      width: 130px;

      svg {
        stroke: @STRONG_THEME_COLOR_LIGHT;
      }
    }
  }
}
</style>
