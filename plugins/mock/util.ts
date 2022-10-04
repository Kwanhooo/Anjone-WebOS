/**
 * 数据结构
 *  - 响应体
 * @author Kwanhooo
 * @type {{code: number, data: null, message: string, timestamp: number}}
 */
const responseBody = {
  message: '',
  timestamp: 0,
  data: null,
  code: 0,
}

/**
 * 响应体构造器
 * @author Kwanhooo
 * @param data
 * @param message
 * @param code
 * @param headers
 * @returns {{code: number, data: null, message: string, timestamp: number}}
 */
export const builder = (data: any, message: any, code = 0, headers = {}) => {
  responseBody.data = data
  if (message !== undefined && message !== null) {
    responseBody.message = message
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code
    // @ts-ignore
    responseBody._status = code
  }
  if (
    headers !== null &&
    typeof headers === 'object' &&
    Object.keys(headers).length > 0
  ) {
    // @ts-ignore
    responseBody._headers = headers
  }
  responseBody.timestamp = new Date().getTime()
  return responseBody
}

/**
 * ! 测试用
 * 获取axios发出的请求参数
 * @author Kwanhooo
 * @param options
 * @returns {{}|any}
 */
export const getQueryParameters = (options: any) => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

/**
 * ! 测试用
 * 获取FormData格式的请求参数
 * @author Kwanhooo
 * @param options
 * @returns {{}|any}
 */
export const getFormDataParameters = (options: any) => {
  const search = options.body
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

/**
 * ! 测试用
 * 获取axios发出的请求体
 * @author Kwanhooo
 * @param options
 * @returns {any}
 */
export const getBody = (options: any) => {
  return options.body && JSON.parse(options.body)
}
