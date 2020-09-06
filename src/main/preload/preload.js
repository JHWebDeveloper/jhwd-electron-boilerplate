import * as contextMenu from './contextMenu'
import sendMessage from './sendMessage'

const interop = Object.assign({}, contextMenu)

if (process.env.NODE_ENV === 'development') {
	window.REPLACE_WITH_NAMESPACE = Object.freeze({
		interop: Object.freeze(interop)
	})
} else {
	contextBridge.exposeInMainWorld('REPLACE_WITH_NAMESPACE', { interop })
}
