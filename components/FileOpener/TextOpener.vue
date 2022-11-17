<template>
  <DialogBody
    :uid="uid"
    style="
      top: 25% !important;
      left: 25% !important;
      width: auto !important;
      height: auto !important;
      max-width: 50% !important;
    "
  >
    <template #title>
      <span>{{ fileName }}</span>
    </template>
    <template #body>
      <textarea :value="text"></textarea>
    </template>
  </DialogBody>
</template>

<script>
export default {
  name: 'TextOpener',
  props: {
    uid: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      vm: this,
    }
  },
}
</script>

<style lang="less" scoped>
textarea {
  width: 50vw;
  height: 40vh;
  outline: none;
  border: none;
}
</style>
