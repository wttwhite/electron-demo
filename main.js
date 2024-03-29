const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

// 打开窗口
const createWindow = () => {
  const mainWin = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    // autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, //渲染进程是否集成 Nodejs
      enableRemoteModule: true //是否允许渲染进程使用远程模块
    }
  })
  require('@electron/remote/main').initialize()
  require('@electron/remote/main').enable(mainWin.webContents)

  mainWin.openDevTools() // 打开开发者工具
  mainWin.loadFile('index.html')

  mainWin.on('ready-to-show', () => {
    mainWin.show()
  })

  // 主进程接收消息操作
  ipcMain.on('msg1', (ev, data) => {
    console.log('data:', data)
    ev.sender.send('msg1Re', '主进程回送消息--')
  })
  mainWin.on('close', () => {
    mainWin = null
  })
}
app.on('ready', () => {
  createWindow()
})
// 关闭所有窗口时退出应用 (Windows & Linux)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
