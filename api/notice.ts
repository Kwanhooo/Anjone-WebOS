import { axiosInstance } from '~/plugins/axios'

export const noticeAPI = {
  // 获取通知
  GetNotice: '/notice/get_notice',
  DeleteAll: '/notice/delete_all',
}

/**
 * 获取通知
 * @method GET
 * @constructor
 */
export function GetNotice() {
  return axiosInstance({
    url: noticeAPI.GetNotice,
    method: 'get',
  })
}

/**
 * 删除所有通知
 * @method POST
 */
export function deleteAll() {
  return axiosInstance({
    url: noticeAPI.DeleteAll,
    method: 'post',
  })
}
