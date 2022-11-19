<template>
  <div id="desktop-wrapper">
    <DesktopTopBar />
    <DesktopBottomBar />
  </div>
</template>

<script>
import Vue from 'vue'
import SettingsDialog from '@/components/Settings/Dialog'

export default Vue.extend({
  name: 'Desktop',
  data() {
    return {
      dialog: {},
    }
  },
  beforeMount() {
    document.title = '桌面 - 安居佑'
  },
  mounted() {
    this.hideOverflow()
    // 如果窗口宽度小于1200px，那么将#env-monitor-wrapper隐藏
    window.addEventListener('resize', () => {
      this.hideOverflow()
    })
    window.addEventListener('click', (evt) => {
      if (this.$store.state.sys.showDropDown) {
        const path = evt.path || (evt.composedPath && evt.composedPath())
        let hasSelf = false
        path.forEach((item) => {
          if (
            item.id === '__fileDropdown__' ||
            item.id === '__fileDropdownBtn__'
          ) {
            hasSelf = true
          }
        })
        if (!hasSelf) {
          this.$store.commit('sys/SET_SHOW_DROP_DOWN', false)
        }
      }

      if (
        document.querySelector('.__closable__') === null &&
        document.getElementById('start-wrapper') === null
      )
        return
      const path = (evt.path || (evt.composedPath && evt.composedPath())).slice(
        0,
        -4
      )
      let isClosableClicked = false
      let isStartClicked = false
      path.forEach((item) => {
        if (
          (item.id && item.id === 'top-bar-wrapper') ||
          (item.id && item.id === 'task-bar-wrapper') ||
          (item.classList && item.classList.contains('__closable__')) ||
          (item.id && item.id === 'start-wrapper')
        ) {
          isClosableClicked = true
          isStartClicked = true
        }
      })
      if (!isStartClicked) {
        this.$store.commit('dock/SET_IS_SHOW_START', false)
      }
      if (document.querySelector('.__closable__') === null || isClosableClicked)
        return
      document.querySelector('.__closable__').remove()
      this.$store.commit('sys/SET_IS_MONITOR_ACTIVE', false)
      this.$store.commit('sys/SET_IS_TODOLIST_ACTIVE', false)
      this.$store.commit('sys/SET_IS_MESSAGE_CENTER_ACTIVE', false)
    })
    this.preLoadImages()
  },
  methods: {
    hideOverflow() {
      if (window.innerWidth < 1200) {
        document.getElementById('env-monitor-wrapper').style.display = 'none'
        // 如果窗口宽度小于650px，那么将#inet-monitor-wrapper显示
        if (window.innerWidth < 650) {
          document.getElementById('inet-monitor-wrapper').style.display = 'none'
        } else {
          document.getElementById('inet-monitor-wrapper').style.display = ''
        }
      } else {
        document.getElementById('env-monitor-wrapper').style.display = ''
      }
    },
    preLoadImages() {
      new Image().src = require('@/assets/image/device-image.png')
      new Image().src =
        this.$store.state.user.avatar ||
        JSON.parse(sessionStorage.getItem('USER_STATE')).avatar
    },
  },
})
</script>

<style lang="less" scoped>
@import '@/assets/style/global';

#desktop-wrapper {
  width: 100vw;
  height: 100vh;
  background: url('assets/image/background-desktop.jpg') no-repeat center center
    fixed;
  background-size: cover;

  overflow-x: hidden;
  overflow-y: hidden;
}
</style>
