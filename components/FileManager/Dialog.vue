<template>
  <div>
    <DialogBody
      :uid="uid"
      class="dialog-file-manager"
      @destroyResource="handleDestroyResource()"
    >
      <template #title>
        <span>ๆ็ๆไปถ</span>
      </template>
      <template #side>
        <div class="file-catalog">
          <div
            :class="{
              'item-parent': true,
              item: true,
              'active-item-parent':
                activeIndex >= 0 && activeIndex <= rootDir.length - 1,
            }"
            @click="toggleCategoryShow(0)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="svg-icon fill"
              viewBox="0 0 32 32"
            >
              <path
                d="M5.333 22.293v6.151h21.333v-6.151l-5.736-2.738h-9.862l-5.736 2.738zM4.568 20.689l5.736-2.738c0.224-0.109 0.487-0.173 0.766-0.173 0 0 0 0 0 0h9.862c0.265 0 0.527 0.059 0.766 0.173l5.736 2.738c0.603 0.293 1.012 0.901 1.012 1.604v0 6.151c0 0.982-0.796 1.778-1.778 1.778h-21.333c-0.982 0-1.778-0.796-1.778-1.778v-6.151c0-0.703 0.409-1.312 1.001-1.6l0.011-0.005zM16 14.222c2.945 0 5.333-2.388 5.333-5.333s-2.388-5.333-5.333-5.333-5.333 2.388-5.333 5.333 2.388 5.333 5.333 5.333zM16 16c-3.927 0-7.111-3.184-7.111-7.111s3.184-7.111 7.111-7.111 7.111 3.184 7.111 7.111-3.184 7.111-7.111 7.111zM18.667 23.111h3.556c0.491 0 0.889 0.398 0.889 0.889s-0.398 0.889-0.889 0.889h-3.556c-0.491 0-0.889-0.398-0.889-0.889s0.398-0.889 0.889-0.889z"
              ></path>
            </svg>
            <span>{{ defaultTopParent }}</span>
            <svg
              t="1664882277620"
              class="icon-list"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2476"
              :style="getIsShow(0) ? 'transform: rotate(180deg);' : ''"
            >
              <path
                d="M890.335385 330.911222c-12.576374-12.416396-32.800753-12.352748-45.248112 0.192662L517.248327 661.951458 184.831931 332.512727c-12.576374-12.447359-32.800753-12.352748-45.280796 0.192662-12.447359 12.576374-12.352748 32.831716 0.192662 45.280796l353.311652 350.112082c0.543583 0.543583 1.247144 0.672598 1.792447 1.183497 0.127295 0.127295 0.159978 0.287273 0.287273 0.416288 6.239161 6.175514 14.399785 9.280473 22.527725 9.280473 8.224271 0 16.479505-3.168606 22.720387-9.471415l350.112082-353.311652C902.975407 363.615643 902.880796 343.360301 890.335385 330.911222z"
              ></path>
            </svg>
          </div>
          <div v-show="getIsShow(0)" class="children-wrapper">
            <div
              v-for="(dir, index) in rootDir"
              :key="index"
              :class="{
                'item-child': true,
                item: true,
                'active-item-child': activeIndex === `${index}`,
              }"
              @click="setActive(`${index}`)"
            >
              <span>{{ dir.filename }}</span>
            </div>
          </div>
        </div>
      </template>
      <template #body>
        <div v-if="fileInfoModalVisible" class="mask">
          <div class="file-info-modal">
            <div class="title">
              <span>ๆไปถ่ฏฆๆ</span>
              <div
                class="modal-close-btn"
                @click="fileInfoModalVisible = false"
              >
                <img alt="close" src="@/assets/svg/close.svg" />
              </div>
            </div>
            <div class="main-wrapper">
              <div class="main">
                <div class="row">
                  <div class="key"><span>ๅ็งฐ</span></div>
                  <div class="val">
                    <span>{{ fileInfoToShow.filename }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="key"><span>ๅๅปบๆถ้ด</span></div>
                  <div class="val">
                    <span>{{ fileInfoToShow.create_time }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="key"><span>ๆ่ฟ่ฎฟ้ฎ</span></div>
                  <div class="val">
                    <span>{{ fileInfoToShow.last_access_time }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="key"><span>ๆ่ฟๅๅฅ</span></div>
                  <div class="val">
                    <span>{{ fileInfoToShow.last_write_time }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="key"><span>ๅคงๅฐ</span></div>
                  <div class="val">
                    <span>{{ fileInfoToShow.file_size }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="key"><span>็ฑปๅ</span></div>
                  <div class="val">
                    <span>{{ fileInfoToShow.is_dir ? 'ๆไปถๅคน' : 'ๆไปถ' }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="key"><span>ๅช่ฏป</span></div>
                  <div class="val">
                    <span>{{ fileInfoToShow.read_only ? 'ๆฏ' : 'ๅฆ' }}</span>
                  </div>
                </div>
                <div class="row">
                  <button
                    class="confirm-btn"
                    @click="fileInfoModalVisible = false"
                  >
                    ๅฅฝ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="openedImg !== ''" id="file-opener">
          <img :src="openedImg" alt="opened-image" />
        </div>
        <div class="main-area-wrapper">
          <div class="operation-bar">
            <div class="tool-group">
              <!-- ๅ้ -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="styles__StyledSVGIconPathComponent-sc-16fsqc8-0 gtbmXY svg-icon-path-icon fill"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                :style="
                  isBackwardEnable() ? '' : 'cursor: not-allowed !important;'
                "
                @click="handleBackwardClicked()"
              >
                <defs data-reactroot=""></defs>
                <g>
                  <path
                    d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                    :fill="isBackwardEnable() ? '#3380f3' : '#6c6c6c'"
                  ></path>
                </g>
              </svg>
              <!-- ๅ่ฟ -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="styles__StyledSVGIconPathComponent-sc-16fsqc8-0 cOCwig svg-icon-path-icon fill"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                :style="
                  isForwardEnable() ? '' : 'cursor: not-allowed !important;'
                "
                @click="handleForwardClicked()"
              >
                <defs data-reactroot=""></defs>
                <g>
                  <path
                    d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                    :fill="isForwardEnable() ? '#3380f3' : '#6c6c6c'"
                  ></path>
                </g>
              </svg>
              <!-- ไธๆ -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="styles__StyledSVGIconPathComponent-sc-16fsqc8-0 gtbmXY svg-icon-path-icon fill"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <defs data-reactroot=""></defs>
                <g>
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                </g>
              </svg>
              <!-- ไธไธๅฑ -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="styles__StyledSVGIconPathComponent-sc-16fsqc8-0 gtbmXY svg-icon-path-icon fill"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                :style="isBackEnable() ? '' : 'cursor: not-allowed !important;'"
                @click="handleBackClicked()"
              >
                <defs data-reactroot=""></defs>
                <g>
                  <path
                    d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
                    :fill="isBackEnable() ? '#3380f3' : '#6c6c6c'"
                  ></path>
                </g>
              </svg>
            </div>
            <div class="breadcrumb">
              <span>{{ getBreadCrumb() }}</span>
            </div>
            <div class="renew" @click="refreshContent()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="styles__StyledSVGIconPathComponent-sc-16fsqc8-0 gtbmXY svg-icon-path-icon fill"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <defs data-reactroot=""></defs>
                <g>
                  <path
                    d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
                  ></path>
                </g>
              </svg>
            </div>
            <div class="search-wrapper">
              <a-input-search
                v-model="searchKeywords"
                :placeholder="'ๅจ ' + currentLoc + ' ไธญๆ็ดข'"
                size="default"
                @change="onSearch"
                @search="onSearch"
              />
            </div>
            <div>
              <a-button
                id="__fileDropdownBtn__"
                style="margin-top: 6px; margin-right: 8px"
                @click="toggleShowMoreOp()"
              >
                <span>ๆดๅคๆไฝ</span>
                <a-icon type="down" />
              </a-button>
            </div>
            <a-modal
              v-model="isShowCreateDirModal"
              title="ๆฐๅปบๆไปถๅคน"
              :z-index="9999999"
              ok-text="ๅฅฝ"
              cancel-text="ๅๆถ"
              @ok="handleCreateDir"
            >
              <p>่พๅฅๆฐๆไปถๅคน็ๅ็งฐ</p>
              <input
                v-model="newDirName"
                type="text"
                style="
                  padding: 0.3em 0.5em;
                  font-size: 0.9rem;
                  border: 2px solid #bbb;
                  border-radius: 8px;
                  outline: none;
                "
              />
            </a-modal>
            <a-modal
              v-model="isShowRenameModal"
              title="้ๅฝๅ"
              ok-text="ๅฅฝ"
              cancel-text="ๅๆถ"
              :z-index="9999999"
              @ok="handleFileRename"
            >
              <p>่พๅฅๆฐๅ็งฐ</p>
              <input
                v-model="newDirName"
                type="text"
                style="
                  padding: 0.3em 0.5em;
                  font-size: 0.9rem;
                  border: 2px solid #bbb;
                  border-radius: 8px;
                  outline: none;
                "
                autofocus
              />
            </a-modal>
            <a-modal
              v-model="isShowDeleteModal"
              title="็กฎ่ฎคๅ?้คๆไปถ"
              ok-text="็กฎ่ฎค"
              cancel-text="ๅๆถ"
              :z-index="9999999"
              @ok="handleFileDelete"
            >
              <p>ๅ?้คๆไปถๅๅฐๆ?ๆณๆขๅค๏ผๆฏๅฆ็ปง็ปญ๏ผ</p>
            </a-modal>
            <div
              v-show="$nuxt.$store.state.sys.showDropDown"
              id="__fileDropdown__"
              :class="{
                'select-box-wrapper': true,
                // 'select-box-transform': fileList.length !== 0,
              }"
              @blur="setShowDropDown(false)"
            >
              <div
                class="select-box-item"
                @click="
                  isShowCreateDirModal = true
                  setShowDropDown(false)
                "
              >
                <span>ๆฐๅปบๆไปถๅคน</span>
              </div>
              <div
                v-if="isAllowUpload"
                class="select-box-item"
                style="padding: 0.5em 0"
              >
                <a-upload
                  :file-list="fileList"
                  :remove="handleRemove"
                  :before-upload="beforeUpload"
                  style="max-width: 150px"
                  accept="*/*"
                  :multiple="true"
                  :show-upload-list="false"
                  action="http://120.78.235.195:5000/samb/upload"
                  :headers="setUploadHeaders()"
                  @change="handleUpload"
                >
                  <button
                    class="upload-select-btn"
                    @click="
                      $nuxt.$store.commit('sys/SET_IS_UPLOAD_TIPS_SHOW', true)
                      setShowDropDown(false)
                    "
                  >
                    ไธไผ?ๆไปถ
                  </button>
                </a-upload>
              </div>
              <div
                v-if="!isAllowUpload"
                class="select-box-item"
                style="padding: 0.5em 0"
              >
                <button
                  class="not-allow-upload-select-btn"
                  @click.prevent="handleNotAllowUpload"
                >
                  ไธไผ?ๆไปถ
                </button>
              </div>
              <div class="select-box-item" @click="deleteFiles()">
                <span>ๅ?้คๆไปถ</span>
              </div>
              <div class="select-box-item" @click="showFileInfo()">
                <span>ๆไปถ่ฏฆๆ</span>
              </div>
              <div class="select-box-item" @click="handleOpenRenameModal()">
                <span>้ๅฝๅ</span>
              </div>
              <div class="select-box-item" @click="handleFileDownload()">
                <span>ไธ่ฝฝๅฐๆฌๅฐ</span>
              </div>
            </div>
            <div class="tool-group-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="styles__StyledSVGIconPathComponent-sc-16fsqc8-0 gtbmXY svg-icon-path-icon fill"
                viewBox="0 0 32 32"
                width="18"
                height="18"
              >
                <defs data-reactroot=""></defs>
                <g>
                  <path
                    d="M6.222 8.889c-0.982 0-1.778-0.796-1.778-1.778s0.796-1.778 1.778-1.778c0.982 0 1.778 0.796 1.778 1.778s-0.796 1.778-1.778 1.778zM11.111 5.778h15.111c0.736 0 1.333 0.597 1.333 1.333s-0.597 1.333-1.333 1.333h-15.111c-0.736 0-1.333-0.597-1.333-1.333s0.597-1.333 1.333-1.333zM11.111 14.667h15.111c0.736 0 1.333 0.597 1.333 1.333s-0.597 1.333-1.333 1.333h-15.111c-0.736 0-1.333-0.597-1.333-1.333s0.597-1.333 1.333-1.333zM11.111 23.556h15.111c0.736 0 1.333 0.597 1.333 1.333s-0.597 1.333-1.333 1.333h-15.111c-0.736 0-1.333-0.597-1.333-1.333s0.597-1.333 1.333-1.333zM6.222 17.778c-0.982 0-1.778-0.796-1.778-1.778s0.796-1.778 1.778-1.778c0.982 0 1.778 0.796 1.778 1.778s-0.796 1.778-1.778 1.778zM6.222 26.667c-0.982 0-1.778-0.796-1.778-1.778s0.796-1.778 1.778-1.778c0.982 0 1.778 0.796 1.778 1.778s-0.796 1.778-1.778 1.778z"
                  ></path>
                </g>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="styles__StyledSVGIconPathComponent-sc-16fsqc8-0 gtbmXY svg-icon-path-icon fill"
                viewBox="0 0 24 24"
                width="16"
                height="16"
              >
                <defs data-reactroot=""></defs>
                <g>
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                </g>
              </svg>
            </div>
          </div>
          <div class="body">
            <a-table
              :custom-row="handleRowClicked"
              style="padding-bottom: 4em"
              :row-selection="{
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectChange,
              }"
              :columns="columns"
              :data-source="displayData"
              size="middle"
              :locale="{ emptyText: '่ฟไธชๆไปถๅคนๆฏ็ฉบ็ๅฆ๏ผ' }"
              @change="handleTableChange"
            >
              <a
                slot="filename"
                slot-scope="text, record"
                style="color: #3380f3"
                @click.prevent="handleFileClicked(text, record)"
                >{{ text }}</a
              >
            </a-table>
          </div>
        </div>
      </template>
    </DialogBody>
  </div>
</template>

<script>
import Vue from 'vue'
import { enterAbs, refresh, startService, stopService } from '@/api/samb'

import { Status } from '@/utils/magic-numbers'
import { prettyBytes } from '@/utils/pretty'
import Display from '~/components/FileManager/display'
import Preview from '~/components/FileManager/preview'
import FileBusiness from '~/components/FileManager/file-business'

const columns = [
  {
    title: 'ๅ็งฐ',
    dataIndex: 'filename',
    scopedSlots: { customRender: 'filename' },
    ellipsis: true,
    sorter: true,
  },
  {
    title: 'ๅๅปบๆฅๆ',
    dataIndex: 'create_time',
    ellipsis: true,
    sorter: true,
  },
  {
    title: 'ๆ่ฟ่ฎฟ้ฎ',
    dataIndex: 'last_access_time',
    ellipsis: true,
    sorter: true,
  },
  {
    title: 'ๆ่ฟๅๅฅ',
    dataIndex: 'last_write_time',
    ellipsis: true,
    sorter: true,
  },
  {
    title: 'ๅคงๅฐ',
    dataIndex: 'file_size',
    ellipsis: true,
    sorter: true,
    customRender: (text, record) => {
      // ๅฆๆๆฏๆไปถๅคน๏ผไธๆพ็คบๅคงๅฐ
      if (record.is_dir) return ''
      return prettyBytes(text)
    },
  },
  {
    title: '็ฑปๅ',
    dataIndex: 'is_dir',
    customRender: (text, record) => {
      return text === true ? 'ๆไปถๅคน' : 'ๆไปถ'
    },
    ellipsis: true,
    width: '100px',
    filters: [
      {
        text: 'ๆไปถๅคน',
        value: true,
      },
      {
        text: 'ๆไปถ',
        value: false,
      },
    ],
    onFilter: (value, record) => {
      return record.is_dir === value
    },
    sorter: (a, b) => a.is_dir,
  },
  {
    title: 'ๅช่ฏป',
    dataIndex: 'read_only',
    customRender: (text, record) => {
      return text === true ? 'ๆฏ' : 'ๅฆ'
    },
    ellipsis: true,
    width: '100px',
    sorter: (a, b) => a.read_only,
    filters: [
      {
        text: 'ๆฏ',
        value: true,
      },
      {
        text: 'ๅฆ',
        value: false,
      },
    ],
    onFilter: (value, record) => {
      return record.read_only === value
    },
  },
]

export default Vue.extend({
  name: 'FileManager',
  props: {
    uid: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isShowDeleteModal: false,
      isAllowUpload: false,
      fileInfoModalVisible: false,
      fileInfoToShow: {
        filename: '',
        file_size: 0,
        read_only: false,
        is_dir: false,
        create_time: '',
        last_access_time: '',
        last_write_time: '',
      },
      isShowRenameModal: false,
      isShowCreateDirModal: false,
      newDirName: '',
      fileList: [],
      imgData: '',
      title: '',
      activeIndex: 0,
      categoryShow: {
        0: true,
        1: false,
        2: false,
      },
      rootDir: [],
      currentLoc: '',
      columns,
      displayData: [],
      displayDataBackup: [],
      searchData: [],
      searchKeywords: '',
      selectedRowKeys: [],
      defaultTopParent: 'ๆ็ๆไปถ',
      breadcrumb: ['ๆ็ๆไปถ'],
      popBreadCrumb: [],
      openedImg: '',
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    },
  },
  watch: {
    breadcrumb(val) {
      this.isAllowUpload = val.at(val.length - 1) !== 'ๆ็ๆไปถ'
    },
  },
  created() {
    this.startSMB()
  },
  methods: {
    // ๅผๅฅๆนๆณ
    ...Preview,
    ...Display,
    ...FileBusiness,
    handleDestroyResource() {
      stopService().then(() => {
        this.$destroy()
      })
    },
    startSMB() {
      const vm = this
      this.currentLoc = this.defaultTopParent
      startService().then((res) => {
        $nuxt.$store.commit('sys/SET_IS_SAMBA_CONNECTED', true)
        vm.rootDir = res.data.data
        refresh()
          .then((res) => {
            if (res.data.code === Status.OK) {
              this.displayData = res.data.data
            }
          })
          .catch((err) => {
            this.$message.error(err)
          })
      })
    },
    stopSMB() {
      stopService()
    },
    // TODO: ไธดๆถ่งฃๅณๆนๆก(้ๅฐๆ?น็ฎๅฝ๏ผๅ็ซฏๆฒกๆ่ฟไธๆฅๅฃ)
    getIsShow(index) {
      return this.categoryShow[index]
    },
    setActive(active) {
      this.activeIndex = active
      this.onActiveChange(active)
      this.currentLoc = this.rootDir[active].filename
    },
    onActiveChange(active) {
      const vm = this
      this.selectedRowKeys = []
      enterAbs({ filepath: '/' + this.rootDir[active].filename }).then(
        (res) => {
          vm.displayData = res.data.data
          vm.breadcrumb = []
          vm.breadcrumb.push(vm.defaultTopParent)
          vm.breadcrumb.push(vm.rootDir[active].filename)
        }
      )
    },
  },
})
</script>

<style lang="less" scoped>
@import 'FileManager';
</style>
