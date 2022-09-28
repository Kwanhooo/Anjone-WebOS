import { whiteList } from '~/config/security.config'

const defaultRoutePath = '/'
const loginRoutePath = '/auth'

export default function ({ app }: { app: any }) {
  app.router.beforeEach((to: any, from: any, next: any) => {
    // 检查token
    const token = sessionStorage.getItem('ACCESS_TOKEN')
    // 拥有token
    if (token) {
      // 判断是否去往登录页面
      if (to.path.includes(loginRoutePath)) {
        // 是则跳转到默认页面，因为已经登录
        next({ path: defaultRoutePath })
      } else {
        next()
      }
    } else {
      // 如果没有token
      // 判断是否在免授权列表中
      // eslint-disable-next-line no-lonely-if
      if (whiteList.includes(to.path)) {
        // 是则放行
        next()
      } else {
        // 否则跳转认证
        next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      }
    }
  })
}
