import { mock } from 'mockjs'
import {
  builder,
  getBody,
  getFormDataParameters,
  getQueryParameters,
} from '@/plugins/mock/util'
import { Status } from '@/utils/magic-numbers'

const getNotice = (options: any) => {
  return builder(
    [
      {
        title: '\u670D\u52A1\u5347\u7EA7\u5B8C\u6210',
        create_time: '2022-09-16 10:21:33',
        content:
          '\u670D\u52A1\u65B0\u7248\u672CV1.0,\u5347\u7EA7\u5B8C\u6210\n',
        type: 'Upgrade',
      },
      {
        title: '\u670D\u52A1\u5347\u7EA7\u5B8C\u6210',
        create_time: '2022-09-16 10:21:33',
        content:
          '\u670D\u52A1\u65B0\u7248\u672CV1.0,\u5347\u7EA7\u5B8C\u6210\n',
        type: 'Upgrade',
      },
    ],
    'success',
    Status.OK
  )
}

mock(/\/notice\/get_notice/, 'get', getNotice)
