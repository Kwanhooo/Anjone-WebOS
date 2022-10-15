import axios from 'axios'
import { xhrHost } from '~/config/api-host.config'

import { axiosInstance } from '~/plugins/axios'

const sysAPI = {
  Storage: '/system/get_disk_usage',
  GetDevInfo: '/system/get_dev_info',
  GetVersion: '/system/get_version',
  GetAddress: '/system/get_address',
}

/**
 * 获取磁盘使用情况
 */
export function storage() {
  return axiosInstance({
    url: sysAPI.Storage,
    method: 'get',
  })
}

/**
 * 获取设备信息
 */
export function getDevInfo() {
  return axiosInstance({
    url: sysAPI.GetDevInfo,
    method: 'get',
  })
}

/**
 * 获取版本信息
 */
export function getVersion() {
  return axiosInstance({
    url: sysAPI.GetVersion,
    method: 'get',
  })
}

/**
 * 获取设备地址
 */
export function getAddress() {
  return axiosInstance({
    url: sysAPI.GetAddress,
    method: 'get',
  })
}
