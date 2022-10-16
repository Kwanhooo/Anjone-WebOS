import axios from 'axios'
import { xhrHost } from '~/config/api-host.config'

const instance = axios.create({
  baseURL: 'http://192.168.2.146:8099',
  withCredentials: true,
})

export function test() {
  return instance.get('/user/test')
}
