/**
 * 验证手机号是否合法
 * @param phone 待验证手机号
 */
export function isValidPhone(phone: string) {
  return /^1[3-9]\d{9}$/.test(phone)
}
