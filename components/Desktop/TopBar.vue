<!-- 顶栏 -->
<template>
  <div id="top-bar-wrapper">
    <div id="center-switch-wrapper">
      <div class="center-switch" @click="onDeviceSelectorClicked()">
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
      <span class="env-key">CO2：</span><span class="env-value">20</span>
      <img
        alt="separator"
        src="@/assets/svg/separator.svg"
        style="width: auto; height: 30px"
      />
    </div>
    <div id="inet-monitor-wrapper">
      <img
        alt="separator"
        :src="
          isLAN()
            ? require('@/assets/svg/lan.svg')
            : require('@/assets/svg/internet.svg')
        "
        style="margin-right: 0.8em"
      />
      <span>{{ isLAN() ? '局域网访问' : '互联网访问' }}</span>
    </div>
    <div id="header-right-wrapper">
      <div id="user-op-wrapper" @click="onUserOptionsClicked()">
        <img
          alt="user"
          src="@/assets/svg/user.svg"
          style="margin-right: 0.5em"
        />
        <span style="padding-right: 1.5em">{{ getUsername() }}</span>
        <img alt="list" src="@/assets/svg/list.svg" class="list-logo" />
        <img
          alt="separator"
          src="@/assets/svg/separator.svg"
          style="width: auto; height: 30px; cursor: auto"
        />
      </div>
      <div id="sys-op-wrapper">
        <img
          alt="todo-list"
          :src="
            isTodoListActive
              ? require('@/assets/svg/todo-active.svg')
              : require('@/assets/svg/todo.svg')
          "
          style="margin-right: 2em"
          @click="openTaskManager()"
        />
        <img
          alt="message"
          :src="
            isMessageCenterActive
              ? require('@/assets/svg/message-active.svg')
              : require('@/assets/svg/message.svg')
          "
          style="margin-right: 2em"
          @click="openMessageCenter()"
        />
        <img
          alt="monitor"
          :src="
            isMonitorActive
              ? require('@/assets/svg/computer-active.svg')
              : require('@/assets/svg/computer.svg')
          "
          style="margin-right: 2em"
          @click="openMonitorWidget()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import MonitorWidget from '@/components/Monitor/Widget'
import TaskManager from '@/components/TaskManager/Widget.vue'
import UserOptions from '@/components/Desktop/UserOptions'
import DeviceSelector from '@/components/Desktop/DeviceSelector'
import MessageCenter from '@/components/MessageCenter/Widget'
import { isLAN } from '@/utils/network'

