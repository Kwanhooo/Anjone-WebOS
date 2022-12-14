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
  sysAPI,
  uploadFile,
} from '~/api/samb'
import { xhrHost } from '~/config/api-host.config'
import { Status } from '~/utils/magic-numbers'
import { getPrettyTimeStrOfNow } from '~/utils/pretty'

const FileBusiness = {
  handleNotAllowUpload() {
    this.$message.error('不能在根目录上传文件')
  },
  handleFileDownload() {
    this.setShowDropDown(false)
    if (this.selectedRowKeys.length === 0) {
      this.$message.info('请先选择要下载的文件')
      return
    }
    this.handleOneFileDownload(0)
  },
  handleOneFileDownload(item) {
    if (item >= this.selectedRowKeys.length) {
      this.selectedRowKeys = []
      this.$message.success('文件已全部下载完成！')
      return
    }
    const vm = this
    const filename = this.displayData[this.selectedRowKeys[item]].filename
    checkFile(filename).then((res) => {
      const type = res.data.data
      const link =
        xhrHost +
        sysAPI.Enter +
        '/' +
        `${filename}` +
        '?type=' +
        type +
        '&token=' +
        sessionStorage.getItem('TOKEN')
      const a = document.createElement('a')
      a.href = link
      a.download = filename
      a.click()
      setTimeout(() => {
        vm.handleOneFileDownload(item + 1)
      }, 1000)
    })
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
        vm.$message.success('文件夹 ' + this.newDirName + ' 已创建')
      } else {
        this.$message.error('创建错误')
      }
    })
  },
  showFileInfo() {
    this.setShowDropDown(false)
    const vm = this
    if (
      this.selectedRowKeys === undefined ||
      this.selectedRowKeys.length === 0
    ) {
      this.$message.error('请选择文件后再查看信息')
      return
    }
    const filename = this.displayData.at(this.selectedRowKeys[0]).filename
    fileInfo(filename)
      .then((res) => {
        vm.fileInfoToShow = res.data.data
        vm.fileInfoModalVisible = true
      })
      .catch((err) => {
        vm.$message.error(err)
      })
  },
  handleFileDelete() {
    this.isShowDeleteModal = false
    const vm = this
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
          vm.selectedRowKeys = []
        } else {
          vm.$message.error('删除失败')
        }
      })
      .catch(() => {
        vm.$message.error('删除失败，请检查网络连接')
      })
  },
  deleteFiles() {
    this.setShowDropDown(false)
    const vm = this
    if (this.hasSelected) {
      this.isShowDeleteModal = true
    } else {
      this.$message.info('无选中文件')
    }
  },
  handleRemove(file) {
    const index = this.fileList.indexOf(file)
    const newFileList = this.fileList.slice()
    newFileList.splice(index, 1)
    this.fileList = newFileList
  },
  beforeUpload(file) {
    if ($nuxt.$store.state.sys.isUploadTipsShow) {
      this.$message.info('文件上传中，请勿关闭页面')
      $nuxt.$store.commit('sys/SET_IS_UPLOAD_TIPS_SHOW', false)
    }
    this.fileList = [...this.fileList, file]
    // return false
  },
  setUploadHeaders() {
    return {
      Authorization: sessionStorage.getItem('TOKEN'),
    }
  },
  handleUpload(e) {
    // console.log('file', e.file)
    // console.log('event', e.event)

    if (e.file.status !== null && e.file.status === 'uploading') {
      // 现在开始上传
      const newTask = {
        uid: e.file.uid,
        status: 'info',
        title: '文件正在上传',
        timeOrOperation: '开始于 ' + getPrettyTimeStrOfNow(),
        description: e.file.name,
        loaded: 0,
        total: e.file.size,
      }
      // 新增任务
      $nuxt.$store.commit('task/APPEND_TASK', newTask)
    } else if (e.file.status !== null && e.file.status === 'done') {
      // 任务完结
      $nuxt.$store.commit('task/FINISH_TASK', e.file.uid)
      this.displayData = e.file.response.data
    } else if (e.file.percentage !== null) {
      // console.log('更新')
      // 更新进度
      $nuxt.$store.commit('task/UPDATE_TASK', {
        uid: e.file.uid,
        total: e.event.total,
        loaded: e.event.loaded,
      })
    }
  },

  gotoRootDir() {
    const vm = this
    enterAbs({ filepath: '/' + this.rootDir[0].filename }).then(() => {
      back().then((res) => {
        vm.displayData = res.data.data
        vm.breadcrumb = []
        vm.breadcrumb.push(vm.defaultTopParent)
        vm.activeIndex = null
      })
    })
  },
  toggleCategoryShow(index) {
    if (this.activeIndex !== null) {
      this.gotoRootDir()
    } else {
      if (index === 0) this.currentLoc = this.defaultTopParent
      this.categoryShow[index] = !this.categoryShow[index]
    }
  },
  handleFileClicked(filename) {
    // handleFileClicked(filename, record) {
    // const isDir = record.is_dir
    const vm = this
    // 在enter之前发送检查请求
    this.selectedRowKeys = []
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
            if (vm.breadcrumb.length === 1) {
              // console.log(vm.rootDir)
              for (let i = 0; i < vm.rootDir.length; i++) {
                if (vm.rootDir[i].filename === filename) {
                  vm.activeIndex = '' + i
                }
              }
            }
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
          // this.previewText(fileLink, filename)
          this.$copyText(fileLink)
          this.$message.info('未知文件类型，文件链接已复制，请下载后浏览！')
        }
      } else {
        vm.$message.error('您访问的文件不存在！')
      }
    })
  },
}

export default FileBusiness
