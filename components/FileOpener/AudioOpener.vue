<template>
  <DialogBody
    :uid="uid"
    style="
      top: 25% !important;
      left: 42% !important;
      width: auto !important;
      height: auto !important;
      max-width: 50% !important;
    "
  >
    <template #title>
      <span>{{ fileName }}</span>
    </template>
    <template #body>
      <audio :src="audio" controls autoplay preload="auto">
        {{ fileName }}
      </audio>
    </template>
  </DialogBody>
</template>

<script>
export default {
  name: 'AudioOpener',
  props: {
    uid: {
      type: Number,
      required: true,
    },
    audio: {
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

<style scoped></style>
