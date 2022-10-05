<template>
  <div class="header-wrapper">
    <div class="dialog-title">
      <slot name="title"></slot>
    </div>
    <div class="dialog-op">
      <div class="dialog-op-item">
        <img
          alt="minimize"
          src="@/assets/svg/minimize.svg"
          @click="onMinimizeClicked()"
        />
      </div>
      <div class="dialog-op-item">
        <img
          alt="fullscreen"
          src="@/assets/svg/fullscreen.svg"
          @click="onFullscreenClicked()"
        />
      </div>
      <div class="dialog-op-item">
        <img
          alt="close"
          src="@/assets/svg/close.svg"
          @click="onCloseClicked()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  // eslint-disable-next-line
  name: 'Header',
  methods: {
    onCloseClicked() {
      this.$emit('close')
    },
    onFullscreenClicked() {
      this.$emit('fullscreen')
    },
    onMinimizeClicked() {
      this.$emit('minimize')
    },
  },
})
</script>

<style lang="less" scoped>
@import '@/assets/style/global';

@HEADER_COLOR_LIGHT: #cecece;
@DISTANCE_TO_BORDER: 1em;
@HOVER_COLOR: #a4a4a4;

.header-wrapper {
  top: 0;
  left: 0;
  width: 100%;
  height: 2em;
  background: @HEADER_COLOR_LIGHT;
  display: flex;
  justify-content: space-between;

  .dialog-title {
    position: relative;
    left: @DISTANCE_TO_BORDER;
    padding-top: 0.35em;
    font-size: 1em;
  }

  .dialog-op {
    position: relative;
    right: @DISTANCE_TO_BORDER;
    height: 100%;
    display: flex;
    flex-direction: row;

    .dialog-op-item {
      width: 1.5em;
      height: 1.5em;
      margin: 0.25em 0.2em;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      transition: all ease-in-out 0.1s;

      &:hover {
        background: @HOVER_COLOR;
      }
    }
  }
}
</style>
