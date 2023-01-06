<template>
  <div class="audio-player">
    <!-- :src="require(`${list[index].url}`) closeIcon -->
    <audio ref="audio-player" autoplay controls style="display: none"></audio>
    <div v-if="isShowAudioPlayer" class="audio-mock-player">
      <img :src="closeIcon" class="closeicon" @click="closeAudioPlay" />
      <!-- 上一首 -->
      <img
        src="@/assets/svg/player-prev.svg"
        class="preicon"
        alt=""
        @click="musicPlay('pre')"
      />
      <!-- "暂停" : "播放" -->
      <img
        class="play-sty"
        :src="play ? plozeIcon : playIcon"
        @click="musicPlay('play')"
      />
      <!-- 下一首 -->
      <img
        src="@/assets/svg/player-after.svg"
        class="preicon"
        @click="musicPlay('next')"
      />

      <div class="right-menu">
        <div class="song-name">{{ list[index].name }}</div>
        <div class="bottom">
          <!--  播放进度条 -->
          <el-slider
            v-model="sliderVal"
            class="progress"
            :format-tooltip="formatTooltip"
            :min="sliderMin"
            :max="sliderMax"
            @change="spliderSelect"
          />

          <span class="current">{{ currentTime }}</span>
          <span class="duration">/{{ duration }}</span>
          <div class="vulumn" @click="changeVolumns">
            <el-popover
              placement="top-start"
              trigger="hover"
              popper-class="poppervulumn-class"
            >
              <el-slider
                v-model="sliderValVolumn"
                class="vulumn-progress"
                vertical
                height="100px"
                :step="0.1"
                :format-tooltip="formatTooltipVolumn"
                :min="0"
                :max="1"
                @change="spliderSelectVolumn"
              />
              <img
                slot="reference"
                :src="sliderValVolumn ? vulumnIcon : mutedIcon"
                alt=""
                style="width: 22px; height: 22px; margin-bottom: 4px"
              />
            </el-popover>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 显示隐藏
    index: {
      type: Number,
      required: true,
    },
    isShowAudioPlayer: {
      type: Boolean,
      default: true,
    },
    // 播放列表
    // eslint-disable-next-line vue/require-prop-types
    list: {
      default() {
        return [
          // 数据格式
          {
            id: 1,
            name: '美人鱼',
            url: 'https://music.163.com/song/media/outer/url?id=1400789159.mp3',
            cover: 'ChenYou',
            singer: '林俊杰',
          },
          {
            id: 2,
            name: '起风了',
            url: 'https://music.163.com/song/media/outer/url?id=1400789159.mp3',
            cover: 'ChenYou',
            singer: '林俊杰',
          },
        ]
      },
    },
    //  播放索引
    // index
  },
  data() {
    return {
      playIcon: require('@/assets/svg/play.svg'),
      plozeIcon: require('@/assets/svg/player-pause.svg'),
      vulumnIcon: require('@/assets/svg/volume.svg'),
      mutedIcon: require('@/assets/svg/mute.svg'),
      closeIcon: require('@/assets/svg/player-close.svg'),
      box: undefined,
      // index: this.startFromIndex, // 当前播放的音乐素质索引
      play: true, // 播放状态，true为正在播放
      sliderVal: 0, // 这个对接当前时长。
      sliderMin: 0,
      sliderMax: 0, // 这个对接总时长。
      sliderValVolumn: 0.5, // 音量
      copySliderValVolumn: 0.5,
      duration: undefined, // 音乐总时长
      currentTime: undefined, // 当前播放时长
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.box = this.$refs['audio-player']
      this.box.src = this.list[this.index].url
      // require(`${this.list[this.index].url}`);
      // console.log(this.box, '音频播放器DOM')
      const that = this

      //  this.duration  =  this.formatTime(this.box.duration)
      // 绑定三个触发方法
      // 当时长有变化时触发，由"NaN"变为实际时长也算
      this.box.ondurationchange = function () {
        // console.log('时长发生了变化')
        // console.log(that.box.duration)
        // that.
        // that.duration  =  that.formatTime(that.box.duration)
        that.sliderMax = Math.floor(that.box.duration)
        that.updateTime()
      }
      // 当前数据可用是触发
      this.box.oncanplay = function () {
        // console.log('已经可以播放了')
      }
      // 播放位置发送改变时触发。
      this.box.ontimeupdate = function () {
        // console.log('播放位置发送了变动')
        that.updateTime()
      }
      // 音频播放完毕
      this.box.onended = function () {
        // console.log('播放完毕，谢谢收听')
      }
      // 音频播放完毕
      this.box.onerror = function () {
        // console.log('加载出错！')
      }
    },
    changeVolumns() {
      // 静音切换
      if (this.sliderValVolumn > 0) {
        this.sliderValVolumn = 0
      } else {
        this.sliderValVolumn = this.copySliderValVolumn
      }
    },
    // 播放
    musicPlay(flag) {
      switch (flag) {
        case 'pre':
          if (this.list[this.index - 1]) {
            this.box.src = this.list[this.index - 1].url
            // eslint-disable-next-line vue/no-mutating-props
            this.index -= 1
          } else {
            this.box.src = this.list[this.list.length - 1].url
            // eslint-disable-next-line vue/no-mutating-props
            this.index = this.list.length - 1
          }
          this.init()
          if (this.play) {
            this.box.play()
          } else {
            this.box.pause()
          }
          break
        case 'play':
          this.play = !this.play
          if (this.play) {
            this.box.play()
          } else {
            this.box.pause()
          }
          break
        case 'next':
          if (this.list[this.index + 1]) {
            this.box.src = this.list[this.index + 1].url
            // eslint-disable-next-line vue/no-mutating-props
            this.index += 1
          } else {
            this.box.src = this.list[0].url
            // eslint-disable-next-line vue/no-mutating-props
            this.index = 0
          }
          this.init()
          if (this.play) {
            this.box.play()
          } else {
            this.box.pause()
          }
          break
      }
    },
    formatTooltip(val) {
      // 格式化毫秒数，由于组件提示为纯数字，所以这里需要将数字转化为我们所需要的的格式，string类型的。'03:45',
      const time = this.formatTime(val)
      return `${time.min}:${time.sec}`
    },
    // 音量显示100%
    formatTooltipVolumn(val) {
      return val * 100 + '%'
    },
    spliderSelectVolumn() {
      this.box.volume = this.sliderValVolumn
      // 备份音量
      this.copySliderValVolumn = this.sliderValVolumn
    },
    updateTime() {
      const total = this.formatTime(this.box.duration)
      const current = this.formatTime(this.box.currentTime)
      this.duration = `${total.min}:${total.sec}`
      this.currentTime = `${current.min}:${current.sec}`
      // 值为xx.xxxxx 需要取整
      this.sliderVal = Math.floor(this.box.currentTime)
    },
    formatTime(time) {
      // 格式化毫秒，返回String型分秒对象

      if (!time) return { min: '00', sec: '00' }
      return {
        min: Math.floor(time / 60)
          .toString()
          .padStart(2, '0'),
        sec: Math.floor(time % 60)
          .toString()
          .padStart(2, '0'),
      }
    },
    closeAudioPlay() {
      // eslint-disable-next-line vue/no-mutating-props
      // this.isShowAudioPlayer = false
      this.$emit('close')
    },
    spliderSelect() {
      // 滑块松动后触发。更新当前时长，
      // 时长发生变动会init里的方法进行更新数据
      this.box.currentTime = this.sliderVal
    },
  },
}
</script>

