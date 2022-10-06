<template>
  <div>
    消息：
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Native',
  data() {
    return {
      ws: null,
      message: '',
    }
  },
  mounted() {
    const test = new WebSocket('ws://192.168.2.93:5001')
    test.onopen = function () {
      console.log('open')
      test.send('hello world bro!')
    }
  },
  beforeDestroy() {
    console.log('beforeDestroy')
    this.ws.close()
  },
  methods: {
    connectWebsocket() {
      const vm = this
      if (typeof WebSocket === 'undefined') {
        console.log('您的浏览器不支持WebSocket')
      } else {
        const protocol = 'ws'
        const url = `${protocol}://192.168.2.93:5001`
        // 打开websocket
        this.ws = new WebSocket(url)
        // 建立连接
        this.ws.onopen = () => {
          // 发送数据
          const data = 'Hello World'
          vm.ws.send(data)
          log('发送数据：' + data)
        }
        // 客户端接收服务端返回的数据
        this.ws.onmessage = (evt) => {
          console.log('返回数据：', evt)
          vm.message = vm.message.concat('\n').concat(evt)
        }
        // 发生错误时
        this.ws.onerror = (evt) => {
          console.log('websocket错误：', evt)
        }
        // 关闭连接
        this.ws.onclose = (evt) => {
          console.log('websocket关闭：', evt)
        }
      }
    },
  },
}
</script>

<style scoped></style>
