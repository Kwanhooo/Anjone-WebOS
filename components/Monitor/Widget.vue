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
      <div id="monitor-overview-wrapper">
        <div id="storage-chart-wrapper"></div>
        <div class="info-wrapper">
          <div id="device-info-wrapper">
            <div class="device-name">
              <span>{{ deviceName }}</span>
            </div>
            <div class="reg-time">
              <span>注册时间：{{ regTime }}</span>
            </div>
          </div>
          <div id="storage-detail-wrapper">
            <div>
              <span>总容量</span
              ><span style="float: right; padding-right: 1.5em"
                >{{ total }} GB</span
              >
            </div>
            <div>
              <span>剩余</span
              ><span style="float: right; padding-right: 1.5em"
                >{{ free }} GB</span
              >
            </div>
          </div>
        </div>
      </div>
      <hr style="width: 90%" />
      <div id="monitor-charts-wrapper">
        <div id="cpu-usage-wrapper"></div>
        <div id="mem-usage-wrapper"></div>
        <div id="net-usage-wrapper"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage } from '@/api/sys'
import { wsHost } from '@/config/api-host.config'

export default {
  name: 'Widget',
  data() {
    return {
      opacityGoing: true,
      deviceName: 'HDC - 202',
      regTime: '2022-9-16',
      ws: null,
      cpu_q: null,
      men_q: null,
      recv_q: null,
      send_q: null,
      total: 11451.4,
      free: 795.67,
    }
  },
  mounted() {
    this.connectWebsocket()
    setTimeout(() => {
      document.getElementById('monitor-widget-wrapper').style.opacity = '1'
    }, 150)
    this.echartsInit()
    storage().then((res) => {
      this.total = res.data.data.total
      this.free = res.data.data.free
    })
    this.storageInit()
  },
  methods: {
    onCloseClicked() {
      const vm = this
      document.getElementById('monitor-widget-wrapper').style.opacity = '0'
      setTimeout(() => {
        vm.opacityGoing = false
        document.getElementById('monitor-widget-wrapper').remove()
      }, 150)
    },
    storageInit() {
      const storageUsage = this.$echarts.init(
        document.getElementById('storage-chart-wrapper')
      )
      const option = {
        title: {
          show: true,
          text:
            '使用率\n' +
            (((this.total - this.free) / this.total) * 100).toFixed(2) +
            '%',
          x: 'center',
          y: 'center', // 通过x,y将标题(进度)定位在圆环中心
          textStyle: {
            fontSize: '14',
            color: '#019e48',
            fontWeight: '400',
            fontFamily: 'sans-serif',
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{d}%',
          show: false,
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          show: false,
        },
        series: {
          name: '',
          type: 'pie',
          radius: ['65%', '85%'],
          avoidLabelOverlap: true,
          hoverAnimation: false,
          label: {
            normal: {
              show: false,
              position: 'center',
            },
            emphasis: {
              show: false,
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            {
              value: (((this.total - this.free) / this.total) * 100).toFixed(2),
              name: '',
              itemStyle: {
                color: '#019e48',
              },
            },
            {
              value:
                100 -
                (((this.total - this.free) / this.total) * 100).toFixed(2),
              name: '',
              itemStyle: {
                color: '#bbbbbb',
              },
            },
          ],
        },
      }
      storageUsage.setOption(option)
    },
    cpuUsageInit() {
      const cpuUsage = this.$echarts.init(
        document.getElementById('cpu-usage-wrapper')
      )
      const cpuUsageOptions = {
        xAxis: {
          data: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
          ],
        },
        yAxis: {},
        series: [
          {
            data: this.cpu_q,
            type: 'line',
            stack: 'x',
            areaStyle: {},
          },
        ],
      }
      cpuUsage.setOption(cpuUsageOptions)
    },
    memUsageInit() {
      const memUsage = this.$echarts.init(
        document.getElementById('mem-usage-wrapper')
      )
      const memUsageOptions = {
        xAxis: {
          data: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
          ],
        },
        yAxis: {},
        series: [
          {
            data: this.men_q,
            type: 'line',
            stack: 'x',
            areaStyle: {},
          },
        ],
      }
      memUsage.setOption(memUsageOptions)
    },
    netUsageInit() {
      const memUsage = this.$echarts.init(
        document.getElementById('net-usage-wrapper')
      )
      const memUsageOptions = {
        xAxis: {
          data: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
          ],
        },
        yAxis: {},
        series: [
          {
            data: this.send_q,
            type: 'line',
            stack: 'x',
            areaStyle: {},
          },
          {
            data: this.recv_q,
            type: 'line',
            stack: 'x',
            areaStyle: {},
          },
        ],
      }
      memUsage.setOption(memUsageOptions)
    },
    echartsInit() {
      this.cpuUsageInit()
      this.memUsageInit()
      this.netUsageInit()
    },
    connectWebsocket() {
      const vm = this
      if (typeof WebSocket === 'undefined') {
        this.$message.error('您的浏览器不支持WebSocket，监控数据无法获取！')
      } else {
        // 打开WebSocket
        this.ws = new WebSocket(wsHost)
        // 建立连接时
        this.ws.onopen = () => {
          // 向服务端发送测试数据
          const data = 'Hello Anjone'
          vm.ws.send(data)
        }
        // 接收服务端返回的数据时
        this.ws.onmessage = (evt) => {
          const data = JSON.parse(evt.data)
          vm.cpu_q = data.cpu_q
          vm.men_q = data.men_q
          vm.recv_q = data.recv_q
          vm.send_q = data.send_q
          vm.echartsInit()
        }
        // 发生错误时
        this.ws.onerror = (evt) => {
          this.$message.error('连接监控服务时发生错误，请稍候再试！')
        }
        // 关闭连接时
        this.ws.onclose = (evt) => {}
      }
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

    #monitor-overview-wrapper {
      height: 130px;
      //background-color: white;
      display: flex;
      flex-direction: row;

      #storage-chart-wrapper {
        flex: 3;
        position: relative;
        left: 0;
        top: 0;
        padding-top: 0.2em;
        height: 100%;
        max-width: 150px;
      }

      .info-wrapper {
        flex: 5;
        //background-color: yellow;
        color: @TITLE_FONT_COLOR_LIGHT;
        padding-left: 0.6em;

        #device-info-wrapper {
          font-family: sans-serif;
          font-size: 14px;

          .device-name {
            padding-top: 0.8em;
            font-size: 1.3em;
          }

          .reg-time {
            padding-bottom: 0.8em;
            font-size: 1em;
          }
        }

        #storage-detail-wrapper {
          font-size: 1em;
        }
      }
    }

    #monitor-charts-wrapper {
      #cpu-usage-wrapper {
        width: 100%;
        height: 230px;
        margin-left: auto;
        margin-right: auto;
        float: left;
      }

      #mem-usage-wrapper {
        #cpu-usage-wrapper;
      }

      #net-usage-wrapper {
        #cpu-usage-wrapper;
      }
    }
  }
}
</style>
