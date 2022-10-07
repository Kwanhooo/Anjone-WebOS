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
    if (state().username !== '') {
      return state().username
    } else {
      const sessionState = sessionStorage.getItem('USER_STATE')
      if (sessionState !== null) {
        const sessionStateObj = JSON.parse(sessionState)
        return sessionStateObj.username
      } else {
        return ''
      }
    }
  },
}

export const mutations = {
  SET_USERNAME(state: any, username: string) {
    state.username = username
    const sessionState = sessionStorage.getItem('USER_STATE')
    let sessionStateObj
    if (sessionState) {
      sessionStateObj = JSON.parse(sessionState)
    }
    sessionStateObj.username = username
    sessionStorage.setItem('USER_STATE', JSON.stringify(sessionStateObj))
  },
  SET_SNs(state: any, SN: Array<string>) {
    state.SNs = SN
    const sessionState = sessionStorage.getItem('USER_STATE')
    let sessionStateObj
    if (sessionState) {
      sessionStateObj = JSON.parse(sessionState)
    }
    sessionStateObj.SNs = SN
    sessionStorage.setItem('USER_STATE', JSON.stringify(sessionStateObj))
  },
  SET_INFO(state: any, info: object) {
    state.info = info
    const sessionState = sessionStorage.getItem('USER_STATE')
    let sessionStateObj
    if (sessionState) {
      sessionStateObj = JSON.parse(sessionState)
    }
    sessionStateObj.info = info
    sessionStorage.setItem('USER_STATE', JSON.stringify(sessionStateObj))
  },
  SET_PHONE(state: any, phone: string) {
    state.phone = phone
    const sessionState = sessionStorage.getItem('USER_STATE')
    let sessionStateObj
    if (sessionState) {
      sessionStateObj = JSON.parse(sessionState)
    }
    sessionStateObj.phone = phone
    sessionStorage.setItem('USER_STATE', JSON.stringify(sessionStateObj))
  },
}

export const actions = {
  async Login({ commit }: { commit: any }, identity: object) {
    const { data } = await login(identity)
    if (data.data.SNs.length <= 0) {
      sessionStorage.setItem('BIND_NEEDED', 'true')
    }
    sessionStorage.setItem('USER_STATE', JSON.stringify(data.data))
    commit('SET_INFO', data.data.info)
    commit('SET_USERNAME', data.data.username)
    commit('SET_SNs', data.data.SNs)
    return data
  },
  async Reg({ commit }: { commit: any }, regInfo: object) {
    const { data } = await reg(regInfo)
    sessionStorage.setItem('BIND_NEEDED', 'true')
    sessionStorage.setItem('SET_PWD_NEEDED', 'true')
    sessionStorage.setItem('USER_STATE', JSON.stringify(data.data))
    // @ts-ignore
    commit('SET_PHONE', regInfo.phone)
    commit('SET_USERNAME', 'Anjone用户')
    commit('SET_INFO', data.data.info)
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
