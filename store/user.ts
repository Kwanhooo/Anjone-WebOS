import { login, reg, bind, captcha, setPassword } from '~/api/user'
import { getNewExpireTime } from '~/utils/expire'
import { Status } from '~/utils/magic-numbers'

export const state = () => ({
  phone: '',
  username: '',
  SNs: [],
  info: {},
})

export const getters = {
  username: () => {
    return state().username
  },
}

export const mutations = {
  SET_TOKEN(state: any, token: string) {
    state.token = token
    sessionStorage.setItem('ACCESS_TOKEN', token)
  },
  SET_USERNAME(state: any, username: string) {
    state.username = username
  },
  SET_SNs(state: any, SN: Array<string>) {
    state.SNs = SN
  },
  SET_INFO(state: any, info: object) {
    state.info = info
  },
  SET_PHONE(state: any, phone: string) {
    state.phone = phone
  },
}

export const actions = {
  async Login({ commit }: { commit: any }, identity: object) {
    const { data } = await login(identity)
    commit('SET_USERNAME', data.data.username)
    commit('SET_SNs', data.data.SNs)
    if (data.data.SNs.length <= 0) {
      sessionStorage.setItem('BIND_NEEDED', 'true')
    }
    commit('SET_INFO', data.data.info)
    sessionStorage.setItem('USER_STATE', JSON.stringify(data.data))
    return data
  },
  async Reg({ commit }: { commit: any }, regInfo: object) {
    const { data } = await reg(regInfo)
    // @ts-ignore
    commit('SET_PHONE', regInfo.phone)
    commit('SET_USERNAME', 'Anjone用户')
    commit('SET_INFO', data.data.info)
    sessionStorage.setItem('USER_STATE', JSON.stringify(data.data))
    sessionStorage.setItem('BIND_NEEDED', 'true')
    sessionStorage.setItem('SET_PWD_NEEDED', 'true')
    return data
  },
  async Bind({ commit }: { commit: any }, SN: object) {
    const { data } = await bind(SN)
    if (data.code === Status.OK) {
      commit('SET_SNs', data.data.SNs)
      sessionStorage.removeItem('BIND_NEEDED')
    }
    return data
  },
  async SetPwd({ commit }: { commit: any }, password: object) {
    const { data } = await setPassword(password)
    if (data.code === Status.OK) {
      sessionStorage.removeItem('SET_PWD_NEEDED')
    }
    return data
  },
  async GetCaptcha({ commit }: { commit: any }, phone: object) {
    await captcha(phone)
  },
}
