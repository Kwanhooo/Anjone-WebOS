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

    // // 刷新后重载数据
    // if (sessionStorage.getItem(tempStoreKey)) {
    //   this.$store.replaceState(
    //     Object.assign(
    //       {},
    //       this.$store.state,
    //       // @ts-ignore
    //       JSON.parse(sessionStorage.getItem(tempStoreKey))
    //     )
    //   )
    //   sessionStorage.removeItem(tempStoreKey)
    // }
    // // 刷新前预存Vuex数据
    // window.addEventListener('beforeunload', () => {
    //   sessionStorage.setItem(tempStoreKey, JSON.stringify(this.$store.state))
    // })
  },
})
</script>

<style lang="less">
@import '@/assets/style/global';
</style>
