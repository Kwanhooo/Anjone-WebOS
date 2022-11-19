export const state = () => ({
  registry: [
    {
      icon: require('@/assets/image/file-manager.png'),
      name: '我的文件',
      component: require('@/components/FileManager/Dialog.vue'),
      singleton: true,
    },
    {
      icon: require('@/assets/image/settings.png'),
      name: '系统设置',
      component: require('@/components/Settings/Dialog.vue'),
      singleton: true,
    },
    {
      icon: require('@/assets/image/help.png'),
      name: '使用帮助',
      // component: require('@/components/Settings/Dialog.vue'),
      component: null,
      singleton: false,
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
})

export const getters = {}

export const mutations = {
  NEW_PENDING(state: any, app: any) {
    state.isOnGotoDesktop = false
    state.pending.push(app)
  },
}

export const actions = {
  GetNewUid({ commit, rootState }: any) {
    commit('SET_UID', rootState.dock.uid + 1)
    return rootState.dock.uid
  },
}
