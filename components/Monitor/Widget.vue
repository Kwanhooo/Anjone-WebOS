<!-- 系统监控 -->
<template>
  <div
    id="monitor-widget-wrapper"
    :class="{ 'desktop-widget': true, __closable__: !isPined }"
  >
    <div class="op-bar">
      <div class="title-wrapper">设备监控信息</div>
      <div class="op-wrapper">
        <div class="op-item" @click="onPinClicked()">
          <img alt="minimize" :src="pinSvg" />
        </div>
        <div
          class="op-item"
          style="margin-top: 0.3em; margin-right: 0.5em"
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
        <div style="margin-top: 1em">
          <span style="padding-left: 1em">CPU使用率</span>
          <span style="float: right; padding-right: 2em; color: #3380f3"
            >{{ cpu_q[cpu_q.length - 1] }} %</span
          >
        </div>
        <div id="cpu-usage-wrapper"></div>
        <div>
          <span style="padding-left: 1em">内存使用率</span>
          <span style="float: right; padding-right: 2em; color: #3380f3"
            >{{ men_q[men_q.length - 1] }} %</span
          >
        </div>
        <div id="mem-usage-wrapper"></div>
        <div>
          <span style="padding-left: 1em">网络数据</span>
          <span style="float: right; padding-right: 2em">
            <img src="@/assets/svg/circle-dark.svg" />
            接收
            <span style="color: #3380f3"
              >{{ recv_q[recv_q.length - 1] }} MB/s</span
            >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <img src="@/assets/svg/circle-light.svg" />发送
            <span style="color: #3380f3"
              >{{ send_q[send_q.length - 1] }} MB/s</span
            ></span
          >
        </div>
        <div id="net-usage-wrapper"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage } from '@/api/system'
import { monitorWSHost } from '@/config/api-host.config'

export default {
  name: 'Widget',
  data() {
    return {
      isPined: false,
      pinSvg: require('@/assets/svg/pin.svg'),
      opacityGoing: true,
      regTime: '',
      deviceName: '',
      cpu_q: [],
      men_q: [],
      recv_q: [],
      send_q: [],
      total: null,
      free: null,
    }
  },
  mounted() {
    this.deviceName = JSON.parse(
      sessionStorage.getItem('USER_STATE')
    ).devs[0].dev
    this.regTime = JSON.parse(sessionStorage.getItem('USER_STATE')).devs[0].time
    this.connectWebsocket()
    setTimeout(() => {
      document.getElementById('monitor-widget-wrapper').style.opacity = '1'
    }, 150)
    this.echartsInit()
    storage().then((res) => {
      this.total = res.data.data.total
      this.free = res.data.data.free
      this.storageInit()
    })
  },
  methods: {
    onPinClicked() {
      this.isPined = !this.isPined
      if (this.isPined) {
        this.pinSvg = require('@/assets/svg/pin-active.svg')
      } else {
        this.pinSvg = require('@/assets/svg/pin.svg')
      }
    },
    onCloseClicked() {
      $nuxt.$store.commit('sys/SET_IS_MONITOR_ACTIVE', false)
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
        title: [
          {
            show: true,
            text: '使用率\n',
            x: 'center',
            y: 'center', // 通过x,y将标题(进度)定位在圆环中心
            textStyle: {
              fontSize: '15',
              color: '#666',
              fontWeight: '400',
              fontFamily: 'sans-serif',
            },
          },
          {
            show: true,
            text:
              '\n\n' +
              (((this.total - this.free) / this.total) * 100).toFixed(2) +
              '%',
            x: 'center',
            y: 'center', // 通过x,y将标题(进度)定位在圆环中心
            textStyle: {
              fontSize: '15',
              color: '#3380F3',
              fontWeight: '600',
              fontFamily: 'sans-serif',
            },
          },
        ],
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
          radius: ['75%', '85%'],
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
                color: '#3380F3',
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
          axisPointer: {
            label: {
              formatter(params) {
                return '使用率'
              },
            },
          },
        },
        yAxis: {
          type: 'value',
          max: 100,
          min: 0,
          interval: 20,
          splitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#737576'],
              width: 1,
              type: [1, 2],
            },
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(20,50,95, 0.1)',
            },
          },
        },
        grid: {
          top: 25,
          bottom: 25,
        },
        series: [
          {
            name: 'CPU',
            data: this.cpu_q,
            type: 'line',
            stack: 'x',
            smooth: true,
            areaStyle: { opacity: 0.3 },
            color: '#6c6c6c',
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
          axisPointer: {
            label: {
              formatter(params) {
                return '使用率'
              },
            },
          },
        },
        grid: {
          top: 25,
          bottom: 25,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(20,50,95, 0.1)',
            },
          },
        },
        yAxis: {
          type: 'value',
          max: 100,
          min: 0,
          interval: 20,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#d9e1e4',
            },
          },
          axisLabel: {
            color: '#4e5b5f',
            formatter(val) {
              return val
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: ['#737576'],
              width: 1,
              type: [1, 2],
            },
          },
        },
        series: [
          {
            name: '内存',
            data: this.men_q,
            type: 'line',
            stack: 'x',
            smooth: true,
            areaStyle: { opacity: 0.3 },
            color: '#6c6c6c',
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
          axisPointer: {
            label: {
              formatter(params) {
                return '网络占用'
              },
            },
          },
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              color: ['#737576'],
              width: 1,
              type: [1, 2],
            },
          },
        },
        grid: {
          top: 25,
          bottom: 25,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(20,50,95, 0.1)',
            },
          },
        },
        series: [
          {
            name: '发送',
            data: this.send_q,
            type: 'line',
            smooth: true,
            color: '#a8aeb6',
          },
          {
            name: '接收',
            data: this.recv_q,
            type: 'line',
            smooth: true,
            color: '#6c6c6c',
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
        let newWS = $nuxt.$store.getters['sys/monitorWS']
        if (newWS === null) {
          newWS = new WebSocket(monitorWSHost)
        }
        // 建立连接时
        newWS.onopen = () => {
          // 向服务端发送测试数据
          const data = 'Hello Anjone'
          newWS.send(data)
        }
        // 接收服务端返回的数据时
        newWS.onmessage = (evt) => {
          const data = JSON.parse(evt.data)
          vm.cpu_q = data.cpu_q
          vm.men_q = data.men_q
          vm.recv_q = data.recv_q

          data.recv_q.forEach((item, index) => {
            vm.recv_q[index] = (item / 1024 / 1024).toFixed(2)
          })

          data.send_q.forEach((item, index) => {
            vm.send_q[index] = (item / 1024 / 1024).toFixed(2)
          })

          vm.echartsInit()
        }
        // 发生错误时
        newWS.onerror = (evt) => {
          this.$message.error('连接监控服务时发生错误，请稍候再试！')
        }
        // 关闭连接时
        newWS.onclose = (evt) => {}
        $nuxt.$store.commit('sys/SET_MONITOR_WS', newWS)
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import 'Monitor';
</style>
