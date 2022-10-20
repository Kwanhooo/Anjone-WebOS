<template>
  <DialogBody>
    <template #title>
      <span>{{ fileName }}</span>
    </template>
    <template #body>
      <audio v-audio="vm" :src="audio" controls>{{ fileName }}</audio>
    </template>
  </DialogBody>
</template>

<script>
export default {
  name: 'AudioOpener',
  directives: {
    audio: {
      inserted(el, binding) {},
      bind(el, binding) {
        const vm = binding.value
        document.onreadystatechange = () => {
          if (document.readyState === 'complete') {
            el.parentNode.parentNode.parentNode.style.width =
              el.offsetWidth + 'px'
            el.parentNode.parentNode.parentNode.style.height =
              el.offsetHeight + 'px'
          }
        }
      },
    },
  },
  props: {
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
