import { mock } from 'mockjs'
import {
  builder,
  getBody,
  getFormDataParameters,
  getQueryParameters,
} from '@/plugins/mock/util'
import { Status } from '@/utils/magic-numbers'

const start = (options: any) => {
  return builder(['.', '..', 'music', 'photos'], 'success', Status.OK)
}

const stop = (options: any) => {
  return builder({}, 'success', Status.OK)
}

mock(/\/samb\/start/, 'post', start)
mock(/\/samb\/stop/, 'post', stop)
