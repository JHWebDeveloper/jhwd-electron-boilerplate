import React from 'react'

import '../css/global.css'

import { ElectronAPIProvider } from '../context/ElectronAPI'

export default function App() {
	return (
		<ElectronAPIProvider>
			<div>
				<p>Hello World</p>
			</div>
		</ElectronAPIProvider>
	)
}
