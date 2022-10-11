<template>
  <div id="bottom-bar-wrapper">
    <div
      v-if="isShowStart"
      id="start-wrapper"
      :class="{ 'start-trans': opacityGoing }"
    >
      <div id="start-side">
        <div id="start-side-slogan">
          <span>Anjone家庭数据中心 2022</span>
        </div>
      </div>
      <div id="start-main"></div>
    </div>
    <div id="task-bar-wrapper">
      <div
        :class="{
          'task-bar-item': true,
          'task-bar-item-active': isShowStart,
        }"
        @click="onStartClicked()"
      >
        <img alt="start" src="@/assets/svg/start.svg" />
      </div>
    </div>
    <div id="go-to-desktop"></div>
  </div>
</template>

<script>
export default {
  name: 'BottomBar',
  data() {
    return {
      isShowStart: false,
      opacityGoing: false,
    }
  },
  methods: {
    onStartClicked() {
      const vm = this
      if (this.isShowStart) {
        this.opacityGoing = true
        setTimeout(() => {
          vm.isShowStart = false
          vm.opacityGoing = false
        }, 150)
      } else {
        vm.isShowStart = true
        this.opacityGoing = true
        setTimeout(() => {
          vm.opacityGoing = false
        }, 10)
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import 'assets/style/global.less';

@BOTTOM_BAR_HEIGHT: 50px;
@TASK_BAR_ITEM_WIDTH: 70px;
@START_SIDE_COLOR: #cecece;
@START_MAIN_COLOR: #e8e8e8;
@START_SIDE_FONT_COLOR: #4f4f4f;

.start-trans {
  opacity: 0;
}

#bottom-bar-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: @BOTTOM_BAR_HEIGHT;
  line-height: 20px;
  background-color: @GLASS_LIGHT;
  box-shadow: 2px 1px 0 0 rgba(0, 0, 0, 40%);

  #start-wrapper {
    width: 20vw;
    height: 50vh;
    position: fixed;
    left: 0;
    bottom: 50px;
    background-color: @START_MAIN_COLOR;
    display: flex;
    flex-direction: row;
    transition: all 0.15s ease-in-out;

    #start-side {
      max-width: @TASK_BAR_ITEM_WIDTH;
      min-width: @TASK_BAR_ITEM_WIDTH;
      background-color: @START_SIDE_COLOR;

      #start-side-slogan {
        position: relative;
        top: 240px;
        left: -165px;
        margin: auto;
        rotate: 270deg;
        width: 400px;
        font-size: 18px;
        letter-spacing: 2px;
        color: @START_SIDE_FONT_COLOR;
      }
    }

    #start-main {
      flex: 1;
    }
  }

  #task-bar-wrapper {
    height: inherit;

    .task-bar-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: @TASK_BAR_ITEM_WIDTH;
      height: 100%;
      transition: background-color 0.2s ease-in-out;

      cursor: pointer;
      pointer-events: auto;

      &:hover {
        background: rgba(#e8e8e8, 100%);
      }
    }
  }

  .task-bar-item-active {
    background: rgba(#e8e8e8, 100%);
  }
}
</style>
