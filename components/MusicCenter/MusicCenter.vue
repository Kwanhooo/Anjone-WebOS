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
              <img src="@/assets/svg/songs.svg" class="icon" alt="" />
              <span class="text">歌曲</span>
            </div>
          </div>
          <div :class="{ 'display-area': true, expand: !showSideBar }">
            <div v-if="page === '全部专辑'" class="albums-all-page">
              <div v-for="i in 80" :key="i" class="album-item">
                <div class="inner">
                  <div
                    class="cover"
                    :style="
                      setBackground(
                        'https://demo.navidrome.org/rest/getCoverArt?u=demo&t=90a5b1f0ab00ca11662e5e7391c4a9e4&s=ef3ef0&f=json&v=1.8.0&c=NavidromeUI&id=86901a7c08c15334c9c66889b20cb57b&_=2021-01-19T18%3A20%3A50.207936133Z&size=300'
                      )
                    "
                  ></div>
                  <div class="infos">
                    <div class="name">Chicken So Beautiful</div>
                    <div class="artist">Richard Billyham</div>
                  </div>
                </div>
              </div>
            </div>
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
        <div v-if="playing !== null" class="player-wrapper">
          <Player
            :list="playing"
            :index="playFromIndex"
            @close="handlePlayerClose()"
          />
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
for (let i = 0; i < 66; i++) {
  data.push({
    key: i,
    title: `I Got Smoke - ${i}`,
    album: '1376届格莱美精选',
    artist: 'TenZin',
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
      playFromIndex: 0,
    }
  },
  methods: {
    setBackground(url) {
      return (
        'background: url(' +
        url +
        ') no-repeat; background-size: cover; font-size: 1rem;'
      )
    },
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
      // console.log(record, index)
      // this.playing = null
      setTimeout(() => {
        this.playFromIndex = index
        this.playing = []
        this.data.forEach((item) => {
          this.playing.push({
            id: index,
            url: item.url,
            // cover: record.cover,
            name: item.title,
            singer: item.artist,
            cover: item.album,
          })
        })
        setTimeout(() => {
          document.querySelector('.player-wrapper').classList.add('show')
        }, 100)
      }, 1)
    },
    handlePlayerClose() {
      document.querySelector('.player-wrapper').classList.add('gone')
      setTimeout(() => {
        this.playing = null
        document.querySelector('.player-wrapper').classList.remove('show')
        document.querySelector('.player-wrapper').classList.remove('gone')
      }, 300)
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
