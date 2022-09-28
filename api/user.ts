import axios from 'axios'

const authAPI = {
  // 身份认证相关
  Login: '/user/login',
  Reg: '/user/reg',
  Captcha: '/user/captcha',
  // 设备相关
  Bind: '/user/bind',
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
  return axios({
    url: authAPI.Login,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: parameter,
  })
}

/**
 * 注册
 * @param parameter
 * @constructor
 */
export function reg(parameter: any) {
  return axios({
    url: authAPI.Reg,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: parameter,
  })
}

/**
 * 绑定设备
 * @param parameter
 */
export function bind(parameter: any) {
  return axios({
    url: authAPI.Bind,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: parameter,
  })
}

/**
 * 获取验证码
 * @param parameter
 */
export function captcha(parameter: any) {
  return axios({
    url: authAPI.Captcha,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: parameter,
  })
}
