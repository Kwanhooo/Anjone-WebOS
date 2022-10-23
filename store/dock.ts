export const state = () => ({
  registry: [
    {
      icon: require('@/assets/image/file-manager.png'),
      name: '我的文件',
      component: require('@/components/FileManager/Dialog.vue'),
    },
    {
      icon: require('@/assets/image/file-manager.png'),
      name: '我的文件',
      component: require('@/components/FileManager/Dialog.vue'),
    },
  ],
  pending: [
    {
      icon: require('@/assets/image/file-manager.png'),
      isActive: true,
    },
  ],
})

export const getters = {}

export const mutations = {}

export const actions = {}
