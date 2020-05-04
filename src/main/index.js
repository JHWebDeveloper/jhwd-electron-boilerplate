import electron from 'electron'
import url from 'url'
import path from 'path'

const dev = process.env.NODE_ENV === 'development'
const mac = process.platform === 'darwin'
let win = false

const { app, BrowserWindow, Menu } = electron

const openWindow = prefs => new BrowserWindow({
  ...prefs,
  show: false,
  backgroundColor: '#fff',
  webPreferences: {
    nodeIntegration: dev,
    enableEval: false,
    preload: dev
      ? path.join(__dirname, 'preload', 'babelRegister.js')
      : path.join(__dirname, 'preload.js')
  }
})

const mainURL = () => dev ? {
  protocol: 'http:',
  host: 'localhost:3000',
  pathname: 'index.html',
  slashes: true
} : {
  protocol: 'file:',
  pathname: path.join(__dirname, 'build', 'index.html'),
  slashes: true
}

const createWindow = () => {
  win = openWindow()

  win.loadURL(url.format(mainURL()))

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)

  Menu.setApplicationMenu(mainMenu)

  win.on('ready-to-show', () => {
    win.show()
    if (dev) win.webContents.openDevTools()
  })

  win.on('close', () => {
    win = false
  })
}

const lock = app.requestSingleInstanceLock()

if (!lock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })

  app.on('ready', () => {
    createWindow()
  })
}

app.on('window-all-closed', () => {
  if (!mac) app.quit()
})

app.on('activate', () => {
  if (!win) createWindow()
})

const mainMenuTemplate = [
  ...mac ? [{
    label: app.getName(),
    submenu: [
      {
        label: 'About',
        role: 'about'
      },
      {
        label: 'Hide',
        role: 'hide'
      },
      { role: 'hideothers' },
      { type: 'separator' },
      { 
        label: 'Quit',
        role: 'quit'
      }
    ]
  }] : [],
  {
    label: 'File',
    submenu: [
      mac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo'},
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { type: 'separator' },
      { role: 'selectall' }
    ]
  }
]

if (dev) {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools()
        }
      },
      {
        role: 'reload'
      }
    ]
  })
}
