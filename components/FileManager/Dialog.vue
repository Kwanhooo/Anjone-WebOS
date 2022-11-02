<template>
  <div>
    <VDPhoto
      v-if="imgData !== ''"
      ref="VDPhoto"
      :img-data="imgData"
      :title="title"
      @publish="publish"
    />
    <DialogBody
      :uid="uid"
      class="dialog-file-manager"
      @destroyResource="handleDestroyResource()"
    >
      <template #title>
        <span>我的文件</span>
      </template>
      <template #side>
        <div class="file-catalog">
          <div
            :class="{
              'item-parent': true,
              item: true,
              'active-item-parent': activeIndex >= 0 && activeIndex <= 1,
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
            <span>我的文件</span>
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
              <span>文件详情</span>
              <div
                class="modal-close-btn"
                @click="fileInfoModalVisible = false"
              >
                <img alt="close" src="@/assets/svg/close.svg" />
              </div>
            </div>
            <div class="main">
              <div class="row">
                <div class="key"><span>名称</span></div>
                <div class="val"><span>{{}}</span></div>
              </div>
              <div class="row">
                <div class="key"><span>修改日期</span></div>
                <div class="val"><span>{{}}</span></div>
              </div>
              <div class="row">
                <div class="key"><span>最近访问</span></div>
                <div class="val"><span>{{}}</span></div>
              </div>
              <div class="row">
                <div class="key"><span>最近写入</span></div>
                <div class="val"><span>{{}}</span></div>
              </div>
              <div class="row">
                <div class="key"><span>大小</span></div>
                <div class="val"><span>{{}}</span></div>
              </div>
              <div class="row">
                <div class="key"><span>类型</span></div>
                <div class="val"><span>{{}}</span></div>
              </div>
              <div class="row">
                <div class="key"><span>只读</span></div>
                <div class="val"><span>{{}}</span></div>
              </div>
              <div class="row">
                <button
                  class="confirm-btn"
                  @click="fileInfoModalVisible = false"
                >
                  好
                </button>
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
              <!-- 回退 -->
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
              <!-- 前进 -->
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
              <!-- 下拉 -->
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
              <!-- 上一层 -->
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
                :placeholder="'在 ' + currentLoc + ' 中搜索'"
                size="default"
                @search="onSearch"
              />
            </div>
            <div>
              <a-button
                style="margin-top: 6px; margin-right: 8px"
                @click="toggleShowMoreOp()"
              >
                <span>更多操作</span>
                <a-icon type="down" />
              </a-button>
            </div>
            <a-modal
              v-model="isShowCreateDirModal"
              title="新建文件夹"
              :z-index="9999999"
              ok-text="好"
              cancel-text="取消"
              @ok="handleCreateDir"
            >
              <p>输入新文件夹的名称</p>
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
              title="重命名"
              ok-text="好"
              cancel-text="取消"
              :z-index="9999999"
              @ok="handleFileRename"
            >
              <p>输入新名称</p>
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
            <div
              v-show="showDropDown"
              :class="{
                'select-box-wrapper': true,
                'select-box-transform': fileList.length !== 0,
              }"
              @blur="showDropDown = false"
            >
              <div
                class="select-box-item"
                @click="
                  isShowCreateDirModal = true
                  showDropDown = false
                "
              >
                <span>新建文件夹</span>
              </div>
              <div class="select-box-item" style="padding: 0.5em 0">
                <a-upload
                  :file-list="fileList"
                  :remove="handleRemove"
                  :before-upload="beforeUpload"
                  style="max-width: 150px"
                  accept="*/*"
                  :multiple="true"
                  :show-upload-list="false"
                  @change="showDropDown = false"
                >
                  <a-button class="upload-select-btn">上传文件</a-button>
                </a-upload>
              </div>
              <div class="select-box-item" @click="deleteFiles()">
                <span>删除文件</span>
              </div>
              <div class="select-box-item" @click="showFileInfo()">
                <span>文件详情</span>
              </div>
              <div class="select-box-item" @click="handleOpenRenameModal()">
                <span>重命名</span>
              </div>
              <div class="select-box-item">
                <span>文件分享</span>
              </div>
              <div class="select-box-item">
                <span>下载到本地</span>
              </div>
              <div class="select-box-item">
                <span>取消分享</span>
              </div>
            </div>
            <a-button
              v-if="fileList.length !== 0"
              style="margin-top: 6px; margin-right: 8px"
              @click="handleUpload()"
            >
              <span>确认上传</span>
            </a-button>
            <div class="tool-group">
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
              :row-selection="{
                selectedRowKeys: selectedRowKeys,
                onChange: onSelectChange,
              }"
              :columns="columns"
              :data-source="displayData"
              size="middle"
              :locale="{ emptyText: '这个文件夹是空的哦！' }"
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
import {
  back,
  checkFile,
  createDir,
  deleteFile,
  enter,
  enterAbs,
  fileInfo,
  refresh,
  rename,
  startService,
  stopService,
  sysAPI,
  uploadFile,
} from '@/api/samb'
import ImageOpener from '@/components/FileOpener/ImageOpener'
import AudioOpener from '@/components/FileOpener/AudioOpener'
import { Status } from '@/utils/magic-numbers'
import { xhrHost } from '@/config/api-host.config'
import VideoOpener from '@/components/FileOpener/VideoOpener'
import { resetAvatar } from '@/api/file'
import TextOpener from '~/components/FileOpener/TextOpener'

