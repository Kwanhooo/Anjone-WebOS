<template>
  <DialogBody v-show="isLoadFinish" :uid="uid">
    <template #title>
      <span>{{ fileName }}</span>
    </template>
    <template #body>
      <img v-image="vm" :src="image" alt="opened" class="image" />
    </template>
  </DialogBody>
</template>

<script>
export default {
  name: 'ImageOpener',
  directives: {
    image: {
      inserted(el, binding) {},
      bind(el, binding) {
        el.onload = (e) => {
          binding.value.isLoadFinish = true
          // 获得图片的原始宽度和高度
          const originWidth = el.naturalWidth
          const originHeight = el.naturalHeight
          const scale = 0.3
          el.parentNode.parentNode.parentNode.style.width =
            (window.innerWidth * scale).toFixed(0).toString() + 'px'
          el.parentNode.parentNode.parentNode.style.height = 'auto'
          el.parentNode.parentNode.parentNode.style.left =
            (window.innerWidth - (window.innerWidth * scale).toFixed(0)) / 2 +
            'px'
          el.parentNode.parentNode.parentNode.style.top =
            (window.innerHeight -
              100 -
              Number(el.parentNode.parentNode.parentNode.style.height)) /
              2 +
            'px'
        }
      },
    },
  },
  props: {
    uid: {
      type: Number,
      required: true,
    },
    image: {
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
      isLoadFinish: false,
    }
  },
}
</script>

<style lang="less" scoped>
.image {
  width: 100%;
  height: 100%;
}
</style>
