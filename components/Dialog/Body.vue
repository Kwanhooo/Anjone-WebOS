<template>
  <div
    v-if="!isClose"
    v-show="getIsShow()"
    v-drag="vm"
    v-index
    :class="{ 'dialog-wrapper': true }"
    :style="extraStyle"
  >
    <div class="dialog-header">
      <DialogHeader
        v-dClick="vm"
        @close="handleClose()"
        @minimize="handleMinimize()"
        @fullscreen="handleFullscreen()"
      >
        <template slot="title">
          <slot name="title" />
        </template>
      </DialogHeader>
    </div>
    <div class="dialog-main">
      <DialogSide>
        <template slot="options">
          <slot name="side" />
        </template>
      </DialogSide>
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
        oDiv.onmousedown = (e) => {
          if (el.style.zIndex < $nuxt.$store.state.sys.dialogZIndex) {
            $nuxt.$store.commit('sys/SET_DIALOG_Z_INDEX')
            el.style.zIndex = $nuxt.$store.state.sys.dialogZIndex
          }
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
          }
          document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      },
    },
    index: {
      bind(el) {
        el.onload = () => {
          $nuxt.$store.commit('sys/SET_DIALOG_Z_INDEX')
          el.style.zIndex = $nuxt.$store.state.sys.dialogZIndex
        }
        el.onclick = () => {
          if (el.style.zIndex < $nuxt.$store.state.sys.dialogZIndex) {
            $nuxt.$store.commit('sys/SET_DIALOG_Z_INDEX')
            el.style.zIndex = $nuxt.$store.state.sys.dialogZIndex
          }
        }
      },
    },
    dClick: {
      inserted(el, binding) {},
      bind(el, binding) {
        el.ondblclick = (e) => {
          binding.value.handleFullscreen()
        }
      },
    },
    resize: {
      inserted(el, binding) {},
      bind(el, binding) {
        el.onmousedown = (e) => {
          const minWidth = (
            Number(document.documentElement.clientWidth) * 0.4
          ).toFixed(0)
          const minHeight = (
            Number(document.documentElement.clientHeight) * 0.6
          ).toFixed(0)

          const disX = e.clientX - el.offsetLeft
          const disY = e.clientY - el.offsetTop
          const width = el.offsetWidth
          const height = el.offsetHeight
          document.onmousemove = (e) => {
            // console.log(el.parentNode)
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
  },
  props: {
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
      zIndexStyle: '',
    }
  },
  mounted() {
    const zIndex = $nuxt.$store.commit('sys/SET_DIALOG_Z_INDEX')
    this.zIndexStyle = '{ z-index: ' + zIndex + ' }'
  },
  methods: {
    getIsShow() {
      const pendingDialog = $nuxt.$store.state.dock.pending.find((item) => {
        return item.uid === this.uid
      })
      return pendingDialog === undefined ? true : pendingDialog.isActive
    },
    handleClose() {
      this.isClose = true
      $nuxt.$store.commit('dock/REMOVE_PENDING', this.uid)
      this.$emit('destroyResource')
    },
    handleMinimize() {
      $nuxt.$store.commit('dock/SET_MINIMIZE', this.uid)
    },
    handleFullscreen() {
      if (this.isFullscreen) {
        this.extraStyle = ''
        this.isFullscreen = false
      } else {
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
  left: calc(50% - 500px);
  top: calc(50% - 350px);
  width: 1000px;
  height: 700px;
  background: @DIALOG_BODY_COLOR_LIGHT;
  display: flex;
  flex-direction: column;
  box-shadow: #6c6c6c 0 0 5px;

  .dialog-main {
    position: relative;
    left: 0;
    top: 0;
    height: calc(100% - 2em);
    display: flex;
    flex-direction: row;

    .body-wrapper {
      flex: 3;
      background: @DIALOG_BODY_COLOR_LIGHT;
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
</style>