const columns = [
  {
    title: '名称',
    dataIndex: 'filename',
    scopedSlots: { customRender: 'filename' },
    ellipsis: true,
  },
  {
    title: '修改日期',
    dataIndex: 'create_time',
    ellipsis: false,
  },
  {
    title: '最近访问',
    dataIndex: 'last_access_time',
    ellipsis: false,
  },
  {
    title: '最近写入',
    dataIndex: 'last_write_time',
    ellipsis: false,
  },
  {
    title: '大小',
    dataIndex: 'file_size',
    ellipsis: true,
  },
  {
    title: '类型',
    dataIndex: 'is_dir',
    customRender: (text, record) => {
      return text === true ? '文件夹' : '文件'
    },
    ellipsis: true,
    width: '80px',
  },
  {
    title: '只读',
    dataIndex: 'read_only',
    customRender: (text, record) => {
      return text === true ? '是' : '否'
    },
    ellipsis: true,
    width: '60px',
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
      fileInfoModalVisible: false,
      fileInfoToShow: {},
      isShowRenameModal: false,
      isShowCreateDirModal: false,
      newDirName: '',
      showDropDown: false,
      fileList: [],
      imgData:
        'https://i.picsum.photos/id/132/300/200.jpg?hmac=2N8jz1dK3-iM_g-_Bl-cJdFysVCuyHtyJ7H0TmAxGVk',
      title: 'Ohayo',
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
      selectedRowKeys: [],
      defaultTopParent: '我的文件',
      breadcrumb: ['我的文件'],
      popBreadCrumb: [],
      openedImg: '',
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    },
  },
  created() {
    this.startSMB()
  },
  methods: {
    handleOpenRenameModal() {
      this.newDirName = this.displayData.at(this.selectedRowKeys[0]).filename
      this.isShowRenameModal = true
      this.showDropDown = false
    },
    isBackwardEnable() {
      return this.breadcrumb.length >= 2
    },
    isForwardEnable() {
      return this.popBreadCrumb.length >= 1
    },
    isBackEnable() {
      return this.breadcrumb.length >= 2
    },
    refreshContent() {
      refresh()
        .then((res) => {
          if (res.data.code === Status.OK) {
            this.displayData = res.data.data
            this.$message.success('已刷新文件列表')
          } else {
            this.$message.error('刷新失败')
          }
        })
        .catch((err) => {
          this.$message.error(err)
        })
    },
    getBreadCrumb() {
      let str = ''
      // 取this.breadcrumb的最后三个
      if (this.breadcrumb.length > 3) {
        str = '...'
        for (
          let i = this.breadcrumb.length - 3;
          i < this.breadcrumb.length;
          i++
        ) {
          str += this.breadcrumb[i] + '>'
        }
      } else {
        for (let i = 0; i < this.breadcrumb.length; i++) {
          str += this.breadcrumb[i] + '>'
        }
      }
      // this.breadcrumb.forEach((item) => {
      //   str += item + ' > '
      // })
      // return str.substring(0, str.length - 3)
      return str.substring(0, str.length - 1)
    },
    handleFileRename() {
      this.isShowRenameModal = false
      const oldName = this.displayData.at(this.selectedRowKeys[0]).filename
      const vm = this
      const parameter = { old_name: oldName, new_name: this.newDirName }
      rename(parameter)
        .then((res) => {
          if (res.data.code === Status.OK) {
            vm.displayData = res.data.data
            vm.$message.success('重命名成功！')
            vm.selectedRowKeys = []
          }
        })
        .catch((res) => {
          vm.$message.error('请求失败')
        })
    },
    handleCreateDir() {
      this.isShowCreateDirModal = false
      const vm = this
      const param = { dir_name: this.newDirName }
      createDir(param).then((res) => {
        if (res.data.code === Status.OK) {
          vm.displayData = res.data.data
        } else {
          this.$message.error('创建错误')
        }
      })
    },
    showFileInfo() {
      if (
        this.selectedRowKeys === undefined ||
        this.selectedRowKeys.length === 0
      )
        return
      const filename = this.displayData.at(this.selectedRowKeys[0]).filename
      fileInfo(filename).then((res) => {
        // console.log(res.data.data)
      })
    },
    deleteFiles() {
      this.showDropDown = false
      const vm = this
      if (this.hasSelected) {
        this.$confirm({
          title: '确认删除文件',
          content: '删除文件后将无法恢复，是否继续？',
          okText: '确认',
          cancelText: '取消',
          zIndex: 9999999,
          onOk: () => {
            let files = ''
            this.selectedRowKeys.forEach((item) => {
              files += this.displayData[item].filename + ','
            })
            // 删除最后一个逗号
            files = files.substring(0, files.length - 1)
            deleteFile({ filename: files })
              .then((res) => {
                if (res.data.code === Status.OK) {
                  vm.displayData = res.data.data
                  vm.$message.success('删除成功')
                } else {
                  vm.$message.error('删除失败')
                }
              })
              .catch(() => {
                vm.$message.error('删除失败，请检查网络连接')
              })
          },
        })
      } else {
        this.$message.info('无选中文件')
      }
    },
    toggleShowMoreOp() {
      this.showDropDown = !this.showDropDown
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    handleUpload() {
      const vm = this
      const { fileList } = this
      const fileFormData = new FormData()
      fileList.forEach((file) => {
        fileFormData.append('file', file)
      })
      this.uploading = true
      uploadFile(fileFormData)
        .then((res) => {
          if (res.data.code === Status.OK) {
            vm.fileList = []
            vm.uploading = false
            this.$message.success('文件上传成功！')
            vm.displayData = res.data.data
          } else {
            this.uploading = false
            this.$message.error('文件上传失败！')
          }
        })
        .catch(() => {
          this.uploading = false
          this.$message.error('文件上传失败，请检查网络后再试！')
        })
    },
    handleDestroyResource() {
      stopService().then(() => {
        this.$destroy()
      })
    },
    startSMB() {
      const vm = this
      this.currentLoc = this.defaultTopParent
      startService().then((res) => {
        vm.rootDir = res.data.data
      })
    },
    stopSMB() {
      stopService()
    },
    toggleCategoryShow(index) {
      if (index === 0) this.currentLoc = this.defaultTopParent
      this.categoryShow[index] = !this.categoryShow[index]
    },
    getIsShow(index) {
      return this.categoryShow[index]
    },
    setActive(active) {
      this.activeIndex = active
      this.onActiveChange(active)
      this.currentLoc = this.rootDir[active].filename
    },
    onSearch() {
      this.$message.info('搜索功能暂未开放')
    },
    onActiveChange(active) {
      const vm = this
      enterAbs({ filepath: '/' + this.rootDir[active].filename }).then(
        (res) => {
          vm.displayData = res.data.data
          vm.breadcrumb = []
          vm.breadcrumb.push(vm.rootDir[active].filename)
        }
      )
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleFileClicked(filename) {
      // handleFileClicked(filename, record) {
      // const isDir = record.is_dir
      const vm = this
      // 在enter之前发送检查请求
      checkFile(filename).then((res) => {
        if (res.data.code !== Status.NoFile) {
          const type = res.data.data
          // 打开文件
          const fileLink =
            xhrHost +
            sysAPI.Enter +
            '/' +
            `${filename}` +
            '?type=' +
            type +
            '&token=' +
            sessionStorage.getItem('TOKEN')
          if (type === 'dir') {
            enter(filename, type).then((res) => {
              vm.displayData = res.data.data
              vm.breadcrumb.push(filename)
            })
          } else if (type === 'image') {
            this.previewImage(fileLink, filename)
          } else if (type === 'video') {
            this.previewVideo(fileLink, filename)
          } else if (type === 'audio') {
            this.previewAudio(fileLink, filename)
          } else if (type === 'other') {
            this.previewText(fileLink, filename)
            this.$copyText(fileLink)
            this.$message.error('未知文件类型，文件链接已复制，请下载后浏览！')
          }
        } else {
          vm.$message.error('您访问的文件不存在！')
        }
      })
    },
    previewImage(image, fileName) {
      const ImageOpenerVueComponent = Vue.extend(ImageOpener)
      const imageOpenerWrapper = document.createElement('div')
      document.getElementById('desktop-wrapper').appendChild(imageOpenerWrapper)
      const comp = new ImageOpenerVueComponent({
        el: imageOpenerWrapper,
        propsData: {
          image,
          fileName,
        },
      })
    },
    previewAudio(audio, fileName) {
      const AudioOpenerVueComponent = Vue.extend(AudioOpener)
      const audioOpenerWrapper = document.createElement('div')
      document.getElementById('desktop-wrapper').appendChild(audioOpenerWrapper)
      const comp = new AudioOpenerVueComponent({
        el: audioOpenerWrapper,
        propsData: {
          audio,
          fileName,
        },
      })
    },
    previewVideo(video, fileName, videoType) {
      const VideoOpenerVueComponent = Vue.extend(VideoOpener)
      const videoOpenerWrapper = document.createElement('div')
      document.getElementById('desktop-wrapper').appendChild(videoOpenerWrapper)
      const comp = new VideoOpenerVueComponent({
        el: videoOpenerWrapper,
        propsData: {
          video,
          fileName,
          videoType,
        },
      })
    },
    previewText(text, fileName) {
      const TextOpenerVueComponent = Vue.extend(TextOpener)
      const textOpenerWrapper = document.createElement('div')
      document.getElementById('desktop-wrapper').appendChild(textOpenerWrapper)
      const comp = new TextOpenerVueComponent({
        el: textOpenerWrapper,
        propsData: {
          text,
          fileName,
        },
      })
    },
    publish() {
      this.$message.info('publish')
    },
    handleBackClicked() {
      if (!this.isBackEnable()) return
      const vm = this
      back().then((res) => {
        vm.displayData = res.data.data
        vm.breadcrumb.pop()
      })
    },
    handleBackwardClicked() {
      if (!this.isBackEnable()) return
      const vm = this
      back().then((res) => {
        vm.displayData = res.data.data
        const pop = vm.breadcrumb.pop()
        vm.popBreadCrumb.push(pop)
      })
    },
    handleForwardClicked() {
      if (!this.isForwardEnable()) return
      const vm = this
      this.handleFileClicked(vm.popBreadCrumb.pop())
    },
  },
})
</script>

