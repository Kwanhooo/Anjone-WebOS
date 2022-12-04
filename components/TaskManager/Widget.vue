<template>
  <div id="task-manager-widget-wrapper" class="desktop-widget __closable__">
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
      <div v-if="tasks.length === 0" class="hint">
        <span>暂无任务！</span>
      </div>
      <div
        v-for="(task, index) in tasks"
        :key="index"
        class="task-item-wrapper"
      >
        <div class="title">
          <span
            :class="{
              type: true,
              success: task.type === 'Success',
              warn: task.type === 'Warn',
              error: task.type === 'Error',
            }"
          >
            {{ task.title }}
          </span>
          <span class="time">
            {{ task.create_time }}
          </span>
        </div>
        <hr style="height: 2px; background-color: #cecece; border: none" />
        <div class="content">
          <span>
            {{ task.content }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskManagerWidget',
  data() {
    return {
      tasks: [],
    }
  },
  mounted() {
    setTimeout(() => {
      document.getElementById('task-manager-widget-wrapper').style.opacity = '1'
    }, 150)
  },
  methods: {
    onClearClicked() {
      // TODO: clear tasks
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
  },
}
</script>

<style lang="less" scoped>
@import 'TaskManager';
</style>
