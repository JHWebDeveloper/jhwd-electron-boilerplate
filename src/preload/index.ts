import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron'

import { NAMESPACE } from './constants'
import { IpcChannel, SafeResponse } from './types'

function send<K extends keyof IpcChannel>(
	channel: K,
	payload: IpcChannel[K]['payload'] = {}
) {
	ipcRenderer.send(channel, payload)
}

function invoke<K extends keyof IpcChannel>(
	channel: K,
	payload: IpcChannel[K]['payload'] = {}
): Promise<SafeResponse<IpcChannel[K], 'response'>> {
	return ipcRenderer.invoke(channel, payload)
}

function setListener<K extends keyof IpcChannel>(
	channel: K,
	callback: (evt: IpcRendererEvent, opts: IpcChannel[K]['payload']) => void
) {
	ipcRenderer.on(channel, callback)
}

function removeAllListeners<K extends keyof IpcChannel>(channel: K) {
	ipcRenderer.removeAllListeners(channel)
}

export const electronAPI = {

} as const

contextBridge.exposeInMainWorld(NAMESPACE, Object.freeze({
	electronAPI: Object.freeze(electronAPI)
}))
