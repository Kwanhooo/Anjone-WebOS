import { mock } from 'mockjs'
import {
  builder,
  getBody,
  getFormDataParameters,
  getQueryParameters,
} from '@/plugins/mock/util'
import { Status } from '@/utils/magic-numbers'

const startSamba = (options: any) => {
  return builder(
    [
      {
        filename: '我的图片',
        create_time: '2022-09-16 10:21:33',
        last_access_time: '2022-09-16 10:21:33',
        last_write_time: '2022-09-16 10:21:33',
        file_size: '114514',
        is_dir: false,
      },
    ],
    'success',
    Status.OK
  )
}

const enterAbs = (options: any) => {
  return builder(
    [
      {
        filename: 'dog.png',
        create_time: '2022-09-16 10:21:33',
        last_access_time: '2022-09-16 10:21:33',
        last_write_time: '2022-09-16 10:21:33',
        file_size: '114514',
        is_dir: false,
      },
    ],
    'success',
    Status.OK
  )
}

const enter = (options: any) => {
  return builder('data:image/jpeg;base64,AAA', 'success', Status.OK)
}

mock(/\/samb\/start/, 'post', startSamba)
mock(/\/samb\/enter_abs/, 'post', enterAbs)
mock(/\/samb\/enter\/dog.png/, 'post', enter)
