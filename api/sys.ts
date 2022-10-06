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
 * 登录
 * @author Kwanhooo
 * parameter: {
 *     username: '',
 *     password: '',
 * }
 * @param parameter
 * @return {*}
 */
export function storage(parameter: any) {
  return axiosInstance({
    url: sysAPI.Storage,
    method: 'get',
  })
}
