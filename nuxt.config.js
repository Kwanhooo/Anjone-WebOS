export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'anjone-webos',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css',
    '~/assets/font/source-han-sans-cn/source-han-sans-cn.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    // '@/plugins/mock',
    '@/plugins/guard',
    '@/plugins/echarts',
    '@/plugins/axios',
    '@/plugins/vue-dark-photo',
    '@/plugins/clipboard-vue',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // 解决动态引入的问题，相当于runtimeCompiler: true
    'nuxt-runtime-compiler',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: 'http://192.168.2.64:5000',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Anjone',
      short_name: '安居佑',
      description: '您的家庭数据中心',
      background_color: '#ffffff',
      theme_color: '#3380f3',
      lang: 'zh',
      start_url: '/',
    },
    icon: {
      source: 'logo.png',
      fileName: 'logo.png',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // extend (config, ctx) {
    //   if (ctx && ctx.isClient) {
    //     config.optimization.splitChunks.maxSize = 51200
    //   }
    // }
  },

  // 局域网访问
  server: {
    host: '0.0.0.0',
    port: 3000,
  },

  // 路由重定向规则附加
  router: {
    middleware: ['redirect'],
  },

  // 全局样式
  less: ['~/assets/style/global.less'],

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      },
    },
  },
}
