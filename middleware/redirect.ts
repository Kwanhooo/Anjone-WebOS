import { NuxtApp } from '@nuxt/types/app'

export default function ({
  isHMR,
  app,
  store,
  route,
  params,
  error,
  redirect,
}: {
  isHMR: boolean
  app: NuxtApp
  store: any
  route: { fullPath: string }
  params: Object
  error: Error
  redirect: Function
}) {
  if (isHMR) return
  if (route.fullPath === '/') return redirect('/desktop')
  if (route.fullPath === '/auth' || route.fullPath === '/auth/') {
    return redirect('/auth/login')
  }
}
