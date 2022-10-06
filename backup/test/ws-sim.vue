<template>
  <div>
    消息：
    {{ message }}
  </div>
</template>

<script>
import SockJS from 'sockjs-client'
import { target } from '@/api/ws.config'

export default {
  name: 'WsSim',
  data() {
    return {
      ws: null,
      message: '',
    }
  },
  mounted() {
    const vm = this
    this.ws = new SockJS(target)

    this.ws.onopen = function () {
      console.log('open')
      vm.ws.send('test')
    }
    this.ws.onmessage = function (e) {
      console.log('message', e.data)
      vm.message = e.data
      close()
    }

    this.ws.onclose = function () {
      console.log('close')
    }
  },
  beforeDestroy() {
    this.ws.close()
  },
}
</script>

<style scoped></style>
