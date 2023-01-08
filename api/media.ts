import { axiosInstance } from '~/plugins/axios'

export const mediaAPI = {
  GetAllMusic: '/media/music/get_all',
  GetAllVideo: '/media/video/get_all',
}

/**
 * 获取所有音乐
 */
export function getAllMusic() {
  return axiosInstance({
    url: mediaAPI.GetAllMusic,
    method: 'get',
  })
}

/**
 * 获取所有视频
 */
export function getAllVideo() {
  return axiosInstance({
    url: mediaAPI.GetAllVideo,
    method: 'get',
  })
}