export default Vue.extend({
  name: 'TopBar',
  data() {
    return {
      messageSvg: require('@/assets/svg/message.svg'),
      monitorSvg: require('@/assets/svg/computer.svg'),
      widget: null,
    }
  },
  computed: {
    ...mapGetters({
      isTodoListActive: 'sys/isTodoListActive',
      isMessageCenterActive: 'sys/isMessageCenterActive',
      isMonitorActive: 'sys/isMonitorActive',
    }),
  },
  methods: {
    ...mapMutations({
      setTodoListActive: 'sys/SET_IS_TODOLIST_ACTIVE',
      setMessageCenterActive: 'sys/SET_IS_MESSAGE_CENTER_ACTIVE',
      setMonitorActive: 'sys/SET_IS_MONITOR_ACTIVE',
    }),
    isLAN() {
      return isLAN()
    },
    getUsername() {
      return this.$store.state.user.username
    },
    openMonitorWidget() {
      const vm = this
      if (document.getElementById('monitor-widget-wrapper') !== null) {
        document.getElementById('monitor-widget-wrapper').style.opacity = '0'
        setTimeout(() => {
          document.getElementById('monitor-widget-wrapper').remove()
        }, 150)
        this.setMonitorActive(false)
        return
      }
      if (document.getElementById('task-manager-widget-wrapper') !== null) {
        setTimeout(() => {
          document.getElementById('task-manager-widget-wrapper').remove()
        }, 150)
        this.setTodoListActive(false)
      }
      if (document.getElementById('message-center-widget-wrapper') !== null) {
        setTimeout(() => {
          document.getElementById('message-center-widget-wrapper').remove()
          vm.setMessageCenterActive(false)
        }, 150)
      }
      this.setMonitorActive(true)
      const MonitorWidgetVueComponent = Vue.extend(MonitorWidget)
      const settingsWrapper = document.createElement('div')
      document.getElementById('desktop-wrapper').appendChild(settingsWrapper)
      this.widget = new MonitorWidgetVueComponent().$mount(settingsWrapper)
    },
    openTaskManager() {
      const vm = this
      if (document.getElementById('task-manager-widget-wrapper') !== null) {
        setTimeout(() => {
          document.getElementById('task-manager-widget-wrapper').remove()
        }, 150)
        this.setTodoListActive(false)
        return
      }
      if (document.getElementById('monitor-widget-wrapper') !== null) {
        document.getElementById('monitor-widget-wrapper').style.opacity = '0'
        setTimeout(() => {
          document.getElementById('monitor-widget-wrapper').remove()
          vm.setMonitorActive(false)
        }, 150)
      }
      if (document.getElementById('message-center-widget-wrapper') !== null) {
        setTimeout(() => {
          document.getElementById('message-center-widget-wrapper').remove()
        }, 150)
        this.setMessageCenterActive(false)
      }
      this.setTodoListActive(true)
      const TaskManagerWidgetVueComponent = Vue.extend(TaskManager)
      const taskManagerWrapper = document.createElement('div')
      document.getElementById('desktop-wrapper').appendChild(taskManagerWrapper)
      this.widget = new TaskManagerWidgetVueComponent().$mount(
        taskManagerWrapper
      )
    },
    openMessageCenter() {
      const vm = this
      if (document.getElementById('message-center-widget-wrapper') !== null) {
        setTimeout(() => {
          document.getElementById('message-center-widget-wrapper').remove()
        }, 150)
        this.setMessageCenterActive(false)
        return
      }
      if (document.getElementById('monitor-widget-wrapper') !== null) {
        document.getElementById('monitor-widget-wrapper').style.opacity = '0'
        setTimeout(() => {
          document.getElementById('monitor-widget-wrapper').remove()
          vm.setMonitorActive(false)
        }, 150)
      }
      if (document.getElementById('task-manager-widget-wrapper') !== null) {
        setTimeout(() => {
          document.getElementById('task-manager-widget-wrapper').remove()
        }, 150)
        this.setTodoListActive(false)
      }
      this.setMessageCenterActive(true)
      const MessageCenterWidgetVueComponent = Vue.extend(MessageCenter)
      const messageCenterWrapper = document.createElement('div')
      document
        .getElementById('desktop-wrapper')
        .appendChild(messageCenterWrapper)
      this.widget = new MessageCenterWidgetVueComponent().$mount(
        messageCenterWrapper
      )
    },
    onUserOptionsClicked() {
      if (document.getElementById('user-option-wrapper') !== null) {
        document.getElementById('user-option-wrapper').remove()
        return
      }
      const UserOptionsVueComponent = Vue.extend(UserOptions)
      const userOptionsWrapper = document.createElement('div')
      document.getElementById('desktop-wrapper').appendChild(userOptionsWrapper)
      new UserOptionsVueComponent().$mount(userOptionsWrapper)
      const userOptions = document.getElementById('user-option-wrapper')
      userOptions.style.position = 'absolute'
      userOptions.style.top = '45px'
      userOptions.style.left =
        Number(
          document.getElementById('user-op-wrapper').getBoundingClientRect()
            .left - 8
        ) + 'px'
    },
    onDeviceSelectorClicked() {
      if (document.getElementById('device-selector-wrapper') !== null) {
        document.getElementById('device-selector-wrapper').remove()
        return
      }
      const DeviceSelectorVueComponent = Vue.extend(DeviceSelector)
      const deviceSelectorWrapper = document.createElement('div')
      document
        .getElementById('desktop-wrapper')
        .appendChild(deviceSelectorWrapper)
      new DeviceSelectorVueComponent().$mount(deviceSelectorWrapper)
      const deviceSelector = document.getElementById('device-selector-wrapper')
      deviceSelector.style.position = 'absolute'
      deviceSelector.style.top = '45px'
      deviceSelector.style.left =
        document.getElementById('center-switch-wrapper').getBoundingClientRect()
          .left + 'px'
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
    font-family: @GLOBAL_FONT_FAMILY;
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
      cursor: pointer;
      pointer-events: auto;

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
      cursor: pointer;
      pointer-events: auto;
      .header-top-bar-item;

      width: auto;

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

      img {
        cursor: pointer;
        pointer-events: auto;
      }
    }
  }
}
</style>
