import axios from 'axios'
import { fmtToForm } from '@/utils/api'
import { xhrHost } from '~/config/api-host.config'

const axiosInstance = axios.create({
  baseURL: xhrHost,
})

const authAPI = {
  // 身份认证相关
  Login: '/user/login',
  Reg: '/user/check_code',
  Captcha: '/user/register',
  // 设备相关
  Bind: '/check_serialNo',
  // 账户相关
  SetPassword: '/user/set_password',
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
