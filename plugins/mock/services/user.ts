import { mock } from 'mockjs'
import { builder, getBody } from '@/plugins/mock/util'
import { Status } from '@/utils/magic-numbers'

const login = (options: any) => {
  const body = getBody(options)
  if (body.username === 'insider' && body.password === '000000') {
    return builder(
      {
        token: mock('@guid'),
        username: mock('@cname'),
        SNs: [],
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
  const body = getBody(options)
  return builder(
    {
      token: mock('@guid'),
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

const bind = (options: any) => {
  const body = getBody(options)
  const SNToBind = body.SN
  const res = []
  res.push(SNToBind)
  if (mock('@boolean')) return builder({ SNs: res }, '绑定成功！', Status.OK)
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
mock(/\/user\/reg/, 'post', reg)
mock(/\/user\/captcha/, 'get', captcha)
mock(/\/user\/bind/, 'post', bind)
