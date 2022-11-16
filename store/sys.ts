import { storage } from '~/api/system'
import { stopService } from '~/api/samb'
import { Status } from '~/utils/magic-numbers'

export const state = () => ({
  wallpaper: '',
  dialogIdentifier: 0,
  dialogZIndex: 999,
  isTodoListActive: false,
  isMessageCenterActive: false,
  isMonitorActive: false,
  monitorWS: null,
  messageCenterWS: null,
  storage: {
    free: 0,
    total: 0,
  },
  isSambaConnected: false,
  showDropDown: false,
  isUploadTipsShow: false,
})

export const getters = {
  wallpaper: (state: any) => state.wallpaper,
  dialogIdentifier: (state: any) => state.dialogIdentifier,
  isTodoListActive: (state: any) => state.isTodoListActive,
  isMessageCenterActive: (state: any) => state.isMessageCenterActive,
  isMonitorActive: (state: any) => state.isMonitorActive,
  monitorWS: (state: any) => state.monitorWS,
  messageCenterWS: (state: any) => state.messageCenterWS,
  storage: (state: any) => state.storage,
}

export const mutations = {
  SET_WALLPAPER(state: any, wallpaper: string) {
    state.wallpaper = wallpaper
  },
  SET_DIALOG_IDENTIFIER(state: any, dialogIdentifier: number) {
    state.dialogIdentifie++
    return state.dialogIdentifier
  },
  SET_IS_TODOLIST_ACTIVE(state: any, isTodoListActive: boolean) {
    state.isTodoListActive = isTodoListActive
  },
  SET_IS_MESSAGE_CENTER_ACTIVE(state: any, isMessageCenterActive: boolean) {
    state.isMessageCenterActive = isMessageCenterActive
    if (!state.isMessageCenterActive && state.messageCenterWS) {
      state.messageCenterWS.close()
      state.messageCenterWS = null
    }
  },
  SET_IS_MONITOR_ACTIVE(state: any, isMonitorActive: boolean) {
    state.isMonitorActive = isMonitorActive
    if (!state.isMonitorActive && state.monitorWS !== null) {
      state.monitorWS.close()
      state.monitorWS = null
    }
  },
  SET_MONITOR_WS(state: any, monitorWS: WebSocket) {
    state.monitorWS = monitorWS
  },
  SET_MESSAGE_CENTER_WS(state: any, messageCenterWS: WebSocket) {
    state.messageCenterWS = messageCenterWS
  },
  SET_STORAGE(state: any, free: number, total: number) {
    state.storage.free = free
    state.storage.total = total
  },
  SET_DIALOG_Z_INDEX(state: any) {
    state.dialogZIndex = state.dialogZIndex + 1
  },
  SET_IS_SAMBA_CONNECTED(state: any, value: boolean) {
    state.isSambaConnected = value
  },
  SET_SHOW_DROP_DOWN(state: any, value: boolean) {
    // console.log("vuex => " + value)
    state.showDropDown = value
  },
  SET_IS_UPLOAD_TIPS_SHOW(state: any, value: boolean) {
    state.isUploadTipsShow = value
  },
}

export const actions = {
  GetNewDialogIdentifier({ commit }: any) {
    return commit('SET_DIALOG_IDENTIFIER')
  },
  async GetStorageStatus({ commit, rootState }: any) {
    const { data } = await storage()
    if (data.code === Status.OK) {
      commit('SET_STORAGE', data.data.free, data.data.total)
    }
    return data
  },
  DestroySysResource({ commit, rootState }: any) {
    // 关闭samba连接
    if (rootState.sys.isSambaConnected) {
      stopService().then((res: any) => {
        commit('SET_IS_SAMBA_CONNECTED', false)
      })
    }
  },
}
