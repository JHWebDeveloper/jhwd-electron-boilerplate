import * as contextMenu from './contextMenu'
import sendMessage from './sendMessage'

const interop = Object.assign({}, contextMenu)


// ---- ATTACH ALL TO RENDERER--------

const namespace = 'REPLACE_WITH_NAMESPACE'

const freeze = Object.freeze({
	interop: Object.freeze(interop)
})

if (process.env.NODE_ENV === 'development') {
	window[namespace] = freeze
} else {
	contextBridge.exposeInMainWorld(namespace, freeze)
}
