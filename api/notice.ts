import axios from 'axios'
import { xhrHost } from '~/config/api-host.config'

const axiosInstance = axios.create({
  baseURL: xhrHost,
})

export const noticeAPI = {
  // 身份认证相关
  DeleteAll: '/notice/delete_all',
}

/**
 * 删除所有通知
 */
export function deleteAll() {
  return axiosInstance({
    url: noticeAPI.DeleteAll,
    method: 'post',
  })
}
