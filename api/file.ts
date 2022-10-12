import axios from 'axios'
import { xhrHost } from '~/config/api-host.config'

const axiosInstance = axios.create({
  baseURL: xhrHost,
})

export const fileAPI = {
  // 上传头像
  ResetAvatar: '/file/avatar/upload',
}

/**
 * 上传头像
 * @param parameter
 */
export function resetAvatar(parameter: any) {
  return axiosInstance({
    url: fileAPI.ResetAvatar,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: parameter,
  })
}
