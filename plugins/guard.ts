import { whiteList } from '~/config/security.config'

const defaultRoutePath = '/'
const loginRoutePath = '/auth/login'
const bindRoutePath = '/auth/bind'
const setPwdRoutePath = '/auth/pwd'

export default function ({ app }: { app: any }) {
  app.router.beforeEach((to: any, from: any, next: any) => {
    // 检查是否登录
    const isLogin = sessionStorage.getItem('USER_STATE') !== null
    // 已经登录
    if (isLogin) {
      // 判断是否去往登录页面
      if (to.path.includes(loginRoutePath)) {
        // 是则跳转到默认页面，因为已经登录
        next({ path: defaultRoutePath })
      } else if (sessionStorage.getItem('SET_PWD_NEEDED') === 'true') {
        if (to.path.includes(setPwdRoutePath)) {
          next()
        } else {
          next({ path: setPwdRoutePath })
        }
      } else if (sessionStorage.getItem('BIND_NEEDED') === 'true') {
        if (to.path.includes(bindRoutePath)) {
          next()
        } else {
          next({ path: bindRoutePath })
        }
      } else if (
        to.path.includes(bindRoutePath) ||
        to.path.includes(setPwdRoutePath)
      ) {
        next({ path: defaultRoutePath })
      } else next()
    } else {
      // 如果没有登录
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
