export const state = () => ({
  wallpaper: '',
  dialogIdentifier: 0,
})

export const mutations = {
  SET_WALLPAPER(state: any, wallpaper: string) {
    state.wallpaper = wallpaper
  },
  SET_DIALOG_IDENTIFIER(state: any, dialogIdentifier: number) {
    state.dialogIdentifie++
    return state.dialogIdentifier
  },
}

export const actions = {
  GetNewDialogIdentifier({ commit }: any) {
    return commit('SET_DIALOG_IDENTIFIER')
  },
}
