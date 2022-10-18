import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.2.146:8099',
  withCredentials: true,
})

/**
 * TODO:FOR TEST ONLY
 */
export function test() {
  return instance.get('/user/test')
}