<style lang="less" scoped>
@import '@/assets/style/global';

@CONTENT_PADDING: 0.5em 0 0.5em 3.5em;
@INACTIVE_BACKGROUND: #f7f7f7;
@ACTIVE_BACKGROUND: #e8e8e8;
@TAB_FONT_COLOR: #415058;
@ITEM_FONT_SIZE: 0.8rem;

.file-catalog {
  min-width: 12em;
  font-size: @ITEM_FONT_SIZE;

  .item {
    padding: @CONTENT_PADDING;
    cursor: pointer;
    pointer-events: auto;
    color: @TAB_FONT_COLOR;
  }

  .item-parent {
    display: flex;
    align-items: center;
    padding-left: 1.9em !important;

    svg {
      margin-right: 0.5em;
      fill: @TAB_FONT_COLOR;
      width: @ITEM_FONT_SIZE;
      height: @ITEM_FONT_SIZE;
    }

    svg.icon-list {
      flex: 1;
      max-width: @ITEM_FONT_SIZE;
      min-width: @ITEM_FONT_SIZE;
      margin: 0 1em 0 auto;
    }
  }

  .active-item-parent {
    color: @STRONG_THEME_COLOR_LIGHT !important;

    svg {
      fill: @STRONG_THEME_COLOR_LIGHT !important;
    }
  }

  .children-wrapper {
    .item-child {
      background: @INACTIVE_BACKGROUND;
    }

    .active-item-child {
      background: @ACTIVE_BACKGROUND !important;
      color: @STRONG_THEME_COLOR_LIGHT !important;
      border-right: #3380f3 solid 3px;
    }
  }
}

