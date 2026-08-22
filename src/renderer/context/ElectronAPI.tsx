import React, { createContext } from 'react'

import { NAMESPACE } from '../constants'

const { electronAPI } = window[NAMESPACE]

export const ElectronAPI = createContext(electronAPI)

export function ElectronAPIProvider() {
	return (
		<ElectronAPI value={electronAPI} />
	)
}
