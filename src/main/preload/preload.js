import * as contextMenu from './contextMenu'
import sendMessage from './sendMessage'

const interop = Object.assign({}, contextMenu)


// ---- ATTACH ALL TO RENDERER--------

const ns = 'REPLACE_WITH_NAME_SPACE'

const freeze = Object.freeze({
	interop: Object.freeze(interop)
})

if (process.env.NODE_ENV === 'development') {
	window[ns] = freeze
} else {
	contextBridge.exposeInMainWorld(ns, freeze)
}
