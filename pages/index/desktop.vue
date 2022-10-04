<template>
  <div id="desktop-wrapper">
    <DesktopTopBar />
    <DesktopBottomBar />
    <button
      style="
        position: absolute;
        top: 100px;
        left: 50px;
        height: 100px;
        width: 100px;
      "
      @click="loadSettings"
    >
      DIALOG
    </button>
    <button
      style="
        position: absolute;
        top: 250px;
        left: 50px;
        height: 100px;
        width: 100px;
      "
      @click="killSettings"
    >
      KILL
    </button>
  </div>
</template>

<script>
import Vue from 'vue'
import Settings from '@/components/Settings'

export default Vue.extend({
  name: 'Desktop',
  data() {
    return {
      dialog: {},
    }
  },
  methods: {
    loadSettings() {
      const SettingsVueComponent = Vue.extend(Settings)
      const settingsWrapper = document.createElement('div')
      document.getElementById('desktop-wrapper').appendChild(settingsWrapper)
      this.dialog = new SettingsVueComponent().$mount(settingsWrapper)
    },
    killSettings() {
      const settingsWrapper = document.querySelector('.dialog-settings')
      document.getElementById('desktop-wrapper').removeChild(settingsWrapper)
    },
  },
})
</script>

<style lang="less" scoped>
@import '@/assets/style/global';

#desktop-wrapper {
  width: 100vw;
  height: 100vh;
  background: url('static/background.png') no-repeat center center fixed;
  background-size: cover;

  overflow-x: hidden;
  overflow-y: hidden;
}
</style>
