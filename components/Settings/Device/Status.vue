<template>
  <div class="root-wrapper">
    <div class="overview-wrapper">
      <div class="storage">
        <div id="status-storage-chart" />
      </div>
      <div class="info-column-l column">
        <div class="info-item">
          <div class="key">总容量</div>
          <div class="value">{{ storage.total.toFixed(1) }} GB</div>
          <div class="percent"></div>
        </div>
        <div class="info-item">
          <div class="key">剩余容量</div>
          <div class="value">{{ storage.free.toFixed(1) }} GB</div>
          <div class="value percent">
            {{ ((storage.free / storage.total) * 100).toFixed(1) }} %
          </div>
        </div>
        <div class="info-item">
          <div class="key">已使用</div>
          <div class="value">
            {{ (storage.total - storage.free).toFixed(1) }} GB
          </div>
          <div class="value percent">
            {{
              (((storage.total - storage.free) / storage.total) * 100).toFixed(
                1
              )
            }}
            %
          </div>
        </div>
        <div class="info-item">
          <div>
            个人 {{ overview.personal }} GB | 团队 {{ overview.team }} GB | 系统
            {{ overview.system }} GB
          </div>
        </div>
      </div>
      <div class="info-column-divider">
        <a-divider
          type="vertical"
          style="width: 2px; height: 100%; background-color: #bbb"
        />
      </div>
      <div class="info-column-r column">
        <div class="info-item">
          <div class="key">{{ overview.disks[0].name }}状态</div>
          <div class="value" style="color: #3380f3 !important">
            {{ overview.disks[0].status }}
          </div>
        </div>
        <div class="info-item">
          <div class="key">{{ overview.disks[0].name }}序列号</div>
          <div class="value">{{ overview.disks[0].SN }}</div>
        </div>
        <div class="info-item">
          <div class="key">{{ overview.disks[1].name }}状态</div>
          <div class="value" style="color: #3380f3 !important">
            {{ overview.disks[0].status }}
          </div>
        </div>
        <div class="info-item">
          <div class="key">{{ overview.disks[1].name }}序列号</div>
          <div class="value">{{ overview.disks[1].SN }}</div>
        </div>
      </div>
    </div>
    <div class="network-wrapper">
      <table>
        <tr>
          <td colspan="4" style="text-align: center !important">网络状态</td>
        </tr>
        <tr>
          <td>网络情况</td>
          <td>{{ network.situation }}</td>
          <td>WIFI频段</td>
          <td>{{ network.freq }}</td>
        </tr>
        <tr>
          <td>物理地址MAC</td>
          <td>{{ network.MAC }}</td>
          <td>WIFI热点名称</td>
          <td>{{ network.hotspot }}</td>
        </tr>
        <tr>
          <td>IPv4地址</td>
          <td>{{ network.IPv4 }}</td>
          <td>WIFI热点IP地址</td>
          <td>{{ network.hotspotIP }}</td>
        </tr>
        <tr>
          <td>IPv4默认网关</td>
          <td>{{ network.IPv4Gateway }}</td>
          <td>WIFI热点子网掩码</td>
          <td>{{ network.hotspotMask }}</td>
        </tr>
        <tr>
          <td>IPv4子网掩码</td>
          <td>{{ network.IPv4Mask }}</td>
          <td>WIFI接入设备数量</td>
          <td>{{ network.hotspotDeviceNumber }}</td>
        </tr>
        <tr>
          <td>IPv4 DNS</td>
          <td>{{ network.IPv4DNS }}</td>
          <td>蓝牙状态</td>
          <td>{{ network.bluetoothStatus }}</td>
        </tr>
        <tr>
          <td>外网IPv4地址</td>
          <td>{{ network.publicIPv4Address }}</td>
          <td>蓝牙名称</td>
          <td>{{ network.bluetoothName }}</td>
        </tr>
        <tr>
          <td>IPv6地址</td>
          <td>{{ network.IPv6Address }}</td>
          <td>蓝牙接入设备数量</td>
          <td>{{ network.bluetoothDeviceNumber }}</td>
        </tr>
        <tr>
          <td>IPv6默认网关</td>
          <td>{{ network.IPv6Gateway }}</td>
          <td>ZigBee状态</td>
          <td>{{ network.zigbeeStatus }}</td>
        </tr>
        <tr>
          <td>本机IPv6地址</td>
          <td>{{ network.localIPv6Address }}</td>
          <td>Zigbee接入设备数量</td>
          <td>{{ network.hotspot }}</td>
        </tr>
        <tr>
          <td>IPv6 DNS</td>
          <td>{{ network.IPv6DNS }}</td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
    <div class="button-group-wrapper">
      <button>修改设备名称</button>
      <button>设置WLAN</button>
      <button>设置蓝牙</button>
      <button>设置ZigBee</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { storage } from '@/api/system'
import { DiskStatus } from '@/utils/magic-numbers'

