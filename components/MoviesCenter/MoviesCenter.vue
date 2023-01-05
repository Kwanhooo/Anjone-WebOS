<template>
  <DialogBody ref="dialog" :uid="uid">
    <template #title>
      <span>影音中心</span>
    </template>
    <template #body>
      <div v-if="videoToPlay !== null" class="player-wrapper">
        <div class="go-back">
          <img
            src="@/assets/svg/go-back.svg"
            alt="go-back"
            draggable="false"
            @click="handleGoBack()"
          />
        </div>
        <video
          id="embedded-player"
          :src="`${videoToPlay}`"
          controls="controls"
          preload="auto"
          autoplay="autoplay"
          loop="loop"
        ></video>
      </div>
      <div v-else class="movies-center-body">
        <div class="top-bar"></div>
        <div class="tool-kits-wrapper">
          <div class="tool-item">
            <img src="@/assets/svg/movies.svg" alt="movies" draggable="false" />
          </div>
          <div class="tool-item">
            <img
              src="@/assets/svg/movie-order.svg"
              alt="movies"
              draggable="false"
            />
          </div>
          <div class="tool-item">
            <img
              src="@/assets/svg/movie-filter.svg"
              alt="movies"
              draggable="false"
            />
          </div>
        </div>
        <div class="display-area">
          <div
            v-for="(movie, index) in movies"
            :key="'movie-' + index"
            class="movie-item"
          >
            <div class="cover" :style="setBackground(`${movie.cover}`)">
              <div class="play-btn" @click="handlePlay(`${movie.url}`)">
                <img src="@/assets/svg/play.svg" alt="play" draggable="false" />
              </div>
              <div class="btn-group"></div>
            </div>
            <div class="infos">
              <div class="title">{{ movie.name }}</div>
              <div class="desc">{{ movie.desc }}</div>
            </div>
          </div>
          <div
            v-for="i in 6"
            :key="'placeholder-' + i"
            class="placeholder-block"
          />
        </div>
      </div>
    </template>
  </DialogBody>
</template>

<script>
export default {
  name: 'MoviesCenter',
  props: {
    uid: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      videoToPlay: null,
      movies: [
        {
          id: 1,
          name: 'Night of the Living Dead',
          desc: 1968,
          cover:
            'https://demo.jellyfin.org/stable/Items/5e6e8380563c5211106652362c5c6843/Images/Backdrop?fillHeight=216&fillWidth=384&quality=96&tag=eabf7d2d855a27dd529bb34a028fe758',
          url: 'https://vjs.zencdn.net/v/oceans.mp4',
        },
      ],
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
    handlePlay(url) {
      this.videoToPlay = url
    },
    handleGoBack() {
      this.videoToPlay = null
    },
  },
}
</script>

<style lang="less" scoped>
@import './MoviesCenter.less';
</style>
