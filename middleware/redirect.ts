export default function ({
  isHMR,
  app,
  store,
  route,
  params,
  error,
  redirect,
}: {
  isHMR: any
  app: any
  store: any
  route: any
  params: any
  error: any
  redirect: any
}) {
  if (isHMR) return
  if (route.fullPath === '/') return redirect('/desktop')
  if (route.fullPath === '/auth' || route.fullPath === '/auth/') {
    return redirect('/auth/login')
  }
}
