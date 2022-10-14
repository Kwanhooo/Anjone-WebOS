import { mock } from 'mockjs'
import { builder, getBody } from '~/plugins/mock/util'
import { Status } from '@/utils/magic-numbers'

const getDiskUsage = (options: any) => {
  const body = getBody(options)
  return builder({ total: 11451.4, free: 8145.14 }, '获取成功', Status.OK)
}

mock(/\/system\/get_disk_usage/, 'get', getDiskUsage)
