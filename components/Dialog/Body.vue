<!-- 对话框组件的主体部分 -->
<template>
  <div
    v-if="!isClose"
    v-show="setIsShow() === null ? isShow : isShow"
    ref="dialog"
    v-drag="vm"
    :class="{ 'dialog-wrapper': true }"
    :style="extraStyle"
  >
    <div ref="dialogHeader" class="dialog-header">
      <div
        :class="{
          'header-wrapper': true,
          'active-header-wrapper': getIsActive(),
        }"
      >
        <div class="dialog-title">
          <slot name="title"></slot>
        </div>
        <div class="dialog-op">
          <div class="dialog-op-item" @click="handleMinimize()">
            <svg
              t="1664802932009"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="10066"
              width="16"
              height="16"
            >
              <path d="M128 448h768v128H128z" p-id="10067"></path>
            </svg>
          </div>
          <div class="dialog-op-item" @click="handleFullscreen()">
            <svg
              t="1664802667589"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6950"
              width="16"
              height="16"
            >
              <path
                d="M204.8 819.2v-204.8H102.4v204.8c0 56.32 46.08 102.4 102.4 102.4h204.8v-102.4H204.8zM819.2 102.4h-204.8v102.4h204.8v204.8h102.4V204.8c0-56.32-46.08-102.4-102.4-102.4zM204.8 204.8h204.8V102.4H204.8c-56.32 0-102.4 46.08-102.4 102.4v204.8h102.4V204.8zM819.2 819.2h-204.8v102.4h204.8c56.32 0 102.4-46.08 102.4-102.4v-204.8h-102.4v204.8z"
                p-id="6951"
              ></path>
            </svg>
          </div>
          <div class="dialog-op-item" @click="handleClose()">
            <svg
              t="1664802876062"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="9020"
              width="16"
              height="16"
            >
              <path
                d="M242.858667 183.04L512 452.266667l269.141333-269.141334a42.325333 42.325333 0 0 1 59.733334 59.818667L571.904 512l269.141333 269.141333a42.325333 42.325333 0 0 1-59.818666 59.733334L512 571.904 242.858667 840.96a42.325333 42.325333 0 0 1-59.733334-59.818667L452.096 512 183.04 242.858667a42.325333 42.325333 0 0 1 59.818667-59.733334z"
                p-id="9021"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog-main">
      <div class="side-wrapper">
        <slot name="side" />
      </div>
      <div class="body-wrapper">
        <slot name="body" />
      </div>
    </div>
    <div v-if="!isFullscreen" v-resize="vm" class="resize-block" />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  // eslint-disable-next-line
  name: 'Dialog',
  directives: {
    drag: {
      inserted(el, binding) {},
      bind(el, binding) {
        const oDiv = el
        binding.value.el = el.classList
        oDiv.onmousedown = (e) => {
          $nuxt.$store.commit('dock/SET_ACTIVE_APP_UID', binding.value.uid)
          $nuxt.$store.commit('sys/SET_DIALOG_Z_INDEX')
          binding.value.$refs.dialog.style.zIndex =
            $nuxt.$store.state.sys.dialogZIndex

          // 算出鼠标相对元素的位置
          const disX = e.clientX - oDiv.offsetLeft
          const disY = e.clientY - oDiv.offsetTop
          if (disY > 30 || binding.value.isFullscreen) return
          document.onmousemove = (e) => {
            const left = e.clientX - disX
            const top = e.clientY - disY
            // 水平
            const width = oDiv.offsetWidth
            const remain = (document.documentElement.clientWidth * 0.1).toFixed(
              0
            )
            if (
              left >= 0 - Number(width) + Number(remain) &&
              left <= document.documentElement.clientWidth - remain
            )
              oDiv.style.left = left + 'px'
            // 垂直
            const bottom =
              document.documentElement.clientHeight - top - oDiv.offsetHeight
            if (top >= 50 && bottom >= 50) oDiv.style.top = top + 'px'
            oDiv.style.top = top + 'px'
          }
          document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      },
    },
    resize: {
      inserted(el, binding) {},
      bind(el, binding) {
        el.onmousedown = (e) => {
          let minWidth
          let minHeight

          if (binding.value.minWidth) {
            minWidth = binding.value.minWidth
          } else {
            minWidth = (
              Number(document.documentElement.clientWidth) * 0.2
            ).toFixed(0)
          }

          if (binding.value.minHeight) {
            minHeight = binding.value.minHeight
          } else {
            minHeight = (
              Number(document.documentElement.clientHeight) * 0.4
            ).toFixed(0)
          }

          const disX = e.clientX - el.offsetLeft
          const disY = e.clientY - el.offsetTop
          const width = el.offsetWidth
          const height = el.offsetHeight
          document.onmousemove = (e) => {
            const w = -(el.offsetWidth - e.clientX + disX)
            const h = -(el.offsetHeight - e.clientY + disY)

            if (w <= minWidth || h <= minHeight) return
            const left = e.clientX - disX
            const top = e.clientY - disY
            if (
              left >= 0 &&
              left <= document.documentElement.clientWidth - width
            ) {
              el.style.left = left + 'px'
              el.parentNode.style.width = width + left + 'px'
            }
            if (
              top >= 0 &&
              top <= document.documentElement.clientHeight - height
            ) {
              el.style.top = top + 'px'
              el.parentNode.style.height = height + top + 'px'
            }
          }
          document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      },
    },
    active: {
      inserted(el, binding) {},
      bind(el, binding) {
        el.onclick = () => {
          $nuxt.$store.commit('dock/SET_ACTIVE_APP_UID', binding.value.uid)
          $nuxt.$store.commit('sys/SET_DIALOG_Z_INDEX')
          binding.value.$refs.dialog.style.zIndex =
            $nuxt.$store.state.sys.dialogZIndex
        }
      },
    },
  },
  props: {
    minWidth: {
      type: Number,
      required: false,
      default: null,
    },
    minHeight: {
      type: Number,
      required: false,
      default: null,
    },
    uid: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      vm: this,
      isClose: false,
      // isMinimize: false,
      isFullscreen: false,
      extraStyle: '',
      lastStyle: '',
      zIndexStyle: '',
      el: null,
      isShow: true,
    }
  },
  mounted() {
    this.$refs.dialogHeader.addEventListener('dblclick', () => {
      this.handleFullscreen()
    })
    setTimeout(() => {
      $nuxt.$store.commit('dock/SET_ACTIVE_APP_UID', this.uid)
      $nuxt.$store.commit('sys/SET_DIALOG_Z_INDEX')
      this.$refs.dialog.style.zIndex = $nuxt.$store.state.sys.dialogZIndex
    }, 10)
  },
  created() {},
  methods: {
    getIsShow() {
      return new Promise((resolve, reject) => {
        const pendingDialog = $nuxt.$store.state.dock.pending.find((item) => {
          return item.uid === this.uid
        })

        if (pendingDialog === undefined || pendingDialog.isActive === true) {
          resolve(true)
          setTimeout(() => {
            this.el.add('opacity-visible')
          }, 10)
        } else {
          setTimeout(() => {
            this.el.remove('opacity-visible')
          }, 10)
          setTimeout(() => {
            resolve(false)
          }, 150)
        }
      })
    },
    getIsActive() {
      return $nuxt.$store.state.dock.activeAppUid === this.uid
    },
    setIsShow() {
      const vm = this
      this.getIsShow().then((res) => {
        if (vm.isShow !== res && res === true) {
          $nuxt.$store.commit('dock/SET_ACTIVE_APP_UID', vm.uid)
          $nuxt.$store.commit('sys/SET_DIALOG_Z_INDEX')
          vm.$refs.dialog.style.zIndex = $nuxt.$store.state.sys.dialogZIndex
        }
        vm.isShow = res
      })
      return null
    },
    handleClose() {
      setTimeout(() => {
        this.el.remove('opacity-visible')
        setTimeout(() => {
          this.isClose = true
          $nuxt.$store.commit('dock/REMOVE_PENDING', this.uid)
          this.$emit('destroyResource')
        }, 150)
      }, 10)
    },
    handleMinimize() {
      setTimeout(() => {
        this.el.remove('opacity-visible')
        setTimeout(() => {
          $nuxt.$store.commit('dock/SET_MINIMIZE', this.uid)
        }, 150)
      }, 10)
    },
    handleFullscreen() {
      if (this.isFullscreen) {
        this.extraStyle = ''
        this.extraStyle = this.lastStyle
        this.isFullscreen = false
      } else {
        // 保存当前的宽高和位置
        this.lastStyle =
          '{ margin:0;width: ' +
          this.$refs.dialog.offsetWidth +
          'px; height: ' +
          this.$refs.dialog.offsetHeight +
          'px; left: ' +
          this.$refs.dialog.offsetLeft +
          'px; top: ' +
          this.$refs.dialog.offsetTop +
          'px; }'
        // 获得viewport高度
        const height = document.documentElement.clientHeight - 100
        this.extraStyle =
          '{ margin:0; top:50px; left:0; width:100vw; height:' +
          height.toString() +
          'px; }'
        this.isFullscreen = true
      }
    },
  },
})
</script>

