/**
 * 设备系统信息
 */
import { add } from 'husky'
import { getAddress, getDevInfo, getVersion, storage } from '~/api/system'

export const state = () => ({
  // 设备信息组件
  overview: null,
  hardware: null,
  network: null,
  // 设备状态组件
  address: null,
})

export const getters = {
  GET_OVERVIEW: (state: any) => state.overview,
  GET_HARDWARE: (state: any) => state.hardware,
  GET_NETWORK: (state: any) => state.network,
  GET_ADDRESS: (state: any) => state.address,
}

export const mutations = {
  SET_OVERVIEW: (state: any, data: any) => {
    state.overview = data
  },
  SET_HARDWARE: (state: any, data: any) => {
    state.hardware = data
  },
  SET_NETWORK: (state: any, data: any) => {
    state.network = data
  },
  SET_ADDRESS: (state: any, data: any) => {
    state.address = data
  },
}

export const actions = {
  async GetAllDeviceInfo({
    commit,
    rootState,
  }: {
    commit: any
    rootState: any
  }) {
    const { data: versionInfo } = await getVersion()
    const { data: storageInfo } = await storage()
    const { data: hardwareInfo } = await getDevInfo()

    const overview = {
      deviceModel: '',
      deviceSN: '',
      registerTime: '',
      storageSpace: '',
      firmwareVersion: '',
      systemVersion: '',
    }
    const hardware = {
      cpu: '',
      memory: '',
      diskNumber: '',
      sata: '',
      bluetooth: '',
      wifi: '',
      ethernet: '',
      usb: '',
      hdmi: '',
      zigbee: '',
      touchScreen: '',
      speakers: '',
    }

    const network = {}

    overview.deviceModel = hardwareInfo.data.model_id
    overview.deviceSN = hardwareInfo.data.dev_id
    overview.registerTime = hardwareInfo.data.create_time
    overview.storageSpace = storageInfo.data.total
    overview.firmwareVersion = versionInfo.data.firmware_ver
    overview.systemVersion = versionInfo.data.system_ver

    hardware.cpu = hardwareInfo.data.cpu_info
    hardware.memory = hardwareInfo.data.flash_memory
    hardware.diskNumber = hardwareInfo.data.disk_info
    hardware.sata = hardwareInfo.data.stat
    hardware.bluetooth = hardwareInfo.data.bluetooth
    hardware.wifi = hardwareInfo.data.wifi
    hardware.ethernet = hardwareInfo.data.cable
    hardware.usb = hardwareInfo.data.usb
    hardware.hdmi = hardwareInfo.data.hdmi
    hardware.zigbee = hardwareInfo.data.zigbee
    hardware.touchScreen = hardwareInfo.data.screen
    hardware.speakers = hardwareInfo.data.speaker

    commit('SET_OVERVIEW', overview)
    commit('SET_HARDWARE', hardware)
    commit('SET_NETWORK', network)
  },
  async GetNetworkInfo({ commit, rootState }: { commit: any; rootState: any }) {
    const { data: addressInfo } = await getAddress()
    const address = {
      situation: '正常',
      freq: '2.4G',
      MAC: '',
      hotspot: '',
      IPv4: '',
      hotspotIP: '',
      hotspotMask: '',
      hotspotDeviceNumber: 0,
      IPv4Gateway: '',
      IPv4Mask: '',
      IPv4DNS: '',
      publicIPv4Address: '',
      IPv6Address: '',
      IPv6Gateway: '',
      localIPv6Address: '',
      IPv6DNS: '',
      bluetoothStatus: '',
      bluetoothName: '',
      bluetoothDeviceNumber: 0,
      zigbeeStatus: '',
      zigbeeDeviceNumber: 0,
    }
    address.MAC = addressInfo.data.mac
    address.IPv4 = addressInfo.data.ipv4
    address.IPv4Gateway = addressInfo.data.ipv4_gateway
    address.IPv4DNS = addressInfo.data.ipv4_dns
    address.publicIPv4Address = addressInfo.data.ipv4_extract
    address.IPv6Address =
      addressInfo.data.ipv6 === null ? '' : addressInfo.data.ipv6
    address.IPv6Gateway =
      addressInfo.data.ipv6_gateway === null
        ? ''
        : addressInfo.data.ipv6_gateway
    address.IPv6DNS =
      addressInfo.data.ipv6_dns === null ? '' : addressInfo.data.ipv6_dns
    address.localIPv6Address =
      addressInfo.data.ipv6_extract === null
        ? ''
        : addressInfo.data.ipv6_extract

    commit('SET_ADDRESS', address)
  },
}
