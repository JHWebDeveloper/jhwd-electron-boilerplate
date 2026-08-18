import { CHANNEL } from '../constants'

export interface IpcChannel {
	[CHANNEL.TEMPLATE_CHANNEL]: {
		payload: unknown
		response: unknown
	}
}

export type PossiblePromise<T> = Promise<T> | T

export type SafeResponse<T, K extends PropertyKey> = K extends keyof T ? T[K] : undefined