<style lang="less" scoped>
.poppervulumn-class {
  min-width: 20px !important;
  padding: 12px 5px !important;
}

.audio-player {
  .audio-mock-player {
    position: relative;
    width: 100%;
    padding: 10px 20px 20px 20px;
    background: rgba(34, 34, 34, 0.8);
    border: 1px solid rgba(34, 34, 34, 1);
    border-radius: 8px;
    display: flex;
    align-items: center;

    .play-sty {
      margin: 0 16px;
      width: 52px;
      height: 52px;
      cursor: pointer;
    }

    .preicon {
      width: 32px;
      height: 32px;
      cursor: pointer;
    }

    .closeicon {
      position: absolute;
      right: 1px;
      top: -13px;
      width: 30px;
      height: 30px;
      cursor: pointer;
    }

    .right-menu {
      margin-left: 40px;
      flex: 1;

      .bottom {
        display: flex;
        align-items: center;

        .progress {
          flex: 1;
          margin-bottom: ;
        }

        .current {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #ffffff;
          text-align: left;
          font-weight: 400;
          margin-left: 12px;
        }

        .duration {
          opacity: 0.6;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #ffffff;
          text-align: left;
          font-weight: 400;
          margin-right: 16px;
        }

        .vulumn {
          position: relative;

          img {
            cursor: pointer;
            width: 18.5px;
            height: 15px;
          }

          .vulumn-progress {
            position: absolute;
            top: -73px;
            left: -12px;
            width: 50px;
          }
        }
      }

      .song-name {
        height: 25px;
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #ffffff;
        text-align: left;
        font-weight: 400;
        margin-bottom: 15px;
        padding-top: 5px;
      }
    }
  }
}
</style>