.main-area-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .operation-bar {
    height: 2.7em;
    //background-color: green;
    display: flex;
    flex-direction: row;
    padding: 0 1em;

    svg {
      fill: @STRONG_THEME_COLOR_LIGHT;
    }

    svg.active {
      fill: @STRONG_THEME_COLOR_LIGHT !important;
    }

    .tool-group {
      flex: 6;
      padding-top: 0.7em;

      svg {
        width: 1.4em !important;
        height: 1.4em !important;
        border-radius: 5px;
        transition: background-color ease-in-out 0.15s;
        pointer-events: auto;
        cursor: pointer;

        &:hover {
          background-color: #bbbbbb;
        }
      }

      &:last-child {
        flex: 3 !important;
      }
    }

    .breadcrumb {
      background-color: #ffffff;
      flex: 12;
      height: 1.9em;
      border-radius: 8px;
      color: #6c6c6c;
      margin-top: 0.4em;
      padding-left: 0.5em;
      padding-top: 0.18em;
    }

    .renew {
      flex: 0.8;
      padding-top: 0.8em;
      margin-left: 0.7em;

      svg {
        width: 1.4em !important;
        height: 1.4em !important;
        border-radius: 5px;
        transition: background-color ease-in-out 0.15s;
        pointer-events: auto;
        cursor: pointer;

        &:hover {
          background-color: #bbbbbb;
        }
      }
    }

    .search-wrapper {
      flex: 10;
      margin: 0.4em 0.8em;
    }

    .more-operation {
      flex: 5;
      background-color: #ffffff;
      border-radius: 8px;
      color: #6c6c6c;
      margin: 0.4em 0.8em 0.4em 0;
      height: 2em;
      box-shadow: none;
      border: none;
    }
  }

  .body {
    //background-color: purple;
    flex: 1;

    table {
      height: 100px !important;
    }
  }

  #file-opener {
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    background-color: white;
  }

  .select-box-wrapper {
    position: absolute;
    top: 40px;
    right: 8.9%;
    z-index: 9999;
    width: 105px;

    font-size: 14px;
    background: white;
    box-shadow: rgb(0 0 0 / 5%) 0px 9px 28px 8px, rgb(0 0 0 / 8%) 0px 6px 16px,
      rgb(0 0 0 / 12%) 0px 3px 6px -4px;

    .select-box-item {
      cursor: pointer;
      transition: all 0.3s;
      padding: 0.5em 1em;

      &:hover {
        background: #f5f5f5;
      }
    }
  }

  .select-box-transform {
    transform: translate(-6.1em, 0);
  }
}

.upload-select-btn {
  color: #595959;
  background: transparent;
  border: none;
  box-shadow: none;
  height: auto;
}

.mask {
  background-color: rgba(#9d9d9d, 50%);
  z-index: 999;
  position: absolute;
  width: calc(100% - 10.8em);
  height: 100%;

  .file-info-modal {
    width: 50%;
    height: 60%;
    position: absolute;
    top: 15%;
    left: 25%;
    background-color: white;
    z-index: 999;

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
        margin-top: 0.5em;

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
</style>
