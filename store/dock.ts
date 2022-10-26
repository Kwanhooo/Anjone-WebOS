export const state = () => ({
  uid: 1000,
  registry: [
    {
      icon: require('@/assets/image/file-manager.png'),
      name: '我的文件',
      component: require('@/components/FileManager/Dialog.vue'),
    },
    {
      icon: require('@/assets/image/settings.png'),
      name: '系统设置',
      component: require('@/components/Settings/Dialog.vue'),
    },
    {
      icon: require('@/assets/image/help.png'),
      name: '使用帮助',
      component: require('@/components/Settings/Dialog.vue'),
      meta: {
        activeIndex: 5,
        categoryShow: {
          0: false,
          1: false,
          2: true,
        },
      },
    },
  ],
  extraRegistry: [
    {
      icon: require('@/assets/image/help.png'),
      name: '使用帮助',
      component: require('@/components/Settings/Dialog.vue'),
      meta: {
        activeIndex: 5,
        categoryShow: {
          0: false,
          1: false,
          2: true,
        },
      },
    },
  ],
  pending: [],
  pendingBeforeGotoDesktop: [],
  isOnGotoDesktop: false,
})

export const getters = {}

export const mutations = {
  NEW_PENDING(state: any, app: any) {
    state.isOnGotoDesktop = false
    state.pending.push(app)
  },
  REMOVE_PENDING(state: any, uid: any) {
    state.pending = state.pending.filter((app: any) => app.uid !== uid)
  },
  SET_MINIMIZE(state: any, uid: any) {
    state.isOnGotoDesktop = false
    state.pending.forEach((item: any) => {
      if (item.uid === uid) {
        item.isActive = false
      }
    })
  },
  TOGGLE_MINIMIZE(state: any, uid: any) {
    state.isOnGotoDesktop = false
    state.pending.forEach((item: any) => {
      if (item.uid === uid) {
        item.isActive = !item.isActive
      }
    })
  },
  SET_UID(state: any, uid: number) {
    state.uid = uid
  },
  GO_TO_DESKTOP(state: any) {
    const cloneDeep = require('lodash.clonedeep')
    state.isOnGotoDesktop = !state.isOnGotoDesktop
    if (state.isOnGotoDesktop) {
      state.pendingBeforeGotoDesktop = cloneDeep(state.pending)
      state.pending.forEach((item: any) => {
        item.isActive = false
      })
    } else {
      state.pending = cloneDeep(state.pendingBeforeGotoDesktop)
    }
  },
  CLEAR_PENDING(state: any) {
    state.pending = []
    state.pendingBeforeGotoDesktop = []
  },
  RESET_UID(state: any) {
    state.uid = 1000
  },
}

export const actions = {
  GetNewUid({ commit, rootState }: any) {
    commit('SET_UID', rootState.dock.uid + 1)
    return rootState.dock.uid
  },
  ClearUserState({ commit }: any) {
    commit('CLEAR_PENDING')
    commit('RESET_UID')
  },
}
