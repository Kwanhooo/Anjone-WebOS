import axios from 'axios'
import { xhrHost } from '~/config/api-host.config'

import { axiosInstance } from '~/plugins/axios'
import { fmtToForm } from '~/utils/api'
import { fileAPI } from '~/api/file'

export const sysAPI = {
  StartService: '/samb/start',
  StopService: '/samb/stop',
  Enter: '/samb/enter',
  EnterAbs: '/samb/enter_abs',
  Back: '/samb/back',
  CheckFile: '/samb/check',
  UploadFile: '/samb/upload',
  DeleteFile: '/samb/delete',
  CreateDir: '/samb/create_dir',
  FileInfo: '/samb/file_info/',
  Rename: '/samb/rename',
  Refresh: '/samb/refresh',
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

/**
 * 上传文件
 * @param file
 */
export function uploadFile(file: any) {
  return axiosInstance({
    url: sysAPI.UploadFile,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: file,
  })
}

/**
 * 删除文件
 * @param filename
 */
export function deleteFile(filename: any) {
  return axiosInstance({
    url: sysAPI.DeleteFile,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: fmtToForm(filename),
  })
}

/**
 * 创建目录
 * @param dirName 目录名
 */
export function createDir(dirName: any) {
  return axiosInstance({
    url: sysAPI.CreateDir,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: fmtToForm(dirName),
  })
}

/**
 * 文件详情
 * @param filename
 */
export function fileInfo(filename: any) {
  return axiosInstance({
    url: sysAPI.FileInfo + filename,
    method: 'get',
  })
}

/**
 * 重命名
 * @param parameter
 */
export function rename(parameter: any) {
  return axiosInstance({
    url: sysAPI.Rename,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: fmtToForm(parameter),
  })
}

/**
 * 刷新
 * @param parameter
 */
export function refresh() {
  return axiosInstance({
    url: sysAPI.Refresh,
    method: 'get',
  })
}
