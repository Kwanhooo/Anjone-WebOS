export function isLAN() {
  const href = window.location.href
  return (
    href.startsWith('http://192.168.1.') || href.startsWith('http://localhost')
  )
}
