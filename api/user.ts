import { fmtToForm } from '@/utils/api'

import { axiosInstance } from '~/plugins/axios'

export const authAPI = {
  // 身份认证相关
  Login: '/user/login',
  Reg: '/user/check_code',
  Captcha: '/user/register',
  // 设备相关
  Bind: '/check_serialNo',
  // 账户相关
  SetPassword: '/user/set_password',
  ResetInfo: '/user/reset_info',
  GetCode: '/user/get_code',
  LoginLog: '/user/login_log',
  CreateUser: '/user/new_user',
  GetUsers: '/user/get_users',
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
export function login(parameter: any) {
  return axiosInstance({
    url: authAPI.Login,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: fmtToForm(parameter),
  })
}

/**
 * 注册
 * @param parameter
 * @constructor
 */
export function reg(parameter: any) {
  return axiosInstance({
    url: authAPI.Reg,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: fmtToForm(parameter),
  })
}

/**
 * 绑定设备
 * @param parameter
 */
export function bind(parameter: any) {
  return axiosInstance({
    url: authAPI.Bind,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: fmtToForm(parameter),
  })
}

/**
 * 获取验证码
 * @param parameter
 */
export function captcha(parameter: any) {
  return axiosInstance({
    url: authAPI.Captcha,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: fmtToForm(parameter),
  })
}

/**
 * 获取验证码
 * @param parameter
 */
export function setPassword(parameter: any) {
  return axiosInstance({
    url: authAPI.SetPassword,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: fmtToForm(parameter),
  })
}

/**
 * 修改用户信息
 * @param parameter
 */
export function resetInfo(parameter: any) {
  return axiosInstance({
    url: authAPI.ResetInfo,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: parameter,
  })
}

/**
 * 修改用户信息
 * @param parameter
 */
export function getCode(parameter: any) {
  return axiosInstance({
    url: authAPI.GetCode,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: sessionStorage.getItem('TOKEN'),
    },
    data: fmtToForm(parameter),
  })
}

export function loginLog() {
  return axiosInstance({
    url: authAPI.LoginLog,
    method: 'get',
  })
}

export function getUsers() {
  return axiosInstance({
    url: authAPI.GetUsers,
    method: 'get',
  })
}

export function createUser(parameter: any) {
  return axiosInstance({
    url: authAPI.CreateUser,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: fmtToForm(parameter),
  })
}
