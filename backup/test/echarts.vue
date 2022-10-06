<template>
  <div id="echarts">
    <div id="myChart"></div>
  </div>
</template>
<script type="text/javascript">
import * as echarts from 'echarts'

export default {
  name: 'Echarts',
  mounted() {},
}
</script>
<style scoped lang="less">
#myChart {
  width: 300px;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
  float: left;
}
</style>
