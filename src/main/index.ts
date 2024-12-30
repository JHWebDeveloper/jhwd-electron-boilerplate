import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { app, BrowserWindow } from 'electron'

const IS_MAC: boolean = process.platform === 'darwin'
const IS_DEV: boolean = process.env.NODE_ENV === 'development'

process.noDeprecation = !IS_DEV

let mainWin: BrowserWindow | null = null

const createURL = (view: string = 'index'): string => {
	const { href }: { href: string } = IS_DEV
		? new URL(`http://localhost:${process.env.PORT}/${view}.html`)
		: pathToFileURL(path.join(__dirname, 'renderer', `${view}.html`))

	return href
}

const createMainWindow = (): void => {
  mainWin = new BrowserWindow({
    width: 800,
    height: 600,
		webPreferences: {
      preload: app.isPackaged
				? path.join(__dirname, 'preload.js')
				: path.join(__dirname, '..', '..', 'build', 'preload.js')
    }
  })

  mainWin.loadURL(createURL())

	mainWin.on('ready-to-show', () => {
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
