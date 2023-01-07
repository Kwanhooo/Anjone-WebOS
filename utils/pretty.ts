export function prettyBytes(byte: number) {
  if (byte < 1024) return `${byte} B`
  if (byte < 1024 * 1024) return `${(byte / 1024).toFixed(2)} KB`
  if (byte < 1024 * 1024 * 1024) return `${(byte / 1024 / 1024).toFixed(2)} MB`
  return `${(byte / 1024 / 1024 / 1024).toFixed(2)} GB`
}

export function getPrettyTimeStrOfNow() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minute =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const second =
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return (
    year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  )
}
