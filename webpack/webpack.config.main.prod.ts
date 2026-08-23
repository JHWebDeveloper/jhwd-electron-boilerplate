import { merge } from 'webpack-merge'
import nodeExternals from 'webpack-node-externals'
import webpack from 'webpack'

import { BUILD_PATH, MAIN_PATH } from './constants'
import common from './webpack.config.common'

const config: webpack.Configuration = {
	mode: 'production',
	target: 'electron-main',
	entry: MAIN_PATH,
	output: {
		path: BUILD_PATH,
		filename: 'main.cjs'
	},
	externals: [
		nodeExternals(),
		{
			sharp: 'commonjs sharp'
		}
	]
}

export default merge(common, config)
