export const state = () => ({
  wallpaper: '',
  dialogIdentifier: 0,
  isTodoListActive: false,
  isMessageCenterActive: false,
  isMonitorActive: false,
  monitorWS: null,
  messageCenterWS: null,
})

export const getters = {
  wallpaper: (state: any) => state.wallpaper,
  dialogIdentifier: (state: any) => state.dialogIdentifier,
  isTodoListActive: (state: any) => state.isTodoListActive,
  isMessageCenterActive: (state: any) => state.isMessageCenterActive,
  isMonitorActive: (state: any) => state.isMonitorActive,
  monitorWS: (state: any) => state.monitorWS,
  messageCenterWS: (state: any) => state.messageCenterWS,
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
    if (!state.isMonitorActive && state.monitorWS) {
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
}

export const actions = {
  GetNewDialogIdentifier({ commit }: any) {
    return commit('SET_DIALOG_IDENTIFIER')
  },
}
