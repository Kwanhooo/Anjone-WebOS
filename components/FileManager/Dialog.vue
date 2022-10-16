<template>
  <DialogBody class="dialog-file-manager">
    <template #title>
      <span>我的文件</span>
    </template>
    <template #side>
      <!-- 账户管理 -->
      <div class="file-catalog">
        <div
          :class="{
            'item-parent': true,
            item: true,
            'active-item-parent': activeIndex >= 0 && activeIndex <= 1,
          }"
          @click="toggleCategoryShow(0)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="svg-icon fill"
            viewBox="0 0 32 32"
          >
            <path
              d="M5.333 22.293v6.151h21.333v-6.151l-5.736-2.738h-9.862l-5.736 2.738zM4.568 20.689l5.736-2.738c0.224-0.109 0.487-0.173 0.766-0.173 0 0 0 0 0 0h9.862c0.265 0 0.527 0.059 0.766 0.173l5.736 2.738c0.603 0.293 1.012 0.901 1.012 1.604v0 6.151c0 0.982-0.796 1.778-1.778 1.778h-21.333c-0.982 0-1.778-0.796-1.778-1.778v-6.151c0-0.703 0.409-1.312 1.001-1.6l0.011-0.005zM16 14.222c2.945 0 5.333-2.388 5.333-5.333s-2.388-5.333-5.333-5.333-5.333 2.388-5.333 5.333 2.388 5.333 5.333 5.333zM16 16c-3.927 0-7.111-3.184-7.111-7.111s3.184-7.111 7.111-7.111 7.111 3.184 7.111 7.111-3.184 7.111-7.111 7.111zM18.667 23.111h3.556c0.491 0 0.889 0.398 0.889 0.889s-0.398 0.889-0.889 0.889h-3.556c-0.491 0-0.889-0.398-0.889-0.889s0.398-0.889 0.889-0.889z"
            ></path>
          </svg>
          <span>我的文件</span>
          <svg
            t="1664882277620"
            class="icon-list"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2476"
            :style="getIsShow(0) ? 'transform: rotate(180deg);' : ''"
          >
            <path
              d="M890.335385 330.911222c-12.576374-12.416396-32.800753-12.352748-45.248112 0.192662L517.248327 661.951458 184.831931 332.512727c-12.576374-12.447359-32.800753-12.352748-45.280796 0.192662-12.447359 12.576374-12.352748 32.831716 0.192662 45.280796l353.311652 350.112082c0.543583 0.543583 1.247144 0.672598 1.792447 1.183497 0.127295 0.127295 0.159978 0.287273 0.287273 0.416288 6.239161 6.175514 14.399785 9.280473 22.527725 9.280473 8.224271 0 16.479505-3.168606 22.720387-9.471415l350.112082-353.311652C902.975407 363.615643 902.880796 343.360301 890.335385 330.911222z"
            ></path>
          </svg>
        </div>
        <div v-show="getIsShow(0)" class="children-wrapper">
          <div
            :class="{
              'item-child': true,
              item: true,
              'active-item-child': activeIndex === 0,
            }"
            @click="setActive(0)"
          >
            <span>我的账户</span>
          </div>
        </div>
      </div>
    </template>
    <template #body>
      <div class="main-area-wrapper">
        <div class="operation-bar">
          <div></div>
        </div>
        <div class="body"></div>
      </div>
    </template>
  </DialogBody>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'FileManager',
  data() {
    return {
      activeIndex: 0,
      categoryShow: {
        0: true,
        1: false,
        2: false,
      },
    }
  },
  mounted() {},
  methods: {
    toggleCategoryShow(index) {
      this.categoryShow[index] = !this.categoryShow[index]
    },
    getIsShow(index) {
      return this.categoryShow[index]
    },
    setActive(active) {
      this.activeIndex = active
    },
  },
}
</script>

<style lang="less" scoped>
@import '@/assets/style/global';

@CONTENT_PADDING: 0.5em 0 0.5em 3.5em;
@INACTIVE_BACKGROUND: #f7f7f7;
@ACTIVE_BACKGROUND: #e8e8e8;
@TAB_FONT_COLOR: #415058;
@ITEM_FONT_SIZE: 0.8rem;

.file-catalog {
  font-size: @ITEM_FONT_SIZE;

  .item {
    padding: @CONTENT_PADDING;
    cursor: pointer;
    pointer-events: auto;
    color: @TAB_FONT_COLOR;
  }

  .item-parent {
    display: flex;
    align-items: center;
    padding-left: 1.9em !important;

    svg {
      margin-right: 0.5em;
      fill: @TAB_FONT_COLOR;
      width: @ITEM_FONT_SIZE;
      height: @ITEM_FONT_SIZE;
    }

    svg.icon-list {
      flex: 1;
      max-width: @ITEM_FONT_SIZE;
      min-width: @ITEM_FONT_SIZE;
      margin: 0 1em 0 auto;
    }
  }

  .active-item-parent {
    color: @STRONG_THEME_COLOR_LIGHT !important;

    svg {
      fill: @STRONG_THEME_COLOR_LIGHT !important;
    }
  }

  .children-wrapper {
    .item-child {
      background: @INACTIVE_BACKGROUND;
    }

    .active-item-child {
      background: @ACTIVE_BACKGROUND !important;
      color: @STRONG_THEME_COLOR_LIGHT !important;
      border-right: #3380f3 solid 3px;
    }
  }
}

.main-area-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .operation-bar {
    height: 2.3em;
  }

  .body {
    flex: 1;
  }
}
</style>
