import axios from 'axios'
import { xhrHost } from '~/config/api-host.config'

import { axiosInstance } from '~/plugins/axios'

export const fileAPI = {
  // 上传头像
  ResetAvatar: '/file/avatar/upload',
}

/**
 * 上传头像
 * @method POST
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
