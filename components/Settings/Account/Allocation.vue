<template>
  <div class="allocation-wrapper">
    <div v-if="addUserModalVisible" class="mask">
      <div class="add-user-modal">
        <div class="title">
          <span>添加用户</span>
          <div class="modal-close-btn" @click="addUserModalVisible = false">
            <img alt="close" src="@/assets/svg/close.svg" />
          </div>
        </div>
        <div class="main">
          <div class="row">
            <div class="key"><span>账户昵称</span></div>
            <div class="val"><input v-model="newUsername" type="text" /></div>
          </div>
          <div class="row">
            <div class="key"><span>注册手机</span></div>
            <div class="val"><input v-model="newPhone" type="text" /></div>
          </div>
          <div class="row">
            <div class="key"><span>初始密码</span></div>
            <div class="val"><input v-model="newPassword" type="text" /></div>
          </div>
          <div class="row">
            <button class="copy-info-btn" @click="handleCopyClicked()">
              复制信息
            </button>
            <button class="confirm-btn" @click="handleConfirmAddClicked()">
              确认添加
            </button>
          </div>
        </div>
      </div>
    </div>
    <button class="add-user" @click="addUserModalVisible = true">
      添加用户
    </button>
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
              style="width: 2px; background-color: #3380f3"
            />
            <span class="op-cancellation">注销</span>
            <span>{{ record }}</span>
          </span>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Allocation',
  data() {
    return {
      addUserModalVisible: false,
      newUsername: '',
      newPhone: '',
      newPassword: '',
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
    handleCopyClicked() {
      const copyData =
        'Anjone新用户已创建，用户昵称：' +
        this.newUsername +
        '，手机号：' +
        this.newPhone +
        '，临时密码：' +
        this.newPassword
      this.$copyText(copyData).then(() => {
        this.$message.success('已将新用户信息复制到剪贴板！')
      })
    },
    handleConfirmAddClicked() {
      // TODO: API接入
      this.$message.success('已成功创建用户：' + this.newUsername)
      this.addUserModalVisible = false
      this.newUsername = ''
      this.newPhone = ''
      this.newPassword = ''
      // TODO:更新用户列表
    },
  },
})
</script>

<style lang="less">
@import '@/assets/style/global';

.allocation-wrapper {
  width: 100%;
  height: 100%;

  .mask {
    background-color: rgba(#9d9d9d, 50%);
    z-index: 999;
    position: absolute;
    width: calc(100% - 10.8em);
    height: 100%;

    .add-user-modal {
      width: 50%;
      height: 50%;
      position: absolute;
      top: 20%;
      left: 25%;
      background-color: white;

      display: flex;
      flex-direction: column;

      .title {
        min-height: 3em;
        max-height: 3em;
        background-color: #ebebeb;
        color: #6b6b6b;
        font-weight: 600;
        display: flex;
        justify-content: center;
        justify-items: center;
        align-content: center;
        align-items: center;
        margin-bottom: 0.5em;
      }

      .modal-close-btn {
        width: 1.5em;
        height: 1.5em;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        transition: all ease-in-out 0.15s;
        position: absolute;
        right: 1em;

        &:hover {
          background: #a4a4a4;
        }
      }

      .main {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;

        .row {
          display: flex;
          flex-direction: row;
          margin-top: 1.5em;

          .key {
            margin-right: 3em;
            padding: 0.2em 0;
          }

          .val {
            input {
              outline: none;
              border: 1px solid #bbbbbb;
              border-radius: 8px;
              padding: 0.2em 0.5em;
            }
          }

          .copy-info-btn {
            background: white;
            margin: 0.5em;
            padding: 0.5em 1.2em;
            border: 2px solid #3380f3;
            color: #3380f3;
            border-radius: 8px;
            transition: all ease-in-out 0.15s;
            cursor: pointer;
            pointer-events: auto;
            font-family: @GLOBAL_FONT_FAMILY;
            outline: none;
            font-weight: 500;
            font-size: 0.8rem;

            &:hover {
              background: #4f98fd !important;
              color: white;
            }

            &:first-child {
              margin-right: 7em;
            }
          }

          .confirm-btn {
            background: @STRONG_THEME_COLOR_LIGHT;
            margin: 0.5em;
            padding: 0.5em 1.2em;
            border: none;
            color: white;
            border-radius: 8px;
            transition: all ease-in-out 0.15s;
            cursor: pointer;
            pointer-events: auto;
            font-family: @GLOBAL_FONT_FAMILY;
            outline: none;
            font-weight: 500;
            font-size: 0.8rem;

            &:hover {
              background: #4f98fd !important;
            }
          }
        }
      }
    }
  }
}

.add-user {
  background: @STRONG_THEME_COLOR_LIGHT;
  margin: 0.5em;
  padding: 0.5em 1.2em;
  border: none;
  color: white;
  border-radius: 8px;
  transition: all ease-in-out 0.15s;
  cursor: pointer;
  pointer-events: auto;
  font-family: @GLOBAL_FONT_FAMILY;
  outline: none;
  font-weight: 500;
  font-size: 0.8rem;

  &:hover {
    background: #4f98fd !important;
  }
}

td:not(.td-username) {
  text-align: center !important;
  height: auto;
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
