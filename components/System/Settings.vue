<template>
  <DialogBody class="dialog-settings">
    <template #title>
      <span>系统设置</span>
    </template>
    <template #side>
      <ul>
        <li>账户管理</li>
        <li>设备设置</li>
        <li>客户服务</li>
      </ul>
    </template>
    <template #body>
      <div>SOME INFO WILL BE DISPLAYED HERE</div>
    </template>
  </DialogBody>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Settings',
}
</script>

<style scoped></style>
