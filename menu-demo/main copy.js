const { app, BrowserWindow, Menu } = require('electron')
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

  let menuTemp = [{ label: '文件' }, { label: '编辑' }]
  // 利用上述的模板生成一个菜单
  let menu = Menu.buildFromTemplate(menuTemp)
  // 建立联系
  Menu.setApplicationMenu(menu)
  mainWin.openDevTools() // 打开开发者工具
  mainWin.loadFile('index.html')

  mainWin.on('ready-to-show', () => {
    mainWin.show()
  })

  mainWin.webContents.on('did-finish-load', () => {
    console.log('333333 ---- did-finish-load')
  })
  mainWin.webContents.on('dom-ready', () => {
    console.log('222222 ---- dom-ready')
  })
  mainWin.on('close', () => {
    console.log('8888888 ---- this win is closed')
  })
}
app.on('ready', () => {
  console.log('1111111 ---- ready')
  createWindow()
})
// 关闭所有窗口时退出应用 (Windows & Linux)
app.on('window-all-closed', () => {
  console.log('444444 ---- window-all-closed')
  if (process.platform !== 'darwin') app.quit()
})
app.on('before-quit', () => {
  console.log('555555 ---- before-quit')
})
app.on('will-quit', () => {
  console.log('6666666 ---- will-quit')
})
app.on('quit', () => {
  console.log('777777 ---- quit')
})
