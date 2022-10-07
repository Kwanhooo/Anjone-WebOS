<template>
  <div id="device-selector-wrapper">
    <GeneralSelectBox :options="options" />
  </div>
</template>

<script>
export default {
  name: 'DeviceSelector',
  data() {
    return {
      options: [
        { id: 1, name: '我的家庭数据中心' },
        { id: 2, name: '好友团队数据中心' },
        { id: 3, name: '好友数据中心' },
      ],
    }
  },
}
</script>

<style lang="less">
#device-selector-wrapper {
  .select-box-item {
    padding: 0.8em 3.1em;
  }
}
</style>
