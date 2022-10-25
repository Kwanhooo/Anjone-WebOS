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
  const token = '@guid'
  if (body.phone === '18888888888' && body.password === '000000') {
    return builder(
      {
        username: mock('@cname'),
        phone: '18888888888',
        devs: [{ dev: 'HDC-101-1001', time: '2022-01-01' }],
        role: 'admin',
        avatar: mock(
          'https://cdn1.iconfinder.com/data/icons/facely-metapeople-3d-avatar-set/512/17._Designer.png'
        ),
        create_time: mock('@datetime'),
      },
      '登录成功',
      Status.OK,
      { authorization: token }
    )
  }
  return builder({}, '账号或密码错误', Status.NoPermission)
}

const reg = (options: any) => {
  const body = getFormDataParameters(options)
  const token = '@guid'
  return builder(
    {
      username: mock('Anjone用户'),
      phone: body.phone,
      devs: [],
      role: 'admin',
      avatar: mock(
        'https://cdn1.iconfinder.com/data/icons/facely-metapeople-3d-avatar-set/512/17._Designer.png'
      ),
      create_time: mock('@datetime'),
    },
    '注册成功，欢迎使用Anjone！',
    Status.OK,
    { authorization: token }
  )
}

const setPwd = (options: any) => {
  const body = getFormDataParameters(options)
  const token = '@guid'
  return builder(
    {
      username: mock('Anjone用户'),
      phone: body.phone,
      devs: [],
      role: 'admin',
      avatar: mock(
        'https://cdn1.iconfinder.com/data/icons/facely-metapeople-3d-avatar-set/512/17._Designer.png'
      ),
      create_time: mock('@datetime'),
    },
    '设置新密码成功！',
    Status.OK,
    { authorization: token }
  )
}

const resetInfo = (options: any) => {
  const body = getBody(options)
  const token = '@guid'
  return builder({}, '设置成功！', Status.OK, { authorization: token })
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

const deleteAll = (options: any) => {
  return builder({}, '删除成功！', Status.OK)
}

const loginLog = (options: any) => {
  return builder(
    [
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
      {
        phone: '18373687376',
        dev: 'windows PC电脑',
        ip_addr: '127.0.0.1',
        access_way: '浏览器',
        login_time: '2022-10-25 08:54:12',
      },
    ],
    '成功！',
    Status.OK
  )
}
mock(/\/user\/login/, 'post', login)
mock(/\/user\/check_code/, 'post', reg)
mock(/\/user\/register/, 'post', captcha)
mock(/\/user\/set_password/, 'post', setPwd)
mock(/\/user\/reset_info/, 'post', resetInfo)
mock(/\/check_serialNo/, 'post', bind)
mock(/\/notice\/deleteAll/, 'post', deleteAll)
mock(/\/user\/login_log/, 'get', loginLog)
