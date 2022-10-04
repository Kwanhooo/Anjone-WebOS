<template>
  <div id="bottom-bar-wrapper">
    <div id="task-bar-wrapper">
      <div class="task-bar-item"></div>
    </div>
    <div id="go-to-desktop"></div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
}
</script>

<style lang="less" scoped>
@import 'assets/style/global.less';

@BOTTOM_BAR_HEIGHT: 50px;
@TASK_BAR_ITEM_WIDTH: 70px;

#bottom-bar-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: @BOTTOM_BAR_HEIGHT;
  line-height: 20px;
  background-color: @GLASS_LIGHT;
  box-shadow: 2px 1px 0 0 rgba(0, 0, 0, 40%);

  #task-bar-wrapper {
    .task-bar-item {
      width: @TASK_BAR_ITEM_WIDTH;
    }
  }
}
</style>
