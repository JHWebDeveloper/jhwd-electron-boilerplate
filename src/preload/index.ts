import { contextBridge } from 'electron'

import { CHANNEL, NAMESPACE } from './constants'
import { ipcRendererTypeSafe } from './utilities'

const { invoke, removeAllListeners, send, setListener } = ipcRendererTypeSafe

const electronAPI = {

} as const

export type ElectronAPI = typeof electronAPI

contextBridge.exposeInMainWorld(NAMESPACE, Object.freeze({
	electronAPI: Object.freeze(electronAPI)
}))
