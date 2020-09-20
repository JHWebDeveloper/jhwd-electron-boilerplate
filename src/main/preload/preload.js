import * as contextMenu from './contextMenu'
import sendMessage from './sendMessage'

const interop = Object.assign({}, contextMenu)


// ---- ATTACH ALL TO RENDERER--------

const nameSpace = 'REPLACE_WITH_NAME_SPACE'

const freeze = Object.freeze({
	interop: Object.freeze(interop)
})

if (process.env.NODE_ENV === 'development') {
	window[nameSpace] = freeze
} else {
	contextBridge.exposeInMainWorld(nameSpace, freeze)
}
