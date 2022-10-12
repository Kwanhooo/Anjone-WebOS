import { login, reg, bind, captcha, setPassword, resetInfo } from '~/api/user'
import { getNewExpireTime } from '~/utils/expire'
import { Status } from '~/utils/magic-numbers'

export const state = () => ({
  username: '',
  phone: '',
  avatar: '',
  role: '',
  create_time: '',
  devs: [],
})

// export const getters = {
//   username: () => {
//     if (state().username !== '') {
//       return state().username
//     } else {
//       const sessionState = sessionStorage.getItem('USER_STATE')
//       if (sessionState !== null) {
//         const sessionStateObj = JSON.parse(sessionState)
//         return sessionStateObj.username
//       } else {
//         return ''
//       }
//     }
//   },
//   avatar: () => {
//     if (state().avatar !== '') {
//       return state().avatar
//     } else {
//       const sessionState = sessionStorage.getItem('USER_STATE')
//       if (sessionState !== null) {
//         const sessionStateObj = JSON.parse(sessionState)
//         return sessionStateObj.avatar
//       } else {
//         return ''
//       }
//     }
//   },
//   phone: () => {
//     if (state().phone !== '') {
//       return state().phone
//     } else {
//       const sessionState = sessionStorage.getItem('USER_STATE')
//       if (sessionState !== null) {
//         const sessionStateObj = JSON.parse(sessionState)
//         return sessionStateObj.phone
//       } else {
//         return ''
//       }
//     }
//   },
//   role: () => {
//     if (state().role !== '') {
//       return state().role
//     } else {
//       const sessionState = sessionStorage.getItem('USER_STATE')
//       if (sessionState !== null) {
//         const sessionStateObj = JSON.parse(sessionState)
//         return sessionStateObj.role
//       } else {
//         return ''
//       }
//     }
//   },
//   create_time: () => {
//     if (state().create_time !== '') {
//       return state().create_time
//     } else {
//       const sessionState = sessionStorage.getItem('USER_STATE')
//       if (sessionState !== null) {
//         const sessionStateObj = JSON.parse(sessionState)
//         return sessionStateObj.create_time
//       } else {
//         return ''
//       }
//     }
//   },
//   devs: () => {
//     if (state().devs.length !== 0) {
//       return state().devs
//     } else {
//       const sessionState = sessionStorage.getItem('USER_STATE')
//       if (sessionState !== null) {
//         const sessionStateObj = JSON.parse(sessionState)
//         return sessionStateObj.devs
//       } else {
//         return []
//       }
//     }
//   },
// }

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
  SET_DEVS(state: any, devs: Array<object>) {
    state.devs = devs
    const sessionState = sessionStorage.getItem('USER_STATE')
    let sessionStateObj
    if (sessionState) {
      sessionStateObj = JSON.parse(sessionState)
    }
    sessionStateObj.devs = devs
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
  SET_AVATAR(state: any, avatar: string) {
    state.avatar = avatar
    const sessionState = sessionStorage.getItem('USER_STATE')
    let sessionStateObj
    if (sessionState) {
      sessionStateObj = JSON.parse(sessionState)
    }
    sessionStateObj.avatar = avatar
    sessionStorage.setItem('USER_STATE', JSON.stringify(sessionStateObj))
  },
  SET_ROLE(state: any, role: string) {
    state.role = role
    const sessionState = sessionStorage.getItem('USER_STATE')
    let sessionStateObj
    if (sessionState) {
      sessionStateObj = JSON.parse(sessionState)
    }
    sessionStateObj.role = role
    sessionStorage.setItem('USER_STATE', JSON.stringify(sessionStateObj))
  },
  // eslint-disable-next-line camelcase
  SET_CREATE_TIME(state: any, create_time: string) {
    // eslint-disable-next-line camelcase
    state.create_time = create_time
    const sessionState = sessionStorage.getItem('USER_STATE')
    let sessionStateObj
    if (sessionState) {
      sessionStateObj = JSON.parse(sessionState)
    }
    // eslint-disable-next-line camelcase
    sessionStateObj.create_time = create_time
    sessionStorage.setItem('USER_STATE', JSON.stringify(sessionStateObj))
  },
}

export const actions = {
  async Login({ commit }: { commit: any }, identity: object) {
    const { data } = await login(identity)
    if (data.data.devs.length <= 0) {
      sessionStorage.setItem('BIND_NEEDED', 'true')
    }
    sessionStorage.setItem('USER_STATE', JSON.stringify(data.data))
    commit('SET_USERNAME', data.data.username)
    commit('SET_PHONE', data.data.phone)
    commit('SET_AVATAR', data.data.avatar)
    commit('SET_ROLE', data.data.role)
    commit('SET_CREATE_TIME', data.data.create_time)
    commit('SET_DEVS', data.data.devs)
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
  async ResetInfo(
    { commit, rootState }: { commit: any; rootState: any },
    info: { username: string; password: string; phone: string; code: string }
  ) {
    const summitInfo = {
      username: '',
      password: '',
      phone: '',
      code: '',
    }
    // 判断哪些字段更新了
    if (info.username !== '' && info.username !== rootState.user.username)
      summitInfo.username = info.username
    if (info.password !== '') summitInfo.password = info.password
    if (info.phone !== '' && info.phone !== rootState.user.phone)
      summitInfo.phone = info.phone
    if (info.code !== '') summitInfo.code = info.code
    const { data } = await resetInfo(summitInfo)
    if (data.code === Status.OK) {
      summitInfo.username !== '' && commit('SET_USERNAME', summitInfo.username)
      summitInfo.phone !== '' && commit('SET_PHONE', summitInfo.phone)
    }
    return data
  },
}
