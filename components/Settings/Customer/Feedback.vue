<template>
  <div class="feedback-wrapper">
    <div class="row title">
      <div class="key"><span>问题描述</span></div>
      <div class="val">
        <input
          v-model="brief"
          type="text"
          placeholder="请简短描述问题类型或状态"
        />
      </div>
    </div>
    <div class="row content">
      <div class="key"><span>详细内容</span></div>
      <div class="val">
        <textarea
          v-model="detail"
          placeholder="请详细描述问题情况"
          draggable="false"
        ></textarea>
      </div>
    </div>
    <div class="row appendices">
      <div class="key">
        <span>添加附件</span>
      </div>
      <div class="val">
        <div class="hint">
          <span style="color: #3380f3"
            >可添加5个附件，附件内容可以是图片或文档</span
          >
        </div>
        <div class="uploader-wrapper">
          <input type="file" />
          <input type="file" />
          <input type="file" />
          <input type="file" />
          <input type="file" />
        </div>
      </div>
    </div>
    <div class="row submit">
      <button @click="handleSubmitFeedback()">确认提交</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Feedback',
  data() {
    return {
      brief: '',
      detail: '',
      fileList: [],
    }
  },
  methods: {
    handleSubmitFeedback() {},
  },
})
</script>

<style lang="less" scoped>
@import '@/assets/style/global';

.feedback-wrapper {
  //background-color: #019e48;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2em;
  overflow: auto;

  .row {
    height: 100px;
    width: 100%;
    //background-color: white;
    margin-bottom: 2em;

    display: flex;
    flex-direction: row;

    .key {
      flex: 1;
      max-width: 4em;
      min-width: 4em;
      margin-right: 3em;

      color: #4f4f4f;
    }

    .val {
      flex: 1;

      input[type='text'],
      textarea {
        width: 100%;
        border: 2px solid #bbb;
        border-radius: 8px;
        padding: 0.2em 0.5em;
        outline: none;
      }

      textarea {
        min-height: 100%;
        max-height: 100%;
      }
    }
  }

  .title {
    flex: 1;
  }

  .content {
    flex: 7;
  }

  .appendices {
    flex: 7;

    .hint {
      margin-bottom: 1.5em;
    }

    .uploader-wrapper {
      input[type='file'] {
        margin: 0.5em 0;
      }
    }
  }

  .submit {
    flex: 1.5;

    button {
      background: @STRONG_THEME_COLOR_LIGHT;
      margin-top: 0.5em;
      padding: 0.5em 1.2em;
      border: none;
      color: white;
      border-radius: 8px;
      transition: all ease-in-out 0.15s;
      cursor: pointer;
      pointer-events: auto;
      font-family: @GLOBAL_FONT_FAMILY;
      outline: none;
      font-weight: 500;

      &:hover {
        background: #4f98fd !important;
      }
    }
  }
}
</style>
