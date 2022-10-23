<template>
  <div id="bottom-bar-wrapper">
    <div
      v-if="isShowStart"
      id="start-wrapper"
      :class="{ 'start-trans': opacityGoing }"
    >
      <div id="start-side">
        <div id="start-side-slogan">
          <span>Anjone家庭数据中心 2022</span>
        </div>
      </div>
      <div id="start-main">
        <div class="always">
          <!--          <div class="start-instance" @click="onFileManagerClicked">-->
          <!--            <img alt="我的文件" src="@/assets/image/file-manager.png">-->
          <!--            <div class="app-name">我的文件</div>-->
          <!--          </div>-->
          <div
            v-for="(instance, index) in registry"
            :key="index"
            class="start-instance"
            @click="onInstanceClicked(instance.component.default)"
          >
            <img :alt="instance.name" :src="instance.icon" />
            <div class="app-name">{{ instance.name }}</div>
          </div>
        </div>
        <a-divider
          type="vertical"
          style="
            width: 2px;
            height: 100%;
            margin-right: 3em;
            background-color: #bbb;
          "
        />
        <div class="on-expand"></div>
      </div>
      <div id="start-toggle-bar" @click="toggleStartExpand()">
        <img
          id="start-toggle-bar-icon"
          :src="
            isExpandStart
              ? require('@/assets/svg/shrink.svg')
              : require('@/assets/svg/expand.svg')
          "
        />
      </div>
    </div>
    <div id="task-bar-wrapper">
      <div
        :class="{
          'task-bar-item': true,
          'task-bar-item-active': isShowStart,
        }"
        @click="onStartClicked()"
      >
        <img alt="start" src="@/assets/svg/start.svg" />
      </div>
      <div
        :class="{
          'task-bar-item': true,
          'task-bar-item-active': isShowStart,
        }"
        @click="onTestClick()"
      >
        <img
          alt="file-manager"
          src="@/assets/image/file-manager.png"
          style="width: 30px; height: 30px"
        />
      </div>
    </div>

    <div id="go-to-desktop" @click="handleGoToDesktop()"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import SettingsDialog from '@/components/Settings/Dialog'
import FileManager from '@/components/FileManager/Dialog'

export default {
  name: 'BottomBar',
  data() {
    return {
      isShowStart: false,
      isExpandStart: false,
      opacityGoing: false,
      // testDialog: null,
      // testCondition: false,
    }
  },
  computed: {
    ...mapState({
      registry: (state) => state.dock.registry,
      pending: (state) => state.dock.pending,
    }),
  },
  methods: {
    onStartClicked() {
      const vm = this
      if (this.isShowStart) {
        this.opacityGoing = true
        setTimeout(() => {
          vm.isShowStart = false
          vm.opacityGoing = false
        }, 150)
      } else {
        vm.isShowStart = true
        this.opacityGoing = true
        setTimeout(() => {
          vm.opacityGoing = false
        }, 10)
      }
    },
    toggleStartExpand() {
      this.isExpandStart = !this.isExpandStart
      if (this.isExpandStart) {
        document.getElementById('start-wrapper').style.width = '100vw'
        document.getElementById('start-toggle-bar').style.left =
          'calc(100vw - 14px)'
      } else {
        document.getElementById('start-wrapper').style.width = ''
        document.getElementById('start-toggle-bar').style.left = '410px'
      }
    },
    onInstanceClicked(component) {
      this.onStartClicked()
      const VueComponent = Vue.extend(component)
      const wrapper = document.createElement('div')
      document.getElementById('desktop-wrapper').appendChild(wrapper)
      const newInstance = new VueComponent().$mount(wrapper)
      const closable = document.querySelector('.__closable__')
      closable !== null && closable.remove()
    },
    // onSettingsClicked() {
    //   const SettingsVueComponent = Vue.extend(SettingsDialog)
    //   const settingsWrapper = document.createElement('div')
    //   document.getElementById('desktop-wrapper').appendChild(settingsWrapper)
    //   const newDialog = new SettingsVueComponent().$mount(settingsWrapper)
    //   const closable = document.querySelector('.__closable__')
    //   closable !== null && closable.remove()
    // },
    onTestClick() {
      // this.testCondition = !this.testCondition
      // console.log(this.testDialog.$el.style.display)
      // if (this.testCondition)
      //   this.testDialog.$el.style.display = 'none'
      // else
      //   this.testDialog.$el.style.display = ''
      // console.log(this.registry)
    },
    onFileManagerClicked() {
      this.onStartClicked()
      const FileManagerVueComponent = Vue.extend(FileManager)
      const fileManagerWrapper = document.createElement('div')
      document.getElementById('desktop-wrapper').appendChild(fileManagerWrapper)
      this.testDialog = new FileManagerVueComponent().$mount(fileManagerWrapper)
      const closable = document.querySelector('.__closable__')
      closable !== null && closable.remove()
    },
    handleGoToDesktop() {},
  },
}
</script>

