const remote = require('@electron/remote')
window.addEventListener('DOMContentLoaded', () => {
  // const replaceText = (selector, text) => {
  //   const element = document.getElementById(selector)
  //   if (element) element.innerText = text
  // }

  // for (const dependency of ['chrome', 'node', 'electron']) {
  //   replaceText(`${dependency}-version`, process.versions[dependency])
  // }
  const btn = document.getElementById('btn')
  btn.addEventListener('click', () => {
    const mainWin = new remote.BrowserWindow({
      width: 200,
      height: 200,
      parent: remote.getCurrentWindow(),
      model: true
    })
    mainWin.loadFile('new.html')
    mainWin.on('close', () => {
      mainWin = null
    })
  })
  const contextMenu = [
    {
      label: 'a',
      click() {
        console.log('click')
      }
    }
  ]
  const Menu = remote.Menu
  const menu = Menu.buildFromTemplate(contextMenu)
  window.addEventListener('contextmenu', ev => {
    ev.preventDefault()
    menu.popup({ window: remote.getCurrentWindow() })
  })
})
