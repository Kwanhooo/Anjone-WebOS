const Mock = require('mockjs')

// eslint-disable-next-line no-console
console.log('Mock is mounting')

require('./services/user')

const minTimeOut = 200
const maxTimeOut = 800 - minTimeOut
const mockTimeOut = (Math.random() * maxTimeOut + minTimeOut).toFixed(0)

Mock.setup({
  timeout: mockTimeOut,
})

// eslint-disable-next-line no-console
console.log('Mock is now mounted with timeOut: ' + mockTimeOut)
