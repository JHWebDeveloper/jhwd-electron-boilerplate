import { app, BrowserWindow, Menu } from 'electron'
import url from 'url'
import path from 'path'

const dev = process.env.NODE_ENV === 'development'
const mac = process.platform === 'darwin'
let mainWin = false

process.noDeprecation = !dev

const openWindow = prefs => new BrowserWindow({
  ...prefs,
  show: false,
  backgroundColor: '#fff',
  webPreferences: {
		nodeIntegration: dev,
		contextIsolation: !dev,
		enableEval: false,
		enableRemoteModule: true,
    preload: dev
      ? path.join(__dirname, 'preload', 'babelRegister.js')
      : path.join(__dirname, 'preload.js')
  }
})

const mainURL = () => dev ? {
  protocol: 'http:',
	hostname: 'localhost',
	port: process.env.PORT,
  pathname: 'index.html',
  slashes: true
} : {
  protocol: 'file:',
  pathname: path.join(__dirname, 'renderer', 'index.html'),
  slashes: true
}

const createWindow = () => {
  mainWin = openWindow()

  mainWin.loadURL(url.format(mainURL()))

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)

  Menu.setApplicationMenu(mainMenu)

  mainWin.on('ready-to-show', () => {
    mainWin.show()
    if (dev) mainWin.webContents.openDevTools()
  })

  mainWin.on('close', () => {
    mainWin = false
  })
}

const lock = app.requestSingleInstanceLock()

if (!lock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (mainWin) {
      if (mainWin.isMinimized()) mainWin.restore()
      mainWin.focus()
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
  if (!mainWin) createWindow()
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

const setContextMenu = () => {
	const textEditor = new Menu()
	let pos = [0, 0]
	let inspectMenu = []

	const inspect = !dev ? [] : [
		new MenuItem({
			id: 0,
			label: 'Inspect Element',
			click() {
				BrowserWindow.getFocusedWindow().inspectElement(...pos)
			}
		}),
		new MenuItem({ type: 'separator' })
	]

	const textEditorItems = [
		...inspect,
		new MenuItem({ role: 'cut' }),
		new MenuItem({ role: 'copy' }),
		new MenuItem({ role: 'paste' }),
		new MenuItem({ type: 'separator' }),
		new MenuItem({ role: 'selectAll' })
	]

	if (dev) {
		inspectMenu = new Menu()
		inspectMenu.append(...inspect)
	}

	for (const item of textEditorItems) {
		textEditor.append(item)
	}

	return (evt, { isTextElement, x, y }) => {
		pos = [x, y]

		if (isTextElement) {
			textEditor.popup(BrowserWindow.getFocusedWindow())
		} else if (dev) {
			inspectMenu.popup(BrowserWindow.getFocusedWindow())
		}
	}
}

ipcMain.handle('getContextMenu', setContextMenu())
