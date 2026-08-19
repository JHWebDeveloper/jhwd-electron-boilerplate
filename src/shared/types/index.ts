import { CHANNEL } from '../constants'

export interface IpcChannel {
	[CHANNEL.TEMPLATE_CHANNEL]: {
		payload: unknown
		response: unknown
	}
}

export type SafeKey<T, K extends PropertyKey> = K extends keyof T ? T[K] : undefined

export type IpcPayload<K extends keyof IpcChannel> = SafeKey<IpcChannel[K], 'payload'>

export type IpcResponse<K extends keyof IpcChannel> = SafeKey<IpcChannel[K], 'response'>

export type ChannelsWithPayload = {
	[K in keyof IpcChannel]: IpcPayload<K> extends undefined ? never : K;
}[keyof IpcChannel]

export type ChannelsWithoutPayload = {
	[K in keyof IpcChannel]: K extends ChannelsWithPayload ? never : K;
}[keyof IpcChannel]

export type PossiblePromise<T> = Promise<T> | T
