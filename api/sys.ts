import axios from 'axios'
import { xhrHost } from '~/config/api-host.config'

const axiosInstance = axios.create({
  baseURL: xhrHost,
})

const sysAPI = {
  // 身份认证相关
  Storage: '/system/get_disk_usage',
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
