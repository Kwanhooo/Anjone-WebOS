<template>
  <div :class="{ 'header-wrapper': true, 'active-header-wrapper': isActive }">
    <div class="dialog-title">
      <slot name="title"></slot>
    </div>
    <div class="dialog-op">
      <div class="dialog-op-item" @click="onMinimizeClicked()">
        <!--        <img alt="minimize" src="@/assets/svg/minimize.svg"/>-->
        <svg
          t="1664802932009"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="10066"
          width="16"
          height="16"
        >
          <path d="M128 448h768v128H128z" p-id="10067"></path>
        </svg>
      </div>
      <div class="dialog-op-item" @click="onFullscreenClicked()">
        <!--        <img alt="fullscreen" src="@/assets/svg/fullscreen.svg"/>-->
        <svg
          t="1664802667589"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6950"
          width="16"
          height="16"
        >
          <path
            d="M204.8 819.2v-204.8H102.4v204.8c0 56.32 46.08 102.4 102.4 102.4h204.8v-102.4H204.8zM819.2 102.4h-204.8v102.4h204.8v204.8h102.4V204.8c0-56.32-46.08-102.4-102.4-102.4zM204.8 204.8h204.8V102.4H204.8c-56.32 0-102.4 46.08-102.4 102.4v204.8h102.4V204.8zM819.2 819.2h-204.8v102.4h204.8c56.32 0 102.4-46.08 102.4-102.4v-204.8h-102.4v204.8z"
            p-id="6951"
          ></path>
        </svg>
      </div>
      <div class="dialog-op-item" @click="onCloseClicked()">
        <!--        <img alt="close" src="@/assets/svg/close.svg"/>-->
        <svg
          t="1664802876062"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="9020"
          width="16"
          height="16"
        >
          <path
            d="M242.858667 183.04L512 452.266667l269.141333-269.141334a42.325333 42.325333 0 0 1 59.733334 59.818667L571.904 512l269.141333 269.141333a42.325333 42.325333 0 0 1-59.818666 59.733334L512 571.904 242.858667 840.96a42.325333 42.325333 0 0 1-59.733334-59.818667L452.096 512 183.04 242.858667a42.325333 42.325333 0 0 1 59.818667-59.733334z"
            p-id="9021"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  // eslint-disable-next-line
  name: 'Header',
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
  },
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

.active-header-wrapper {
  background: @STRONG_THEME_COLOR_LIGHT !important;
  color: white !important;

  svg {
    fill: white !important;
  }
}

.header-wrapper {
  top: 0;
  left: 0;
  width: 100%;
  height: 2em;
  background: @HEADER_COLOR_LIGHT;
  display: flex;
  justify-content: space-between;

  svg {
    fill: #6c6c6c;
  }

  .dialog-title {
    position: relative;
    left: @DISTANCE_TO_BORDER;
    padding-top: 0.25em;
    font-size: 1em;
    max-width: calc(100% - 10em);
    overflow: hidden;
    text-overflow: ellipsis;
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
