<!-- 对话框组件边栏 -->
<template>
  <div class="side-wrapper">
    <slot name="options" />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  // eslint-disable-next-line
  name: 'Side',
})
</script>

<style lang="less" scoped>
@import './assets/style/global';

.side-wrapper {
  background: white;
  max-width: 12em;
}
</style>
