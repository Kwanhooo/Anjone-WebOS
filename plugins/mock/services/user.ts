import { mock } from 'mockjs'
import {
  builder,
  getBody,
  getFormDataParameters,
  getQueryParameters,
} from '@/plugins/mock/util'
import { Status } from '@/utils/magic-numbers'

const login = (options: any) => {
  const body = getFormDataParameters(options)
  if (body.phone === '18888888888' && body.password === '000000') {
    return builder(
      {
        username: mock('@cname'),
        SNs: ['0000-sfd0-sfd-0-sdf0-qws0-0a0da0'],
        info: {
          role: 'admin',
          avatar: mock('@url'),
          phone: '18888888888',
        },
      },
      '登录成功',
      Status.OK
    )
  }
  return builder({}, '账号或密码错误', Status.NoPermission)
}

const reg = (options: any) => {
  const body = getFormDataParameters(options)
  return builder(
    {
      username: 'Anjone用户',
      SNs: [],
      info: {
        role: 'admin',
        avatar: mock('@url'),
        phone: body.phone,
      },
    },
    '注册成功，欢迎使用Anjone！',
    Status.OK
  )
}

const setPwd = (options: any) => {
  const body = getFormDataParameters(options)
  return builder(
    {
      username: 'Anjone用户',
      SNs: [],
      info: {
        role: 'admin',
        avatar: mock('@url'),
        phone: body.phone,
      },
    },
    '设置新密码成功！',
    Status.OK
  )
}

const bind = (options: any) => {
  const body = getFormDataParameters(options)
  const SNToBind = body.serialNo
  const res = []
  res.push(SNToBind)
  if (mock('@boolean')) {
    return builder({ SNs: res }, '绑定成功！', Status.OK)
  } else
    return builder(
      { SNs: res },
      '绑定失败，无法验证此设备序列号！',
      Status.BusinessFailed
    )
}

const captcha = (options: any) => {
  return builder({}, '获取成功！', Status.OK)
}

mock(/\/user\/login/, 'post', login)
mock(/\/user\/check_code/, 'post', reg)
mock(/\/user\/register/, 'post', captcha)
mock(/\/user\/set_password/, 'post', setPwd)
mock(/\/check_serialNo/, 'post', bind)
