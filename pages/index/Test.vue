<template>
  <button @click="testXHR()">TEST</button>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      xhrDATA: null,
    }
  },
  methods: {
    testXHR() {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', 'http://192.168.2.146:5000/user/login')
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.send('phone=18373687376&password=1234567')
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // eslint-disable-next-line no-console
            console.log(xhr.getAllResponseHeaders())
            // eslint-disable-next-line no-console
            console.log(xhr.getResponseHeader('Set-Cookie'))
          } else {
            // eslint-disable-next-line no-console
            console.log('error')
          }
        }
      }
    },
    testB() {
      fetch('http://192.168.2.146:8099/user/test').then((res) => {
        // eslint-disable-next-line no-console
        console.log(res)
      })
    },
  },
}
</script>

<style scoped></style>
