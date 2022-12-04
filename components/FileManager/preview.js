import Vue from 'vue'
import ImageOpener from '~/components/FileOpener/ImageOpener.vue'
import AudioOpener from '~/components/FileOpener/AudioOpener.vue'
import VideoOpener from '~/components/FileOpener/VideoOpener.vue'
import TextOpener from '~/components/FileOpener/TextOpener.vue'

const Preview = {
  previewImage(image, fileName) {
    // 生成uid
    this.$message.info('图片 ' + fileName + ' 正在加载中...', 2)
    $nuxt.$store.dispatch('dock/GetNewUid').then((res) => {
      const pendingObj = {
        uid: res,
        icon: require('@/assets/image/image-preview.png'),
        name: '图片预览',
        isActive: true,
      }
      // extend一个要打开的组件
      const ImageOpenerVueComponent = Vue.extend(ImageOpener)
      const imageOpenerWrapper = document.createElement('div')
      document.getElementById('desktop-wrapper').appendChild(imageOpenerWrapper)
      const comp = new ImageOpenerVueComponent({
        el: imageOpenerWrapper,
        propsData: {
          uid: pendingObj.uid,
          image,
          fileName,
        },
      })
      // 在pending表中添加打开的组件
      $nuxt.$store.commit('dock/NEW_PENDING', pendingObj)
    })
    // 关闭所有可关闭的小组件(__closable__)
    const closable = document.querySelector('.__closable__')
    closable !== null && closable.remove()
  },
  previewAudio(audio, fileName) {
    this.$message.info('音频 ' + fileName + ' 正在加载中...', 2)
    // 生成uid
    $nuxt.$store.dispatch('dock/GetNewUid').then((res) => {
      const pendingObj = {
        uid: res,
        icon: require('@/assets/image/audio-preview.png'),
        name: '音频预览',
        isActive: true,
      }
      // extend一个要打开的组件
      const AudioOpenerVueComponent = Vue.extend(AudioOpener)
      const audioOpenerWrapper = document.createElement('div')
      document.getElementById('desktop-wrapper').appendChild(audioOpenerWrapper)
      const comp = new AudioOpenerVueComponent({
        el: audioOpenerWrapper,
        propsData: {
          uid: pendingObj.uid,
          audio,
          fileName,
        },
      })
      // 在pending表中添加打开的组件
      $nuxt.$store.commit('dock/NEW_PENDING', pendingObj)
    })
    // 关闭所有可关闭的小组件(__closable__)
    const closable = document.querySelector('.__closable__')
    closable !== null && closable.remove()
  },
  previewVideo(video, fileName, videoType) {
    this.$message.info('视频 ' + fileName + ' 正在加载中...', 2)
    // 生成uid
    $nuxt.$store.dispatch('dock/GetNewUid').then((res) => {
      const pendingObj = {
        uid: res,
        icon: require('@/assets/image/video-preview.png'),
        name: '视频预览',
        isActive: true,
      }
      // extend一个要打开的组件
      const VideoOpenerVueComponent = Vue.extend(VideoOpener)
      const videoOpenerWrapper = document.createElement('div')
      document.getElementById('desktop-wrapper').appendChild(videoOpenerWrapper)
      const comp = new VideoOpenerVueComponent({
        el: videoOpenerWrapper,
        propsData: {
          uid: pendingObj.uid,
          video,
          fileName,
          videoType,
        },
      })
      // 在pending表中添加打开的组件
      $nuxt.$store.commit('dock/NEW_PENDING', pendingObj)
    })
    // 关闭所有可关闭的小组件(__closable__)
    const closable = document.querySelector('.__closable__')
    closable !== null && closable.remove()
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
}

export default Preview
