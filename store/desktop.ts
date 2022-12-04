/*
 * 桌面图标
 */
export const state = () => ({
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
      component: null,
      singleton: false,
    },
    {
      icon: require('@/assets/app/music-player.png'),
      name: '音乐播放',
      component: null,
      singleton: false,
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
  slicedRegistry: [],
})

export const getters = {}

export const mutations = {
  NEW_PENDING(state: any, app: any) {
    state.isOnGotoDesktop = false
    state.pending.push(app)
  },
  SET_SLICED_REGISTRY(state: any, slicedRegistry: any) {
    state.slicedRegistry = slicedRegistry
  },
}

export const actions = {
  GetNewUid({ commit, rootState }: any) {
    commit('SET_UID', rootState.dock.uid + 1)
    return rootState.dock.uid
  },
  GetSlicedRegistry({ commit, state }: any, amountInCol: number) {
    const columnsNum = Math.ceil(state.registry.length / amountInCol)
    const slicedRegistry = []
    for (let i = 0; i < columnsNum; i++) {
      slicedRegistry.push(
        state.registry.slice(i * amountInCol, (i + 1) * amountInCol)
      )
    }
    commit('SET_SLICED_REGISTRY', slicedRegistry)
  },
}
