import axios from 'axios'
import { xhrHost } from '~/config/api-host.config'

axios.defaults.withCredentials = true

export const axiosInstance = axios.create({
  baseURL: xhrHost,
  withCredentials: true,
})

// request 监听器
axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('TOKEN')
  // 如果 token 存在
  // 让每个请求头携带自定义 token
  if (token) {
    // @ts-ignore
    config.headers.Authorization = token
  }
  return config
})
