<template>
  <DialogBody
    :uid="uid"
    class="dialog-settings"
    @destroyResource="handleDestroyResource()"
  >
    <template #title>
      <span>系统设置</span>
    </template>
    <template #side>
      <!-- 账户管理 -->
      <div class="settings-catalog">
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
          <span>账户管理</span>
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
          <div
            :class="{
              'item-child': true,
              item: true,
              'active-item-child': activeIndex === 1,
            }"
            @click="setActive(1)"
          >
            <span>账户分配</span>
          </div>
        </div>
      </div>
      <!-- 设备管理 -->
      <div class="settings-catalog">
        <div
          :class="{
            'item-parent': true,
            item: true,
            'active-item-parent': activeIndex >= 2 && activeIndex <= 4,
          }"
          @click="toggleCategoryShow(1)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="svg-icon fill"
            viewBox="0 0 32 32"
          >
            <path
              d="M2 6v10h28v-10h-28zM28 14h-24v-6h24v6zM2 28h28v-10h-28v10zM4 20h24v6h-24v-6z"
            ></path>
            <path
              d="M24 10h2v2h-2v-2zM20 10h2v2h-2v-2zM10 22h2v2h-2v-2zM6 22h2v2h-2v-2z"
            ></path>
          </svg>
          <span>设备管理</span>
          <svg
            t="1664882277620"
            class="icon-list"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2476"
            :style="getIsShow(1) ? 'transform: rotate(180deg);' : ''"
          >
            <path
              d="M890.335385 330.911222c-12.576374-12.416396-32.800753-12.352748-45.248112 0.192662L517.248327 661.951458 184.831931 332.512727c-12.576374-12.447359-32.800753-12.352748-45.280796 0.192662-12.447359 12.576374-12.352748 32.831716 0.192662 45.280796l353.311652 350.112082c0.543583 0.543583 1.247144 0.672598 1.792447 1.183497 0.127295 0.127295 0.159978 0.287273 0.287273 0.416288 6.239161 6.175514 14.399785 9.280473 22.527725 9.280473 8.224271 0 16.479505-3.168606 22.720387-9.471415l350.112082-353.311652C902.975407 363.615643 902.880796 343.360301 890.335385 330.911222z"
            ></path>
          </svg>
        </div>
        <div v-show="getIsShow(1)" class="children-wrapper">
          <div
            :class="{
              'item-child': true,
              item: true,
              'active-item-child': activeIndex === 2,
            }"
            @click="setActive(2)"
          >
            <span>设备信息</span>
          </div>
          <div
            :class="{
              'item-child': true,
              item: true,
              'active-item-child': activeIndex === 3,
            }"
            @click="setActive(3)"
          >
            <span>设备状态</span>
          </div>
          <div
            :class="{
              'item-child': true,
              item: true,
              'active-item-child': activeIndex === 4,
            }"
            @click="setActive(4)"
          >
            <span>设备日志</span>
          </div>
        </div>
      </div>
      <!-- 客户服务 -->
      <div class="settings-catalog">
        <div
          :class="{
            'item-parent': true,
            item: true,
            'active-item-parent': activeIndex >= 5 && activeIndex <= 6,
          }"
          @click="toggleCategoryShow(2)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="svg-icon fill"
            viewBox="0 0 32 32"
          >
            <path
              d="M11.003 12.422h1.774s0.533-2.839 3.195-2.839c3.017 0 3.017 2.661 3.017 2.839 0 0.533 0 1.419-1.952 2.837-1.419 1.244-2.128 2.841-1.952 4.615h1.746c-0.177-1.419 0.739-2.662 1.271-3.195 2.306-1.774 2.661-3.017 2.661-4.258 0.177-1.775-1.243-4.614-4.791-4.614-3.904 0-4.969 4.082-4.969 4.614zM16.859 23.070c0 0.588-0.477 1.065-1.065 1.065s-1.065-0.477-1.065-1.065c0-0.588 0.477-1.065 1.065-1.065s1.065 0.477 1.065 1.065zM16 28.8c7.069 0 12.8-5.731 12.8-12.8s-5.731-12.8-12.8-12.8-12.8 5.731-12.8 12.8 5.731 12.8 12.8 12.8zM16 30.667c-8.1 0-14.667-6.566-14.667-14.667s6.566-14.667 14.667-14.667 14.667 6.566 14.667 14.667-6.566 14.667-14.667 14.667z"
            ></path>
          </svg>
          <span>客户服务</span>
          <svg
            t="1664882277620"
            class="icon-list"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2476"
            :style="getIsShow(2) ? 'transform: rotate(180deg);' : ''"
          >
            <path
              d="M890.335385 330.911222c-12.576374-12.416396-32.800753-12.352748-45.248112 0.192662L517.248327 661.951458 184.831931 332.512727c-12.576374-12.447359-32.800753-12.352748-45.280796 0.192662-12.447359 12.576374-12.352748 32.831716 0.192662 45.280796l353.311652 350.112082c0.543583 0.543583 1.247144 0.672598 1.792447 1.183497 0.127295 0.127295 0.159978 0.287273 0.287273 0.416288 6.239161 6.175514 14.399785 9.280473 22.527725 9.280473 8.224271 0 16.479505-3.168606 22.720387-9.471415l350.112082-353.311652C902.975407 363.615643 902.880796 343.360301 890.335385 330.911222z"
            ></path>
          </svg>
        </div>
        <div v-show="getIsShow(2)" class="children-wrapper">
          <div
            :class="{
              'item-child': true,
              item: true,
              'active-item-child': activeIndex === 5,
            }"
            @click="setActive(5)"
          >
            <span>问题反馈</span>
          </div>
          <div
            :class="{
              'item-child': true,
              item: true,
              'active-item-child': activeIndex === 6,
            }"
            @click="setActive(6)"
          >
            <span>帮助文档</span>
          </div>
        </div>
      </div>
    </template>
    <template #body>
      <div
        v-if="activeIndex === 0"
        id="account-me-wrapper"
        style="width: 100%; height: 100%"
      >
        <LazySettingsAccountMe />
      </div>
      <div
        v-if="activeIndex === 1"
        id="account-allocation-wrapper"
        style="width: 100%; height: 100%"
      >
        <LazySettingsAccountAllocation />
      </div>
      <div
        v-if="activeIndex === 2"
        id="device-information-wrapper"
        style="width: 100%; height: 100%"
      >
        <SettingsDeviceInformation />
      </div>
      <div
        v-if="activeIndex === 3"
        id="device-status-wrapper"
        style="width: 100%; height: 100%"
      >
        <LazySettingsDeviceStatus />
      </div>
      <div
        v-if="activeIndex === 4"
        id="device-log-wrapper"
        style="width: 100%; height: 100%"
      >
        <LazySettingsDeviceLog />
      </div>
      <div
        v-if="activeIndex === 5"
        id="customer-feedback-wrapper"
        style="width: 100%; height: 100%"
      >
        <LazySettingsCustomerFeedback />
      </div>
      <div
        v-if="activeIndex === 6"
        id="customer-documentations-wrapper"
        style="width: 100%; height: 100%"
      >
        <LazySettingsCustomerDocumentations />
      </div>
    </template>
  </DialogBody>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'SettingsDialog',
  props: {
    uid: {
      type: Number,
      required: true,
    },
    meta: {
      type: Object,
      required: false,
      default: () => ({
        activeIndex: 0,
        categoryShow: {
          0: true,
          1: false,
          2: false,
        },
      }),
    },
  },
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
  beforeMount() {
    const cloneDeep = require('lodash.clonedeep')
    this.activeIndex = cloneDeep(this.meta.activeIndex)
    this.categoryShow = cloneDeep(this.meta.categoryShow)
  },
  methods: {
    handleDestroyResource() {
      setTimeout(() => {
        this.$destroy()
      }, 1000)
    },
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

.settings-catalog {
  font-size: @ITEM_FONT_SIZE;
  min-width: 12em;

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
</style>
