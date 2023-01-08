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
              <div
                v-for="(album, index) in musics"
                :key="index"
                class="album-item"
              >
                <div class="inner">
                  <div class="cover" :style="setBackground(album.cover)">
                    <div
                      class="play-btn"
                      @click="handlePlayAlbum(album, index)"
                    >
                      <img
                        src="@/assets/svg/play.svg"
                        alt="play"
                        draggable="false"
                      />
                    </div>
                  </div>
                  <div class="infos">
                    <div class="name">{{ album.title }}</div>
                    <div class="artist">{{ album.artist }}</div>
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
                  :data-source="musics"
                  :custom-row="handleRowClicked"
                >
                  <div slot="rating" slot-scope="text, record">
                    <el-rate
                      v-model="record.rating"
                      disabled
                      :show-score="false"
                      score-template="{value}"
                    >
                    </el-rate>
                  </div>
                </a-table>
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
import { getAllMusic } from '~/api/media'

const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    ellipsis: true,
  },
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
  {
    title: '评分',
    dataIndex: 'rating',
    key: 'rating',
    ellipsis: true,
    scopedSlots: { customRender: 'rating' },
  },
]
const musics = []

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
      musics,
      showSideBar: true,
      selectedRowKeys: [],
      playing: null,
      playFromIndex: 0,
      playerLoaded: false,
      albums: [
        {
          name: `TOP50 of Shanghai`,
          artist: 'Apple Music',
          cover: 'https://cloud.0xcafebabe.cn/shanghai.webp',
          songs: [
            {
              key: 1,
              title: `Arhbo (feat. GIMS & RedOne)`,
              album: 'FIFA World Cup 2022™ Official Soundtrack',
              artist: 'Ozuna',
              time: '03:46',
              url: 'https://cloud.0xcafebabe.cn/Arhbo.mp3',
              cover: 'https://cloud.0xcafebabe.cn/shanghai.webp',
            },
            {
              key: 2,
              title: `十年`,
              album: 'The First Eleven Years',
              artist: '陈奕迅',
              time: '03:25',
              url: 'https://cloud.0xcafebabe.cn/十年.mp3',
              cover: 'https://cloud.0xcafebabe.cn/shanghai.webp',
            },
            {
              key: 3,
              title: `白玫瑰`,
              album: "What's Going On...? (Remastered 2019)",
              artist: '陈奕迅',
              time: '04:00',
              url: 'https://cloud.0xcafebabe.cn/白玫瑰.mp3',
              cover: 'https://cloud.0xcafebabe.cn/shanghai.webp',
            },
          ],
        },
      ],
    }
  },
  created() {
    this.fetchMusicList()
  },
  methods: {
    fetchMusicList() {
      const vm = this
      getAllMusic().then((res) => {
        const musicList = res.data.data
        vm.musics = []
        musicList.forEach((m) => {
          vm.musics.push({
            key: m.id,
            title: m.music_name,
            album: m.album,
            artist: m.artist,
            rating: m.rating,
            time: m.time,
            url: m.resource,
            cover: m.preview_image,
          })
        })
      })
    },
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
      if (this.playerLoaded) {
        this.playFromIndex = index
        return
      }
      // console.log(record, index)
      this.playing = null
      setTimeout(() => {
        this.playFromIndex = index
        this.playing = []
        this.musics.forEach((item) => {
          this.playing.push({
            id: index,
            url: item.url + 'token=' + sessionStorage.getItem('TOKEN'),
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
      if (!this.playerLoaded) this.playerLoaded = true
    },
    handlePlayAlbum(album, i) {
      setTimeout(() => {
        this.playFromIndex = i
        this.playing = []
        this.musics.forEach((item, index) => {
          this.playing.push({
            id: index,
            url: item.url + 'token=' + sessionStorage.getItem('TOKEN'),
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
      this.playerLoaded = false
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
