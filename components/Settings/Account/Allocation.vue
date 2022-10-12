<template>
  <a-table :columns="columns" :data-source="data" @change="handleChange">
  </a-table>
</template>

<script>
const data = [
  {
    id: '1',
    username: 'John Appleseed',
    phone: 18888888888,
    create_time: '2022-09-22 12:00:00',
    status: '正常',
    operation: '禁用 | 注销',
  },
  {
    id: '2',
    username: 'Kenn',
    phone: 17777777777,
    create_time: '2021-09-12 12:00:00',
    status: '禁用',
    operation: '禁用 | 注销',
  },
  {
    id: '3',
    username: 'aa',
    phone: 17772323777,
    create_time: '2021-01-12 12:00:00',
    status: '正常',
    operation: '禁用 | 注销',
  },
]

export default {
  name: 'Allocation',
  data() {
    return {
      data,
      filteredInfo: null,
      sortedInfo: null,
    }
  },
  computed: {
    columns() {
      let { sortedInfo, filteredInfo } = this
      sortedInfo = sortedInfo || {}
      filteredInfo = filteredInfo || {}

      const columns = [
        {
          title: '序号',
          dataIndex: 'id',
          key: 'id',
          sorter: (a, b) => Number(a.id) - Number(b.id),
          sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
          ellipsis: false,
        },
        {
          title: '帐号昵称',
          dataIndex: 'username',
          key: 'username',
          sorter: (a, b) => a.username.length - b.username.length,
          sortOrder: sortedInfo.columnKey === 'username' && sortedInfo.order,
        },
        {
          title: '手机号码',
          dataIndex: 'phone',
          key: 'phone',
          ellipsis: true,
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          key: 'create_time',
          filters: [
            { text: '2021年', value: '2021' },
            { text: '2022年', value: '2022' },
          ],
          filteredValue: filteredInfo.create_time || null,
          onFilter: (value, record) => record.create_time.includes(value),
          sorter: (a, b) => a.create_time.length - b.create_time.length,
          sortOrder: sortedInfo.columnKey === 'create_time' && sortedInfo.order,
          ellipsis: true,
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          filters: [
            { text: '未激活', value: '未激活' },
            { text: '正常', value: '正常' },
            { text: '禁用', value: '禁用' },
          ],
          filteredValue: filteredInfo.status || null,
          onFilter: (value, record) => record.status.includes(value),
          sorter: (a, b) => a.status === b.status,
          sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
          ellipsis: true,
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          ellipsis: true,
        },
      ]
      return columns
    },
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
    setAgeSort() {
      this.sortedInfo = {
        order: 'descend',
        columnKey: 'age',
      }
    },
  },
}
</script>

<style scoped></style>
