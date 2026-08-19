import { promises as fsp } from 'node:fs'

export * from '../../shared/utilities'
export * as ipcMainTypeSafe from './ipcMainTypeSafe'

export async function doesFileExist(path: string) {
	try {
		await fsp.access(path, fsp.constants.F_OK)
		return true
	} catch {
		return false
	}
}
