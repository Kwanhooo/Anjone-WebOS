import { mock } from 'mockjs'
import { builder, getBody } from '~/plugins/mock/util'
import { Status } from '@/utils/magic-numbers'

const getDiskUsage = (options: any) => {
  const body = getBody(options)
  return builder({ total: 11451.4, free: 8145.14 }, '获取成功', Status.OK)
}

const getDevInfo = (options: any) => {
  return builder(
    {
      cpu_info: 'Rockchip RK3568 四核 2.0GHZ',
      flash_memory: '16GB eMMC V5.1',
      model_id: 'HDC-202',
      stat: 'SATA 3.0*2',
      wifi: '支持WIFI6',
      usb: 'USB3.0*1, USB2.0*1',
      hdmi: 'HDMI2.0a 4K@60HZ',
      screen: '5*',
      create_time: '2022-10-06 05:36:03',
      dev_id: 'AHDC2022022092011003',
      memory: '2GB DDR4',
      disk_info: '2.5 HDD*2',
      bluetooth: 'Bluetooth 5.0',
      cable: '1GbE RJ-45*2',
      zigbee: 'ZigBee 3.0',
      speaker: '立体声',
    },
    '获取成功',
    Status.OK
  )
}

const getVersion = (options: any) => {
  const body = getBody(options)
  return builder(
    {
      system_ver: 'V1.0 20220804',
      dev_id: 'AHDC2022022092011003',
      firmware_ver: 'V1.0 2022.923',
    },
    '获取成功',
    Status.OK
  )
}

const getAddress = (options: any) => {
  const body = getBody(options)
  return builder(
    {
      mac: '50:E5:49:3A:EA:90',
      ipv4: '192.168.100.107',
      ipv4_gateway: '192.168.100.1',
      ipv4_dns: '114.114.114.114',
      ipv4_extract: '113.246.132.18',
      ipv6: null,
      ipv6_gateway: null,
      ipv6_dns: null,
      ipv6_extract: null,
    },
    '获取成功',
    Status.OK
  )
}

mock(/\/system\/get_disk_usage/, 'get', getDiskUsage)
mock(/\/system\/get_dev_info/, 'get', getDevInfo)
mock(/\/system\/get_version/, 'get', getVersion)
mock(/\/system\/get_address/, 'get', getAddress)
