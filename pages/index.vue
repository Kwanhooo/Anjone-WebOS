<template>
  <NuxtChild />
</template>

<script lang="ts">
import Vue from 'vue'
import { tempStoreKey } from '~/config/security.config'

export default Vue.extend({
  name: 'Root',
  beforeMount() {
    window.onload = () => {
      document.title = '安居佑'
    }

    // 刷新后重载数据
    if (sessionStorage.getItem(tempStoreKey)) {
      // @ts-ignore
      const target = JSON.parse(sessionStorage.getItem(tempStoreKey))
      // 将窗口打开记录表清空
      target.dock.uid = 1000
      target.dock.pending = []
      this.$store.replaceState(Object.assign({}, this.$store.state, target))
      sessionStorage.removeItem(tempStoreKey)
    }
    // 刷新前预存Vuex数据
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem(tempStoreKey, JSON.stringify(this.$store.state))
    })
  },
})
</script>

<style lang="less">
@import '@/assets/style/global';
</style>
