<template>
  <div id="monitor-widget-wrapper">
    <div class="op-bar">
      <div class="title-wrapper">设备监控信息</div>
      <div class="op-wrapper">
        <div class="op-item">
          <img alt="minimize" src="@/assets/svg/pin.svg" />
        </div>
        <div
          class="op-item"
          style="margin-right: 0.5em; margin-top: 0.3em"
          @click="onCloseClicked()"
        >
          <img alt="minimize" src="@/assets/svg/monitor-close.svg" />
        </div>
      </div>
    </div>
    <div class="main">
      <div id="cpu-usage-wrapper"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Widget',
  data() {
    return {
      opacityGoing: true,
    }
  },
  mounted() {
    setTimeout(() => {
      document.getElementById('monitor-widget-wrapper').style.opacity = 1
    }, 150)
    this.echartsInit()
  },
  methods: {
    onCloseClicked() {
      const vm = this
      document.getElementById('monitor-widget-wrapper').style.opacity = 0
      setTimeout(() => {
        vm.opacityGoing = false
        document.getElementById('monitor-widget-wrapper').remove()
      }, 150)
    },
    echartsInit() {
      const cpuUsage = this.$echarts.init(
        document.getElementById('cpu-usage-wrapper')
      )
      const cpuUsageOptions = {
        xAxis: {
          data: ['A', 'B', 'C', 'D', 'E'],
        },
        yAxis: {},
        series: [
          {
            data: [10, 22, 28, 43, 49],
            type: 'line',
            stack: 'x',
            areaStyle: {},
          },
        ],
      }
      cpuUsage.setOption(cpuUsageOptions)
    },
  },
}
</script>

<style lang="less" scoped>
@import 'assets/style/global.less';

@TITLE_COLOR_LIGHT: #cecece;
@TITLE_FONT_COLOR_LIGHT: #6c6c6c;
@DISTANCE_TO_BORDER: 1em;
@HOVER_COLOR: #a4a4a4;

.widget-visible {
  opacity: 0;
}

#monitor-widget-wrapper {
  position: absolute;
  right: 0;
  top: 50px;
  width: 25em;
  height: calc(100vh - 100px);
  background: rgba(@CONTENT_COLOR_C, 80%);
  transition: all ease-in-out 0.15s;
  opacity: 0;

  .op-bar {
    position: relative;
    top: 0;
    left: 0;
    height: 2.5em;
    width: 100%;
    background-color: @TITLE_COLOR_LIGHT;
    display: flex;
    justify-content: space-between;

    .title-wrapper {
      color: @TITLE_FONT_COLOR_LIGHT;
      height: 100%;
      position: relative;
      left: @DISTANCE_TO_BORDER;
      padding-top: 0.4em;
      font-size: 1.15em;
    }

    .op-wrapper {
      position: relative;
      right: @DISTANCE_TO_BORDER;
      height: 100%;
      display: flex;
      flex-direction: row;

      .op-item {
        width: 1.5em;
        height: 1.5em;
        padding: 1em;
        margin: 0.2em @DISTANCE_TO_BORDER 0 0.2em;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        transition: all ease-in-out 0.1s;

        &:hover {
          background: @HOVER_COLOR;
        }
      }
    }
  }

  .main {
    height: calc(100% - 2.5em);
    width: 100%;

    #cpu-usage-wrapper {
      width: 100%;
      height: 300px;
      margin-left: auto;
      margin-right: auto;
      float: left;
      background-color: white;
    }
  }
}
</style>
