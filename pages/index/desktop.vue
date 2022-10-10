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
  mounted() {
    document.title = '桌面 - 安居佑'
    // 如果窗口宽度小于1200px，那么将#env-monitor-wrapper隐藏
    window.addEventListener('resize', () => {
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
    })
    window.addEventListener('click', (evt) => {
      if (document.querySelector('.__closable__') === null) return
      const path = evt.path.slice(0, -4)
      let isClosableClicked = false
      path.forEach((item) => {
        if (
          (item.id && item.id === 'top-bar-wrapper') ||
          (item.classList && item.classList.contains('__closable__'))
        ) {
          isClosableClicked = true
        }
      })
      if (isClosableClicked) return
      document.querySelector('.__closable__').remove()
      this.$store.commit('sys/SET_IS_MONITOR_ACTIVE', false)
      this.$store.commit('sys/SET_IS_TODOLIST_ACTIVE', false)
      this.$store.commit('sys/SET_IS_MESSAGE_CENTER_ACTIVE', false)
    })
  },
})
</script>

<style lang="less" scoped>
@import '@/assets/style/global';

#desktop-wrapper {
  width: 100vw;
  height: 100vh;
  background: url('static/background-desktop.jpg') no-repeat center center fixed;
  background-size: cover;

  overflow-x: hidden;
  overflow-y: hidden;
}
</style>
