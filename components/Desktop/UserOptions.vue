<template>
  <div id="user-option-wrapper" class="select-box-wrapper __closable__">
    <div class="select-box-item" @click="loadAccountSettings()">
      <span>账户信息</span>
    </div>
    <div class="select-box-item" @click="onExitClicked()">
      <span>退出</span>
    </div>
    <div class="select-box-item" style="padding: 0">
      <a-popconfirm
        ok-text="确认"
        cancel-text="取消"
        style="width: 100%"
        ok-type="danger"
        @confirm="onShutdownConfirm"
      >
        <templete slot="title">
          <span
            >您真的确认要<strong style="color: #ff4d4f">关机</strong>吗？</span
          ><br />
          <span>所有未保存的工作都将丢失！</span>
        </templete>

        <div href="#" style="padding: 0.5em 1.5em; color: #6c6c6c">关机</div>
      </a-popconfirm>
    </div>
    <div class="select-box-item" style="padding: 0">
      <a-popconfirm
        ok-text="确认"
        cancel-text="取消"
        style="width: 100%"
        ok-type="danger"
        @confirm="onRebootConfirm"
      >
        <templete slot="title">
          <span
            >您真的确认要<strong style="color: #ff4d4f">重启</strong>吗？</span
          ><br />
          <span>所有未保存的工作都将丢失！</span>
        </templete>
        <div href="#" style="padding: 0.5em 1.5em; color: #6c6c6c">重启</div>
      </a-popconfirm>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import SettingsDialog from '@/components/Settings/Dialog'

export default {
  name: 'UserOptions',
  data() {
    return {}
  },
  methods: {
    loadAccountSettings() {
      const SettingsVueComponent = Vue.extend(SettingsDialog)
      const settingsWrapper = document.createElement('div')
      document.getElementById('desktop-wrapper').appendChild(settingsWrapper)
      this.dialog = new SettingsVueComponent().$mount(settingsWrapper)
      const closable = document.querySelector('.__closable__')
      closable !== null && closable.remove()
    },
    onExitClicked() {
      sessionStorage.clear()
      $nuxt.$router.push('/auth')
      this.$message.success('您已安全退出！')
    },
    onShutdownConfirm() {
      this.$message.warn('设备正在关闭！即将断开连接...')
      sessionStorage.clear()
      $nuxt.$router.push('/auth')
    },
    onRebootConfirm() {
      this.$message.warn('设备正在重启！即将断开连接...')
      sessionStorage.clear()
      $nuxt.$router.push('/auth')
    },
  },
}
</script>

<style lang="less">
#user-option-wrapper {
  font-size: 14px;
  background: white;
  box-shadow: rgb(0 0 0 / 5%) 0px 9px 28px 8px, rgb(0 0 0 / 8%) 0px 6px 16px,
    rgb(0 0 0 / 12%) 0px 3px 6px -4px;

  .select-box-item {
    cursor: pointer;
    transition: all 0.3s;
    padding: 0.5em 1.5em;

    &:hover {
      background: #f5f5f5;
    }
  }
}
</style>
