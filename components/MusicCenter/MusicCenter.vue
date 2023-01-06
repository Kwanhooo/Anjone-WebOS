<template>
  <DialogBody ref="dialog" :uid="uid">
    <template #title>
      <span>音乐播放&nbsp;&nbsp;-&nbsp;&nbsp;{{ page }}</span>
    </template>
    <template #body>
      <div class="music-center-body">
        <div class="header">
          <div class="side-bar-switch" @click="toggleShowSideBar()">
            <img src="@/assets/svg/menu.svg" alt="menu" />
          </div>
          <div class="title">
            <span>音乐播放中心</span>
          </div>
        </div>
        <div class="main">
          <div v-if="showSideBar" class="side-bar">
            <div
              :class="{ 'side-bar-item': true, active: page === '全部专辑' }"
              @click="setPage('全部专辑')"
            >
              <img src="@/assets/svg/all.svg" class="icon" alt="" />
              <span class="text">全部专辑</span>
            </div>
            <div
              :class="{ 'side-bar-item': true, active: page === '歌曲' }"
              @click="setPage('歌曲')"
            >
              <img src="@/assets/svg/all.svg" class="icon" alt="" />
              <span class="text">歌曲</span>
            </div>
          </div>
          <div :class="{ 'display-area': true, expand: !showSideBar }">
            <div v-if="page === '全部专辑'" class="albums-all-page"></div>
            <div v-if="page === '歌曲'" class="songs-page">
              <div class="table-wrapper">
                <a-table
                  :row-selection="{
                    selectedRowKeys: selectedRowKeys,
                    onChange: handleSelectChange,
                  }"
                  :columns="columns"
                  :data-source="data"
                  :custom-row="handleRowClicked"
                />
              </div>
            </div>
            <div v-if="playing !== null" class="placeholder"></div>
          </div>
        </div>
        <div v-if="true" class="player-wrapper">
          <!--          <audio :src="playing.url" controls autoplay preload="auto" style="visibility: hidden">-->
          <!--            {{ playing.title }}-->
          <!--          </audio>-->
          <Player></Player>
        </div>
      </div>
    </template>
  </DialogBody>
</template>

<script>
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    ellipsis: true,
  },
  {
    title: '专辑',
    dataIndex: 'album',
    ellipsis: true,
  },
  {
    title: '歌手',
    dataIndex: 'artist',
    ellipsis: true,
  },
  {
    title: '时长',
    dataIndex: 'time',
    ellipsis: true,
  },
]
const data = []
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    title: `基拟态酶 - ${i}`,
    album: 'JI',
    artist: 'Richard Billyham',
    time: '03:56',
    url: 'https://music.163.com/song/media/outer/url?id=1400789159.mp3',
    cover: 'https://cloud.0xcafebabe.cn/code.png',
  })
}

export default {
  name: 'MusicCenter',
  props: {
    uid: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // page:'全部专辑',
      page: '歌曲',
      columns,
      data,
      showSideBar: true,
      selectedRowKeys: [],
      playing: null,
    }
  },
  methods: {
    setPage(page) {
      this.page = page
    },
    handleSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleRowClicked(record, index) {
      const vm = this
      return {
        on: {
          click: () => {
            vm.handlePlayMusic(record, index)
          },
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
    handlePlayMusic(record, index) {
      this.playing = {
        url: record.url,
        cover: record.cover,
        title: record.title,
        artist: record.artist,
        album: record.album,
      }
    },
    closePlayer() {
      this.playing = null
    },
    toggleShowSideBar() {
      this.showSideBar = !this.showSideBar
    },
  },
}
</script>

<style lang="less" scoped>
@import './MusicCenter';
</style>
