<!-- 桌面图标组件 -->
<template>
  <div id="instance-grid-wrapper" ref="grid">
    <div v-for="col in slicedRegistry.length" :key="col" class="column">
      <div
        v-for="(instance, index) in slicedRegistry[col - 1]"
        :key="index"
        :class="{
          instance: true,
        }"
        draggable="true"
        @click="
          onInstanceClicked(instance, col, index)
          activateInstance(col, index)
        "
      >
        <div
          :class="{
            inner: true,
            active:
              activePosition.col === col && activePosition.index === index,
          }"
        >
          <img
            class="instance-icon"
            :alt="instance.name"
            :src="instance.icon"
            draggable="false"
          />
          <div class="instance-name" draggable="false">{{ instance.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'InstanceGrid',
  data() {
    return {
      activePosition: { col: null, index: null },
      amountInColumn: 6,
    }
  },
  computed: {
    ...mapState({
      slicedRegistry: (state) => state.desktop.slicedRegistry,
    }),
  },
  created() {
    this.getSlicedRegistry()
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.grid.addEventListener('click', (evt) => {
        const path = evt.path || (evt.composedPath && evt.composedPath())
        let flag = false
        path.forEach((p) => {
          if (p.classList && p.classList.contains('instance')) {
            flag = true
          }
        })
        if (!flag) {
          this.activePosition = { col: null, index: null }
        }
      })
    })
  },
  methods: {
    getSlicedRegistry() {
      this.$store.dispatch('desktop/GetSlicedRegistry', this.amountInColumn)
    },
    activateInstance(col, index) {
      this.activePosition.col = col
      this.activePosition.index = index
    },
    onInstanceClicked(instance, col, index) {
      if (instance.component === null) return
      let existInstance = null
      // 遍历pending，如果有相同的，就激活它
      if (instance.singleton) {
        $nuxt.$store.state.dock.pending.forEach((app) => {
          if (app.name === instance.name) {
            existInstance = app
          }
        })
      }
      if (existInstance !== null) {
        if (!existInstance.isActive) {
          $nuxt.$store.commit('dock/TOGGLE_MINIMIZE', existInstance.uid)
        }
        return
      }
      // 生成uid
      $nuxt.$store.dispatch('dock/GetNewUid').then((res) => {
        const pendingObj = {
          uid: res,
          icon: instance.icon,
          name: instance.name,
          isActive: true,
        }
        // extend一个要打开的组件
        const VueComponent = Vue.extend(instance.component.default)
        const wrapper = document.createElement('div')
        document.getElementById('desktop-wrapper').appendChild(wrapper)
        const newInstance = new VueComponent({
          el: wrapper,
          propsData: {
            uid: pendingObj.uid,
            meta: instance.meta,
          },
        })
        // 在pending表中添加打开的组件
        $nuxt.$store.commit('dock/NEW_PENDING', pendingObj)
      })
      // 关闭所有可关闭的小组件(__closable__)
      // const closable = document.querySelector('.__closable__')
      // closable !== null && closable.remove()
    },
  },
})
</script>

<style lang="less" scoped>
@import 'InstanceGrid';
</style>
