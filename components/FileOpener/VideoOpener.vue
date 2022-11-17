<template>
  <DialogBody
    :uid="uid"
    style="
      top: 10% !important;
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
      <video controls autoplay preload="auto">
        <source :src="video" :type="videoType" />
      </video>
    </template>
  </DialogBody>
</template>

<script>
export default {
  name: 'VideoOpener',
  props: {
    uid: {
      type: Number,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    videoType: {
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
video {
  width: 100%;
  height: 100%;
}
</style>
