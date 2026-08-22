import { use } from 'react'

import { ElectronAPI } from '../context/ElectronAPI'

export function useElectronAPI() {
	return use(ElectronAPI)
}
