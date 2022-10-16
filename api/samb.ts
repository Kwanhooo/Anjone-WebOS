import axios from 'axios'
import { xhrHost } from '~/config/api-host.config'

import { axiosInstance } from '~/plugins/axios'
import { fmtToForm } from '~/utils/api'

const sysAPI = {
  StartService: '/samb/start',
  StopService: '/samb/stop',
  Enter: '/samb/enter',
  EnterAbs: '/samb/enter_abs',
  Back: '/samb/back',
}

/**
 * 启动SMB服务
 */
export function startService() {
  return axiosInstance({
    url: sysAPI.StartService,
    method: 'post',
  })
}

/**
 * 停止SMB服务
 */
export function stopService() {
  return axiosInstance({
    url: sysAPI.StopService,
    method: 'post',
  })
}

/**
 * 进入SMB共享目录
 * @param dir 目录 如：/music
 */
export function enter(dir: string) {
  return axiosInstance({
    url: sysAPI.Enter + `${dir}`,
    method: 'post',
  })
}

/**
 * 进入SMB共享目录
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
 */
export function back() {
  return axiosInstance({
    url: sysAPI.Back,
    method: 'post',
  })
}
