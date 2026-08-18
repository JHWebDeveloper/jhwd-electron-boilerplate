import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { app, BrowserWindow } from 'electron'

import { IS_MAC, IS_DEV, PRELOAD_PATH } from './constants'
import { doesFileExist } from './utilities'

import { setIpcChannels } from './lib/ipcChannels'

process.noDeprecation = !IS_DEV

let mainWin: BrowserWindow | null = null

function createURL(view = 'index') {
	const { href } = IS_DEV
		? new URL(`http://localhost:${process.env.PORT}/${view}.html`)
		: pathToFileURL(path.join(import.meta.dirname, 'renderer', `${view}.html`))

	return href
}

async function createMainWindow() {
	if (IS_DEV) { // pause in dev until preload.js is compiled
		let preloadScriptExists = false

		while (!preloadScriptExists) {
			preloadScriptExists = await doesFileExist(PRELOAD_PATH)
		}
	}

  mainWin = new BrowserWindow({
    width: 800,
    height: 600,
		webPreferences: {
      preload: PRELOAD_PATH
    }
  })

  mainWin.loadURL(createURL())

	mainWin.on('ready-to-show', () => {
		setIpcChannels()

		mainWin?.show()
		
		if (IS_DEV) mainWin!.webContents.openDevTools()
	})

	mainWin.on('close', () => mainWin = null)
}

const lock: Boolean = app.requestSingleInstanceLock()

if (!lock) {
	app.quit()
} else {
	app.on('second-instance', () => {
		if (mainWin) {
			if (mainWin.isMinimized()) mainWin.restore()
			mainWin.focus()
		}
	})

	app.on('ready', createMainWindow)
}

app.on('window-all-closed', () => {
	if (!IS_MAC) app.quit()
})

app.on('activate', () => {
	if (!mainWin) createMainWindow()
})
