import axios from 'axios'
import { xhrHost } from '~/config/api-host.config'

axios.defaults.withCredentials = true

export const axiosInstance = axios.create({
  baseURL: xhrHost,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': xhrHost,
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials,Set-Cookie',
    'Access-Control-Expose-Headers': 'Set-Cookie',
  },
})
