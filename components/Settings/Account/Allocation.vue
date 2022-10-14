<template>
  <a-table :data-source="data" bordered @change="handleChange">
    <a-table-column
      key="id"
      title="序号"
      data-index="id"
      :width="100"
      :ellipsis="false"
    >
    </a-table-column>
    <a-table-column
      key="username"
      title="帐号昵称"
      data-index="username"
      class-name="td-username"
      :width="150"
    >
    </a-table-column>
    <a-table-column
      key="phone"
      title="手机号码"
      data-index="phone"
      :ellipsis="false"
    >
    </a-table-column>
    <a-table-column
      key="create_time"
      title="创建时间"
      data-index="create_time"
      :width="180"
      :ellipsis="false"
    >
    </a-table-column>
    <a-table-column
      key="status"
      title="状态"
      data-index="status"
      :ellipsis="true"
    >
      <template slot-scope="text, record">
        <span
          :class="{
            ok: record.status === '正常',
            warn: record.status === '未激活',
            danger: record.status === '禁用',
          }"
          >{{ record.status }}</span
        >
      </template>
    </a-table-column>
    <a-table-column
      key="operation"
      title="操作"
      data-index="operation"
      :ellipsis="true"
    >
      <template slot-scope="record">
        <span>
          <span class="op-forbidden">禁用</span>
          <a-divider
            type="vertical"
            style="background-color: #3380f3; width: 2px"
          />
          <span class="op-cancellation">注销</span>
          <span>{{ record }}</span>
        </span>
      </template>
    </a-table-column>
  </a-table>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Allocation',
  data() {
    return {
      data: [
        {
          id: '1',
          username: 'John Appleseed',
          phone: 18888888888,
          create_time: '2022-09-22 12:00:00',
          status: '正常',
          operation: '',
        },
        {
          id: '2',
          username: 'Kenn',
          phone: 17777777777,
          create_time: '2021-09-12 12:00:00',
          status: '禁用',
          operation: '',
        },
        {
          id: '3',
          username: 'aa',
          phone: 17772323777,
          create_time: '2021-01-12 12:00:00',
          status: '未激活',
          operation: '',
        },
      ],
      filteredInfo: null,
      sortedInfo: null,
    }
  },
  mounted() {
    let { sortedInfo, filteredInfo } = this
    sortedInfo = sortedInfo || {}
    filteredInfo = filteredInfo || {}
  },
  methods: {
    handleChange(pagination, filters, sorter) {
      this.filteredInfo = filters
      this.sortedInfo = sorter
    },
    clearFilters() {
      this.filteredInfo = null
    },
    clearAll() {
      this.filteredInfo = null
      this.sortedInfo = null
    },
  },
})
</script>

<style lang="less">
@import '@/assets/style/global';

td:not(.td-username) {
  text-align: center !important;
}

th {
  text-align: center !important;

  background: #e6f7ff !important;
  color: @STRONG_THEME_COLOR_LIGHT !important;
}

tr {
  background-color: white !important;

  &:nth-child(2n) {
    background-color: #f2f2f2 !important;
  }
}

.ok {
  color: #019e48;
}

.warn {
  color: #e99d42;
}

.danger {
  color: #ff2525;
}

.op {
  cursor: pointer;
  pointer-events: auto;
  transition: all ease-in-out 0.15s;
}

.op-forbidden {
  .op;

  &:hover {
    .warn;
  }
}

.op-cancellation {
  .op;

  &:hover {
    .danger;
  }
}
</style>
