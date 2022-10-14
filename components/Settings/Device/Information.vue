<template>
  <div id="device-info-wrapper">
    <div class="basic-info-wrapper">
      <div class="device-image">
        <img alt="device-image" src="@/static/device-image.png" />
      </div>
      <div class="info-column-wrapper">
        <div class="info-item">
          <div class="key">设备型号</div>
          <div class="value">{{ overview.deviceModel }}</div>
        </div>
        <div class="info-item">
          <div class="key">设备序列号</div>
          <div class="value">{{ overview.deviceSN }}</div>
        </div>
        <div class="info-item">
          <div class="key">注册时间</div>
          <div class="value">{{ overview.registerTime }}</div>
        </div>
        <div class="info-item">
          <div class="key">储存空间</div>
          <div class="value">{{ overview.storageSpace }}</div>
        </div>
      </div>
      <div style="flex: 0.1; height: 100%">
        <a-divider
          type="vertical"
          style="
            height: 130px;
            background-color: #bbb;
            width: 2px;
            margin-right: 3em;
          "
        />
      </div>
      <div class="info-column-wrapper" style="flex: 1.1">
        <div class="info-item">
          <div class="key">固件版本</div>
          <div class="value">{{ overview.firmwareVersion }}</div>
        </div>
        <div class="info-item">
          <div class="key">系统版本</div>
          <div class="value">{{ overview.systemVersion }}</div>
        </div>
        <div class="btn-wrapper">
          <button class="btn">检查更新</button>
        </div>
      </div>
    </div>
    <div class="device-detail-info">
      <div class="hardware-info">
        <table>
          <tr>
            <td colspan="2">硬件信息</td>
          </tr>
          <tr>
            <td>CPU</td>
            <td>{{ hardware.cpu }}</td>
          </tr>
          <tr>
            <td>内存</td>
            <td>{{ hardware.memory }}</td>
          </tr>
          <tr>
            <td>盘位数量</td>
            <td>{{ hardware.diskNumber }}</td>
          </tr>
          <tr>
            <td>SATA接口</td>
            <td>{{ hardware.sata }}</td>
          </tr>
          <tr>
            <td>蓝牙接口</td>
            <td>{{ hardware.bluetooth }}</td>
          </tr>
          <tr>
            <td>WIFI接口</td>
            <td>{{ hardware.wifi }}</td>
          </tr>
          <tr>
            <td>网线接口</td>
            <td>{{ hardware.ethernet }}</td>
          </tr>
          <tr>
            <td>USB接口</td>
            <td>{{ hardware.usb }}</td>
          </tr>
          <tr>
            <td>HDMI</td>
            <td>{{ hardware.hdmi }}</td>
          </tr>
          <tr>
            <td>ZigBee接口</td>
            <td>{{ hardware.zigbee }}</td>
          </tr>
          <tr>
            <td>触摸屏幕</td>
            <td>{{ hardware.touchScreen }}</td>
          </tr>
          <tr>
            <td>扬声器</td>
            <td>{{ hardware.speakers }}</td>
          </tr>
        </table>
      </div>
      <div class="network-info">
        <table>
          <tr>
            <td colspan="2">
              <div>网络信息</div>
            </td>
          </tr>
          <tr>
            <td>
              <div></div>
            </td>
            <td>
              <div></div>
            </td>
          </tr>
          <tr>
            <td>
              <div></div>
            </td>
            <td>
              <div></div>
            </td>
          </tr>
          <tr>
            <td>
              <div></div>
            </td>
            <td>
              <div></div>
            </td>
          </tr>
          <tr>
            <td>
              <div></div>
            </td>
            <td>
              <div></div>
            </td>
          </tr>
        </table>
        <div class="btn-wrapper">
          <button class="btn">修改网络设置</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Status } from '@/utils/magic-numbers'