<style lang="less" scoped>
@import 'assets/style/global.less';

@BOTTOM_BAR_HEIGHT: 50px;
@TASK_BAR_ITEM_WIDTH: 70px;
@START_SIDE_COLOR: #cecece;
@START_MAIN_COLOR: #e8e8e8;
@START_SIDE_FONT_COLOR: #4f4f4f;

.start-trans {
  opacity: 0;
}

#bottom-bar-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: @BOTTOM_BAR_HEIGHT;
  line-height: 20px;
  background-color: @GLASS_LIGHT;
  box-shadow: 2px 1px 0 0 rgba(0, 0, 0, 40%);

  #start-wrapper {
    min-width: 424px;
    width: 20vw;
    height: 50vh;
    position: fixed;
    left: 0;
    bottom: 50px;
    background-color: @START_MAIN_COLOR;
    display: flex;
    flex-direction: row;
    transition: opacity 0.15s ease-in-out, width 0.3s ease-in-out;
    overflow: hidden;

    #start-side {
      max-width: @TASK_BAR_ITEM_WIDTH;
      min-width: @TASK_BAR_ITEM_WIDTH;
      background-color: @START_SIDE_COLOR;

      #start-side-slogan {
        position: relative;
        top: 240px;
        left: -165px;
        margin: auto;
        rotate: 270deg;
        width: 400px;
        font-size: 18px;
        letter-spacing: 2px;
        color: @START_SIDE_FONT_COLOR;
      }
    }

    #start-toggle-bar {
      position: absolute;
      left: 410px;
      height: 100%;
      width: 14px;
      padding: 0 1px;
      background-color: @START_SIDE_COLOR;
      pointer-events: auto;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      //margin-right: calc(84px - 100vw);

      img {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    #start-main {
      min-width: calc(100vw - 84px);
      display: flex;
      padding: 1em 0;

      .start-instance {
        width: 28%;
        display: inline-block;
        align-items: center;
        cursor: pointer;
        border-radius: 8px;
        padding: 0.5em 0.1em 0.5em 0.1em;
        margin: 0 2% 2em 2%;
        transition: background-color 0.15s ease-in-out;

        &:hover {
          background-color: #fff;
        }

        img {
          width: 50%;
          height: 50%;
          margin-left: 25%;
          margin-bottom: 0.5em;
        }

        .app-name {
          text-align: center;
          font-size: 0.8rem;
          font-weight: 600;
        }
      }

      .always {
        height: 100%;
        flex: 1;
        min-width: 340px;
        max-width: 340px;
      }

      .on-expand {
        height: 100%;
        flex: 1;
        padding-right: 14px;
      }
    }
  }

  #task-bar-wrapper {
    height: inherit;
    display: flex;
    flex-direction: row;

    .task-bar-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: @TASK_BAR_ITEM_WIDTH;
      height: 100%;
      transition: background-color 0.2s ease-in-out;

      cursor: pointer;
      pointer-events: auto;

      &:hover {
        background: rgba(#e8e8e8, 100%);
      }
    }
  }

  .task-bar-item-active {
    background: rgba(#e8e8e8, 100%);
  }

  #go-to-desktop {
    background-color: #bbbbbb;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 50px;
    width: 35px;
    pointer-events: auto;
    cursor: pointer;
  }
}
</style>
