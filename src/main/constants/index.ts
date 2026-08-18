import path from 'node:path'

export const IS_MAC = process.platform === 'darwin'

export const IS_DEV = process.env.NODE_ENV === 'development'

export const PRELOAD_PATH = IS_DEV
	? path.join(import.meta.dirname, '..', '..', '..', 'build', 'preload.js')
	: path.join(import.meta.dirname, 'preload.js')
