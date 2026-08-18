import { ipcMain, type IpcMainEvent, type IpcMainInvokeEvent } from 'electron'

import type { IpcChannel, PossiblePromise, SafeResponse } from '../types'

function setListener<K extends keyof IpcChannel>(
	channel: K,
	callback: (evt: IpcMainEvent, opts: IpcChannel[K]['payload']) => void
) {
	ipcMain.on(channel, callback)
}

function setHandler<K extends keyof IpcChannel>(
	channel: K,
	callback: (evt: IpcMainInvokeEvent, opts: IpcChannel[K]['payload']) => PossiblePromise<SafeResponse<IpcChannel[K], 'response'>> | Promise<void>
) {
	ipcMain.handle(channel, callback)
}

function send<K extends keyof IpcChannel>(
	evt: IpcMainEvent | IpcMainInvokeEvent,
	channel: K,
	payload: IpcChannel[K]['payload']
) {
	evt.sender.send(channel, payload)
}

export function setIpcChannels() {

}
