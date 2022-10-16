import { mock } from 'mockjs'
import {
  builder,
  getBody,
  getFormDataParameters,
  getQueryParameters,
} from '@/plugins/mock/util'
import { Status } from '@/utils/magic-numbers'

const start = (options: any) => {
  console.log(options)
  return builder(['.', '..', 'music', 'photos'], 'success', Status.OK)
}

mock(/\/samb\/start/, 'post', start)
