<template>
  <div
    id="task-manager-widget-wrapper"
    class="desktop-widget __closable__ glass-style"
  >
    <div class="op-bar">
      <div class="title-wrapper">任务中心</div>
      <div class="op-wrapper">
        <div class="op-item">
          <img
            alt="minimize"
            src="@/assets/svg/delete.svg"
            style="margin-top: 2px"
            @click="onClearClicked()"
          />
        </div>
        <div
          class="op-item"
          style="margin-top: 0.3em; margin-right: 0.5em"
          @click="onCloseClicked()"
        >
          <img alt="minimize" src="@/assets/svg/monitor-close.svg" />
        </div>
      </div>
    </div>
    <div class="main">
      <div v-if="$nuxt.$store.state.task.taskList.length === 0" class="hint">
        <span>暂无任务！</span>
      </div>
      <div
        v-for="(task, index) in $nuxt.$store.state.task.taskList"
        :key="index"
        class="task-item-wrapper"
      >
        <div class="title">
          <span
            :class="{
              type: true,
              success: task.status === 'success',
              warn: task.status === 'warning',
              error: task.status === 'exception',
              info: task.status === 'info',
            }"
          >
            {{ task.title }}
          </span>
          <span
            :class="{
              timeOrOperation: true,
              success: task.status === 'success',
              warn: task.status === 'warning',
              error: task.status === 'exception',
              info: task.status === 'info',
            }"
          >
            {{ task.timeOrOperation }}
          </span>
        </div>
        <hr
          v-if="task.status === 'success' || task.status === 'error'"
          style="height: 2px; background-color: #cecece; border: none"
        />
        <div class="content">
          <div
            v-if="task.status === 'info' || task.status === 'warning'"
            style="margin: 10px 0 5px"
          >
            <el-progress
              :percentage="formatProgress(task.loaded, task.total)"
              :status="task.status === 'info' ? null : task.status"
              :stroke-width="8"
              :show-text="false"
            />
          </div>
          <span>
            {{ task.description }}
          </span>
          <span style="float: right">
            {{ pretty(task.loaded) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { prettyBytes } from '@/utils/pretty.ts'

export default {
  name: 'TaskManagerWidget',
  data() {
    return {}
  },
  computed: {},
  mounted() {
    setTimeout(() => {
      document.getElementById('task-manager-widget-wrapper').style.opacity = '1'
    }, 150)
  },
  methods: {
    pretty(bytes) {
      return prettyBytes(bytes)
    },
    onClearClicked() {
      // TODO: clear tasks
      $nuxt.$store.commit('task/CLEAR_ALL_TASK')
    },
    onCloseClicked() {
      $nuxt.$store.commit('sys/SET_IS_TODOLIST_ACTIVE', false)
      const vm = this
      document.getElementById('task-manager-widget-wrapper').style.opacity = '0'
      setTimeout(() => {
        vm.opacityGoing = false
        document.getElementById('task-manager-widget-wrapper').remove()
      }, 150)
    },
    formatProgress(loaded, total) {
      return Math.round((loaded / total) * 100)
    },
  },
}
</script>

<style lang="less" scoped>
@import 'TaskManager';
</style>