export default Vue.extend({
  name: 'Status',
  data() {
    return {
      storageChart: null,
      storage: {
        total: 0,
        free: 0,
      },
      overview: {
        personal: 315.6,
        team: 712,
        system: 87.6,
        disks: [
          {
            name: '硬盘1',
            status: '挂载正常',
            SN: 'WDWCC6Y6FRRU63',
          },
          {
            name: '硬盘2',
            status: '挂载正常',
            SN: 'WDWCC6Y6FDET45',
          },
        ],
      },
      network: {},
    }
  },
  beforeMount() {},
  mounted() {
    const vm = this
    this.initStorageChart()
    this.initData()
    setInterval(() => {
      // TODO: 可能导致性能问题
      this.storageChart.resize()
    }, 100)
  },
  methods: {
    preloadData() {
      if ($nuxt.$store.state.system.address !== null) {
        this.network = $nuxt.$store.state.system.address
      }
    },
    initData() {
      this.preloadData()
      const vm = this
      $nuxt.$store
        .dispatch('system/GetNetworkInfo')
        .then(() => {
          vm.network = $nuxt.$store.state.system.address
        })
        .catch(() => {
          this.$message.error('获取设备信息失败，请检查网络！')
        })
    },
    initStorageChart() {
      storage().then((res) => {
        this.storage.total = res.data.data.total
        this.storage.free = res.data.data.free
        this.renderStorageChart()
      })
    },
    renderStorageChart() {
      const storageUsage = this.$echarts.init(
        document.getElementById('status-storage-chart')
      )
      this.storageChart = storageUsage
      const option = {
        title: [
          {
            show: true,
            text: '正常\n',
            x: 'center',
            y: 'center',
            textStyle: {
              fontSize: '20',
              color: '#019e48',
              fontWeight: '600',
              fontFamily: 'sans-serif',
            },
          },
          {
            show: true,
            text: '\n\n存储状态',
            x: 'center',
            y: 'center',
            textStyle: {
              fontSize: '16',
              color: '#6c6c6c',
              fontWeight: '400',
              fontFamily: 'sans-serif',
            },
          },
        ],
        grid: {
          top: 0,
          bottom: 0,
        },
        tooltip: {
          trigger: 'item',
          formatter: '{d}%   ({c}GB)',
          show: true,
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
              value: (this.storage.total - this.storage.free).toFixed(2),
              name: '',
              itemStyle: {
                color: '#3380F3',
              },
            },
            {
              value: this.storage.free.toFixed(2),
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
  },
})
</script>

<style lang="less" scoped>
@import '@/assets/style/global';

.root-wrapper {
  min-width: 52em;
  //width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 1em;

  .overview-wrapper {
    flex: 4;
    flex-grow: 2;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-right: 2em;

    .storage {
      flex: 1.5;
      min-width: 120px;
      min-height: 160px;
      width: 100%;
      height: 100%;

      #status-storage-chart {
        width: 100%;
        height: 100%;
        padding-top: 0.5em;
        padding-right: 0.2em;
      }
    }

    .info-item {
      font-size: 0.83rem;
      color: #4f4f4f;
      flex: 1;
      display: inline-flex;
      flex-direction: row;
      font-family: @GLOBAL_FONT_FAMILY;
      //font-weight: 650;

      .key {
        flex: 1;
      }

      .value {
        flex: 1.2;
      }

      .percent {
        color: @STRONG_THEME_COLOR_LIGHT;
        flex: 0.7 !important;
      }
    }

    .column {
      padding: 1.5em 0 0.5em 0 !important;
    }

    .info-column-l {
      flex: 2.5;
      width: 100%;
      height: 100%;
      //background-color: orange;
      display: flex;
      flex-direction: column;
      justify-items: center;
      justify-content: space-around;
      padding-top: 0.7em;
    }

    .ant-divider,
    .ant-divider-vertical {
      margin: 0 !important;
    }

    .info-column-divider {
      padding: 1.2em 0 1em 0;
      margin-right: 1em;
    }

    .info-column-r {
      flex: 2.5;
      width: 100%;
      height: 100%;
      //background-color: pink;
      display: flex;
      flex-direction: column;
      justify-items: center;
      justify-content: space-around;
      padding-top: 0.7em;
    }
  }

  .network-wrapper {
    flex: 8;
    flex-grow: 4;
    width: 100%;
    //background-color: #4f98fd;
    padding-top: 1.5em !important;
    //padding-bottom: 2em;

    table {
      width: 94%;
      height: auto;
      margin-left: 3%;

      tr {
        background: white;
        line-height: 1.7em;

        &:nth-child(2n-1) {
          background: rgb(242, 242, 242);
        }

        &:first-child {
          background: #ababab !important;
          color: white;
        }
      }

      td {
        padding: 0.1em 0.5em;
        text-align: left !important;
        border: 1px solid #dddddd;
        font-family: @GLOBAL_FONT_FAMILY;

        div {
          min-height: 1.7em;
        }
      }
    }
  }

  .button-group-wrapper {
    flex: 1;
    margin-top: 1em;
    margin-left: 3%;
    padding-bottom: 1em;

    button {
      background: @STRONG_THEME_COLOR_LIGHT;
      margin-right: 1em;
      width: 8em;
      padding: 0.5em 0;
      border: none;
      color: white;
      border-radius: 8px;
      transition: all ease-in-out 0.15s;
      cursor: pointer;
      pointer-events: auto;
      font-family: @GLOBAL_FONT_FAMILY;
      outline: none;
      font-weight: 500;
      font-size: 0.8rem;

      &:hover {
        background: #4f98fd !important;
      }
    }
  }
}
</style>
