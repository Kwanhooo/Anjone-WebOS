<template>
  <div
    v-if="!isClose"
    v-show="!isMinimize"
    v-drag
    v-index
    class="dialog-wrapper"
    :style="extraStyle"
  >
    <div class="dialog-header">
      <DialogHeader
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
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  // eslint-disable-next-line
  name: 'Dialog',
  directives: {
    drag: {
      bind(el) {
        const oDiv = el
        oDiv.onmousedown = (e) => {
          if (el.style.zIndex < $nuxt.$store.state.sys.dialogZIndex) {
            $nuxt.$store.commit('sys/SET_DIALOG_Z_INDEX')
            el.style.zIndex = $nuxt.$store.state.sys.dialogZIndex
          }
          // 算出鼠标相对元素的位置
          const disX = e.clientX - oDiv.offsetLeft
          const disY = e.clientY - oDiv.offsetTop
          if (disY > 30) return
          document.onmousemove = (e) => {
            const left = e.clientX - disX
            const top = e.clientY - disY
            oDiv.style.left = left + 'px'
            oDiv.style.top = top + 'px'
          }
          document.onmouseup = (e) => {
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
  },
  data() {
    return {
      isClose: false,
      isMinimize: false,
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
    handleClose() {
      this.isClose = true
      this.$emit('destroyResource')
    },
    handleMinimize() {
      this.isMinimize = true
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
    // handleZIndexUpdate() {
    //   $nuxt.$store.commit('sys/SET_DIALOG_Z_INDEX')
    //   const zIndex = $nuxt.$store.state.sys.dialogZIndex
    //   this.zIndexStyle = '{z-index:' + zIndex + ';}'
    //   console.log(zIndex)
    // },
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
</style>
