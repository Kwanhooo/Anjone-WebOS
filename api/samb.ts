import axios from 'axios'
import { xhrHost } from '~/config/api-host.config'

import { axiosInstance } from '~/plugins/axios'
import { fmtToForm } from '~/utils/api'

export const sysAPI = {
  StartService: '/samb/start',
  StopService: '/samb/stop',
  Enter: '/samb/enter',
  EnterAbs: '/samb/enter_abs',
  Back: '/samb/back',
  CheckFile: '/samb/check',
}

/**
 * 启动SMB服务
 * @method POST
 */
export function startService() {
  return axiosInstance({
    url: sysAPI.StartService,
    method: 'post',
  })
}

/**
 * 停止SMB服务
 * @method POST
 */
export function stopService() {
  return axiosInstance({
    url: sysAPI.StopService,
    method: 'post',
  })
}

/**
 * 进入SMB共享目录
 * @method POST
 * @param dir 目录 如：/music
 * @param type
 */
export function enter(dir: string, type: string) {
  return axiosInstance({
    url:
      sysAPI.Enter +
      `${dir}` +
      '?type=' +
      type +
      '&token=' +
      sessionStorage.getItem('TOKEN'),
    method: 'get',
  })
}

/**
 * 进入SMB共享目录（绝对路径）
 * @method POST
 * @param dir 目录 如：/music
 */
export function enterAbs(dir: object) {
  return axiosInstance({
    url: sysAPI.EnterAbs,
    method: 'post',
    data: fmtToForm(dir),
  })
}

/**
 * 返回上一级目录
 * @method POST
 */
export function back() {
  return axiosInstance({
    url: sysAPI.Back,
    method: 'post',
  })
}

/**
 * 检索文件类型
 * @method POST
 */
export function checkFile(filename: string) {
  return axiosInstance({
    url: sysAPI.CheckFile + '/' + `${filename}`,
    method: 'post',
  })
}
