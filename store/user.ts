import { login, reg, bind, captcha } from '~/api/user'
import { getNewExpireTime } from '~/utils/expire'

export const state = () => ({
  token: '',
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
}

export const actions = {
  async Login({ commit }: { commit: any }, identity: object) {
    const { data } = await login(identity)
    commit('SET_USERNAME', data.data.username)
    commit('SET_SNs', data.data.SNs)
    commit('SET_TOKEN', data.data.token)
    commit('SET_INFO', data.data.info)
    return data
  },
  async Reg({ commit }: { commit: any }, regInfo: object) {
    const { data } = await reg(regInfo)
    return data
  },
  async Bind({ commit }: { commit: any }, SN: object) {
    const { data } = await bind(SN)
    commit('SET_SNs', data.data.SNs)
    return data
  },
  async GetCaptcha({ commit }: { commit: any }, phone: object) {
    await captcha(phone)
  },
}
