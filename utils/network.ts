// TODO:内网穿透部分还没确定，这里仅作简单处理
export function isLAN() {
  const href = window.location.href
  return (
    href.startsWith('http://192.168.1.') || href.startsWith('http://localhost')
  )
}
