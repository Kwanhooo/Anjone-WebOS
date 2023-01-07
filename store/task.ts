export const state = () => ({
  taskList: [
    // {
    //   uid: 'v-1',
    //   status: 'info',
    //   title: '文件正在上传',
    //   timeOrOperation: '暂停',
    //   description: 'logo.png',
    //   loaded: '10000',
    //   total: '312132',
    // }
  ],
})

export const getters = {}

export const mutations = {
  APPEND_TASK: (state: any, task: object) => {
    state.taskList.push(task)
  },
  CLEAR_ALL_TASK: (state: any) => {
    state.taskList = []
  },
  // @ts-ignore
  UPDATE_TASK(state: any, infos: object) {
    // console.log('UPDATE_TASK', infos)
    // 从taskList中根据uid找到对应的task
    // @ts-ignore
    const task = state.taskList.find((task: any) => task.uid === infos.uid)
    // 更新这个task的total和loaded
    // @ts-ignore
    task.total = infos.total
    // @ts-ignore
    task.loaded = infos.loaded
  },
  FINISH_TASK(state: any, uid: string) {
    // 从taskList中根据uid找到对应的task
    const task = state.taskList.find((task: any) => task.uid === uid)
    // 更新这个task的total和loaded
    task.status = 'success'
    // 获取当前时间
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    task.timeOrOperation =
      year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  },
}
export const actions = {
  async GetAllDeviceInfo({
    commit,
    rootState,
  }: {
    commit: any
    rootState: any
  }) {},
}
