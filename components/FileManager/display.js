import { back, orderFiles, refresh } from '~/api/samb'
import { Status } from '~/utils/magic-numbers'

const Display = {
  handleTableChange(pagination, filters, sorter) {
    const vm = this
    let order = ''
    if (sorter.order) order = sorter.order
    orderFiles(sorter.field, order).then((res) => {
      vm.displayData = res.data.data
    })
  },
  handleRowClicked(record, index) {
    const vm = this
    return {
      on: {
        click: () => {},
        dblclick: () => {
          if (
            vm.selectedRowKeys.length === 1 &&
            vm.selectedRowKeys[0] === index
          ) {
            vm.selectedRowKeys = []
            return
          }
          vm.selectedRowKeys = []
          vm.selectedRowKeys.push(index)
        },
      },
    }
  },
  setShowDropDown(value) {
    $nuxt.$store.commit('sys/SET_SHOW_DROP_DOWN', value)
  },
  handleOpenRenameModal() {
    this.newDirName = this.displayData.at(this.selectedRowKeys[0]).filename
    this.isShowRenameModal = true
    this.setShowDropDown(false)
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
  toggleShowMoreOp() {
    const isShowNow = $nuxt.$store.state.sys.showDropDown
    // console.log('isShowNow', isShowNow)
    this.setShowDropDown(!isShowNow)
    // this.showDropDown = !this.showDropDown
  },
  onSearch() {
    if (this.searchKeywords === '') {
      this.displayData = this.displayDataBackup
      this.displayDataBackup = []
    } else {
      if (this.displayDataBackup.length === 0) {
        this.displayDataBackup = this.displayData
      }
      this.searchData = []
      this.displayDataBackup.forEach((data) => {
        if (data.filename.includes(this.searchKeywords)) {
          this.searchData.push(data)
        }
      })
      this.displayData = this.searchData
    }
  },
  onSelectChange(selectedRowKeys) {
    this.selectedRowKeys = selectedRowKeys
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
}
export default Display
