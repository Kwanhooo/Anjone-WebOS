<template>
  <div class="login-log-wrapper">
    <a-table :data-source="logData" bordered>
      <a-table-column
        key="id"
        title="序号"
        data-index="id"
        :width="70"
        :ellipsis="false"
      >
      </a-table-column>
      <a-table-column
        key="phone"
        title="手机号码"
        data-index="phone"
        :width="100"
        :ellipsis="false"
      >
      </a-table-column>
      <a-table-column
        key="dev"
        title="登录终端"
        data-index="dev"
        :width="130"
        :ellipsis="false"
      >
      </a-table-column>
      <a-table-column
        key="login_time"
        title="登录时间"
        data-index="login_time"
        :width="130"
        :ellipsis="false"
      >
      </a-table-column>
      <a-table-column
        key="ip_addr"
        title="IP地址"
        data-index="ip_addr"
        :width="130"
        :ellipsis="false"
      >
      </a-table-column>
      <a-table-column
        key="access_way"
        title="访问方式"
        data-index="access_way"
        :ellipsis="false"
        :width="100"
      >
      </a-table-column>
    </a-table>
  </div>
</template>

<script>
import Vue from 'vue'
import { loginLog } from '@/api/user'
import { Status } from '@/utils/magic-numbers'

export default Vue.extend({
  name: 'Log',
  data() {
    return {
      logData: [],
    }
  },
  beforeCreate() {
    const vm = this
    loginLog()
      .then((res) => {
        if (res.data.code === Status.OK) {
          const temp = res.data.data
          let id = 1
          temp.forEach((item) => {
            item.id = id
            id++
          })
          vm.logData = temp
        } else {
          vm.$message.error('获取登录日志失败，' + res.data.message)
        }
      })
      .catch(() => {
        vm.$message.error('获取登录日志失败，请检查网络连接！')
      })
  },
  methods: {},
})
</script>

<style lang="less">
.login-log-wrapper {
}
.ant-table-pagination.ant-pagination {
  float: none !important;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
