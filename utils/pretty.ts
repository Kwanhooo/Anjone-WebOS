export function prettyBytes(byte: number) {
  if (byte < 1024) return `${byte} B`
  if (byte < 1024 * 1024) return `${(byte / 1024).toFixed(2)} KB`
  if (byte < 1024 * 1024 * 1024) return `${(byte / 1024 / 1024).toFixed(2)} MB`
  return `${(byte / 1024 / 1024 / 1024).toFixed(2)} GB`
}
