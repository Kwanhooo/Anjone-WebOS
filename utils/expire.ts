import { tokenMaxLife } from '@/config/security.config'

export function getNewExpireTime() {
  return new Date().getTime() + tokenMaxLife
}
