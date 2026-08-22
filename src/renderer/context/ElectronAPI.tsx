/** 
 * Passing Electron context bridge into a React Context
 * to avoid repetitive references to the window object
 */

import { createContext } from 'react'

import { NAMESPACE } from '../constants'

const { electronAPI } = window[NAMESPACE]

export const ElectronAPI = createContext(electronAPI)