<style lang="less" scoped>
@import '@/assets/style/global';

@DIALOG_BODY_COLOR_LIGHT: #ebebeb;

.dialog-wrapper {
  z-index: 999999;
  font-size: 16px;
  position: absolute;
  left: 15vw;
  top: 10vh;
  //left: 0;
  //top: 0;
  width: 70vw;
  height: 70vh;
  background: @DIALOG_BODY_COLOR_LIGHT;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  transition: opacity 0.15s ease-in-out;
  opacity: 0;
  border-radius: 10px;
  overflow: hidden;

  .dialog-main {
    position: relative;
    left: 0;
    top: 0;
    height: calc(100% - 30px);
    display: flex;
    flex-direction: row;

    .side-wrapper {
      background: white;
      max-width: 12em;
    }

    .body-wrapper {
      flex: 3;
      background: @DIALOG_BODY_COLOR_LIGHT;
      overflow-y: auto;
      overflow-x: auto;
    }
  }
}

.resize-block {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 15px;
  height: 15px;
  background: #000;
  cursor: nwse-resize;
  opacity: 0;
}

.hidden {
  display: none;
}

.opacity-visible {
  opacity: 1;
}

@HEADER_COLOR_LIGHT: #cecece;
@DISTANCE_TO_BORDER: 1em;
@HOVER_COLOR: #a4a4a4;

.active-header-wrapper {
  background: @STRONG_THEME_COLOR_LIGHT !important;
  color: white !important;

  svg {
    fill: white !important;
  }
}

.header-wrapper {
  top: 0;
  left: 0;
  width: 100%;
  height: 30px;
  background: @HEADER_COLOR_LIGHT;
  display: flex;
  justify-content: space-between;

  svg {
    fill: #6c6c6c;
  }

  .dialog-title {
    position: relative;
    left: @DISTANCE_TO_BORDER;
    padding-top: 0.23em;
    font-size: 0.95em;
    max-width: calc(100% - 10em);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dialog-op {
    position: relative;
    right: @DISTANCE_TO_BORDER;
    height: 100%;
    display: flex;
    flex-direction: row;

    .dialog-op-item {
      width: 1.5em;
      height: 1.5em;
      margin: 0.25em 0.2em;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      transition: all ease-in-out 0.1s;

      &:hover {
        background: @HOVER_COLOR;
      }
    }
  }
}
</style>
