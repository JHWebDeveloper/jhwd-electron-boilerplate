import { ipcRenderer } from 'electron'

import sendMessage from './sendMessage'

const interop = {}

interop.setContextMenu = () => {
	const textElement = 'input[type="text"]'
	
	window.addEventListener('contextmenu', e => {
		ipcRenderer.invoke('getContextMenu', {
			isTextElement: e.target.matches(textElement) && !e.target.disabled,
			x: e.x,
			y: e.y
		})
	})
}


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
