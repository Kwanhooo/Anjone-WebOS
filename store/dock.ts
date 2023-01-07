// 任务栏和开始菜单
export const state = () => ({
  isShowStart: false,
  uid: 1000,
  registry: [
    {
      icon: require('@/assets/app/file-manager.png'),
      name: '我的文件',
      component: require('@/components/FileManager/Dialog.vue'),
      singleton: true,
    },
    {
      icon: require('@/assets/app/video-center.png'),
      name: '影音中心',
      component: require('@/components/MoviesCenter/MoviesCenter.vue'),
      singleton: true,
    },
    {
      icon: require('@/assets/app/music-player.png'),
      name: '音乐播放',
      component: require('@/components/MusicCenter/MusicCenter.vue'),
      singleton: true,
    },
    {
      icon: require('@/assets/app/smart-gallery.png'),
      name: '智能相册',
      component: null,
      singleton: false,
    },
    {
      icon: require('@/assets/image/settings.png'),
      name: '系统设置',
      component: require('@/components/Settings/Dialog.vue'),
      singleton: true,
    },
    {
      icon: require('@/assets/app/app-store.png'),
      name: '应用中心',
      component: null,
      singleton: false,
    },
    {
      icon: require('@/assets/app/download-manager.png'),
      name: '下载管理',
      component: null,
      singleton: false,
    },
    {
      icon: require('@/assets/app/video-supervision.png'),
      name: '视频监控',
      component: null,
      singleton: false,
    },
    {
      icon: require('@/assets/app/smart-home.png'),
      name: '智能家居',
      component: null,
      singleton: false,
    },
    {
      icon: require('@/assets/app/sync-backup.png'),
      name: '同步备份',
      component: null,
      singleton: false,
    },
    {
      icon: require('@/assets/app/visual-intercom.png'),
      name: '可视对讲',
      component: null,
      singleton: false,
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
    {
      icon: require('@/assets/app/flash-transfer.png'),
      name: '闪电互传',
      component: null,
      singleton: false,
    },
    {
      icon: require('@/assets/app/shared-space.png'),
      name: '共享空间',
      component: null,
      singleton: false,
    },
  ],
  extraRegistry: [
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
  pending: [],
  pendingBeforeGotoDesktop: [],
  isOnGotoDesktop: false,
  activeAppUid: 0,
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
        if (!item.isActive) state.activeAppUid = uid
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
  SET_IS_SHOW_START(state: any, isShowStart: boolean) {
    state.isShowStart = isShowStart
  },
  SET_ACTIVE_APP_UID(state: any, uid: Number) {
    state.activeAppUid = uid
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
