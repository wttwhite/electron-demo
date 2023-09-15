const remote = require('@electron/remote')
const { ipcRenderer } = require('electron')
window.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn')
  btn.addEventListener('click', () => {
    ipcRenderer.send('msg1', '异步消息')
  })
  ipcRenderer.on('msg1Re', (ev, data) => {
    console.log('渲染进程接收到的的消息', data)
  })
})
