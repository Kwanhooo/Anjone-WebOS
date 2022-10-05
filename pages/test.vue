<template>
  <NuxtChild />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Test',
  mounted() {
    document.title = '安居佑 TEST'
  },
})
</script>

<style lang="less">
@import '@/assets/style/global';
</style>