export default Vue.extend({
  name: 'Information',
  data() {
    return {
      overview: {
        deviceModel: 'HDC-101 1001',
        deviceSN: '104f-1a2b-3c4d-5e6f',
        registerTime: '2022-10-13 12:00:00',
        storageSpace: '总容量 1.8TB',
        firmwareVersion: '1.0.0',
        systemVersion: '1.0.0',
      },
      hardware: {
        cpu: 'Rockchip RK3568 四核 2.0GHz',
        memory: '2GB DDR4',
        diskNumber: '16GB eMMC V5.1',
        sata: '2.5" HDD*2',
        bluetooth: 'Bluetooth 5.0',
        wifi: '支持WIFI 6',
        ethernet: '1GbE RJ-45*2',
        usb: 'USB3.0*1, USB2.0*1',
        hdmi: 'HDMI2.0a 4K@60Hz',
        zigbee: 'ZigBee 3.0',
        touchScreen: '5"',
        speakers: '立体声',
      },
      network: {},
    }
  },
  mounted() {
    // this.initData()
  },
  methods: {
    initData() {
      this.deviceModel = $nuxt.$store.state.user.devs[0].dev
      this.deviceSN = $nuxt.$store.state.user.devs[0].dev
      this.registerTime = $nuxt.$store.state.user.devs[0].create_time
      $nuxt.$store.dispatch('sys/GetStorageStatus').then((res) => {
        if (res.data.code === Status.OK) {
          this.storageSpace =
            '总容量' + Number(res.data.data.total).toFixed(2) + 'GB'
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    handleCheckUpdate() {},
  },
})
</script>

<style lang="less" scoped>
@import 'assets/style/global';

@CHECK_UPDATE_BTN_COLOR: @STRONG_THEME_COLOR_LIGHT;

#device-info-wrapper {
  margin: 4% 0 0 0;

  .basic-info-wrapper {
    display: flex;
    flex-direction: row;

    .device-image {
      width: 200px;

      img {
        width: 200px;
        height: auto;
      }
    }

    .info-column-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-items: center;
      justify-content: space-around;

      .info-item {
        font-size: 0.8rem;
        flex: 1;
        display: inline-flex;
        flex-direction: row;
        font-family: '黑体', sans-serif;
        font-weight: 650;

        .key {
          flex: 1;
        }

        .value {
          flex: 2;
        }
      }
    }
  }

  .device-detail-info {
    display: flex;
    flex-direction: row;

    margin-top: 1.5em;

    .hardware-info {
      flex: 1.5;

      table {
        width: 90%;
        height: auto;
        margin-left: 5%;

        tr {
          background: white;

          &:nth-child(2n-1) {
            background: rgb(242, 242, 242);
          }

          &:first-child {
            background: #ababab !important;
            color: white;
          }
        }

        td {
          text-align: center;
          border: 1px solid #dddddd;
        }
      }
    }

    .network-info {
      flex: 1;

      table {
        width: 90%;

        tr {
          background: white;

          &:nth-child(2n-1) {
            background: rgb(242, 242, 242);
          }

          &:first-child {
            background: #ababab !important;
            color: white;
          }
        }

        td {
          text-align: center;
          border: 1px solid #dddddd;

          div {
            min-height: 1.5em;
          }
        }
      }
    }
  }

  .btn-wrapper {
    flex: 2;

    .btn {
      width: 110px;
      background-color: @CHECK_UPDATE_BTN_COLOR;
      border-radius: 8px;
      color: white;
      font-size: 0.8rem;
      font-weight: 550;
      font-family: '黑体', sans-serif;
      cursor: pointer;
      pointer-events: auto;
      border: none;
      outline: none;
      float: right;
      margin-right: 10%;
      margin-top: 5%;
      padding-top: 0.6em;
      padding-bottom: 0.6em;
      transition: all ease-in-out 0.15s;

      &:hover {
        background: #4f98fd !important;
      }
    }
  }
}
</style>
