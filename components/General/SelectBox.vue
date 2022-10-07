<template>
  <div class="select-box-wrapper">
    <div v-for="option in options" :key="option.id" class="select-box-item">
      <span>{{ option.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectBox',
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.select-box-wrapper {
  font-size: 14px;
  background: white;
  box-shadow: rgb(0 0 0 / 5%) 0px 9px 28px 8px, rgb(0 0 0 / 8%) 0px 6px 16px,
    rgb(0 0 0 / 12%) 0px 3px 6px -4px;

  .select-box-item {
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: #f5f5f5;
    }
  }
}
</style>
