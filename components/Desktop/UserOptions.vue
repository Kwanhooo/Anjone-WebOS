<template>
  <div id="user-option-wrapper">
    <GeneralSelectBox :options="options" />
  </div>
</template>

<script>
export default {
  name: 'UserOptions',
  data() {
    return {
      options: [
        { id: 1, name: '账户信息' },
        { id: 2, name: '退出' },
        { id: 3, name: '关机' },
        { id: 4, name: '重启' },
      ],
    }
  },
}
</script>

<style lang="less">
#user-option-wrapper {
  .select-box-item {
    padding: 0.5em 1.5em;
  }
}
</style>
