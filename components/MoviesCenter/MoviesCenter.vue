<template>
  <DialogBody ref="dialog" :uid="uid">
    <template #title>
      <span>影音中心</span>
    </template>
    <template #body>
      <div class="movies-center-body">
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
          <div v-for="i in 1" :key="'movie-' + i" class="movie-item">
            <div
              class="cover"
              :style="
                setBackground(
                  'https://demo.jellyfin.org/stable/Items/5e6e8380563c5211106652362c5c6843/Images/Backdrop?fillHeight=216&fillWidth=384&quality=96&tag=eabf7d2d855a27dd529bb34a028fe758'
                )
              "
            >
              <div class="play-btn" @click="handlePlay()">
                <img src="@/assets/svg/play.svg" alt="play" draggable="false" />
              </div>
              <div class="btn-group"></div>
            </div>
            <div class="infos">
              <div class="title">Night of the Living Dead</div>
              <div class="desc">1968</div>
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
      dialogWidth: null,
      dialogHeight: null,
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
    handlePlay() {},
  },
}
</script>

<style lang="less" scoped>
@import './MoviesCenter.less';
</style>
